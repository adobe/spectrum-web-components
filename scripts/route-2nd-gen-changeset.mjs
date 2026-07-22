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
 * `@changesets/cli` always writes new changesets into `.changeset/` at the repo root;
 * it has no option to target a different folder. This script runs `yarn changeset` and
 * then moves whatever file it just created into `.changeset-2nd-gen/`, so 2nd-gen changes
 * land in the folder that `publish-2nd-gen.yml` actually reads.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const changesetDir = path.join(root, '.changeset');
const gen2ChangesetDir = path.join(root, '.changeset-2nd-gen');

function listChangesetFiles(dir) {
  return new Set(
    fs
      .readdirSync(dir)
      .filter((name) => name.endsWith('.md') && name !== 'README.md')
  );
}

const before = listChangesetFiles(changesetDir);

execSync('yarn changeset', { stdio: 'inherit', cwd: root });

const after = listChangesetFiles(changesetDir);
const created = [...after].filter((name) => !before.has(name));

if (created.length === 0) {
  console.log(
    '\nNo new changeset file was created (command was likely aborted).'
  );
  process.exit(0);
}

for (const name of created) {
  fs.renameSync(
    path.join(changesetDir, name),
    path.join(gen2ChangesetDir, name)
  );
  console.log(`\nMoved .changeset/${name} -> .changeset-2nd-gen/${name}`);
}
