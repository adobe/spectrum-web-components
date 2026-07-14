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
 * Resolves the version the 2nd-gen docs/badge should show. We don't compute the next version —
 * `changeset version` writes it into the 2nd-gen `package.json`; this reads that value.
 *
 * Resolution order:
 *   1. Explicit override — `GEN2_VERSION` env / injected (the release passes what it computed).
 *   2. The 2nd-gen `package.json` `version` (default; correct once pre-mode is on `main`).
 *   3. Opt-in npm `beta` dist-tag (`--from-npm`) — transition-only fallback while `main` is
 *      not yet bumped.
 *
 * @example
 * ```bash
 * node scripts/resolve-gen2-version.js            # reads 2nd-gen package.json (eventual parity)
 * node scripts/resolve-gen2-version.js --from-npm # transition fallback: npm `beta` dist-tag
 * GEN2_VERSION=2.0.0-beta.2 node scripts/resolve-gen2-version.js   # explicit override
 * ```
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

/** The package whose version defines the 2nd-gen release line. */
const GEN2_PACKAGE = '@adobe/spectrum-wc';

/** The 2nd-gen `package.json` that `changeset version` bumps. */
const GEN2_PACKAGE_JSON = path.join(
  repoRoot,
  '2nd-gen/packages/swc/package.json'
);

/** The dist-tag the docs currently represent (transition fallback). Flip to `latest` at GA. */
const DEFAULT_DOCS_TAG = 'beta';

// A permissive semver check: `2.0.0`, `2.0.0-beta.1`, `0.3.0-next.20260706135249`.
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

/**
 * Read the `version` field from a package.json (the default, target-model source).
 *
 * @param {string} [pkgJsonPath] - Path to the package.json to read.
 * @returns {string | undefined} The version, or undefined if the file is unreadable.
 */
function readPackageVersion(pkgJsonPath = GEN2_PACKAGE_JSON) {
  try {
    return JSON.parse(readFileSync(pkgJsonPath, 'utf-8')).version;
  } catch {
    return undefined;
  }
}

/**
 * Read a package's dist-tag version from npm. Transition-only fallback for use before the
 * prerelease command runs on `main`.
 *
 * @param {string} [pkg] - Package name.
 * @param {string} [tag] - dist-tag to read.
 * @returns {string | undefined} The version, or undefined if unset or npm fails.
 */
export function readDistTag(pkg = GEN2_PACKAGE, tag = DEFAULT_DOCS_TAG) {
  try {
    const out = execSync(`npm view ${pkg} dist-tags.${tag}`, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out && out !== 'undefined' ? out : undefined;
  } catch {
    // network error, unpublished package, or unknown tag.
    return undefined;
  }
}

/**
 * Resolve the version the badge should show.
 *
 * @param {object} [options] - Resolution options.
 * @param {string} [options.override] - Explicit version; defaults to the `GEN2_VERSION` env var.
 * @param {() => (string | undefined)} [options.read] - Version source; defaults to reading the
 *   2nd-gen `package.json`. Pass `() => readDistTag()` for the transition fallback.
 * @returns {string} A semver-shaped version string.
 * @throws If no source yields a valid version.
 */
export function resolveGen2Version({
  override = process.env.GEN2_VERSION,
  read = readPackageVersion,
} = {}) {
  const candidate = override?.trim() || read();

  if (!candidate) {
    throw new Error(
      'Could not resolve a 2nd-gen version. Set GEN2_VERSION, ensure the 2nd-gen ' +
        'package.json has a version, or use the npm fallback (--from-npm).'
    );
  }
  if (!SEMVER.test(candidate)) {
    throw new Error(
      `Resolved version "${candidate}" is not a valid semver string.`
    );
  }
  return candidate;
}

/**
 * Reduce a version to its release-line base by stripping any prerelease/build suffix.
 * `2.0.0-beta.1` -> `2.0.0`. Available for a possible normalize-at-GA pass.
 *
 * @param {string} version - The version to reduce.
 * @returns {string} The version with any prerelease/build suffix removed.
 */
export function baseLine(version) {
  return version.replace(/[-+].*$/, '');
}

// CLI entry: print the resolved version so shell/CI steps can capture it.
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  try {
    const read = args.includes('--from-npm') ? () => readDistTag() : undefined;
    let version = resolveGen2Version(read ? { read } : {});
    if (args.includes('--base')) {
      version = baseLine(version);
    }
    process.stdout.write(`${version}\n`);
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
}
