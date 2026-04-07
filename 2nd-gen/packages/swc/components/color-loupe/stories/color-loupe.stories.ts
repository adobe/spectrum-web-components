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
 * A color loupe is a visual magnifier that displays the currently picked
 * color inside a teardrop-shaped container. It includes an opacity
 * checkerboard behind transparent colors and animated open/close
 * transitions. The loupe is a non-interactive companion to color
 * selection controls such as a color field or color slider.
 */
const meta: Meta = {
  title: 'Color Loupe',
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
      subtitle: `Visual magnifier showing the picked color in a loupe shape`,
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
 * A color loupe consists of:
 *
 * 1. **Opacity checkerboard** — a repeating pattern visible behind transparent colors
 * 2. **Color fill** — the picked color rendered over the checkerboard
 * 3. **Inner border** — a thin stroke separating color from the loupe edge
 * 4. **Outer border** — a wider stroke forming the loupe outline
 * 5. **Teardrop shape** — an SVG clip-path that defines the loupe silhouette
 *
 * ### Technical structure
 *
 * The component has no slots. All rendering is internal.
 *
 * #### Properties
 *
 * - **open**: Controls visibility with an animated transition
 * - **color**: CSS color string displayed inside the loupe
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
//    STATES STORIES
// ──────────────────────────

/**
 * The color loupe has two visibility states:
 *
 * - **Open**: Fully visible with `opacity: 1` and no vertical offset
 * - **Closed** (default): Hidden via `opacity: 0` and a downward transform
 *
 * The transition between states is animated with CSS transitions on
 * `opacity` (125ms) and `transform` (100ms).
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
 * ### Color display
 *
 * The `color` property accepts any valid CSS color string. When the color
 * includes alpha transparency, the opacity checkerboard pattern shows
 * through, giving a visual indication of the transparency level.
 *
 * ### Parent-driven visibility
 *
 * The loupe is controlled by its parent component (typically a color
 * field or color area). The parent sets `open` to `true` when the user
 * is actively selecting a color and `false` when the interaction ends.
 * The loupe itself does not manage its own visibility state.
 */
export const ColorDisplay: Story = {
  render: (args) => html`
    <div
      style="position: relative; min-block-size: 120px; display: flex; gap: 80px;"
    >
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: 'rgb(255, 0, 0)' })}
      </div>
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: 'rgba(0, 128, 255, 0.5)' })}
      </div>
      <div style="position: relative; inline-size: 48px; block-size: 64px;">
        ${template({ ...args, open: true, color: 'rgba(0, 200, 100, 0.3)' })}
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
 * - **Not focusable**: The component has no tab stop and no keyboard
 *   interaction
 *
 * #### Accessibility model
 *
 * The loupe does not represent a standalone accessible control.
 * Accessibility semantics (name, value, role) are provided by the
 * **parent** color selection component (e.g. color field, color area,
 * color slider). The loupe simply reflects the currently picked color
 * as a visual aid.
 *
 * ### Best practices
 *
 * - Never use the color loupe as the sole means of communicating a color
 *   value — always pair it with labeled controls that expose the value
 *   to assistive technology
 * - The parent control should provide `aria-label` or visible label text
 *   describing the color being selected
 * - Do not add `role`, `aria-label`, or focus management to the loupe
 *   itself — it is intentionally inert
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
