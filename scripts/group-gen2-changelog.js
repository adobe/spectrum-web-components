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
 * Groups the entries of newly generated gen2 changelog sections by component.
 *
 * Changesets renders one changeset at a time (`getReleaseLine`), so grouping
 * has to happen after `changeset version` writes the CHANGELOG files. This
 * script post-processes `gen2/packages/<pkg>/CHANGELOG.md`:
 *
 * - Only `## <version>` sections that are not in the base revision (HEAD by
 *   default) are touched; released sections are left byte-for-byte.
 * - Within each `### <type> Changes` block, entries whose first line names a
 *   component (`**fix(menu):**`, `fix(menu):`, `` `Menu` — ``, or
 *   `**Menu** —`) are nested under `- **menu**:`. Groups are sorted alphabetically and keep
 *   the order of their entries.
 * - Entries without a recognizable component (including "Updated
 *   dependencies") stay ungrouped, after the groups, in their original order.
 * - Entries whose commit is already listed in an older section are dropped so
 *   a release section only contains changes from that release.
 *
 * Re-running the script is a no-op: sections that are already grouped are
 * skipped.
 *
 * Usage: node scripts/group-gen2-changelog.js [--base <git-ref>] [files...]
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const LINK_PREFIX =
  /^-\s+(?:\[#\d+\]\([^)]*\)\s*)?(?:\[`[0-9a-f]+`\]\([^)]*\)\s*)?(?:Thanks\s[^!]*!\s*)?(?:-\s+)?/;
const COMMIT_IN_PREFIX =
  /^-\s+(?:\[#\d+\]\([^)]*\)\s*)?\[`[0-9a-f]+`\]\([^)]*\/commit\/([0-9a-f]{7,40})\)/;
const GROUP_HEAD = /^- \*\*[^*]+\*\*:\s*$/;

/**
 * Normalizes a component scope or name into a group key.
 *
 * @param {string} scope - Raw scope, for example `Color Loupe` or `<swc-menu>`
 * @returns {string | null} The key, or `null` when the scope is not a component
 */
export function normalizeScope(scope) {
  const keys = scope
    .replace(/\\\*/g, '*')
    .split(',')
    .map((part) =>
      part
        .trim()
        .toLowerCase()
        .replace(/[<>`]/g, '')
        .replace(/^(swc|sp)-/, '')
        .replace(/\s+/g, '-')
    )
    .filter((part) => part && part !== '*');
  if (!keys.length) {
    return null;
  }
  return [...new Set(keys)].sort().join(', ');
}

/**
 * Detects the component an entry belongs to from its first line.
 *
 * @param {string} firstLine - First line of a changelog list item
 * @returns {string | null} The group key, or `null` when ungrouped
 */
export function getComponentKey(firstLine) {
  if (/^-\s+Updated dependencies/.test(firstLine)) {
    return null;
  }
  const text = firstLine.replace(LINK_PREFIX, '');
  const scope =
    text.match(/^\*\*\s*[a-z]+\(([^)]*)\)!?:?\s*\*\*/i)?.[1] ??
    text.match(/^[a-z]+\(([^)]*)\)!?:/i)?.[1] ??
    text.match(/^`([^`]+)`\s+[—–-]\s/)?.[1] ??
    text.match(/^\*\*([^*]+)\*\*\s+[—–-]\s/)?.[1];
  return scope === undefined ? null : normalizeScope(scope);
}

/**
 * Returns the commit hash linked at the start of an entry, if any.
 *
 * @param {string} firstLine - First line of a changelog list item
 * @returns {string | null} The commit hash
 */
function getEntryCommit(firstLine) {
  if (/^-\s+Updated dependencies/.test(firstLine)) {
    return null;
  }
  return firstLine.match(COMMIT_IN_PREFIX)?.[1] ?? null;
}

/**
 * Splits changelog lines into the preamble and `## <version>` sections.
 *
 * @param {string} content - Changelog content
 * @returns {{ preamble: string[], sections: Array<{ version: string, lines: string[] }> }}
 *   The preamble lines and each section's lines
 */
export function splitSections(content) {
  const preamble = [];
  const sections = [];
  for (const line of content.replace(/\r\n/g, '\n').split('\n')) {
    const heading = line.match(/^## (\S+)/);
    if (heading) {
      sections.push({ version: heading[1], lines: [line] });
    } else if (sections.length) {
      sections[sections.length - 1].lines.push(line);
    } else {
      preamble.push(line);
    }
  }
  return { preamble, sections };
}

/**
 * Parses a section into its leading lines and `###` blocks of entries.
 *
 * @param {string[]} lines - Section lines, starting with the `##` heading
 * @returns {{ head: string[], blocks: Array<{ heading: string, entries: string[][] }> }}
 *   The section's leading lines and blocks
 */
function parseSection(lines) {
  const head = [];
  const blocks = [];
  let entry = null;
  for (const line of lines) {
    if (/^### /.test(line)) {
      blocks.push({ heading: line, entries: [] });
      entry = null;
    } else if (blocks.length && /^- /.test(line)) {
      entry = [line];
      blocks[blocks.length - 1].entries.push(entry);
    } else if (entry) {
      entry.push(line);
    } else if (!blocks.length) {
      head.push(line);
    }
  }
  for (const block of blocks) {
    for (const item of block.entries) {
      while (item.length > 1 && !item[item.length - 1].trim()) {
        item.pop();
      }
    }
  }
  while (head.length > 1 && !head[head.length - 1].trim()) {
    head.pop();
  }
  return { head, blocks };
}

/**
 * Groups the entries of one block by component.
 *
 * @param {string[][]} entries - The block's entries, as arrays of lines
 * @returns {string[]} The rendered block body
 */
export function groupEntries(entries) {
  const groups = new Map();
  const ungrouped = [];
  for (const item of entries) {
    const key = getComponentKey(item[0]);
    if (key === null) {
      ungrouped.push(item);
    } else {
      groups.set(key, [...(groups.get(key) ?? []), item]);
    }
  }

  const indent = (line) => (line.trim() ? `  ${line}` : '');
  const rendered = [...groups.keys()]
    .sort()
    .map((key) =>
      [
        `- **${key}**:`,
        ...groups
          .get(key)
          .map((item) => item.map(indent).join('\n'))
          .join('\n\n')
          .split('\n'),
      ].join('\n')
    );
  rendered.push(...ungrouped.map((item) => item.join('\n')));
  return rendered.join('\n\n').split('\n');
}

/**
 * Groups one newly generated section and drops entries whose commit is
 * already listed in an older section.
 *
 * @param {string[]} lines - Section lines, starting with the `##` heading
 * @param {Set<string>} olderCommits - Commit hashes listed in older sections
 * @param {(message: string) => void} [log] - Receives a note for each dropped entry
 * @returns {string[]} The grouped section lines
 */
export function groupSection(lines, olderCommits, log = () => {}) {
  const { head, blocks } = parseSection(lines);
  if (
    blocks.some((block) =>
      block.entries.some((item) => GROUP_HEAD.test(item[0]))
    )
  ) {
    return lines;
  }

  const output = [...head, ''];
  for (const block of blocks) {
    const entries = block.entries.filter((item) => {
      const commit = getEntryCommit(item[0]);
      const isDuplicate = commit !== null && olderCommits.has(commit);
      if (isDuplicate) {
        log(`dropped ${commit.slice(0, 7)} from ${head[0]}: already released`);
      }
      return !isDuplicate;
    });
    if (entries.length) {
      output.push(block.heading, '', ...groupEntries(entries), '');
    }
  }
  return output;
}

/**
 * Groups every section of a changelog that is not in the previous revision.
 *
 * @param {string} content - Current changelog content
 * @param {string} [previousContent] - Changelog content at the base revision
 * @param {(message: string) => void} [log] - Receives a note for each dropped entry
 * @returns {string} The updated changelog content
 */
export function groupChangelog(content, previousContent = '', log = () => {}) {
  const released = new Set(
    splitSections(previousContent).sections.map((section) => section.version)
  );
  const { preamble, sections } = splitSections(content);

  const olderCommits = new Set();
  for (const section of sections) {
    if (released.has(section.version)) {
      for (const line of section.lines) {
        const commit = getEntryCommit(line);
        if (commit) {
          olderCommits.add(commit);
        }
      }
    }
  }

  const lines = [...preamble];
  for (const section of sections) {
    lines.push(
      ...(released.has(section.version)
        ? section.lines
        : groupSection(section.lines, olderCommits, log))
    );
  }
  return lines.join('\n');
}

/**
 * Reads a file at a git revision.
 *
 * @param {string} base - Git ref
 * @param {string} filePath - Absolute file path
 * @returns {string} The file content, or an empty string when absent
 */
function readAtRevision(base, filePath) {
  const gitPath = path.relative(ROOT, filePath).split(path.sep).join('/');
  try {
    return execFileSync('git', ['show', `${base}:${gitPath}`], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return '';
  }
}

/**
 * Lists the gen2 package changelogs.
 *
 * @returns {string[]} Absolute paths to gen2/packages/<pkg>/CHANGELOG.md files
 */
function findGen2Changelogs() {
  const packagesDir = path.join(ROOT, 'gen2', 'packages');
  return fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesDir, entry.name, 'CHANGELOG.md'))
    .filter((file) => fs.existsSync(file))
    .sort();
}

/**
 * CLI entry point.
 *
 * @param {string[]} args - Command line arguments
 */
function main(args) {
  let base = 'HEAD';
  const files = [];
  for (let index = 0; index < args.length; index++) {
    if (args[index] === '--base') {
      base = args[++index];
    } else {
      files.push(path.resolve(args[index]));
    }
  }

  for (const file of files.length ? files : findGen2Changelogs()) {
    const relativePath = path.relative(ROOT, file);
    const content = fs.readFileSync(file, 'utf8');
    const updated = groupChangelog(
      content,
      readAtRevision(base, file),
      (message) => console.log(`⚠️ ${relativePath}: ${message}`)
    );
    if (updated !== content) {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`✅ Grouped ${relativePath}`);
    }
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main(process.argv.slice(2));
}
