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
 * maps a deleted token name to a replacement or null. Null means "no known
 * replacement". Edit the values before committing.
 *
 * Spectrum's own data takes precedence over local curation:
 *   - Entries for tokens that are active again, or that now have an official
 *     `renamed`, are removed.
 *   - Deleted tokens with a `deprecated_comment` are seeded as null and the
 *     comment is reported, rather than guessing a replacement by name. Only
 *     tokens without a comment get a fuzzy-matched suggestion.
 *   - Newly seeded replacements are value-checked (desktop and mobile)
 *     against the deleted token, and mismatches are reported for review.
 *
 * Usage:
 *   node scripts/diff-versions.js --to 14.13.0
 *
 * Also reports non-global source JSON files in the package; per-component files
 * are auto-discovered, so only new globals need adding to SPECTRUM_GLOBAL_TOKENS
 * in src/tokens.js.
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

import {
  removeActiveTokensFromDeleted,
  removeRenamedTokensFromDeleted,
  ZERO_VALUE_COMMENT_PATTERN,
} from '../src/tokens.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const DELETED_PATH = join(PACKAGE_ROOT, 'custom', 'deleted.json');

// Global token files loaded explicitly by src/tokens.js. Per-component files
// (card.json, avatar.json, …) are auto-discovered, so only new *global* files
// need to be added to SPECTRUM_GLOBAL_TOKENS.
const KNOWN_SOURCE_FILES = new Set([
  'color-aliases',
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
 *   raw       - Map of every token name → raw token data, for value checks
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
  const raw = {};
  const srcFiles = [];

  for (const file of files) {
    const name = file.replace('.json', '');
    srcFiles.push(name);

    const fileTokens = JSON.parse(readFileSync(join(srcDir, file), 'utf8'));
    Object.assign(raw, fileTokens);

    for (const [tokenName, token] of Object.entries(fileTokens)) {
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

  return { active, renamed, comments, raw, srcFiles };
}

const MAX_ALIAS_DEPTH = 10;

/**
 * Resolve a token to a comparable value for one scale ('desktop' or 'mobile'),
 * following `{alias}` references. Returns undefined when the token is missing.
 */
function resolveTokenValue(raw, name, scale, depth = 0) {
  const token = raw[name];
  if (!token || depth > MAX_ALIAS_DEPTH) {
    return undefined;
  }

  let node = token;
  while (node?.sets) {
    node = node.sets[scale] ?? node.sets.light ?? Object.values(node.sets)[0];
  }

  const value = node?.value;
  if (typeof value === 'string' && /^\{[\w-]+\}$/.test(value)) {
    return resolveTokenValue(raw, value.slice(1, -1), scale, depth + 1);
  }
  return typeof value === 'object' ? JSON.stringify(value) : value;
}

function describeValue(raw, name) {
  const desktop = resolveTokenValue(raw, name, 'desktop');
  const mobile = resolveTokenValue(raw, name, 'mobile');
  return desktop === mobile ? `${desktop}` : `${desktop} / ${mobile} (mobile)`;
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
const installedEntryPath = require.resolve('@adobe/spectrum-tokens');
const installedPkgPath = join(dirname(installedEntryPath), 'package.json');
const installedPkg = JSON.parse(readFileSync(installedPkgPath, 'utf8'));
const fromVersion = installedPkg.version;
const fromSrcDir = join(dirname(installedPkgPath), 'src');

let toSrcDir = fromSrcDir;
let tmpDir;

if (fromVersion === toVersion) {
  console.log(
    `\nFrom and to versions are both ${fromVersion}; checking deleted-token curation for stale entries.\n`
  );
} else {
  console.log(
    `\nDiffing @adobe/spectrum-tokens:\n  from: ${fromVersion}\n  to:   ${toVersion}\n`
  );

  try {
    ({ srcDir: toSrcDir, tmpDir } = installVersion(toVersion));
  } catch (err) {
    console.error(`\n✖ ${err.message}\n`);
    process.exit(1);
  }
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
      '\nℹ Non-global source files in @adobe/spectrum-tokens/src/ (auto-discovered as per-component files; add to SPECTRUM_GLOBAL_TOKENS in src/tokens.js only if a file is a new global):'
    );
    for (const f of newSrcFiles) {
      console.log(`  + ${f}.json`);
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

  // Load existing deleted.json so we don't overwrite curated replacements.
  let existing = {};
  if (existsSync(DELETED_PATH)) {
    try {
      existing = JSON.parse(readFileSync(DELETED_PATH, 'utf8'));
    } catch {
      // Ignore parse errors — start fresh.
    }
  }

  const withoutActive = removeActiveTokensFromDeleted(existing, to.active);
  const removedActiveEntries =
    Object.keys(existing).length - Object.keys(withoutActive).length;
  const output = removeRenamedTokensFromDeleted(
    withoutActive,
    new Set(toRenamedKeys)
  );
  const removedRenamedEntries = Object.keys(withoutActive).filter(
    (name) => !(name in output)
  );
  const commentSeeded = [];

  for (const name of deleted) {
    if (name in output) {
      continue;
    }

    // Zero-value tokens: seed with "0" as the replacement hint.
    const comment = to.comments[name];
    if (comment && ZERO_VALUE_COMMENT_PATTERN.test(comment)) {
      output[name] = '0';
      continue;
    }

    // Spectrum explained the removal; keep its rationale rather than guessing.
    if (comment) {
      output[name] = null;
      commentSeeded.push([name, comment]);
      continue;
    }

    // No rationale from Spectrum: seed with best fuzzy match, or null.
    output[name] = findBestMatch(name, added);
  }

  if (removedRenamedEntries.length) {
    console.log(
      '\nℹ Removed curated entries superseded by an official Spectrum rename:'
    );
    for (const name of removedRenamedEntries) {
      console.log(
        `  ${name}: ${existing[name] ?? 'null'}  →  renamed to ${to.renamed[name]}`
      );
    }
    console.log();
  }

  if (commentSeeded.length) {
    console.log(
      '\nℹ Deleted tokens with a Spectrum deprecation comment (seeded as null; the comment is shown in fix-token-refs TODOs):'
    );
    for (const [name, comment] of commentSeeded) {
      console.log(`  ${name}: ${comment}`);
    }
    console.log();
  }

  // Value-check newly seeded replacements; earlier entries were already curated.
  const valueMismatches = Object.entries(output)
    .filter(
      ([name, replacement]) =>
        !(name in existing) && replacement && replacement !== '0'
    )
    .map(([name, replacement]) => ({
      name,
      replacement,
      from: describeValue(from.raw[name] ? from.raw : to.raw, name),
      to: describeValue(to.raw, replacement),
    }))
    .filter(({ from: fromValue, to: toValue }) => fromValue !== toValue);

  if (valueMismatches.length) {
    console.log(
      '\n⚠ Replacements whose value differs from the deleted token (verify before committing):'
    );
    for (const {
      name,
      replacement,
      from: fromValue,
      to: toValue,
    } of valueMismatches) {
      console.log(`  ${name} [${fromValue}]  →  ${replacement} [${toValue}]`);
    }
    console.log();
  }

  if (!deleted.size && !removedActiveEntries && !removedRenamedEntries.length) {
    console.log(
      `✔ No truly deleted tokens found and no stale deleted-token entries to remove.\n`
    );
  } else {
    const sortedOutput = Object.fromEntries(
      Object.keys(output)
        .sort()
        .map((key) => [key, output[key]])
    );

    writeFileSync(
      DELETED_PATH,
      JSON.stringify(sortedOutput, null, 2) + '\n',
      'utf8'
    );

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
    console.log(
      `  ${removedActiveEntries} stale active-token entry/entries removed`
    );
    console.log(
      `  ${removedRenamedEntries.length} entry/entries superseded by an official rename removed`
    );
    console.log(
      `  ${commentSeeded.length} seeded as null with a Spectrum deprecation comment`
    );
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
      `  ${valueMismatches.length} replacement(s) with a value mismatch`
    );
    console.log(
      `  ${needsCuration} with null (no replacement found — requires manual curation)`
    );
    console.log();
    if (deleted.size) {
      console.log(`Review custom/deleted.json and update null values where a`);
      console.log(`reasonable replacement exists, then commit the file.\n`);
    }
  }
} finally {
  // Always clean up the temp dir.
  if (tmpDir) {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}
