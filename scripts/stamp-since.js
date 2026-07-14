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
 * Prototype for the versioning-automation proposal (PR #2). Not yet wired into the
 * release flow. See ../research-versioning-automation.md.
 *
 * Keeps the "Since X" component badge automatic and semantically correct.
 *
 * The badge is rendered from each component's `@since` JSDoc tag (extracted into the CEM
 * by `cem.config.js`, rendered by `StatusBadge.tsx`). "Since X" means "first shipped in X",
 * so the value is captured once and then frozen, never re-derived on every release.
 *
 * Workflow:
 *   - Authors write `@since UNRELEASED` (a sentinel) on a new component, never a real number.
 *   - At release, this fills every `@since UNRELEASED` with the released version and leaves
 *     already-stamped components frozen.
 *   - `--check` is the CI guard: every element must carry an `@since` (sentinel or version).
 *
 * The version is read from the 2nd-gen `package.json` (what `changeset version` bumps);
 * nothing is computed or predicted. This is meant to run once the prerelease command is on
 * `main`, where `package.json` holds the real version, so it is not wired in during the
 * current gen2-beta transition.
 *
 * The file is organized into four sections: matching/scan config, version source,
 * scanning + stamping, and the CLI. `stampSince` and `findMissingSince` are exported for a
 * future release-flow import; the CLI runs only when the file is executed directly.
 *
 * @example
 * ```bash
 * node scripts/stamp-since.js            # stamp using the 2nd-gen package.json version
 * node scripts/stamp-since.js --dry-run  # preview, write nothing
 * node scripts/stamp-since.js --check    # CI: fail if any element is missing @since
 * ```
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

/* ── Matching and scan config ────────────────────────────────────────────────
 * What the script looks for in a component's class JSDoc, and where it scans.
 * A "badge-bearing element" is any file whose JSDoc carries an `@element` tag.
 */

/** Sentinel `@since` value an author writes on a not-yet-released component. */
const SENTINEL = 'UNRELEASED';

/** Matches `@since UNRELEASED`, capturing the `@since ` lead so spacing is preserved. */
const SENTINEL_RE = /(@since\s+)UNRELEASED\b/g;
/** Matches any `@since` tag at all (used by the check to detect a missing tag). */
const SINCE_RE = /@since\s+\S+/;
/** Matches an `@element` tag, marking a file as a badge-bearing element definition. */
const ELEMENT_RE = /@element\s+\S+/;

/** Default scan roots (absolute): where 2nd-gen badge-bearing elements are defined. */
const DEFAULT_ROOTS = [
  '2nd-gen/packages/swc/components',
  '2nd-gen/packages/swc/patterns',
].map((rel) => path.join(repoRoot, rel));

/* ── Version source ──────────────────────────────────────────────────────────
 * Answers "which version do we stamp?". We never compute or predict it: at release
 * `changeset version` writes it into the 2nd-gen `package.json`, and this reads that.
 */

/** The 2nd-gen `package.json` that `changeset version` bumps. */
const GEN2_PACKAGE_JSON = path.join(
  repoRoot,
  '2nd-gen/packages/swc/package.json'
);
/** Permissive semver check: `2.0.0`, `2.0.0-beta.1`, `0.3.0-next.20260706135249`. */
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

/**
 * Read and validate the version to stamp from the 2nd-gen `package.json`.
 *
 * @returns {string} The semver-validated version.
 * @throws If the version is missing or not valid semver.
 */
function resolveVersion() {
  let candidate;
  try {
    candidate = JSON.parse(readFileSync(GEN2_PACKAGE_JSON, 'utf-8')).version;
  } catch {
    // fall through to the missing-version error below.
  }

  if (!candidate) {
    throw new Error(
      `Could not read a version from ${path.relative(repoRoot, GEN2_PACKAGE_JSON)}.`
    );
  }
  if (!SEMVER.test(candidate)) {
    throw new Error(`Version "${candidate}" is not a valid semver string.`);
  }
  return candidate;
}

/* ── Scanning and stamping ───────────────────────────────────────────────────
 * The filesystem work: find the element files under the scan roots, detect which are
 * missing an `@since` (the check), and rewrite the `@since UNRELEASED` sentinels.
 * These functions are pure (side effects only in `stampSince`, gated by `dryRun`) and
 * take an injectable `roots` so they can be pointed at a fixture directory.
 */

/**
 * Recursively collect component/pattern source files under `roots`, skipping tests/stories.
 *
 * @param {string[]} [roots] - Absolute directories to scan.
 * @returns {string[]} Absolute file paths.
 */
function collectSourceFiles(roots = DEFAULT_ROOTS) {
  const files = [];
  const skip = (name) =>
    name.endsWith('.test.ts') ||
    name.endsWith('.spec.ts') ||
    name.endsWith('.stories.ts');

  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'test' || entry.name === 'stories') {
          continue;
        }
        walk(full);
      } else if (entry.name.endsWith('.ts') && !skip(entry.name)) {
        files.push(full);
      }
    }
  };

  for (const root of roots) {
    walk(root);
  }
  return files;
}

/**
 * Scanned files that declare a badge-bearing element (`@element` in their JSDoc), each read
 * once and returned with its content so callers do not re-read from disk.
 *
 * @param {string[]} [roots] - Absolute directories to scan.
 * @returns {{ file: string, content: string }[]} Each element file with its text content.
 */
function elementFiles(roots = DEFAULT_ROOTS) {
  return collectSourceFiles(roots)
    .map((file) => ({ file, content: readFileSync(file, 'utf-8') }))
    .filter(({ content }) => ELEMENT_RE.test(content));
}

/**
 * Element files missing an `@since` tag entirely (the CI guard's failure set).
 *
 * @param {string[]} [roots] - Absolute directories to scan.
 * @returns {string[]} Absolute file paths.
 */
export function findMissingSince(roots = DEFAULT_ROOTS) {
  return elementFiles(roots)
    .filter(({ content }) => !SINCE_RE.test(content))
    .map(({ file }) => file);
}

/**
 * Replace `@since UNRELEASED` with `version`; already-stamped values are left frozen.
 *
 * @param {object} options - Stamp options.
 * @param {string} options.version - Version to stamp.
 * @param {string[]} [options.roots] - Absolute directories to scan.
 * @param {boolean} [options.dryRun] - When true, compute changes but write nothing.
 * @returns {string[]} Absolute paths of files that were (or would be) stamped.
 */
export function stampSince({ version, roots = DEFAULT_ROOTS, dryRun = false }) {
  const stamped = [];
  for (const { file, content } of elementFiles(roots)) {
    const after = content.replace(SENTINEL_RE, `$1${version}`);
    if (after === content) {
      continue;
    }
    if (!dryRun) {
      writeFileSync(file, after);
    }
    stamped.push(file);
  }
  return stamped;
}

/* ── Command-line interface ──────────────────────────────────────────────────
 * Parses flags, runs either the `--check` guard or a stamp pass, logs the result, and
 * sets a non-zero exit code on failure. Kept separate from the pure functions above and
 * only invoked when the file is executed directly (not when imported).
 */

/** Parse args, run the requested mode (`--check` or stamp), and set the exit code. */
function main() {
  const args = process.argv.slice(2);
  const rel = (f) => path.relative(repoRoot, f);

  // `--check`: CI guard. Fail (exit 1) if any element lacks an `@since`.
  if (args.includes('--check')) {
    const missing = findMissingSince();
    if (missing.length) {
      console.error(
        `✗ ${missing.length} element(s) missing an @since tag ` +
          `(add \`@since ${SENTINEL}\` or a real version):`
      );
      for (const f of missing) {
        console.error(`  - ${rel(f)}`);
      }
      process.exit(1);
    }
    console.log('✓ every 2nd-gen element carries an @since tag');
    return;
  }

  // Default: resolve the version and stamp the `UNRELEASED` sentinels.
  try {
    const version = resolveVersion();
    const dryRun = args.includes('--dry-run');
    const stamped = stampSince({ version, dryRun });
    if (!stamped.length) {
      console.log(`✓ no @since ${SENTINEL} sentinels found; nothing to stamp`);
      return;
    }
    console.log(
      `✓ ${dryRun ? 'would stamp' : 'stamped'} @since -> ${version} in ${stamped.length} file(s):`
    );
    for (const f of stamped) {
      console.log(`  - ${rel(f)}`);
    }
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
