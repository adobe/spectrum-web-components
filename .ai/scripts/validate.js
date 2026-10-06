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
 * Entry point for AI tooling CI validation (`yarn lint:ai`).
 *
 * Runs seven checks:
 *   1. Story tags: valid tags in gen2 *.stories.ts files
 *   2. Links: relative links in AGENTS.md files and `.ai/` Markdown resolve to real files
 *   3. Conventions: branch and commit types documented in .ai/skills/ match the types
 *      commitlint enforces (this replaced the old .ai/config.json schema check)
 *   4. Frontmatter: `.ai/` instruction and skill metadata matches the canonical schema,
 *      `paths` globs match tracked files, skill names and descriptions load in Copilot,
 *      and generated folders hold only generated files
 *   5. Symlinks: the .claude/ and .cursor/ directory symlinks point to .ai/ sources
 *   6. Generated files: .github/instructions/ and .cursor/rules/ match `yarn ai:sync`
 *   7. Docs pages: per-unit MDX docs pages for gen2 components, internal
 *      components, patterns, and controllers conform to the per-unit MDX
 *      authoring standards in `.ai/rules/stories-documentation.md`
 *
 * Exits with code 1 if any check has errors; warnings are printed but do not fail.
 *
 * Usage:
 *   node .ai/scripts/validate.js
 */

import { validateDocsPages } from '../../scripts/validate-docs-pages.js';
import { syncAi } from './sync.js';
import { validateConventions } from './validate-conventions.js';
import { validateFrontmatter } from './validate-frontmatter.js';
import { validateLinks } from './validate-links.js';
import { validateStoryTags } from './validate-story-tags.js';
import { validateSymlinks } from './validate-symlinks.js';

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

function printSection(title, errors, warnings, fileCount) {
  const status =
    errors.length > 0
      ? `${RED}✖ ${errors.length} error(s)${RESET}`
      : `${GREEN}✔ passed${RESET}`;

  console.log(
    `\n${BOLD}${title}${RESET} ${DIM}(${fileCount} file(s))${RESET} — ${status}`
  );

  for (const w of warnings) {
    console.log(`  ${YELLOW}⚠${RESET}  ${w}`);
  }
  for (const e of errors) {
    console.log(`  ${RED}✖${RESET}  ${e}`);
  }
}

let totalErrors = 0;

// 1. Story tags
const tags = validateStoryTags();
totalErrors += tags.errors.length;
printSection('Story tags', tags.errors, [], tags.fileCount);

// 2. Links
const links = validateLinks();
totalErrors += links.errors.length;
printSection(
  'Links (AGENTS.md and .ai/)',
  links.errors,
  links.warnings,
  links.fileCount
);

// 3. Conventions
const conventions = validateConventions();
totalErrors += conventions.errors.length;
printSection(
  'Commit and branch conventions (commitlint)',
  conventions.errors,
  conventions.warnings,
  conventions.fileCount
);

// 4. Frontmatter
const frontmatter = validateFrontmatter();
totalErrors += frontmatter.errors.length;
printSection(
  'Instruction and skill frontmatter (.ai/)',
  frontmatter.errors,
  frontmatter.warnings,
  frontmatter.fileCount
);

// 5. Symlinks
const symlinks = validateSymlinks();
totalErrors += symlinks.errors.length;
printSection(
  'Symlinks (.cursor/ and .claude/)',
  symlinks.errors,
  [],
  symlinks.fileCount
);

// 6. Generated files
const generated = await syncAi({ write: false });
totalErrors += generated.errors.length;
printSection(
  'Generated files (yarn ai:sync --check)',
  generated.errors,
  [],
  generated.fileCount
);

// 7. Docs pages
const docsPages = validateDocsPages();
totalErrors += docsPages.errors.length;
printSection(
  'Per-unit MDX docs pages',
  docsPages.errors,
  [],
  docsPages.fileCount
);

// Summary
console.log('');
if (totalErrors > 0) {
  console.log(
    `${RED}${BOLD}${totalErrors} error(s) found. Fix the issues above before merging.${RESET}`
  );
  process.exit(1);
} else {
  console.log(`${GREEN}${BOLD}All checks passed.${RESET}`);
}
