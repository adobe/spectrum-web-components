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

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Each generation stores notes differently: gen1 aggregates every version into one
// file with `# [1.12.5](compare-link)` headings, gen2 uses changesets' per-package
// changelog with plain `## 2.0.0-beta.6` headings. Both are handled below.
const GENERATIONS = {
  gen1: {
    changelog: '1st-gen/CHANGELOG.md',
    pkg: '1st-gen/packages/button/package.json',
  },
  gen2: {
    changelog: 'gen2/packages/swc/CHANGELOG.md',
    pkg: 'gen2/packages/swc/package.json',
  },
};

const args = process.argv.slice(2);
// `--version` overrides the released version, so notes for an older tag can be
// pulled out when backfilling a release that shipped without one.
const override = args.find((arg) => arg.startsWith('--version='));
const [gen, outFile] = args.filter((arg) => !arg.startsWith('--'));

if (!GENERATIONS[gen]) {
  console.error(
    `Usage: node scripts/extract-release-notes.js <${Object.keys(
      GENERATIONS
    ).join('|')}> [outFile] [--version=x.y.z]`
  );
  process.exit(1);
}

const { changelog, pkg } = GENERATIONS[gen];
const version = override
  ? override.slice('--version='.length)
  : JSON.parse(readFileSync(join(root, pkg), 'utf-8')).version;
const lines = readFileSync(join(root, changelog), 'utf-8').split('\n');

const heading = (line) => {
  const match = /^(#{1,3})\s+(.*)$/.exec(line);
  return match ? { level: match[1].length, text: match[2].trim() } : null;
};

// Anchor on the version at the start of the heading text. A gen1 heading also names
// the previous version in its compare link, so a loose search would match the wrong
// section when extracting notes for that earlier version.
const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const startsWithVersion = new RegExp(`^\\[?${escaped}\\]?([^\\w.-]|$)`);

const start = lines.findIndex((line) => {
  const found = heading(line);
  return found && startsWithVersion.test(found.text);
});

if (start === -1) {
  console.error(`No ${changelog} section found for version ${version}.`);
  process.exit(1);
}

const startLevel = heading(lines[start]).level;

// Run to the next heading at the same level or shallower; that heading opens the
// previous release (or a trailing file section) and is not part of these notes.
let end = lines.length;
for (let i = start + 1; i < lines.length; i += 1) {
  const found = heading(lines[i]);
  if (found && found.level <= startLevel) {
    end = i;
    break;
  }
}

// Drop the version heading itself - the release already carries the version as its
// title - and trim the blank lines left at either edge of the slice.
const notes = lines
  .slice(start + 1, end)
  .join('\n')
  .trim();

if (!notes) {
  console.error(`The ${changelog} section for version ${version} is empty.`);
  process.exit(1);
}

if (outFile) {
  writeFileSync(outFile, `${notes}\n`);
  console.log(`Wrote ${gen} ${version} release notes to ${outFile}`);
} else {
  console.log(notes);
}
