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
 * Copies swc's shared icon stylesheet into this package. The workflow icon elements need
 * the same box styling as `<swc-icon>` and `<swc-ui-icon>`, but this package depends only
 * on core and cannot import from swc, so it ships a generated copy instead.
 *
 * Source: gen2/packages/swc/stylesheets/_lit-styles/icon-base.css (edit this one)
 * Output: gen2/packages/icons/src/stylesheets/icon-base.css (generated; do not edit)
 *
 * The copy is the source verbatim, with a "generated" banner after the license header.
 *
 *   yarn generate:icon-styles   write the copy (also run by `yarn generate:workflow-icons`)
 *   yarn check:icon-styles      exit 1 if the copy is out of date (run by `yarn build`)
 *
 * Both commands work from this package or the repo root.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Build-time helpers shared with the icon generators. Imported by path: core publishes
// only dist/, so these are not package exports.
import { generatedBanner, LICENSE } from '../../core/tools/icons/format.mjs';

const COMMAND = 'yarn generate:icon-styles';
const SOURCE_LABEL = 'gen2/packages/swc/stylesheets/_lit-styles/icon-base.css';
const OUTPUT_LABEL = 'gen2/packages/icons/src/stylesheets/icon-base.css';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const sourceFile = path.resolve(
  packageRoot,
  '..',
  'swc',
  'stylesheets',
  '_lit-styles',
  'icon-base.css'
);
const outFile = path.join(packageRoot, 'src', 'stylesheets', 'icon-base.css');

const checkOnly = process.argv.includes('--check');

const source = readFileSync(sourceFile, 'utf8');

// Drop the source's own license header so the copy carries exactly one, followed by the
// banner. Everything after the header is copied unchanged.
const body = source.replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
const expected = `${LICENSE}

${generatedBanner(COMMAND, SOURCE_LABEL)}
${body}`;

if (checkOnly) {
  const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : null;
  if (current !== expected) {
    console.error(
      `${OUTPUT_LABEL} is out of date with ${SOURCE_LABEL}.\n` +
        `Run \`${COMMAND}\` (from gen2/packages/icons or the repo root) and commit the result. ` +
        `Make style changes in the swc source, not in the copy.`
    );
    process.exit(1);
  }
  console.log(`${OUTPUT_LABEL} is up to date.`);
} else {
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, expected);
  console.log(`Copied ${SOURCE_LABEL} to ${OUTPUT_LABEL}.`);
}
