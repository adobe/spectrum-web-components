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

import '../index.js';

// ────────────────
//    METADATA
// ────────────────

const meta: Meta = {
  title: 'Tag field',
  component: 'swc-tag-field',
  parameters: {
    docs: {
      subtitle:
        'An input component for adding and editing multiple tags with a dismiss button on each.',
    },
  },
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <swc-tag-field
      label="Add interests"
      .tags=${['Illustrations', 'AI', 'Photos']}
    ></swc-tag-field>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * A tag field pre-populated with multiple tags that wrap to multiple lines.
 */
export const WithTags: Story = {
  render: () => html`
    <swc-tag-field
      label="Add interests"
      .tags=${['Illustrations', 'AI', 'Photos', 'Vectors', 'Patterns', 'Video']}
    ></swc-tag-field>
  `,
  tags: ['options'],
  parameters: { 'section-order': 1 },
};
WithTags.storyName = 'With tags';

/**
 * An empty tag field with placeholder text, ready for user input.
 */
export const Empty: Story = {
  render: () => html`
    <swc-tag-field
      label="Add interests"
      placeholder="Add tags..."
    ></swc-tag-field>
  `,
  tags: ['options'],
  parameters: { 'section-order': 2 },
};

/**
 * A disabled tag field with pre-populated tags. No interactions are possible.
 */
export const Disabled: Story = {
  render: () => html`
    <swc-tag-field
      label="Add interests"
      disabled
      .tags=${['Illustrations', 'AI', 'Photos']}
    ></swc-tag-field>
  `,
  tags: ['options'],
  parameters: { 'section-order': 3 },
};
