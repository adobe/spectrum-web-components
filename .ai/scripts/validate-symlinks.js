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
 * Validates that the .cursor/ and .claude/ adapter symlinks correctly point to
 * their .ai/ canonical sources.
 *
 * Cursor rules: per-file symlinks (.cursor/rules/<name>.mdc → ../../.ai/rules/<name>.md)
 * Cursor skills: directory symlink (.cursor/skills → ../.ai/skills)
 * Claude rules: directory symlink (.claude/rules → ../.ai/rules)
 * Claude skills: directory symlink (.claude/skills → ../.ai/skills)
 *
 * Returns { errors, fileCount } for integration with validate.js.
 */

import { existsSync, lstatSync, readdirSync, readlinkSync } from 'fs';
import { basename, join } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname.replace(/\/$/, '');

function checkDirectorySymlink(linkPath, expectedTarget, errors) {
  const rel = linkPath.replace(ROOT + '/', '');
  if (!existsSync(linkPath)) {
    errors.push(
      `${rel} does not exist — run one-time setup (see .ai/README.md)`
    );
    return;
  }
  const stat = lstatSync(linkPath);
  if (!stat.isSymbolicLink()) {
    errors.push(`${rel} exists but is not a symlink`);
    return;
  }
  const actual = readlinkSync(linkPath);
  if (actual !== expectedTarget) {
    errors.push(`${rel} points to "${actual}", expected "${expectedTarget}"`);
  }
}

function checkCursorRuleSymlinks(errors) {
  const rulesDir = join(ROOT, '.ai/rules');
  const cursorRulesDir = join(ROOT, '.cursor/rules');
  let checks = 0;

  const sourceFiles = readdirSync(rulesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => basename(f, '.md'));

  for (const name of sourceFiles) {
    checks++;
    const linkPath = join(cursorRulesDir, `${name}.mdc`);
    const expectedTarget = `../../.ai/rules/${name}.md`;
    const rel = linkPath.replace(ROOT + '/', '');

    let stat;
    try {
      stat = lstatSync(linkPath);
    } catch {
      errors.push(
        `${rel} does not exist — run one-time setup (see .ai/README.md)`
      );
      continue;
    }

    if (!stat.isSymbolicLink()) {
      errors.push(`${rel} exists but is not a symlink`);
      continue;
    }

    const actual = readlinkSync(linkPath);
    if (actual !== expectedTarget) {
      errors.push(`${rel} points to "${actual}", expected "${expectedTarget}"`);
    }
  }

  // Check for stale .mdc symlinks (no matching .ai/rules/*.md source)
  if (existsSync(cursorRulesDir)) {
    const cursorFiles = readdirSync(cursorRulesDir).filter((f) =>
      f.endsWith('.mdc')
    );
    for (const file of cursorFiles) {
      const name = basename(file, '.mdc');
      if (!sourceFiles.includes(name)) {
        checks++;
        errors.push(
          `.cursor/rules/${file} has no matching .ai/rules/${name}.md — stale symlink`
        );
      }
    }
  }

  return checks;
}

/**
 * Run validation across all adapter symlinks. Returns { errors, fileCount }.
 */
export function validateSymlinks() {
  const errors = [];

  const ruleChecks = checkCursorRuleSymlinks(errors);
  checkDirectorySymlink(join(ROOT, '.cursor/skills'), '../.ai/skills', errors);
  checkDirectorySymlink(join(ROOT, '.claude/rules'), '../.ai/rules', errors);
  checkDirectorySymlink(join(ROOT, '.claude/skills'), '../.ai/skills', errors);

  return { errors, fileCount: ruleChecks + 3 };
}
