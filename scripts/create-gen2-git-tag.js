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
import { join } from 'path';

const swcPkgPath = join(process.cwd(), '2nd-gen/packages/swc/package.json');
const version = JSON.parse(readFileSync(swcPkgPath, 'utf8')).version;
const tag = `v${version}`;

try {
  execSync(`git rev-parse ${tag}`, { stdio: 'ignore' });
  console.log(`Tag ${tag} already exists.`);
} catch {
  console.log(`Creating tag ${tag}...`);
  execSync(`git tag -a ${tag} -m "Release @adobe/spectrum-wc@${version}"`, {
    stdio: 'inherit',
  });
  console.log(`Tag ${tag} created successfully.`);
  console.log(`Pushing tag ${tag} to remote...`);
  execSync(`git push origin ${tag}`, { stdio: 'inherit' });
  console.log(`Tag ${tag} pushed successfully.`);
}
