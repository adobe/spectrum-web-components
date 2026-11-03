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
// Placeholder rows: `swc-menu-item` has not shipped yet.
const renderInMenu = (id: string) => html`
  <swc-button id="${id}-trigger">Edit</swc-button>
  <swc-menu open for="${id}-trigger">
    <swc-menu-item role="menuitem">Cut</swc-menu-item>
    <swc-menu-item role="menuitem">Copy</swc-menu-item>
    <swc-menu-separator></swc-menu-separator>
    <swc-menu-item role="menuitem">Delete</swc-menu-item>
  </swc-menu>
`;

// ────────────────────────
//    PLAYGROUND STORY
// ────────────────────────

export const Playground: Story = {
  render: () => renderInMenu('playground'),
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => renderInMenu('overview'),
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => renderInMenu('anatomy'),
  tags: ['anatomy'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => renderInMenu('accessibility'),
  tags: ['a11y'],
};
