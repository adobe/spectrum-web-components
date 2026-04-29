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
 * Copies per-component `context.md` files from each component's source
 * directory into the Storybook `public/` tree so they are served at a
 * stable URL alongside the rest of the static assets.
 *
 * Source: `2nd-gen/packages/swc/components/{slug}/context.md`
 * Target: `2nd-gen/packages/swc/public/components/{slug}/context.md`
 * Served at: `/components/{slug}/context.md`
 *
 * Why a copy and not a `staticDirs` mapping of the components directory:
 * mapping the entire components dir exposes `.ts` source files, which
 * browsers receive with MIME type `video/mp2t` and refuse to execute as
 * modules. Copying only `context.md` keeps the public surface tight.
 *
 * Source-of-truth: the file in the component directory. The copy in
 * `public/` is generated and should not be edited by hand. It is also
 * git-ignored.
 *
 * `context.md` is the LLM-consumable component documentation proposed in
 * https://wiki.corp.adobe.com/spaces/AdobeDesign/pages/3854270520.
 */

import { existsSync, mkdirSync } from 'node:fs';
import { copyFile, readdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_DIR = resolve(__dirname, '../../components');
const PUBLIC_OUT_DIR = resolve(__dirname, '../../public/components');

async function main() {
  // Wipe any previous output so deletions in source propagate.
  if (existsSync(PUBLIC_OUT_DIR)) {
    await rm(PUBLIC_OUT_DIR, { recursive: true, force: true });
  }

  const entries = await readdir(COMPONENTS_DIR, { withFileTypes: true });
  const componentDirs = entries.filter((entry) => entry.isDirectory());

  let copied = 0;
  let skipped = 0;
  for (const dir of componentDirs) {
    const sourcePath = join(COMPONENTS_DIR, dir.name, 'context.md');
    if (!existsSync(sourcePath)) {
      skipped += 1;
      continue;
    }
    const targetDir = join(PUBLIC_OUT_DIR, dir.name);
    mkdirSync(targetDir, { recursive: true });
    const targetPath = join(targetDir, 'context.md');
    await copyFile(sourcePath, targetPath);
    copied += 1;
  }

  console.log(
    `[copy-context-md] copied ${copied} context.md file${copied === 1 ? '' : 's'}, ${skipped} component${skipped === 1 ? '' : 's'} without context.md`
  );
}

main().catch((error) => {
  console.error('[copy-context-md] failed:', error);
  process.exit(1);
});
