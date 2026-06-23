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

import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { noDeprecated } from '../../../src/rules/no-deprecated.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
});

ruleTester.run('no-deprecated (JSX)', noDeprecated as never, {
  valid: [
    { code: '<SpButton variant="accent">Click</SpButton>;' },
    { code: '<sp-button variant="accent">Click</sp-button>;' },
    { code: '<SpButton>Click</SpButton>;' },
    { code: '<SpOverlay></SpOverlay>;' },
    { code: '<SpButton variant={v}>Click</SpButton>;' },
    { code: '<div></div>;' },
  ],
  invalid: [
    {
      code: '<SpButton variant="cta">Click</SpButton>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      code: '<sp-button variant="cta">Click</sp-button>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      code: '<SpButton variant="overBackground">Click</SpButton>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      code: '<SpButton variant="white">Click</SpButton>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      code: '<SpButton variant="black">Click</SpButton>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    {
      code: '<sp-overlay allow-outside-click></sp-overlay>;',
      errors: [{ messageId: 'deprecatedAttribute' }],
    },
    {
      code: '<SpOverlay allowOutsideClick></SpOverlay>;',
      errors: [{ messageId: 'deprecatedAttribute' }],
    },
    {
      code: '<SpButton href="/page">Go</SpButton>;',
      errors: [{ messageId: 'deprecatedAttribute' }],
    },
    {
      code: '<SpStatusLight variant="accent"></SpStatusLight>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
  ],
});
