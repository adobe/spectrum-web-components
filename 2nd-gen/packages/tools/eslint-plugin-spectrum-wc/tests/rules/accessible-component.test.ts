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

import { accessibleComponent } from '../../src/rules/accessible-component.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('accessible-component', accessibleComponent as never, {
  valid: [
    {
      code: 'const t = html`<sp-action-menu label="Actions"></sp-action-menu>`;',
    },
    {
      code: 'const t = html`<sp-action-menu aria-label="Actions"></sp-action-menu>`;',
    },
    {
      code: 'const t = html`<sp-action-menu aria-labelledby="id1"></sp-action-menu>`;',
    },
    { code: 'const t = html`<sp-picker label="Options"></sp-picker>`;' },
    {
      code: 'const t = html`<sp-progress-bar aria-label="Loading"></sp-progress-bar>`;',
    },
    { code: 'const t = html`<sp-avatar label="User"></sp-avatar>`;' },
    { code: 'const t = html`<sp-avatar is-decorative></sp-avatar>`;' },
    {
      code: 'const t = html`<sp-avatar is-decorative href="/profile" label="User"></sp-avatar>`;',
    },
    {
      code: 'const t = html`<sp-clear-button label="Clear"></sp-clear-button>`;',
    },
    {
      code: 'const t = html`<sp-dialog-wrapper headline="Title"></sp-dialog-wrapper>`;',
    },
    { code: 'const t = html`<div></div>`;' },
    {
      code: 'const t = html`<sp-action-menu label=${this.label}></sp-action-menu>`;',
    },
  ],
  invalid: [
    {
      code: 'const t = html`<sp-action-menu></sp-action-menu>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: 'const t = html`<sp-picker></sp-picker>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: 'const t = html`<sp-progress-bar></sp-progress-bar>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: 'const t = html`<sp-avatar></sp-avatar>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: 'const t = html`<sp-avatar is-decorative href="/profile"></sp-avatar>`;',
      errors: [{ messageId: 'conditionalViolation' }],
    },
    {
      code: 'const t = html`<sp-clear-button></sp-clear-button>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: 'const t = html`<sp-dialog-wrapper></sp-dialog-wrapper>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    {
      code: 'const t = html`<sp-progress-circle></sp-progress-circle>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
  ],
});
