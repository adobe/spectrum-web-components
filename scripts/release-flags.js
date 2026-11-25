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
 * Prints the `gh release create` flags that decide the "Latest" badge.
 *
 * Two generations release independently from one repo, so neither can hardcode the
 * badge: gen1 owns it today, gen2 must take it at its stable 2.0.0, and a later gen1
 * maintenance patch must not take it back. The badge therefore follows the highest
 * stable version released across both generations, and prereleases never claim it.
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const GENERATIONS = {
  gen1: '1st-gen/packages/button/package.json',
  gen2: 'gen2/packages/swc/package.json',
};

const args = process.argv.slice(2);
const override = args.find((arg) => arg.startsWith('--version='));
const [gen] = args.filter((arg) => !arg.startsWith('--'));

if (!GENERATIONS[gen]) {
  console.error(
    `Usage: node scripts/release-flags.js <${Object.keys(GENERATIONS).join(
      '|'
    )}> [--version=x.y.z]`
  );
  process.exit(1);
}

const version = override
  ? override.slice('--version='.length)
  : JSON.parse(readFileSync(join(root, GENERATIONS[gen]), 'utf-8')).version;

// Release tags come in three shapes: the historical `v1.12.2` series, and the
// per-generation `gen1-`/`gen2-` series the repo moved to at 1.12.3. Allowing no
// suffix after the patch number also filters out every prerelease and snapshot tag
// (`gen2-2.0.0-beta.6`, `v1.12.3-test.20260827122947`), which must never hold the badge.
const RELEASE_TAG = /^(?:v|gen[12]-)(\d+)\.(\d+)\.(\d+)$/;

const released = execSync('git tag -l', {
  cwd: root,
  encoding: 'utf-8',
  maxBuffer: 32 * 1024 * 1024,
})
  .split('\n')
  .map((tag) => RELEASE_TAG.exec(tag.trim()))
  .filter(Boolean)
  .map((match) => match.slice(1, 4).map(Number));

const prerelease = version.includes('-');
const current = /^(\d+)\.(\d+)\.(\d+)/.exec(version);

if (!current) {
  console.error(
    `Could not read a major.minor.patch out of version "${version}".`
  );
  process.exit(1);
}

const parts = current.slice(1, 4).map(Number);

// Only stable versions reach this comparison, so comparing major/minor/patch
// numerically is enough - no prerelease precedence rules are needed.
const outranks = (candidate, target) => {
  for (let i = 0; i < 3; i += 1) {
    if (candidate[i] !== target[i]) {
      return candidate[i] > target[i];
    }
  }
  return false;
};

const latest = !prerelease && !released.some((tag) => outranks(tag, parts));

const flags = prerelease
  ? ['--prerelease', '--latest=false']
  : [latest ? '--latest' : '--latest=false'];

// Explain the decision on stderr so the job log records why the badge moved or did not.
console.error(
  `${gen} ${version}: ${
    prerelease
      ? 'prerelease - never takes the Latest badge'
      : latest
        ? 'highest stable release - takes the Latest badge'
        : 'superseded by a higher stable release - does not take the Latest badge'
  }`
);

console.log(flags.join(' '));
