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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import type { ForcedPseudoState } from '../../../.storybook/helpers/index.js';
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

// Applies forced hover/focus-visible/active to every `[data-force-state]`
// element matching `selector` within `root`. `internalSelector` is passed
// through to forcePseudoState() for shadow-DOM components (e.g. swc-button's
// `.swc-Button`); omit it for plain elements with no shadow root.
const applyForcedStates = (
  root: HTMLElement,
  selector: string,
  internalSelector?: string
) => {
  root.querySelectorAll<HTMLElement>(selector).forEach((host) => {
    const state = host.dataset.forceState as ForcedPseudoState;
    forcePseudoState(host, state, internalSelector);
  });
};

// Shared by every story below that forces hover/focus-visible/active on
// swc-button's internal `.swc-Button` element.
const forceButtonStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  applyForcedStates(
    canvasElement,
    'swc-button[data-force-state]',
    '.swc-Button'
  );
};

// ──────────────────────────
//    VRT STORIES
// ──────────────────────────

// Every variant × fill-style × size combination, disabled/pending states,
// static-color variants (each with their own forced hover/focus-visible/
// active, since static-color buttons keep their own contrast rules
// regardless of app theme) on their contrast backgrounds, icon anatomy
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
            I am ${variant} ${fillStyle} ${size}
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
  ${row([
    html`
      <div style="inline-size: 240px;">
        <swc-button justified>Justified</swc-button>
      </div>
    `,
    // "min width": justified in a container narrower than the label needs,
    // to confirm the button settles at a sane minimum instead of collapsing
    // or overflowing.
    html`
      <div style="inline-size: 64px;">
        <swc-button justified>Justified narrow</swc-button>
      </div>
    `,
  ])}
  ${(['white', 'black'] as const).map((color) =>
    staticColorBackground(
      [
        // static-color collapses semantic variants into two treatments —
        // "solid" (primary/accent/negative, the default here) and
        // "secondary" (its own, more subtle tokens) — each with its own
        // hover/focus-visible/active values, so both need covering.
        ...['fill', 'outline'].flatMap((fillStyle) =>
          [undefined, 'secondary'].map(
            (variant) => html`
              <swc-button
                static-color=${color}
                fill-style=${fillStyle}
                variant=${variant ?? nothing}
              >
                ${color} ${variant ?? 'solid'} ${fillStyle}
              </swc-button>
            `
          )
        ),
        ...(['hover', 'focus-visible', 'active'] as const).flatMap((state) =>
          [undefined, 'secondary'].map(
            (variant) => html`
              <swc-button
                static-color=${color}
                variant=${variant ?? nothing}
                data-force-state=${state}
              >
                ${color} ${variant ?? 'solid'} ${state}
              </swc-button>
            `
          )
        ),
      ],
      color
    )
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
  play: forceButtonStates,
};

// `forced-colors` is a real browser media feature Chromatic can emulate
// directly (parameters.chromatic.forcedColors — see tooltip.test.ts's
// ForcedColorsOpenTest for the same pattern), unlike :hover/:active/
// :focus-visible above. But that also means it can't be scoped to a
// subtree the way theme()'s light/dark split is — forced-colors mode
// replaces the whole page's palette, so it needs its own story/snapshot
// rather than folding into Permutations. Still forces hover/focus-visible/
// active (same play-function pattern) since forced-colors mode has its own
// UA-mandated focus-ring behavior worth confirming.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '16px' },
    chromatic: { forcedColors: 'active' },
    autoplay: true,
  },
  play: forceButtonStates,
};

const globalIconSvg = html`
  <svg
    class="swc-Button-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M9.60547 4.46973 6.3457 1.20996c-.29297-.29297-.76758-.29297-1.06055 0s-.29297.76758 0 1.06055l1.97949 1.97949H.9248c-.41406 0-.75.33594-.75.75s.33594.75.75.75h6.33984l-1.97949 1.97949c-.29297.29297-.29297.76758 0 1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l3.25977-3.25977c.29297-.29297.29297-.76758 0-1.06055Z"
    ></path>
  </svg>
`;

// One <a> and one <button>, both with the same classes — the whole point of
// the global stylesheet is that both element types render identically.
const asLinkAndButton = (classes: string, label: string) => [
  html`
    <a href="#" class="swc-Button ${classes}" onclick="return false;">
      ${label} (link)
    </a>
  `,
  html`
    <button type="button" class="swc-Button ${classes}">
      ${label} (button)
    </button>
  `,
];

// Same variant/fill-style, size, icon anatomy, truncate, and justified
// permutations as Permutations above, but for global-button.css's
// class-based delivery on plain <a>/<button> elements (global-elements.css
// is imported in preview.ts, so these classes work with no swc-button
// import) — confirming the shared stylesheet (generated from the same
// button.css the component uses) produces identical results regardless of
// element type. `disabled` is button-only, matching the documented
// limitation that native links can't support a real disabled state.
//
const globalStylesContent = () => html`
  ${[
    { classes: '', label: 'Primary' },
    { classes: 'swc-Button--secondary', label: 'Secondary' },
    { classes: 'swc-Button--accent', label: 'Accent' },
    { classes: 'swc-Button--negative', label: 'Negative' },
    { classes: 'swc-Button--outline', label: 'Primary outline' },
    {
      classes: 'swc-Button--secondary swc-Button--outline',
      label: 'Secondary outline',
    },
  ].map(({ classes, label }) => row(asLinkAndButton(classes, label)))}
  ${[
    { classes: 'swc-Button--sizeS', label: 'Small' },
    { classes: '', label: 'Medium' },
    { classes: 'swc-Button--sizeL', label: 'Large' },
    { classes: 'swc-Button--sizeXl', label: 'Extra-large' },
  ].map(({ classes, label }) => row(asLinkAndButton(classes, label)))}
  ${row([
    html`
      <button type="button" class="swc-Button" disabled>
        Disabled (button)
      </button>
    `,
  ])}
  ${row([
    html`
      <a href="#" class="swc-Button" onclick="return false;">
        <span class="swc-Button-label">Label only (link)</span>
      </a>
    `,
    html`
      <button type="button" class="swc-Button swc-Button--hasIcon">
        ${globalIconSvg}
        <span class="swc-Button-label">With icon (button)</span>
      </button>
    `,
    html`
      <button
        type="button"
        class="swc-Button swc-Button--iconOnly"
        aria-label="Icon only"
      >
        ${globalIconSvg}
      </button>
    `,
  ])}
  ${row([
    html`
      <button
        type="button"
        class="swc-Button"
        style="--swc-button-max-inline-size: 120px;"
      >
        <span class="swc-Button-label">Submit to stakeholders</span>
      </button>
    `,
    html`
      <button
        type="button"
        class="swc-Button swc-Button--truncate"
        style="--swc-button-max-inline-size: 120px;"
      >
        <span class="swc-Button-label">Submit to stakeholders</span>
      </button>
    `,
  ])}
  ${row([
    html`
      <div style="inline-size: 240px;">
        <a
          href="#"
          class="swc-Button swc-Button--justified"
          onclick="return false;"
        >
          Justified (link)
        </a>
      </div>
    `,
    html`
      <div style="inline-size: 64px;">
        <button type="button" class="swc-Button swc-Button--justified">
          Justified narrow (button)
        </button>
      </div>
    `,
  ])}
  ${staticColorBackground(
    [
      ...asLinkAndButton('swc-Button--staticWhite', 'White'),
      ...asLinkAndButton(
        'swc-Button--staticWhite swc-Button--secondary',
        'White secondary'
      ),
    ],
    'white'
  )}
  ${staticColorBackground(
    [
      ...asLinkAndButton('swc-Button--staticBlack', 'Black'),
      ...asLinkAndButton(
        'swc-Button--staticBlack swc-Button--secondary',
        'Black secondary'
      ),
    ],
    'black'
  )}
  ${(['hover', 'focus-visible', 'active'] as const).map((state) =>
    row([
      html`
        <a
          href="#"
          class="swc-Button"
          data-force-state=${state}
          onclick="return false;"
        >
          ${state} (link)
        </a>
      `,
      html`
        <button type="button" class="swc-Button" data-force-state=${state}>
          ${state} (button)
        </button>
      `,
    ])
  )}
`;

export const GlobalStyles: Story = {
  render: () => html`
    ${theme(globalStylesContent(), 'light', 'ltr')}
    ${theme(globalStylesContent(), 'dark', 'rtl')}
  `,
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '16px' },
    autoplay: true,
  },
  // No shadowRoot on these plain elements, so forcePseudoState() mirrors
  // from document.styleSheets instead — see helpers/pseudo-state.ts.
  play: async ({ canvasElement }) => {
    applyForcedStates(canvasElement, '.swc-Button[data-force-state]');
  },
};

// Every `--swc-button-*` custom property is a public contract: consumers
// override these directly (see the Global Element Styling guide's "Custom
// properties" section), so a future CSS refactor that quietly drops one
// would be a breaking change. One row per property: a reference button next
// to the same button with that one property overridden to an obviously
// different value, so a real difference confirms the override still works.
type ModPropertyCase = {
  property: string;
  value: string;
  forceState?: ForcedPseudoState;
  disabled?: boolean;
  withIcon?: boolean;
  label?: string;
};

const MOD_PROPERTY_CASES: readonly ModPropertyCase[] = [
  { property: 'background-color-default', value: 'magenta' },
  { property: 'border-color-default', value: 'magenta' },
  { property: 'content-color-default', value: 'magenta' },
  { property: 'background-color-hover', value: 'magenta', forceState: 'hover' },
  { property: 'border-color-hover', value: 'magenta', forceState: 'hover' },
  { property: 'content-color-hover', value: 'magenta', forceState: 'hover' },
  { property: 'background-color-down', value: 'magenta', forceState: 'active' },
  { property: 'border-color-down', value: 'magenta', forceState: 'active' },
  { property: 'content-color-down', value: 'magenta', forceState: 'active' },
  { property: 'down-state-transform', value: 'none', forceState: 'active' },
  {
    property: 'background-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: 'border-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: 'content-color-focus',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  {
    property: 'focus-indicator-color',
    value: 'magenta',
    forceState: 'focus-visible',
  },
  { property: 'background-color-disabled', value: 'magenta', disabled: true },
  { property: 'border-color-disabled', value: 'magenta', disabled: true },
  { property: 'content-color-disabled', value: 'magenta', disabled: true },
  { property: 'border-radius', value: '0px' },
  { property: 'font-size', value: '24px' },
  { property: 'gap', value: '40px', withIcon: true },
  { property: 'edge-to-text', value: '40px' },
  { property: 'edge-to-visual', value: '40px', withIcon: true },
  { property: 'icon-size', value: '32px', withIcon: true },
  { property: 'icon-block-size', value: '32px', withIcon: true },
  { property: 'icon-inline-size', value: '32px', withIcon: true },
  {
    property: 'max-inline-size',
    value: '80px',
    label: 'A label long enough to need wrapping',
  },
  { property: 'min-block-size', value: '80px' },
  { property: 'padding-vertical', value: '24px' },
];

const modPropertyButton = (
  { forceState, disabled, withIcon, label = 'Label' }: ModPropertyCase,
  style?: string
) => html`
  <swc-button
    ?disabled=${disabled}
    data-force-state=${forceState ?? nothing}
    style=${style ?? nothing}
  >
    ${withIcon ? arrowIcon() : nothing}${label}
  </swc-button>
`;

// edge-to-visual-only is icon-only-specific padding, so it needs its own
// markup rather than modPropertyButton's icon+label shape. Written inline,
// not via arrowIcon() substituted as the button's only child, for the same
// reason as the icon-only case in Permutations above.
const edgeToVisualOnlyRow = row([
  html`
    <swc-button accessible-label="Label">
      <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
    </swc-button>
  `,
  html`
    <swc-button
      accessible-label="Label"
      style="--swc-button-edge-to-visual-only: 40px;"
    >
      <swc-icon slot="icon" aria-hidden="true">${Arrow100Icon()}</swc-icon>
    </swc-button>
  `,
]);

const modPropertiesContent = () => html`
  ${MOD_PROPERTY_CASES.map(
    (testCase) => html`
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 12px;">--swc-button-${testCase.property}</span>
        ${row([
          modPropertyButton(testCase),
          modPropertyButton(
            testCase,
            `--swc-button-${testCase.property}: ${testCase.value};`
          ),
        ])}
      </div>
    `
  )}
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <span style="font-size: 12px;">--swc-button-edge-to-visual-only</span>
    ${edgeToVisualOnlyRow}
  </div>
`;

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '16px' },
    autoplay: true,
  },
  play: forceButtonStates,
};
