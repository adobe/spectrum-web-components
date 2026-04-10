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

const { args, argTypes, template } = getStorybookHelpers(
  'swc-conversation-artifact'
);

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: ['card', 'media'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'card' },
  },
};

/**
 * Shared artifact primitive used across conversational AI surfaces such as prompt field and user message.
 * Supports both **`card`** and **`media`** variants with a unified slot model.
 */
const meta: Meta = {
  title: 'Conversational AI/Conversation artifact',
  component: 'swc-conversation-artifact',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle:
        'Shared artifact primitive with card and media variants, plus optional dismiss and trailing actions.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export default meta;

export const Playground: Story = {
  args: {
    variant: 'card',
    dismissible: false,
    'thumbnail-slot':
      '<div slot="thumbnail" style="inline-size:32px;block-size:32px;border-radius:3px;background:var(--swc-gray-200);" role="img" aria-label="File thumbnail"></div>',
    'title-slot': '<span slot="title">Hilton commercial assets</span>',
    'subtitle-slot': '<span slot="subtitle">2026</span>',
  },
  tags: ['autodocs', 'dev'],
};

export const Overview: Story = {
  args: {
    variant: 'card',
    dismissible: true,
    'thumbnail-slot':
      '<div slot="thumbnail" style="inline-size:32px;block-size:32px;border-radius:3px;background:var(--swc-gray-200);" role="img" aria-label="File thumbnail"></div>',
    'title-slot': '<span slot="title">Hilton commercial assets</span>',
    'subtitle-slot': '<span slot="subtitle">2026</span>',
  },
  tags: ['overview'],
};

/**
 * Card variant uses a compact thumbnail with horizontal text layout.
 */
export const Card: Story = {
  render: () => html`
    <div style="max-inline-size:360px;">
      <swc-conversation-artifact variant="card" dismissible>
        <div
          slot="thumbnail"
          style="inline-size:32px;block-size:32px;border-radius:3px;background:var(--swc-gray-200);"
          role="img"
          aria-label="File thumbnail"
        ></div>
        <span slot="title">Hilton commercial assets</span>
        <span slot="subtitle">2026</span>
      </swc-conversation-artifact>
    </div>
  `,
  tags: ['options'],
};

/**
 * Media variant uses a larger thumbnail region with metadata below.
 */
export const Media: Story = {
  render: () => html`
    <div style="inline-size:240px;">
      <swc-conversation-artifact variant="media" dismissible>
        <div
          slot="thumbnail"
          style="inline-size:100%;block-size:196px;background:linear-gradient(135deg,#a78bfa,#f472b6);"
          role="img"
          aria-label="Campaign preview"
        ></div>
        <span slot="title">Hilton commercial assets</span>
        <span slot="subtitle">2026</span>
      </swc-conversation-artifact>
    </div>
  `,
  tags: ['options'],
};
