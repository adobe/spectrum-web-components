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

import { validSlotChildren } from '../../src/rules/valid-slot-children.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run('valid-slot-children', validSlotChildren as never, {
  valid: [
    // sp-action-menu with valid default slot child (sp-menu-item)
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-menu-item>Edit</sp-menu-item></sp-action-menu>`;',
    },
    // sp-action-menu with sp-menu-group in default slot
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-menu-group><sp-menu-item>Edit</sp-menu-item></sp-menu-group></sp-action-menu>`;',
    },
    // sp-action-menu with sp-menu-divider in default slot
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-menu-divider></sp-menu-divider></sp-action-menu>`;',
    },
    // sp-action-menu with sp-icon in icon slot
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-icon slot="icon"></sp-icon></sp-action-menu>`;',
    },
    // sp-action-menu with sp-tooltip in tooltip slot
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-tooltip slot="tooltip">Help</sp-tooltip></sp-action-menu>`;',
    },
    // sp-button with sp-icon in icon slot
    {
      code: 'const t = html`<sp-button><sp-icon slot="icon"></sp-icon>Click</sp-button>`;',
    },
    // sp-tabs with sp-tab in default slot
    {
      code: 'const t = html`<sp-tabs accessible-label="Nav"><sp-tab>Tab 1</sp-tab></sp-tabs>`;',
    },
    // sp-tabs with sp-tab-panel in default slot
    {
      code: 'const t = html`<sp-tabs accessible-label="Nav"><sp-tab-panel>Content</sp-tab-panel></sp-tabs>`;',
    },
    // sp-dialog-wrapper with sp-button in button slot
    {
      code: 'const t = html`<sp-dialog-wrapper headline="Title"><sp-button slot="button">OK</sp-button></sp-dialog-wrapper>`;',
    },
    // sp-dialog-wrapper with anything in default slot (no restriction)
    {
      code: 'const t = html`<sp-dialog-wrapper headline="Title"><div>Content</div></sp-dialog-wrapper>`;',
    },
    // Non-SWC parent (no checking)
    {
      code: 'const t = html`<div><sp-button>Hi</sp-button></div>`;',
    },
  ],
  invalid: [
    // sp-action-menu with sp-button in default slot (not accepted)
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-button>Wrong</sp-button></sp-action-menu>`;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // sp-action-menu with sp-button in icon slot (only sp-icon accepted)
    {
      code: 'const t = html`<sp-action-menu label="Actions"><sp-button slot="icon">Wrong</sp-button></sp-action-menu>`;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // sp-picker with sp-button in default slot
    {
      code: 'const t = html`<sp-picker label="Choose"><sp-button>Wrong</sp-button></sp-picker>`;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // sp-tabs with sp-button in default slot (only sp-tab / sp-tab-panel)
    {
      code: 'const t = html`<sp-tabs accessible-label="Nav"><sp-button>Wrong</sp-button></sp-tabs>`;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // sp-button with sp-button in icon slot (only sp-icon accepted)
    {
      code: 'const t = html`<sp-button><sp-button slot="icon">Wrong</sp-button>Click</sp-button>`;',
      errors: [{ messageId: 'invalidChild' }],
    },
    // sp-dialog-wrapper with sp-menu-item in button slot (only sp-button)
    {
      code: 'const t = html`<sp-dialog-wrapper headline="Title"><sp-menu-item slot="button">Wrong</sp-menu-item></sp-dialog-wrapper>`;',
      errors: [{ messageId: 'invalidChild' }],
    },
  ],
});
