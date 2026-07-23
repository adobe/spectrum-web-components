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

import { requiredAttributes } from '../../src/rules/required-attributes.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('required-attributes', requiredAttributes as never, {
  valid: [
    {
      code: 'const t = html`<sp-theme color="light" scale="medium" system="spectrum"></sp-theme>`;',
    },
    {
      code: 'const t = html`<overlay-trigger triggered-by="click">content</overlay-trigger>`;',
    },
    {
      code: 'const t = html`<div></div>`;',
    },
  ],
  invalid: [
    {
      code: 'const t = html`<sp-theme></sp-theme>`;',
      errors: [
        { messageId: 'missingRequired' },
        { messageId: 'missingRequired' },
        { messageId: 'missingRequired' },
      ],
    },
    {
      code: 'const t = html`<sp-theme color="light"></sp-theme>`;',
      errors: [
        { messageId: 'missingRequired' },
        { messageId: 'missingRequired' },
      ],
    },
    {
      code: 'const t = html`<overlay-trigger>content</overlay-trigger>`;',
      errors: [{ messageId: 'missingRequired' }],
    },
  ],
});
