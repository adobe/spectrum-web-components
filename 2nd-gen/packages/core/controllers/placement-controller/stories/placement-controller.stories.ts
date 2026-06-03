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
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────
//    INTERACTIVE STORY
// ──────────────────────────

export const Interactive: Story = {
  tags: ['behaviors'],
  render: () => html`
    <demo-placement-interactive></demo-placement-interactive>
  `,
  parameters: { 'section-order': 0 },
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
 * Same order as Gen1: `offset → shift → flip → size`.
 *
 * 1. **`offset`** — trigger-relative gap along the placement direction (`offset` option) and along the trigger edge (`crossOffset` option).
 * 2. **`shift`** — slides the floating element along the placement axis to keep it inside the boundary using `containerPadding` as inset. Always installed.
 * 3. **`flip`** (when `shouldFlip: true`) — reorients to the opposite side when there is not enough room, respecting `containerPadding`.
 * 4. **`size`** — always installed. Exposes the available space as the `--swc-placement-available-width` / `--swc-placement-available-height` custom properties (components opt in via `min()`). Read `isConstrained` to detect when content overflows the available space.
 * 5. **`arrow`** (when a `tipElement` is provided) — positions a tip element so it stays pointing at the trigger's center as the floating panel shifts.
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
 * overflow boundary.
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
 * Use **`containerPadding`** for minimum inset from the **overflow boundary** (px) — **not** the gap from the trigger. Used internally for collision detection.
 *
 * By default, Floating UI uses clipping ancestors capped by the **visual viewport** as that boundary. For typical fixed or top-layer surfaces, this behaves like screen-edge inset. Inside a scrollable clipping parent, inset is measured from that container's edges instead.
 *
 * Use the playground **Container padding** control with the trigger near an edge to see the panel kept further inside the boundary.
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
 * overflow boundary. **`actualPlacement`** and **`onPlacementChange`** reflect the computed
 * side after flip.
 *
 * With **`shouldFlip: false`**, the floating element stays on the requested side even if it
 * overflows.
 *
 * ```typescript
 * this.placement.start(this.trigger, this.panel, {
 *   shouldFlip: true,
 * });
 *
 * this.placement.start(this.trigger, this.panel, {
 *   shouldFlip: false,
 * });
 * ```
 */
export const ShouldFlip: Story = {
  tags: ['behaviors', 'description-only'],
  parameters: { 'section-order': 4 },
};

/**
 * Floating UI's **`size`** middleware is always installed. On every compute it
 * exposes the available space as the custom properties
 * **`--swc-placement-available-width`** and **`--swc-placement-available-height`**
 * on the floating element, rather than writing `max-width` / `max-height`
 * directly — an inline max-size would override the consuming component's
 * intended CSS max-size. Components opt in with `min()`, e.g.
 * `max-inline-size: min(<intended>, var(--swc-placement-available-width))`. The
 * readonly **`isConstrained`** property is `true` when the content would
 * overflow the available block space, so consumers can react to "content is
 * currently clamped" — e.g. enable scrolling or show a scrollbar hint.
 *
 * No option to opt out of the measurement. Only components positioned by the
 * controller receive these properties.
 */
export const SizeExposesAvailableSpace: Story = {
  tags: ['behaviors'],
  render: () => html`
    <demo-placement-constrain-size></demo-placement-constrain-size>
  `,
  parameters: { 'section-order': 5 },
};

/**
 * Use **`onPlacementChange`** when styling or host state must track the **computed**
 * placement after middleware runs. The callback fires once after first compute and again
 * on every subsequent `autoUpdate` tick — even when the value is unchanged — so a single
 * handler is enough to mirror **`actualPlacement`** into your component's state. If you
 * only care about transitions, compare the incoming value against the previous one in
 * the handler.
 *
 * The callback receives the same hyphenated value as **`actualPlacement`**; the controller
 * does **not** write placement classes or attributes on the floating element.
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

/**
 * Pass a **`tipElement`** when the floating surface has a small visual "arrow"
 * (a triangular tip, notch, or speech-bubble pointer) that should keep pointing
 * at the trigger. The controller installs Floating UI's **`arrow`** middleware
 * and writes an inline **`translate`** on the tip element after every compute,
 * so the tip stays aligned with the trigger even when **`shift`** slides the
 * floating panel sideways to avoid clipping.
 *
 * CSS positions the tip element against the relevant edge of the floating
 * panel (typically with a negative offset for the half-size of the arrow);
 * the controller only slides it along that edge. **`tipPadding`** keeps the
 * tip from getting too close to the floating element's corners.
 *
 * ```typescript
 * this.placement.start(this.trigger, this.panel, {
 *   tipElement: this.tip,
 *   tipPadding: 8,
 * });
 * ```
 */
export const Arrow: Story = {
  tags: ['behaviors'],
  render: () => html`
    <demo-placement-arrow></demo-placement-arrow>
  `,
  parameters: { 'section-order': 8 },
};

// ──────────────────────────
//    API STORY
// ──────────────────────────

/**
 * ### Methods
 *
 * | Member | Description |
 * |---|---|
 * | `start(trigger, floating, options?)` | Begin positioning; tear down any prior session and subscribe to Floating UI `autoUpdate`. Skips compute when the floating element has zero dimensions until size is available. |
 * | `stop()` | Tear down positioning, unsubscribe from `autoUpdate`, and clear `actualPlacement` and `isConstrained`. Called from `hostDisconnected` when the Lit host disconnects. |
 * | `recompute()` | Force one `computePosition` pass outside `autoUpdate` — for example after floating content reflows or a virtual trigger moves without layout events. No-op if not started. |
 *
 * ### Readonly properties
 *
 * | Property | Type | Description |
 * |---|---|---|
 * | `actualPlacement` | `Placement \| null` | Computed placement after `flip` (hyphenated). `null` when stopped. |
 * | `isConstrained` | `boolean` | `true` when content would overflow the available block space — i.e. a component clamping with `var(--swc-placement-available-height)` is scrolling. |
 *
 * ### Options
 *
 * | Option | Type | Default | Description |
 * |---|---|---|---|
 * | `placement` | `Placement` | `'bottom'` | Preferred side and alignment relative to the trigger (hyphenated; 22 values). |
 * | `offset` | `number` | `0` | Gap along the placement direction between trigger and floating element (px). |
 * | `crossOffset` | `number` | `0` | Slide along the trigger edge (px), perpendicular to the placement direction. |
 * | `containerPadding` | `number` | `8` | Minimum inset from the overflow boundary used for collision detection. |
 * | `shouldFlip` | `boolean` | `true` | Whether `flip` may reorient when the requested placement does not fit. |
 * | `tipElement` | `HTMLElement` | — | Tip ("arrow") element to keep pointing at the trigger. When set, the controller installs `arrow` middleware and writes an inline `translate` on this element. |
 * | `tipPadding` | `number` | `8` | Minimum inset of the tip element from the floating element's corners. Only meaningful when `tipElement` is set. |
 * | `onPlacementChange` | `(placement: Placement) => void` | — | Fires after every successful compute with the resolved hyphenated placement. |
 *
 * ### Types
 *
 * | Type | Description |
 * |---|---|
 * | `Placement` | Hyphenated placement union (22 values). |
 * | `VirtualTrigger` | `{ getBoundingClientRect(): DOMRect; contextElement?: Element }` |
 *
 * See the Controls table above for interactive demos of the configurable options.
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
 * ### Relationship to Gen1 `PlacementController`
 *
 * The Gen2 controller is a **focused subset** of the Gen1
 * `PlacementController`: single `autoUpdate` channel, hyphenated placements,
 * and callback-based placement surfacing. The middleware stack and the
 * always-on `size` clamp behaviour match Gen1. It owns geometry only —
 * open/close lifecycle, ARIA, focus, and dismissal remain the caller's
 * responsibility.
 *
 * ### See also
 *
 * - [Floating UI documentation](https://floating-ui.com/docs/computePosition)
 * - [Floating UI middleware](https://floating-ui.com/docs/middleware)
 */
export const Appendix: Story = {
  tags: ['description-only', 'appendix'],
};
