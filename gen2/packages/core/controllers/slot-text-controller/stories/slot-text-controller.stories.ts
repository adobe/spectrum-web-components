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
 * `SlotTextController` is a Lit `ReactiveController` that observes whether a slot
 * contains meaningful text or element content. Components use it to switch to an
 * icon-only presentation when no visible label is provided — for example
 * [Badge](../?path=/docs/components-badge--docs) and
 * [Button](../?path=/docs/components-button--docs).
 *
 * It replaces the `ObserveSlotText` mixin. Bind `handleSlotChange` to the
 * observed slot's `@slotchange` event so content added or removed after the
 * first render is tracked; a `characterData` `MutationObserver` additionally
 * catches in-place text edits. Read `hasContent` in `render()`.
 */
const meta: Meta = {
  title: 'Controllers/Slot text controller',
  component: 'demo-slot-text-host',
  render: () => html`
    <demo-slot-text-host>Verified</demo-slot-text-host>
  `,
  parameters: {
    docs: {
      subtitle: 'Tracks whether a slot has meaningful text or element content.',
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
//    BEHAVIORS STORIES
// ──────────────────────────────

export const ContentPresence: Story = {
  render: () => html`
    <demo-slot-text-host>Verified</demo-slot-text-host>
    <demo-slot-text-host></demo-slot-text-host>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['behaviors'],
};
ContentPresence.storyName = 'Content presence';

export const ElementContent: Story = {
  render: () => html`
    <demo-slot-text-host>
      <strong>Rich</strong>
      label
    </demo-slot-text-host>
  `,
  tags: ['behaviors'],
};
ElementContent.storyName = 'Element content';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <demo-slot-text-host>Verified</demo-slot-text-host>
  `,
  tags: ['a11y'],
};
