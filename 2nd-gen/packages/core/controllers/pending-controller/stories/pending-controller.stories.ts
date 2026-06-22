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
  pending: false,
  pendingLabel: '',
  label: 'Save',
};

const argTypes = {
  pending: {
    control: 'boolean',
    description:
      'Whether the host is busy. The spinner activates after the delay; ARIA updates immediately.',
    table: { category: 'Host', defaultValue: { summary: 'false' } },
  },
  pendingLabel: {
    control: 'text',
    description:
      'Explicit busy label. When empty, the controller derives `"<label>, busy"`.',
    table: { category: 'Host', defaultValue: { summary: '' } },
  },
  label: {
    control: 'text',
    description: 'Visible text and source of the resolved accessible name.',
    table: { category: 'Host', defaultValue: { summary: 'Save' } },
  },
};

/**
 * `PendingController` is a Lit `ReactiveController` that manages a host's pending
 * (busy) *state*: it activates the busy visual only after a delay so the host
 * does not flash for quick operations, freezes the host's inline size to avoid
 * layout shift, and derives the busy accessible name.
 *
 * Rendering is decoupled: read `pendingActive` and render the indicator with the
 * `renderPendingSpinner` directive from
 * `@spectrum-web-components/core/directives/pending-spinner`. For button-like
 * elements, `PendingMixin` (`@spectrum-web-components/core/mixins`) wires the
 * controller, properties, and click suppression together.
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
      label=${args.label}
    ></demo-pending-host>
  `,
  parameters: {
    docs: {
      subtitle:
        'Delayed busy state with inline-size freeze and derived accessible name.',
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
  args: { pending: true },
  tags: ['overview'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const DelayedActivation: Story = {
  render: () => html`
    <demo-pending-host pending label="Uploading"></demo-pending-host>
  `,
  tags: ['behaviors'],
};
DelayedActivation.storyName = 'Delayed activation';

export const DerivedAccessibleName: Story = {
  render: () => html`
    <demo-pending-host pending label="Save"></demo-pending-host>
    <demo-pending-host
      pending
      label="Save"
      pending-label="Processing your request"
    ></demo-pending-host>
  `,
  tags: ['behaviors'],
};
DerivedAccessibleName.storyName = 'Derived accessible name';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  args: { pending: true, label: 'Save' },
  tags: ['a11y'],
};
