/**
 * Builds every Slidev deck in decks/ into public/decks/<slug>/.
 *
 * Adding a talk is: drop a folder in decks/, add an .mdx to content/talks/.
 * No edit to this script, no edit to next.config.ts.
 *
 * Decks live in their own npm projects on purpose — Slidev pulls in Vue, Shiki,
 * Mermaid and KaTeX, and none of that belongs in the portfolio's dependency
 * tree, its bundle, or its `npm audit` output.
 *
 *   node scripts/build-decks.mjs           # build all
 *   node scripts/build-decks.mjs <slug>    # build one
 */
import { readdirSync, existsSync, rmSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const decksDir = path.join(root, 'decks');
const outRoot = path.join(root, 'public', 'decks');

if (!existsSync(decksDir)) {
  console.log('[decks] no decks/ directory — nothing to build');
  process.exit(0);
}

const only = process.argv[2];
const slugs = readdirSync(decksDir).filter((name) => {
  const full = path.join(decksDir, name);
  return statSync(full).isDirectory() && existsSync(path.join(full, 'slides.md'));
});

const targets = only ? slugs.filter((s) => s === only) : slugs;

if (targets.length === 0) {
  console.log(`[decks] nothing to build${only ? ` for "${only}"` : ''}`);
  process.exit(0);
}

function run(cmd, args, cwd) {
  const result = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: false });
  if (result.status !== 0) {
    console.error(`[decks] FAILED: ${cmd} ${args.join(' ')} (in ${cwd})`);
    process.exit(result.status ?? 1);
  }
}

for (const slug of targets) {
  const deckDir = path.join(decksDir, slug);
  const outDir = path.join(outRoot, slug);

  console.log(`\n[decks] ── ${slug} ──`);

  if (!existsSync(path.join(deckDir, 'node_modules'))) {
    console.log('[decks] installing deck dependencies...');
    run('npm', ['ci', '--ignore-scripts'], deckDir);
  }

  // Stale assets from a previous build would otherwise accumulate forever.
  rmSync(outDir, { recursive: true, force: true });

  // --base must match the serving path exactly, trailing slash included, or
  // every asset URL in the compiled deck points at the wrong origin path.
  run('npx', ['slidev', 'build', '--base', `/decks/${slug}/`, '--out', outDir], deckDir);

  console.log(`[decks] ✓ ${slug} -> public/decks/${slug}/`);
}

console.log(`\n[decks] built ${targets.length} deck(s)`);
