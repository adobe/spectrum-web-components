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

// Runs the package-manager install command synchronously when docs are missing.
import { execSync } from 'node:child_process';
// Existence checks and directory listing for locating the docs.
import { existsSync, readdirSync } from 'node:fs';
// Path helpers: parent directory, segment joining, and absolute resolution.
import { dirname, join, resolve } from 'node:path';

// The npm package that holds the aggregate per-component docs.
const PACKAGE = '@spectrum-web-components/llm-docs';
// Suffix of each documentation file, e.g. `button.llm.md`.
const SUFFIX = '.llm.md';

/** Walk up from cwd looking for a directory that satisfies `test`. */
function findUp(test, startDir = process.cwd()) {
  // Start from an absolute form of the chosen starting directory.
  let dir = resolve(startDir);
  // Climb toward the filesystem root until a match is found or we run out.
  for (;;) {
    // Ask the predicate whether this directory satisfies the search.
    const hit = test(dir);
    // Return immediately on the first satisfying value the predicate yields.
    if (hit) {
      return hit;
    }
    // Compute the parent directory for the next iteration.
    const parent = dirname(dir);
    // When the parent equals the current dir we have reached the root: give up.
    if (parent === dir) {
      return null;
    }
    // Move up one level and continue.
    dir = parent;
  }
}

/** Detect the package manager from the nearest lockfile, defaulting to npm. */
function detectPackageManager() {
  // Find the nearest ancestor directory that contains any known lockfile.
  const root =
    findUp(
      (dir) =>
        // Candidate lockfiles, in no particular priority for the search itself.
        ['yarn.lock', 'pnpm-lock.yaml', 'package-lock.json', 'bun.lockb']
          // Turn each lockfile name into an absolute path within this dir.
          .map((lock) => join(dir, lock))
          // This dir qualifies if at least one of those lockfiles exists.
          .some(existsSync)
          ? dir
          : null
      // If no lockfile is found anywhere, fall back to the current directory.
    ) ?? process.cwd();
  // Presence of a pnpm lockfile means pnpm.
  if (existsSync(join(root, 'pnpm-lock.yaml'))) {
    return { name: 'pnpm', root };
  }
  // A yarn lockfile means yarn.
  if (existsSync(join(root, 'yarn.lock'))) {
    return { name: 'yarn', root };
  }
  // A bun lockfile means bun.
  if (existsSync(join(root, 'bun.lockb'))) {
    return { name: 'bun', root };
  }
  // No recognized lockfile: default to npm.
  return { name: 'npm', root };
}

// Maps a package-manager name to its "add as devDependency" command string.
function installCommand(manager) {
  // Each manager spells the dev-dependency install differently.
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
  // Search upward for a node_modules tree that already contains the docs src/.
  return findUp((dir) => {
    // The path the package would occupy if installed under this directory.
    const candidate = join(
      dir,
      'node_modules',
      '@spectrum-web-components',
      'llm-docs',
      'src'
    );
    // Return the path when it exists, otherwise signal "keep searching".
    return existsSync(candidate) ? candidate : null;
  });
}

/** Look for the docs inside the spectrum-web-components monorepo itself. */
function findInMonorepo() {
  // Search upward for the monorepo's local aggregate docs directory.
  return findUp((dir) => {
    // Where the docs live inside the monorepo source tree.
    const candidate = join(dir, '1st-gen', 'projects', 'llm-docs', 'src');
    // Return the path when it exists, otherwise signal "keep searching".
    return existsSync(candidate) ? candidate : null;
  });
}

// Lists the documented component names found in a docs directory.
function listComponents(docsDir) {
  // Read the directory, then derive sorted component names from the filenames.
  return (
    readdirSync(docsDir)
      // Keep only the documentation files.
      .filter((file) => file.endsWith(SUFFIX))
      // Strip the `.llm.md` suffix to get the bare component name.
      .map((file) => file.slice(0, -SUFFIX.length))
      // Sort for stable, readable output.
      .sort()
  );
}

// Returns the docs directory, installing the package if it is not already present.
function resolveDocsDir() {
  // First preference: an already-installed copy in node_modules.
  const installed = findInstalled();
  if (installed) {
    return { docsDir: installed, source: 'installed package' };
  }

  // Second preference: the local copy when running inside the monorepo.
  const monorepo = findInMonorepo();
  if (monorepo) {
    return { docsDir: monorepo, source: 'spectrum-web-components monorepo' };
  }

  // Otherwise install it: pick the package manager and build its command.
  const { name, root } = detectPackageManager();
  const command = installCommand(name);
  // Announce the install on stderr so stdout stays parseable.
  console.error(`[llm-docs] not found; installing with ${name}: ${command}`);
  // Run the install in the project root, streaming its output to the terminal.
  execSync(command, { cwd: root, stdio: 'inherit' });

  // Re-resolve after installing.
  const afterInstall = findInstalled();
  // If it still cannot be found, the package is likely unpublished: fail clearly.
  if (!afterInstall) {
    throw new Error(
      `Installed ${PACKAGE} but could not locate its src/ directory. The ` +
        `package may be unpublished; see the skill's fallback guidance.`
    );
  }
  // Report the freshly installed location.
  return { docsDir: afterInstall, source: `freshly installed with ${name}` };
}

// Entry point: ensure docs exist, then report the directory and requested files.
function main() {
  // Component names requested on the command line, lower-cased for matching.
  const requested = process.argv.slice(2).map((arg) => arg.toLowerCase());
  // Ensure the docs are available and learn where they came from.
  const { docsDir, source } = resolveDocsDir();
  // The full list of documented components in that directory.
  const components = listComponents(docsDir);

  // Report provenance and coverage on stdout.
  console.log(`[llm-docs] using docs from: ${source}`);
  console.log(`[llm-docs] ${components.length} components documented`);

  // If specific components were requested, point at each one's file.
  if (requested.length > 0) {
    // Resolve and report each requested component in turn.
    for (const name of requested) {
      // The expected path to this component's docs file.
      const path = join(docsDir, `${name}${SUFFIX}`);
      // Emit a READ line the caller can act on when the file exists.
      if (existsSync(path)) {
        console.log(`READ ${name}: ${path}`);
        // Otherwise warn and show what is available instead.
      } else {
        console.error(
          `[llm-docs] no docs for "${name}". Available: ${components.join(', ')}`
        );
      }
    }
    // With no specific request, list everything that is documented.
  } else {
    console.log(`[llm-docs] available: ${components.join(', ')}`);
  }

  // Final, easy-to-grep line giving the docs directory path.
  console.log(`DOCS_DIR=${docsDir}`);
}

// Run the resolver.
main();
