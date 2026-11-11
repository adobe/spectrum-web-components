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
 * `TriggerPressController` is a Lit `ReactiveController` that wires
 * click-to-toggle on a trigger for a native light-dismissible surface
 * (`popover="auto"`, a non-modal `<dialog>`) without the surface reopening on
 * the same click that was meant to close it.
 */
const meta: Meta = {
  title: 'Controllers/Trigger press controller',
  component: 'demo-press-guard-host',
  render: () => html`
    <demo-press-guard-host></demo-press-guard-host>
  `,
  parameters: {
    docs: {
      subtitle:
        'Click-to-toggle for a light-dismissible surface without the reopen bug.',
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
  render: () => html`
    <demo-press-guard-host></demo-press-guard-host>
  `,
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

// Click the button, then click it again: the popover closes instead of
// reopening, even though pressing the trigger while open light-dismisses it
// before the trailing click fires.
export const ReclickCloses: Story = {
  tags: ['behaviors'],
};
ReclickCloses.storyName = 'Re-click closes';

// Same markup, but the trigger uses a naive `open = !open` click handler
// instead of the controller. Click the button, then click it again: the
// naive handler reads `open` as already `false` (the light-dismiss already
// closed it) and flips it back to `true`, reopening the popover.
export const NaiveReopenBug: Story = {
  render: () => html`
    <demo-press-guard-host naive></demo-press-guard-host>
  `,
  tags: ['behaviors'],
};
NaiveReopenBug.storyName = 'Naive reopen bug';
