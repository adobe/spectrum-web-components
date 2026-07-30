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

import '../swc-pixel-loader.js';

import { PIXEL_LOADER_ICON_NAMES, PIXEL_LOADER_PRESET_NAMES } from '../data.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-pixel-loader');

argTypes.icon = {
  ...argTypes.icon,
  control: { type: 'select' },
  options: PIXEL_LOADER_ICON_NAMES,
};

argTypes.preset = {
  ...argTypes.preset,
  control: { type: 'select' },
  options: ['', ...PIXEL_LOADER_PRESET_NAMES],
};

/**
 * Prototype implementation of the Conversational AI pixel loader pattern
 * unit: an assembling/disassembling "pixel-fall" icon animation for loading
 * states, ported from the design spec.
 */
const meta: Meta = {
  title: 'Conversational AI/Pixel loader',
  component: 'swc-pixel-loader',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/conversational-ai/pixel-loader',
      subtitle: 'Assembling/disassembling pixel icon loading indicator.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export { meta };
export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    icon: 'aiLogo',
  },
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    icon: 'aiLogo',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  args: {
    icon: 'aiLogo',
  },
  tags: ['anatomy'],
};

// ──────────────────────────────
//    OPTIONS STORIES
// ──────────────────────────────

const SAMPLE_ICONS = [
  'aiLogo',
  'brush',
  'eye',
  'hourglass',
  'mag',
  'folder',
  'adobeA',
  'comment',
] as const;

export const Icons: Story = {
  render: (args) => html`
    ${SAMPLE_ICONS.map((icon) => template({ ...args, icon }))}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const Presets: Story = {
  render: (args) => html`
    ${PIXEL_LOADER_PRESET_NAMES.map((preset) => template({ ...args, preset }))}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────────
//    STATES STORIES
// ──────────────────────────────

export const States: Story = {
  render: (args) => html`
    ${template({ ...args, icon: 'aiLogo' })}
    ${template({ ...args, icon: 'aiLogo', paused: true })}
  `,
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    icon: 'aiLogo',
  },
  tags: ['a11y'],
};
