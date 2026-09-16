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
  delay: 1500,
  closeDelay: 300,
  manual: false,
  disabled: false,
};

const argTypes = {
  delay: {
    control: 'number',
    description:
      'Warm-up duration in milliseconds before the popover opens on hover. `0` opens immediately.',
    table: { category: 'Options', defaultValue: { summary: '1500' } },
  },
  closeDelay: {
    control: 'number',
    description:
      'Cooldown duration in milliseconds after the pointer leaves the trigger or popover. Independent of `delay` so the WCAG 1.4.13 pointer bridge always has time to cancel the close.',
    table: { category: 'Options', defaultValue: { summary: '300' } },
  },
  manual: {
    control: 'boolean',
    description: 'When true, the controller skips all event wiring.',
    table: { category: 'Options', defaultValue: { summary: 'false' } },
  },
  disabled: {
    control: 'boolean',
    description: 'When true, the controller skips all event wiring.',
    table: { category: 'Options', defaultValue: { summary: 'false' } },
  },
};

/**
 * `HoverController` is a Lit `ReactiveController` that manages hover and
 * keyboard-focus event wiring for components that use the native Popover API,
 * such as Tooltip.
 *
 * It encapsulates warm-up and cooldown timing, the
 * [WCAG 1.4.13](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)
 * pointer-to-bubble bridge, and focus-priority logic. Pair with
 * `PlacementController` for pixel-accurate positioning.
 */
const meta: Meta = {
  title: 'Controllers/Hover controller',
  component: 'demo-hover-host',
  args,
  argTypes,
  render: (args) => html`
    <div style="padding: 8px 0;">
      <button id="hover-playground-trigger" class="swc-Button">
        Hover or focus me
      </button>
    </div>
    <demo-hover-host
      trigger-id="hover-playground-trigger"
      delay=${args.delay}
      close-delay=${args.closeDelay}
      ?manual=${args.manual}
      ?disabled=${args.disabled}
    >
      Popover content
    </demo-hover-host>
  `,
  parameters: {
    docs: {
      subtitle:
        'Hover and keyboard-focus wiring with warm-up timing and WCAG 1.4.13 pointer bridge.',
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

export const MultiTypeIsolation: Story = {
  render: () => html`
    <p>Warming type A does not accelerate type B.</p>
    <div style="display: flex; gap: 12px; padding: 8px 0;">
      <button id="isolation-trigger-a" class="swc-Button">
        Type A trigger
      </button>
      <button id="isolation-trigger-b" class="swc-Button">
        Type B trigger (waits full delay)
      </button>
    </div>
    <demo-hover-host trigger-id="isolation-trigger-a" delay="250">
      Type A tooltip
    </demo-hover-host>
    <demo-hover-host-b trigger-id="isolation-trigger-b" delay="250">
      Type B tooltip
    </demo-hover-host-b>
  `,
  tags: ['options'],
};
MultiTypeIsolation.storyName = 'Multi-type warm-state isolation';

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Disabled: Story = {
  render: () => html`
    <div style="padding: 8px 0;">
      <button id="disabled-trigger" class="swc-Button">
        Hover or focus (no popover while disabled)
      </button>
    </div>
    <demo-hover-host trigger-id="disabled-trigger" disabled>
      You should not see this
    </demo-hover-host>
  `,
  args: { disabled: true },
  tags: ['states'],
};

function manualShow(): void {
  (
    document.getElementById('manual-host') as
      | (HTMLElement & {
          showPopover(): void;
        })
      | null
  )?.showPopover();
}

function manualHide(): void {
  (
    document.getElementById('manual-host') as
      | (HTMLElement & {
          hidePopover(): void;
        })
      | null
  )?.hidePopover();
}

export const Manual: Story = {
  render: () => html`
    <div style="padding: 8px 0;">
      <button id="manual-trigger" class="swc-Button">
        Hover or focus (no effect while manual)
      </button>
    </div>
    <demo-hover-host id="manual-host" trigger-id="manual-trigger" manual>
      Programmatically controlled popover
    </demo-hover-host>
    <div style="margin-top: 12px; display: flex; gap: 8px;">
      <button class="swc-Button swc-Button--secondary" @click=${manualShow}>
        showPopover()
      </button>
      <button class="swc-Button swc-Button--secondary" @click=${manualHide}>
        hidePopover()
      </button>
    </div>
  `,
  args: { manual: true },
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const WarmUpAndCooldown: Story = {
  render: () => html`
    <p>
      Hover trigger A to warm up (250 ms demo delay). Once warm, trigger B opens
      immediately.
    </p>
    <div style="display: flex; gap: 12px; padding: 8px 0;">
      <button id="warm-trigger-a" class="swc-Button">Trigger A</button>
      <button id="warm-trigger-b" class="swc-Button">
        Trigger B (opens immediately when warm)
      </button>
    </div>
    <demo-hover-host trigger-id="warm-trigger-a" delay="250">
      Tooltip A
    </demo-hover-host>
    <demo-hover-host trigger-id="warm-trigger-b" delay="250">
      Tooltip B
    </demo-hover-host>
  `,
  tags: ['behaviors'],
};
WarmUpAndCooldown.storyName = 'Warm-up and cooldown timing';

export const PointerBridge: Story = {
  render: () => html`
    <p>
      Hover the trigger, then move the pointer into the popover bubble. The
      popover stays open.
    </p>
    <div style="padding: 8px 0;">
      <button id="bridge-trigger" class="swc-Button">
        Hover me, then move into the bubble above
      </button>
    </div>
    <demo-hover-host trigger-id="bridge-trigger" delay="200">
      Move your pointer here; the popover stays open.
    </demo-hover-host>
  `,
  tags: ['behaviors'],
};
PointerBridge.storyName = 'WCAG 1.4.13 pointer bridge';

export const ImmediateDelay: Story = {
  render: () => html`
    <div style="padding: 8px 0;">
      <button id="immediate-trigger" class="swc-Button">
        Hover me (opens instantly)
      </button>
    </div>
    <demo-hover-host trigger-id="immediate-trigger" delay="0">
      Instant popover
    </demo-hover-host>
  `,
  args: { delay: 0 },
  tags: ['behaviors'],
};
ImmediateDelay.storyName = 'Immediate open with delay="0"';

export const KeyboardFocus: Story = {
  render: () => html`
    <p>Tab to the button to open immediately; Tab away to close.</p>
    <div style="padding: 8px 0;">
      <button id="focus-trigger" class="swc-Button">Tab focus me</button>
    </div>
    <demo-hover-host trigger-id="focus-trigger" delay="1500">
      Opened by keyboard focus
    </demo-hover-host>
  `,
  tags: ['behaviors'],
};
KeyboardFocus.storyName = 'Keyboard focus opens immediately';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
};
