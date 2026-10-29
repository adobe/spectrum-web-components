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

const manifestCategories = [
  { tags: ['csspart', 'part'], kind: 'CSS part' },
  { tags: ['slot'], kind: 'Slot' },
  { tags: ['cssstate', 'cssState'], kind: 'CSS state' },
];

for (const { tags, kind } of manifestCategories) {
  for (const tag of tags) {
    for (const separateBlocks of [false, true]) {
      test(`reports duplicate @${tag} tags ${separateBlocks ? 'across class comments' : 'within a comment'}`, () => {
        const code = separateBlocks
          ? `/** @${tags[0]} first */\n/** @${tag} first */\nexport class Example {}`
          : `/**\n * @${tags[0]} first\n * @${tag} first\n */`;
        const messages = new Linter().verify(code, {
          plugins: { swc: swcPlugin },
          rules: { [ruleName]: 'warn' },
        });

        assert.equal(messages.length, 1);
        assert.equal(messages[0].ruleId, ruleName);
        assert.equal(
          messages[0].message,
          `${kind} "first" is documented more than once.`
        );
        assert.equal(messages[0].line, separateBlocks ? 2 : 3);
        assert.equal(
          messages[0].column,
          separateBlocks ? tag.length + 7 : tag.length + 6
        );
        assert.equal(messages[0].endColumn - messages[0].column, 5);
        assert.equal(messages[0].fix, undefined);
      });
    }
  }
}

const manifestCases = [
  {
    name: 'ignores block comments with an extra opening asterisk',
    code: '/***\n * @slot content\n * @slot content\n */',
    messages: [],
  },
  {
    name: 'allows distinct slots with nested record types',
    code: '/**\n * @slot {{id: string}} header\n * @slot {{id: string}} footer\n */',
    messages: [],
  },
  {
    name: 'reports a duplicate slot with a nested record type',
    code: '/**\n * @slot content\n * @slot {{id: string}} content\n */',
    messages: ['Slot "content" is documented more than once.'],
    location: { line: 3, column: 25, endLine: 3, endColumn: 32 },
  },
  {
    name: 'reports a duplicate property with a nested record type',
    code: '/**\n * @cssprop --first\n * @cssproperty {{color: string}} --first\n */',
    messages: ['CSS custom property "--first" is documented more than once.'],
    location: { line: 3, column: 35, endLine: 3, endColumn: 42 },
  },
  {
    name: 'locates a duplicate name after a multiline type',
    code: '/**\n * @slot content\n * @slot {\n *   id: string\n * } content\n */',
    messages: ['Slot "content" is documented more than once.'],
    location: { line: 5, column: 6, endLine: 5, endColumn: 13 },
  },
  {
    name: 'locates optional names independently of their default values',
    code: '/**\n * @slot content\n * @slot {Element} [content="content"]\n */',
    messages: ['Slot "content" is documented more than once.'],
    location: { line: 3, column: 21, endLine: 3, endColumn: 28 },
  },
  {
    name: 'locates the default slot tag before a multiline type',
    code: '/**\n * @slot - Content.\n * @slot {\n *   id: string\n * } - Other content.\n */',
    messages: ['Default slot is documented more than once.'],
    location: { line: 3, column: 4, endLine: 3, endColumn: 9 },
  },
  {
    name: 'ignores duplicate tags inside typedef blocks',
    code: '/**\n * @typedef {object} Options\n * @slot content\n * @slot content\n * @cssprop --first\n * @cssprop --first\n */\nclass Example {}',
    messages: [],
  },
  {
    name: 'ignores typedef blocks when the typedef follows other tags',
    code: '/**\n * @slot content\n * @slot content\n * @typedef {object} Options\n */\n/** @slot content */\nclass Example {}',
    messages: [],
  },
  {
    name: 'keeps manifest categories independent',
    code: '/**\n * @cssprop --shared\n * @csspart --shared\n * @slot --shared\n * @cssstate --shared\n */',
    messages: [],
  },
  {
    name: 'allows distinct names and case-sensitive names in each category',
    code: '/**\n * @part first\n * @part First\n * @slot first\n * @slot second\n * @cssstate first\n * @cssstate First\n */',
    messages: [],
  },
  {
    name: 'keeps classes and member comments independent for other categories',
    code: '/** @slot first */\nclass First {\n/** @slot first */\nmethod() {}\n}\n/** @slot first */\nclass Second {}',
    messages: [],
  },
  {
    name: 'ignores prose, other tags, and unnamed parts and states',
    code: '/**\n * Mention @slot first in prose.\n * @slot first\n * @part\n * @part - Description.\n * @cssstate\n * @cssstate - Description.\n * @cssstates first\n */',
    messages: [],
  },
  {
    name: 'recognizes type annotations and optional defaults for other categories',
    code: '/**\n * @part {Element} first\n * @csspart {Element} [first=button]\n * @slot {Element} [content]\n * @slot content\n */',
    messages: [
      'CSS part "first" is documented more than once.',
      'Slot "content" is documented more than once.',
    ],
  },
  {
    name: 'reports every duplicate after the first in multiple categories',
    code: '/**\n * @part first\n * @csspart first\n * @part first\n * @cssstate active\n * @cssState active\n */',
    messages: [
      'CSS part "first" is documented more than once.',
      'CSS part "first" is documented more than once.',
      'CSS state "active" is documented more than once.',
    ],
  },
  {
    name: 'reports duplicate default slots with and without a description separator',
    code: '/**\n * @slot\n * @slot - Content.\n * @slot - Other content.\n */',
    messages: [
      'Default slot is documented more than once.',
      'Default slot is documented more than once.',
    ],
    location: { line: 3, column: 4, endLine: 3, endColumn: 9 },
  },
  {
    name: 'reports default slots across class comments',
    code: '/** @slot - Content. */\n/** @slot */\nclass Example {}',
    messages: ['Default slot is documented more than once.'],
    location: { line: 2, column: 5, endLine: 2, endColumn: 10 },
  },
  {
    name: 'keeps default slots separate from named slots and other classes',
    code: '/**\n * @slot - Content.\n * @slot content\n */\nclass First {}\n/** @slot - Content. */\nclass Second {}',
    messages: [],
  },
  {
    name: 'does not combine typedef slots with class slots',
    code: '/**\n * @typedef {object} Options\n * @slot content\n */\n/** @slot content */\nclass Example {}',
    messages: [],
  },
];

for (const { name, code, messages: expected, location } of manifestCases) {
  test(name, () => {
    const messages = new Linter().verify(code, {
      plugins: { swc: swcPlugin },
      rules: { [ruleName]: 'warn' },
    });

    assert.deepEqual(
      messages.map(({ message }) => message),
      expected
    );
    assert.ok(
      messages.every(
        ({ ruleId, severity, fix }) =>
          ruleId === ruleName && severity === 1 && !fix
      )
    );
    if (location) {
      const { line, column, endLine, endColumn } = messages[0];
      assert.deepEqual({ line, column, endLine, endColumn }, location);
    }
  });
}

test('enables IDE warnings for TypeScript components in the repository config', async () => {
  const eslint = new ESLint({
    cwd: fileURLToPath(new URL('../../../', import.meta.url)),
  });
  const [result] = await eslint.lintText(
    '/** @cssprop --first\n * @slot content */\n/** @cssprop --first\n * @slot content */\nexport class Example {}',
    { filePath: 'gen2/packages/swc/components/tabs/Tab.ts' }
  );
  const messages = result.messages.filter(
    (message) => message.ruleId === ruleName
  );

  assert.equal(messages.length, 2);
  assert.equal(messages[0].severity, 1);
  assert.equal(messages[0].line, 3);
  assert.equal(messages[1].severity, 1);
  assert.equal(messages[1].line, 4);
});
