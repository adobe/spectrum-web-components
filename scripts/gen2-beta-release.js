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
 * Prepares a 2nd-gen beta release on the gen2-beta branch.
 *
 * gen2-beta runs Changesets in pre-release mode so core and @adobe/spectrum-wc
 * version as 2.0.0-beta.N. Two things need to happen for a clean release that
 * `yarn changeset version` alone does not deliver on this branch:
 *
 * 1. Bump 2.0.0-beta.N and write the 2nd-gen changelog for any changesets that
 *    are new since the last beta. This is standard `changeset version`.
 * 2. Delete changeset files that were already consumed in a previous beta but are
 *    still on disk. They reappear whenever main is synced into gen2-beta (main
 *    never deletes them), and because pre.json already records them as consumed
 *    `changeset version` skips them and leaves the files behind, so they never
 *    clear on their own.
 *
 * This script does both, then refreshes the lockfile. It intentionally stops
 * short of committing, pushing, or publishing so the working tree can be
 * reviewed first.
 *
 * @example
 * ```bash
 * # Bump beta, update the 2nd-gen changelog, prune consumed changesets, refresh lockfile
 * yarn release:gen2-beta
 *
 * # Same, but skip the lockfile refresh (e.g. no version change to release)
 * yarn release:gen2-beta --no-install
 * ```
 */

import { execSync } from 'child_process';
import { existsSync, readdirSync, readFileSync, rmSync } from 'fs';
import path from 'path';

const CHANGESET_DIR = '.changeset';
const PRE_JSON = path.join(CHANGESET_DIR, 'pre.json');
const CORE_PKG = '2nd-gen/packages/core/package.json';
const SWC_PKG = '2nd-gen/packages/swc/package.json';

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

function listChangesetIds() {
  return readdirSync(CHANGESET_DIR)
    .filter((file) => file.endsWith('.md') && file !== 'README.md')
    .map((file) => file.replace(/\.md$/, ''));
}

// gen2-beta only publishes core + @adobe/spectrum-wc, but Changesets pre-mode
// bumps every package a consumed changeset touches — including many 1st-gen
// packages via mixed 1st-gen/2nd-gen changesets. Reverting that churn keeps the
// branch a minimal delta over main (otherwise every release re-adds ~160 1st-gen
// package.json/CHANGELOG files). Only the 2nd-gen packages and .changeset state
// are kept.
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
    `\n🧹 Reverting ${changed.length} non-2nd-gen file(s) bumped by pre-mode (not published from gen2-beta):`
  );
  changed.forEach((file) => console.log(`     • ${file}`));
  execSync(`git checkout -- ${changed.map((file) => `'${file}'`).join(' ')}`, {
    stdio: 'inherit',
  });
}

function main() {
  // Guard: gen2-beta must be in Changesets pre-release mode.
  if (!existsSync(PRE_JSON)) {
    console.error(
      '❌ .changeset/pre.json not found. gen2-beta must be in Changesets pre-release mode.\n' +
        '   Run `yarn changeset pre enter beta` first (see gen2-beta-release-strategy.md).'
    );
    process.exit(1);
  }

  let pre = readJson(PRE_JSON);
  if (pre.mode !== 'pre') {
    console.error(
      `❌ Changesets is not in pre mode (mode="${pre.mode}"). Aborting to avoid a non-beta release.`
    );
    process.exit(1);
  }

  const consumedBefore = new Set(pre.changesets);
  const newChangesets = listChangesetIds().filter(
    (id) => !consumedBefore.has(id)
  );

  console.log(`\nℹ️  Beta tag: ${pre.tag}`);
  console.log(
    `ℹ️  New changesets to consume this release: ${newChangesets.length}`
  );
  newChangesets.forEach((id) => console.log(`     • ${id}`));

  // Consume new changesets: bump beta.N, write changelogs, delete their files.
  run('yarn changeset version', 'Versioning 2nd-gen packages (pre mode)');

  // Prune changesets already consumed in a previous beta but still on disk
  // (re-added by syncing main), so .changeset ends clean after every release.
  pre = readJson(PRE_JSON);
  const consumedNow = new Set(pre.changesets);
  const leftover = listChangesetIds().filter((id) => consumedNow.has(id));
  for (const id of leftover) {
    rmSync(path.join(CHANGESET_DIR, `${id}.md`));
    console.log(`   🧹 Pruned already-consumed changeset: ${id}`);
  }

  const remaining = listChangesetIds();
  if (remaining.length > 0) {
    console.log(
      `\n⚠️  ${remaining.length} changeset(s) remain unconsumed and were left in place: ${remaining.join(
        ', '
      )}`
    );
  } else {
    console.log('\n✓ .changeset is clean (only README remains).');
  }

  // Drop the 1st-gen (and other non-published) version churn pre-mode introduces.
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
  console.log('\n✅ gen2 beta prepared:');
  console.log(`     @spectrum-web-components/core   ${coreVersion}`);
  console.log(`     @adobe/spectrum-wc              ${swcVersion}`);
  console.log(
    '\nNext steps:\n' +
      '  1. Review the working tree (git status / git diff).\n' +
      '  2. Commit and push to gen2-beta.\n' +
      '  3. Trigger the Publish workflow with scope=2nd-gen and tag=beta.'
  );
}

main();
