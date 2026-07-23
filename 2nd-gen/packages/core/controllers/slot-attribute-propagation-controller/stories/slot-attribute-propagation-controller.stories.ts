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

import type { DemoSlotPropagationOptional } from './demo-hosts.js';

// ────────────────
//    METADATA
// ────────────────

const args = {
  size: 'm',
};

const argTypes = {
  size: {
    control: 'text',
    description:
      'The attribute value propagated to assigned elements. In this demo the propagated attribute is `size`.',
    table: { category: 'Options', defaultValue: { summary: 'm' } },
  },
};

/**
 * `SlotAttributePropagationController` is a Lit `ReactiveController` that
 * propagates a host attribute to elements assigned to one of its slots. It's
 * used by components such as `ButtonGroup` and `IllustratedMessage` to keep
 * slotted children (buttons, actions) in sync with a host attribute like
 * `size` without each component re-implementing the same slot-observation
 * logic.
 */
const meta: Meta = {
  title: 'Controllers/Slot attribute propagation controller',
  component: 'demo-slot-propagation-default',
  args,
  argTypes,
  render: (args) => html`
    <demo-slot-propagation-default size=${args.size}>
      <button class="swc-Button">Save</button>
      <button class="swc-Button">Cancel</button>
    </demo-slot-propagation-default>
  `,
  parameters: {
    docs: {
      subtitle: 'Propagates a host attribute to elements assigned to a slot.',
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

export const DefaultSlot: Story = {
  render: (args) => html`
    <demo-slot-propagation-default size=${args.size}>
      <button class="swc-Button">Save</button>
      <button class="swc-Button">Cancel</button>
    </demo-slot-propagation-default>
  `,
  tags: ['options'],
};
DefaultSlot.storyName = 'Default slot';

export const NamedSlot: Story = {
  render: (args) => html`
    <demo-slot-propagation-named size=${args.size}>
      <p>Default-slot content does not receive the propagated attribute.</p>
      <button slot="actions" class="swc-Button">Browse files</button>
    </demo-slot-propagation-named>
  `,
  tags: ['options'],
};
NamedSlot.storyName = 'Named slot';

export const Selector: Story = {
  render: () => html`
    <demo-slot-propagation-selector variant="accent">
      <button class="swc-Button target">Matches .target</button>
      <button class="swc-Button">Does not match</button>
    </demo-slot-propagation-selector>
  `,
  tags: ['options'],
};
Selector.storyName = 'Selector filtering';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

function addDynamicItem(): void {
  const host = document.getElementById('dynamic-slotting-host');
  if (!host) {
    return;
  }
  const button = document.createElement('button');
  button.className = 'swc-Button';
  button.textContent = `Item ${host.querySelectorAll('button').length + 1}`;
  host.appendChild(button);
}

export const DynamicSlotting: Story = {
  render: (args) => html`
    <demo-slot-propagation-default id="dynamic-slotting-host" size=${args.size}>
      <button class="swc-Button">Existing item</button>
    </demo-slot-propagation-default>
    <div style="margin-top: 12px;">
      <button class="swc-Button swc-Button--secondary" @click=${addDynamicItem}>
        Add item
      </button>
    </div>
  `,
  tags: ['behaviors'],
};
DynamicSlotting.storyName = 'Propagates to dynamically added elements';

function toggleInvalid(): void {
  const host = document.getElementById(
    'optional-attribute-host'
  ) as DemoSlotPropagationOptional | null;
  if (!host) {
    return;
  }
  host.invalid = !host.invalid;
}

export const OptionalAttributeRemoval: Story = {
  render: () => html`
    <demo-slot-propagation-optional id="optional-attribute-host">
      <input
        class="swc-Textfield"
        aria-label="Email address"
        placeholder="you@example.com"
      />
    </demo-slot-propagation-optional>
    <div style="margin-top: 12px;">
      <button class="swc-Button swc-Button--secondary" @click=${toggleInvalid}>
        Toggle invalid
      </button>
    </div>
  `,
  tags: ['behaviors'],
};
OptionalAttributeRemoval.storyName = 'Optional attributes';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
};
