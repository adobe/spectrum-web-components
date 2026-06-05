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

import type { FocusgroupDirection } from '@spectrum-web-components/core/controllers/index.js';

import './demo-hosts.js';

// ────────────────
//    METADATA
// ────────────────

const args = {
  direction: 'horizontal' as FocusgroupDirection,
  wrap: true,
  memory: true,
  skipDisabled: false,
  pageStep: 0,
};

const argTypes = {
  direction: {
    control: 'select',
    options: ['horizontal', 'vertical', 'both', 'grid'],
    description:
      'Arrow-key mode. `both`: Left/Right and Up/Down on the same `getItems()` sequence.',
    table: { category: 'Options', defaultValue: { summary: '(required)' } },
  },
  wrap: {
    control: 'boolean',
    description: 'Wrap at ends.',
    table: { category: 'Options', defaultValue: { summary: 'false' } },
  },
  memory: {
    control: 'boolean',
    description: 'Remember last focused for re-entry via Tab.',
    table: { category: 'Options', defaultValue: { summary: 'true' } },
  },
  skipDisabled: {
    control: 'boolean',
    description: 'Skip `disabled` / `aria-disabled="true"` items.',
    table: { category: 'Options', defaultValue: { summary: 'false' } },
  },
  pageStep: {
    control: 'number',
    description:
      'Page Up / Page Down step size (items for linear modes, rows for grid). `0` disables.',
    table: { category: 'Options', defaultValue: { summary: '0' } },
  },
};

/**
 * `FocusgroupNavigationController` implements the
 * [roving `tabindex` pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#managingfocuswithincomponentsusingarovingtabindex)
 * from the ARIA Authoring Practices Guide (APG) and directional keyboard behavior aligned with
 * the Open UI [`focusgroup` explainer](https://open-ui.org/components/scoped-focusgroup.explainer/).
 * Use it inside Lit-based custom elements (or any `ReactiveElement`) until native `focusgroup` is
 * widely available.
 *
 */
const meta: Meta = {
  title: 'Controllers/Focus group navigation controller',
  component: 'demo-focusgroup-playground',
  args,
  argTypes,
  render: (args) => html`
    <demo-focusgroup-playground
      direction=${args.direction}
      ?wrap=${args.wrap}
      ?memory=${args.memory}
      ?skip-disabled=${args.skipDisabled}
      page-step=${args.pageStep}
    ></demo-focusgroup-playground>
  `,
  parameters: {
    docs: {
      subtitle:
        'Roving tabindex and directional keys for composite widgets (APG-aligned, focusgroup-like).',
      canvas: { sourceState: 'none' },
    },
  },
  tags: ['migrated', 'controller'],
};

export default meta;

type Story = StoryObj;

// ──────────────────────────
//    PLAYGROUND STORY
// ──────────────────────────

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
//    BEHAVIORS STORIES
// ──────────────────────────

export const HorizontalToolbar: Story = {
  render: () => html`
    <demo-focusgroup-horizontal
      role="toolbar"
      aria-label="Text formatting"
    ></demo-focusgroup-horizontal>
  `,
  tags: ['behaviors'],
};

export const BothAxesLinear: Story = {
  render: () => html`
    <demo-focusgroup-both-axes
      role="toolbar"
      aria-label="Segmented controls"
    ></demo-focusgroup-both-axes>
  `,
  tags: ['behaviors'],
};

export const VerticalMenu: Story = {
  render: () => html`
    <demo-focusgroup-vertical
      role="menu"
      aria-label="Edit menu"
    ></demo-focusgroup-vertical>
  `,
  tags: ['behaviors'],
};

export const SkipDisabledMenu: Story = {
  render: () => html`
    <demo-focusgroup-skip-disabled
      role="menu"
      aria-label="File menu (skip disabled)"
    ></demo-focusgroup-skip-disabled>
  `,
  tags: ['behaviors'],
};

export const Grid: Story = {
  render: () => html`
    <demo-focusgroup-grid></demo-focusgroup-grid>
  `,
  tags: ['behaviors'],
};

export const ProgrammaticFocus: Story = {
  render: () => html`
    <demo-focusgroup-programmatic
      focus-target="c"
    ></demo-focusgroup-programmatic>
  `,
  tags: ['behaviors'],
};

export const TextPrefixFocus: Story = {
  render: () => html`
    <demo-focusgroup-text-prefix></demo-focusgroup-text-prefix>
  `,
  tags: ['behaviors'],
};
