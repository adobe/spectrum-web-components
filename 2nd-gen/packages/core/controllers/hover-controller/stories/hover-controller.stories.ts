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
  manual: false,
  disabled: false,
};

const argTypes = {
  delay: {
    control: 'number',
    description:
      'Warm-up and cooldown duration in milliseconds. `0` opens and closes immediately.',
    table: { category: 'Options', defaultValue: { summary: '1500' } },
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
 * pointer-to-bubble bridge, and focus-priority logic that suppresses
 * pointer-driven timers whenever the trigger holds keyboard focus.
 *
 * **Focus priority (keyboard only)**: When the trigger receives keyboard focus
 * (Tab / Shift+Tab), the popover opens immediately and the controller enters
 * focus-priority mode: all pointer events on the trigger and popover are ignored
 * until `focusout` fires. Pointer-click focus is excluded; see Limitation below.
 *
 * **Pointer-click focus**: A pointer click on the trigger does not open the
 * popover. `pointerdown` on the trigger is outside the popover's surface, so
 * `popover="auto"` fires a light dismiss synchronously; opening on the
 * subsequent `focusin` would cause an immediate visible flash. Components that
 * need click-to-toggle should use `manual` mode.
 *
 * The controller does **not** resolve trigger elements, wire ARIA relationships,
 * or dispatch lifecycle events. Those responsibilities stay with the consuming
 * component. For pixel-accurate placement relative to the trigger (flipping
 * sides when near viewport edges, overflow detection, and arrow positioning)
 * pair with `PlacementController`.
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

// ──────────────────────────
//    AUTODOCS STORY
// ──────────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────
//    BASIC USAGE STORY
// ──────────────────────────

/**
 * ## What it does
 *
 * - **Warm-up / cooldown timing**: The popover opens only after the pointer has
 *   rested on the trigger for `delay` ms. Leaving starts a matching cooldown before
 *   close. Set `delay="0"` for immediate open and close.
 * - **Warm-state acceleration**: Once any instance of a component type has opened,
 *   subsequent hovers on the same type open immediately without re-timing. Warm state
 *   resets after the cooldown elapses.
 * - **WCAG 1.4.13 pointer bridge**: Moving the pointer from the trigger into the
 *   popover cancels the cooldown, keeping the popover open so users can interact with
 *   its content.
 * - **Keyboard focus priority**: `Tab` focus opens immediately and suppresses all
 *   pointer-driven timers until `focusout`.
 * - **Pointer-click exclusion**: A pointer click on the trigger does not open the
 *   popover. `popover="auto"` fires a light dismiss on `pointerdown` (the trigger is
 *   outside the popover surface); opening on the subsequent `focusin` would cause a
 *   visible flash. The controller detects this sequence and skips the open.
 *
 * ## Basic usage
 *
 * 1. Implement `HoverControllerHost` on your element (`delay`, `manual`, `disabled`,
 *    `showPopover`, `hidePopover`). The host must have `popover` set so it participates
 *    in the native Popover API.
 * 2. Construct the controller in the host's `constructor`.
 * 3. Resolve the trigger element and call `setTarget()` from `updated()` whenever it
 *    changes. The controller does not resolve trigger elements itself.
 * 4. Wire ARIA relationships (`aria-describedby` / `aria-labelledby`) in the host on
 *    `open` change — the controller does not set ARIA attributes.
 *
 * ```typescript
 * import { LitElement, type PropertyValues } from 'lit';
 * import { property } from 'lit/decorators.js';
 * import {
 *   HoverController,
 *   type HoverControllerHost,
 * } from '@spectrum-web-components/core/controllers/hover-controller.js';
 *
 * class SwcTooltip extends LitElement implements HoverControllerHost {
 *   @property({ type: Number }) delay = 1500;
 *   @property({ type: Boolean }) manual = false;
 *   @property({ type: Boolean }) disabled = false;
 *
 *   private triggerElement: HTMLElement | null = null;
 *
 *   private readonly hoverController = new HoverController(this, {
 *     warmStateKey: 'swc-tooltip',
 *   });
 *
 *   protected override updated(changes: PropertyValues): void {
 *     super.updated(changes);
 *     if (changes.has('triggerElement')) {
 *       this.hoverController.setTarget(this.triggerElement ?? null);
 *     }
 *   }
 * }
 * ```
 */
export const Usage: Story = {
  tags: ['usage', 'description-only'],
};

// ──────────────────────────────
//    OPTIONS STORIES
// ──────────────────────────────

/**
 * Warm state is stored per component type using the `warmStateKey` option.
 * Two controllers with different keys are completely independent: warming one
 * type does not accelerate warm-up for the other.
 *
 * Hover trigger A until the tooltip opens (250 ms). Then hover trigger B; it
 * still waits the full 250 ms because its warm state is independent.
 */
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

/**
 * When `disabled` is set on the host, the controller skips all event wiring. Pointer
 * and focus events on the trigger have no effect. Setting `disabled = false` at runtime
 * re-enables wiring without a page reload.
 */
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

/**
 * When `manual` is set on the host, the controller skips all event wiring. The
 * consuming component is responsible for calling `showPopover()` / `hidePopover()`
 * programmatically. Hover and focus events on the trigger have no effect.
 */
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

/**
 * When `delay > 0`, the popover opens only after the pointer has rested on the
 * trigger for the full warm-up duration.
 *
 * Once the popover has opened, warm state is set to `true` and shared across all
 * instances of the same component type on the page. A second hover on any other
 * trigger of the same type opens immediately without re-timing.
 *
 * Warm state resets after the pointer leaves and the cooldown timer (same duration)
 * elapses without the pointer re-entering a trigger or the popover bubble.
 */
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

/**
 * When the pointer moves from the trigger into the popover bubble, the popover stays
 * open. This satisfies the "hoverable" requirement of
 * [WCAG 1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html).
 */
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

/**
 * When `delay` is `0`, the popover opens and closes synchronously on
 * `pointerenter` / `pointerleave` without starting any timer.
 */
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

/**
 * When the trigger receives keyboard focus (Tab / Shift+Tab), the popover opens
 * immediately without waiting for the warm-up timer. The controller enters
 * focus-priority mode: `pointerenter` and `pointerleave` events on both the trigger
 * and the popover bubble are ignored until `focusout` fires. `focusout` closes
 * immediately and restores normal pointer behaviour.
 *
 * **Pointer-click focus is excluded**: A pointer click on the trigger does not open
 * the popover. `pointerdown` on the trigger fires a `popover="auto"` light dismiss
 * synchronously; opening on the subsequent `focusin` would immediately be reversed,
 * producing a visible flash.
 */
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

// ──────────────────────────
//    API STORY
// ──────────────────────────

/**
 * ### Methods
 *
 * | Member | Description |
 * |---|---|
 * | `setTarget(trigger)` | Sets the element that receives pointer and focus listeners. Call from `updated()` whenever the resolved trigger changes. Passing `null` detaches all listeners from the previous target. |
 *
 * ### Constructor options (`HoverControllerOptions`)
 *
 * | Option | Type | Description |
 * |---|---|---|
 * | `warmStateKey` | `string` | Per-component-type key for shared warm state on `document`. Use the element tag name (e.g. `'swc-tooltip'`). Must be static; must not vary per instance. |
 *
 * ### Host interface (`HoverControllerHost`)
 *
 * The host element must implement this interface. All members are read by the
 * controller; none are written.
 *
 * | Member | Type | Description |
 * |---|---|---|
 * | `delay` | `number` | Warm-up and cooldown duration in ms. `0` opens and closes immediately. |
 * | `manual` | `boolean` | When `true`, the controller skips all event wiring. |
 * | `disabled` | `boolean` | When `true`, the controller skips all event wiring. |
 * | `showPopover()` | method | Called by the controller to open the popover. |
 * | `hidePopover()` | method | Called by the controller to close the popover. |
 *
 * See the Controls table above for interactive demos of `delay`, `manual`, and
 * `disabled`.
 */
export const API: Story = {
  tags: ['api', 'description-only'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * `HoverController` implements two built-in accessibility behaviours:
 *
 * 1. **WCAG 1.4.13 pointer bridge**: The popover remains open when the pointer
 *    moves from the trigger into the popover bubble, satisfying the "hoverable"
 *    requirement of
 *    [WCAG 1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html).
 *    Users who need to interact with the popover content (e.g. to copy text or
 *    follow a link) can do so without the popover closing.
 *
 * 2. **Keyboard focus opens immediately**: Tab focus bypasses the warm-up timer
 *    and opens the popover at once. While the trigger is focused, pointer events
 *    on both the trigger and the popover are suppressed, preventing them from
 *    inadvertently starting cooldown timers.
 *
 * ### Best practices
 *
 * - Pair with a `PlacementController` so the popover is always visible and
 *   positioned relative to the trigger, even near viewport edges.
 * - Set `warmStateKey` to the consuming element's tag name (e.g. `'swc-tooltip'`)
 *   to isolate warm state per component type.
 * - Use `manual` mode for programmatic control; the consuming component is then
 *   responsible for ARIA relationships and calling `showPopover()` /
 *   `hidePopover()` at the right times.
 */
export const Accessibility: Story = {
  tags: ['a11y'],
};
