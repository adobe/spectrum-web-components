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
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/color-loupe';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-color-loupe');

/**
 * An `<swc-color-loupe>` shows the output color that would otherwise be
 * covered by a cursor, stylus, or finger during color selection. It is a
 * visual-only companion to color selection controls such as
 * [Color Area](../?path=/docs/color-area--readme),
 * [Color Slider](../?path=/docs/color-slider--readme), and
 * [Color Wheel](../?path=/docs/color-wheel--readme).
 *
 * The loupe includes an opacity checkerboard behind transparent colors and
 * animated open/close transitions. It is non-interactive — accessibility
 * semantics are provided by the parent color component.
 */
const meta: Meta = {
  title: 'Color Components/Color Loupe',
  component: 'swc-color-loupe',
  args: {
    ...args,
    open: true,
  },
  argTypes,
  actions: {
    handles: events,
  },
  parameters: {
    docs: {
      subtitle: `Visual magnifier showing the picked color during color selection`,
    },
    styles: {
      position: 'relative',
      'min-block-size': '120px',
    },
  },
  render: (args) => template(args),
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    open: true,
    color: 'rgba(0, 128, 255, 0.7)',
  },
  tags: ['autodocs', 'dev'],
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  args: {
    open: true,
    color: 'rgba(0, 128, 255, 0.7)',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * ### Visual structure
 *
 * A color loupe consists of two main parts:
 *
 * 1. **Floating loupe element** — a teardrop-shaped container positioned above
 *    the interaction point, formed by an SVG clip-path with an inner and outer border
 * 2. **Color preview** — reflects the color currently sampled by the parent
 *    color component, rendered over an opacity checkerboard that shows through
 *    when the color has alpha transparency
 *
 * ### Technical structure
 *
 * The component has no slots. All rendering is internal.
 *
 * #### Properties
 *
 * - **open**: Controls visibility with animated CSS transitions on `opacity` and `transform`
 * - **color**: CSS color string displayed inside the loupe; supports any valid format
 *   including named colors, hex, `rgba()`, and `hsl()`
 */
export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, open: true, color: 'rgba(255, 0, 0, 0.5)' })}
  `,
  tags: ['anatomy'],
  parameters: {
    styles: {
      position: 'relative',
      'min-block-size': '120px',
    },
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `color` property accepts any valid CSS color string:
 *
 * - **Named colors**: `yellow`, `red`, `blue`, etc.
 * - **Hex**: `#ff0000`
 * - **RGB/RGBA**: `rgba(44, 62, 224, 0.81)` — alpha transparency reveals the checkerboard
 * - **HSL**: `hsl(111, 82%, 56%)`
 *
 * When using transparent colors, the opacity checkerboard pattern shows through,
 * giving a clear visual indication of the transparency level.
 *
 * All color formats shown below for comparison.
 */
export const Colors: Story = {
  render: (args) => html`
    <div
      style="position: relative; min-block-size: 120px; display: flex; gap: 80px;"
    >
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: 'yellow' })}
        <span
          style="position: absolute; inset-block-end: -24px; white-space: nowrap; font-size: 12px;"
        >
          Named
        </span>
      </div>
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: '#ff0000' })}
        <span
          style="position: absolute; inset-block-end: -24px; white-space: nowrap; font-size: 12px;"
        >
          Hex
        </span>
      </div>
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: 'rgba(44, 62, 224, 0.81)' })}
        <span
          style="position: absolute; inset-block-end: -24px; white-space: nowrap; font-size: 12px;"
        >
          RGBA
        </span>
      </div>
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: 'hsl(111, 82%, 56%)' })}
        <span
          style="position: absolute; inset-block-end: -24px; white-space: nowrap; font-size: 12px;"
        >
          HSL
        </span>
      </div>
    </div>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: true,
    'section-order': 1,
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

/**
 * The color loupe has two visibility states:
 *
 * - **Open**: Fully visible with `opacity: 1` and no vertical offset
 * - **Closed** (default): Hidden via `opacity: 0` and a downward transform
 *
 * The transition between states is animated with CSS transitions on
 * `opacity` (125 ms) and `transform` (100 ms).
 */
export const States: Story = {
  render: (args) => html`
    <div
      style="position: relative; min-block-size: 120px; display: flex; gap: 80px;"
    >
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: 'rgba(0, 128, 255, 0.7)' })}
        <span
          style="position: absolute; inset-block-end: -24px; white-space: nowrap; font-size: 12px;"
        >
          Open
        </span>
      </div>
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: false, color: 'rgba(0, 128, 255, 0.7)' })}
        <span
          style="position: absolute; inset-block-end: -24px; white-space: nowrap; font-size: 12px;"
        >
          Closed
        </span>
      </div>
    </div>
  `,
  tags: ['states'],
  parameters: {
    flexLayout: true,
  },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * ### Parent-driven visibility
 *
 * The color loupe's `open` state is entirely managed by its parent color
 * component — the loupe does not manage its own visibility:
 *
 * - **Touch input**: The loupe automatically appears during touch interactions
 *   with any color component (`<swc-color-area>`, `<swc-color-slider>`,
 *   `<swc-color-wheel>`) to prevent the finger from obscuring the selected color
 * - **Mouse/stylus input**: The loupe remains hidden by default for precision
 *   pointing devices
 * - **Parent control**: The parent sets `open` to `true` when the user is actively
 *   selecting a color and back to `false` when the interaction ends
 *
 * ### Open/close transition
 *
 * The loupe animates its visibility with CSS transitions:
 *
 * - `opacity` transitions over 125 ms
 * - `transform` (vertical offset) transitions over 100 ms
 */
export const ParentDrivenVisibility: Story = {
  render: (args) => html`
    <div
      style="position: relative; min-block-size: 120px; display: flex; gap: 80px;"
    >
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: 'rgba(0, 200, 100, 0.8)' })}
        <span
          style="position: absolute; inset-block-end: -24px; white-space: nowrap; font-size: 12px;"
        >
          Touch active
        </span>
      </div>
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: false, color: 'rgba(0, 200, 100, 0.8)' })}
        <span
          style="position: absolute; inset-block-end: -24px; white-space: nowrap; font-size: 12px;"
        >
          Idle
        </span>
      </div>
    </div>
  `,
  tags: ['behaviors'],
  parameters: {
    flexLayout: true,
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-color-loupe>` element is a **visual-only** component:
 *
 * #### ARIA implementation
 *
 * - **SVG is `aria-hidden="true"`**: The loupe graphic is decorative and
 *   hidden from the accessibility tree
 * - **Not focusable**: The component has no tab stop and no keyboard interaction
 *
 * #### Accessibility model
 *
 * The loupe does not represent a standalone accessible control.
 * Accessibility semantics (name, value, role) are provided by the
 * **parent** color selection component — for example, `<swc-color-area>`,
 * `<swc-color-slider>`, or `<swc-color-wheel>`. The loupe simply reflects
 * the currently picked color as a visual aid during touch interactions.
 *
 * ### Best practices
 *
 * - Never use the color loupe as the sole means of communicating a color
 *   value — always pair it with labeled controls that expose the value
 *   to assistive technology
 * - Ensure the parent color component provides appropriate labeling via
 *   visible text or ARIA (for example, `aria-label` on `<swc-color-area>`)
 * - Do not add `role`, `aria-label`, or focus management to the loupe
 *   itself — it is intentionally inert
 * - Avoid conveying meaning through the loupe color alone; pair color
 *   selection with text labels or other indicators as appropriate
 */
export const Accessibility: Story = {
  args: {
    open: true,
    color: 'rgba(0, 128, 255, 0.7)',
  },
  tags: ['a11y'],
  parameters: {
    styles: {
      position: 'relative',
      'min-block-size': '120px',
    },
  },
};
