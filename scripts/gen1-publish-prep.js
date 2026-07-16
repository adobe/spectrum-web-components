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
 * Helpers for the 1st-gen publish workflow on `main`.
 *
 * 2nd-gen packages release from `gen2-beta` via `publish-2nd-gen.yml`. When both
 * generations have pending changesets on `main`, `changeset version` must not
 * consume 2nd-gen-only files or leave 2nd-gen package bumps behind for
 * `changeset publish` to ship accidentally.
 *
 * @example
 * ```bash
 * # Before `changeset version` in publish.yml
 * yarn release:gen1-prep --hold-second-gen
 *
 * # After `changeset version`, before `changeset publish`
 * yarn release:gen1-prep --revert-second-gen-churn
 * ```
 */

import { execSync } from 'child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
} from 'fs';
import path from 'path';

const CHANGESET_DIR = '.changeset';
const HELD_DIR = path.join(CHANGESET_DIR, '.held-for-gen2');

const SECOND_GEN_PATTERN =
  /@adobe\/spectrum-wc(-core)?|@spectrum-web-components\/core/;
const FIRST_GEN_PATTERN = /@spectrum-web-components\/[a-z-]+/g;

function listChangesetFiles() {
  return readdirSync(CHANGESET_DIR).filter(
    (file) => file.endsWith('.md') && file !== 'README.md'
  );
}

function isSecondGenOnlyChangeset(content) {
  const hasSecondGen = SECOND_GEN_PATTERN.test(content);
  const firstGenPackages = content.match(FIRST_GEN_PATTERN) || [];
  const hasFirstGen = firstGenPackages.some(
    (pkg) => pkg !== '@spectrum-web-components/core'
  );
  return hasSecondGen && !hasFirstGen;
}

function holdSecondGenOnlyChangesets() {
  mkdirSync(HELD_DIR, { recursive: true });
  let held = 0;

  for (const file of listChangesetFiles()) {
    const fullPath = path.join(CHANGESET_DIR, file);
    const content = readFileSync(fullPath, 'utf8');
    if (!isSecondGenOnlyChangeset(content)) {
      continue;
    }

    renameSync(fullPath, path.join(HELD_DIR, file));
    held += 1;
    console.log(`   📦 Held 2nd-gen-only changeset for gen2-beta: ${file}`);
  }

  console.log(`\n✓ Held ${held} 2nd-gen-only changeset(s) out of versioning.`);
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
    console.log(`   ↩️  Restored held changeset: ${file}`);
  }

  if (restored > 0) {
    console.log(`\n✓ Restored ${restored} held changeset(s).`);
  }
}

function revertSecondGenChurn() {
  const changed = execSync('git diff --name-only', { encoding: 'utf8' })
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean)
    .filter(
      (file) =>
        file.startsWith('2nd-gen/packages/core/') ||
        file.startsWith('2nd-gen/packages/swc/')
    );

  if (changed.length === 0) {
    return;
  }

  console.log(
    `\n🧹 Reverting ${changed.length} 2nd-gen file(s) (published from gen2-beta, not main):`
  );
  changed.forEach((file) => console.log(`     • ${file}`));
  execSync(`git checkout -- ${changed.map((file) => `'${file}'`).join(' ')}`, {
    stdio: 'inherit',
  });
}

const mode = process.argv[2];

switch (mode) {
  case '--hold-second-gen':
    holdSecondGenOnlyChangesets();
    break;
  case '--restore-held':
    restoreHeldChangesets();
    break;
  case '--revert-second-gen-churn':
    revertSecondGenChurn();
    restoreHeldChangesets();
    break;
  default:
    console.error(
      'Usage: yarn release:gen1-prep --hold-second-gen | --revert-second-gen-churn | --restore-held'
    );
    process.exit(1);
}
