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
 * Generates Storybook-compatible .mdx files from CONTRIBUTOR-DOCS .md files.
 *
 * Run from the 2nd-gen/packages/swc directory:
 *   node .storybook/scripts/generate-contributor-docs.mjs
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs';
import { basename, dirname, join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STORYBOOK_DIR = resolve(__dirname, '..');
const CONTRIBUTOR_DOCS_DIR = resolve(
  STORYBOOK_DIR,
  '../../../../CONTRIBUTOR-DOCS'
);
const OUTPUT_DIR = resolve(STORYBOOK_DIR, 'contributor-docs');
const PREVIEW_FILE = resolve(STORYBOOK_DIR, 'preview.ts');
const REPO_ROOT = resolve(STORYBOOK_DIR, '../../../..');
const GITHUB_REPO_URL =
  'https://github.com/adobe/spectrum-web-components/blob/main';

// Markers for the auto-generated sort order in preview.ts
const SORT_ORDER_START_MARKER =
  '// GENERATED:CONTRIBUTOR-DOCS-SORT - Do not edit manually.';
const SORT_ORDER_END_MARKER = '// GENERATED:CONTRIBUTOR-DOCS-SORT-END';

/**
 * Recursively collect all .md files from a directory.
 *
 * @param {string} dir - Directory to search
 * @param {string[]} files - Accumulator for found files
 * @returns {string[]} Array of absolute file paths
 */
function collectMarkdownFiles(dir, files = []) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      collectMarkdownFiles(fullPath, files);
    } else if (entry.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Acronyms and terms that should preserve specific capitalization.
 */
const CAPITALIZATION_MAP = {
  css: 'CSS',
  html: 'HTML',
  api: 'API',
  swc: 'SWC',
  pr: 'PR',
  jsdoc: 'JSDoc',
  typescript: 'TypeScript',
  aria: 'ARIA',
  wcag: 'WCAG',
  ui: 'UI',
  ux: 'UX',
  dom: 'DOM',
  svg: 'SVG',
  json: 'JSON',
  url: 'URL',
  '1st': '1st',
  '2nd': '2nd',
  '2ndgen': '2nd-gen',
  '1stgen': '1st-gen',
};

/**
 * Apply proper capitalization to a word, preserving acronyms.
 *
 * @param {string} word - Word to capitalize
 * @returns {string} Properly capitalized word
 */
function capitalizeWord(word) {
  const lower = word.toLowerCase();
  if (CAPITALIZATION_MAP[lower]) {
    return CAPITALIZATION_MAP[lower];
  }
  return word;
}

/**
 * Convert a file path to a human-readable Storybook title.
 * Strips numeric prefixes (e.g., "01_") and converts to sentence case,
 * preserving acronyms like CSS, HTML, API.
 *
 * @param {string} filePath - Absolute path to the .md file
 * @returns {string} Storybook title (e.g., "Contributor guides/Getting involved")
 */
function pathToTitle(filePath) {
  const relativePath = relative(CONTRIBUTOR_DOCS_DIR, filePath);
  const parts = relativePath.split('/');

  const titleParts = parts.map((part, index) => {
    const isLast = index === parts.length - 1;

    if (isLast && part === 'README.md') {
      return null;
    }

    let name = part;
    if (isLast) {
      name = name.replace(/\.md$/, '');
    }

    name = name.replace(/^\d+_/, '');
    name = name.replace(/[-_]/g, ' ');

    if (name.length > 0) {
      const words = name.split(' ');
      name = words
        .map((word, wordIndex) => {
          const capitalized = capitalizeWord(word);
          if (capitalized !== word) {
            return capitalized;
          }
          if (wordIndex === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join(' ');
    }

    return name;
  });

  const filtered = titleParts.filter(Boolean);

  if (filtered.length === 0) {
    return 'Contributor documentation';
  }

  return filtered.join('/');
}

/**
 * Convert a title to a Storybook doc ID.
 *
 * @param {string} title - The Storybook title
 * @returns {string} The doc ID (e.g., "contributor-docs-contributor-guides-getting-involved--docs")
 */
function titleToDocId(title) {
  const fullTitle = title;
  const id = fullTitle
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return `contributor-docs-${id}--docs`;
}

/**
 * Build a map of relative .md paths to their Storybook doc URLs.
 *
 * @param {string[]} files - Array of absolute file paths
 * @returns {Map<string, {title: string, docId: string}>} Map of relative paths to doc info
 */
function buildLinkMap(files) {
  const linkMap = new Map();

  for (const file of files) {
    const relativePath = relative(CONTRIBUTOR_DOCS_DIR, file);
    const title = pathToTitle(file);
    const docId = titleToDocId(title);
    linkMap.set(relativePath, { title, docId });
  }

  return linkMap;
}

/**
 * Strip generated breadcrumbs and TOC sections from markdown content.
 *
 * @param {string} content - Original markdown content
 * @returns {string} Content with breadcrumbs and TOC removed
 */
function stripGeneratedSections(content) {
  let result = content;

  const breadcrumbStart = '<!-- Generated breadcrumbs - DO NOT EDIT -->';
  const titleMarker = '<!-- Document title (editable) -->';

  const breadcrumbIdx = result.indexOf(breadcrumbStart);
  if (breadcrumbIdx !== -1) {
    const titleIdx = result.indexOf(titleMarker, breadcrumbIdx);
    if (titleIdx !== -1) {
      result =
        result.slice(0, breadcrumbIdx) +
        result.slice(titleIdx + titleMarker.length);
    }
  }

  if (result.startsWith(titleMarker)) {
    result = result.slice(titleMarker.length);
  }

  const tocStart = '<!-- Generated TOC - DO NOT EDIT -->';
  const contentMarker = '<!-- Document content (editable) -->';

  const tocIdx = result.indexOf(tocStart);
  if (tocIdx !== -1) {
    const contentIdx = result.indexOf(contentMarker, tocIdx);
    if (contentIdx !== -1) {
      result =
        result.slice(0, tocIdx) +
        result.slice(contentIdx + contentMarker.length);
    }
  }

  result = result.replace(/^\s*\n/, '');

  return result;
}

/**
 * Convert HTML comments to JSX comments.
 *
 * @param {string} content - Markdown content
 * @returns {string} Content with JSX comments
 */
function convertCommentsToJsx(content) {
  return content.replace(/<!--\s*([\s\S]*?)\s*-->/g, '{/* $1 */}');
}

/**
 * Sanitize HTML elements for MDX compatibility.
 * MDX requires self-closing void elements and doesn't allow angle-bracket emails.
 *
 * @param {string} content - Markdown content
 * @returns {string} Sanitized content
 */
function sanitizeHtmlForMdx(content) {
  let result = content;

  // Convert angle-bracket emails to markdown links
  // e.g., <user@example.com> becomes [user@example.com](mailto:user@example.com)
  result = result.replace(
    /<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>/g,
    '[$1](mailto:$1)'
  );

  // Convert void HTML elements to self-closing form for MDX
  // <br> -> <br />, <hr> -> <hr />, <img ...> -> <img ... />
  const voidElements = [
    'br',
    'hr',
    'img',
    'input',
    'meta',
    'link',
    'area',
    'base',
    'col',
    'embed',
    'param',
    'source',
    'track',
    'wbr',
  ];
  for (const tag of voidElements) {
    // Match <tag> or <tag attr="value"> but not already self-closing <tag />
    const pattern = new RegExp(`<(${tag})(\\s[^>]*)?>(?!\\s*/)`, 'gi');
    result = result.replace(pattern, (match, tagName, attrs) => {
      // Check if it's already self-closing
      if (match.endsWith('/>')) {
        return match;
      }
      return `<${tagName}${attrs || ''} />`;
    });
  }

  return result;
}

/**
 * Source file extensions that should be converted to GitHub links.
 */
const SOURCE_FILE_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.scss',
  '.json',
  '.yaml',
  '.yml',
];

/**
 * Rewrite internal links to appropriate destinations:
 * - .md files -> Storybook doc paths
 * - Source files (.ts, .js, .css, etc.) -> GitHub URLs
 *
 * @param {string} content - Markdown content
 * @param {string} currentFile - Absolute path of the current file
 * @param {Map<string, {title: string, docId: string}>} linkMap - Map of paths to doc info
 * @returns {string} Content with rewritten links
 */
function rewriteLinks(content, currentFile, linkMap) {
  const currentDir = dirname(currentFile);

  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('#')
    ) {
      return match;
    }

    let [linkPath, anchor] = href.split('#');

    // Handle .md files
    if (href.includes('.md')) {
      const absolutePath = resolve(currentDir, linkPath);
      const relativeToDocs = relative(CONTRIBUTOR_DOCS_DIR, absolutePath);

      // If within CONTRIBUTOR-DOCS, convert to Storybook doc path
      if (!relativeToDocs.startsWith('..')) {
        const docInfo = linkMap.get(relativeToDocs);
        if (!docInfo) {
          console.warn(
            `Warning: Could not resolve link "${href}" in ${relative(CONTRIBUTOR_DOCS_DIR, currentFile)}`
          );
          return match;
        }

        let storybookUrl = `/docs/${docInfo.docId}`;
        if (anchor) {
          storybookUrl += `#${anchor}`;
        }

        return `[${text}](${storybookUrl})`;
      }

      // If outside CONTRIBUTOR-DOCS but within repo, convert to GitHub URL
      const relativeToRepo = relative(REPO_ROOT, absolutePath);
      if (!relativeToRepo.startsWith('..')) {
        let githubUrl = `${GITHUB_REPO_URL}/${relativeToRepo}`;
        if (anchor) {
          githubUrl += `#${anchor}`;
        }

        return `[${text}](${githubUrl})`;
      }

      // Outside the repo - leave unchanged
      return match;
    }

    // Handle source files -> GitHub URLs
    const isSourceFile = SOURCE_FILE_EXTENSIONS.some((ext) =>
      linkPath.endsWith(ext)
    );
    if (isSourceFile) {
      const absolutePath = resolve(currentDir, linkPath);
      const relativeToRepo = relative(REPO_ROOT, absolutePath);

      // Only convert if the path is within the repo (doesn't start with ..)
      if (relativeToRepo.startsWith('..')) {
        return match;
      }

      let githubUrl = `${GITHUB_REPO_URL}/${relativeToRepo}`;
      if (anchor) {
        githubUrl += `#${anchor}`;
      }

      return `[${text}](${githubUrl})`;
    }

    return match;
  });
}

/**
 * Convert a single .md file to .mdx format.
 *
 * @param {string} filePath - Absolute path to the .md file
 * @param {Map<string, {title: string, docId: string}>} linkMap - Map of paths to doc info
 * @returns {{outputPath: string, content: string}} Output path and converted content
 */
function convertFile(filePath, linkMap) {
  const relativePath = relative(CONTRIBUTOR_DOCS_DIR, filePath);
  const title = pathToTitle(filePath);

  let content = readFileSync(filePath, 'utf-8');

  content = stripGeneratedSections(content);
  content = rewriteLinks(content, filePath, linkMap);
  content = sanitizeHtmlForMdx(content);
  content = convertCommentsToJsx(content);

  const mdxContent = `import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="${title}" />

${content.trim()}
`;

  let outputPath = relativePath.replace(/\.md$/, '.mdx');
  if (basename(outputPath) === 'README.mdx') {
    const dir = dirname(outputPath);
    if (dir === '.') {
      outputPath = 'index.mdx';
    } else {
      outputPath = join(dir, 'index.mdx');
    }
  }

  return {
    outputPath: join(OUTPUT_DIR, outputPath),
    content: mdxContent,
  };
}

/**
 * Ensure a directory exists, creating it recursively if needed.
 *
 * @param {string} dirPath - Directory path
 */
function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Convert a directory/file name to a display name (stripping numeric prefix).
 *
 * @param {string} name - File or directory name
 * @returns {string} Display name without numeric prefix
 */
function nameToDisplayName(name) {
  let displayName = name.replace(/^\d+_/, '').replace(/[-_]/g, ' ');

  if (displayName.length > 0) {
    const words = displayName.split(' ');
    displayName = words
      .map((word, wordIndex) => {
        const capitalized = capitalizeWord(word);
        if (capitalized !== word) {
          return capitalized;
        }
        if (wordIndex === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' ');
  }

  return displayName;
}

/**
 * Build a nested sort order array for Storybook's storySort.order.
 * Walks the directory tree in sorted order (honoring numeric prefixes)
 * but outputs human-readable names.
 *
 * @param {string} dir - Directory to process
 * @returns {Array} Nested array for storySort.order
 */
function buildSortOrder(dir) {
  const entries = readdirSync(dir).sort();
  const order = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      const displayName = nameToDisplayName(entry);
      const children = buildSortOrder(fullPath);

      if (children.length > 0) {
        order.push(displayName, children);
      } else {
        order.push(displayName);
      }
    } else if (entry.endsWith('.md')) {
      if (entry === 'README.md') {
        continue;
      }
      const baseName = entry.replace(/\.md$/, '');
      const displayName = nameToDisplayName(baseName);
      order.push(displayName);
    }
  }

  return order;
}

/**
 * Format an array as properly indented TypeScript code.
 *
 * @param {Array} arr - The array to format
 * @param {string} baseIndent - The base indentation string
 * @param {number} depth - Current nesting depth
 * @returns {string} Formatted TypeScript array code
 */
function formatArrayAsCode(arr, baseIndent, depth = 0) {
  const indent = baseIndent + '  '.repeat(depth);
  const childIndent = baseIndent + '  '.repeat(depth + 1);

  const items = arr.map((item) => {
    if (Array.isArray(item)) {
      return formatArrayAsCode(item, baseIndent, depth + 1);
    }
    return `'${item.replace(/'/g, "\\'")}'`;
  });

  if (items.length === 0) {
    return '[]';
  }

  // For short arrays with no nested arrays, keep on one line
  const hasNestedArrays = arr.some((item) => Array.isArray(item));
  const totalLength = items.join(', ').length;

  if (!hasNestedArrays && totalLength < 60) {
    return `[${items.join(', ')}]`;
  }

  return `[\n${items.map((item) => `${childIndent}${item}`).join(',\n')},\n${indent}]`;
}

/**
 * Update the sort order in preview.ts between the marker comments.
 *
 * @param {Array} sortOrder - The generated sort order array
 */
function updatePreviewSortOrder(sortOrder) {
  if (!existsSync(PREVIEW_FILE)) {
    console.warn(`Warning: preview.ts not found at ${PREVIEW_FILE}`);
    return;
  }

  const content = readFileSync(PREVIEW_FILE, 'utf-8');

  const startIdx = content.indexOf(SORT_ORDER_START_MARKER);
  const endIdx = content.indexOf(SORT_ORDER_END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    console.warn(
      'Warning: Sort order markers not found in preview.ts. Skipping sort order update.'
    );
    console.warn(
      'Add the following markers to preview.ts around the contributor docs sort order:'
    );
    console.warn(`  ${SORT_ORDER_START_MARKER}`);
    console.warn(`  ${SORT_ORDER_END_MARKER}`);
    return;
  }

  // Find the line start for the start marker
  const lineStart = content.lastIndexOf('\n', startIdx) + 1;
  // Find the line end for the end marker
  const lineEnd = content.indexOf('\n', endIdx);

  // Detect indentation from the start marker line
  const indentMatch = content.slice(lineStart, startIdx).match(/^(\s*)/);
  const indent = indentMatch ? indentMatch[1] : '          ';

  const formattedSortOrder = formatArrayAsCode(sortOrder, indent);
  const newContent =
    content.slice(0, lineStart) +
    `${indent}${SORT_ORDER_START_MARKER} Run \`yarn generate:contributor-docs\` to update.\n` +
    `${indent}${formattedSortOrder},\n` +
    `${indent}${SORT_ORDER_END_MARKER}` +
    content.slice(lineEnd);

  writeFileSync(PREVIEW_FILE, newContent, 'utf-8');
  console.log(`Updated sort order in ${relative(process.cwd(), PREVIEW_FILE)}`);
}

/**
 * Main function to generate all contributor docs.
 */
function main() {
  console.log('Generating contributor docs for Storybook...\n');

  if (!existsSync(CONTRIBUTOR_DOCS_DIR)) {
    console.error(
      `Error: CONTRIBUTOR-DOCS directory not found at ${CONTRIBUTOR_DOCS_DIR}`
    );
    process.exit(1);
  }

  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true });
  }

  const files = collectMarkdownFiles(CONTRIBUTOR_DOCS_DIR);
  console.log(`Found ${files.length} markdown files\n`);

  const linkMap = buildLinkMap(files);

  let converted = 0;
  for (const file of files) {
    const { outputPath, content } = convertFile(file, linkMap);

    ensureDir(dirname(outputPath));
    writeFileSync(outputPath, content, 'utf-8');

    const relativeSrc = relative(CONTRIBUTOR_DOCS_DIR, file);
    const relativeDest = relative(OUTPUT_DIR, outputPath);
    console.log(`  ${relativeSrc} -> ${relativeDest}`);
    converted++;
  }

  console.log(
    `\nGenerated ${converted} .mdx files in ${relative(process.cwd(), OUTPUT_DIR)}`
  );

  // Update the sort order in preview.ts
  // Structure: ['Contributor documentation', 'Contributor guides', [...], 'Style guide', [...], ...]
  // 'Contributor documentation' is the index page, followed by alternating category/children pairs
  const sortOrder = [
    'Contributor documentation',
    ...buildSortOrder(CONTRIBUTOR_DOCS_DIR),
  ];
  updatePreviewSortOrder(sortOrder);
}

main();
