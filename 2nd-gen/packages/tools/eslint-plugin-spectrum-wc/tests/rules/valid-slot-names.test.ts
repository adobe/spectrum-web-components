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

import { validSlotNames } from '../../src/rules/valid-slot-names.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('valid-slot-names', validSlotNames as never, {
  valid: [
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-menu-item>Edit</sp-menu-item></sp-action-menu>`;',
    },
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-icon slot="icon"></sp-icon></sp-action-menu>`;',
    },
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-tooltip slot="tooltip">Help</sp-tooltip></sp-action-menu>`;',
    },
    {
      code: 'const t = html`<sp-picker label="Options"><sp-menu-item>Option A</sp-menu-item></sp-picker>`;',
    },
    {
      code: 'const t = html`<sp-tabs accessible-label="Nav"><sp-tab>Tab 1</sp-tab><sp-tab-panel>Content</sp-tab-panel></sp-tabs>`;',
    },
    {
      code: 'const t = html`<sp-button><sp-icon slot="icon"></sp-icon>Click</sp-button>`;',
    },
    {
      code: 'const t = html`<div><sp-button>OK</sp-button></div>`;',
    },
    {
      code: 'const t = html`<sp-progress-bar aria-label="Loading"></sp-progress-bar>`;',
    },
  ],
  invalid: [
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-menu-item slot="header">Edit</sp-menu-item></sp-action-menu>`;',
      errors: [{ messageId: 'invalidSlot' }],
    },
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-icon slot="footer"></sp-icon></sp-action-menu>`;',
      errors: [{ messageId: 'invalidSlot' }],
    },
    {
      code: 'const t = html`<sp-picker label="Options"><sp-menu-item slot="header">Option</sp-menu-item></sp-picker>`;',
      errors: [{ messageId: 'invalidSlot' }],
    },
    {
      code: 'const t = html`<sp-button><sp-icon slot="header"></sp-icon>Click</sp-button>`;',
      errors: [{ messageId: 'invalidSlot' }],
    },
    {
      code: 'const t = html`<sp-tabs accessible-label="Nav"><sp-tab slot="header">Tab 1</sp-tab></sp-tabs>`;',
      errors: [{ messageId: 'invalidSlot' }],
    },
  ],
});
