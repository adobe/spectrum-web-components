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

/**
 * Visual-regression testing grid for Button — mirrors spectrum-css
 * `components/button/stories/button.test.js`.
 *
 * Imported by `button.stories.ts`; not a Storybook CSF entry on its own.
 * Toggle **Testing preview** in the Storybook toolbar to view the grid locally.
 */

import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import {
  BUTTON_VARIANTS,
  type ButtonVariant,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/button/swc-button.js';

import {
  ArgGrid,
  Container,
  type GridTemplateFn,
  States,
  Variants as withVariantsGrid,
} from '../../../.storybook/helpers/index.js';
import { Template } from './button.template.js';

const variantLabels: Record<ButtonVariant, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  accent: 'Accent',
  negative: 'Negative',
};

/** `static-color` is only supported on primary and secondary. */
const STATIC_COLOR_VARIANTS = [
  'primary',
  'secondary',
] as const satisfies readonly ButtonVariant[];

/** Pending treatment is shown for primary and secondary only. */
const PENDING_VARIANTS = [
  'primary',
  'secondary',
] as const satisfies readonly ButtonVariant[];

const addIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M31.5 17H19V4.5a1 1 0 0 0-2 0V17H4.5a1 1 0 0 0 0 2H17v12.5a1 1 0 0 0 2 0V19h12.5a1 1 0 0 0 0-2z"/></svg>`;

const longLabel =
  'An example of text overflow behavior within the button component. When the button text is too long for the horizontal space available, it wraps to form another line.';

const staticWhiteBackground =
  'linear-gradient(45deg, rgb(64 0 22), rgb(14 24 67))';
const staticBlackBackground =
  'linear-gradient(45deg, rgb(255 241 246), rgb(238 245 255))';

/**
 * Label-only, icon + label, and icon-only buttons for each variant/treatment cell.
 */
const ButtonContentGroup: GridTemplateFn = (args, context) =>
  Container(
    {
      level: 3,
      withBorder: false,
      content: [
        Template({
          ...args,
          'default-slot': 'Label only',
        }),
        Template({
          ...args,
          'default-slot': 'Icon and label',
          'icon-slot': addIconSvg,
        }),
        Template({
          ...args,
          iconOnly: true,
          'icon-slot': addIconSvg,
          'accessible-label': 'Add',
        }),
      ],
    },
    context
  );

const ButtonIconGroup: GridTemplateFn = (args, context) =>
  Container(
    {
      level: 3,
      withBorder: false,
      content: [
        {
          testHeading: 'Leading icon',
          content: Template({
            ...args,
            'default-slot': 'Edit',
            'icon-slot': addIconSvg,
          }),
        },
        {
          testHeading: 'Long label wrap',
          content: Template({
            ...args,
            'default-slot': longLabel,
            'icon-slot': addIconSvg,
            style: 'max-inline-size: 480px',
          }),
        },
      ],
    },
    context
  );

const ButtonFillStyleGroup: GridTemplateFn = (args, context) =>
  ArgGrid(
    {
      Template: ButtonContentGroup,
      withBorder: false,
      withWrapperBorder: false,
      argKey: 'fill-style',
      labels: {
        fill: '',
        outline: '',
      },
      ...args,
    },
    context
  );

/** Interaction states shown under each variant (default row added by `States`). */
const buttonInteractionStates = [
  { testHeading: 'Default', 'vrt-state': 'default' as const },
  { testHeading: 'Hovered', 'vrt-state': 'hover' as const },
  { testHeading: 'Focused', 'vrt-state': 'focus' as const },
  { testHeading: 'Active', 'vrt-state': 'active' as const },
  { testHeading: 'Disabled', disabled: true },
];

/**
 * One variant: fill-style × content, with a column per interaction state.
 */
const ButtonVariantStatesSection: GridTemplateFn = (args, context) => {
  return Container(
    {
      withBorder: true,
      direction: 'column',
      content: States(
        {
          Template: ButtonFillStyleGroup,
          stateData: buttonInteractionStates,
          direction: 'row',
          ...args,
        },
        context
      ),
    },
    context
  );
};

/** All variants stacked; each section groups states for that variant. */
const ButtonVariantsByStateGrid: GridTemplateFn = (args, context) =>
  ArgGrid(
    {
      Template: ButtonVariantStatesSection,
      argKey: 'variant',
      options: [...BUTTON_VARIANTS],
      labels: variantLabels,
      withBorder: false,
      withWrapperBorder: false,
      direction: 'column',
      level: 1,
      ...args,
    },
    context
  );

const pendingGridArgs = {
  pending: true,
} as const;

const ButtonPendingContentGroup: GridTemplateFn = (args, context) =>
  Container(
    {
      level: 3,
      withBorder: false,
      content: [
        Template({
          ...args,
          ...pendingGridArgs,
          'default-slot': 'Save',
        }),
        Template({
          ...args,
          ...pendingGridArgs,
          'default-slot': 'Save',
          'icon-slot': addIconSvg,
        }),
        Template({
          ...args,
          ...pendingGridArgs,
          iconOnly: true,
          'icon-slot': addIconSvg,
          'accessible-label': 'Add',
        }),
      ],
    },
    context
  );

const ButtonPendingFillStyleGroup: GridTemplateFn = (args, context) =>
  ArgGrid(
    {
      Template: ButtonPendingContentGroup,
      withBorder: false,
      withWrapperBorder: false,
      argKey: 'fill-style',
      labels: {
        fill: '',
        outline: '',
      },
      ...args,
    },
    context
  );

/** Pending as its own grid section — primary and secondary only. */
const ButtonPendingGrid: GridTemplateFn = (args, context) =>
  ArgGrid(
    {
      Template: ButtonPendingFillStyleGroup,
      argKey: 'variant',
      options: [...PENDING_VARIANTS],
      labels: variantLabels,
      withBorder: false,
      withWrapperBorder: false,
      direction: 'column',
      level: 1,
      ...args,
    },
    context
  );

/**
 * Full variant × treatment × content × state matrix for Chromatic / VRT.
 */
export const ButtonGroups = withVariantsGrid({
  Template: ButtonContentGroup,
  testData: [
    {
      Template: ButtonVariantsByStateGrid,
    },
    {
      Template: ButtonPendingGrid,
      testHeading: 'Pending',
      withStates: false,
    },
    {
      Template: (args, context) => html`
        <div
          style=${styleMap({
            padding: '24px',
            color: 'white',
            background: staticWhiteBackground,
          })}
        >
          ${ButtonVariantsByStateGrid(
            {
              ...args,
              'static-color': 'white',
              options: [...STATIC_COLOR_VARIANTS],
            },
            context
          )}
        </div>
      `,
      testHeading: 'Static white',
    },
    {
      Template: (args, context) => html`
        <div
          style=${styleMap({
            padding: '24px',
            color: 'black',
            background: staticBlackBackground,
          })}
        >
          ${ButtonVariantsByStateGrid(
            {
              ...args,
              'static-color': 'black',
              options: [...STATIC_COLOR_VARIANTS],
            },
            context
          )}
        </div>
      `,
      testHeading: 'Static black',
    },
    {
      Template: ButtonIconGroup,
      testHeading: 'Line wrap',
      wrapperStyles: {
        'max-inline-size': '480px',
      },
      withStates: false,
    },
    {
      Template: (args) =>
        Template({
          ...args,
          truncate: true,
          'default-slot': 'Be a premium member',
          'icon-slot': addIconSvg,
          style: 'max-inline-size: 120px',
        }),
      testHeading: 'Truncation',
      withStates: false,
    },
  ],
  stateData: [],
  sizeDirection: 'row',
  withSizes: true,
});
