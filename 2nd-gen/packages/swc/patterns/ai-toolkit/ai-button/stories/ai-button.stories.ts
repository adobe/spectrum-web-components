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

import '../swc-ai-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-ai-button');

/**
 * A button that triggers an AI-powered action, with a branded gradient
 * treatment. The sparkle icon is always shown; the label comes from the default
 * slot and is optional. Set `brand-color` to an OKLCH color to retint the
 * gradient.
 */
const meta: Meta = {
  title: 'AI Toolkit/AI button',
  component: 'swc-ai-button',
  args: {
    ...args,
    'default-slot': 'Ask AI',
  },
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/ai-button',
      subtitle: 'Branded button that triggers an AI-powered action.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

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
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Ask AI' })}
    ${template({ ...args, 'default-slot': '', 'accessible-label': 'Ask AI' })}
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${template({ ...args, size: 's', 'default-slot': 'Small' })}
    ${template({ ...args, size: 'm', 'default-slot': 'Medium' })}
    ${template({ ...args, size: 'l', 'default-slot': 'Large' })}
    ${template({ ...args, size: 'xl', 'default-slot': 'Extra-large' })}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const BrandColor: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Ask AI' })}
    <swc-ai-button style="--swc-ai-button-brand-color: oklch(70% 0.19 250);">
      Ask AI
    </swc-ai-button>
    <swc-ai-button style="--swc-ai-button-brand-color: oklch(72% 0.2 150);">
      Ask AI
    </swc-ai-button>
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    STATES STORY
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    ${template({ ...args, 'default-slot': 'Ask AI' })}
    ${template({ ...args, disabled: true, 'default-slot': 'Ask AI' })}
  `,
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    'default-slot': '',
    'accessible-label': 'Ask AI',
  },
  tags: ['a11y'],
};
