/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * Copies 1st-gen component content.md files to a site output dir as <name>.md.
 *
 * Usage:
 *   node copy-component-markdown.js --content-dir=<path> --out-dir=<path>
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const argv = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v ?? true];
    })
);
const contentDir = path.resolve(
  argv['content-dir'] ??
    path.join(
      __dirname,
      '../../../../1st-gen/projects/documentation/content/components'
    )
);
const outDir = path.resolve(
  argv['out-dir'] ??
    path.join(path.dirname(path.dirname(contentDir)), '_site/components')
);

function main() {
  if (!fs.existsSync(contentDir)) {
    return;
  }
  fs.mkdirSync(outDir, { recursive: true });
  const dirs = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());
  for (const { name } of dirs) {
    const src = path.join(contentDir, name, 'content.md');
    if (!fs.existsSync(src)) {
      continue;
    }
    fs.copyFileSync(src, path.join(outDir, `${name}.md`));
  }
}

main();
