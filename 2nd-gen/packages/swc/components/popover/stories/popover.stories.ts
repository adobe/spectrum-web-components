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

import { Popover } from '@adobe/spectrum-wc/popover';

import '@adobe/spectrum-wc/components/popover/swc-popover.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-popover');

argTypes.placement = {
  ...argTypes.placement,
  control: { type: 'select' },
  options: Popover.VALID_PLACEMENTS,
  table: { category: 'attributes', defaultValue: { summary: 'bottom' } },
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: [undefined, ...Popover.VALID_SIZES],
  table: { category: 'attributes' },
};

/**
 * A popover is an anchored top-layer surface. In its default (non-modal) mode it
 * renders an internal `<div popover="auto">` with native light-dismiss; setting
 * `modal` renders a `<dialog>` opened via `showModal()` for blocking behavior.
 *
 * Scaffolded in Phase 2 (Setup). Lifecycle, events, and full stories land in
 * later migration phases.
 */
const meta: Meta = {
  title: 'Popover',
  component: 'swc-popover',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: `Anchored top-layer surface for menus, dialogs, and contextual content`,
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    open: false,
    placement: 'bottom',
    'hide-arrow': false,
    for: 'playground-trigger',
    'default-slot': 'This popover is anchored to the button above.',
  },
  render: (args) => html`
    <button id="playground-trigger">Toggle popover</button>
    ${template(args)}
  `,
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    open: true,
    placement: 'bottom',
    'hide-arrow': false,
    for: 'overview-trigger',
    'default-slot': 'This popover is anchored to the button above.',
  },
  render: (args) => html`
    <button id="overview-trigger">Trigger</button>
    ${template(args)}
  `,
  tags: ['overview'],
};
