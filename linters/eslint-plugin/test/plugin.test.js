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

import { Linter } from 'eslint';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { test } from 'node:test';

import { resolveTemplate } from '@spectrum-web-components/eslint-plugin/notice-utils';

import { swcPlugin } from '../index.js';

const ruleNames = [
  'document-active-element',
  'no-duplicate-cssprop',
  'notice-after-shebang',
  'prevent-argument-names',
];

test('preserves the registered rule names', () => {
  assert.deepEqual(Object.keys(swcPlugin.rules).sort(), ruleNames);
});

test('preserves active-element diagnostics', () => {
  const linter = new Linter();
  const config = {
    plugins: { swc: swcPlugin },
    rules: { 'swc/document-active-element': 'error' },
  };
  const messages = linter.verify('document.activeElement;', config);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].ruleId, 'swc/document-active-element');
  assert.equal(messages[0].severity, 2);
  assert.equal(linter.verify('element.activeElement;', config).length, 0);
});

test('preserves configurable argument-name diagnostics', () => {
  const linter = new Linter();
  const config = {
    plugins: { swc: swcPlugin },
    rules: {
      'swc/prevent-argument-names': ['error', { disallowed: ['evt'] }],
    },
  };
  const messages = linter.verify('const handler = (evt) => evt;', config);
  assert.equal(messages.length, 1);
  assert.equal(
    messages[0].message,
    '"evt" shouldn\'t be used as an argument name'
  );
  assert.equal(
    linter.verify('const handler = (event) => event;', config).length,
    0
  );
});

test('preserves notice fixes directly after a shebang', () => {
  const result = new Linter().verifyAndFix(
    '#!/usr/bin/env node\nexport {};\n',
    {
      plugins: { swc: swcPlugin },
      rules: {
        'swc/notice-after-shebang': [
          'error',
          { template: '/* Copyright Adobe. */' },
        ],
      },
    }
  );
  assert.equal(result.fixed, true);
  assert.deepEqual(result.messages, []);
  assert.equal(
    result.output,
    '#!/usr/bin/env node\n\n/* Copyright Adobe. */\n\nexport {};\n'
  );
});

test('preserves the notice utility package export', () => {
  assert.equal(
    resolveTemplate('', { template: 'inline\r\ntemplate' }),
    'inline\ntemplate'
  );
});

test('resolves notice templates from the repository when run elsewhere', () => {
  const moduleUrl = import.meta
    .resolve('@spectrum-web-components/eslint-plugin/notice-utils');
  const output = execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import { resolveTemplate } from ${JSON.stringify(moduleUrl)};
process.stdout.write(resolveTemplate('', { templateFile: 'linters/HEADER.js' }));`,
    ],
    { cwd: tmpdir(), encoding: 'utf8' }
  );
  assert.equal(
    output,
    readFileSync(new URL('../../HEADER.js', import.meta.url), 'utf8').replace(
      /\r\n/g,
      '\n'
    )
  );
});
