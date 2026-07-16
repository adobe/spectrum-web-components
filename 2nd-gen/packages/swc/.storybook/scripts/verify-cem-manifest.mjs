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
 * Verifies `dist/custom-elements.json` exists and is non-empty right after
 * `yarn analyze` runs, before the VRT Storybook build starts. That build
 * resolves a static import of this generated, gitignored file (see
 * components/button/test/vrt/button-custom-properties.vrt.ts); a missing
 * manifest otherwise surfaces as a confusing "could not resolve import"
 * error deep inside Rollup instead of a clear signal at the source.
 *
 * Run from the 2nd-gen/packages/swc directory:
 *   node .storybook/scripts/verify-cem-manifest.mjs
 */

import { existsSync, readdirSync, statSync } from 'fs';
import { resolve } from 'path';

const manifestPath = resolve('dist/custom-elements.json');
const exists = existsSync(manifestPath);
const size = exists ? statSync(manifestPath).size : 0;

if (!exists || size === 0) {
  console.error(
    `ERROR: ${manifestPath} is missing or empty after 'yarn analyze'.`
  );
  console.error(`cwd: ${process.cwd()}`);
  try {
    console.error('Contents of dist/:', readdirSync(resolve('dist')));
  } catch (error) {
    console.error(
      'Could not read dist/ directory:',
      error instanceof Error ? error.message : error
    );
  }
  process.exit(1);
}

console.log(`OK: ${manifestPath} (${size} bytes)`);
