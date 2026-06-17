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
 * Ensures @spectrum-web-components/llm-docs is available, then reports where the
 * per-component documentation lives and which components it covers.
 *
 * Resolution order (first hit wins), so the skill works whether the consumer has
 * already installed the package, is working inside the spectrum-web-components
 * monorepo, or needs a fresh install:
 *   1. Already installed: node_modules/@spectrum-web-components/llm-docs/src
 *   2. Inside the SWC monorepo: 1st-gen/projects/llm-docs/src
 *   3. Not present: install it as a devDependency with the project's package manager
 *
 * Usage:
 *   node ensure-llm-docs.mjs                 # ensure + list all available components
 *   node ensure-llm-docs.mjs button dialog   # ensure + print the path to those docs
 *
 * Exit code 0 on success. Output is human-readable; the final line of the docs
 * directory is prefixed with `DOCS_DIR=` so it is easy to grep.
 */

import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const PACKAGE = '@spectrum-web-components/llm-docs';
const SUFFIX = '.llm.md';

/** Walk up from cwd looking for a directory that satisfies `test`. */
function findUp(test, startDir = process.cwd()) {
  let dir = resolve(startDir);
  for (;;) {
    const hit = test(dir);
    if (hit) {
      return hit;
    }
    const parent = dirname(dir);
    if (parent === dir) {
      return null;
    }
    dir = parent;
  }
}

/** Detect the package manager from the nearest lockfile, defaulting to npm. */
function detectPackageManager() {
  const root =
    findUp((dir) =>
      ['yarn.lock', 'pnpm-lock.yaml', 'package-lock.json', 'bun.lockb']
        .map((lock) => join(dir, lock))
        .some(existsSync)
        ? dir
        : null
    ) ?? process.cwd();
  if (existsSync(join(root, 'pnpm-lock.yaml'))) {
    return { name: 'pnpm', root };
  }
  if (existsSync(join(root, 'yarn.lock'))) {
    return { name: 'yarn', root };
  }
  if (existsSync(join(root, 'bun.lockb'))) {
    return { name: 'bun', root };
  }
  return { name: 'npm', root };
}

function installCommand(manager) {
  switch (manager) {
    case 'pnpm':
      return `pnpm add -D ${PACKAGE}`;
    case 'yarn':
      return `yarn add -D ${PACKAGE}`;
    case 'bun':
      return `bun add -d ${PACKAGE}`;
    default:
      return `npm install -D ${PACKAGE}`;
  }
}

/** Look for the docs in an installed node_modules tree. */
function findInstalled() {
  return findUp((dir) => {
    const candidate = join(
      dir,
      'node_modules',
      '@spectrum-web-components',
      'llm-docs',
      'src'
    );
    return existsSync(candidate) ? candidate : null;
  });
}

/** Look for the docs inside the spectrum-web-components monorepo itself. */
function findInMonorepo() {
  return findUp((dir) => {
    const candidate = join(dir, '1st-gen', 'projects', 'llm-docs', 'src');
    return existsSync(candidate) ? candidate : null;
  });
}

function listComponents(docsDir) {
  return readdirSync(docsDir)
    .filter((file) => file.endsWith(SUFFIX))
    .map((file) => file.slice(0, -SUFFIX.length))
    .sort();
}

function resolveDocsDir() {
  const installed = findInstalled();
  if (installed) {
    return { docsDir: installed, source: 'installed package' };
  }

  const monorepo = findInMonorepo();
  if (monorepo) {
    return { docsDir: monorepo, source: 'spectrum-web-components monorepo' };
  }

  const { name, root } = detectPackageManager();
  const command = installCommand(name);
  console.error(`[llm-docs] not found; installing with ${name}: ${command}`);
  execSync(command, { cwd: root, stdio: 'inherit' });

  const afterInstall = findInstalled();
  if (!afterInstall) {
    throw new Error(
      `Installed ${PACKAGE} but could not locate its src/ directory. The ` +
        `package may be unpublished; see the skill's fallback guidance.`
    );
  }
  return { docsDir: afterInstall, source: `freshly installed with ${name}` };
}

function main() {
  const requested = process.argv.slice(2).map((arg) => arg.toLowerCase());
  const { docsDir, source } = resolveDocsDir();
  const components = listComponents(docsDir);

  console.log(`[llm-docs] using docs from: ${source}`);
  console.log(`[llm-docs] ${components.length} components documented`);

  if (requested.length > 0) {
    for (const name of requested) {
      const path = join(docsDir, `${name}${SUFFIX}`);
      if (existsSync(path)) {
        console.log(`READ ${name}: ${path}`);
      } else {
        console.error(
          `[llm-docs] no docs for "${name}". Available: ${components.join(', ')}`
        );
      }
    }
  } else {
    console.log(`[llm-docs] available: ${components.join(', ')}`);
  }

  console.log(`DOCS_DIR=${docsDir}`);
}

main();
