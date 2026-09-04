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

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-asset');

/**
 * A general image/media primitive that displays a single slotted `<img>` or
 * `<svg>` element, sized and fit to the space provided.
 */
const meta: Meta = {
  title: 'Asset',
  component: 'swc-asset',
  args,
  argTypes,
  parameters: {
    docs: {
      subtitle: `Visually represent an image or media asset in your application`,
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
    'default-slot': `<img src="./images/avatar-preview.png" alt="preview of background" />`,
  },
  tags: ['dev'],
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  args: {
    'default-slot': `<img src="./images/avatar-preview.png" alt="preview of background" />`,
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': `<img src="./images/avatar-preview.png" alt="README.md preview" />`,
    })}
    ${template({
      ...args,
      'default-slot': `<svg role="img" aria-label="Folder icon" viewBox="0 0 32 32"><path d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z" /></svg>`,
    })}
  `,
  tags: ['anatomy'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${template({
      ...args,
      'default-slot': `<img src="./images/avatar-preview.png" alt="Profile photo" />`,
    })}
    ${template({
      ...args,
      'default-slot': `<svg role="img" aria-label="Project proposal document" viewBox="0 0 128 128"><path d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z" /></svg>`,
    })}
  `,
  tags: ['a11y'],
};
