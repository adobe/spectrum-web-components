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
 * Validate that the commit and branch conventions documented in `.ai/skills/` match the
 * commit types that commitlint actually enforces.
 *
 * This replaces the old `.ai/config.json` schema check: commitlint is now the single
 * source for the type list, and the skills must agree with it.
 *
 * Checks:
 * - `branch-naming`: the type group in the branch pattern equals commitlint's types
 * - `conventional-commit`: the "Commit Types" table lists exactly commitlint's types
 * - Every branch-naming example that should pass matches the pattern
 *
 * Returns { errors, warnings, fileCount } for integration with validate.js.
 */

import { existsSync, readFileSync } from 'fs';
import { createRequire } from 'module';
import path from 'path';

import { ROOT } from './ai-files.js';

const require = createRequire(import.meta.url);

const BRANCH_SKILL = '.ai/skills/branch-naming/SKILL.md';
const COMMIT_SKILL = '.ai/skills/conventional-commit/SKILL.md';

/**
 * The commit types commitlint enforces: a `type-enum` rule in commitlint.config.cjs if
 * present, otherwise the one from the shared config it extends.
 */
function commitlintTypes() {
  const config = require(path.join(ROOT, 'commitlint.config.cjs'));
  const local = config.rules?.['type-enum']?.[2];
  if (Array.isArray(local)) {
    return local;
  }
  for (const name of [].concat(config.extends ?? [])) {
    const shared = require(require.resolve(name, { paths: [ROOT] }));
    const types = (shared.default ?? shared).rules?.['type-enum']?.[2];
    if (Array.isArray(types)) {
      return types;
    }
  }
  return null;
}

const sameSet = (a, b) =>
  a.length === b.length && [...a].sort().join() === [...b].sort().join();

export function validateConventions() {
  const errors = [];
  const warnings = [];

  const types = commitlintTypes();
  if (!types) {
    errors.push(
      'commitlint.config.cjs: no `type-enum` rule found, so commit types cannot be checked'
    );
    return { errors, warnings, fileCount: 1 };
  }

  const branchFile = path.join(ROOT, BRANCH_SKILL);
  if (!existsSync(branchFile)) {
    errors.push(`${BRANCH_SKILL}: not found`);
  } else {
    const text = readFileSync(branchFile, 'utf8');
    const line = text.split('\n').find((l) => l.startsWith('^[a-z0-9]+'));
    const group = line?.match(/\\\/\(([a-z|]+)\)-/);
    if (!line || !group) {
      errors.push(`${BRANCH_SKILL}: branch pattern line not found`);
    } else {
      const patternTypes = group[1].split('|');
      if (!sameSet(patternTypes, types)) {
        errors.push(
          `${BRANCH_SKILL}: pattern types [${patternTypes.join(', ')}] don't match commitlint [${types.join(', ')}]`
        );
      }
      const pattern = new RegExp(line.trim());
      const examples = [
        ...text.matchAll(/^### Good examples\n\n((?:- `[^`]+`\n)+)/gm),
      ].flatMap((m) =>
        [...m[1].matchAll(/`([^`]+)`/g)].map((found) => found[1])
      );
      if (examples.length === 0) {
        errors.push(
          `${BRANCH_SKILL}: no branch names found under "### Good examples"`
        );
      }
      for (const example of examples) {
        if (!pattern.test(example)) {
          errors.push(
            `${BRANCH_SKILL}: good example '${example}' doesn't match the pattern`
          );
        }
      }
    }
  }

  const commitFile = path.join(ROOT, COMMIT_SKILL);
  if (!existsSync(commitFile)) {
    errors.push(`${COMMIT_SKILL}: not found`);
  } else {
    const text = readFileSync(commitFile, 'utf8');
    const section = text.split(/^## Commit Types$/m)[1]?.split(/^## /m)[0];
    const tableTypes = [
      ...(section ?? '').matchAll(/^\| `([a-z]+)` +\|/gm),
    ].map((m) => m[1]);
    if (!tableTypes.length) {
      errors.push(`${COMMIT_SKILL}: "Commit Types" table not found`);
    } else if (!sameSet(tableTypes, types)) {
      errors.push(
        `${COMMIT_SKILL}: table types [${tableTypes.join(', ')}] don't match commitlint [${types.join(', ')}]`
      );
    }
  }

  return { errors, warnings, fileCount: 3 };
}
