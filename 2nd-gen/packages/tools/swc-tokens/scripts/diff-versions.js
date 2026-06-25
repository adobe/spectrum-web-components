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
 * Diff @adobe/spectrum-tokens between the currently installed version and a
 * target version to identify deleted, renamed, and added tokens.
 *
 * Writes a seeded custom/deleted.json for human curation, where each entry
 * maps a deleted token name to its best fuzzy-matched replacement or null.
 * Edit the values before committing — null means "no known replacement".
 *
 * Usage:
 *   node scripts/diff-versions.js --to 14.13.0
 *
 * Also reports any new source JSON files added to the package that are not yet
 * listed in SPECTRUM_TOKENS in src/tokens.js.
 */

import { execSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ZERO_VALUE_COMMENT_PATTERN } from '../src/tokens.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const DELETED_PATH = join(PACKAGE_ROOT, 'custom', 'deleted.json');

const KNOWN_SOURCE_FILES = new Set([
  'color-aliases',
  'color-component',
  'color-palette',
  'icons',
  'layout-component',
  'layout',
  'semantic-color-palette',
  'typography',
]);

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function levenshtein(a, b) {
  const aLen = a.length;
  const bLen = b.length;
  if (!aLen) {
    return bLen;
  }
  if (!bLen) {
    return aLen;
  }

  let prev = Array.from({ length: bLen + 1 }, (_, j) => j);
  let curr = new Array(bLen + 1);

  for (let i = 1; i <= aLen; i++) {
    curr[0] = i;
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }

  return prev[bLen];
}

/**
 * Find the closest token in the candidate set using Levenshtein distance.
 * Only returns a match when the edit distance is within 30% of the name length
 * (floor 3) so we don't suggest obviously unrelated tokens.
 */
function findBestMatch(name, candidates) {
  if (!candidates.size) {
    return null;
  }

  let best = null;
  let bestDist = Infinity;

  for (const candidate of candidates) {
    const dist = levenshtein(name, candidate);
    if (dist < bestDist) {
      bestDist = dist;
      best = candidate;
    }
  }

  const threshold = Math.max(3, Math.floor(name.length * 0.3));
  return bestDist <= threshold ? best : null;
}

/* -------------------------------------------------------------------------- */
/*                            Token set extraction                            */
/* -------------------------------------------------------------------------- */

/**
 * Load all token names from a spectrum-tokens src/ directory.
 *
 * Returns:
 *   active    - Set of non-deprecated token names
 *   renamed   - Map of old name → new name (deprecated + renamed)
 *   comments  - Map of old name → deprecated_comment (deprecated, no rename)
 *   srcFiles  - List of JSON file base names found in the directory
 */
function loadTokenNames(srcDir) {
  let files;
  try {
    files = readdirSync(srcDir).filter((f) => f.endsWith('.json'));
  } catch {
    throw new Error(`Cannot read src directory: ${srcDir}`);
  }

  const active = new Set();
  const renamed = {};
  const comments = {};
  const srcFiles = [];

  for (const file of files) {
    const name = file.replace('.json', '');
    srcFiles.push(name);

    const raw = JSON.parse(readFileSync(join(srcDir, file), 'utf8'));

    for (const [tokenName, token] of Object.entries(raw)) {
      if (token?.deprecated) {
        if (typeof token.renamed === 'string') {
          renamed[tokenName] = token.renamed;
        } else {
          // deprecated-only (no rename): collect comment if present
          if (typeof token.deprecated_comment === 'string') {
            comments[tokenName] = token.deprecated_comment;
          }
        }
        // deprecated tokens (with or without rename): neither active nor in renamed map for active tracking
      } else {
        active.add(tokenName);
      }
    }
  }

  return { active, renamed, comments, srcFiles };
}

/* -------------------------------------------------------------------------- */
/*                            Version installation                            */
/* -------------------------------------------------------------------------- */

/**
 * Install @adobe/spectrum-tokens@version to a temp directory via npm.
 * Returns { srcDir, tmpDir } — caller is responsible for cleanup.
 */
function installVersion(version) {
  const tmpDir = mkdtempSync(join(tmpdir(), 'swc-tokens-diff-'));
  console.log(`  Fetching @adobe/spectrum-tokens@${version} via npm…`);
  try {
    execSync(
      `npm install @adobe/spectrum-tokens@${version} --prefix "${tmpDir}" --no-save --ignore-scripts --loglevel=error`,
      { stdio: 'pipe' }
    );
    return {
      srcDir: join(tmpDir, 'node_modules', '@adobe', 'spectrum-tokens', 'src'),
      tmpDir,
    };
  } catch (err) {
    rmSync(tmpDir, { recursive: true, force: true });
    throw new Error(
      `Failed to install @adobe/spectrum-tokens@${version}: ${err.message}`
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Main                                    */
/* -------------------------------------------------------------------------- */

const argv = yargs(hideBin(process.argv))
  .option('to', {
    alias: 't',
    type: 'string',
    describe: 'Target @adobe/spectrum-tokens version to diff against',
    demandOption: true,
  })
  .help().argv;

const toVersion = argv.to.trim();

// Resolve "from" from the currently installed package.
const require = createRequire(import.meta.url);
const installedPkgPath = require.resolve('@adobe/spectrum-tokens/package.json');
const installedPkg = JSON.parse(readFileSync(installedPkgPath, 'utf8'));
const fromVersion = installedPkg.version;
const fromSrcDir = join(dirname(installedPkgPath), 'src');

if (fromVersion === toVersion) {
  console.log(
    `\nFrom and to versions are both ${fromVersion} — nothing to diff.\n`
  );
  process.exit(0);
}

console.log(
  `\nDiffing @adobe/spectrum-tokens:\n  from: ${fromVersion}\n  to:   ${toVersion}\n`
);

// Install the target version to a temp dir.
let toSrcDir;
let tmpDir;

try {
  ({ srcDir: toSrcDir, tmpDir } = installVersion(toVersion));
} catch (err) {
  console.error(`\n✖ ${err.message}\n`);
  process.exit(1);
}

try {
  const from = loadTokenNames(fromSrcDir);
  const to = loadTokenNames(toSrcDir);

  /* ------------------------------------------ */
  /* Classify changes                            */
  /* ------------------------------------------ */

  // Keys of the new renamed map: tokens deprecated+renamed in 14.x → handled
  // automatically by extractRenamedTokenValues after the version bump.
  const toRenamedKeys = new Set(Object.keys(to.renamed));

  // Tokens active in old that have no representation in new at all:
  // not active, and not deprecated+renamed (which would surface via extractRenamedTokenValues).
  const deleted = new Set(
    [...from.active].filter(
      (name) => !to.active.has(name) && !toRenamedKeys.has(name)
    )
  );

  // Tokens in old renamed map that are NOT already in new renamed map
  // (newly deprecated+renamed since our version — picked up automatically after bump)
  const newlyDeprecatedRenamed = Object.entries(to.renamed).filter(
    ([oldName]) => !from.renamed[oldName]
  );

  // Tokens active in new that weren't in old (candidate replacements for deleted)
  const added = new Set(
    [...to.active].filter((name) => !from.active.has(name))
  );

  // New source files not yet in KNOWN_SOURCE_FILES
  const newSrcFiles = to.srcFiles.filter((f) => !KNOWN_SOURCE_FILES.has(f));

  /* ------------------------------------------ */
  /* Report                                     */
  /* ------------------------------------------ */

  console.log('─'.repeat(60));
  console.log(
    `Deleted (active in ${fromVersion}, absent from ${toVersion}): ${deleted.size}`
  );
  console.log(
    `Added   (new in ${toVersion}):                                ${added.size}`
  );
  console.log(
    `Newly deprecated+renamed:                                      ${newlyDeprecatedRenamed.length}`
  );
  console.log(
    `New source files:                                               ${newSrcFiles.length}`
  );
  console.log('─'.repeat(60));

  if (newSrcFiles.length) {
    console.log(
      '\n⚠ New source files in @adobe/spectrum-tokens/src/ not listed in SPECTRUM_TOKENS:'
    );
    for (const f of newSrcFiles) {
      console.log(`  + ${f}.json  →  add to SPECTRUM_TOKENS in src/tokens.js`);
    }
    console.log();
  }

  if (newlyDeprecatedRenamed.length) {
    console.log(
      '\nℹ Newly deprecated+renamed tokens (auto-captured after bump via extractRenamedTokenValues):'
    );
    for (const [oldName, newName] of newlyDeprecatedRenamed) {
      console.log(`  ${oldName}  →  ${newName}`);
    }
    console.log();
  }

  if (added.size) {
    console.log(
      `\nNew tokens added in ${toVersion} (${added.size} total — first 20):`
    );
    [...added].slice(0, 20).forEach((name) => console.log(`  + ${name}`));
    if (added.size > 20) {
      console.log(`  … and ${added.size - 20} more`);
    }
    console.log();
  }

  /* ------------------------------------------ */
  /* Write custom/deleted.json                  */
  /* ------------------------------------------ */

  if (!deleted.size) {
    console.log(
      `✔ No truly deleted tokens found. custom/deleted.json not written.\n`
    );
  } else {
    // Load existing deleted.json so we don't overwrite curated replacements.
    let existing = {};
    if (existsSync(DELETED_PATH)) {
      try {
        existing = JSON.parse(readFileSync(DELETED_PATH, 'utf8'));
      } catch {
        // Ignore parse errors — start fresh.
      }
    }

    const output = {};

    for (const name of [...deleted].sort()) {
      if (name in existing) {
        // Preserve previously curated replacement.
        output[name] = existing[name];
        continue;
      }

      // Zero-value tokens: seed with "0" as the replacement hint.
      const comment = to.comments[name];
      if (comment && ZERO_VALUE_COMMENT_PATTERN.test(comment)) {
        output[name] = '0';
        continue;
      }

      // Seed with best fuzzy match from the added set, or null.
      output[name] = findBestMatch(name, added);
    }

    writeFileSync(DELETED_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');

    const preserved = Object.keys(output).filter(
      (k) => k in existing && existing[k] !== null
    ).length;
    const zeroSeeded = Object.keys(output).filter(
      (k) => !(k in existing) && output[k] === '0'
    ).length;
    const fuzzySeeded = Object.keys(output).filter(
      (k) => !(k in existing) && output[k] !== null && output[k] !== '0'
    ).length;
    const needsCuration = Object.keys(output).filter(
      (k) => output[k] === null
    ).length;

    console.log(`✔ Wrote custom/deleted.json:`);
    console.log(`  ${deleted.size} deleted token(s)`);
    console.log(`  ${preserved} preserved from previous curation`);
    if (zeroSeeded) {
      console.log(
        `  ${zeroSeeded} seeded as "0" (zero-pixel; hardcode in implementation)`
      );
    }
    console.log(
      `  ${fuzzySeeded} seeded with fuzzy matches (review before committing)`
    );
    console.log(
      `  ${needsCuration} with null (no replacement found — requires manual curation)`
    );
    console.log();
    console.log(`Review custom/deleted.json and update null values where a`);
    console.log(`reasonable replacement exists, then commit the file.\n`);
  }
} finally {
  // Always clean up the temp dir.
  if (tmpDir) {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}
