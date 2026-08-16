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

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/components/menu/swc-menu.js';
import '@adobe/spectrum-wc/components/menu/swc-menu-item.js';
import '@adobe/spectrum-wc/components/menu/swc-menu-group.js';
import '@adobe/spectrum-wc/components/menu/swc-menu-separator.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-menu');

/**
 * A menu is a full [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
 * host: a trigger opens a `swc-popover`-anchored surface containing a
 * `role="menu"` list of `swc-menu-item`, `swc-menu-group`, and
 * `swc-menu-separator` rows.
 *
 * This is a Phase 2 (2nd-gen file structure) placeholder for smoke testing
 * only. Trigger, popover anchoring, keyboard/focus management, and full
 * documentation sections land in later migration phases.
 */
const meta: Meta = {
  title: 'Menu',
  component: 'swc-menu',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: { subtitle: `Menu-button host for a list of actions` },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

const defaultItems = html`
  <swc-menu-item>Cut</swc-menu-item>
  <swc-menu-item>Copy</swc-menu-item>
  <swc-menu-item>Paste</swc-menu-item>
  <swc-menu-separator></swc-menu-separator>
  <swc-menu-group>
    <swc-menu-item>Duplicate</swc-menu-item>
    <swc-menu-item>Delete</swc-menu-item>
  </swc-menu-group>
`;

export const Playground: Story = {
  render: (args) => template(args, defaultItems),
  tags: ['autodocs', 'dev'],
};
