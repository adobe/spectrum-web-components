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
 * Validate that all relative paths referenced in AGENTS.md files resolve to real files.
 *
 * A broken path in AGENTS.md silently breaks agent bootstrapping — the agent never
 * finds the guidance without any error. This check catches drift early.
 *
 * Checks:
 * - Every relative markdown link in an AGENTS.md file points to an existing path
 *
 * Usage:
 *   node .ai/scripts/validate-agents-paths.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

// Directories to skip when searching for AGENTS.md files
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  '.wireit',
  'storybook-static',
  'coverage',
]);

/**
 * Recursively find all AGENTS.md files under a directory.
 */
function findAgentsFiles(dir) {
  const results = [];

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        results.push(...findAgentsFiles(path.join(dir, entry.name)));
      }
    } else if (entry.isFile() && entry.name === 'AGENTS.md') {
      results.push(path.join(dir, entry.name));
    }
  }

  return results;
}

/**
 * Extract relative markdown links from source text.
 * Returns array of { href, line } — skips external URLs, pure anchors, and mailto.
 */
function extractRelativeLinks(source) {
  const links = [];
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(source)) !== null) {
    const href = match[2].split('#')[0].trim(); // strip anchor fragment
    if (
      !href ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//') ||
      href.startsWith('mailto:')
    ) {
      continue;
    }

    const line = source.slice(0, match.index).split('\n').length;
    links.push({ href, line });
  }

  return links;
}

/**
 * Validate a single AGENTS.md file. Returns array of error strings.
 */
function validateFile(filePath) {
  const errors = [];
  const source = fs.readFileSync(filePath, 'utf-8');
  const fileDir = path.dirname(filePath);
  const rel = path.relative(repoRoot, filePath);

  for (const { href, line } of extractRelativeLinks(source)) {
    const resolved = path.resolve(fileDir, href);
    if (!fs.existsSync(resolved)) {
      errors.push(
        `${rel}:${line}: broken link '${href}' — resolved to ${path.relative(repoRoot, resolved)}`
      );
    }
  }

  return errors;
}

/**
 * Run validation across all AGENTS.md files. Returns { errors, fileCount }.
 */
export function validateAgentsPaths() {
  const files = findAgentsFiles(repoRoot);
  const errors = files.flatMap(validateFile);

  return { errors, fileCount: files.length };
}
