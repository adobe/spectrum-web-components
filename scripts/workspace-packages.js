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

import { existsSync, readdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export const GENERATIONS = ['1st-gen', 'gen2'];

/** Package directories directly under `parent`. */
function childDirs(parent) {
  if (!existsSync(parent)) {
    return [];
  }
  return readdirSync(parent, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(parent, entry.name));
}

/**
 * Public (non-private) packages for a generation, found through the root
 * `workspaces` globs. `extraParents` adds directories whose children are
 * published but aren't workspaces, such as the generated 1st-gen React wrappers.
 *
 * @param {string} gen - `1st-gen` or `gen2`
 * @param {string[]} [extraParents] - Repo-relative parent directories
 * @returns {{ dir: string, pkg: Record<string, any> }[]} Each package's directory and parsed package.json
 */
export function findPublicPackages(gen, extraParents = []) {
  const { workspaces } = JSON.parse(
    readFileSync(join(root, 'package.json'), 'utf-8')
  );
  const parents = [
    ...workspaces
      .filter(
        (pattern) => pattern.startsWith(`${gen}/`) && pattern.endsWith('/*')
      )
      .map((pattern) => pattern.slice(0, -2)),
    ...extraParents,
  ];

  return parents
    .flatMap((parent) => childDirs(join(root, parent)))
    .flatMap((dir) => {
      try {
        const pkg = JSON.parse(
          readFileSync(join(dir, 'package.json'), 'utf-8')
        );
        return pkg.private ? [] : [{ dir, pkg }];
      } catch {
        return [];
      }
    });
}

/** Runs `fn` over `items` with at most `limit` in flight, preserving order. */
export async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}
