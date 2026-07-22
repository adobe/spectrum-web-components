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
 * Prepares a 2nd-gen beta release directly on `main`.
 *
 * `@adobe/spectrum-wc-core` and `@adobe/spectrum-wc` ship prerelease versions
 * (`2.0.0-beta.N`) from the same `main` branch that 1st-gen releases from in
 * normal mode. Changesets' prerelease mode (`.changeset/pre.json`) is
 * repo-wide, so this script enters and exits prerelease mode within a single
 * run: `.changeset/pre.json` never persists in a commit, and 1st-gen-only
 * changesets are held aside so the prerelease-mode version bump never
 * touches them.
 *
 * 1. Holds 1st-gen-only changesets aside.
 * 2. Enters Changesets prerelease mode fresh (`changeset pre enter beta`).
 * 3. Runs `changeset version` to bump `2.0.0-beta.N` and write changelogs.
 * 4. Prunes the newly-consumed 2nd-gen changeset files (Changesets does not
 *    delete them itself in prerelease mode).
 * 5. Restores the held 1st-gen changesets.
 * 6. Exits prerelease mode and removes `.changeset/pre.json`.
 * 7. Reverts any other non-2nd-gen file churn.
 * 8. Refreshes the lockfile.
 *
 * @example
 * ```bash
 * yarn release:gen2-beta
 *
 * # Same, but skip the lockfile refresh (e.g. no version change to release)
 * yarn release:gen2-beta --no-install
 * ```
 */

import { execSync } from 'child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
} from 'fs';
import path from 'path';

const CHANGESET_DIR = '.changeset';
const PRE_JSON = path.join(CHANGESET_DIR, 'pre.json');
// Must live outside `.changeset/`: see scripts/gen1-publish-prep.js for why.
const HELD_DIR = '.changeset-held-for-1st-gen';
const CORE_PKG = '2nd-gen/packages/core/package.json';
const SWC_PKG = '2nd-gen/packages/swc/package.json';

const SECOND_GEN_PATTERN =
  /@adobe\/spectrum-wc(-core)?|@spectrum-web-components\/core/;
const FIRST_GEN_PATTERN = /@spectrum-web-components\/[a-z-]+/g;

const skipInstall = process.argv.includes('--no-install');

function run(command, description) {
  if (description) {
    console.log(`\n📦 ${description}...`);
  }
  execSync(command, { stdio: 'inherit' });
}

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

function listChangesetFiles() {
  return readdirSync(CHANGESET_DIR).filter(
    (file) => file.endsWith('.md') && file !== 'README.md'
  );
}

function listChangesetIds() {
  return listChangesetFiles().map((file) => file.replace(/\.md$/, ''));
}

function isFirstGenOnlyChangeset(content) {
  const hasSecondGen = SECOND_GEN_PATTERN.test(content);
  return !hasSecondGen && FIRST_GEN_PATTERN.test(content);
}

function holdFirstGenOnlyChangesets() {
  mkdirSync(HELD_DIR, { recursive: true });
  let held = 0;

  for (const file of listChangesetFiles()) {
    const fullPath = path.join(CHANGESET_DIR, file);
    const content = readFileSync(fullPath, 'utf8');
    if (!isFirstGenOnlyChangeset(content)) {
      continue;
    }

    renameSync(fullPath, path.join(HELD_DIR, file));
    held += 1;
    console.log(`   📦 Held 1st-gen-only changeset: ${file}`);
  }

  console.log(
    `\n✓ Held ${held} 1st-gen-only changeset(s) out of 2nd-gen versioning.`
  );
}

function restoreHeldChangesets() {
  if (!existsSync(HELD_DIR)) {
    return;
  }

  let restored = 0;
  for (const file of readdirSync(HELD_DIR).filter((name) =>
    name.endsWith('.md')
  )) {
    renameSync(path.join(HELD_DIR, file), path.join(CHANGESET_DIR, file));
    restored += 1;
    console.log(`   ↩️  Restored held 1st-gen changeset: ${file}`);
  }

  if (restored > 0) {
    console.log(`\n✓ Restored ${restored} held 1st-gen changeset(s).`);
  }

  rmSync(HELD_DIR, { recursive: true, force: true });
}

// 2nd-gen only publishes core + @adobe/spectrum-wc, but Changesets pre-mode
// bumps every package a consumed changeset touches. Reverting non-2nd-gen
// churn keeps main a minimal delta (otherwise every release re-adds ~160
// 1st-gen package.json/CHANGELOG files). .changeset/ is excluded here since
// it's managed separately by the hold/restore/prune steps above.
function revertNonSecondGenChurn() {
  const changed = execSync('git diff --name-only', { encoding: 'utf8' })
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean)
    .filter(
      (file) =>
        !file.startsWith('2nd-gen/packages/core/') &&
        !file.startsWith('2nd-gen/packages/swc/') &&
        !file.startsWith('.changeset/')
    );

  if (changed.length === 0) {
    return;
  }

  console.log(
    `\n🧹 Reverting ${changed.length} non-2nd-gen file(s) bumped by pre-mode:`
  );
  changed.forEach((file) => console.log(`     • ${file}`));
  execSync(`git checkout -- ${changed.map((file) => `'${file}'`).join(' ')}`, {
    stdio: 'inherit',
  });
}

function main() {
  holdFirstGenOnlyChangesets();

  run('yarn changeset pre enter beta', 'Entering prerelease mode');

  const pending = listChangesetIds();
  console.log(
    `\nℹ️  2nd-gen changeset(s) to consume this release: ${pending.length}`
  );
  pending.forEach((id) => console.log(`     • ${id}`));

  run('yarn changeset version', 'Versioning 2nd-gen packages (pre mode)');

  // Changesets does not delete changeset files in prerelease mode; prune
  // everything this run just consumed so .changeset ends clean.
  const pre = readJson(PRE_JSON);
  const consumedNow = new Set(pre.changesets);
  const leftover = listChangesetIds().filter((id) => consumedNow.has(id));
  for (const id of leftover) {
    rmSync(path.join(CHANGESET_DIR, `${id}.md`));
    console.log(`   🧹 Pruned consumed changeset: ${id}`);
  }

  restoreHeldChangesets();

  run('yarn changeset pre exit', 'Exiting prerelease mode');
  rmSync(PRE_JSON, { force: true });

  revertNonSecondGenChurn();

  // Refresh the lockfile to reflect any version changes (mirrors scripts/publish.js).
  if (skipInstall) {
    console.log('\nℹ️  Skipping lockfile refresh (--no-install).');
  } else {
    run(
      'yarn install --refresh-lockfile',
      'Refreshing lockfile with new versions'
    );
  }

  const coreVersion = readJson(CORE_PKG).version;
  const swcVersion = readJson(SWC_PKG).version;
  console.log('\n✅ 2nd-gen beta prepared:');
  console.log(`     @adobe/spectrum-wc-core         ${coreVersion}`);
  console.log(`     @adobe/spectrum-wc              ${swcVersion}`);
}

main();
