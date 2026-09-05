/**
 * Captures a hover-preview screenshot of every company site in
 * src/data/companies.json into public/img/companies/<slug>.jpg.
 *
 * Shots are committed, not fetched at runtime: the experience page must not
 * depend on a third-party screenshot API staying up, staying free, or seeing
 * the visitor's referrer. Re-run it when a company redesigns.
 *
 *   node scripts/capture-previews.mjs            # every company with a url
 *   node scripts/capture-previews.mjs oneremit   # just one
 *
 * Chrome is driven over the DevTools protocol rather than through its
 * `--screenshot` flag because half of these sites greet a cold visitor with a
 * cookie wall or a promo modal, and a preview of a promo modal is worthless.
 * CDP lets us dismiss the overlay first. Nothing here is a build dependency:
 * CI has no Chrome, and the build only ever reads the committed jpgs.
 */
import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'public', 'img', 'companies');
const companies = JSON.parse(
  readFileSync(path.join(root, 'src', 'data', 'companies.json'), 'utf8'),
);

/** CSS pixels of the captured viewport. The jpg is scaled down from this. */
const VIEWPORT = { width: 1280, height: 720 };
/** Output width; 2x the card's rendered size so it stays sharp on retina. */
const OUT_WIDTH = 800;
const DEBUG_PORT = 9333;

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  'google-chrome',
  'chromium',
];

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  for (const candidate of CHROME_CANDIDATES) {
    if (candidate.startsWith('/')) {
      if (existsSync(candidate)) return candidate;
    } else if (spawnSync('which', [candidate]).status === 0) {
      return candidate;
    }
  }
  return null;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Hides consent walls, promo modals and their backdrops.
 *
 * Runs in the page. Two passes on purpose: a keyword pass catches the named
 * offenders (OneTrust, Cookiebot, "newsletter-popup"), and a geometry pass
 * catches the anonymous full-bleed backdrop that the keyword pass misses.
 * Site chrome — headers, nav — survives both, since headers rarely carry
 * consent keywords and rarely cover half the viewport.
 */
const DISMISS_OVERLAYS = `(() => {
  // "backdrop" excludes Tailwind's backdrop-blur/-filter utilities, which sit on
  // plenty of legitimate sticky headers and would otherwise erase the site's nav.
  const KEYWORDS = /cookie|consent|gdpr|ccpa|onetrust|cookiebot|truste|klaro|osano|cmp-|modal|popup|pop-up|promo|newsletter|subscribe|backdrop(?!-(blur|filter|saturate|opacity|brightness))|overlay|lightbox|interstitial|paywall/i;
  const hidden = [];

  const hide = (el, why) => {
    if (!el || el === document.body || el === document.documentElement) return;
    el.style.setProperty('display', 'none', 'important');
    hidden.push(why + ': ' + (el.id || el.className || el.tagName));
  };

  for (const el of document.querySelectorAll('body *')) {
    const style = getComputedStyle(el);
    if (style.position !== 'fixed' && style.position !== 'sticky') continue;
    if (style.display === 'none' || style.visibility === 'hidden') continue;

    const id = el.id || '';
    const cls = typeof el.className === 'string' ? el.className : '';
    const role = el.getAttribute('role') || '';

    if (KEYWORDS.test(id + ' ' + cls) || role === 'dialog' || role === 'alertdialog') {
      hide(el, 'keyword');
      continue;
    }

    // An anonymous element parked over most of the viewport is a backdrop.
    const box = el.getBoundingClientRect();
    const coverage = (box.width * box.height) / (innerWidth * innerHeight);
    const zIndex = parseInt(style.zIndex, 10) || 0;
    if (coverage > 0.6 && zIndex >= 100) hide(el, 'backdrop');
  }

  for (const el of document.querySelectorAll('dialog[open]')) hide(el, 'dialog');

  // Modals routinely lock the page; unlock so the shot is of the real layout.
  for (const el of [document.body, document.documentElement]) {
    el.style.setProperty('overflow', 'visible', 'important');
    el.style.setProperty('position', 'static', 'important');
  }
  window.scrollTo(0, 0);

  return hidden;
})()`;

/** Minimal CDP client: one socket, numbered commands, awaited replies. */
class Cdp {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      } else if (message.method) {
        this.listeners.get(message.method)?.forEach((fn) => fn(message.params));
      }
    });
  }

  static async connect(url) {
    const socket = new WebSocket(url);
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', () => reject(new Error('CDP socket failed')), {
        once: true,
      });
    });
    return new Cdp(socket);
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  once(method, timeoutMs) {
    return new Promise((resolve) => {
      const timer = setTimeout(resolve, timeoutMs);
      const fn = (params) => {
        clearTimeout(timer);
        this.listeners.get(method).delete(fn);
        resolve(params);
      };
      if (!this.listeners.has(method)) this.listeners.set(method, new Set());
      this.listeners.get(method).add(fn);
    });
  }

  close() {
    this.socket.close();
  }
}

async function waitForBrowser() {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (response.ok) return await response.json();
    } catch {
      // Chrome has not opened the port yet.
    }
    await sleep(250);
  }
  throw new Error('Chrome never opened its debugging port');
}

async function capture(cdp, url) {
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    ...VIEWPORT,
    deviceScaleFactor: 1,
    mobile: false,
  });

  const loaded = cdp.once('Page.loadEventFired', 25_000);
  await cdp.send('Page.navigate', { url });
  await loaded;

  // Marketing pages animate in and mount their modals a beat after load.
  await sleep(3000);
  const { result } = await cdp.send('Runtime.evaluate', {
    expression: DISMISS_OVERLAYS,
    returnByValue: true,
  });
  await sleep(600);

  const { data } = await cdp.send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 80,
    captureBeyondViewport: false,
    clip: { x: 0, y: 0, ...VIEWPORT, scale: OUT_WIDTH / VIEWPORT.width },
  });

  return { data, dismissed: result.value ?? [] };
}

const chrome = findChrome();
if (!chrome) {
  console.error('[previews] no Chrome found. Set CHROME_PATH to a Chrome/Chromium binary.');
  process.exit(1);
}

const only = process.argv[2];
const targets = Object.entries(companies).filter(
  ([slug, company]) => company.url && (!only || slug === only),
);

if (targets.length === 0) {
  console.log(`[previews] nothing to capture${only ? ` for "${only}"` : ''}`);
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });

const profile = mkdtempSync(path.join(tmpdir(), 'preview-profile-'));
const browser = spawn(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-color-profile=srgb',
    '--no-first-run',
    '--disable-extensions',
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${DEBUG_PORT}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

let failed = 0;

try {
  await waitForBrowser();

  for (const [slug, company] of targets) {
    let cdp;
    try {
      const created = await fetch(
        `http://127.0.0.1:${DEBUG_PORT}/json/new?about:blank`,
        { method: 'PUT' },
      ).then((response) => response.json());

      cdp = await Cdp.connect(created.webSocketDebuggerUrl);
      const { data, dismissed } = await capture(cdp, company.url);
      writeFileSync(path.join(outDir, `${slug}.jpg`), Buffer.from(data, 'base64'));

      const note = dismissed.length ? ` (dismissed ${dismissed.length} overlay(s))` : '';
      console.log(`[previews] ${slug} -> public/img/companies/${slug}.jpg${note}`);
      // PREVIEW_DEBUG=1 when a shot comes back missing something it should have:
      // the usual culprit is site chrome matching an overlay keyword.
      if (process.env.PREVIEW_DEBUG) dismissed.forEach((why) => console.log(`           ${why}`));
      await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/close/${created.id}`);
    } catch (error) {
      console.error(`[previews] ${slug}: ${error.message} (${company.url})`);
      failed += 1;
    } finally {
      cdp?.close();
    }
  }
} finally {
  const exited = new Promise((resolve) => browser.once('exit', resolve));
  browser.kill();
  await exited;
  // Chrome flushes its profile on the way out; deleting under it raises ENOTEMPTY.
  rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
}

if (failed > 0) {
  console.error(`[previews] ${failed} of ${targets.length} failed`);
  process.exit(1);
}
