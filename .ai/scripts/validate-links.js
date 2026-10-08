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
 * Validate that relative links in agent-facing Markdown resolve to real files.
 *
 * A broken path silently breaks agent bootstrapping: the agent never finds the guidance
 * and reports no error. This check catches drift early.
 *
 * Checks:
 * - Every relative Markdown link in an AGENTS.md file resolves (error)
 * - Every relative Markdown link in `.ai/**` Markdown resolves, ignoring fenced and inline
 *   code, which hold examples for other documents (error)
 * - Every backticked `.ai/...` path in `.ai/**` Markdown resolves (warning)
 *
 * Usage:
 *   node .ai/scripts/validate-links.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const aiDir = path.join(repoRoot, '.ai');

// Directories to skip when searching for AGENTS.md files
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  '.wireit',
  'storybook-static',
  'coverage',
]);

// Runtime folders that agents create on demand and git ignores.
const RUNTIME_PATHS = ['.ai/handoffs'];

// Links inside quoted writing samples, which resolve from the sampled document, not here.
const SAMPLE_LINKS = new Set([
  '.ai/skills/documentation-standards/SKILL.md ../accordion-item/',
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
 * Recursively find all Markdown files under `.ai/`.
 */
function findAiMarkdown(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findAiMarkdown(full));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      // Skill templates hold links that resolve from wherever the template is copied.
      !full.split(path.sep).includes('assets')
    ) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Replace fenced code blocks and inline code with blank space of the same shape, so line
 * numbers stay accurate and example links inside code are ignored.
 */
function stripCode(source) {
  return source
    .replace(/^([ \t]*)(```|~~~)[\s\S]*?^\1\2[^\n]*$/gm, (block) =>
      block.replace(/[^\n]/g, ' ')
    )
    .replace(/`[^`\n]*`/g, (span) => ' '.repeat(span.length));
}

/**
 * Extract relative markdown links from source text.
 * Returns array of { href, line }; skips external URLs, pure anchors, and mailto.
 */
function extractRelativeLinks(source) {
  const links = [];
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(source)) !== null) {
    const href = match[2].split('#')[0].split('?')[0].trim(); // strip anchor and query
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
 * Extract backticked repository paths that start with `.ai/`, skipping placeholders.
 */
function extractAiPaths(source) {
  const results = [];
  const pattern = /`(\.ai\/[^`\s]+)`/g;
  let inFence = false;
  source.split('\n').forEach((text, index) => {
    if (/^\s*(```|~~~)/.test(text)) {
      inFence = !inFence;
      return;
    }
    if (inFence) {
      return;
    }
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const ref = match[1].replace(/[.,:;)]+$/, '');
      if (/[<>{}[\]*$]/.test(ref)) {
        continue;
      }
      results.push({ ref, line: index + 1 });
    }
  });
  return results;
}

function checkLinks(filePath, source, errors) {
  const fileDir = path.dirname(filePath);
  const rel = path.relative(repoRoot, filePath);
  for (const { href, line } of extractRelativeLinks(source)) {
    if (SAMPLE_LINKS.has(`${rel} ${href}`)) {
      continue;
    }
    const resolved = path.resolve(fileDir, decodeURI(href));
    if (!fs.existsSync(resolved)) {
      errors.push(
        `${rel}:${line}: broken link '${href}' (resolved to ${path.relative(repoRoot, resolved)})`
      );
    }
  }
}

/**
 * Validate a single AGENTS.md file. Returns array of error strings.
 */
function validateFile(filePath) {
  const errors = [];
  checkLinks(filePath, fs.readFileSync(filePath, 'utf-8'), errors);
  return errors;
}

/**
 * Validate a single `.ai/` Markdown file. Returns { errors, warnings }.
 */
function validateAiFile(filePath) {
  const errors = [];
  const warnings = [];
  const source = fs.readFileSync(filePath, 'utf-8');
  const rel = path.relative(repoRoot, filePath);
  checkLinks(filePath, stripCode(source), errors);
  for (const { ref, line } of extractAiPaths(source)) {
    if (RUNTIME_PATHS.some((p) => ref === p || ref.startsWith(`${p}/`))) {
      continue;
    }
    if (!fs.existsSync(path.join(repoRoot, ref))) {
      warnings.push(`${rel}:${line}: path '${ref}' doesn't exist`);
    }
  }
  return { errors, warnings };
}

/**
 * Run validation across AGENTS.md files and `.ai/` Markdown.
 * Returns { errors, warnings, fileCount }.
 */
export function validateLinks() {
  const agentsFiles = findAgentsFiles(repoRoot);
  const aiFiles = findAiMarkdown(aiDir);
  const errors = agentsFiles.flatMap(validateFile);
  const warnings = [];
  for (const file of aiFiles) {
    const result = validateAiFile(file);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  return {
    errors,
    warnings,
    fileCount: agentsFiles.length + aiFiles.length,
  };
}
