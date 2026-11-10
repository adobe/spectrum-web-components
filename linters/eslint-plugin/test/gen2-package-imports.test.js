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

import tsParser from '@typescript-eslint/parser';
import { Linter } from 'eslint';
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { swcPlugin } from '../index.js';

const ruleId = 'swc/gen2-package-imports';
const coreExports = [
  'components/badge.js',
  'controllers.js',
  'controllers/hover-controller.js',
  'controllers/language-resolution.js',
  'directives/pending-spinner.js',
  'element.js',
  'mixins.js',
  'utils.js',
];

const lint = (code, { typescript = false, options = { coreExports } } = {}) =>
  new Linter().verify(code, {
    plugins: { swc: swcPlugin },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ...(typescript ? { parser: tsParser } : {}),
    },
    rules: { [ruleId]: ['error', options] },
  });

const messageIds = (code, settings) =>
  lint(code, settings).map(({ ruleId: id, messageId, message }) => {
    assert.equal(id, ruleId, message);
    return messageId;
  });

test('allows published entry points', () => {
  const valid = [
    '@adobe/spectrum-wc/badge.js',
    '@adobe/spectrum-wc/components/badge/swc-badge.js',
    '@adobe/spectrum-wc/components/badge/Badge.js',
    '@adobe/spectrum-wc/patterns/ai-toolkit/response-status.js',
    '@adobe/spectrum-wc/patterns/ai-toolkit/response-status/swc-response-status.js',
    '@adobe/spectrum-wc/swc.css',
    '@adobe/spectrum-wc/customElements',
    '@adobe/spectrum-wc-core/mixins.js',
    '@adobe/spectrum-wc-core/components/badge.js',
    '@adobe/spectrum-wc-core/controllers/language-resolution.js',
    '@adobe/spectrum-wc-core/directives/pending-spinner.js',
    '@adobe/spectrum-wc-icons',
    '@adobe/spectrum-wc-icons/swc-icon-star.js',
    '@adobe/spectrum-wc-icons/Star.js',
    '@adobe/spectrum-wc-icons/customElements',
    'lit/decorators.js',
    '@adobe/swc-tokens/src/tokens.js',
  ];
  for (const specifier of valid) {
    assert.deepEqual(messageIds(`import '${specifier}';`), [], specifier);
  }
});

test('reports each invalid specifier once', () => {
  const invalid = {
    '@adobe/spectrum-wc': 'noRoot',
    '@adobe/spectrum-wc-core': 'noRoot',
    '@adobe/spectrum-wc/badge': 'extension',
    '@adobe/spectrum-wc/patterns/ai-toolkit/response-status': 'extension',
    '@adobe/spectrum-wc/components/badge/index.js': 'index',
    '@adobe/spectrum-wc/badge/index.js': 'index',
    '@adobe/spectrum-wc/components/index.js': 'index',
    '@adobe/spectrum-wc/components/badge.js': 'shortBarrel',
    '@adobe/spectrum-wc/patterns/ai-toolkit.js': 'patternEntry',
    '@adobe/spectrum-wc/badge/swc-badge.js': 'componentsPrefix',
    '@adobe/spectrum-wc/Components/badge/swc-badge.js': 'componentsPrefix',
    '@adobe/spectrum-wc/stylesheets/tokens.css': 'nestedCss',
    '@adobe/spectrum-wc/components/badge/badge.css': 'nestedCss',
    '@adobe/spectrum-wc-icons/index.js': 'iconsIndex',
    '@adobe/spectrum-wc-icons/swc-icon-star': 'iconsFlat',
    '@adobe/spectrum-wc-icons/stylesheets/icon-base.css': 'iconsFlat',
    '@adobe/spectrum-wc-core/element': 'coreEntry',
    '@adobe/spectrum-wc-core/element/index.js': 'coreEntry',
    '@adobe/spectrum-wc-core/mixins/sized-mixin.js': 'coreEntry',
    '@adobe/spectrum-wc-core/Mixins.js': 'coreEntry',
    '@adobe/spectrum-wc-core/controllers/not-exported.js': 'coreEntry',
  };
  for (const [specifier, expected] of Object.entries(invalid)) {
    assert.deepEqual(
      messageIds(`import '${specifier}';`),
      [expected],
      specifier
    );
  }
});

test('checks re-exports, dynamic imports, and type imports', () => {
  const bad = '@adobe/spectrum-wc/badge';
  assert.deepEqual(messageIds(`export * from '${bad}';`), ['extension']);
  assert.deepEqual(messageIds(`export { Badge } from '${bad}';`), [
    'extension',
  ]);
  assert.deepEqual(messageIds(`import('${bad}');`), ['extension']);
  assert.deepEqual(messageIds(`import(\`${bad}\`);`), ['extension']);
  assert.deepEqual(
    messageIds(`import type { Badge } from '${bad}';`, { typescript: true }),
    ['extension']
  );
  assert.deepEqual(
    messageIds(`type Badge = import('${bad}').Badge;`, { typescript: true }),
    ['extension']
  );
  assert.deepEqual(
    messageIds(`import core = require('@adobe/spectrum-wc-core');`, {
      typescript: true,
    }),
    ['noRoot']
  );
});

test('ignores specifiers it cannot read statically', () => {
  assert.deepEqual(messageIds('const name = "x"; import(name);'), []);
  assert.deepEqual(
    messageIds('const name = "x"; import(`@adobe/spectrum-wc/${name}`);'),
    []
  );
});

test('names the package in root-import messages', () => {
  const [message] = lint(`import '@adobe/spectrum-wc-core';`);
  assert.match(
    message.message,
    /'@adobe\/spectrum-wc-core' has no root export/
  );
});

test('falls back to the entry-point shape without coreExports', () => {
  const settings = { options: {} };
  assert.deepEqual(
    messageIds(
      `import '@adobe/spectrum-wc-core/components/anything.js';`,
      settings
    ),
    []
  );
  assert.deepEqual(
    messageIds(
      `import '@adobe/spectrum-wc-core/element/define-element.js';`,
      settings
    ),
    ['coreEntry']
  );
});
