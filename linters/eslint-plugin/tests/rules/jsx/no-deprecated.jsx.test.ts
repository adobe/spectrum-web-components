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
    // PascalCase with valid variant
    { code: '<SpButton variant="accent">Click</SpButton>;' },
    // kebab-case with valid variant
    { code: '<sp-button variant="accent">Click</sp-button>;' },
    // Without variant
    { code: '<SpButton>Click</SpButton>;' },
    // sp-overlay without deprecated attr
    { code: '<SpOverlay></SpOverlay>;' },
    // Dynamic variant
    { code: '<SpButton variant={this.variant}>Click</SpButton>;' },
    // Non-SWC element
    { code: '<div variant="cta"></div>;' },
  ],
  invalid: [
    // PascalCase deprecated variant="cta"
    {
      code: '<SpButton variant="cta">Click</SpButton>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // kebab-case deprecated variant="cta"
    {
      code: '<sp-button variant="cta">Click</sp-button>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // deprecated variant="overBackground"
    {
      code: '<SpButton variant="overBackground">Click</SpButton>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // deprecated variant="white"
    {
      code: '<SpButton variant="white">Click</SpButton>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // deprecated variant="black"
    {
      code: '<SpButton variant="black">Click</SpButton>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // sp-overlay allow-outside-click (kebab)
    {
      code: '<sp-overlay allow-outside-click></sp-overlay>;',
      errors: [{ messageId: 'deprecatedAttribute' }],
    },
    // PascalCase overlay with camelCase prop
    {
      code: '<SpOverlay allowOutsideClick></SpOverlay>;',
      errors: [{ messageId: 'deprecatedAttribute' }],
    },
    // sp-button with deprecated href
    {
      code: '<SpButton href="/page">Go</SpButton>;',
      errors: [{ messageId: 'deprecatedAttribute' }],
    },
    // sp-status-light deprecated variant="accent"
    {
      code: '<SpStatusLight variant="accent" label="Status"></SpStatusLight>;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
  ],
});
