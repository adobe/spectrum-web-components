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
 * PROTOTYPE for the versioning-automation proposal (PR #2). Not yet wired into the
 * release flow. See research-versioning-automation.md.
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
 * Version source (nothing is computed/predicted; `changeset version` already wrote it):
 *   1. `--version <v>` (explicit / manual).
 *   2. `--from-npm` reads the npm `beta` dist-tag (transition-only bridge while `main` is not
 *      yet bumped).
 *   3. Default: the 2nd-gen `package.json` version.
 *
 * @example
 * ```bash
 * node scripts/stamp-since.js                 # version from 2nd-gen package.json (default)
 * node scripts/stamp-since.js --version 2.0.0-beta.2   # explicit version
 * node scripts/stamp-since.js --from-npm      # transition fallback: npm `beta` dist-tag
 * node scripts/stamp-since.js --base          # stamp the base line (2.0.0, not 2.0.0-beta.1)
 * node scripts/stamp-since.js --dry-run       # preview, write nothing
 * node scripts/stamp-since.js --check         # CI: fail if any element is missing @since
 * ```
 */

import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

/** Sentinel `@since` value an author writes on a not-yet-released component. */
const SENTINEL = 'UNRELEASED';

// Matches `@since UNRELEASED`, capturing the `@since ` lead so spacing is preserved.
const SENTINEL_RE = /(@since\s+)UNRELEASED\b/g;
// Any `@since` tag at all — used by the check.
const SINCE_RE = /@since\s+\S+/;
// A file defines a badge-bearing element when its class JSDoc carries an `@element` tag.
const ELEMENT_RE = /@element\s+\S+/;

/** Default scan roots (absolute): where 2nd-gen badge-bearing elements are defined. */
const DEFAULT_ROOTS = [
  '2nd-gen/packages/swc/components',
  '2nd-gen/packages/swc/patterns',
].map((rel) => path.join(repoRoot, rel));

// ─── version source ───

/** The 2nd-gen package + package.json that `changeset version` bumps. */
const GEN2_PACKAGE = '@adobe/spectrum-wc';
const GEN2_PACKAGE_JSON = path.join(
  repoRoot,
  '2nd-gen/packages/swc/package.json'
);
/** The npm dist-tag the docs represent today (transition fallback). Flip to `latest` at GA. */
const DEFAULT_DOCS_TAG = 'beta';
// A permissive semver check: `2.0.0`, `2.0.0-beta.1`, `0.3.0-next.20260706135249`.
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

/** Read the `version` field from the 2nd-gen package.json (the default source). */
function readPackageVersion() {
  try {
    return JSON.parse(readFileSync(GEN2_PACKAGE_JSON, 'utf-8')).version;
  } catch {
    return undefined;
  }
}

/** Read the npm `beta` dist-tag version (opt-in transition fallback). */
function readDistTag() {
  try {
    const out = execSync(
      `npm view ${GEN2_PACKAGE} dist-tags.${DEFAULT_DOCS_TAG}`,
      {
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }
    ).trim();
    return out && out !== 'undefined' ? out : undefined;
  } catch {
    // network error, unpublished package, or unknown tag.
    return undefined;
  }
}

/** Strip a prerelease/build suffix: `2.0.0-beta.1` -> `2.0.0` (for a possible GA-normalize). */
function baseLine(version) {
  return version.replace(/[-+].*$/, '');
}

/**
 * Resolve the version to stamp: `--version`, else `--from-npm` dist-tag, else the 2nd-gen
 * `package.json`. Validates that the result is semver-shaped.
 *
 * @param {string[]} args - CLI args.
 * @param {(name: string) => (string | undefined)} getFlag - Reads a `--flag value` pair.
 * @returns {string} The resolved, semver-validated version.
 */
function resolveVersion(args, getFlag) {
  const candidate =
    getFlag('--version') ||
    (args.includes('--from-npm') ? readDistTag() : readPackageVersion());

  if (!candidate) {
    throw new Error(
      'Could not resolve a version. Pass --version, ensure the 2nd-gen package.json has a ' +
        'version, or use --from-npm.'
    );
  }
  if (!SEMVER.test(candidate)) {
    throw new Error(
      `Resolved version "${candidate}" is not a valid semver string.`
    );
  }
  return candidate;
}

// ─── scanning + stamping ───

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

/** Files that declare a badge-bearing element (`@element` in their JSDoc). */
function elementFiles(roots = DEFAULT_ROOTS) {
  return collectSourceFiles(roots).filter((f) =>
    ELEMENT_RE.test(readFileSync(f, 'utf-8'))
  );
}

/**
 * Element files missing an `@since` tag entirely (the CI guard's failure set).
 *
 * @param {string[]} [roots] - Absolute directories to scan.
 * @returns {string[]} Absolute file paths.
 */
export function findMissingSince(roots = DEFAULT_ROOTS) {
  return elementFiles(roots).filter(
    (f) => !SINCE_RE.test(readFileSync(f, 'utf-8'))
  );
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
  for (const file of elementFiles(roots)) {
    const before = readFileSync(file, 'utf-8');
    const after = before.replace(SENTINEL_RE, `$1${version}`);
    if (after === before) {
      continue;
    }
    if (!dryRun) {
      writeFileSync(file, after);
    }
    stamped.push(file);
  }
  return stamped;
}

/** CLI wrapper: logs and sets the exit code; kept separate from the pure functions above. */
function main() {
  const args = process.argv.slice(2);
  const getFlag = (name) => {
    const i = args.indexOf(name);
    return i !== -1 ? args[i + 1] : undefined;
  };
  const rel = (f) => path.relative(repoRoot, f);

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

  try {
    let version = resolveVersion(args, getFlag);
    if (args.includes('--base')) {
      version = baseLine(version);
    }
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
