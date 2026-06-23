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
    {
      code: '<SpActionMenu label="Actions"><SpMenuItem>Edit</SpMenuItem></SpActionMenu>;',
    },
    {
      code: '<SpActionMenu label="Actions"><SpIcon slot="icon"></SpIcon></SpActionMenu>;',
    },
    {
      code: '<sp-action-menu label="Actions"><sp-menu-item>Edit</sp-menu-item></sp-action-menu>;',
    },
    {
      code: '<SpButton><SpIcon slot="icon"></SpIcon>Click</SpButton>;',
    },
    {
      code: '<SpTabs accessibleLabel="Nav"><SpTab>Tab 1</SpTab><SpTabPanel>Content</SpTabPanel></SpTabs>;',
    },
    {
      code: '<SpDialogWrapper headline="Title"><SpButton slot="button">OK</SpButton></SpDialogWrapper>;',
    },
    {
      code: '<div><SpButton>Hi</SpButton></div>;',
    },
  ],
  invalid: [
    {
      code: '<SpActionMenu label="Actions"><SpButton>Wrong</SpButton></SpActionMenu>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    {
      code: '<sp-action-menu label="Actions"><sp-button>Wrong</sp-button></sp-action-menu>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    {
      code: '<SpActionMenu label="Actions"><SpButton slot="icon">Wrong</SpButton></SpActionMenu>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    {
      code: '<SpPicker label="Options"><SpButton>Wrong</SpButton></SpPicker>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    {
      code: '<SpTabs accessibleLabel="Nav"><SpButton>Wrong</SpButton></SpTabs>;',
      errors: [{ messageId: 'invalidChild' }],
    },
    {
      code: '<SpDialogWrapper headline="Title"><SpMenuItem slot="button">Wrong</SpMenuItem></SpDialogWrapper>;',
      errors: [{ messageId: 'invalidChild' }],
    },
  ],
});
