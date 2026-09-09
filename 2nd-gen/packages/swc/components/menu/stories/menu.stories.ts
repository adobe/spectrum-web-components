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

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-menu');

// `actual-placement` is internal CSS-only state that `Menu` manages directly
// via setAttribute (the flip-resolved side from PlacementController, once
// Phase 5 rendering provides a surface for it to position). The Storybook
// helper otherwise observes every attribute change, writes it back into
// `args`, and re-applies it through its `spread` directive on the next
// render — clobbering the resolved side with a stale value. Declaring it
// here (control disabled) makes the helper exclude it from the spread.
argTypes['actual-placement'] = {
  table: { disable: true },
  control: false,
};

/**
 * A menu is a full [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
 * host: an externally-referenced trigger opens a `PlacementController`-anchored
 * surface containing a `role="menu"` list of `swc-menu-item` rows.
 *
 * This is a Phase 3 (API migration) story for smoke testing only.
 * `swc-menu-item` doesn't exist yet, so this story slots plain content
 * instead. Keyboard/focus management, rendering/styling of the anchored
 * surface, and full documentation sections land in later migration phases.
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
  <div>Cut</div>
  <div>Copy</div>
  <div>Paste</div>
`;

export const Playground: Story = {
  render: (args) => template(args, defaultItems),
  tags: ['autodocs', 'dev'],
};
