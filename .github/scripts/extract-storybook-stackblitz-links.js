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

import { readdirSync, readFileSync, statSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Collect `.stories.ts` files under a directory (recursive).
 * @param {string} dir
 * @param {string[]} acc
 * @returns {string[]}
 */
const collectStoryFiles = (dir, acc = []) => {
  let names;
  try {
    names = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const name of names) {
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      collectStoryFiles(full, acc);
    } else if (name.endsWith('.stories.ts')) {
      acc.push(full);
    }
  }
  return acc;
};

/**
 * Parse `parameters.stackblitz.url` from a Storybook CSF file (best-effort regex).
 * @param {string} source
 * @returns {string | null}
 */
const extractStackBlitzUrl = (source) => {
  const match = source.match(
    /stackblitz\s*:\s*\{[\s\S]*?\burl\s*:\s*['"](https:\/\/[^'"]+)['"]/m
  );
  return match ? match[1] : null;
};

/**
 * Derive a short component label from `.../components/<name>/stories/...`.
 * @param {string} storyPath
 * @param {string} repoRoot
 * @returns {string}
 */
const componentLabelFromPath = (storyPath, repoRoot) => {
  const rel = relative(repoRoot, storyPath);
  const parts = rel.split(/[/\\]/);
  const componentsIdx = parts.indexOf('components');
  if (componentsIdx >= 0 && parts[componentsIdx + 1]) {
    return parts[componentsIdx + 1];
  }
  return parts.at(-1)?.replace(/\.stories\.ts$/, '') ?? 'story';
};

/**
 * Build markdown list items for 2nd-gen stories that define `parameters.stackblitz.url`.
 *
 * @param {string} [repoRoot] repository root (defaults to two levels above this script)
 * @returns {string} markdown lines starting with `- ` or a fallback line
 */
export const buildStackBlitzStoryLinksSection = (
  repoRoot = join(__dirname, '..', '..')
) => {
  const storiesRoot = join(repoRoot, '2nd-gen/packages/swc/components');
  const files = collectStoryFiles(storiesRoot);
  /** @type {Map<string, { label: string; rel: string }>} */
  const byUrl = new Map();

  for (const file of files) {
    let source;
    try {
      source = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    const url = extractStackBlitzUrl(source);
    if (!url) {
      continue;
    }
    const label = componentLabelFromPath(file, repoRoot);
    const rel = relative(repoRoot, file).replace(/\\/g, '/');
    if (!byUrl.has(url)) {
      byUrl.set(url, { label, rel });
    }
  }

  if (byUrl.size === 0) {
    return '- _No `parameters.stackblitz.url` entries found in 2nd-gen Storybook stories._';
  }

  const rows = [...byUrl.entries()]
    .sort((a, b) => a[1].label.localeCompare(b[1].label))
    .map(([url, { label, rel }]) => {
      return `- [${label}](${url}) — \`${rel}\``;
    });

  return rows.join('\n');
};
