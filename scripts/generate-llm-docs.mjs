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
 * Generator for `docs.llm.md`: the LLM-consumable component documentation
 * proposed in https://wiki.corp.adobe.com/spaces/AdobeDesign/pages/3854270520.
 *
 * Source of truth is the 1st-gen component README. The transform is fully
 * deterministic (no LLM in the loop): it strips Storybook/docs-site chrome from
 * the README and prepends a small metadata frontmatter block. The same input
 * always produces the same output, so the file can be regenerated and diffed in
 * CI to detect drift from the README.
 *
 * Two outputs per component, written from one generated string so they stay
 * byte-identical:
 *   1. 1st-gen/packages/{name}/docs.llm.md       per-component, lives beside the README
 *   2. 1st-gen/projects/llm-docs/{name}.llm.md   aggregate, published as
 *                                                @spectrum-web-components/llm-docs
 *
 * Component discovery is automatic: any 1st-gen package whose README registers
 * a custom element (a `@spectrum-web-components/{name}/sp-*.js` side-effect
 * import) is treated as a component. Icon-set and tooling packages are skipped.
 *
 * Usage:
 *   node scripts/generate-llm-docs.mjs               # every gen1 component + aggregate package
 *   node scripts/generate-llm-docs.mjs --mvp         # only the original 5 MVP components
 *   node scripts/generate-llm-docs.mjs button menu   # only the named components
 *   node scripts/generate-llm-docs.mjs --check       # verify on-disk files are current (no writes)
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const PACKAGES_DIR = join(REPO_ROOT, '1st-gen', 'packages');
const AGGREGATE_PKG_DIR = join(REPO_ROOT, '1st-gen', 'projects', 'llm-docs');

// The original MVP slice. Kept for `--mvp`. These five stress different
// generator edge cases: simple (button), near-duplicate (action-button),
// slotted (menu), composition-heavy (picker), overlay + a11y-heavy (dialog).
const MVP_COMPONENTS = ['button', 'picker', 'menu', 'action-button', 'dialog'];

const PER_COMPONENT_FILENAME = 'docs.llm.md';
const AGGREGATE_SUFFIX = '.llm.md';
const AGGREGATE_README = 'README.md';
const GENERATED_LINE_PREFIX = 'generated:';

/**
 * A package is a component when its README registers a custom element via a
 * `@spectrum-web-components/{name}/sp-*.js` side-effect import. This filters out
 * icon-set packages (icons-ui, icons-workflow, iconset) and any tooling.
 */
function componentImportPattern(name) {
  return new RegExp(
    `@spectrum-web-components/${name}/(sp-[a-z0-9-]+)\\.js`,
    'i'
  );
}

function isComponentPackage(name) {
  const readmePath = join(PACKAGES_DIR, name, 'README.md');
  if (!existsSync(readmePath)) {
    return false;
  }
  return componentImportPattern(name).test(readFileSync(readmePath, 'utf8'));
}

/** Discover every gen1 component package, sorted for stable output. */
function discoverComponents() {
  return readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter(isComponentPackage)
    .sort();
}

/**
 * Deterministic chrome-stripping rules applied to the raw README body.
 * Each rule is intentionally line- or fence-scoped so the transform stays
 * predictable and easy to diff.
 *
 * Chrome rules only run OUTSIDE fenced code blocks. The `<sp-tabs>` /
 * `<sp-tab>` / `<sp-tab-panel>` elements are Storybook layout chrome when they
 * organize a README's examples, but they are literal example content for the
 * Tabs component itself. Inside a code fence the content is left untouched.
 */
function stripChrome(readme) {
  const inputLines = readme.split('\n');
  const outputLines = [];
  let inFence = false;

  for (const rawLine of inputLines) {
    const line = rawLine.replace(/\s+$/, '');
    const trimmed = line.trim();

    // Fence boundaries toggle the literal-content mode.
    if (/^```/.test(trimmed)) {
      if (!inFence) {
        // Opening fence: normalize live-demo fences (```html demo,
        // ```html demo ignore, ...) down to a plain language fence (```html).
        const fenceMatch = line.match(/^(\s*```[a-z0-9]+)\s+demo\b.*$/i);
        outputLines.push(fenceMatch ? fenceMatch[1] : line);
        inFence = true;
      } else {
        outputLines.push(line);
        inFence = false;
      }
      continue;
    }

    // Inside a fence: literal example code, never stripped.
    if (inFence) {
      outputLines.push(line);
      continue;
    }

    // Rule 1: drop NPM / Bundlephobia / Stackblitz shield badge lines.
    if (/^\[!\[.*\]\(.*\)\]\(.*\)$/.test(trimmed)) {
      continue;
    }

    // Rule 2: drop Storybook tab chrome wrappers; keep their inner content.
    if (/^<\/?sp-tabs?(\s|>|$)/.test(trimmed)) {
      continue;
    }
    if (/^<\/?sp-tab-panel(\s|>|$)/.test(trimmed)) {
      continue;
    }

    outputLines.push(line);
  }

  return (
    outputLines
      .join('\n')
      // Drop fenced blocks left empty after chrome stripping.
      .replace(/```[a-z0-9]*\n(?:[ \t]*\n)*```/gi, '')
      // Collapse 3+ blank lines into a single blank line and trim ends.
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

/**
 * Derive the registered custom-element tag from the side-effect import line in
 * the README (e.g. `@spectrum-web-components/button/sp-button.js` -> sp-button).
 * Falls back to `sp-{name}` when the import line is absent.
 */
function deriveTag(name, readme) {
  const importMatch = readme.match(componentImportPattern(name));
  return importMatch ? importMatch[1] : `sp-${name}`;
}

function buildFrontmatter(name, tag, timestamp) {
  return [
    '---',
    `component: ${name}`,
    `tag: ${tag}`,
    `package: '@spectrum-web-components/${name}'`,
    `source: 1st-gen/packages/${name}/README.md`,
    `${GENERATED_LINE_PREFIX} ${timestamp}`,
    'generator: scripts/generate-llm-docs.mjs',
    '---',
  ].join('\n');
}

function generate(name, timestamp) {
  const readmePath = join(PACKAGES_DIR, name, 'README.md');
  if (!existsSync(readmePath)) {
    throw new Error(`README not found for "${name}" at ${readmePath}`);
  }
  const readme = readFileSync(readmePath, 'utf8');
  const tag = deriveTag(name, readme);
  const body = stripChrome(readme);
  return `${buildFrontmatter(name, tag, timestamp)}\n\n${body}\n`;
}

/** README index for the aggregate package, listing every bundled component. */
function buildAggregateReadme(names) {
  const list = names
    .map(
      (name) =>
        `- [\`${name}.llm.md\`](./${name}.llm.md) (\`@spectrum-web-components/${name}\`)`
    )
    .join('\n');
  return `<!-- Generated by scripts/generate-llm-docs.mjs. Do not edit by hand. -->

# @spectrum-web-components/llm-docs

LLM-consumable documentation for Spectrum Web Components, one \`{component}.llm.md\`
file per component. Each file is derived deterministically from the component's
README and is byte-identical to the \`docs.llm.md\` that lives beside that README.

This package is optional. Install it when an AI assistant or build-time tool
needs the component docs as plain markdown:

\`\`\`bash
yarn add @spectrum-web-components/llm-docs
\`\`\`

## Bundled components (${names.length})

${list}
`;
}

/** Drop the volatile `generated:` line so drift checks ignore the timestamp. */
function withoutTimestamp(content) {
  return content
    .split('\n')
    .filter((line) => !line.startsWith(GENERATED_LINE_PREFIX))
    .join('\n');
}

function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const mvpOnly = args.includes('--mvp');
  const requested = args.filter((arg) => !arg.startsWith('--'));

  let components;
  if (requested.length > 0) {
    components = requested;
  } else if (mvpOnly) {
    components = MVP_COMPONENTS;
  } else {
    components = discoverComponents();
  }

  // A single timestamp per run keeps the per-component and aggregate copies
  // byte-identical.
  const timestamp = new Date().toISOString();
  const aggregateReadme = buildAggregateReadme(components);

  if (checkOnly) {
    let drifted = 0;
    for (const name of components) {
      const expected = generate(name, timestamp);
      const perComponent = readIfExists(
        join(PACKAGES_DIR, name, PER_COMPONENT_FILENAME)
      );
      const aggregate = readIfExists(
        join(AGGREGATE_PKG_DIR, `${name}${AGGREGATE_SUFFIX}`)
      );
      if (withoutTimestamp(perComponent) !== withoutTimestamp(expected)) {
        drifted += 1;
        console.error(
          `[generate-llm-docs] DRIFT: packages/${name}/${PER_COMPONENT_FILENAME}`
        );
      }
      if (withoutTimestamp(aggregate) !== withoutTimestamp(expected)) {
        drifted += 1;
        console.error(
          `[generate-llm-docs] DRIFT: projects/llm-docs/${name}${AGGREGATE_SUFFIX}`
        );
      }
    }
    if (
      readIfExists(join(AGGREGATE_PKG_DIR, AGGREGATE_README)) !==
      aggregateReadme
    ) {
      drifted += 1;
      console.error(
        `[generate-llm-docs] DRIFT: projects/llm-docs/${AGGREGATE_README}`
      );
    }
    if (drifted > 0) {
      console.error(
        `[generate-llm-docs] ${drifted} file(s) out of date; run "yarn generate:llm-docs"`
      );
      process.exit(1);
    }
    console.log(
      `[generate-llm-docs] all files up to date for ${components.length} component(s)`
    );
    return;
  }

  // Write mode. Only wipe stale aggregate files when regenerating the full set;
  // a scoped run (explicit names or --mvp) must not delete the other files.
  const fullRun = requested.length === 0 && !mvpOnly;
  mkdirSync(AGGREGATE_PKG_DIR, { recursive: true });
  if (fullRun) {
    for (const file of readdirSync(AGGREGATE_PKG_DIR)) {
      if (file.endsWith(AGGREGATE_SUFFIX)) {
        rmSync(join(AGGREGATE_PKG_DIR, file));
      }
    }
  }

  for (const name of components) {
    const content = generate(name, timestamp);
    writeFileSync(
      join(PACKAGES_DIR, name, PER_COMPONENT_FILENAME),
      content,
      'utf8'
    );
    writeFileSync(
      join(AGGREGATE_PKG_DIR, `${name}${AGGREGATE_SUFFIX}`),
      content,
      'utf8'
    );
  }

  if (fullRun) {
    writeFileSync(
      join(AGGREGATE_PKG_DIR, AGGREGATE_README),
      aggregateReadme,
      'utf8'
    );
  }

  console.log(
    `[generate-llm-docs] wrote ${components.length} component(s) to packages/*/${PER_COMPONENT_FILENAME} and projects/llm-docs/`
  );
}

main();
