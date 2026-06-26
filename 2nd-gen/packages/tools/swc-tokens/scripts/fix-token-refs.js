#!/usr/bin/env node

/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Fix broken token() references in CSS files after a @adobe/spectrum-tokens version bump.
 *
 * Reads the renamed and deleted token maps from the currently installed token data, then
 * applies the following transformations to every CSS file in scope:
 *
 *   - Renamed token:              token("old-name")  →  token("new-name")
 *   - Deleted, "0" replacement:   token("zero-val")  →  0
 *   - Deleted, named replacement: token("old-name")  →  token("suggestion")
 *   - Deleted, null replacement:  token("old-name")  →  token("old-name") /∗ TODO ∗/
 *
 * Usage:
 *   node scripts/fix-token-refs.js [--dry-run] [--files <path> ...]
 *
 * Options:
 *   --dry-run, -d    Show what would change without writing any files
 *   --files, -f      Specific CSS files or directories to scan.
 *                    Defaults to all CSS under 2nd-gen/ (excluding node_modules, tools, dist, out)
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { fixContent } from '../src/fix-content.js';
import { allTokenData } from '../src/tokens.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const DEFAULT_SEARCH_ROOT = join(PACKAGE_ROOT, '../../..');

// Directory names to skip when walking the file tree.
const SKIP_DIRS = new Set(['node_modules', 'out', 'dist', '.git', 'tools']);

/* -------------------------------------------------------------------------- */
/*                              File discovery                                 */
/* -------------------------------------------------------------------------- */

function walkCss(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) {
      continue;
    }
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkCss(full, files);
    } else if (entry.name.endsWith('.css')) {
      files.push(full);
    }
  }

  return files;
}

function collectFiles(paths) {
  const files = [];

  for (const p of paths) {
    let stat;
    try {
      stat = statSync(p);
    } catch {
      console.warn(`  Warning: cannot access '${p}'`);
      continue;
    }

    if (stat.isDirectory()) {
      walkCss(p, files);
    } else if (p.endsWith('.css')) {
      files.push(p);
    } else {
      console.warn(`  Warning: not a CSS file or directory: '${p}'`);
    }
  }

  return files;
}

/* -------------------------------------------------------------------------- */
/*                                    Main                                    */
/* -------------------------------------------------------------------------- */

const argv = yargs(hideBin(process.argv))
  .option('files', {
    alias: 'f',
    type: 'string',
    array: true,
    describe:
      'CSS files or directories to scan (default: all CSS under 2nd-gen/, excluding tools/)',
  })
  .option('dry-run', {
    alias: 'd',
    type: 'boolean',
    default: false,
    describe: 'Show what would change without writing any files',
  })
  .help().argv;

const dryRun = argv['dry-run'];
const searchPaths = argv.files?.length ? argv.files : [DEFAULT_SEARCH_ROOT];

console.log('\nFix token references\n' + '─'.repeat(60));
if (dryRun) {
  console.log('  (dry run — no files will be written)\n');
}

// Load token data from the currently installed @adobe/spectrum-tokens.
// renamed: { old-name → new-name } for deprecated+renamed tokens
// deleted: { old-name → replacement|"0"|null } from custom/deleted.json
const { renamed, deleted } = await allTokenData(null);

const renamedCount = Object.keys(renamed).length;
const deletedCount = Object.keys(deleted).length;
console.log(
  `  Loaded ${renamedCount} renamed and ${deletedCount} deleted token entries.\n`
);

if (!renamedCount && !deletedCount) {
  console.log('  Nothing to fix — renamed and deleted maps are empty.\n');
  process.exit(0);
}

const allFiles = collectFiles(searchPaths);
console.log(`  Scanning ${allFiles.length} CSS file(s)…\n`);

let totalRenamed = 0;
let totalZero = 0;
let totalReplaced = 0;
let totalTodo = 0;
const todoFiles = [];

for (const file of allFiles) {
  const content = readFileSync(file, 'utf8');

  // Quick pre-filter before running the regex.
  if (!content.includes('token(')) {
    continue;
  }

  const { result, replacements } = fixContent(content, renamed, deleted);

  if (!replacements.length) {
    continue;
  }

  const rel = relative(PACKAGE_ROOT, file);
  let r = 0,
    z = 0,
    p = 0,
    t = 0;
  for (const entry of replacements) {
    if (entry.kind === 'renamed') {
      r++;
    } else if (entry.kind === 'zero') {
      z++;
    } else if (entry.kind === 'replaced') {
      p++;
    } else if (entry.kind === 'todo') {
      t++;
    }
  }
  totalRenamed += r;
  totalZero += z;
  totalReplaced += p;
  totalTodo += t;

  const parts = [];
  if (r) {
    parts.push(`${r} renamed`);
  }
  if (z) {
    parts.push(`${z} → 0`);
  }
  if (p) {
    parts.push(`${p} replaced`);
  }
  if (t) {
    parts.push(`${t} TODO`);
  }

  console.log(`  ${rel} (${parts.join(', ')})`);

  for (const entry of replacements) {
    if (entry.kind === 'renamed') {
      console.log(`    renamed:  ${entry.from}  →  ${entry.to}`);
    } else if (entry.kind === 'zero') {
      console.log(`    → 0:      ${entry.from}`);
    } else if (entry.kind === 'replaced') {
      console.log(`    replaced: ${entry.from}  →  ${entry.to}`);
    } else if (entry.kind === 'todo') {
      console.log(`    TODO:     ${entry.from} (no known replacement)`);
    }
  }

  if (t) {
    todoFiles.push(rel);
  }

  if (!dryRun) {
    writeFileSync(file, result, 'utf8');
  }
}

console.log('\n' + '─'.repeat(60));

if (!totalRenamed && !totalZero && !totalReplaced && !totalTodo) {
  console.log('  No changes needed.\n');
} else {
  console.log('Total:');
  if (totalRenamed) {
    console.log(`  ${totalRenamed} renamed token(s) updated`);
  }
  if (totalZero) {
    console.log(`  ${totalZero} zero-value token(s) replaced with 0`);
  }
  if (totalReplaced) {
    console.log(
      `  ${totalReplaced} deleted token(s) replaced with curated suggestion`
    );
  }
  if (totalTodo) {
    console.log(`  ${totalTodo} deleted token(s) flagged with TODO comment`);
  }

  if (todoFiles.length) {
    console.log('\nFiles with TODO comments (manual review required):');
    for (const f of todoFiles) {
      console.log(`  ${f}`);
    }
    console.log(
      `\n  Find them: grep -rn "removed token" ${join(DEFAULT_SEARCH_ROOT, 'packages/swc')}`
    );
  }

  if (dryRun) {
    console.log('\n  Re-run without --dry-run to apply changes.');
  }

  console.log();
}
