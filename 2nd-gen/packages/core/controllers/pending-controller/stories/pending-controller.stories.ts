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
  pending: true,
  pendingLabel: '',
  label: 'Save',
};

const argTypes = {
  pending: {
    control: 'boolean',
    description:
      'Whether the host is in a pending (busy) state. The host stays focusable but activation is suppressed.',
    table: { category: 'Options', defaultValue: { summary: 'false' } },
  },
  pendingLabel: {
    control: 'text',
    description:
      'Explicit accessible label used while pending. When empty, the controller derives `"<name>, busy"` from the resolved non-busy name.',
    table: { category: 'Options', defaultValue: { summary: '""' } },
  },
  label: {
    control: 'text',
    description: 'Visible label of the demo button.',
    table: { category: 'Options', defaultValue: { summary: 'Save' } },
  },
};

/**
 * `PendingController` is a Lit `ReactiveController` that manages the pending
 * (busy) state of a host element: it activates the busy visual after a short
 * delay so quick operations do not flash, freezes the host's inline size while
 * busy, derives the pending accessible name, and renders an animated spinner.
 *
 * It is used by [Button](../?path=/docs/button--docs) and is reusable by any
 * component that exposes a `pending` state. The accessible name and
 * `aria-disabled` are applied by the host's own template (keyed off `pending`)
 * for an immediate response; the controller exposes `getPendingAccessibleName()`
 * for the host to read.
 */
const meta: Meta = {
  title: 'Controllers/Pending controller',
  component: 'demo-pending-host',
  args,
  argTypes,
  render: (args) => html`
    <demo-pending-host
      ?pending=${args.pending}
      pending-label=${args.pendingLabel}
      .label=${args.label}
    ></demo-pending-host>
  `,
  parameters: {
    docs: {
      subtitle:
        'Delayed busy visual, inline-size freeze, derived busy label, and animated spinner.',
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

export const DelayedActivation: Story = {
  render: () => html`
    <demo-pending-host pending .label=${'Uploading'}></demo-pending-host>
  `,
  tags: ['behaviors'],
};
DelayedActivation.storyName = 'Delayed activation';

export const DerivedBusyName: Story = {
  render: () => html`
    <demo-pending-host pending .label=${'Save'}></demo-pending-host>
  `,
  tags: ['behaviors'],
};
DerivedBusyName.storyName = 'Derived busy name';

export const ExplicitPendingLabel: Story = {
  render: () => html`
    <demo-pending-host
      pending
      .label=${'Save'}
      pending-label="Processing your request"
    ></demo-pending-host>
  `,
  tags: ['behaviors'],
};
ExplicitPendingLabel.storyName = 'Explicit pending label';

export const FocusRetained: Story = {
  render: () => html`
    <demo-pending-host click-pending .label=${'Save'}></demo-pending-host>
  `,
  tags: ['behaviors'],
};
FocusRetained.storyName = 'Focus retained on re-render';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <demo-pending-host pending .label=${'Save'}></demo-pending-host>
  `,
  tags: ['a11y'],
};
