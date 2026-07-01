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

import {
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import {
  forcePseudoState,
  row,
  staticColorBackground,
  theme,
} from '../../../.storybook/helpers/index.js';
import { Arrow100Icon } from '../../icon/elements/Arrow100Icon.js';

// ────────────────
//    METADATA
// ────────────────

// No args/argTypes: this story isn't driven by Controls, and every
// permutation below sets its own attributes directly. Plain html bindings
// also avoid getStorybookHelpers' template(), which serializes icon-slot
// content through an extra DOM-parsing step that leaves a Lit child-position
// marker comment inside <swc-button> — observe-slot-text.ts's content filter
// doesn't special-case comment nodes, so it misreads that marker as label
// text and `iconOnly` never activates. See button.stories.ts's own Anatomy
// story, which sidesteps the same bug by writing icon-only markup directly.
const meta: Meta = {
  title: 'Button/VRT',
  component: 'swc-button',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  tags: ['dev'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// Row = one variant/fill-style pair, columns = every size. Outline only
// applies to primary/secondary (accent/negative don't ship an outline style).
const ROWS: ReadonlyArray<{ variant: string; fillStyle: string }> = [
  ...BUTTON_VARIANTS.map((variant) => ({ variant, fillStyle: 'fill' })),
  { variant: 'primary', fillStyle: 'outline' },
  { variant: 'secondary', fillStyle: 'outline' },
];

const arrowIcon = () => html`
  <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
`;

// ──────────────────────────
//    VRT STORIES
// ──────────────────────────

// Every variant × fill-style × size combination, disabled/pending states,
// static-color variants on their contrast backgrounds, icon anatomy
// (label-only, icon+label, icon-only) for fill and outline, text
// wrapping/truncation behavior, and forced hover/focus-visible/active per
// variant (see the `play` function below). Rendered once in light/ltr and
// once in dark/rtl below (that combination covers both axes), all still in a
// single story so it costs one snapshot.
const permutationContent = () => html`
  ${ROWS.map(({ variant, fillStyle }) =>
    row(
      BUTTON_VALID_SIZES.map(
        (size) => html`
          <swc-button variant=${variant} fill-style=${fillStyle} size=${size}>
            ${variant} ${fillStyle} ${size}
          </swc-button>
        `
      )
    )
  )}
  ${row(
    BUTTON_VALID_SIZES.map(
      (size) => html`
        <swc-button size=${size} disabled>Disabled ${size}</swc-button>
      `
    )
  )}
  ${row(
    BUTTON_VALID_SIZES.map(
      (size) => html`
        <swc-button size=${size} pending>Pending ${size}</swc-button>
      `
    )
  )}
  ${staticColorBackground(
    ['fill', 'outline'].map(
      (fillStyle) => html`
        <swc-button static-color="white" fill-style=${fillStyle}>
          White ${fillStyle}
        </swc-button>
      `
    ),
    'white'
  )}
  ${staticColorBackground(
    ['fill', 'outline'].map(
      (fillStyle) => html`
        <swc-button static-color="black" fill-style=${fillStyle}>
          Black ${fillStyle}
        </swc-button>
      `
    ),
    'black'
  )}
  ${['fill', 'outline'].map((fillStyle) =>
    row([
      html`
        <swc-button fill-style=${fillStyle}>Next</swc-button>
      `,
      html`
        <swc-button fill-style=${fillStyle}>${arrowIcon()}Next</swc-button>
      `,
      // Written inline, not via the `arrowIcon()` helper: a helper call
      // substituted directly as <swc-button>'s only child is itself a Lit
      // child-position binding, which leaves the same marker comment problem
      // described above. Icon-only is the one case where that actually
      // breaks something (iconOnly detection), so <swc-icon> must appear as
      // literal markup here, with only the innermost Arrow100Icon() call as
      // a nested expression.
      html`
        <swc-button fill-style=${fillStyle} accessible-label="Next">
          <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
        </swc-button>
      `,
    ])
  )}
  ${row([
    html`
      <swc-button style="max-inline-size: 180px">
        Submit and notify all stakeholders
      </swc-button>
    `,
    html`
      <swc-button style="max-inline-size: 180px">
        ${arrowIcon()}Submit and notify all stakeholders
      </swc-button>
    `,
  ])}
  ${row([
    html`
      <swc-button truncate style="max-inline-size: 200px">
        Be a premium member
      </swc-button>
    `,
    html`
      <swc-button truncate style="max-inline-size: 120px">
        Be a premium member
      </swc-button>
    `,
    html`
      <swc-button truncate style="max-inline-size: 120px">
        ${arrowIcon()}Be a premium member
      </swc-button>
    `,
  ])}
  ${BUTTON_VARIANTS.map((variant) =>
    row(
      (['hover', 'focus-visible', 'active'] as const).map(
        (state) => html`
          <swc-button variant=${variant} data-force-state=${state}>
            ${variant} ${state}
          </swc-button>
        `
      )
    )
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '16px' },
    // The global default (preview.ts) only autoplays under Chromatic, so the
    // forced hover/focus-visible/active row below wouldn't otherwise render
    // in local dev/the Chromatic addon panel without manually triggering play.
    autoplay: true,
  },
  // :hover/:active can't be triggered by synthetic events, and static VRT
  // captures have no real pointer — see helpers/pseudo-state.ts. Applying
  // this after render (rather than baking the class into the markup above)
  // is what lets it target the real internal `.swc-Button` element inside
  // the shadow root, which the light-DOM markup above has no access to.
  play: async ({ canvasElement }) => {
    canvasElement
      .querySelectorAll<HTMLElement>('swc-button[data-force-state]')
      .forEach((host) => {
        const state = host.dataset.forceState as
          | 'hover'
          | 'focus-visible'
          | 'active';
        forcePseudoState(host, '.swc-Button', state);
      });
  },
};
