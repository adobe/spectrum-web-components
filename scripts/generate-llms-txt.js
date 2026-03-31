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
 * Generates llms.txt, llms-full.txt, sitemap.xml, and per-component reference/*.md files
 * for Spectrum Web Components, following the llmstxt.org convention and
 * aligning with https://react-spectrum.adobe.com/llms.txt.
 *
 * Data sources:
 *   - 1st-gen/projects/documentation/custom-elements.json  (1st-gen APIs)
 *   - 2nd-gen/packages/swc/.storybook/custom-elements.json  (2nd-gen APIs)
 *   - 1st-gen/packages/[name]/README.md  (1st-gen descriptions)
 *   - 1st-gen/projects/documentation/content/*.md  (1st-gen guide pages, Eleventy frontmatter)
 *   - 2nd-gen/packages/swc/.storybook/{guides,learn-about-swc}/**\/*.mdx  (2nd-gen guides)
 *
 * Output per generation:
 *   - llms.txt          Link index (guides + components -> reference/[tag].md)
 *   - llms-full.txt     All components inlined in one file (single-context dump)
 *   - sitemap.xml       All documentation URLs for search and AI crawlers
 *   - reference/[tag].md  Per-component API reference (mirroring React Spectrum)
 *
 * Run: node scripts/generate-llms-txt.js
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Render a markdown table from headers and rows.
 *
 * @param {string[]} headers
 * @param {string[][]} rows
 * @returns {string}
 */
function mdTable(headers, rows) {
  const cols = headers.length;
  const widths = Array.from({ length: cols }, (_, i) =>
    Math.max(headers[i].length, ...rows.map((r) => (r[i] ?? '').length))
  );

  const pad = (str, w) => (str ?? '').padEnd(w);
  const sep = widths.map((w) => '-'.repeat(w)).join(' | ');
  const headerLine = headers.map((h, i) => pad(h, widths[i])).join(' | ');
  const bodyLines = rows.map((row) =>
    row.map((cell, i) => pad(cell, widths[i])).join(' | ')
  );

  return [
    '| ' + headerLine + ' |',
    '| ' + sep + ' |',
    ...bodyLines.map((l) => '| ' + l + ' |'),
  ].join('\n');
}
const ROOT = join(__dirname, '..');

/**
 * Where each generation's files land so they're served at the right URL.
 *
 * 1st-gen: content/ is Eleventy's input dir; files are passthrough-copied to
 *          _site/ then Rollup copies them into dist/, which GitHub Pages serves
 *          at https://opensource.adobe.com/spectrum-web-components/
 *
 * 2nd-gen: public/ is Storybook's staticDirs root (see .storybook/main.ts),
 *          copied verbatim into storybook-static/ at build time.
 */
const FIRST_GEN_OUT = join(ROOT, '1st-gen/projects/documentation/content');
const SECOND_GEN_OUT = join(ROOT, '2nd-gen/packages/swc/public');
const SECOND_GEN_CEM = join(
  ROOT,
  '2nd-gen/packages/swc/.storybook/custom-elements.json'
);

const FIRST_GEN_URL = 'https://opensource.adobe.com/spectrum-web-components';
// TODO: 2nd-gen has no stable production URL yet; update once one is established.
const SECOND_GEN_URL =
  'https://opensource.adobe.com/spectrum-web-components/second-gen';

/**
 * Elements defined in helper/internal packages that should not appear in the
 * public-facing component reference.
 */
const EXCLUDED_TAGS = new Set([
  'sp-css-table',
  'sp-story-decorator',
  'sp-grid',
  'sp-truncated',
  'sp-tooltip-openable',
]);

// ---------------------------------------------------------------------------
// Data extraction
// ---------------------------------------------------------------------------

/**
 * Read and parse a Custom Elements Manifest JSON file.
 * Distinguishes between a missing file (likely means docs:analyze hasn't run)
 * and a parse error (corrupt output) so callers can give a useful error message.
 */
function readCem(cemPath) {
  if (!existsSync(cemPath)) {
    return { modules: [], missing: true };
  }
  try {
    return JSON.parse(readFileSync(cemPath, 'utf8'));
  } catch (err) {
    console.error(`Error: could not parse CEM at ${cemPath}: ${err.message}`);
    process.exit(1);
  }
}

/**
 * Parses the first meaningful sentence from a 1st-gen README's ## Overview
 * section to use as the component description.
 */
function readmeDescription(packageName) {
  const readmePath = join(ROOT, '1st-gen/packages', packageName, 'README.md');
  if (!existsSync(readmePath)) {
    return '';
  }
  try {
    const content = readFileSync(readmePath, 'utf8');
    const match = content.match(/## Overview\s*\r?\n\r?\n([^#]+)/);
    if (!match) {
      return '';
    }
    // Process in the right order to avoid losing element-name context:
    // 1. Remove fenced code blocks
    // 2. Replace inline code (`<sp-foo>`) with its text content - before HTML handling
    // 3. Keep custom element names as plain text (drop only angle brackets)
    // 4. Strip markdown links, keeping link text
    // 5. Collapse whitespace
    const raw = match[1]
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]*)`/g, '$1')
      .replace(/<\/[^>]+>/g, '')
      .replace(/<([a-z][a-z0-9-]*)(?:\s[^>]*)?\s*\/?>/gi, '$1 ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    // Take up to the first sentence boundary, but don't split on abbreviations
    // like "e.g.", "i.e.", "etc." or version strings like "2.0".
    const sentence =
      raw.match(/^.*?[.!?](?:\s|$)(?!(?:g|e|i)\.)(?!\d)/)?.[0]?.trim() ??
      raw.slice(0, 160);
    return sentence.trim();
  } catch {
    return '';
  }
}

/**
 * Derive the npm package directory name from a 1st-gen CEM module path.
 * Pattern: packages/[name]/src/ComponentName.js
 */
function packageNameFromPath(modulePath) {
  const match = modulePath?.match(/^packages\/([^/]+)\//);
  return match ? match[1] : null;
}

/**
 * Derive the component directory name for 2nd-gen imports.
 * Pattern: 2nd-gen/packages/swc/components/[name]/ComponentName.ts
 */
function secondGenComponentFromPath(modulePath) {
  const match = modulePath?.match(/components\/([^/]+)\//);
  return match ? match[1] : null;
}

/**
 * Normalize a description string: flatten newlines, collapse whitespace,
 * truncate at a sentence boundary (<=200 chars).
 */
function normalizeDesc(text) {
  if (!text) {
    return '';
  }
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= 200) {
    return flat;
  }
  const truncated = flat.slice(0, 200);
  const sentenceEnd = truncated.search(/[.!?][^.!?]*$/);
  if (sentenceEnd > 40) {
    return truncated.slice(0, sentenceEnd + 1).trim();
  }
  const wordEnd = truncated.lastIndexOf(' ');
  return (wordEnd > 40 ? truncated.slice(0, wordEnd) : truncated) + '...';
}

function buildComponent(decl, modulePath, gen) {
  const packageDir =
    gen === 1
      ? packageNameFromPath(modulePath)
      : secondGenComponentFromPath(modulePath);

  const npmPackage =
    gen === 1
      ? packageDir
        ? `@spectrum-web-components/${packageDir}`
        : null
      : '@adobe/spectrum-wc';

  const importPath =
    gen === 1
      ? npmPackage
        ? `${npmPackage}/${decl.tagName}.js`
        : null
      : packageDir
        ? `@adobe/spectrum-wc/components/${packageDir}/index.js`
        : null;

  const description =
    normalizeDesc(decl.description) ||
    (gen === 1 && packageDir ? readmeDescription(packageDir) : '');

  const attributes = (decl.attributes ?? [])
    .filter((a) => !a.name.startsWith('_'))
    .map((a) => ({
      name: a.name,
      type: a.type?.text ?? '',
      description: normalizeDesc(a.description),
      default: a.default ?? '',
    }));

  const slots = (decl.slots ?? []).map((s) => ({
    name: s.name || '(default)',
    description: normalizeDesc(s.description),
  }));

  const events = (decl.events ?? []).map((eventItem) => ({
    name: eventItem.name,
    description: normalizeDesc(eventItem.description),
  }));

  const cssProperties = (decl.cssProperties ?? []).map((p) => ({
    name: p.name,
    description: normalizeDesc(p.description),
  }));

  return {
    tagName: decl.tagName,
    packageDir,
    npmPackage,
    importPath,
    description,
    attributes,
    slots,
    events,
    cssProperties,
  };
}

function extractComponents(cem, gen) {
  const prefix = gen === 1 ? 'sp-' : 'swc-';
  const seen = new Set();
  const components = [];

  for (const mod of cem.modules) {
    for (const decl of mod.declarations ?? []) {
      if (
        decl.customElement &&
        decl.tagName?.startsWith(prefix) &&
        !EXCLUDED_TAGS.has(decl.tagName) &&
        !seen.has(decl.tagName)
      ) {
        seen.add(decl.tagName);
        components.push(buildComponent(decl, mod.path, gen));
      }
    }
  }

  return components.sort((a, b) => a.tagName.localeCompare(b.tagName));
}

/**
 * Read Eleventy frontmatter from a markdown file and return { title, slug } or null.
 */
function parseEleventyFrontmatter(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const slug = content.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
    const displayName = content.match(/^displayName:\s*(.+)$/m)?.[1]?.trim();
    if (slug && displayName) {
      return { slug, title: displayName };
    }
  } catch {
    // ignore unreadable files
  }
  return null;
}

/**
 * Returns guide entries for 1st-gen from Eleventy content directory.
 * Each entry: { title, url, section }
 *   section 'guides'          top-level pages (getting-started, etc.)
 *   section 'developer-guides'  content/guides/ subdirectory
 */
function readFirstGenGuides() {
  const contentDir = FIRST_GEN_OUT;
  const guides = [];

  // Top-level .md pages (skip index.md — that's the homepage)
  for (const file of readdirSync(contentDir)) {
    if (!file.endsWith('.md') || file === 'index.md') {
      continue;
    }
    const meta = parseEleventyFrontmatter(join(contentDir, file));
    if (meta) {
      guides.push({
        title: meta.title,
        url: `${FIRST_GEN_URL}/${meta.slug}/`,
        section: 'guides',
      });
    }
  }

  // guides/ subdirectory
  const guidesDir = join(contentDir, 'guides');
  if (existsSync(guidesDir)) {
    for (const file of readdirSync(guidesDir)) {
      if (!file.endsWith('.md')) {
        continue;
      }
      const meta = parseEleventyFrontmatter(join(guidesDir, file));
      if (meta) {
        guides.push({
          title: meta.title,
          url: `${FIRST_GEN_URL}/guides/${meta.slug}/`,
          section: 'developer-guides',
        });
      }
    }
  }

  // Sort each section alphabetically by title
  return guides.sort((a, b) =>
    a.section !== b.section
      ? a.section.localeCompare(b.section)
      : a.title.localeCompare(b.title)
  );
}

/**
 * Convert a Storybook story title (titlePrefix + MDX Meta title) to a story ID
 * matching Storybook's own slug algorithm: lowercase, spaces -> hyphens, / -> hyphen.
 */
function storybookStoryId(titlePrefix, metaTitle) {
  return `${titlePrefix}/${metaTitle}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\//g, '-');
}

/**
 * Recursively collect .mdx file paths under a directory.
 */
function collectMdxFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      results.push(...collectMdxFiles(join(dir, entry.name)));
    } else if (entry.name.endsWith('.mdx')) {
      results.push(join(dir, entry.name));
    }
  }
  return results;
}

/**
 * Returns guide entries for 2nd-gen from Storybook MDX files.
 * Each entry: { title, url, section }
 *   section 'learn'   learn-about-swc/ directory
 *   section 'guides'  guides/ directory
 */
function readSecondGenGuides() {
  const storybookDir = join(ROOT, '2nd-gen/packages/swc/.storybook');
  const guides = [];

  // learn-about-swc/*.mdx  (titlePrefix: 'Learn about SWC')
  const learnDir = join(storybookDir, 'learn-about-swc');
  if (existsSync(learnDir)) {
    for (const file of readdirSync(learnDir)) {
      if (!file.endsWith('.mdx')) {
        continue;
      }
      const content = readFileSync(join(learnDir, file), 'utf8');
      const metaTitle = content.match(/<Meta\s+title="([^"]+)"/)?.[1];
      if (metaTitle) {
        const storyId = storybookStoryId('Learn about SWC', metaTitle);
        guides.push({
          title: metaTitle,
          url: `${SECOND_GEN_URL}/?path=/docs/${storyId}--docs`,
          section: 'learn',
        });
      }
    }
  }

  // guides/**/*.mdx  (titlePrefix: 'Guides')
  const guidesDir = join(storybookDir, 'guides');
  if (existsSync(guidesDir)) {
    for (const filePath of collectMdxFiles(guidesDir)) {
      const content = readFileSync(filePath, 'utf8');
      const metaTitle = content.match(/<Meta\s+title="([^"]+)"/)?.[1];
      if (metaTitle) {
        const storyId = storybookStoryId('Guides', metaTitle);
        guides.push({
          title: metaTitle,
          url: `${SECOND_GEN_URL}/?path=/docs/${storyId}--docs`,
          section: 'guides',
        });
      }
    }
  }

  return guides.sort((a, b) =>
    a.section !== b.section
      ? a.section.localeCompare(b.section)
      : a.title.localeCompare(b.title)
  );
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

/**
 * One index line for llms.txt, matching React Spectrum's format:
 *   - [sp-badge](reference/sp-badge.md): Description.
 */
function indexLine(comp) {
  const desc = comp.description ? `: ${comp.description}` : '';
  return `- [${comp.tagName}](reference/${comp.tagName}.md)${desc}`;
}

/**
 * Full per-component markdown file, mirroring React Spectrum's Badge.md style.
 */
function componentMd(comp) {
  const lines = [`# ${comp.tagName}`, ''];

  if (comp.description) {
    lines.push(comp.description, '');
  }

  if (comp.importPath) {
    lines.push('```js');
    if (comp.npmPackage) {
      lines.push(`import '${comp.importPath}';`);
    }
    lines.push(`// <${comp.tagName}></${comp.tagName}>`, '```', '');
  }

  if (comp.attributes.length > 0) {
    lines.push('## Attributes', '');
    lines.push(
      mdTable(
        ['Name', 'Type', 'Default', 'Description'],
        comp.attributes.map((a) => [
          `\`${a.name}\``,
          a.type ? `\`${a.type}\`` : '',
          a.default ? `\`${a.default}\`` : '-',
          a.description || '',
        ])
      ),
      ''
    );
  }

  if (comp.slots.length > 0) {
    lines.push('## Slots', '');
    lines.push(
      mdTable(
        ['Name', 'Description'],
        comp.slots.map((s) => [`\`${s.name}\``, s.description || ''])
      ),
      ''
    );
  }

  if (comp.events.length > 0) {
    lines.push('## Events', '');
    lines.push(
      mdTable(
        ['Name', 'Description'],
        comp.events.map((eventItem) => [
          `\`${eventItem.name}\``,
          eventItem.description || '',
        ])
      ),
      ''
    );
  }

  if (comp.cssProperties.length > 0) {
    lines.push('## CSS Custom Properties', '');
    lines.push(
      mdTable(
        ['Name', 'Description'],
        comp.cssProperties.map((p) => [`\`${p.name}\``, p.description || ''])
      ),
      ''
    );
  }

  return lines.join('\n');
}

/**
 * Full inlined reference (all components in one file) for tools that want
 * a single large context dump rather than following per-component links.
 */
function fullEntry(comp) {
  // Reuse componentMd but wrap in an H2 section for the combined file
  return componentMd(comp).replace(/^# /, '## ');
}

// ---------------------------------------------------------------------------
// Document generators
// ---------------------------------------------------------------------------

/**
 * Append a guide section to a lines array if any guides match the given section key.
 */
function appendGuideSection(lines, guides, sectionKey, heading) {
  const filtered = guides.filter((g) => g.section === sectionKey);
  if (filtered.length > 0) {
    lines.push(
      '',
      `## ${heading}`,
      '',
      ...filtered.map((g) => `- [${g.title}](${g.url})`)
    );
  }
}

function generateLlmsTxt({ components, guides, gen, docsUrl, crossLink }) {
  const is1st = gen === 1;
  const prefix = is1st ? 'sp-' : 'swc-';
  const spectrumVersion = is1st ? 'Spectrum 1' : 'Spectrum 2';

  const lines = [
    '# Spectrum Web Components',
    '',
    is1st
      ? `> Adobe's Spectrum 1 web component library. \`${prefix}*\` elements (${spectrumVersion}).`
      : `> Adobe's Spectrum 2 web component library (in active development). \`${prefix}*\` elements (${spectrumVersion}).`,
    '',
    '## Resources',
    '',
    `- [Documentation](${docsUrl}): Full docs with live examples`,
    '- [GitHub](https://github.com/adobe/spectrum-web-components): Source code and issues',
    is1st
      ? '- [npm](https://www.npmjs.com/search?q=%40spectrum-web-components): All 1st-gen packages'
      : '- [npm (@adobe/spectrum-wc)](https://www.npmjs.com/package/@adobe/spectrum-wc): Package',
    `- [llms-full.txt](${docsUrl}/llms-full.txt): All ${spectrumVersion} component APIs in one file`,
  ];

  if (crossLink) {
    lines.push(`- [${crossLink.label}](${crossLink.url}): ${crossLink.desc}`);
  }

  if (is1st) {
    appendGuideSection(lines, guides, 'guides', 'Guides');
    appendGuideSection(lines, guides, 'developer-guides', 'Developer guides');
  } else {
    appendGuideSection(lines, guides, 'learn', 'Learn about SWC');
    appendGuideSection(lines, guides, 'guides', 'Guides');
  }

  lines.push('', '## Components', '', ...components.map(indexLine));

  return lines.join('\n') + '\n';
}

function generateLlmsFullTxt({ components, gen, docsUrl, now }) {
  const is1st = gen === 1;
  const spectrumVersion = is1st ? 'Spectrum 1' : 'Spectrum 2';
  const prefix = is1st ? 'sp-' : 'swc-';

  const lines = [
    `# Spectrum Web Components - ${spectrumVersion} Full API Reference`,
    '',
    `> Generated ${now}. For the link index see [llms.txt](${docsUrl}/llms.txt).`,
    '',
    `All public \`${prefix}*\` components with their full attribute, slot, event, and CSS`,
    'custom property tables. Useful when you want the entire API in one context window.',
    '',
    is1st
      ? 'Each component is a separate package: `yarn add @spectrum-web-components/[name]`'
      : 'All components ship together: `yarn add @adobe/spectrum-wc`',
    '',
    '---',
    '',
    ...components.map((c) => fullEntry(c) + '\n---'),
  ];

  return lines.join('\n') + '\n';
}

/**
 * XML sitemap listing all doc URLs for this generation.
 * 1st-gen links to HTML pages; 2nd-gen links to Storybook SPA routes.
 */
function generateSitemap({ components, guides, gen, docsUrl, now }) {
  const entry = (loc, priority, changefreq) =>
    `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

  const entries = [
    // Root
    entry(`${docsUrl}/`, '1.0', 'weekly'),
  ];

  // Guide pages
  for (const guide of guides) {
    entries.push(entry(guide.url, '0.8', 'monthly'));
  }

  // Component pages
  for (const comp of components) {
    if (gen === 1 && comp.packageDir) {
      // 1st-gen component docs are HTML pages at /components/[dir]/
      entries.push(
        entry(`${docsUrl}/components/${comp.packageDir}/`, '0.7', 'monthly')
      );
    } else if (gen === 2) {
      // 2nd-gen: reference markdown files served from Storybook's staticDirs
      entries.push(
        entry(`${docsUrl}/reference/${comp.tagName}.md`, '0.7', 'monthly')
      );
    }
  }

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<!-- Generated ${now} -->\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.join('\n') +
    `\n</urlset>\n`
  );
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function writeGen({ components, guides, gen, outDir, docsUrl, crossLink }) {
  const genLabel = gen === 1 ? '1st' : '2nd';
  const now = new Date().toISOString().slice(0, 10);
  const refDir = join(outDir, 'reference');
  mkdirSync(refDir, { recursive: true });

  writeFileSync(
    join(outDir, 'llms.txt'),
    generateLlmsTxt({ components, guides, gen, docsUrl, crossLink }),
    'utf8'
  );

  writeFileSync(
    join(outDir, 'llms-full.txt'),
    generateLlmsFullTxt({ components, gen, docsUrl, now }),
    'utf8'
  );

  writeFileSync(
    join(outDir, 'sitemap.xml'),
    generateSitemap({ components, guides, gen, docsUrl, now }),
    'utf8'
  );

  for (const comp of components) {
    writeFileSync(
      join(refDir, `${comp.tagName}.md`),
      componentMd(comp),
      'utf8'
    );
  }

  console.log(
    `${genLabel}-gen: llms.txt + llms-full.txt + sitemap.xml + ${components.length} reference/*.md -> ${outDir}`
  );
}

function main() {
  console.log('Reading Custom Elements Manifests...');

  const firstGenCem = readCem(
    join(ROOT, '1st-gen/projects/documentation/custom-elements.json')
  );
  const secondGenCem = readCem(SECOND_GEN_CEM);

  const firstGen = extractComponents(firstGenCem, 1);
  const secondGen = extractComponents(secondGenCem, 2);

  console.log(`  1st-gen: ${firstGen.length} components`);
  console.log(`  2nd-gen: ${secondGen.length} components`);

  if (firstGenCem.missing) {
    console.warn(
      'Warning: 1st-gen CEM not found; skipping 1st-gen output. Run `yarn docs:analyze` first.'
    );
  } else if (firstGen.length === 0) {
    console.error(
      'Error: 1st-gen CEM found but yielded 0 components. The manifest may be malformed.'
    );
    process.exit(1);
  }

  if (secondGenCem.missing) {
    console.warn(
      'Warning: 2nd-gen CEM not found; skipping 2nd-gen output. Run `yarn analyze` first.'
    );
  } else if (secondGen.length === 0) {
    console.error(
      'Error: 2nd-gen CEM found but yielded 0 components. The manifest may be malformed.'
    );
    process.exit(1);
  }

  console.log('Reading guide metadata...');
  const firstGenGuides = readFirstGenGuides();
  const secondGenGuides = readSecondGenGuides();
  console.log(`  1st-gen: ${firstGenGuides.length} guides`);
  console.log(`  2nd-gen: ${secondGenGuides.length} guides`);

  if (!firstGenCem.missing) {
    writeGen({
      components: firstGen,
      guides: firstGenGuides,
      gen: 1,
      outDir: FIRST_GEN_OUT,
      docsUrl: FIRST_GEN_URL,
      crossLink: {
        label: '2nd-gen llms.txt',
        url: `${SECOND_GEN_URL}/llms.txt`,
        desc: 'Spectrum 2 (swc-*) component index',
      },
    });
  }

  if (!secondGenCem.missing) {
    writeGen({
      components: secondGen,
      guides: secondGenGuides,
      gen: 2,
      outDir: SECOND_GEN_OUT,
      docsUrl: SECOND_GEN_URL,
      crossLink: {
        label: '1st-gen llms.txt',
        url: `${FIRST_GEN_URL}/llms.txt`,
        desc: 'Spectrum 1 (sp-*) component index',
      },
    });
  }
}

main();
