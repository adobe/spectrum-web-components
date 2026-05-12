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
 * Post-processing script for 2nd-gen CHANGELOGs.
 *
 * The changesets library hardcodes "### Major Changes", "### Minor Changes",
 * and "### Patch Changes" headings. This script strips them so 2nd-gen
 * CHANGELOGs contain flat bullets under each version heading.
 *
 * Run automatically by scripts/publish.js after `yarn changeset version`.
 * Safe to run repeatedly (idempotent).
 *
 * See CONTRIBUTOR-DOCS/01_contributor-guides/15_changelog-strategy.md
 */

const fs = require('fs');
const path = require('path');

const CHANGELOG_PATHS = [
  path.resolve(__dirname, '../2nd-gen/packages/swc/CHANGELOG.md'),
  path.resolve(__dirname, '../2nd-gen/packages/core/CHANGELOG.md'),
];

const HEADING_PATTERN = /^### (?:Major|Minor|Patch) Changes\s*$/;

for (const filePath of CHANGELOG_PATHS) {
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const original = fs.readFileSync(filePath, 'utf8');

  const cleaned = original
    .split('\n')
    .filter((line) => !HEADING_PATTERN.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');

  if (cleaned !== original) {
    fs.writeFileSync(filePath, cleaned, 'utf8');
    console.log(`Cleaned: ${path.relative(process.cwd(), filePath)}`);
  }
}
