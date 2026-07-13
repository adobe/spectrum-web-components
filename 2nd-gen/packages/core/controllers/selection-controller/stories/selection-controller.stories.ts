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

/**
 * `SelectionController` is a Lit `ReactiveController` that manages click- and keyboard-driven
 * selection for a group of sibling elements — tabs, radio groups, and segmented "view switcher"
 * button groups. It owns capture-phase `click` (and, optionally, Enter/Space `keydown`) on its
 * host, keeps an internal cache of what's selected, and supports two modes: `single` and
 * `single-toggle`.
 *
 * This controller is the click-owning, cache-authoritative half of selection management. For
 * self-owning items — elements that can change their own selected-ish state independently, like
 * an accordion item with its own `open` property — see `LiveSelectionController` instead (see
 * the "When to use this controller" section on this page).
 */
const meta: Meta = {
  title: 'Controllers/Selection controller',
  component: 'demo-selection-view-switcher',
  render: () => html`
    <demo-selection-view-switcher></demo-selection-view-switcher>
  `,
  parameters: {
    docs: {
      subtitle:
        'Click- and keyboard-driven selection bookkeeping for tabs, radio groups, and button groups.',
    },
    layout: 'centered',
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
//    OPTIONS STORIES
// ──────────────────────────────

export const SingleMode: Story = {
  render: () => html`
    <demo-selection-view-switcher></demo-selection-view-switcher>
  `,
  tags: ['options'],
};
SingleMode.storyName = 'Single mode';

export const SingleToggleMode: Story = {
  render: () => html`
    <demo-selection-priority></demo-selection-priority>
  `,
  tags: ['options'],
};
SingleToggleMode.storyName = 'Single-toggle mode';

export const ModeSwitching: Story = {
  render: () => html`
    <demo-selection-mode-switcher></demo-selection-mode-switcher>
  `,
  tags: ['options'],
};
ModeSwitching.storyName = 'Mode switching';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TablistPattern: Story = {
  render: () => html`
    <demo-selection-tablist></demo-selection-tablist>
  `,
  tags: ['behaviors'],
};
TablistPattern.storyName = 'Tablist pattern';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <demo-selection-view-switcher></demo-selection-view-switcher>
  `,
  tags: ['a11y'],
};

// ────────────────────────────────
//    TEST-ONLY FIXTURES
// ────────────────────────────────

/**
 * Test-only fixture for eligibility exclusion (disabled, hidden, custom
 * `isDisabled`). Not part of the documented section flow — excluded from the
 * dev sidebar and not referenced by any `<Canvas>` in the per-unit MDX.
 */
export const Eligibility: Story = {
  render: () => html`
    <demo-selection-eligibility></demo-selection-eligibility>
  `,
  tags: ['!dev'],
};
