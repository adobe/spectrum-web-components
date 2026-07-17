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
  title: 'Color loupe',
  component: 'swc-color-loupe',
  args: {
    ...args,
    open: true,
  },
  argTypes,
  parameters: {
    actions: { handles: events },
    docs: {
      subtitle: `Visual magnifier showing the picked color during color selection`,
    },
    styles: {
      position: 'relative',
      'min-block-size': '120px',
    },
    // TODO: add a Stackblitz link for swc-color-loupe once a release syncs
    // @adobe/spectrum-wc and @adobe/spectrum-wc-core; the published
    // core@0.3.0 exports map is missing ./components/color-loupe (and
    // ./components/color-handle) even though @adobe/spectrum-wc@0.3.0's
    // compiled output imports from it, so no demo can resolve the import
    // until both packages are republished in sync.
    stackblitz: {},
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
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    open: true,
    color: 'rgba(0, 128, 255, 0.7)',
  },
  tags: ['dev'],
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

export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args, open: true, color: 'rgba(255, 0, 0, 0.5)' })}
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Colors: Story = {
  render: (args) => html`
    ${COLOR_FORMATS.map(({ label, color }) =>
      labeledLoupe(label, { ...args, open: true, color })
    )}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

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

export const ParentDrivenVisibility: Story = {
  loaders: [() => import('@adobe/spectrum-wc/components/button/swc-button.js')],
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

export const AdaptiveContrast: Story = {
  render: (args) => html`
    ${labeledLoupe('White', {
      ...args,
      open: true,
      color: 'rgb(255, 255, 255)',
    })}
    ${labeledLoupe('Yellow', {
      ...args,
      open: true,
      color: 'rgb(255, 235, 0)',
    })}
    ${labeledLoupe('Mid gray', {
      ...args,
      open: true,
      color: 'rgb(120, 120, 120)',
    })}
    ${labeledLoupe('Black', { ...args, open: true, color: 'rgb(0, 0, 0)' })}
  `,
  tags: ['behaviors'],
  parameters: { flexLayout: 'row-wrap' },
};
AdaptiveContrast.storyName = 'Adaptive contrast';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    open: true,
    color: 'rgba(0, 128, 255, 0.7)',
  },
  tags: ['a11y'],
};
