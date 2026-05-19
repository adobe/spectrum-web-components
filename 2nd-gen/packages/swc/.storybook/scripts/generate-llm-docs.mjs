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
 * Generates static Markdown (with rendered HTML examples) from component docs.mdx files.
 *
 * Requires Storybook to be reachable (default http://localhost:6006). Examples are captured
 * from story iframes via Playwright, matching what users see in the docs canvases.
 *
 * Usage (from 2nd-gen/packages/swc):
 *   yarn analyze
 *   yarn storybook          # separate terminal, or use --start-storybook
 *   yarn generate:llm-docs
 *   yarn generate:llm-docs -- --component badge
 */

import { execSync, spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';

import { glob } from 'glob';
import { chromium } from 'playwright';

import { renderApiMarkdown } from './llm-docs/api-markdown.mjs';
import { renderGettingStartedMarkdown } from './llm-docs/getting-started.mjs';
import {
  parseDocsMdx,
  parseStoriesMeta,
} from './llm-docs/parse-docs-mdx.mjs';
import {
  buildStoryId,
  captureStoryHtml,
  exportNameToStorySlug,
  htmlExampleBlock,
} from './llm-docs/story-html.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SWC_DIR = resolve(__dirname, '../..');
const CEM_PATH = resolve(SWC_DIR, '.storybook/custom-elements.json');
const DEFAULT_STORYBOOK_URL = 'http://localhost:6006';

/**
 * @param {string} exportName
 * @returns {string}
 */
function humanizeExportName(exportName) {
  return exportNameToStorySlug(exportName)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * @param {string} url
 * @returns {Promise<boolean>}
 */
async function isStorybookUp(url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * @param {string} url
 * @returns {Promise<import('node:child_process').ChildProcess>}
 */
async function startStorybook(url) {
  console.log('Starting Storybook (this may take a minute)…');

  const child = spawn(
    'yarn',
    ['exec', 'storybook', 'dev', '-p', '6006', '--no-open'],
    {
      cwd: SWC_DIR,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, BROWSER: 'none' },
    }
  );

  child.stdout?.on('data', (chunk) => {
    const text = chunk.toString();
    if (text.includes('error') || text.includes('Error')) {
      process.stderr.write(text);
    }
  });
  child.stderr?.on('data', (chunk) => process.stderr.write(chunk));

  for (let attempt = 0; attempt < 180; attempt++) {
    if (await isStorybookUp(url)) {
      console.log('Storybook is ready.');
      return child;
    }
    await sleep(1000);
  }

  child.kill();
  throw new Error(
    `Storybook did not become ready at ${url} within 3 minutes.`
  );
}

/**
 * @param {string} componentDir
 * @param {import('playwright').Page} page
 * @param {string} storybookUrl
 * @returns {Promise<string>}
 */
async function generateComponentMarkdown(componentDir, page, storybookUrl) {
  const componentSlug = componentDir.split('/').pop();
  const docsMdxPath = join(componentDir, 'docs.mdx');
  const storiesPath = join(componentDir, 'stories', `${componentSlug}.stories.ts`);

  if (!existsSync(storiesPath)) {
    throw new Error(`Missing stories file: ${storiesPath}`);
  }

  const mdxSource = readFileSync(docsMdxPath, 'utf8');
  const storiesSource = readFileSync(storiesPath, 'utf8');
  const { segments, subtitle } = parseDocsMdx(mdxSource);
  const meta = parseStoriesMeta(storiesSource);

  const cem = JSON.parse(readFileSync(CEM_PATH, 'utf8'));
  const tagName = meta.component;

  if (!tagName) {
    throw new Error(`Could not read component tag from ${storiesPath}`);
  }

  /** @type {string[]} */
  const parts = [
    '---',
    `component: ${tagName}`,
    `title: ${meta.title}`,
    `source: components/${componentSlug}/docs.mdx`,
    `generated: ${new Date().toISOString()}`,
    '---',
    '',
    `# ${meta.title}`,
    '',
  ];

  if (subtitle) {
    parts.push(`_${subtitle}_`, '');
  }

  for (const segment of segments) {
    if (segment.type === 'markdown') {
      parts.push(segment.content);
      continue;
    }

    if (segment.type === 'getting-started') {
      const kind = meta.migrated ? 'migrated' : 'utility';
      parts.push(renderGettingStartedMarkdown(meta.title, kind), '');
      continue;
    }

    if (segment.type === 'api-table') {
      parts.push(renderApiMarkdown(cem, tagName), '');
      continue;
    }

    if (segment.type === 'story') {
      const storyId = buildStoryId(componentSlug, segment.exportName);
      const label = humanizeExportName(segment.exportName);

      console.log(`  Capturing ${storyId}…`);

      const html = await captureStoryHtml(page, storyId, tagName, storybookUrl);
      parts.push(htmlExampleBlock(html, label), '');
    }
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

async function main() {
  const args = process.argv.slice(2);
  const componentArgIndex = args.indexOf('--component');
  const componentFilter =
    componentArgIndex >= 0 ? args[componentArgIndex + 1] : null;
  const startStorybook = args.includes('--start-storybook');
  const storybookUrl = process.env.STORYBOOK_URL ?? DEFAULT_STORYBOOK_URL;

  if (!existsSync(CEM_PATH)) {
    console.log('Running yarn analyze…');
    execSync('yarn analyze', { cwd: SWC_DIR, stdio: 'inherit' });
  }

  const docsPattern = componentFilter
    ? `components/${componentFilter}/docs.mdx`
    : 'components/*/docs.mdx';

  const docsFiles = await glob(docsPattern, { cwd: SWC_DIR, absolute: true });

  if (docsFiles.length === 0) {
    console.error(
      componentFilter
        ? `No docs.mdx found for component "${componentFilter}".`
        : 'No components/*/docs.mdx files found.'
    );
    process.exit(1);
  }

  /** @type {import('node:child_process').ChildProcess | null} */
  let storybookProcess = null;

  if (!(await isStorybookUp(storybookUrl))) {
    if (startStorybook) {
      storybookProcess = await startStorybook(storybookUrl);
    } else {
      console.error(
        `Storybook is not running at ${storybookUrl}.\n` +
          'Start it with `yarn storybook` or pass --start-storybook.'
      );
      process.exit(1);
    }
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    for (const docsMdxPath of docsFiles) {
      const componentDir = dirname(docsMdxPath);
      const componentSlug = componentDir.split('/').pop();
      const outputPath = join(componentDir, 'docs.llm.md');

      console.log(`\nGenerating ${componentSlug} → docs.llm.md`);

      const markdown = await generateComponentMarkdown(
        componentDir,
        page,
        storybookUrl
      );

      writeFileSync(outputPath, markdown, 'utf8');
      console.log(`  Wrote ${outputPath}`);
    }
  } finally {
    await browser.close();
    if (storybookProcess) {
      storybookProcess.kill();
    }
  }

  console.log('\nDone.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
