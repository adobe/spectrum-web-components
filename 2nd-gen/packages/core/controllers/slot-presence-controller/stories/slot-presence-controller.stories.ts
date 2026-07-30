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
 * `SlotPresenceController` is a Lit `ReactiveController` that observes whether
 * slotted content matching one or more CSS selectors is present in the host's
 * light DOM. It replaces the `ObserveSlotPresence` mixin so components can gate
 * shadow-DOM markup (icon containers, action groups) on slotted content without
 * deepening the mixin chain.
 *
 * A `MutationObserver` watches the host's subtree for `childList` changes, so
 * presence updates automatically as slotted elements are added or removed — no
 * `@slotchange` binding required. Read `isPresent` for a single selector, or
 * `getPresence(selector)` when observing several.
 */
const meta: Meta = {
  title: 'Controllers/Slot presence controller',
  component: 'demo-slot-presence-host',
  render: () => html`
    <demo-slot-presence-host>
      <svg slot="icon" viewBox="0 0 18 18" aria-hidden="true" width="18">
        <path
          fill="currentColor"
          d="M15.6 4.4 7 13l-4.6-4.6 1.4-1.4L7 10.2l7.2-7.2z"
        />
      </svg>
      Verified
    </demo-slot-presence-host>
  `,
  parameters: {
    docs: {
      subtitle:
        'Tracks whether slotted content matching CSS selectors is present in the light DOM.',
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

export const IconPresent: Story = {
  render: () => html`
    <demo-slot-presence-host>
      <svg slot="icon" viewBox="0 0 18 18" aria-hidden="true" width="18">
        <path
          fill="currentColor"
          d="M15.6 4.4 7 13l-4.6-4.6 1.4-1.4L7 10.2l7.2-7.2z"
        />
      </svg>
      Verified
    </demo-slot-presence-host>
    <demo-slot-presence-host>No icon slotted</demo-slot-presence-host>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['behaviors'],
};
IconPresent.storyName = 'Single selector';

export const MultipleSelectors: Story = {
  render: () => html`
    <demo-slot-presence-multi-host>
      <span slot="label">Uploading</span>
      <span slot="description">3 of 10 files</span>
    </demo-slot-presence-multi-host>
    <demo-slot-presence-multi-host>
      <span slot="label">Uploading</span>
    </demo-slot-presence-multi-host>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['behaviors'],
};
MultipleSelectors.storyName = 'Multiple selectors';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <demo-slot-presence-host>
      <svg slot="icon" viewBox="0 0 18 18" aria-hidden="true" width="18">
        <path
          fill="currentColor"
          d="M15.6 4.4 7 13l-4.6-4.6 1.4-1.4L7 10.2l7.2-7.2z"
        />
      </svg>
      Verified
    </demo-slot-presence-host>
  `,
  tags: ['a11y'],
};
