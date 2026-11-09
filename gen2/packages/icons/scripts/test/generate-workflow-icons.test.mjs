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
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

function createFixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'workflow-icons-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const packageRoot = path.join(root, 'icons');
  const sourceDir = path.join(packageRoot, 'icon-source');
  const outDir = path.join(packageRoot, 'src');
  const scriptDir = path.join(packageRoot, 'scripts');
  for (const dir of [sourceDir, outDir, scriptDir]) {
    mkdirSync(dir, { recursive: true });
  }
  symlinkSync(
    fileURLToPath(new URL('../../core/', import.meta.url)),
    path.join(root, 'core'),
    'dir'
  );
  symlinkSync(
    fileURLToPath(new URL('../../../../node_modules/', import.meta.url)),
    path.join(root, 'node_modules'),
    'dir'
  );
  const script = path.join(scriptDir, 'generate-workflow-icons.mjs');
  copyFileSync(
    new URL('./generate-workflow-icons.mjs', import.meta.url),
    script
  );

  const setVersion = (version) =>
    writeFileSync(
      path.join(packageRoot, 'package.json'),
      JSON.stringify({ version })
    );
  setVersion('2.0.0-beta.6');

  return {
    outDir,
    setVersion,
    addSource(name) {
      writeFileSync(
        path.join(sourceDir, `S2_Icon_${name}_20_N.svg`),
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 0h20v20H0z"/></svg>'
      );
    },
    run() {
      return spawnSync(process.execPath, [script], { encoding: 'utf8' });
    },
    readElement(tag) {
      return readFileSync(path.join(outDir, `${tag}.ts`), 'utf8');
    },
  };
}

test('preserves each existing icon introduction version when regenerating its artwork', (t) => {
  const fixture = createFixture(t);
  for (const [name, tag, since] of [
    ['Star', 'swc-icon-star', '2.0.0-beta.2'],
    ['AddCircle', 'swc-icon-add-circle', '2.0.0-beta.4'],
  ]) {
    fixture.addSource(name);
    writeFileSync(
      path.join(fixture.outDir, `${tag}.ts`),
      `/**\n * @since ${since}\n */\n// Old artwork\n`
    );
  }

  const result = fixture.run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(
    fixture.readElement('swc-icon-star'),
    /@since 2\.0\.0-beta\.2\b/
  );
  assert.match(
    fixture.readElement('swc-icon-add-circle'),
    /@since 2\.0\.0-beta\.4\b/
  );
  assert.match(fixture.readElement('swc-icon-star'), /export class IconStar/);
  assert.doesNotMatch(fixture.readElement('swc-icon-star'), /Old artwork/);
});

test('assigns the current package version to a new icon and preserves it on subsequent releases', (t) => {
  const fixture = createFixture(t);
  fixture.addSource('Star');
  let result = fixture.run();
  assert.equal(result.status, 0, result.stderr);
  const original = fixture.readElement('swc-icon-star');
  assert.match(original, /@since 2\.0\.0-beta\.6\b/);

  fixture.setVersion('2.0.0-beta.7');
  fixture.addSource('AddCircle');
  result = fixture.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fixture.readElement('swc-icon-star'), original);
  assert.match(
    fixture.readElement('swc-icon-add-circle'),
    /@since 2\.0\.0-beta\.7\b/
  );

  result = fixture.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fixture.readElement('swc-icon-star'), original);
  assert.match(
    fixture.readElement('swc-icon-add-circle'),
    /@since 2\.0\.0-beta\.7\b/
  );
});

test('continues removing generated modules for icons no longer in the source set', (t) => {
  const fixture = createFixture(t);
  fixture.addSource('Star');
  const stale = path.join(fixture.outDir, 'swc-icon-removed.ts');
  writeFileSync(stale, '/**\n * @since 2.0.0-beta.2\n */\n');
  writeFileSync(path.join(fixture.outDir, 'Removed.ts'), '// Old artwork\n');

  const result = fixture.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(stale), false);
  assert.equal(existsSync(path.join(fixture.outDir, 'Removed.ts')), false);
  assert.doesNotMatch(
    readFileSync(path.join(fixture.outDir, 'manifest.ts'), 'utf8'),
    /Removed/
  );
});

test('rejects an existing element without @since before deleting generated files', (t) => {
  const fixture = createFixture(t);
  fixture.addSource('Star');
  const existing = '// Missing introduction version\n';
  writeFileSync(path.join(fixture.outDir, 'swc-icon-star.ts'), existing);

  const result = fixture.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing @since.*swc-icon-star\.ts/);
  assert.equal(fixture.readElement('swc-icon-star'), existing);
});

test('continues refusing to delete existing output when source SVGs are absent', (t) => {
  const fixture = createFixture(t);
  const existing = '/**\n * @since 2.0.0-beta.2\n */\n';
  writeFileSync(path.join(fixture.outDir, 'swc-icon-star.ts'), existing);

  const result = fixture.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /No source SVGs found/);
  assert.equal(fixture.readElement('swc-icon-star'), existing);
});
