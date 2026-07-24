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

import { noDeprecated } from '../../src/rules/no-deprecated.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('no-deprecated', noDeprecated as never, {
  valid: [
    // sp-button with valid variant
    { code: 'const t = html`<sp-button variant="accent">Click</sp-button>`;' },
    // sp-button without variant
    { code: 'const t = html`<sp-button>Click</sp-button>`;' },
    // sp-overlay without deprecated attr
    { code: 'const t = html`<sp-overlay></sp-overlay>`;' },
    // dynamic variant (can't check statically)
    {
      code: 'const t = html`<sp-button variant=${this.variant}>Click</sp-button>`;',
    },
    // non-matching element
    { code: 'const t = html`<div variant="cta"></div>`;' },
  ],
  invalid: [
    // sp-button variant="cta"
    {
      code: 'const t = html`<sp-button variant="cta">Click</sp-button>`;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // sp-button variant="overBackground"
    {
      code: 'const t = html`<sp-button variant="overBackground">Click</sp-button>`;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // sp-button variant="white"
    {
      code: 'const t = html`<sp-button variant="white">Click</sp-button>`;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // sp-button variant="black"
    {
      code: 'const t = html`<sp-button variant="black">Click</sp-button>`;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
    // sp-overlay allow-outside-click
    {
      code: 'const t = html`<sp-overlay allow-outside-click></sp-overlay>`;',
      errors: [{ messageId: 'deprecatedAttribute' }],
    },
    // sp-button with deprecated href
    {
      code: 'const t = html`<sp-button href="/page">Go</sp-button>`;',
      errors: [{ messageId: 'deprecatedAttribute' }],
    },
    // sp-status-light with deprecated variant="accent"
    {
      code: 'const t = html`<sp-status-light variant="accent" label="Status"></sp-status-light>`;',
      errors: [{ messageId: 'deprecatedValue' }],
    },
  ],
});
