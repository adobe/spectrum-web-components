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
 * Entry point for AI tooling CI validation.
 *
 * Runs four checks:
 *   1. Story tags — valid tags in 2nd-gen *.stories.ts files
 *   2. AGENTS.md paths — relative links in AGENTS.md files resolve to real files
 *   3. Config schema — .ai/config.json structure and regex validity
 *   4. Symlinks — .cursor/ and .claude/ adapter symlinks point to .ai/ sources
 *
 * Exits with code 1 if any check has errors; warnings are printed but do not fail.
 *
 * Usage:
 *   node .ai/scripts/validate.js
 */

import { validateAgentsPaths } from './validate-agents-paths.js';
import { validateConfigSchema } from './validate-config-schema.js';
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

// 2. AGENTS.md paths
const agents = validateAgentsPaths();
totalErrors += agents.errors.length;
printSection('AGENTS.md paths', agents.errors, [], agents.fileCount);

// 3. Config schema
const config = validateConfigSchema();
totalErrors += config.errors.length;
printSection(
  'Config schema (.ai/config.json)',
  config.errors,
  config.warnings,
  1
);

// 4. Symlinks
const symlinks = validateSymlinks();
totalErrors += symlinks.errors.length;
printSection(
  'Symlinks (.cursor/ and .claude/)',
  symlinks.errors,
  [],
  symlinks.fileCount
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
