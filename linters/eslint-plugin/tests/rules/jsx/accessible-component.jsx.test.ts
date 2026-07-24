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
    // kebab-case custom element with label
    { code: '<sp-action-menu label="More actions"></sp-action-menu>;' },
    // kebab-case with aria-label
    { code: '<sp-action-menu aria-label="More actions"></sp-action-menu>;' },
    // PascalCase wrapper with label
    { code: '<SpActionMenu label="More actions"></SpActionMenu>;' },
    // PascalCase wrapper with aria-label (kebab preserved in JSX)
    { code: '<SpActionMenu aria-label="More actions"></SpActionMenu>;' },
    // PascalCase picker with label
    { code: '<SpPicker label="Choose one"></SpPicker>;' },
    // kebab-case picker with label
    { code: '<sp-picker label="Choose one"></sp-picker>;' },
    // Progress bar with aria-label
    { code: '<SpProgressBar aria-label="Loading"></SpProgressBar>;' },
    // Avatar with label
    { code: '<SpAvatar label="User"></SpAvatar>;' },
    // Avatar decorative (boolean prop without value)
    { code: '<SpAvatar isDecorative></SpAvatar>;' },
    // kebab-case avatar decorative
    { code: '<sp-avatar is-decorative></sp-avatar>;' },
    // Decorative avatar with href AND label
    { code: '<SpAvatar isDecorative href="#" label="User"></SpAvatar>;' },
    // Clear button with label
    { code: '<SpClearButton label="Clear"></SpClearButton>;' },
    // Dialog wrapper with headline
    { code: '<SpDialogWrapper headline="Title"></SpDialogWrapper>;' },
    // Non-SWC element should pass
    { code: '<div className="container"></div>;' },
    // Dynamic label binding should pass
    { code: '<SpActionMenu label={this.label}></SpActionMenu>;' },
  ],
  invalid: [
    // PascalCase without label
    {
      code: '<SpActionMenu></SpActionMenu>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // kebab-case without label
    {
      code: '<sp-action-menu></sp-action-menu>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // PascalCase picker without label
    {
      code: '<SpPicker></SpPicker>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // Progress bar without label
    {
      code: '<SpProgressBar></SpProgressBar>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // Avatar without label or decorative
    {
      code: '<SpAvatar></SpAvatar>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // kebab-case avatar without label
    {
      code: '<sp-avatar></sp-avatar>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // Decorative avatar with href but no label (conditional rule)
    {
      code: '<SpAvatar isDecorative href="#"></SpAvatar>;',
      errors: [{ messageId: 'conditionalViolation' }],
    },
    // kebab-case decorative avatar with href but no label
    {
      code: '<sp-avatar is-decorative href="#"></sp-avatar>;',
      errors: [{ messageId: 'conditionalViolation' }],
    },
    // Clear button without label
    {
      code: '<SpClearButton></SpClearButton>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // Dialog wrapper without headline
    {
      code: '<SpDialogWrapper></SpDialogWrapper>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // Progress circle without label
    {
      code: '<SpProgressCircle></SpProgressCircle>;',
      errors: [{ messageId: 'missingOneOf' }],
    },
  ],
});
