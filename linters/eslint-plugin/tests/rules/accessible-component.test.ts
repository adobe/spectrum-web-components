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
    // sp-action-menu with label
    {
      code: 'const t = html`<sp-action-menu label="More actions"></sp-action-menu>`;',
    },
    // sp-action-menu with aria-label
    {
      code: 'const t = html`<sp-action-menu aria-label="More actions"></sp-action-menu>`;',
    },
    // sp-action-menu with aria-labelledby
    {
      code: 'const t = html`<sp-action-menu aria-labelledby="heading-1"></sp-action-menu>`;',
    },
    // sp-picker with label
    { code: 'const t = html`<sp-picker label="Choose one"></sp-picker>`;' },
    // sp-progress-bar with aria-label
    {
      code: 'const t = html`<sp-progress-bar aria-label="Loading"></sp-progress-bar>`;',
    },
    // sp-avatar with label
    { code: 'const t = html`<sp-avatar label="User"></sp-avatar>`;' },
    // sp-avatar with is-decorative (no link)
    { code: 'const t = html`<sp-avatar is-decorative></sp-avatar>`;' },
    // sp-avatar decorative with href AND label
    {
      code: 'const t = html`<sp-avatar is-decorative href="#" label="User"></sp-avatar>`;',
    },
    // sp-clear-button with label
    {
      code: 'const t = html`<sp-clear-button label="Clear"></sp-clear-button>`;',
    },
    // sp-dialog-wrapper with headline
    {
      code: 'const t = html`<sp-dialog-wrapper headline="Title"></sp-dialog-wrapper>`;',
    },
    // Non-SWC element should pass
    { code: 'const t = html`<div class="container"></div>`;' },
    // Dynamic label binding should pass (can't statically verify)
    {
      code: 'const t = html`<sp-action-menu label=${this.label}></sp-action-menu>`;',
    },
  ],
  invalid: [
    // sp-action-menu without any label
    {
      code: 'const t = html`<sp-action-menu></sp-action-menu>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // sp-picker without label
    {
      code: 'const t = html`<sp-picker></sp-picker>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // sp-progress-bar without label
    {
      code: 'const t = html`<sp-progress-bar></sp-progress-bar>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // sp-avatar without label or decorative
    {
      code: 'const t = html`<sp-avatar></sp-avatar>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // sp-avatar decorative with href but no label (conditional rule fires)
    {
      code: 'const t = html`<sp-avatar is-decorative href="#"></sp-avatar>`;',
      errors: [{ messageId: 'conditionalViolation' }],
    },
    // sp-clear-button without label
    {
      code: 'const t = html`<sp-clear-button></sp-clear-button>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // sp-dialog-wrapper without headline
    {
      code: 'const t = html`<sp-dialog-wrapper></sp-dialog-wrapper>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
    // sp-progress-circle without label
    {
      code: 'const t = html`<sp-progress-circle></sp-progress-circle>`;',
      errors: [{ messageId: 'missingOneOf' }],
    },
  ],
});
