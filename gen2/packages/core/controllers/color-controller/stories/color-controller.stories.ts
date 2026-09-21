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
import type { Meta, StoryObj } from '@storybook/web-components';

import './demo-hosts.js';

// ────────────────
//    METADATA
// ────────────────

const args = {
  value: 'rgb(120, 180, 240)',
  manageAs: '',
};

const argTypes = {
  value: {
    control: 'text',
    description:
      'Color string assigned to the controller. Accepts RGB(A), HSL(A), HSV(A), and hex (with optional alpha), in comma, space, or percentage notation.',
    table: {
      category: 'Options',
      type: { summary: 'ColorTypes' },
      defaultValue: { summary: 'rgb(120, 180, 240)' },
    },
  },
  manageAs: {
    control: 'select',
    options: ['', 'srgb', 'hsl', 'hsv'],
    description:
      'Color space the controller stores the value in. Empty keeps the input space. Set via the `manageAs` constructor option.',
    table: {
      category: 'Options',
      type: { summary: 'string' },
      defaultValue: { summary: '(input space)' },
    },
  },
} satisfies Meta['argTypes'];

/**
 * `ColorController` parses, validates, stores, and converts color values for color
 * components using [colorjs.io](https://colorjs.io/). It accepts RGB(A), HSL(A),
 * HSV(A), and hex input, exposes the current color in the caller's original notation
 * via `colorValue`, and offers helpers for hue, format conversion, and save/restore.
 *
 * The controller owns **color state only** — it renders no DOM and manages no ARIA.
 */
const meta: Meta = {
  title: 'Controllers/Color controller',
  component: 'demo-color-playground',
  args,
  argTypes,
  render: (a) => html`
    <demo-color-playground
      value=${a.value}
      manage-as=${a.manageAs}
    ></demo-color-playground>
  `,
  parameters: {
    docs: {
      subtitle:
        'Color parsing, validation, and conversion for color components.',
      canvas: { sourceState: 'none' },
    },
  },
  tags: ['migrated', 'controller'],
};

export default meta;

type Story = StoryObj;

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

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const Formats: Story = {
  render: () => html`
    <demo-color-formats></demo-color-formats>
  `,
  tags: ['behaviors'],
};

export const ManagedSpace: Story = {
  render: () => html`
    <demo-color-playground
      value="rgb(120, 180, 240)"
      manage-as="hsl"
    ></demo-color-playground>
  `,
  tags: ['behaviors'],
};
