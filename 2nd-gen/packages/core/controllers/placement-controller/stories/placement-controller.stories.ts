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
  constrainSize: false,
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
      'Minimum inset (px) from the overflow boundary for `flip`, `shift`, and `size`. Defaults to clipping ancestors capped by the visual viewport; not trigger gap.',
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
  constrainSize: {
    control: 'boolean',
    description:
      'When `true`, sets `maxHeight` / `maxWidth` on the floating element so long content scrolls inside the viewport.',
    table: {
      category: 'Options',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
} satisfies Meta['argTypes'];

const controllerApi = {
  methods: [
    {
      member: 'start(trigger, floating, options?)',
      description:
        'Begin positioning; tear down any prior session and subscribe to Floating UI `autoUpdate`. Skips compute when the floating element has zero dimensions until size is available.',
    },
    {
      member: 'stop()',
      description:
        'Tear down positioning, unsubscribe from `autoUpdate`, and clear `actualPlacement` and `isConstrained`. Called from `hostDisconnected` when the Lit host disconnects.',
    },
    {
      member: 'recompute()',
      description:
        'Force one `computePosition` pass outside `autoUpdate` — for example after floating content reflows or a virtual trigger moves without layout events. No-op if not started.',
    },
  ],
  readonlyProperties: [
    {
      name: 'actualPlacement',
      type: 'Placement or null',
      description:
        'Computed placement after `flip` (hyphenated). `null` when stopped.',
    },
    {
      name: 'isConstrained',
      type: 'boolean',
      description:
        'Whether `constrainSize` clamped height on the last compute.',
    },
  ],
  additionalOptions: [
    {
      name: 'onPlacementChange',
      type: 'callback',
      default: '—',
      description:
        'Called when computed placement changes. Receives the hyphenated `Placement`.',
    },
  ],
  types: [
    {
      name: 'Placement',
      description: 'Hyphenated placement union (22 values).',
    },
    {
      name: 'VirtualTrigger',
      description:
        '{ getBoundingClientRect(): DOMRect; contextElement?: Element }',
    },
  ],
};

/**
 * `PlacementController` positions a floating element relative to a trigger using
 * [Floating UI](https://floating-ui.com/) (`computePosition` + `autoUpdate`). Use it inside
 * Lit-based custom elements for popover, picker, menu, tooltip, and other anchored
 * floating UI patterns.
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
      ?constrain-size=${a.constrainSize}
    ></demo-placement-playground>
  `,
  parameters: {
    controllerApi,
    docs: {
      subtitle:
        'Floating UI-backed positioning for popover, picker, menu, and other anchored patterns.',
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
 * ### Positioning
 *
 * - Computes `top`, `left`, and `translate` on the **floating element** using
 *   `strategy: 'fixed'` (suitable for native popover top-layer surfaces).
 * - Subscribes to scroll, resize, and layout shift via Floating UI's `autoUpdate` while
 *   `PlacementController.start` is active.
 * - Waits for `document.fonts.ready` and applies iOS WebKit `visualViewport` correction
 *   before measuring.
 *
 * ### Middleware stack
 *
 * 1. **`offset`** — trigger-relative gap along the placement direction (`offset` option) and along the trigger edge (`crossOffset` option).
 * 2. **`flip`** (when `shouldFlip: true`) — reorients when there is not enough room, respecting `containerPadding` inset from the overflow boundary.
 * 3. **`shift`** — slides the floating element along the axis to stay inside the boundary, using `containerPadding` as inset.
 * 4. **`size`** (when `constrainSize: true`) — clamps `maxHeight` / `maxWidth` for scrollable lists.
 *
 * ### What the caller owns
 *
 * - Showing and hiding the floating surface (`showPopover`, `hidden`, etc.).
 * - ARIA (`aria-controls`, `aria-expanded`, focus trap, escape dismissal).
 * - Placement styling — use `onPlacementChange` to apply CSS modifier classes; the controller
 *   does **not** write `placement` attributes on the floating element.
 *
 * ## Basic usage
 *
 * 1. Construct the controller in your element's constructor: `new PlacementController(this)`.
 * 2. When positioning starts, call `start(trigger, floating, options)`.
 * 3. When it closes or the host disconnects, call `stop()` (also runs from `hostDisconnected`).
 * 4. Call `recompute()` when floating content reflows without a layout event the controller
 *    would observe.
 *
 * ```typescript
 * import { LitElement, html } from 'lit';
 * import { customElement, query } from 'lit/decorators.js';
 * import { PlacementController } from
 *   '@spectrum-web-components/core/controllers/placement-controller.js';
 *
 * @customElement('my-picker')
 * export class MyPicker extends LitElement {
 *   @query('#trigger') trigger!: HTMLButtonElement;
 *   @query('#listbox') listbox!: HTMLDivElement;
 *
 *   private placement = new PlacementController(this);
 *   actualPlacement: Placement = 'bottom';
 *
 *   open(): void {
 *     this.listbox.hidden = false;
 *     this.placement.start(this.trigger, this.listbox, {
 *       placement: 'bottom-start',
 *       onPlacementChange: (p) => {
 *         this.actualPlacement = p;
 *       },
 *     });
 *   }
 *
 *   close(): void {
 *     this.placement.stop();
 *     this.listbox.hidden = true;
 *   }
 * }
 * ```
 */
export const Usage: Story = {
  tags: ['usage', 'description-only'],
};

// ──────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────

/**
 * Pass **`placement`** to choose the preferred side and alignment **relative to the trigger**
 * in hyphenated form (`'bottom'`, `'bottom-start'`, `'top-end'`, etc.; 22 values total).
 * This is the **requested** placement — when **`shouldFlip`** is enabled, Floating UI may
 * compute a different side; read **`actualPlacement`** or use **`onPlacementChange`** for the
 * result after **`flip`**.
 *
 * Logical alignments (`bottom-start`, `top-end`) reverse in RTL via CSS at the consumer layer;
 * physical alignments (`bottom-left`, `left-top`) stay fixed. Logical sides (`start`, `end`,
 * `start-top`) normalize to physical left/right for `computePosition`.
 *
 * ```typescript
 * this.placement.start(this.trigger, this.panel, {
 *   placement: 'bottom-start',
 * });
 * ```
 */
export const RequestedPlacement: Story = {
  tags: ['behaviors', 'description-only'],
  parameters: { 'section-order': 1 },
};

/**
 * Use **`offset`** for gap along the **placement direction** between trigger and floating
 * element (for example 8 px below the trigger when placement is `'bottom'`). Use
 * **`crossOffset`** to slide along the **trigger edge**, perpendicular to that direction
 * (for example nudge a `'bottom-start'` panel further toward the trigger's start edge).
 *
 * Neither option sets boundary inset — use **`containerPadding`** for inset from the
 * overflow boundary when **`flip`** or **`shift`** runs.
 *
 * ```typescript
 * this.placement.start(this.trigger, this.panel, {
 *   offset: 48,
 * });
 *
 * this.placement.start(this.trigger, this.panel, {
 *   crossOffset: 48,
 * });
 * ```
 */
export const Offset: Story = {
  tags: ['behaviors'],
  render: () => html`
    <demo-placement-offset></demo-placement-offset>
  `,
  parameters: { 'section-order': 2 },
};

/**
 * Use **`containerPadding`** for minimum inset from the **overflow boundary** (px) — **not** the gap from the trigger. Passed as `padding` to Floating UI **`flip`**, **`shift`**, and (when **`constrainSize`** is enabled) **`size`** middleware.
 *
 * By default, Floating UI uses clipping ancestors capped by the **visual viewport** as that boundary. For typical fixed or top-layer surfaces, this behaves like screen-edge inset. Inside a scrollable clipping parent, inset is measured from that container's edges instead.
 *
 * Use the playground **Container padding** control with the trigger near an edge to see **`flip`** and **`shift`** keep the panel further inside the boundary.
 *
 * ```typescript
 * this.placement.start(this.trigger, this.panel, {
 *   containerPadding: 32,
 * });
 * ```
 */
export const ContainerPadding: Story = {
  tags: ['behaviors', 'description-only'],
  parameters: { 'section-order': 3 },
};

/**
 * With **`shouldFlip: true`** (default), Floating UI **`flip`** middleware may move the floating
 * element to the **opposite side** when the requested **`placement`** does not fit within the
 * overflow boundary. Typical for popovers, menus, and pickers that must stay fully visible.
 * **`actualPlacement`** and **`onPlacementChange`** reflect the computed side after flip.
 *
 * With **`shouldFlip: false`**, the floating element stays on the requested side even if it
 * overflows — useful for tooltips that must never jump above the trigger, or when a pointer /
 * design asset is tied to a specific side. Disabling flip does **not** disable **`shift`**;
 * the panel may still slide along an axis to reduce clipping.
 *
 * ```typescript
 * // Popover / menu — flip when needed
 * this.placement.start(this.trigger, this.panel, {
 *   shouldFlip: true,
 * });
 *
 * // Tooltip — stay on requested side
 * this.placement.start(this.trigger, this.tip, {
 *   shouldFlip: false,
 * });
 * ```
 */
export const ShouldFlip: Story = {
  tags: ['behaviors'],
  render: () => html`
    <demo-placement-flip></demo-placement-flip>
    <demo-placement-no-flip></demo-placement-no-flip>
  `,
  parameters: { 'section-order': 4 },
};

/**
 * With **`constrainSize: true`**, Floating UI **`size`** middleware sets inline
 * **`maxHeight`** and **`maxWidth`** on the floating element so long list content scrolls
 * inside the viewport instead of overflowing off-screen. Readonly **`isConstrained`** is
 * `true` when height was clamped on the last compute.
 *
 * Use for picker, menu, and combobox list surfaces. Leave disabled for compact popovers and
 * tooltips. Opt-in — hosts enable it only when their content can overflow.
 *
 * ```typescript
 * this.placement.start(this.trigger, this.listbox, {
 *   constrainSize: true,
 * });
 * ```
 */
export const ConstrainSize: Story = {
  tags: ['behaviors'],
  render: () => html`
    <demo-placement-constrain-size></demo-placement-constrain-size>
  `,
  parameters: { 'section-order': 5 },
};

/**
 * Use **`onPlacementChange`** when styling or host state must track the **computed** placement
 * after middleware runs — on first open and whenever **`flip`** reorients after scroll or
 * resize. The callback receives the same hyphenated value as **`actualPlacement`**; the
 * controller does **not** write placement classes or attributes on the floating element.
 *
 * ```typescript
 * this.placement.start(this.trigger, this.panel, {
 *   onPlacementChange: (placement) => {
 *     this.actualPlacement = placement;
 *   },
 * });
 * ```
 */
export const OnPlacementChange: Story = {
  tags: ['behaviors', 'description-only'],
  parameters: { 'section-order': 6 },
};

/**
 * Pass a **`VirtualTrigger`** instead of a DOM element when the anchor is a **virtual point**
 * — for example a click coordinate, text selection rect, or canvas hit-test. Implement
 * `VirtualTrigger` with **`getBoundingClientRect()`** returning viewport coordinates;
 * optionally set **`contextElement`** as the clipping root inside scrollable regions.
 *
 * Virtual triggers use a curated fallback list for **`flip`** (see `getFallbackPlacements()`)
 * because there is no element box to measure. Call **`recompute()`** when coordinates change
 * without DOM mutation (for example after the user clicks a new point).
 *
 * ```typescript
 * const virtualTrigger: VirtualTrigger = {
 *   getBoundingClientRect: () =>
 *     DOMRect.fromRect({ x: clientX, y: clientY, width: 0, height: 0 }),
 *   contextElement: this.surface,
 * };
 *
 * this.placement.start(virtualTrigger, this.menu);
 * ```
 */
export const VirtualTrigger: Story = {
  tags: ['behaviors'],
  render: () => html`
    <demo-placement-virtual-trigger></demo-placement-virtual-trigger>
  `,
  parameters: { 'section-order': 7 },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `PlacementController` handles **geometry only** — it does not manage focus,
 * keyboard dismissal, or ARIA for floating surfaces. Consumer components remain
 * responsible for accessible open/close behavior.
 *
 * #### What the controller provides
 *
 * - Keeps the floating element positioned relative to its trigger while open, including
 *   after scroll, resize, and layout shift via Floating UI `autoUpdate`.
 * - Surfaces computed placement on **`actualPlacement`** and **`onPlacementChange`** so
 *   callers can apply side-specific styling without guessing orientation.
 *
 * #### What the caller must provide
 *
 * - **`aria-expanded`**, **`aria-controls`**, and appropriate roles on trigger and
 *   floating content (`dialog`, `listbox`, `tooltip`, etc.).
 * - Focus management — move focus into modal popovers, restore focus on close, trap
 *   focus when required.
 * - Keyboard dismissal — typically <kbd>Escape</kbd> to close interactive surfaces.
 * - Visibility — the controller does not show or hide the floating element; use
 *   `hidden`, `showPopover()`, or similar in the host.
 *
 * ### Best practices
 *
 * - Do not rely on placement alone for accessible naming — provide labels on the
 *   trigger and floating content independently of position.
 * - When **`shouldFlip`** is enabled, ensure visual affordances (if any) follow
 *   **`actualPlacement`**, not only the requested **`placement`** option.
 * - For tooltips, pair **`shouldFlip: false`** with host logic that avoids obscuring
 *   essential trigger labels when overflow occurs.
 * - Call **`stop()`** when the floating surface closes so `autoUpdate` does not keep
 *   running for detached or hidden content.
 */
export const Accessibility: Story = {
  tags: ['a11y', 'description-only'],
};

// ──────────────────────────
//    APPENDIX
// ──────────────────────────

/**
 * ### Relationship to 1st-gen `PlacementController`
 *
 * The 2nd-gen controller is a **focused subset** of the 1st-gen
 * `PlacementController`: single `autoUpdate` channel, hyphenated placements,
 * callback-based placement surfacing, and opt-in `constrainSize`. It owns
 * geometry only — open/close lifecycle, ARIA, focus, and dismissal remain
 * the caller's responsibility.
 *
 * ### See also
 *
 * - [Floating UI documentation](https://floating-ui.com/docs/computePosition)
 * - [Floating UI middleware](https://floating-ui.com/docs/middleware)
 */
export const Appendix: Story = {
  tags: ['description-only', 'appendix'],
};
