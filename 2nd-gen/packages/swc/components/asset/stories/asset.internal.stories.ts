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

import { Asset } from '@adobe/spectrum-wc/asset';

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-asset');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: [undefined, ...Asset.VARIANTS],
};

/**
 * The `file` and `folder` variants center themselves horizontally and vertically in the space provided.
 * Images are contained within the element, growing to the element's full height while centering within the width provided.
 */
const meta: Meta = {
  title: 'Asset',
  component: 'swc-asset',
  args,
  argTypes,
  parameters: {
    docs: {
      subtitle: `Visually represent files, folders, or images in your application`,
    },
    flexLayout: 'row-nowrap',
  },
  render: (args) => template(args),
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    label: 'Background',
    'default-slot': `<img src="https://picsum.photos/id/56/80/80/?blur=2" alt="preview of background" />`,
  },
  tags: ['dev'],
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  args: {
    label: 'Background',
    'default-slot': `<img src="https://picsum.photos/id/56/80/80/?blur=2" alt="preview of background" />`,
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, variant: 'file', label: 'README.md' })}
    ${template({ ...args, variant: 'folder', label: 'packages/swc/' })}
    ${template({
      ...args,
      label: 'images/profile_sm.png',
      'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="Headshot of Jenn" />`,
    })}
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Variants: Story = {
  render: (args) => html`
    ${template({
      ...args,
      variant: 'file',
      label: 'README.md',
    })}
    ${template({
      ...args,
      variant: 'folder',
      label: 'packages/swc/',
    })}
    ${template({
      ...args,
      label: 'banners/sunset.jpg',
      'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="sunset over a sandy beach" />`,
    })}
  `,
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({
      ...args,
      variant: 'file',
      label: 'Project proposal document',
    })}
    ${template({
      ...args,
      variant: 'folder',
      label: 'Design assets directory',
    })}
    ${template({
      ...args,
      label: 'User profile photo',
      'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="Profile photo of Maria Rodriguez, Senior Designer" />`,
    })}
  `,
  tags: ['a11y'],
};
