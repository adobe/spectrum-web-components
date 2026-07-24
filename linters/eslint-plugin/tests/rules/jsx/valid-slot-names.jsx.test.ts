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

import { validSlotNames } from '../../../src/rules/valid-slot-names.js';

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

ruleTester.run('valid-slot-names (JSX)', validSlotNames as never, {
  valid: [
    // PascalCase with valid default slot
    {
      code: '<SpActionMenu label="Actions"><SpMenuItem>Edit</SpMenuItem></SpActionMenu>;',
    },
    // PascalCase with valid named slot
    {
      code: '<SpActionMenu label="Actions"><SpIcon slot="icon"></SpIcon></SpActionMenu>;',
    },
    // kebab-case with valid slot
    {
      code: '<sp-action-menu label="Actions"><sp-icon slot="icon"></sp-icon></sp-action-menu>;',
    },
    // PascalCase picker with valid default children
    {
      code: '<SpPicker label="Choose"><SpMenuItem>A</SpMenuItem></SpPicker>;',
    },
    // PascalCase tabs with valid children
    {
      code: '<SpTabs aria-label="Nav"><SpTab>Tab 1</SpTab></SpTabs>;',
    },
    // Non-SWC parent
    {
      code: '<div><SpButton slot="footer">OK</SpButton></div>;',
    },
  ],
  invalid: [
    // PascalCase with invalid slot name
    {
      code: '<SpActionMenu label="Actions"><SpMenuItem slot="header">Edit</SpMenuItem></SpActionMenu>;',
      errors: [{ messageId: 'invalidSlot' }],
    },
    // kebab-case with invalid slot name
    {
      code: '<sp-action-menu label="Actions"><sp-icon slot="footer"></sp-icon></sp-action-menu>;',
      errors: [{ messageId: 'invalidSlot' }],
    },
    // PascalCase picker with invalid slot
    {
      code: '<SpPicker label="Choose"><SpMenuItem slot="actions">A</SpMenuItem></SpPicker>;',
      errors: [{ messageId: 'invalidSlot' }],
    },
    // PascalCase button with invalid slot
    {
      code: '<SpButton><SpIcon slot="prefix"></SpIcon>Click</SpButton>;',
      errors: [{ messageId: 'invalidSlot' }],
    },
    // PascalCase tabs with invalid slot
    {
      code: '<SpTabs aria-label="Nav"><SpTab slot="header">Tab 1</SpTab></SpTabs>;',
      errors: [{ messageId: 'invalidSlot' }],
    },
  ],
});
