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

import { validSlotChildren } from '../../../src/rules/valid-slot-children.js';

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

ruleTester.run('valid-slot-children (JSX)', validSlotChildren as never, {
  valid: [
    // PascalCase action menu with valid default slot child
    {
      code: '<SpActionMenu label="Actions"><SpMenuItem>Edit</SpMenuItem></SpActionMenu>;',
    },
    // PascalCase action menu with sp-icon in icon slot
    {
      code: '<SpActionMenu label="Actions"><SpIcon slot="icon"></SpIcon></SpActionMenu>;',
    },
    // kebab-case with valid child
    {
      code: '<sp-action-menu label="Actions"><sp-menu-item>Edit</sp-menu-item></sp-action-menu>;',
    },
    // PascalCase button with icon in icon slot
    {
      code: '<SpButton><SpIcon slot="icon"></SpIcon>Click</SpButton>;',
    },
    // PascalCase tabs with valid tab child
    {
      code: '<SpTabs aria-label="Nav"><SpTab>Tab 1</SpTab><SpTabPanel>Content</SpTabPanel></SpTabs>;',
    },
    // PascalCase dialog with button in button slot
    {
      code: '<SpDialogWrapper headline="Title"><SpButton slot="button">OK</SpButton></SpDialogWrapper>;',
    },
    // Non-SWC parent (no checking)
    {
      code: '<div><SpButton>Hi</SpButton></div>;',
    },
  ],
  invalid: [
    // PascalCase action menu with invalid child in default slot
    {
      code: '<SpActionMenu label="Actions"><SpButton>Wrong</SpButton></SpActionMenu>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // kebab-case action menu with invalid child
    {
      code: '<sp-action-menu label="Actions"><sp-button>Wrong</sp-button></sp-action-menu>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // PascalCase action menu with wrong element in icon slot
    {
      code: '<SpActionMenu label="Actions"><SpButton slot="icon">Wrong</SpButton></SpActionMenu>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // PascalCase picker with wrong child
    {
      code: '<SpPicker label="Choose"><SpButton>Wrong</SpButton></SpPicker>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // PascalCase tabs with wrong child
    {
      code: '<SpTabs aria-label="Nav"><SpButton>Wrong</SpButton></SpTabs>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // PascalCase dialog with wrong element in button slot
    {
      code: '<SpDialogWrapper headline="Title"><SpMenuItem slot="button">Wrong</SpMenuItem></SpDialogWrapper>;',
      errors: [{ messageId: 'invalidChild' }],
    },
  ],
});
