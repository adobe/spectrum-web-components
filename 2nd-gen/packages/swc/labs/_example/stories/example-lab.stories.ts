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

/**
 * A simple color swatch prototype that demonstrates how to build a lab component.
 *
 * This example shows the basic file structure, token usage, and story patterns
 * that designers can follow when creating their own prototypes in the labs space.
 */
const meta: Meta = {
  title: 'Example lab',
  component: 'swc-example-lab',
  argTypes: {
    color: {
      control: { type: 'select' },
      options: [
        'accent',
        'informative',
        'positive',
        'negative',
        'notice',
        'neutral',
        'fuchsia',
        'indigo',
        'seafoam',
        'purple',
        'magenta',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
  },
  render: (args) => html`
    <swc-example-lab color=${args.color || 'accent'} size=${args.size || 'm'}>
      ${args['default-slot'] || ''}
    </swc-example-lab>
  `,
  parameters: {
    docs: {
      subtitle: 'A color swatch prototype demonstrating the labs pattern.',
    },
    flexLayout: 'row-wrap',
  },
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    color: 'accent',
    size: 'm',
    'default-slot': 'Accent',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The swatch comes in three sizes for different contexts:
 *
 * - **Small (`s`)** — Compact spaces, inline with text
 * - **Medium (`m`)** — Default size
 * - **Large (`l`)** — Prominent display
 */
export const Sizes: Story = {
  render: () => html`
    <swc-example-lab color="accent" size="s">Small</swc-example-lab>
    <swc-example-lab color="accent" size="m">Medium</swc-example-lab>
    <swc-example-lab color="accent" size="l">Large</swc-example-lab>
  `,
  tags: ['options'],
  parameters: { 'section-order': 1 },
};

/**
 * Semantic colors carry meaning and should be used when the color
 * communicates a specific status.
 */
export const SemanticColors: Story = {
  render: () => html`
    <swc-example-lab color="accent">Accent</swc-example-lab>
    <swc-example-lab color="informative">Informative</swc-example-lab>
    <swc-example-lab color="positive">Positive</swc-example-lab>
    <swc-example-lab color="negative">Negative</swc-example-lab>
    <swc-example-lab color="notice">Notice</swc-example-lab>
    <swc-example-lab color="neutral">Neutral</swc-example-lab>
  `,
  tags: ['options'],
  parameters: { 'section-order': 2 },
};
SemanticColors.storyName = 'Semantic colors';

/**
 * Non-semantic colors are for visual categorization without inherent meaning.
 */
export const NonSemanticColors: Story = {
  render: () => html`
    <swc-example-lab color="fuchsia">Fuchsia</swc-example-lab>
    <swc-example-lab color="indigo">Indigo</swc-example-lab>
    <swc-example-lab color="seafoam">Seafoam</swc-example-lab>
    <swc-example-lab color="purple">Purple</swc-example-lab>
    <swc-example-lab color="magenta">Magenta</swc-example-lab>
  `,
  tags: ['options'],
  parameters: { 'section-order': 3 },
};
NonSemanticColors.storyName = 'Non-semantic colors';
