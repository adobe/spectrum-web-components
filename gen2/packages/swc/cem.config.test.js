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
 * Tests for the CEM plugins in cem.config.js. They run the analyzer in-process,
 * without writing files, and check the manifest that Storybook reads.
 *
 * Usage:
 *   yarn workspace @adobe/spectrum-wc test:cem
 */

import { cli } from '@custom-elements-manifest/analyzer/cli.js';
import assert from 'node:assert/strict';
import path from 'node:path';
import process from 'node:process';
import { before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const packageDir = path.dirname(fileURLToPath(import.meta.url));

let manifest;

const declarations = () =>
  manifest.modules.flatMap((module) => module.declarations ?? []);

const element = (tagName) => {
  const declaration = declarations().find((d) => d.tagName === tagName);
  assert.ok(declaration, `${tagName} is in the manifest`);
  return declaration;
};

const field = (declaration, name) =>
  declaration.members?.find(
    (member) => member.kind === 'field' && member.name === name
  );

const attribute = (declaration, name) =>
  declaration.attributes?.find((entry) => entry.name === name);

/** Every `parsedType.text` in a manifest node, at any depth. */
const parsedTypes = (node, texts = []) => {
  if (node && typeof node === 'object') {
    if (node.parsedType) {
      texts.push(node.parsedType.text);
    }
    for (const value of Object.values(node)) {
      parsedTypes(value, texts);
    }
  }
  return texts;
};

describe('cem.config.js', () => {
  before(async () => {
    // type-parser looks for tsconfig.cem.json in the working directory.
    process.chdir(packageDir);
    manifest = await cli({
      argv: ['analyze', '--config', 'cem.config.js', '--quiet'],
      cwd: packageDir,
      noWrite: true,
    });
  });

  test('has no compiler symbol ids, which change between programs', () => {
    assert.doesNotMatch(JSON.stringify(manifest), /__@\w+@\d+/);
  });

  test('has no structural parsedType at any depth', () => {
    const structural = parsedTypes(manifest).filter((text) =>
      text.includes('{')
    );
    assert.deepEqual(structural, []);
  });

  test('expands union aliases on members that a mixin provides', () => {
    const meter = element('swc-meter');
    assert.equal(
      field(meter, 'labelPosition')?.parsedType?.text,
      "'top' | 'side'"
    );
    assert.equal(
      attribute(meter, 'label-position')?.parsedType?.text,
      "'top' | 'side'"
    );
  });

  test('records the defaults of accessor-backed properties', () => {
    const tabs = element('swc-tabs');
    assert.equal(field(tabs, 'density')?.default, 'regular');
    assert.equal(field(tabs, 'keyboardActivation')?.default, 'automatic');
    assert.equal(
      field(element('swc-accordion-item'), 'open')?.default,
      'false'
    );
  });

  test('gives each attribute the parsedType of the field it reflects', () => {
    assert.equal(
      attribute(element('swc-action-button'), 'size')?.parsedType?.text,
      "'xs' | 's' | 'm' | 'l' | 'xl'"
    );
    assert.equal(
      attribute(element('swc-meter'), 'size')?.parsedType?.text,
      "'s' | 'm' | 'l' | 'xl'"
    );

    for (const declaration of declarations()) {
      for (const entry of declaration.attributes ?? []) {
        const source = field(declaration, entry.fieldName);
        if (!source || source.type?.text !== entry.type?.text) {
          continue;
        }
        assert.deepEqual(
          entry.parsedType,
          source.parsedType,
          `${declaration.name} ${entry.name}`
        );
      }
    }
  });
});
