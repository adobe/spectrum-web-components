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

import '../index.js';

const { args, argTypes, template } = getStorybookHelpers('swc-upload-artifact');

argTypes.type = {
  ...argTypes.type,
  control: { type: 'select' },
  options: ['card', 'media'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'card' },
  },
};

/**
 * Shared upload artifact primitive used across conversational AI surfaces such as prompt field and user message.
 * Supports both **`card`** and **`media`** types with a unified slot model.
 */
const meta: Meta = {
  title: 'Conversational AI/Upload artifact',
  component: 'swc-upload-artifact',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle:
        'Shared upload artifact primitive with card and media types, plus optional dismiss and trailing actions.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export default meta;

export const Playground: Story = {
  args: {
    type: 'card',
    dismissible: false,
    'thumbnail-slot':
      '<div slot="thumbnail" role="img" aria-label="File thumbnail"></div>',
    'title-slot': '<span slot="title">Hilton commercial assets</span>',
    'subtitle-slot': '<span slot="subtitle">2026</span>',
  },
  tags: ['autodocs', 'dev'],
};

export const Overview: Story = {
  args: {
    type: 'card',
    dismissible: true,
    'thumbnail-slot':
      '<div slot="thumbnail" role="img" aria-label="File thumbnail"></div>',
    'title-slot': '<span slot="title">Hilton commercial assets</span>',
    'subtitle-slot': '<span slot="subtitle">2026</span>',
  },
  tags: ['overview'],
};

/**
 * Card type uses a compact thumbnail with horizontal text layout.
 */
export const Card: Story = {
  render: () => html`
    <div style="max-inline-size:360px;">
      <swc-upload-artifact type="card" dismissible>
        <div slot="thumbnail" role="img" aria-label="File thumbnail"></div>
        <span slot="title">Hilton commercial assets</span>
        <span slot="subtitle">2026</span>
      </swc-upload-artifact>
    </div>
  `,
  tags: ['options'],
};

/**
 * Media type uses a larger preview region without title or subtitle text.
 */
export const Media: Story = {
  render: () => html`
    <div style="inline-size:240px;">
      <swc-upload-artifact type="media" dismissible>
        <div
          slot="thumbnail"
          style="inline-size:100%;block-size:196px;background:linear-gradient(135deg,#a78bfa,#f472b6);"
          role="img"
          aria-label="Campaign preview"
        ></div>
      </swc-upload-artifact>
    </div>
  `,
  tags: ['options'],
};
