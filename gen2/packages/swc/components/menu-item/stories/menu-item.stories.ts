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

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';
import '@adobe/spectrum-wc/components/menu-item/swc-menu-item.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes } = getStorybookHelpers('swc-menu-item');

/**
 * A `<swc-menu-item>` is a single row of actions or options inside a
 * [Menu](../?path=/docs/components-menu--docs). The menu owns opening,
 * closing, and moving focus between rows.
 */
const meta: Meta = {
  title: 'Menu item',
  component: 'swc-menu-item',
  args,
  argTypes,
  parameters: {
    docs: {
      subtitle: `A single row of actions or options inside a menu.`,
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// Rows render inside a menu: on their own they have no surface to sit on.
const inMenu = (rows: unknown, id = 'menu-item-trigger') => html`
  <swc-button id=${id}>Edit</swc-button>
  <swc-menu for=${id} open>${rows}</swc-menu>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: () =>
    inMenu(
      html`
        <swc-menu-item>Cut</swc-menu-item>
      `,
      'playground-trigger'
    ),
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () =>
    inMenu(
      html`
        <swc-menu-item>Cut</swc-menu-item>
        <swc-menu-item>Copy</swc-menu-item>
        <swc-menu-item>Paste</swc-menu-item>
      `,
      'overview-trigger'
    ),
  tags: ['overview'],
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: () =>
    inMenu(
      html`
        <swc-menu-item>Default</swc-menu-item>
        <swc-menu-item disabled>Disabled</swc-menu-item>
      `,
      'states-trigger'
    ),
  tags: ['states'],
};
