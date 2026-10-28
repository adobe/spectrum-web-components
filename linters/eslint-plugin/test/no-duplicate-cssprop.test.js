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

import tsparser from '@typescript-eslint/parser';
import { ESLint, Linter } from 'eslint';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { swcPlugin } from '../index.js';

const ruleName = 'swc/no-duplicate-cssprop';
const cases = [
  {
    name: 'allows distinct custom properties',
    code: '/**\n * @cssprop --first - First.\n * @cssprop --second - Second.\n */',
    duplicates: [],
  },
  {
    name: 'allows the same property in separate JSDoc blocks',
    code: '/** @cssprop --first - First. */\n/** @cssprop --first - Other component. */',
    duplicates: [],
  },
  {
    name: 'reports duplicates across JSDoc blocks on one class',
    code: '/** @cssprop --first - Original. */\n/** @cssprop --first - Duplicate. */\nclass Example {}',
    duplicates: ['--first'],
    location: { line: 2, column: 14, endLine: 2, endColumn: 21 },
  },
  {
    name: 'reports duplicates across blocks on an exported class',
    code: '/** @cssprop --first */\n/** @cssproperty --first */\nexport class Example {}',
    duplicates: ['--first'],
  },
  {
    name: 'reports duplicates across blocks on a default-exported class',
    code: '/** @cssprop --first */\n/** @cssprop --first */\nexport default class Example {}',
    duplicates: ['--first'],
  },
  {
    name: 'reports each duplicate across three blocks on one class',
    code: '/** @cssprop --first */\n/** @cssprop --first */\n/** @cssprop --first */\nclass Example {}',
    duplicates: ['--first', '--first'],
  },
  {
    name: 'reports duplicates before class decorators',
    code: '/** @cssprop --first */\n/** @cssprop --first */\n@customElement("swc-example")\nexport class Example {}',
    duplicates: ['--first'],
  },
  {
    name: 'reports duplicates before an export followed by a decorator',
    code: '/** @cssprop --first */\n/** @cssprop --first */\nexport @customElement("swc-example") class Example {}',
    duplicates: ['--first'],
  },
  {
    name: 'allows the same property on separate classes',
    code: '/** @cssprop --first */\nexport class First {}\n/** @cssprop --first */\nexport class Second {}',
    duplicates: [],
  },
  {
    name: 'does not combine class and member documentation',
    code: '/** @cssprop --first */\nclass Example {\n/** @cssprop --first */\nmethod() {}\n}',
    duplicates: [],
  },
  {
    name: 'does not combine comments separated by another declaration',
    code: '/** @cssprop --first */\nconst unrelated = 1;\n/** @cssprop --first */\nclass Example {}',
    duplicates: [],
  },
  {
    name: 'does not combine a previous class trailing comment with the next class',
    code: 'class First {} /** @cssprop --first */\n/** @cssprop --first */\nclass Second {}',
    duplicates: [],
  },
  {
    name: 'does not combine typedef documentation with class documentation',
    code: '/**\n * @typedef {object} Options\n * @cssprop --first\n */\n/** @cssprop --first */\nexport class Example {}',
    duplicates: [],
  },
  {
    name: 'ignores ordinary block comments and line comments',
    code: '/*\n * @cssprop --first\n * @cssprop --first\n */\n// @cssprop --first\n// @cssprop --first',
    duplicates: [],
  },
  {
    name: 'ignores prose mentions and other JSDoc tags',
    code: '/**\n * Mention @cssprop --first in prose.\n * @csspart --first\n * @cssprop --first\n * @slot --first\n */',
    duplicates: [],
  },
  {
    name: 'treats CSS custom property names as case-sensitive',
    code: '/**\n * @cssprop --first\n * @cssprop --First\n */',
    duplicates: [],
  },
  {
    name: 'ignores unnamed CSS property tags',
    code: '/**\n * @cssprop - Description.\n * @cssprop - Description.\n */',
    duplicates: [],
  },
  {
    name: 'reports a duplicate with different descriptions',
    code: '/**\n * @cssprop --first - Original.\n * @cssprop --first - Different wording.\n */',
    duplicates: ['--first'],
    location: { line: 3, column: 13, endLine: 3, endColumn: 20 },
  },
  {
    name: 'reports every occurrence after the first',
    code: '/**\n * @cssprop --first\n * @cssprop --first\n * @cssprop --first\n */',
    duplicates: ['--first', '--first'],
  },
  {
    name: 'reports a repeated block after an example',
    code: '/**\n * @cssprop --first\n * @cssprop --second\n * @example\n * <swc-example></swc-example>\n * @cssprop --first\n * @cssprop --second\n */',
    duplicates: ['--first', '--second'],
  },
  {
    name: 'recognizes the cssproperty alias',
    code: '/**\n * @cssproperty --first\n * @cssprop --first\n * @cssproperty --first\n */',
    duplicates: ['--first', '--first'],
  },
  {
    name: 'recognizes type annotations and optional defaults',
    code: '/**\n * @cssprop {Color} --first\n * @cssproperty {Color} [--first=red] - Override.\n */',
    duplicates: ['--first'],
  },
  {
    name: 'recognizes an inline first tag and Windows line endings',
    code: '/** @cssprop --first\r\n * @cssprop --first\r\n */',
    duplicates: ['--first'],
    location: { line: 2, column: 13, endLine: 2, endColumn: 20 },
  },
];

for (const { name, code, duplicates, location } of cases) {
  test(name, () => {
    assert.ok(
      swcPlugin.rules['no-duplicate-cssprop'],
      'The duplicate @cssprop rule must be registered'
    );
    const messages = new Linter().verify(code, {
      languageOptions: { parser: tsparser },
      plugins: { swc: swcPlugin },
      rules: { [ruleName]: 'warn' },
    });

    assert.deepEqual(
      messages.map(({ ruleId, severity, messageId, message }) => ({
        ruleId,
        severity,
        messageId,
        message,
      })),
      duplicates.map((name) => ({
        ruleId: ruleName,
        severity: 1,
        messageId: 'duplicate',
        message: `CSS custom property "${name}" is documented more than once.`,
      }))
    );
    if (location) {
      const { line, column, endLine, endColumn } = messages[0];
      assert.deepEqual({ line, column, endLine, endColumn }, location);
    }
    assert.ok(messages.every((message) => !message.fix));
  });
}

test('enables IDE warnings for TypeScript components in the repository config', async () => {
  const eslint = new ESLint({
    cwd: fileURLToPath(new URL('../../../', import.meta.url)),
  });
  const [result] = await eslint.lintText(
    '/** @cssprop --first */\n/** @cssprop --first */\nexport class Example {}',
    { filePath: 'gen2/packages/swc/components/tabs/Tab.ts' }
  );
  const messages = result.messages.filter(
    (message) => message.ruleId === ruleName
  );

  assert.equal(messages.length, 1);
  assert.equal(messages[0].severity, 1);
  assert.equal(messages[0].line, 2);
});
