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
 * Verifies the tree-shaking acceptance criterion: an app that imports a few workflow
 * icons ships only those icons, not the whole set. Bundles a small sample of element
 * subpaths from the built `dist/` with esbuild (tree-shaking on) and asserts the output
 * registers exactly the sampled tags and none of the others.
 *
 * Run with `yarn workspace @adobe/spectrum-wc-icons verify:tree-shaking` after a build.
 */
import { build } from 'esbuild';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, '..', 'dist');

// The sample an app might import, and a few icons it must NOT drag in.
const SAMPLE = ['swc-icon-star', 'swc-icon-heart', 'swc-icon-folder'];
const MUST_BE_ABSENT = [
  'swc-icon-delete',
  'swc-icon-settings',
  'swc-icon-3d-asset',
];

const tmp = mkdtempSync(path.join(tmpdir(), 'swc-icons-treeshake-'));
const entry = path.join(tmp, 'entry.js');
writeFileSync(
  entry,
  SAMPLE.map((tag) => `import '${path.join(distDir, `${tag}.js`)}';`).join('\n')
);

let code = '';
try {
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    treeShaking: true,
    format: 'esm',
    write: false,
    logLevel: 'silent',
    // The published runtime deps are external, matching how a consumer bundles.
    external: [
      'lit',
      'lit/*',
      '@lit/*',
      '@adobe/spectrum-wc-core',
      '@adobe/spectrum-wc-core/*',
    ],
  });
  code = result.outputFiles[0].text;
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

// Each element module registers its tag via `defineElement('swc-icon-…', …)`; the tag
// is the only quoted `swc-icon-*` string in the emitted JS.
const registered = [
  ...new Set(
    [...code.matchAll(/['"](swc-icon-[a-z0-9-]+)['"]/g)].map((m) => m[1])
  ),
].sort();

const errors = [];
for (const tag of SAMPLE) {
  if (!registered.includes(tag)) {
    errors.push(`sampled icon <${tag}> is missing from the bundle`);
  }
}
for (const tag of MUST_BE_ABSENT) {
  if (registered.includes(tag)) {
    errors.push(`unrelated icon <${tag}> leaked into the bundle`);
  }
}
if (registered.length !== SAMPLE.length) {
  errors.push(
    `expected exactly ${SAMPLE.length} icons, bundle registers ${registered.length}: ${registered.join(', ')}`
  );
}

if (errors.length > 0) {
  console.error('Tree-shaking verification FAILED:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(
  `Tree-shaking verified: importing ${SAMPLE.length} icons ships exactly those ${registered.length} (${registered.join(', ')}), not the full set.`
);
