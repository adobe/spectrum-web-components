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

import { validAttributeValues } from '../../src/rules/valid-attribute-values.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('valid-attribute-values', validAttributeValues as never, {
  valid: [
    // sp-theme with valid values
    {
      code: 'const t = html`<sp-theme color="light" scale="medium" system="spectrum"></sp-theme>`;',
    },
    // sp-theme with dark color
    {
      code: 'const t = html`<sp-theme color="dark" scale="large" system="express"></sp-theme>`;',
    },
    // sp-button with valid variant
    {
      code: 'const t = html`<sp-button variant="accent">Click</sp-button>`;',
    },
    // dynamic value (can't verify statically)
    {
      code: 'const t = html`<sp-theme color=${this.color} scale="medium" system="spectrum"></sp-theme>`;',
    },
    // Non-SWC element
    {
      code: 'const t = html`<div color="purple"></div>`;',
    },
  ],
  invalid: [
    // sp-theme with invalid color
    {
      code: 'const t = html`<sp-theme color="lightest" scale="medium" system="spectrum"></sp-theme>`;',
      errors: [{ messageId: 'invalidValue' }],
    },
    // sp-theme with invalid scale
    {
      code: 'const t = html`<sp-theme color="light" scale="tiny" system="spectrum"></sp-theme>`;',
      errors: [{ messageId: 'invalidValue' }],
    },
    // sp-button with invalid variant
    {
      code: 'const t = html`<sp-button variant="danger">Click</sp-button>`;',
      errors: [{ messageId: 'invalidValue' }],
    },
    // sp-tabs with invalid direction
    {
      code: 'const t = html`<sp-tabs direction="diagonal" accessible-label="Nav"></sp-tabs>`;',
      errors: [{ messageId: 'invalidValue' }],
    },
  ],
});
