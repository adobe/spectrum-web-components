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
 * Composable grid builders: state matrices, arg sweeps, and one-off VRT rows.
 */

import { nothing, type TemplateResult } from 'lit';

import { capitalize } from '@spectrum-web-components/core/utils/capitalize.js';

import { SIZE_LABELS } from './constants.js';
import { Container } from './primitives.js';
import type {
  ArgGridProps,
  GridStoryContext,
  SizesProps,
  StatesProps,
  TestCaseItem,
} from './types.js';

/**
 * Repeats `Template` for each entry in `stateData` (e.g. disabled, hover, focus).
 * Merges each state's args into the template call. Use `ignore` / `include` with
 * `containerHeading` to limit states to specific `testData` sections.
 */
export function States<TArgs extends Record<string, unknown>>(
  {
    Template,
    direction = 'row',
    stateData = [],
    withStateBorder = false,
    containerStyles = {},
    wrapperStyles = {},
    containerHeading = '',
    ...args
  }: StatesProps<TArgs>,
  context: GridStoryContext = {} as GridStoryContext
): TemplateResult {
  let states = stateData;
  if (!Array.isArray(states)) {
    states = [states];
  }

  const showStateHeading = states.some((s) => s.testHeading);

  return Container(
    {
      level: 2,
      direction,
      withBorder: false,
      heading: undefined,
      containerStyles,
      content: states.map(
        ({
          testHeading = 'Default',
          wrapperStyles: stateWrapperStyles = {},
          ignore = [],
          include = [],
          ...item
        }) => {
          if (include.length && !include.includes(containerHeading)) {
            return nothing;
          }
          if (ignore.length && ignore.includes(containerHeading)) {
            return nothing;
          }

          const nextContext: GridStoryContext = {
            ...context,
            args: {
              ...context.args,
              ...args,
              ...item,
            } as typeof context.args,
          };

          return Container(
            {
              heading: showStateHeading ? testHeading : '',
              level: 3,
              withBorder: withStateBorder,
              wrapperStyles: {
                ...wrapperStyles,
                ...stateWrapperStyles,
              },
              content: Template({ ...args, ...item } as TArgs, nextContext),
            },
            nextContext
          );
        }
      ),
    },
    context
  );
}

/**
 * Sweeps one story arg (`argKey`) across `options`, rendering `Template` once per value.
 * Options default to the story `argTypes[argKey].options` when omitted.
 */
export function ArgGrid<TArgs extends Record<string, unknown>>(
  {
    Template,
    wrapperStyles = {},
    containerStyles = {},
    direction = 'row',
    heading,
    argKey,
    options: optionsProp,
    labels = {},
    level = 2,
    withBorder = true,
    withWrapperBorder = true,
    ...args
  }: ArgGridProps<TArgs>,
  context: GridStoryContext = {} as GridStoryContext
): TemplateResult | typeof nothing {
  const isDocs = context.viewMode === 'docs';

  if (typeof argKey === 'undefined') {
    console.warn('ArgGrid: argKey is required to render the grid.');
    return nothing;
  }

  const argType = context.argTypes?.[argKey];
  if (typeof argType === 'undefined') {
    console.warn(`ArgGrid: ${argKey} is not a valid argType for this story.`);
    return nothing;
  }

  let options = optionsProp;
  if (typeof options === 'undefined' || !options.length) {
    options = (argType.options ?? []) as string[];
  }

  if (typeof options === 'undefined' || !options.length) {
    console.warn(`ArgGrid: No options found for ${argKey}.`);
    return nothing;
  }

  let withInnerWrapperBorder = withWrapperBorder;
  if (!heading && isDocs) {
    withInnerWrapperBorder = false;
  }

  return Container(
    {
      heading,
      direction,
      withBorder: withInnerWrapperBorder,
      containerStyles,
      wrapperStyles,
      content: options.map((opt, index) =>
        Container(
          {
            heading: labels[opt] ?? capitalize(opt),
            level,
            withBorder,
            containerStyles,
            wrapperStyles,
            content: Template(
              {
                ...args,
                [argKey]: opt,
                ...('name' in args && typeof args.name !== 'undefined'
                  ? { name: `${String(args.name)}-${argKey}-${index}` }
                  : {}),
                ...('id' in args && typeof args.id !== 'undefined'
                  ? { id: `${String(args.id)}-${argKey}-${index}` }
                  : {}),
              } as TArgs,
              context
            ),
          },
          context
        )
      ),
    },
    context
  );
}

/** Preset `ArgGrid` for the `size` control with standard size labels. */
export function Sizes<TArgs extends Record<string, unknown>>(
  {
    withHeading = true,
    withBorder = false,
    withWrapperBorder = true,
    ...args
  }: SizesProps<TArgs>,
  context: GridStoryContext = {} as GridStoryContext
): TemplateResult | typeof nothing {
  return ArgGrid<TArgs>(
    {
      withBorder,
      withWrapperBorder,
      argKey: 'size' as keyof TArgs & string,
      labels: SIZE_LABELS,
      ...args,
      heading: withHeading ? 'Sizing' : undefined,
    },
    context
  );
}

/**
 * Helper for a single `testData` row with fixed arg overrides (e.g. line wrap, truncation).
 * Sets `withStates: false` so the row skips the interaction-state matrix.
 */
export function vrtCase<TArgs extends Record<string, unknown>>(
  render: (args: TArgs) => TemplateResult | typeof nothing,
  testHeading: string,
  overrides: Partial<TArgs>,
  wrapperStyles?: Record<string, string>
): TestCaseItem<TArgs> & Partial<TArgs> {
  return {
    Template: (args, _context) => render({ ...args, ...overrides } as TArgs),
    testHeading,
    ...(wrapperStyles ? { wrapperStyles } : {}),
    withStates: false,
    ...overrides,
  };
}
