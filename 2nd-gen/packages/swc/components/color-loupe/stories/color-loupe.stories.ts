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

import '@adobe/spectrum-wc/components/color-loupe/swc-color-loupe.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-color-loupe');

/**
 * An `<swc-color-loupe>` shows the output color that would otherwise be
 * covered by a cursor, stylus, or finger during color selection. It is a
 * visual-only companion to color selection components such as color area,
 * color slider, and color wheel. Visibility is controlled by a parent component such as `<swc-color-handle>`.
 */
const meta: Meta = {
  title: 'Color Components/Color Loupe',
  component: 'swc-color-loupe',
  args: {
    ...args,
    open: true,
  },
  argTypes,
  parameters: {
    actions: { handles: events },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=13065-162',
    },
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
//    HELPERS
// ────────────────────

const COLOR_FORMATS = [
  { label: 'Named', color: 'yellow' },
  { label: 'Hex', color: '#ff0000' },
  { label: 'RGBA', color: 'rgba(44, 62, 224, 0.81)' },
  { label: 'HSL', color: 'hsl(111, 82%, 56%)' },
] as const satisfies readonly { label: string; color: string }[];

/**
 * `<swc-color-loupe>` is `position: absolute` on `:host` because it normally
 * floats above a color handle. In stories that compare multiple loupes side
 * by side, each loupe needs its own `position: relative` containing block —
 * otherwise every loupe computes the same inset offsets and they stack at
 * the same coordinate. This helper provides that containing block plus an
 * optional caption below the loupe.
 */
const labeledLoupe = (
  label: string,
  templateArgs: Record<string, unknown>
) => html`
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
  >
    <div style="position: relative; inline-size: 48px; block-size: 64px;">
      ${template(templateArgs)}
    </div>
    <span style="font-size: 12px;">${label}</span>
  </div>
`;

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
 * A color loupe consists of:
 *
 * 1. **Floating loupe element** - A teardrop-shaped container positioned above the interaction point, with an inner and outer border
 * 2. **Color preview** - Displays the currently picked color over an opacity checkerboard so transparency is visible
 */
export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, open: true, color: 'rgba(255, 0, 0, 0.5)' })}
  `,
  tags: ['anatomy'],
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
    ${COLOR_FORMATS.map(({ label, color }) =>
      labeledLoupe(label, { ...args, open: true, color })
    )}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
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
export const OpenAndClosedStates: Story = {
  render: (args) => html`
    ${labeledLoupe('Open', {
      ...args,
      open: true,
      color: 'rgba(0, 128, 255, 0.7)',
    })}
    ${labeledLoupe('Closed', {
      ...args,
      open: false,
      color: 'rgba(0, 128, 255, 0.7)',
    })}
  `,
  tags: ['states'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};
OpenAndClosedStates.storyName = 'Open and closed states';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * The color loupe's `open` state is entirely managed by its parent color
 * component; the loupe does not manage its own visibility. A parent such as
 * `<swc-color-handle>` controls when it appears:
 *
 * - **Touch input**: The loupe automatically appears during touch interactions
 *   with any color component (`<swc-color-area>`, `<swc-color-slider>`,
 *   `<swc-color-wheel>`) to prevent the finger from obscuring the selected color
 * - **Mouse/stylus input**: The loupe remains hidden by default for precision
 *   pointing devices
 * - **Parent control**: The parent sets `open` to `true` when the user is actively
 *   selecting a color and back to `false` when the interaction ends
 *
 * The loupe animates its visibility with CSS transitions: `opacity` over
 * 125 ms and `transform` (vertical offset) over 100 ms. The button below
 * simulates that trigger relationship.
 */
export const ParentDrivenVisibility: Story = {
  render: (args) => {
    const toggle = (event: MouseEvent) => {
      const btn = event.currentTarget as HTMLElement;
      const root = btn.closest('[data-loupe-demo]') as HTMLElement;
      const loupe = root?.querySelector('swc-color-loupe') as HTMLElement & {
        open: boolean;
      };
      if (!loupe) {
        return;
      }
      loupe.open = !loupe.open;
      btn.textContent = loupe.open ? 'Hide loupe' : 'Show loupe';
      btn.setAttribute('aria-expanded', String(loupe.open));
    };

    return html`
      <div
        data-loupe-demo
        style="display: flex; flex-direction: column; align-items: center; gap: 24px; padding-block-start: 80px;"
      >
        <!-- Color handle mock: provides the position:relative anchor for the loupe -->
        <div
          style="position: relative; inline-size: 24px; block-size: 24px; border-radius: 50%; background-color: rgba(0, 128, 255, 0.7); outline: 2px solid white; box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.25);"
        >
          ${template({ ...args, open: false, color: 'rgba(0, 128, 255, 0.7)' })}
        </div>
        <swc-button
          variant="secondary"
          fill-style="outline"
          aria-expanded="false"
          @click=${toggle}
        >
          Show loupe
        </swc-button>
      </div>
    `;
  },
  tags: ['behaviors'],
  parameters: {
    styles: {
      'min-block-size': '240px',
    },
  },
};
ParentDrivenVisibility.storyName = 'Parent-driven visibility';

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
};
