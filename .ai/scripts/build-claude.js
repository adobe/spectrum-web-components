#!/usr/bin/env node

// Copyright 2026 Adobe. All rights reserved.
// This file is licensed to you under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may obtain a copy
// of the License at http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under
// the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
// OF ANY KIND, either express or implied. See the License for the specific language
// governing permissions and limitations under the License.

/**
 * Compiles the tool-agnostic rules in `.ai/rules/*.md` into a Claude Code
 * instruction file at the repository root (`CLAUDE.md`).
 *
 * Why this exists: the rule files carry Cursor-style frontmatter
 * (`alwaysApply`, `globs`) that Cursor honors live. Claude Code does not read
 * that frontmatter, and it inlines every file it can see, so a plain directory
 * symlink loads all rules into every session. This script reads the same
 * frontmatter and emits only what Claude should always load (as `@`-imports)
 * plus a one-line pointer per on-demand rule, which Claude reads with the Read
 * tool when a task matches.
 *
 * `.ai/` stays the single source of truth. Regenerate after editing any rule.
 *
 * Usage:
 *   node .ai/scripts/build-claude.js           # write CLAUDE.md
 *   node .ai/scripts/build-claude.js --check    # exit 1 if CLAUDE.md is stale
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname.replace(/\/$/, '');
const RULES_DIR = join(ROOT, '.ai/rules');
const OUTPUT = join(ROOT, 'CLAUDE.md');

/**
 * Parse the leading `---` frontmatter block of a rule file.
 * Returns { description, globs: string[], alwaysApply: boolean }.
 */
function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  const fields = { description: '', globs: [], alwaysApply: false };
  if (!match) {
    return fields;
  }

  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) {
      continue;
    }
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key === 'description') {
      fields.description = value;
    } else if (key === 'alwaysApply') {
      fields.alwaysApply = value === 'true';
    } else if (key === 'globs') {
      fields.globs = value
        .replace(/^['"]|['"]$/g, '')
        .split(',')
        .map((g) => g.trim())
        .filter(Boolean);
    }
  }
  return fields;
}

function loadRules() {
  return readdirSync(RULES_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => ({
      name: basename(file, '.md'),
      path: `.ai/rules/${file}`,
      ...parseFrontmatter(readFileSync(join(RULES_DIR, file), 'utf8')),
    }));
}

/**
 * Build the CLAUDE.md content string from the current rule frontmatter.
 * Pure function so the `--check` mode can compare without touching disk.
 */
export function buildClaudeContent() {
  const rules = loadRules();
  const always = rules.filter((r) => r.alwaysApply);
  const globbed = rules.filter((r) => !r.alwaysApply && r.globs.length > 0);
  const onDemand = rules.filter((r) => !r.alwaysApply && r.globs.length === 0);

  const lines = [
    '# Spectrum Web Components — Claude Code instructions',
    '',
    '<!--',
    '  GENERATED FILE — do not edit by hand.',
    '  Source of truth: .ai/rules/*.md (tool-agnostic). Regenerate with `yarn build:claude`.',
    '  CI (`yarn lint:ai`) fails if this file drifts from the rule frontmatter.',
    '  Background on the adapter model: .ai/README.md.',
    '-->',
    '',
    'Project rules live in `.ai/rules/` as tool-agnostic markdown. Cursor honors their',
    '`alwaysApply` / `globs` frontmatter live; Claude Code does not, so this file is',
    'compiled from that frontmatter. Always-active rules are imported below; every other',
    'rule is listed with the trigger for when to read it — do not load those preemptively.',
    '',
    '## Always active',
    '',
  ];

  for (const r of always) {
    lines.push(`@${r.path}`);
  }

  lines.push('', '## Read when editing matching files', '');
  for (const r of globbed) {
    lines.push(
      `- \`${r.path}\` — editing \`${r.globs.join('`, `')}\`: ${r.description}`
    );
  }

  lines.push('', '## Read when the task calls for it', '');
  for (const r of onDemand) {
    lines.push(`- \`${r.path}\` — ${r.description}`);
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Staleness check for CI. Returns { errors, fileCount } like the other
 * validators in validate.js.
 */
export function validateClaudeAdapter() {
  const errors = [];
  const expected = buildClaudeContent();
  let actual = '';
  try {
    actual = readFileSync(OUTPUT, 'utf8');
  } catch {
    errors.push('CLAUDE.md is missing — run `yarn build:claude`');
    return { errors, fileCount: 1 };
  }
  if (actual !== expected) {
    errors.push(
      'CLAUDE.md is stale vs .ai/rules/ frontmatter — run `yarn build:claude`'
    );
  }
  return { errors, fileCount: 1 };
}

// CLI entry point: run only when invoked directly, not when imported.
if (import.meta.url === `file://${process.argv[1]}`) {
  const content = buildClaudeContent();
  if (process.argv.includes('--check')) {
    const { errors } = validateClaudeAdapter();
    if (errors.length) {
      console.error(errors.join('\n'));
      process.exit(1);
    }
    console.log('CLAUDE.md is up to date.');
  } else {
    writeFileSync(OUTPUT, content);
    console.log('Wrote CLAUDE.md');
  }
}
