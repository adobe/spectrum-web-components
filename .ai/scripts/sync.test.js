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
 * Tests for the README catalog markers in sync.js. Runs as part of `yarn lint:ai`.
 *
 * Usage:
 *   node --test .ai/scripts/sync.test.js
 */

import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, describe, test } from 'node:test';

import { findCatalogBlock, syncAi } from './sync.js';

const START = '<!-- ai:catalog:start -->';
const END = '<!-- ai:catalog:end -->';

const broken = {
  'start marker is missing': `# Title\n\n${END}\n`,
  'end marker is missing': `# Title\n\n${START}\n`,
  'both markers are missing': '# Title\n',
  'start marker is duplicated': `${START}\n${START}\n${END}\n`,
  'end marker is duplicated': `${START}\n${END}\n${END}\n`,
  'markers are out of order': `${END}\n${START}\n`,
};

describe('findCatalogBlock', () => {
  test('finds one well-formed block', () => {
    const text = `before\n${START}\nold\n${END}\nafter\n`;
    const block = findCatalogBlock(text);
    assert.equal(block.error, undefined);
    assert.equal(text.slice(block.start, block.end), `${START}\nold\n${END}`);
  });

  for (const [name, text] of Object.entries(broken)) {
    test(`reports an error when the ${name}`, () => {
      assert.match(findCatalogBlock(text).error ?? '', /ai:catalog/);
    });
  }
});

describe('syncAi catalog check', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'ai-sync-test-'));
  after(() => rmSync(dir, { recursive: true, force: true }));

  const catalogErrors = async (readme) => {
    const { errors } = await syncAi({ write: false, readme });
    return errors.filter((error) => error.includes(path.basename(readme)));
  };

  for (const [name, text] of Object.entries(broken)) {
    test(`fails instead of skipping the catalog when the ${name}`, async () => {
      const readme = path.join(dir, `${name.replaceAll(' ', '-')}.md`);
      writeFileSync(readme, text);
      assert.equal((await catalogErrors(readme)).length, 1);
    });
  }

  test('fails when the README is missing', async () => {
    const errors = await catalogErrors(path.join(dir, 'missing.md'));
    assert.equal(errors.length, 1);
    assert.match(errors[0], /missing/);
  });
});
