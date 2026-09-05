/**
 * Renders the talk URLs to static SVG QR codes at build time.
 *
 * Generated locally rather than fetched from an image API: the deck has to work
 * on conference wifi that may not exist, and the hardened CSP forbids
 * third-party image hosts anyway.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import QRCode from 'qrcode';
import { TALK } from '../talk.config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'public');

const targets = [
  { name: 'qr-repo.svg', url: TALK.repoUrl },
  { name: 'qr-talk.svg', url: TALK.talkUrl },
];

await mkdir(outDir, { recursive: true });

for (const target of targets) {
  const svg = await QRCode.toString(target.url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: { dark: '#0B0C0F', light: '#FFFFFF' },
  });
  await writeFile(path.join(outDir, target.name), svg, 'utf8');
  console.log(`[qr] ${target.name} -> ${target.url}`);
}
