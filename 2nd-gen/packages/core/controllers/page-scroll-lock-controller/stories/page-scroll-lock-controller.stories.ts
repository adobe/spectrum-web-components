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

import { scrollFiller } from './demo-hosts.js';

// ────────────────
//    METADATA
// ────────────────

const args = {
  label: 'Modal surface',
};

const argTypes = {
  label: {
    control: 'text',
    description: 'Visible label for the demo toggle button.',
    table: { category: 'Host', defaultValue: { summary: 'Modal surface' } },
  },
};

/**
 * `PageScrollLockController` is a Lit `ReactiveController` that locks page
 * scroll behind a blocking surface (a modal popover, dialog, or tray) by
 * setting `overflow: hidden` on `document.documentElement`. A component's
 * shadow stylesheet cannot reach `<html>`, so this is done in JS.
 *
 * The lock is reference-counted at module scope so stacked blocking surfaces
 * (a modal opened over another) coordinate a single lock instead of clobbering
 * one another's saved `overflow` value.
 */
const meta: Meta = {
  title: 'Controllers/Page scroll lock controller',
  component: 'demo-scroll-lock-host',
  args,
  argTypes,
  render: (args) => html`
    <demo-scroll-lock-status></demo-scroll-lock-status>
    <demo-scroll-lock-host label=${args.label}></demo-scroll-lock-host>
    ${scrollFiller}
  `,
  parameters: {
    docs: {
      subtitle:
        'Reference-counted document scroll lock for modal blocking surfaces.',
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

export const StackedLocks: Story = {
  render: () => html`
    <demo-scroll-lock-status></demo-scroll-lock-status>
    <demo-scroll-lock-host label="Dialog"></demo-scroll-lock-host>
    <demo-scroll-lock-host label="Nested popover"></demo-scroll-lock-host>
    ${scrollFiller}
  `,
  tags: ['behaviors'],
};
StackedLocks.storyName = 'Stacked locks';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
};
