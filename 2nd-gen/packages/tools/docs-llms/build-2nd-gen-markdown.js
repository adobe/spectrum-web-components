/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * Generates one static .md file per 2nd-gen component from story JSDoc (overview, anatomy,
 * options, states, behaviors, accessibility). Output is analogous to 1st-gen component READMEs.
 *
 * Usage:
 *   node build-2nd-gen-markdown.js [--components-dir=<path>] [--out-dir=<path>]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const argv = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v ?? true];
    })
);

const componentsDir = path.resolve(
  argv['components-dir'] ?? path.join(__dirname, '../../swc/components')
);
const outDir = path.resolve(
  argv['out-dir'] ?? path.join(__dirname, 'dist', '2nd-gen', 'components')
);

/** Preferred section order in the generated doc */
const SECTION_ORDER = [
  'Overview',
  'Anatomy',
  'Sizes',
  'SemanticVariants',
  'Semantic variants',
  'NonSemanticVariants',
  'Non-semantic variants',
  'Outline',
  'Subtle',
  'Fixed',
  'StaticColors',
  'Static colors',
  'States',
  'Indeterminate',
  'TextWrapping',
  'Text wrapping',
  'Accessibility',
];

function nameToTitle(name) {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/^ /, '')
    .trim();
}

/**
 * Extract JSDoc blocks and the export/declaration that follows. Returns [{ jsdoc, name }, ...].
 * Skips the file header (copyright) block. Handles both "export const X" and "const meta".
 */
function extractStoryDocs(content) {
  const blocks = [];
  const exportRe =
    /\/\*\*([\s\S]*?)\*\/\s*(?:\/\/[^\n]*\n)*\s*export\s+const\s+(\w+)/g;
  let m;
  while ((m = exportRe.exec(content)) !== null) {
    const jsdoc = normalizeJsdoc(m[1]);
    const name = m[2];
    if (jsdoc.includes('Copyright') && jsdoc.includes('License')) {
      continue;
    }
    blocks.push({ jsdoc, name });
  }
  const constMetaRe =
    /\/\*\*([\s\S]*?)\*\/\s*(?:\/\/[^\n]*\n)*\s*const\s+meta\s*:/;
  const constMetaMatch = content.match(constMetaRe);
  if (constMetaMatch) {
    const jsdoc = constMetaMatch[1].replace(/\n\s*\*\s?/g, '\n').trim();
    if (!jsdoc.includes('Copyright')) {
      const existing = blocks.find((b) => b.name === 'meta');
      if (!existing) {
        blocks.push({ jsdoc, name: 'meta' });
      }
    }
  }
  return blocks;
}

/** Get subtitle from parameters.docs.subtitle in the story file */
function getSubtitle(content) {
  const match = content.match(/subtitle:\s*`([^`]+)`/);
  return match ? match[1].trim() : null;
}

/** Strip JSDoc line prefixes ( * or * ) and trim. */
function normalizeJsdoc(block) {
  return block
    .replace(/^\s*\*\s?/gm, '')
    .replace(/^\s+/gm, '')
    .trim();
}

/** Get overview: last JSDoc block before "export const meta" or "const meta" */
function getOverviewJsdoc(content) {
  const metaIndex = content.search(/\b(?:export\s+)?const\s+meta\s*[:=]/);
  if (metaIndex < 0) {
    return null;
  }
  const before = content.slice(0, metaIndex);
  const all = [...before.matchAll(/\/\*\*([\s\S]*?)\*\/\s*/g)];
  const last = all[all.length - 1];
  if (!last) {
    return null;
  }
  const jsdoc = normalizeJsdoc(last[1]);
  if (jsdoc.includes('Copyright') && jsdoc.includes('License')) {
    return null;
  }
  return jsdoc;
}

/** Build a single component's markdown from its story file content and display name */
function buildComponentMarkdown(componentName, content, displayName) {
  const subtitle = getSubtitle(content);
  const blocks = extractStoryDocs(content);
  const overviewJsdoc = getOverviewJsdoc(content);
  const overviewText =
    overviewJsdoc ??
    blocks.find((b) => b.name === 'meta')?.jsdoc ??
    (subtitle ? `\n\n${subtitle}` : '');
  const sectionBlocks = blocks.filter(
    (b) => b.name !== 'meta' && b.name !== 'Playground' && b.name !== 'default'
  );

  const sections = [];
  sections.push(`# ${displayName}\n`);
  if (overviewText) {
    sections.push('## Overview\n\n');
    sections.push(overviewText.trim());
    sections.push('\n\n');
  }

  sectionBlocks.sort((a, b) => {
    const ai =
      SECTION_ORDER.indexOf(a.name) >= 0
        ? SECTION_ORDER.indexOf(a.name)
        : SECTION_ORDER.length;
    const bi =
      SECTION_ORDER.indexOf(b.name) >= 0
        ? SECTION_ORDER.indexOf(b.name)
        : SECTION_ORDER.length;
    if (ai !== bi) {
      return ai - bi;
    }
    return a.name.localeCompare(b.name);
  });

  for (const { jsdoc, name } of sectionBlocks) {
    const heading = nameToTitle(name);
    sections.push(`## ${heading}\n\n`);
    sections.push(jsdoc.trim());
    sections.push('\n\n');
  }

  return sections.join('').trimEnd() + '\n';
}

function main() {
  if (!fs.existsSync(componentsDir)) {
    console.warn('Components dir not found:', componentsDir);
    return;
  }
  fs.mkdirSync(outDir, { recursive: true });

  const dirs = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(componentsDir, name, 'stories')))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  for (const name of dirs) {
    const storiesDir = path.join(componentsDir, name, 'stories');
    const files = fs
      .readdirSync(storiesDir)
      .filter((f) => f.endsWith('.stories.ts'));
    const storyFile = files.find((f) => f.startsWith(name)) || files[0];
    if (!storyFile) {
      continue;
    }
    const filePath = path.join(storiesDir, storyFile);
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch {
      continue;
    }
    const displayName = nameToTitle(name);
    const md = buildComponentMarkdown(name, content, displayName);
    const outPath = path.join(outDir, `${name}.md`);
    fs.writeFileSync(outPath, md, 'utf8');
  }
}

main();
