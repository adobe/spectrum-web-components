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
 * Generates CONTRIBUTOR-DOCS/00_get-started/component-matrix.md — a single
 * at-a-glance view of every 2nd-gen component's migration status, React
 * Spectrum 2 parity, and design/sandbox links.
 *
 * Scope: status-shaped metadata only. API surface (properties, attributes,
 * sizes, variants) is documented per component in its Storybook page and in
 * CEM; it does not belong in this matrix.
 *
 * Inputs:
 *   - CEM (.storybook/custom-elements.json) — tag, status, since (row set + three columns)
 *   - Per-component story files — Figma and Stackblitz URLs
 *   - component-matrix.data.yml — optional RSP parity override + notes
 *
 * RSP parity is a human judgment today (set via the YAML, defaulting to
 * `partial` for every component). Once MVP-5 lands, the CEM plugin will parse
 * an `@RSPparity` JSDoc tag on each component class and the YAML override
 * becomes unnecessary.
 *
 * Run from 2nd-gen/packages/swc:
 *   node .storybook/scripts/generate-component-matrix.mjs
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STORYBOOK_DIR = resolve(__dirname, '..');
const SWC_DIR = resolve(STORYBOOK_DIR, '..');
const COMPONENTS_DIR = resolve(SWC_DIR, 'components');
const CEM_PATH = resolve(STORYBOOK_DIR, 'custom-elements.json');
const REPO_ROOT = resolve(STORYBOOK_DIR, '../../../..');
const CONTRIBUTOR_DOCS_DIR = resolve(REPO_ROOT, 'CONTRIBUTOR-DOCS');
const DATA_FILE = resolve(
  CONTRIBUTOR_DOCS_DIR,
  '00_get-started/component-matrix.data.yml'
);
const OUTPUT_FILE = resolve(
  CONTRIBUTOR_DOCS_DIR,
  '00_get-started/component-matrix.md'
);
const GITHUB_REPO_URL =
  'https://github.com/adobe/spectrum-web-components/tree/main';

const GENERATED_HEADER = `<!-- GENERATED FILE — DO NOT EDIT DIRECTLY.
Regenerate with: yarn generate:component-matrix
Rows + status + since come from CEM (\`.storybook/custom-elements.json\`).
Figma + Stackblitz URLs come from each component's \`stories/*.stories.ts\`.
RSP 2 parity is a human judgment set in \`component-matrix.data.yml\` (defaults
to \`partial\`). It will move to an \`@RSPparity\` JSDoc tag parsed by CEM once
the MVP-5 CEM plugin lands. -->`;

/**
 * Extract a URL from a story file's meta.parameters block.
 *
 * @param {string} source - Raw TypeScript story file contents
 * @param {string} key - `design` or `stackblitz`
 * @returns {string | null} The first matching url, or null if none found
 */
function extractStoryUrl(source, key) {
  // Skip single-line comments so `// @todo ... design: { url: '<placeholder>' }`
  // doesn't match as a real URL.
  const uncommented = source
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('//'))
    .join('\n');

  const pattern = new RegExp(
    `${key}:\\s*\\{[^}]*?url:\\s*['"\`]([^'"\`]+)['"\`]`,
    's'
  );
  const match = uncommented.match(pattern);
  return match ? match[1] : null;
}

/**
 * Try a list of candidate filenames (handles kebab/camel naming) and return
 * contents of the first one that exists.
 *
 * @param {string} componentDir - Absolute path to component folder
 * @param {string} componentName - Folder name (e.g. 'progress-circle')
 * @returns {string | null}
 */
function readStoryFile(componentDir, componentName) {
  const storiesDir = resolve(componentDir, 'stories');
  const candidates = [
    `${componentName}.stories.ts`,
    `${componentName}.internal.stories.ts`,
  ];
  for (const candidate of candidates) {
    const path = resolve(storiesDir, candidate);
    if (existsSync(path)) {
      return readFileSync(path, 'utf8');
    }
  }
  return null;
}

/**
 * Walk CEM for every 2nd-gen custom element and extract the three status-shaped
 * fields we care about.
 *
 * @param {object} cem - Parsed custom-elements.json
 * @returns {Array<{ componentName: string, tagName: string, status: string, since: string }>}
 */
function collectComponentsFromCem(cem) {
  const rows = [];
  for (const mod of cem.modules || []) {
    for (const decl of mod.declarations || []) {
      if (!decl.tagName || !decl.tagName.startsWith('swc-')) {
        continue;
      }
      rows.push({
        componentName: decl.tagName.replace(/^swc-/, ''),
        tagName: decl.tagName,
        status: decl.status || 'unknown',
        since: decl.since || '—',
      });
    }
  }
  return rows;
}

function statusBadge(status) {
  const map = {
    preview: 'Preview',
    internal: 'Internal',
    stable: 'Stable',
    deprecated: 'Deprecated',
    unsupported: 'Unsupported',
  };
  return map[status] || status;
}

function resolveRspParity(parityOverride) {
  // Everything defaults to `partial` until per-component RSP tracking is in
  // place (see `@RSPparity` JSDoc tag, MVP-5). Overrides come from the YAML.
  return parityOverride || 'partial';
}

function buildRow(componentEntry, yamlOverride) {
  const { componentName, tagName, status, since } = componentEntry;

  const componentDir = resolve(COMPONENTS_DIR, componentName);
  const storySource = readStoryFile(componentDir, componentName);
  const figma = storySource ? extractStoryUrl(storySource, 'design') : null;
  const stackblitz = storySource
    ? extractStoryUrl(storySource, 'stackblitz')
    : null;

  const parity = resolveRspParity(yamlOverride?.parity);

  return {
    name: componentName,
    tag: tagName,
    status: statusBadge(status),
    since,
    parity,
    figma: figma ? `[Figma](${figma})` : '—',
    stackblitz: stackblitz ? `[Stackblitz](${stackblitz})` : '—',
    notes: yamlOverride?.notes ?? '',
  };
}

function renderMarkdown(rows) {
  const headers = [
    'Component',
    'Status',
    'Since',
    'RSP 2 parity',
    'Figma',
    'Stackblitz',
    'Notes',
  ];
  const alignment = headers.map(() => '---');
  const lines = [
    '# Component status',
    '',
    GENERATED_HEADER,
    '',
    'At-a-glance migration status, React Spectrum 2 parity, and design/',
    'sandbox links for every 2nd-gen component. API surface (properties,',
    "slots, events, CSS parts) lives on each component's Storybook page.",
    '',
    `| ${headers.join(' | ')} |`,
    `| ${alignment.join(' | ')} |`,
  ];

  for (const row of rows) {
    const cells = [
      `[\`<${row.tag}>\`](${GITHUB_REPO_URL}/2nd-gen/packages/swc/components/${row.name})`,
      row.status,
      row.since,
      row.parity,
      row.figma,
      row.stackblitz,
      row.notes,
    ];
    lines.push(`| ${cells.join(' | ')} |`);
  }

  lines.push('');
  lines.push('## Column meanings');
  lines.push('');
  lines.push(
    '- **Status** — `Preview` (API may change), `Stable` (public), `Internal` (not for consumers), `Deprecated`, `Unsupported`. Derived from CEM (`@status` JSDoc tag).'
  );
  lines.push(
    '- **Since** — first 2nd-gen package version to ship the component. Derived from CEM (`@since` JSDoc tag).'
  );
  lines.push(
    '- **RSP 2 parity** — whether the 2nd-gen component reaches feature parity with the equivalent React Spectrum 2 component. Values: `full`, `partial`, `none`, or a short note. Currently a human judgment set in `component-matrix.data.yml`; defaults to `partial` while per-component RSP tracking is being designed. Will move to an `@RSPparity` JSDoc tag parsed by CEM once the MVP-5 plugin lands.'
  );
  lines.push('');

  return lines.join('\n') + '\n';
}

function main() {
  if (!existsSync(CEM_PATH)) {
    console.error(
      `CEM manifest not found at ${CEM_PATH}. Run \`yarn analyze\` first.`
    );
    process.exit(1);
  }

  const cem = JSON.parse(readFileSync(CEM_PATH, 'utf8'));
  const overrides = existsSync(DATA_FILE)
    ? parseYaml(readFileSync(DATA_FILE, 'utf8')) || {}
    : {};

  const components = collectComponentsFromCem(cem).sort((a, b) =>
    a.componentName.localeCompare(b.componentName)
  );

  const rows = components.map((entry) =>
    buildRow(entry, overrides[entry.componentName])
  );

  if (rows.length === 0) {
    console.warn('No components found — nothing to write.');
    return;
  }

  const markdown = renderMarkdown(rows);
  writeFileSync(OUTPUT_FILE, markdown, 'utf8');
  console.log(`Wrote ${rows.length} components to component-matrix.md`);
}

main();
