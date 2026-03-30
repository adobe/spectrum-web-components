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
 * Generates standalone .md files for each component and guide, served at
 * stable predictable URLs for AI tools and documentation consumers.
 *
 * Data sources:
 *   - 2nd-gen/packages/swc/components/[name]/stories/*.stories.ts  (JSDoc sections)
 *   - custom-elements.json  (2nd-gen API — attributes, slots, events, CSS props)
 *   - 1st-gen/packages/[name]/README.md  (1st-gen component docs, copied verbatim)
 *   - 2nd-gen/packages/swc/.storybook/guides/**\/*.mdx  (guide content)
 *   - 2nd-gen/packages/swc/.storybook/learn-about-swc/*.mdx  (overview content)
 *
 * Output (all under 2nd-gen/packages/swc/public/docs/):
 *   - docs/components/[name].md   2nd-gen component docs (JSDoc + API)
 *   - docs/1st-gen/[name].md      1st-gen README verbatim
 *   - docs/guides/[path].md       Guide content stripped of Storybook syntax
 *
 * Run: node scripts/generate-docs-md.js
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

import { mdTable } from './lib/markdown.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const COMPONENTS_DIR = join(ROOT, '2nd-gen/packages/swc/components');
const STORYBOOK_DIR = join(ROOT, '2nd-gen/packages/swc/.storybook');
const FIRST_GEN_PACKAGES = join(ROOT, '1st-gen/packages');
const CEM_PATH = join(STORYBOOK_DIR, 'custom-elements.json');
const OUT_DIR = join(ROOT, '2nd-gen/packages/swc/public/docs');

// Tags that map a story to a documentation section.
// Keys are the property names on the parsed docs object; values are the tag strings.
const SECTION_TAGS = /** @type {const} */ ({
  anatomy: 'anatomy',
  options: 'options',
  states: 'states',
  behaviors: 'behaviors',
  accessibility: 'a11y',
});

// ---------------------------------------------------------------------------
// JSDoc extraction from .stories.ts files
// ---------------------------------------------------------------------------

/**
 * Strip leading `*` and optional leading space from each line of a JSDoc block,
 * then trim the result.
 */
function cleanJsDoc(raw) {
  return raw
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, ''))
    .join('\n')
    .trim();
}

/**
 * Extract the JSDoc comment immediately preceding `source[idx]`.
 *
 * Scans backwards so we find only the comment directly attached to that
 * position — never an earlier comment separated by code.
 *
 * Returns the cleaned text, or empty string if no JSDoc is found or if there
 * is non-whitespace content between the `* /` close and the target position.
 *
 * @param {string} source Full source text of the file
 * @param {number} idx  Index of the declaration this JSDoc should precede
 * @returns {string} Cleaned JSDoc text, or empty string
 */
function extractJsDocAtIndex(source, idx) {
  const before = source.slice(0, idx);

  const closeIdx = before.lastIndexOf('*/');
  if (closeIdx === -1) {
    return '';
  }
  if (before.slice(closeIdx + 2).trim() !== '') {
    return '';
  }

  const openIdx = before.lastIndexOf('/**', closeIdx);
  if (openIdx === -1) {
    return '';
  }

  return cleanJsDoc(before.slice(openIdx + 3, closeIdx));
}

/**
 * Extract the JSDoc comment immediately preceding a named export.
 * Handles both `export const Name` and bare `const Name` (some files use
 * a non-exported `const meta` then `export default meta`).
 *
 * Returns the cleaned text, or empty string if no JSDoc found.
 *
 * @param {string} source Full source text of the file
 * @param {string} exportName Identifier name to search for (e.g. `'meta'`)
 * @returns {string} Cleaned JSDoc text, or empty string
 */
function extractJsDocBefore(source, exportName) {
  const exportMatch = new RegExp(`\\bconst\\s+${exportName}\\b`).exec(source);
  if (!exportMatch) {
    return '';
  }
  return extractJsDocAtIndex(source, exportMatch.index);
}

/**
 * Extract the subtitle from `meta.parameters.docs.subtitle`.
 * Handles all three quote styles (backtick, double, single) separately
 * so strings containing apostrophes are captured in full.
 */
function extractSubtitle(source) {
  const match =
    source.match(/subtitle\s*:\s*`([^`]+)`/) ||
    source.match(/subtitle\s*:\s*"([^"]+)"/) ||
    source.match(/subtitle\s*:\s*'([^']+)'/);
  return match ? match[1].trim() : '';
}

/**
 * Collect all stories that carry a given tag along with their JSDoc and name.
 * Returns an array of { name: string, storyName: string, jsDoc: string }.
 *
 * Pre-scans `.storyName` assignments once so we don't compile a new RegExp
 * inside the per-story loop.
 *
 * @param {string} source Full source text of the stories file
 * @param {string} tag Storybook tag string to filter by (e.g. `'options'`)
 * @returns {{ name: string, storyName: string, jsDoc: string }[]} Matched stories with their JSDoc
 */
function extractStoriesByTag(source, tag) {
  // Pre-build storyName map once — avoids per-story RegExp compilation.
  const storyNames = new Map();
  for (const m of source.matchAll(
    /(\w+)\.storyName\s*=\s*['"`]([^'"`]+)['"`]/g
  )) {
    storyNames.set(m[1], m[2]);
  }

  const results = [];
  const exportPattern = /export\s+const\s+(\w+)\s*(?::\s*\w[^=]*)?\s*=/g;
  // Anchored to `tags: [...]` so we don't match the tag string in unrelated prose.
  const tagPattern = new RegExp(`tags\\s*:\\s*\\[[^\\]]*['"]${tag}['"]`);
  let match;

  while ((match = exportPattern.exec(source)) !== null) {
    const name = match[1];

    // Grab the story body up to the next top-level `export ` or EOF
    const bodyStart = match.index + match[0].length;
    const nextExportIdx = source.indexOf('\nexport ', bodyStart);
    const body =
      nextExportIdx === -1
        ? source.slice(bodyStart)
        : source.slice(bodyStart, nextExportIdx);

    if (!tagPattern.test(body)) {
      continue;
    }

    results.push({
      name,
      storyName: storyNames.get(name) ?? name,
      jsDoc: extractJsDocAtIndex(source, match.index),
    });
  }

  return results;
}

/**
 * Parse all documentation sections out of a single .stories.ts file.
 * Returns a structured object ready for buildComponentMd().
 */
function parseStoriesFile(storiesPath) {
  const source = readFileSync(storiesPath, 'utf8');

  return {
    description: extractJsDocBefore(source, 'meta'),
    subtitle: extractSubtitle(source),
    anatomy: extractStoriesByTag(source, SECTION_TAGS.anatomy),
    options: extractStoriesByTag(source, SECTION_TAGS.options),
    states: extractStoriesByTag(source, SECTION_TAGS.states),
    behaviors: extractStoriesByTag(source, SECTION_TAGS.behaviors),
    accessibility: extractStoriesByTag(source, SECTION_TAGS.accessibility),
  };
}

// ---------------------------------------------------------------------------
// CEM API extraction (2nd-gen)
// ---------------------------------------------------------------------------

/**
 * Read and parse the 2nd-gen CEM, returning a Map from tagName → declaration.
 * Returns null if the CEM file is not found.
 *
 * @returns {Map<string, object>|null} Index keyed by custom element tag name, or null
 */
function readCem() {
  if (!existsSync(CEM_PATH)) {
    console.warn(
      'Warning: custom-elements.json not found. Run `yarn workspace @adobe/spectrum-wc analyze` first.'
    );
    return null;
  }

  let raw;
  try {
    raw = JSON.parse(readFileSync(CEM_PATH, 'utf8'));
  } catch (err) {
    console.error(`Error: could not parse CEM at ${CEM_PATH}: ${err.message}`);
    process.exit(1);
  }

  const index = new Map();
  for (const mod of raw.modules) {
    for (const decl of mod.declarations ?? []) {
      if (decl.customElement && decl.tagName) {
        index.set(decl.tagName, decl);
      }
    }
  }
  return index;
}

// ---------------------------------------------------------------------------
// Per-component markdown assembly
// ---------------------------------------------------------------------------

/**
 * Build the full markdown document for a 2nd-gen component.
 *
 * @param {string} tagName  e.g. 'swc-badge'
 * @param {string} componentDir  e.g. 'badge'
 * @param {object} storyDocs  Result of parseStoriesFile()
 * @param {object|null} cemDecl  CEM declaration object (may be null)
 */
function buildComponentMd(tagName, componentDir, storyDocs, cemDecl) {
  const lines = [`# ${tagName}`, ''];

  if (storyDocs.subtitle) {
    lines.push(`> ${storyDocs.subtitle}`, '');
  }

  if (storyDocs.description) {
    lines.push(storyDocs.description, '');
  }

  lines.push(
    '```js',
    `import '@adobe/spectrum-wc/${componentDir}';`,
    `// <${tagName}></${tagName}>`,
    '```',
    ''
  );

  // Render each tagged section in order.
  // Anatomy and Accessibility list stories without per-story subheadings;
  // Options and Behaviors include a ### subheading per story.
  const sections = [
    { key: 'anatomy', heading: 'Anatomy', subheadings: false },
    { key: 'options', heading: 'Options', subheadings: true },
    { key: 'states', heading: 'States', subheadings: true },
    { key: 'behaviors', heading: 'Behaviors', subheadings: true },
    { key: 'accessibility', heading: 'Accessibility', subheadings: false },
  ];

  for (const { key, heading, subheadings } of sections) {
    const stories = storyDocs[key];
    if (stories.length === 0) {
      continue;
    }

    lines.push(`## ${heading}`, '');
    for (const story of stories) {
      if (!story.jsDoc) {
        continue;
      }
      if (subheadings) {
        lines.push(`### ${story.storyName}`, '', story.jsDoc, '');
      } else {
        lines.push(story.jsDoc, '');
      }
    }
  }

  // API from CEM
  if (cemDecl) {
    lines.push('## API', '');

    const attributes = (cemDecl.attributes ?? []).filter(
      (a) => !a.name.startsWith('_')
    );
    if (attributes.length > 0) {
      lines.push('### Attributes', '');
      lines.push(
        mdTable(
          ['Name', 'Type', 'Default', 'Description'],
          attributes.map((a) => [
            `\`${a.name}\``,
            a.type?.text ? `\`${a.type.text}\`` : '',
            a.default ? `\`${a.default}\`` : '-',
            a.description ?? '',
          ])
        ),
        ''
      );
    }

    const slots = cemDecl.slots ?? [];
    if (slots.length > 0) {
      lines.push('### Slots', '');
      lines.push(
        mdTable(
          ['Name', 'Description'],
          slots.map((s) => [
            `\`${s.name || '(default)'}\``,
            s.description ?? '',
          ])
        ),
        ''
      );
    }

    const events = cemDecl.events ?? [];
    if (events.length > 0) {
      lines.push('### Events', '');
      lines.push(
        mdTable(
          ['Name', 'Description'],
          events.map((eventItem) => [
            `\`${eventItem.name}\``,
            eventItem.description ?? '',
          ])
        ),
        ''
      );
    }

    const cssProps = cemDecl.cssProperties ?? [];
    if (cssProps.length > 0) {
      lines.push('### CSS Custom Properties', '');
      lines.push(
        mdTable(
          ['Name', 'Description'],
          cssProps.map((p) => [`\`${p.name}\``, p.description ?? ''])
        ),
        ''
      );
    }
  }

  return lines.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Guide extraction from MDX
// ---------------------------------------------------------------------------

/**
 * Convert a Storybook MDX file to plain markdown by stripping:
 *   - import statements
 *   - <Meta ... /> tags (title may contain `/`)
 *   - JSX self-closing tags like <img ... />
 *   - JSX component tags (PascalCase or kebab-prefixed like sp-*, swc-*)
 *
 * Standard HTML tags valid in markdown (<kbd>, <br>, <details>, etc.) are
 * preserved so accessibility guides retain their semantic formatting.
 *
 * Backtick inline code is preserved throughout — the replacements operate on
 * the raw source and do not parse MDX semantics, so edge cases in JSX-heavy
 * files may need manual review.
 */
function extractGuideContent(mdxPath) {
  const source = readFileSync(mdxPath, 'utf8');

  // Stash inline code (backtick spans) before any tag stripping so content
  // like `<sp-theme>` inside code isn't treated as HTML.
  // Use Unicode private-use sentinels rather than control characters.
  const STASH_OPEN = '\uE000STASH';
  const STASH_CLOSE = '\uE001';
  const stash = [];
  let processed = source.replace(/`[^`]+`/g, (m) => {
    stash.push(m);
    return `${STASH_OPEN}${stash.length - 1}${STASH_CLOSE}`;
  });

  // Standard HTML tags that are valid in markdown and should be preserved.
  const SAFE_TAGS =
    /^(kbd|br|details|summary|strong|em|code|sub|sup|table|thead|tbody|tr|td|th|a|p|ul|ol|li|blockquote|hr|div|span)$/i;

  // Strip a tag if it is PascalCase (JSX component), a web component
  // (contains `-`), or a lowercase HTML tag not in the safe list.
  function isJsxTag(name) {
    if (/[A-Z]/.test(name[0])) {
      return true;
    } // PascalCase JSX component
    if (name.includes('-')) {
      return true;
    } // web component (sp-*, swc-*, etc.)
    return !SAFE_TAGS.test(name); // unknown lowercase — strip to be safe
  }

  const stashPattern = new RegExp(`${STASH_OPEN}(\\d+)${STASH_CLOSE}`, 'g');

  processed = processed
    // Remove import lines
    .replace(/^import\s+.*$/gm, '')
    // Remove <Meta ... /> — title may contain `/` so match up to the closing />
    .replace(/<Meta\b[^>]*\/>/gs, '')
    // Replace <img ... alt="text" ... /> with italic alt text
    .replace(/<img\b[^>]*\balt="([^"]*)"[^>]*\/?>/gi, '_$1_')
    // Remove self-closing JSX/component tags; preserve safe HTML self-closers (e.g. <br />)
    .replace(/<([A-Za-z][A-Za-z0-9-]*)[^>]*\/>/g, (m, name) =>
      isJsxTag(name) ? '' : m
    )
    // Remove open/close tags for JSX components; preserve safe HTML tags
    .replace(/<\/([A-Za-z][A-Za-z0-9-]*)>/g, (m, name) =>
      isJsxTag(name) ? '' : m
    )
    .replace(/<([A-Za-z][A-Za-z0-9-]*)[^>]*>/g, (m, name) =>
      isJsxTag(name) ? '' : m
    )
    // Restore stashed inline code
    .replace(stashPattern, (_, i) => stash[Number(i)])
    // Collapse runs of blank lines
    .replace(/\n{3,}/g, '\n\n');

  return processed.trim() + '\n';
}

// ---------------------------------------------------------------------------
// 1st-gen README passthrough
// ---------------------------------------------------------------------------

/**
 * Copy a 1st-gen README verbatim into the output docs directory.
 * Skips if the README doesn't exist (some packages have none).
 */
function copyFirstGenReadme(packageName, outDir) {
  const readmePath = join(FIRST_GEN_PACKAGES, packageName, 'README.md');
  if (!existsSync(readmePath)) {
    return false;
  }
  const content = readFileSync(readmePath, 'utf8');
  writeFileSync(join(outDir, `${packageName}.md`), content, 'utf8');
  return true;
}

// ---------------------------------------------------------------------------
// Filesystem helpers
// ---------------------------------------------------------------------------

/**
 * Recursively collect .mdx file paths under a directory, returning
 * objects with { filePath, relPath } where relPath is relative to baseDir.
 */
function collectMdxFiles(dir, baseDir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdxFiles(full, baseDir));
    } else if (entry.name.endsWith('.mdx')) {
      results.push({ filePath: full, relPath: relative(baseDir, full) });
    }
  }
  return results;
}

/**
 * Find the primary .stories.ts file for a component directory.
 * Skips internal/test story files (e.g. *.internal.stories.ts).
 */
function findStoriesFile(componentDir) {
  const storiesDir = join(componentDir, 'stories');
  if (!existsSync(storiesDir)) {
    return null;
  }
  const files = readdirSync(storiesDir).filter(
    (f) => f.endsWith('.stories.ts') && !f.includes('.internal.')
  );
  return files.length > 0 ? join(storiesDir, files[0]) : null;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main() {
  const cem = readCem();
  let componentCount = 0;
  let readmeCount = 0;
  let guideCount = 0;

  // ── 2nd-gen component docs ────────────────────────────────────────────────
  const componentsOutDir = join(OUT_DIR, 'components');
  mkdirSync(componentsOutDir, { recursive: true });

  for (const entry of readdirSync(COMPONENTS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const componentDir = join(COMPONENTS_DIR, entry.name);
    const storiesFile = findStoriesFile(componentDir);

    if (!storiesFile) {
      continue;
    }

    const tagName = `swc-${entry.name}`;
    const storyDocs = parseStoriesFile(storiesFile);
    const cemDecl = cem?.get(tagName) ?? null;

    const md = buildComponentMd(tagName, entry.name, storyDocs, cemDecl);
    writeFileSync(join(componentsOutDir, `${entry.name}.md`), md, 'utf8');
    componentCount++;
  }

  console.log(`  2nd-gen components: ${componentCount} -> docs/components/`);

  // ── 1st-gen READMEs ───────────────────────────────────────────────────────
  const firstGenOutDir = join(OUT_DIR, '1st-gen');
  mkdirSync(firstGenOutDir, { recursive: true });

  if (existsSync(FIRST_GEN_PACKAGES)) {
    for (const entry of readdirSync(FIRST_GEN_PACKAGES, {
      withFileTypes: true,
    })) {
      if (
        entry.isDirectory() &&
        copyFirstGenReadme(entry.name, firstGenOutDir)
      ) {
        readmeCount++;
      }
    }
  }

  console.log(`  1st-gen READMEs: ${readmeCount} -> docs/1st-gen/`);

  // ── Guides ────────────────────────────────────────────────────────────────
  const guidesOutDir = join(OUT_DIR, 'guides');

  const guideSources = [
    join(STORYBOOK_DIR, 'learn-about-swc'),
    join(STORYBOOK_DIR, 'guides'),
  ];

  for (const dir of guideSources) {
    if (!existsSync(dir)) {
      continue;
    }
    for (const { filePath, relPath } of collectMdxFiles(dir, dir)) {
      const outPath = join(guidesOutDir, relPath.replace(/\.mdx$/, '.md'));
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, extractGuideContent(filePath), 'utf8');
      guideCount++;
    }
  }

  console.log(`  guides: ${guideCount} -> docs/guides/`);
  console.log(`Done. Output -> ${OUT_DIR}`);
}

main();
