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
 * Validate Storybook story tags in 2nd-gen component stories files.
 *
 * Checks:
 * - Every tag value is in the known allowed set
 * - Every stories file has at least one `tags` declaration containing 'migrated'
 *
 * Usage:
 *   node .ai/scripts/validate-story-tags.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

// Tags defined in .ai/rules/stories-format.md
const ALLOWED_TAGS = new Set([
  'anatomy',
  'options',
  'states',
  'behaviors',
  'a11y',
  'overview',
  'migrated',
  'autodocs',
  'dev',
  'utility',
  '!test',
  '!dev',
  '!autodocs',
]);

/**
 * Recursively find all *.stories.ts files under a directory.
 */
function findStoriesFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findStoriesFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.stories.ts')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extract all tag arrays from a file's source text.
 * Returns an array of { tags: string[], line: number } objects.
 */
function extractTagDeclarations(source) {
  const declarations = [];

  // Match `tags: [...]` — handles multi-line arrays
  const tagsPattern = /tags:\s*\[([^\]]*)\]/gs;
  let match;

  while ((match = tagsPattern.exec(source)) !== null) {
    const arrayContent = match[1];
    const lineNumber = source.slice(0, match.index).split('\n').length;

    // Extract individual quoted tag values
    const tagValues = [];
    const valuePattern = /['"]([^'"]+)['"]/g;
    let valueMatch;
    while ((valueMatch = valuePattern.exec(arrayContent)) !== null) {
      tagValues.push(valueMatch[1]);
    }

    if (tagValues.length > 0) {
      declarations.push({ tags: tagValues, line: lineNumber });
    }
  }

  return declarations;
}

/**
 * Validate a single stories file. Returns array of error strings.
 */
function validateFile(filePath) {
  const errors = [];
  const source = fs.readFileSync(filePath, 'utf-8');
  const rel = path.relative(repoRoot, filePath);
  const declarations = extractTagDeclarations(source);

  if (declarations.length === 0) {
    errors.push(`${rel}: no tags declarations found`);
    return errors;
  }

  // Check all tags are in the allowed set
  for (const { tags, line } of declarations) {
    for (const tag of tags) {
      if (!ALLOWED_TAGS.has(tag)) {
        errors.push(
          `${rel}:${line}: unknown tag '${tag}' — allowed: ${[...ALLOWED_TAGS].sort().join(', ')}`
        );
      }
    }
  }

  // Internal stories files (*.internal.stories.ts) like swc-icon are dev-only and do not
  // need the 'migrated' tag. All other stories files do.
  const isInternal = path.basename(filePath).includes('.internal.');
  if (!isInternal) {
    const hasMigrated = declarations.some(({ tags }) =>
      tags.includes('migrated')
    );
    if (!hasMigrated) {
      errors.push(`${rel}: missing required 'migrated' tag on the meta object`);
    }
  }

  return errors;
}

/**
 * Run validation across all stories files. Returns { errors, fileCount }.
 */
export function validateStoryTags() {
  const storiesRoot = path.join(repoRoot, '2nd-gen/packages/swc/components');

  if (!fs.existsSync(storiesRoot)) {
    return { errors: [], fileCount: 0 };
  }

  const files = findStoriesFiles(storiesRoot);
  const errors = files.flatMap(validateFile);

  return { errors, fileCount: files.length };
}
