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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import type { Menu } from '@adobe/spectrum-wc/components/menu/Menu.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';
import '@adobe/spectrum-wc/components/menu-separator/swc-menu-separator.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes } = getStorybookHelpers('swc-menu-separator');

/**
 * A menu separator is a visual and semantic break between groups of items in a menu.
 */
const meta: Meta = {
  title: 'Menu separator',
  component: 'swc-menu-separator',
  args,
  argTypes,
  parameters: {
    docs: {
      subtitle: `Separates groups of items inside a menu`,
    },
    flexLayout: 'column-stretch',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// A separator only has meaning inside a menu, so every story renders it there.
// Menus are `popover="auto"`, so opening several on one docs page would close
// each other. Stories that render open use `docs.story.inline: false` so each
// gets its own iframe.
// Placeholder rows: `swc-menu-item` has not shipped yet.
const renderInMenu = (id: string, open = false) => html`
  <swc-button id="${id}-trigger">Edit</swc-button>
  <swc-menu ?open=${open} for="${id}-trigger">
    <swc-menu-item role="menuitem">Cut</swc-menu-item>
    <swc-menu-item role="menuitem">Copy</swc-menu-item>
    <swc-menu-separator></swc-menu-separator>
    <swc-menu-item role="menuitem">Delete</swc-menu-item>
  </swc-menu>
`;

const openMenu: Story['play'] = async ({ canvasElement }) => {
  const menu = canvasElement.querySelector('swc-menu') as Menu;
  await menu.updateComplete;
  menu.open = true;
  await menu.updateComplete;
  await waitFor(() =>
    expect(
      menu.shadowRoot?.querySelector('.swc-Menu')?.matches(':popover-open'),
      'menu is open'
    ).toBe(true)
  );
};

// ────────────────────────
//    PLAYGROUND STORY
// ────────────────────────

export const Playground: Story = {
  render: () => renderInMenu('playground'),
  play: openMenu,
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

const isolatedOpenDocs = {
  docs: { story: { inline: false, height: '300px' } },
};

export const Overview: Story = {
  render: () => renderInMenu('overview', true),
  parameters: isolatedOpenDocs,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => renderInMenu('anatomy', true),
  parameters: isolatedOpenDocs,
  tags: ['anatomy'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => renderInMenu('accessibility', true),
  parameters: isolatedOpenDocs,
  tags: ['a11y'],
};
