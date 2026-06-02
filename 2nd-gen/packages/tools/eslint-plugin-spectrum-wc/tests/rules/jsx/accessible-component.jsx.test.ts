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

import { accessibleComponent } from '../../../src/rules/accessible-component.js';

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

ruleTester.run('accessible-component (JSX)', accessibleComponent as never, {
  valid: [
    { code: '<sp-action-menu label="Actions"></sp-action-menu>;' },
    { code: '<sp-action-menu aria-label="Actions"></sp-action-menu>;' },
    { code: '<SpActionMenu label="Actions"></SpActionMenu>;' },
    { code: '<SpActionMenu aria-label="Actions"></SpActionMenu>;' },
    { code: '<SpPicker label="Options"></SpPicker>;' },
    { code: '<sp-picker label="Options"></sp-picker>;' },
    { code: '<SpProgressBar aria-label="Loading"></SpProgressBar>;' },
    { code: '<SpAvatar label="User"></SpAvatar>;' },
    { code: '<SpAvatar isDecorative></SpAvatar>;' },
    { code: '<sp-avatar is-decorative></sp-avatar>;' },
    {
      code: '<SpAvatar isDecorative href="/profile" label="User"></SpAvatar>;',
    },
    { code: '<SpClearButton label="Clear"></SpClearButton>;' },
    { code: '<SpDialogWrapper headline="Title"></SpDialogWrapper>;' },
    { code: '<div></div>;' },
    { code: '<SpActionMenu label={label}></SpActionMenu>;' },
  ],
  invalid: [
    {
      code: '<SpActionMenu></SpActionMenu>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: '<sp-action-menu></sp-action-menu>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: '<SpPicker></SpPicker>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: '<SpProgressBar></SpProgressBar>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: '<SpAvatar></SpAvatar>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: '<sp-avatar></sp-avatar>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: '<SpAvatar isDecorative href="/profile"></SpAvatar>;',
      errors: [{ messageId: 'conditionalViolation' }],
    },
    {
      code: '<sp-avatar is-decorative href="/profile"></sp-avatar>;',
      errors: [{ messageId: 'conditionalViolation' }],
    },
    {
      code: '<SpClearButton></SpClearButton>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: '<SpDialogWrapper></SpDialogWrapper>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: '<SpProgressCircle></SpProgressCircle>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
  ],
});
