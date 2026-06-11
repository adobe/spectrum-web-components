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
 * MVP generator for `docs.llm.md`: the LLM-consumable component documentation
 * proposed in https://wiki.corp.adobe.com/spaces/AdobeDesign/pages/3854270520.
 *
 * Source of truth is the 1st-gen component README. The transform is fully
 * deterministic (no LLM in the loop): it strips Storybook/docs-site chrome from
 * the README and prepends a small metadata frontmatter block. The same input
 * always produces the same output, so the file can be regenerated and diffed in
 * CI to detect drift from the README.
 *
 * Source:  1st-gen/packages/{name}/README.md
 * Target:  1st-gen/packages/{name}/docs.llm.md
 *
 * Usage:
 *   node scripts/generate-llm-docs.mjs              # write the 5 MVP components
 *   node scripts/generate-llm-docs.mjs button menu  # write specific components
 *   node scripts/generate-llm-docs.mjs --check       # verify on-disk files are current (no writes)
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const PACKAGES_DIR = join(REPO_ROOT, '1st-gen', 'packages');

// The MVP slice. These five stress different generator edge cases: simple
// (button), near-duplicate (action-button), slotted (menu), composition-heavy
// (picker), and overlay + a11y-heavy (dialog).
const MVP_COMPONENTS = ['button', 'picker', 'menu', 'action-button', 'dialog'];

const OUTPUT_FILENAME = 'docs.llm.md';
const GENERATED_LINE_PREFIX = 'generated:';

/**
 * Deterministic chrome-stripping rules applied to the raw README body.
 * Each rule is intentionally line- or fence-scoped so the transform stays
 * predictable and easy to diff.
 */
function stripChrome(readme) {
  const inputLines = readme.split('\n');
  const outputLines = [];

  for (const rawLine of inputLines) {
    const line = rawLine.replace(/\s+$/, '');

    // Rule 1: drop NPM / Bundlephobia / Stackblitz shield badge lines.
    if (/^\[!\[.*\]\(.*\)\]\(.*\)$/.test(line.trim())) {
      continue;
    }

    // Rule 2: drop Storybook tab chrome wrappers; keep their inner content.
    if (/^<\/?sp-tabs?(\s|>|$)/.test(line.trim())) {
      continue;
    }
    if (/^<\/?sp-tab-panel(\s|>|$)/.test(line.trim())) {
      continue;
    }

    // Rule 3: normalize live-demo fences (```html demo, ```html demo ignore,
    // ```html demo open, ...) down to a plain language fence (```html).
    const fenceMatch = line.match(/^(\s*```[a-z0-9]+)\s+demo\b.*$/i);
    if (fenceMatch) {
      outputLines.push(fenceMatch[1]);
      continue;
    }

    outputLines.push(line);
  }

  // Rule 4: collapse 3+ blank lines into a single blank line and trim ends.
  return outputLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Derive the registered custom-element tag from the side-effect import line in
 * the README (e.g. `@spectrum-web-components/button/sp-button.js` -> sp-button).
 * Falls back to `sp-{name}` when the import line is absent.
 */
function deriveTag(name, readme) {
  const importMatch = readme.match(
    new RegExp(`@spectrum-web-components/${name}/(sp-[a-z0-9-]+)\\.js`, 'i')
  );
  return importMatch ? importMatch[1] : `sp-${name}`;
}

function buildFrontmatter(name, tag) {
  return [
    '---',
    `component: ${name}`,
    `tag: ${tag}`,
    `package: '@spectrum-web-components/${name}'`,
    `source: 1st-gen/packages/${name}/README.md`,
    `${GENERATED_LINE_PREFIX} ${new Date().toISOString()}`,
    'generator: scripts/generate-llm-docs.mjs',
    '---',
  ].join('\n');
}

function generate(name) {
  const readmePath = join(PACKAGES_DIR, name, 'README.md');
  if (!existsSync(readmePath)) {
    throw new Error(`README not found for "${name}" at ${readmePath}`);
  }
  const readme = readFileSync(readmePath, 'utf8');
  const tag = deriveTag(name, readme);
  const body = stripChrome(readme);
  return `${buildFrontmatter(name, tag)}\n\n${body}\n`;
}

/** Drop the volatile `generated:` line so drift checks ignore the timestamp. */
function withoutTimestamp(content) {
  return content
    .split('\n')
    .filter((line) => !line.startsWith(GENERATED_LINE_PREFIX))
    .join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const requested = args.filter((arg) => !arg.startsWith('--'));
  const components = requested.length > 0 ? requested : MVP_COMPONENTS;

  let drifted = 0;
  let written = 0;

  for (const name of components) {
    const generated = generate(name);
    const outputPath = join(PACKAGES_DIR, name, OUTPUT_FILENAME);

    if (checkOnly) {
      const current = existsSync(outputPath)
        ? readFileSync(outputPath, 'utf8')
        : '';
      if (withoutTimestamp(current) !== withoutTimestamp(generated)) {
        drifted += 1;
        console.error(
          `[generate-llm-docs] DRIFT: ${name}/${OUTPUT_FILENAME} is out of date`
        );
      }
      continue;
    }

    writeFileSync(outputPath, generated, 'utf8');
    written += 1;
    console.log(
      `[generate-llm-docs] wrote 1st-gen/packages/${name}/${OUTPUT_FILENAME}`
    );
  }

  if (checkOnly) {
    if (drifted > 0) {
      console.error(
        `[generate-llm-docs] ${drifted} file(s) out of date; run "yarn generate:llm-docs"`
      );
      process.exit(1);
    }
    console.log(
      `[generate-llm-docs] all ${components.length} file(s) up to date`
    );
    return;
  }

  console.log(`[generate-llm-docs] generated ${written} file(s)`);
}

main();
