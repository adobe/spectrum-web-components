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

import { MENU_PLACEMENTS } from '@adobe/spectrum-wc-core/components/menu';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-menu');

// The manifest only records the type alias name, not its expanded union, so
// the helper falls back to free text without this override.
argTypes.placement = {
  ...argTypes.placement,
  control: { type: 'select' },
  options: MENU_PLACEMENTS,
  table: { category: 'attributes', defaultValue: { summary: 'bottom-start' } },
};

// Internal CSS-only state `Menu` sets itself; excluded so the helper's
// attribute round-trip doesn't clobber it with a stale value.
argTypes['actual-placement'] = {
  table: { disable: true },
  control: false,
};

/**
 * A menu is a full [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
 * host: an externally-referenced trigger opens a `PlacementController`-anchored
 * surface containing a `role="menu"` list of `swc-menu-item` rows.
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

// Placeholders for `swc-menu-item`, which doesn't exist yet; matches its
// eventual tag name and `role="menuitem"` so the story stays aXe-clean.
const defaultItems = html`
  <swc-menu-item role="menuitem" tabindex="-1">Cut</swc-menu-item>
  <swc-menu-item role="menuitem" tabindex="-1">Copy</swc-menu-item>
  <swc-menu-item role="menuitem" tabindex="-1">Paste</swc-menu-item>
`;

export const Playground: Story = {
  args: {
    open: false,
    for: 'playground-trigger',
    'actual-placement': null,
    placement: 'bottom-start',
    'should-flip': true,
  },
  render: (args) => html`
    <swc-button id="playground-trigger">Open menu</swc-button>
    ${template(args, defaultItems)}
  `,
  tags: ['autodocs', 'dev'],
};
