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

import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import opacityCheckerboardStyles from '../../../stylesheets/_lit-styles/opacity-checkerboard.css';

// ─────────────────────────
//     DEMO HOST
// ─────────────────────────

/**
 * @internal
 *
 * Storybook-only host showing how a consuming component adopts the shared
 * opacity-checkerboard utility into its own shadow root.
 *
 * The fragment is a lit `css` result, so it is added to `static styles` (not
 * injected as a global stylesheet); its rules then apply to `.swc-OpacityCheckerboard`
 * elements rendered inside this element's `renderRoot`. The checkerboard is purely
 * decorative: it sits behind the color fill, is marked `aria-hidden`, and is never a
 * tab stop. The accessible name and opacity are carried by the host (`role="img"` +
 * `aria-label`), mirroring the guidance in the accessibility migration analysis.
 *
 * Intentionally not exported: CSF treats every export as a story, and exporting
 * the class would require `excludeStories`, whose spread into the default export
 * breaks Storybook's static title resolution (the sidebar falls back to the
 * file-path autotitle).
 */
@customElement('demo-opacity-checkerboard-swatch')
class DemoOpacityCheckerboardSwatch extends LitElement {
  /**
   * Adopt the shared fragment into this element's shadow root, then layer the
   * component-local styles on top.
   */
  static override styles = [
    opacityCheckerboardStyles,
    css`
      :host {
        display: inline-block;
      }
      .swatch {
        position: relative;
        inline-size: 120px;
        block-size: 120px;
        border: 1px solid var(--swc-gray-300, #ccc);
        border-radius: 4px;
        overflow: hidden;
      }
      /* Decorative checkerboard and the color fill share the swatch box. */
      .swc-OpacityCheckerboard,
      .fill {
        position: absolute;
        inset: 0;
      }
      .fill {
        background: var(--demo-fill, transparent);
      }
    `,
  ];

  /** Human-readable name including opacity; lives on the control, not the pattern. */
  @property()
  public label = '';

  /** CSS color for the fill layer, e.g., `rgba(255, 0, 0, 0.4)` or `transparent`. */
  @property()
  public color = 'transparent';

  /** Checkerboard square size: medium (default, no modifier) or small. */
  @property({ reflect: true })
  public size: 'm' | 's' = 'm';

  protected override render(): TemplateResult {
    const sizeClass = this.size === 's' ? 'swc-OpacityCheckerboard--sizeS' : '';
    return html`
      <div
        class="swatch"
        role="img"
        aria-label=${this.label || 'Color preview'}
        style="--demo-fill: ${this.color}"
      >
        <!-- Decoration only: hidden from assistive technologies, never focusable. -->
        <span
          class="swc-OpacityCheckerboard ${sizeClass}"
          aria-hidden="true"
        ></span>
        <span class="fill" aria-hidden="true"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'demo-opacity-checkerboard-swatch': DemoOpacityCheckerboardSwatch;
  }
}

// ────────────────
//    METADATA
// ────────────────

interface OpacityCheckerboardProps {
  size: 'm' | 's';
  color: string;
  label: string;
}

const SIZES = ['m', 's'] as const;

const meta: Meta<OpacityCheckerboardProps> = {
  title: 'Opacity checkerboard',
  component: 'demo-opacity-checkerboard-swatch',
  parameters: {
    docs: {
      subtitle: `Decorative checkerboard background utility used to indicate transparency.`,
      canvas: { sourceState: 'hidden' },
    },
  },
  args: {
    size: 'm',
    color: 'transparent',
    label: 'Color preview, fully transparent',
  },
  argTypes: {
    size: { control: 'select', options: SIZES },
    color: { control: 'color' },
    label: { control: 'text' },
  },
  render: ({ size, color, label }) => html`
    <demo-opacity-checkerboard-swatch
      size=${size}
      color=${color}
      label=${label}
    ></demo-opacity-checkerboard-swatch>
  `,
  // Internal-only: the `.internal` filename excludes this from production
  // Storybook. `utility` marks it as a classless CSS utility, not an element.
  tags: ['utility'],
};

export default meta;

// ─────────────────────────
//     HELPERS
// ─────────────────────────

const swatch = ({
  size = 'm',
  color = 'transparent',
  label,
}: Partial<OpacityCheckerboardProps>): TemplateResult => html`
  <demo-opacity-checkerboard-swatch
    size=${size}
    color=${color}
    label=${label ?? ''}
  ></demo-opacity-checkerboard-swatch>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  parameters: { docs: { canvas: { sourceState: 'shown' } } },
  tags: ['dev'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: () => html`
    ${swatch({ size: 'm', label: 'Medium squares (default)' })}
    ${swatch({ size: 's', label: 'Small squares' })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TransparentContent: Story = {
  render: () => html`
    ${swatch({ color: 'rgba(255, 0, 0, 0.4)', label: 'Red, 40% opacity' })}
    ${swatch({ color: 'rgba(0, 128, 255, 0.25)', label: 'Blue, 25% opacity' })}
    ${swatch({ color: 'rgba(0, 0, 0, 0.6)', label: 'Black, 60% opacity' })}
    ${swatch({ color: 'rgb(0, 200, 120)', label: 'Green, fully opaque' })}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['behaviors'],
};
TransparentContent.storyName = 'Transparent content';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () =>
    swatch({
      color: 'rgba(255, 0, 0, 0.4)',
      label: 'Selected color: red, 40% opacity',
    }),
  tags: ['a11y'],
};
