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

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Package whose version defines the release tag for each generation - both are
// members of that generation's fixed/linked group, so any package there would do.
const GENERATIONS = {
  gen1: '1st-gen/packages/button/package.json',
  gen2: '2nd-gen/packages/swc/package.json',
};

const gen = process.argv[2];
if (!GENERATIONS[gen]) {
  console.error(
    `Usage: node scripts/create-git-tag.js <${Object.keys(GENERATIONS).join('|')}>`
  );
  process.exit(1);
}

// Read package.json directly to avoid caching issues
const pkgPath = join(root, GENERATIONS[gen]);
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const tag = `${gen}-${pkg.version}`;

try {
  // Check if the tag already exists
  execSync(`git rev-parse ${tag}`, { stdio: 'ignore' });
  console.log(`Tag ${tag} already exists.`);
} catch (error) {
  console.error(`Tag didn't exist:`, error.message);
  console.log(`Creating tag ${tag}...`);
  execSync(`git tag -a ${tag} -m "Release ${tag}"`, {
    stdio: 'inherit',
  });
  console.log(`Tag ${tag} created successfully.`);
  console.log(`Pushing tag ${tag} to remote...`);
  execSync(`git push origin ${tag}`, { stdio: 'inherit' });
  console.log(`Tag ${tag} pushed successfully.`);
}
