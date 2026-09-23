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
 * Claude rules: directory symlink (.claude/rules → ../.ai/rules)
 * Claude skills: directory symlink (.claude/skills → ../.ai/skills)
 * Cursor skills: directory symlink (.cursor/skills → ../.ai/skills)
 *
 * Cursor rules (.cursor/rules/*.mdc) are generated files, not symlinks: `sync.js` writes
 * them and `sync.js --check` verifies them. A leftover per-file symlink is an error.
 *
 * Returns { errors, fileCount } for integration with validate.js.
 */

import { existsSync, lstatSync, readdirSync, readlinkSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname.replace(/\/$/, '');

function checkDirectorySymlink(linkPath, expectedTarget, errors) {
  const rel = linkPath.replace(ROOT + '/', '');
  if (!existsSync(linkPath)) {
    errors.push(
      `${rel} does not exist; recreate it with: ln -s ${expectedTarget} ${rel}`
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

function checkNoCursorRuleSymlinks(errors) {
  const dir = join(ROOT, '.cursor/rules');
  if (!existsSync(dir)) {
    return 0;
  }
  const files = readdirSync(dir);
  for (const file of files) {
    if (lstatSync(join(dir, file)).isSymbolicLink()) {
      errors.push(
        `.cursor/rules/${file} is a symlink; Cursor rules are generated now, so run \`yarn ai:sync\``
      );
    }
  }
  return files.length;
}

/**
 * Run validation across all adapter symlinks. Returns { errors, fileCount }.
 */
export function validateSymlinks() {
  const errors = [];

  checkDirectorySymlink(join(ROOT, '.claude/rules'), '../.ai/rules', errors);
  checkDirectorySymlink(join(ROOT, '.claude/skills'), '../.ai/skills', errors);
  checkDirectorySymlink(join(ROOT, '.cursor/skills'), '../.ai/skills', errors);
  const cursorRules = checkNoCursorRuleSymlinks(errors);

  return { errors, fileCount: 3 + cursorRules };
}
