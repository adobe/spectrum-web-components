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

import '@adobe/spectrum-wc/components/menu-separator/swc-menu-separator.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-menu-separator');

/**
 * A menu separator is a visual and semantic break between groups of items in a menu.
 */
const meta: Meta = {
  title: 'Menu separator',
  component: 'swc-menu-separator',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `Separates groups of items inside a menu`,
    },
    flexLayout: 'column-stretch',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────────
//    PLAYGROUND STORY
// ────────────────────────

export const Playground: Story = {
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <div style="inline-size: 240px;">
      <div>Cut</div>
      <div>Copy</div>
      <swc-menu-separator></swc-menu-separator>
      <div>Delete</div>
    </div>
  `,
  tags: ['anatomy'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <div style="inline-size: 240px;">
      <div>Cut</div>
      <div>Copy</div>
      <swc-menu-separator></swc-menu-separator>
      <div>Delete</div>
    </div>
  `,
  tags: ['a11y'],
};
