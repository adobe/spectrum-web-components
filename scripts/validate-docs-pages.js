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

/**
 * Validate per-unit MDX docs pages for 2nd-gen components, internal
 * components, patterns, and controllers.
 *
 * Each in-scope MDX file is checked for:
 *
 * 1. **Exactly one `<Meta of={...} />`** declaration linking the docs page to
 *    its stories module.
 * 2. **Canonical `##` section order** — top-level section headings must
 *    appear as a subsequence of the canonical order for the unit's genre;
 *    unknown section names are flagged.
 * 3. **Every section-tagged story is surfaced** — for each export in the
 *    referenced stories module tagged `anatomy`, `options`, `states`,
 *    `behaviors`, or `a11y`, the MDX must include at least one
 *    `<Canvas of={Stories.ExportName} />` reference.
 * 4. **No broken story references** — every `<Canvas of={...} />` in MDX
 *    points to an export that exists in the stories module.
 *
 * Usage (standalone):
 *   yarn lint:docs-pages
 *
 * Or as part of the umbrella lint suite (runs in CI and the pre-commit hook):
 *   yarn lint:ai
 *
 * See `.ai/rules/stories-documentation.md` for the per-unit MDX authoring
 * standards this check enforces.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

// ────────────────────────────────────────────────────────────────────────────
//   Genre rules
// ────────────────────────────────────────────────────────────────────────────

/**
 * Allowed `##` section headings per genre, in canonical order. A docs page
 * may include any subset of these in this relative order; unknown `##`
 * headings are flagged as errors.
 *
 * The component / pattern / internal sets share the same middle and footer.
 * The controller set replaces `Anatomy` with `What it does` and `Basic
 * usage` because controllers have no DOM and document their conceptual
 * model instead.
 *
 * `Upcoming features` is positioned immediately before the API/Appendix/
 * Feedback footer block so it reads as a forward-looking note after the
 * current API/behavior, not as a preamble before Options.
 */
const SHARED_SECTIONS = [
  'Usage',
  'Options',
  'States',
  'Behaviors',
  'Accessibility',
];

const SHARED_FOOTER = ['Upcoming features', 'API', 'Appendix', 'Feedback'];

const COMPONENT_LIKE_SECTIONS = [
  'Anatomy',
  ...SHARED_SECTIONS,
  'Full pattern',
  ...SHARED_FOOTER,
];

const CONTROLLER_SECTIONS = [
  'What it does',
  'Basic usage',
  ...SHARED_SECTIONS,
  ...SHARED_FOOTER,
];

const SECTION_TAGS = ['anatomy', 'options', 'states', 'behaviors', 'a11y'];

/**
 * Resolve the genre and applicable rules for an MDX file based on its path.
 *
 * @param {string} relPath - Path relative to the repo root.
 * @returns {{
 *   genre: 'component' | 'internal' | 'pattern' | 'controller' | null,
 *   requireMeta: boolean,
 *   requireCanvasForTaggedStories: boolean,
 *   storiesGlob: string | null,
 * }}
 */
function classify(relPath) {
  // Internal components (exclude migration guides that happen to use the
  // .internal.mdx suffix)
  if (
    /^2nd-gen\/packages\/swc\/components\/[^/]+\/[^/]+\.internal\.mdx$/.test(
      relPath
    ) &&
    !relPath.includes('migration-guide')
  ) {
    return {
      genre: 'internal',
      requireMeta: true,
      requireCanvasForTaggedStories: true,
      requireDocsFooter: false,
      canonicalSections: COMPONENT_LIKE_SECTIONS,
    };
  }

  // Component (regular)
  if (
    /^2nd-gen\/packages\/swc\/components\/[^/]+\/[^/]+\.mdx$/.test(relPath) &&
    !relPath.includes('migration-guide')
  ) {
    return {
      genre: 'component',
      requireMeta: true,
      requireCanvasForTaggedStories: true,
      requireDocsFooter: true,
      canonicalSections: COMPONENT_LIKE_SECTIONS,
    };
  }

  // Pattern
  if (
    /^2nd-gen\/packages\/swc\/patterns\/[^/]+\/[^/]+\/[^/]+\.mdx$/.test(
      relPath
    ) &&
    !relPath.includes('pattern-overview') &&
    !relPath.includes('migration-guide')
  ) {
    return {
      genre: 'pattern',
      requireMeta: true,
      requireCanvasForTaggedStories: true,
      requireDocsFooter: true,
      canonicalSections: COMPONENT_LIKE_SECTIONS,
    };
  }

  // Controller
  if (
    /^2nd-gen\/packages\/core\/controllers\/[^/]+\/[^/]+\.mdx$/.test(relPath)
  ) {
    return {
      genre: 'controller',
      requireMeta: true,
      requireCanvasForTaggedStories: true,
      requireDocsFooter: true,
      canonicalSections: CONTROLLER_SECTIONS,
    };
  }

  return {
    genre: null,
    requireMeta: false,
    requireCanvasForTaggedStories: false,
    requireDocsFooter: false,
    canonicalSections: null,
  };
}

// ────────────────────────────────────────────────────────────────────────────
//   File walking
// ────────────────────────────────────────────────────────────────────────────

const ROOTS = [
  '2nd-gen/packages/swc/components',
  '2nd-gen/packages/swc/patterns',
  '2nd-gen/packages/core/controllers',
];

/**
 * Recursively find files under a directory that match a predicate.
 */
function walk(dir, predicate, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip noisy directories
      if (
        entry.name === 'node_modules' ||
        entry.name === 'dist' ||
        entry.name === 'test'
      ) {
        continue;
      }
      walk(full, predicate, out);
    } else if (entry.isFile() && predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function findMdxFiles() {
  const files = [];
  for (const root of ROOTS) {
    const abs = path.join(repoRoot, root);
    walk(abs, (p) => p.endsWith('.mdx'), files);
  }
  return files;
}

// ────────────────────────────────────────────────────────────────────────────
//   MDX inspection
// ────────────────────────────────────────────────────────────────────────────

/**
 * Extract the imported Stories module identifier and its source path from
 * an `import * as Stories from './stories/<unit>.stories'` line.
 *
 * Returns `null` when no such import is found.
 */
function parseStoriesImport(content) {
  const match = content.match(
    /import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/
  );
  if (!match) {
    return null;
  }
  return { binding: match[1], source: match[2] };
}

/**
 * Count `<Meta of={Stories} />` declarations.
 */
function countMetaOf(content) {
  const matches = content.match(/<Meta\s+of=\{[^}]+\}/g);
  return matches ? matches.length : 0;
}

/**
 * Extract all top-level `##` headings (not `###` or deeper) in document order.
 */
function extractH2Headings(content) {
  const headings = [];
  for (const line of content.split('\n')) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m && !line.startsWith('###')) {
      headings.push(m[1].trim());
    }
  }
  return headings;
}

/**
 * Extract all `<Canvas of={Stories.ExportName} ... />` references and return
 * the referenced story export names.
 *
 * The regex tolerates additional attributes (e.g. `sourceState="shown"`)
 * and multi-line `<Canvas ...>` forms — it only requires `<Canvas` followed
 * eventually by `of={<binding>.<ExportName>}`, then any other content, then
 * a self-closing or closing tag.
 */
function extractCanvasReferences(content, binding) {
  if (!binding) {
    return [];
  }
  const refs = [];
  const re = new RegExp(
    `<Canvas\\b[^>]*?\\bof=\\{${binding}\\.([A-Za-z_][A-Za-z0-9_]*)\\}[^>]*?/?>`,
    'gs'
  );
  let match;
  while ((match = re.exec(content)) !== null) {
    refs.push(match[1]);
  }
  return refs;
}

// ────────────────────────────────────────────────────────────────────────────
//   Stories file inspection
// ────────────────────────────────────────────────────────────────────────────

/**
 * Resolve the absolute path of a stories module referenced from an MDX file.
 *
 * The MDX import is relative to the MDX file and typically omits the `.ts`
 * extension; we accept either `<source>.ts` or `<source>.stories.ts` on disk.
 */
function resolveStoriesPath(mdxAbsPath, importSource) {
  const mdxDir = path.dirname(mdxAbsPath);
  const candidates = [
    path.resolve(mdxDir, `${importSource}.ts`),
    path.resolve(mdxDir, importSource),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

/**
 * Parse a stories.ts file and return a map of exported story names to their
 * tag arrays. Only `export const X: Story = ...` and `export const X = ...`
 * exports with a `tags: [...]` field are considered.
 *
 * The parser is regex-based and intentionally tolerant — it does not try to
 * cover every TypeScript edge case, just the conventions documented in
 * `.ai/rules/stories-format.md`.
 */
function parseStoryTags(storiesPath) {
  const content = fs.readFileSync(storiesPath, 'utf8');
  const stories = {};

  // Match `export const Foo: Story = { ... };` blocks. We accept any object
  // body, then look for a `tags: [ ... ]` inside it.
  const exportRe =
    /export\s+const\s+([A-Z][A-Za-z0-9_]*)\s*(?::\s*[A-Za-z<>]+)?\s*=\s*\{/g;
  let match;
  while ((match = exportRe.exec(content)) !== null) {
    const name = match[1];

    // Find the matching closing brace by counting depth from match.index.
    const openIdx = content.indexOf('{', match.index);
    if (openIdx === -1) {
      continue;
    }
    let depth = 0;
    let closeIdx = -1;
    for (let i = openIdx; i < content.length; i++) {
      const ch = content[i];
      if (ch === '{') {
        depth++;
      } else if (ch === '}') {
        depth--;
        if (depth === 0) {
          closeIdx = i;
          break;
        }
      }
    }
    if (closeIdx === -1) {
      continue;
    }

    const body = content.slice(openIdx, closeIdx + 1);
    const tagsMatch = body.match(/tags\s*:\s*\[([^\]]*)\]/);
    const tags = tagsMatch
      ? tagsMatch[1]
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean)
      : [];

    stories[name] = tags;
  }

  return stories;
}

// ────────────────────────────────────────────────────────────────────────────
//   Per-file check
// ────────────────────────────────────────────────────────────────────────────

function checkMdx(absPath) {
  const errors = [];
  const relPath = path.relative(repoRoot, absPath);
  const rules = classify(relPath);

  if (rules.genre === null) {
    // Out of scope (migration-guide, pattern-overview, etc.)
    return { relPath, skipped: true, errors };
  }

  const content = fs.readFileSync(absPath, 'utf8');

  // Check 1: Exactly one <Meta of={...} />
  const metaCount = countMetaOf(content);
  if (rules.requireMeta && metaCount === 0) {
    errors.push(
      `${relPath}: missing <Meta of={Stories} /> declaration (per-unit MDX must link to its stories module)`
    );
  } else if (metaCount > 1) {
    errors.push(
      `${relPath}: found ${metaCount} <Meta of={...} /> declarations (expected exactly one)`
    );
  }

  // Check 2: Canonical section order (genre-aware)
  const headings = extractH2Headings(content);
  const canonical = rules.canonicalSections;
  const allowedSet = new Set(canonical);
  const indexInCanonical = (h) => canonical.indexOf(h);
  let lastIndex = -1;
  for (const h of headings) {
    if (!allowedSet.has(h)) {
      errors.push(
        `${relPath}: unknown ## section "${h}" for ${rules.genre} (expected one of: ${canonical.join(', ')})`
      );
      continue;
    }
    const idx = indexInCanonical(h);
    if (idx < lastIndex) {
      const prev = headings[headings.indexOf(h) - 1];
      errors.push(
        `${relPath}: ## section "${h}" appears after "${prev}", which violates canonical order (expected order: ${canonical.filter((s) => headings.includes(s)).join(' → ')})`
      );
    }
    lastIndex = Math.max(lastIndex, idx);
  }

  // Check 2a: <DocsFooter /> presence
  //
  // <DocsFooter /> is the shared block that renders the API table (for
  // components/patterns), Primary, Controls, and the Feedback link. A docs
  // page that omits it loses those surfaces. The check is a proxy for the
  // ticket's "<ApiTable /> and <Controls /> expected" requirement.
  if (rules.requireDocsFooter && !/<DocsFooter\s*\/?>/.test(content)) {
    errors.push(
      `${relPath}: missing <DocsFooter /> reference (renders ApiTable, Primary, Controls, and the Feedback link)`
    );
  }

  // Checks 3 & 4 require resolving the stories module
  const importInfo = parseStoriesImport(content);
  if (!importInfo) {
    if (rules.requireCanvasForTaggedStories && metaCount > 0) {
      errors.push(
        `${relPath}: <Meta of={...} /> is present but no \`import * as Stories from './stories/<unit>.stories'\` was found; cannot verify Canvas references`
      );
    }
    return { relPath, skipped: false, errors };
  }

  const storiesPath = resolveStoriesPath(absPath, importInfo.source);
  if (!storiesPath) {
    errors.push(
      `${relPath}: cannot resolve stories module \`${importInfo.source}\` referenced by the MDX import`
    );
    return { relPath, skipped: false, errors };
  }

  const stories = parseStoryTags(storiesPath);
  const canvasRefs = extractCanvasReferences(content, importInfo.binding);

  // Check 4: No broken story references
  for (const ref of canvasRefs) {
    if (!(ref in stories)) {
      errors.push(
        `${relPath}: <Canvas of={${importInfo.binding}.${ref}} /> references a story that does not exist in ${path.relative(repoRoot, storiesPath)}`
      );
    }
  }

  // Check 3: Every section-tagged story is surfaced via <Canvas>
  if (rules.requireCanvasForTaggedStories && rules.genre !== 'internal') {
    const canvasSet = new Set(canvasRefs);
    for (const [name, tags] of Object.entries(stories)) {
      const hasSectionTag = tags.some((t) => SECTION_TAGS.includes(t));
      if (!hasSectionTag) {
        continue;
      }
      if (!canvasSet.has(name)) {
        const sectionTag = tags.find((t) => SECTION_TAGS.includes(t));
        errors.push(
          `${relPath}: story \`${name}\` is tagged \`${sectionTag}\` in ${path.relative(repoRoot, storiesPath)} but has no <Canvas of={${importInfo.binding}.${name}} /> reference in the MDX`
        );
      }
    }
  }

  return { relPath, skipped: false, errors };
}

// ────────────────────────────────────────────────────────────────────────────
//   Public API
// ────────────────────────────────────────────────────────────────────────────

export function validateDocsPages() {
  const errors = [];
  const files = findMdxFiles();
  let checkedCount = 0;
  for (const file of files) {
    const result = checkMdx(file);
    if (result.skipped) {
      continue;
    }
    checkedCount++;
    errors.push(...result.errors);
  }
  return { errors, fileCount: checkedCount };
}

// ────────────────────────────────────────────────────────────────────────────
//   CLI entry point
// ────────────────────────────────────────────────────────────────────────────

const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  const { errors, fileCount } = validateDocsPages();
  const RED = '\x1b[31m';
  const GREEN = '\x1b[32m';
  const RESET = '\x1b[0m';
  const BOLD = '\x1b[1m';

  console.log(`Checked ${fileCount} per-unit MDX file(s).`);
  if (errors.length > 0) {
    for (const e of errors) {
      console.log(`${RED}✖${RESET} ${e}`);
    }
    console.log('');
    console.log(
      `${RED}${BOLD}${errors.length} error(s) in per-unit MDX docs pages.${RESET}`
    );
    process.exit(1);
  } else {
    console.log(`${GREEN}${BOLD}All per-unit MDX docs pages pass.${RESET}`);
  }
}
