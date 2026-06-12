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
 */

import {
  BUTTON_FILL_STYLES,
  BUTTON_VARIANTS,
  type ButtonFillStyle,
  type ButtonVariant,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/button/swc-button.js';

import {
  ArgGrid,
  Container,
  type GridTemplateFn,
  Variants as withVariantsGrid,
} from '../../../.storybook/helpers/index.js';
import { addIconTemplate, Template } from '../stories/button.template.js';

const STATIC_COLOR_VARIANTS = [
  'primary',
  'secondary',
] as const satisfies readonly ButtonVariant[];

const NESTED_ARG_GRID = {
  withBorder: false,
  withWrapperBorder: false,
} as const;

const longLabel =
  'An example of text overflow behavior within the button component. When the button text is too long for the horizontal space available, it wraps to form another line.';

/** `outline` is only supported on primary and secondary. */
const fillStyleOptionsForVariant = (
  variant?: ButtonVariant
): ButtonFillStyle[] =>
  variant === 'accent' || variant === 'negative'
    ? ['fill']
    : [...BUTTON_FILL_STYLES];

const ButtonContentGroup: GridTemplateFn = (args, context) =>
  Container(
    {
      level: 3,
      withBorder: false,
      content: [
        Template({ ...args, 'default-slot': 'Label only' }),
        Template({
          ...args,
          'default-slot': 'Icon and label',
          'icon-slot': addIconTemplate,
        }),
        Template({
          ...args,
          iconOnly: true,
          'icon-slot': addIconTemplate,
          'accessible-label': 'Add',
        }),
      ],
    },
    context
  );

const ButtonFillStyleGroup: GridTemplateFn = (args, context) =>
  ArgGrid(
    {
      Template: ButtonContentGroup,
      argKey: 'fill-style',
      options: fillStyleOptionsForVariant(args.variant as ButtonVariant),
      labels: { fill: '', outline: '' },
      ...NESTED_ARG_GRID,
      ...args,
    },
    context
  );

const ButtonVariantGroup: GridTemplateFn = (args, context) =>
  ArgGrid(
    {
      Template: ButtonFillStyleGroup,
      argKey: 'variant',
      options: args['static-color']
        ? [...STATIC_COLOR_VARIANTS]
        : [...BUTTON_VARIANTS],
      ...NESTED_ARG_GRID,
      ...args,
    },
    context
  );

export const ButtonVRTRender = withVariantsGrid({
  Template: ButtonContentGroup,
  testData: [
    { Template: ButtonVariantGroup },
    {
      Template: ButtonVariantGroup,
      testHeading: 'Static white',
      'static-color': 'white',
    },
    {
      Template: ButtonVariantGroup,
      testHeading: 'Static black',
      'static-color': 'black',
    },
    {
      Template: (args) =>
        Template({
          ...args,
          'default-slot': longLabel,
          'icon-slot': addIconTemplate,
        }),
      testHeading: 'Line wrap',
      wrapperStyles: { 'max-inline-size': '480px' },
      withStates: false,
    },
    {
      Template: (args) =>
        Template({
          ...args,
          truncate: true,
          'default-slot': 'Be a premium member',
          'icon-slot': addIconTemplate,
          style: 'max-inline-size: 120px',
        }),
      testHeading: 'Truncation',
      withStates: false,
    },
  ],
  withStateBorder: true,
  stateData: [
    { testHeading: 'Disabled', disabled: true },
    { testHeading: 'Hovered', 'vrt-state': 'hover' },
    { testHeading: 'Focused', 'vrt-state': 'focus' },
    { testHeading: 'Active', 'vrt-state': 'active' },
    {
      testHeading: 'Pending',
      pending: true,
      ignore: ['Static black', 'Static white'],
    },
  ],
  sizeDirection: 'column',
  withSizes: true,
});
