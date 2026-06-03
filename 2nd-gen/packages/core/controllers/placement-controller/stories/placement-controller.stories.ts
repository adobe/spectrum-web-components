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

import { ALL_PLACEMENTS, type Placement } from '../index.js';

// ────────────────
//    METADATA
// ────────────────

const placements = ALL_PLACEMENTS;

const args = {
  placement: 'bottom' as Placement,
  offset: 0,
  crossOffset: 0,
  containerPadding: 8,
  shouldFlip: true,
};

const argTypes = {
  placement: {
    control: 'select',
    options: placements,
    description:
      'Preferred side and alignment relative to the **trigger** (hyphenated). May differ from the computed value when `shouldFlip` reorients.',
    table: {
      category: 'Options',
      type: { summary: 'Placement' },
      defaultValue: { summary: 'bottom' },
    },
  },
  offset: {
    control: 'number',
    description:
      'Gap along the **placement direction** between trigger and floating element (px). For example, space below the trigger when placement is `bottom`. Not trigger padding. Defaults to `0` so the controller stays neutral — each consuming component sets its own pattern-specific default.',
    table: {
      category: 'Options',
      type: { summary: 'number' },
      defaultValue: { summary: '0' },
    },
  },
  crossOffset: {
    control: 'number',
    description:
      'Slide along the **trigger edge** (px), perpendicular to the placement direction. Adjusts alignments such as `bottom-start` vs `bottom-end`. Not trigger padding.',
    table: {
      category: 'Options',
      type: { summary: 'number' },
      defaultValue: { summary: '0' },
    },
  },
  containerPadding: {
    control: 'number',
    description:
      'Minimum inset (px) from the overflow boundary used for collision detection. Defaults to clipping ancestors capped by the visual viewport; not trigger gap.',
    table: {
      category: 'Options',
      type: { summary: 'number' },
      defaultValue: { summary: '8' },
    },
  },
  shouldFlip: {
    control: 'boolean',
    description:
      'When `true`, flip to the opposite side if the requested placement does not fit within the overflow boundary. When `false`, keep the requested side even if it overflows.',
    table: {
      category: 'Options',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
  },
} satisfies Meta['argTypes'];

/**
 * `PlacementController` positions a floating element relative to a trigger using
 * [Floating UI](https://floating-ui.com/) (`computePosition` + `autoUpdate`).
 *
 * The controller owns **geometry only** — open/close lifecycle, ARIA, focus, and dismissal
 * remain the caller's responsibility.
 */
const meta: Meta = {
  title: 'Controllers/Placement controller',
  component: 'demo-placement-playground',
  args,
  argTypes,
  render: (a) => html`
    <demo-placement-playground
      placement=${a.placement}
      offset=${a.offset}
      cross-offset=${a.crossOffset}
      container-padding=${a.containerPadding}
      ?should-flip=${a.shouldFlip}
    ></demo-placement-playground>
  `,
  parameters: {
    docs: {
      subtitle:
        'Floating UI-backed positioning for anchored floating elements.',
      canvas: { sourceState: 'none' },
    },
  },
  tags: ['migrated', 'controller'],
};

export default meta;

type Story = StoryObj;

// ──────────────────────────
//    AUTODOCS STORY
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

export const Interactive: Story = {
  render: () => html`
    <demo-placement-interactive></demo-placement-interactive>
  `,
  tags: ['behaviors'],
};

export const Offset: Story = {
  render: () => html`
    <demo-placement-offset></demo-placement-offset>
  `,
  tags: ['behaviors'],
};

export const SizeExposesAvailableSpace: Story = {
  render: () => html`
    <demo-placement-constrain-size></demo-placement-constrain-size>
  `,
  tags: ['behaviors'],
};

export const VirtualTrigger: Story = {
  render: () => html`
    <demo-placement-virtual-trigger></demo-placement-virtual-trigger>
  `,
  tags: ['behaviors'],
};

export const Arrow: Story = {
  render: () => html`
    <demo-placement-arrow></demo-placement-arrow>
  `,
  tags: ['behaviors'],
};
