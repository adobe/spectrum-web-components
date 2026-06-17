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
 * Main VRT entry point — returns a Storybook `render` function for a grid story.
 */

import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import isChromatic from 'chromatic/isChromatic';

import { Sizes, States } from './builders.js';
import { wrapWithStaticColorDemo } from './internal.js';
import { Container } from './primitives.js';
import type { GridTemplateFn, VariantsConfig } from './types.js';

/**
 * Builds the full VRT matrix for a component.
 *
 * - **Docs / dev:** renders a single `data-html-preview` instance (`Template` only).
 * - **VRT:** renders `data-testing-preview` when the toolbar **Testing preview** is on,
 *   or automatically under Chromatic.
 *
 * `testData` defines top-level sections (e.g. default matrix, static colors, edge cases).
 * `stateData` drives the per-section state columns; a blank `{}` row is prepended as "Default"
 * when states are present. Append `Sizes()` at the bottom when `withSizes` is true.
 */
export function Variants<TArgs extends Record<string, unknown>>({
  Template,
  TestTemplate,
  SizeTemplate,
  testData = [{}],
  stateData = [],
  withStateBorder = false,
  withSizes = true,
  sizeDirection,
  stateDirection,
  containerStyles = {},
  wrapperStyles = {},
}: VariantsConfig<TArgs>): GridTemplateFn<TArgs> {
  if (!Template) {
    throw new Error('Variants: Template is required');
  }

  const resolvedTestTemplate = TestTemplate ?? Template;
  const resolvedSizeTemplate = SizeTemplate ?? resolvedTestTemplate;

  const paddedStateData =
    stateData.length > 0 && Object.keys(stateData[0]).length > 0
      ? ([{}, ...stateData] as Array<(typeof stateData)[number] & TArgs>)
      : stateData;

  return (args, context) => {
    const {
      parameters: { docs = {}, showTestingGrid = false } = {},
      viewMode,
    } = context;

    const height = (docs as { story?: { height?: number | string } }).story
      ?.height;
    const width = (docs as { story?: { width?: number | string } }).story
      ?.width;

    if (viewMode === 'docs' || (!showTestingGrid && !isChromatic())) {
      return html`
        <div
          data-html-preview
          style=${styleMap({
            padding: '12px',
            'min-block-size':
              typeof height === 'number' ? `${height}px` : (height as string),
            'min-inline-size':
              typeof width === 'number' ? `${width}px` : (width as string),
            ...wrapperStyles,
          })}
        >
          ${Template(args, context)}
        </div>
      `;
    }

    return html`
      <div
        data-testing-preview
        style=${styleMap({
          padding: '24px',
          display: 'flex',
          'flex-direction': 'column',
          'flex-wrap': 'wrap',
          'align-items': 'flex-start',
          gap: '24px',
        })}
      >
        ${testData.map(
          ({
            Template: AltTemplate,
            testHeading,
            wrapperStyles: testWrapperStyles = {},
            withStates: withStatesProp,
            ...item
          }) => {
            let withStates = withStatesProp;
            if (typeof withStates === 'undefined') {
              withStates = paddedStateData.length > 0;
            }

            const withBorder = withStates || testData.length > 1;

            const data = { ...args, ...item } as TArgs;
            const Alt = wrapWithStaticColorDemo(
              AltTemplate ?? resolvedTestTemplate,
              data
            );

            let heading = testHeading;
            if (testData.some((t) => t.testHeading) && !heading) {
              heading = 'Default';
            }

            const combinedStyles = {
              ...wrapperStyles,
              ...testWrapperStyles,
            };

            return Container(
              {
                heading,
                withBorder,
                containerStyles: {
                  'z-index': '1',
                  ...containerStyles,
                },
                wrapperStyles: withStates ? containerStyles : combinedStyles,
                content: html`
                  ${when(
                    withStates,
                    () =>
                      States<TArgs>(
                        {
                          Template: Alt,
                          stateData: paddedStateData,
                          direction: stateDirection,
                          withStateBorder,
                          wrapperStyles: combinedStyles,
                          containerHeading: heading ?? '',
                          ...data,
                        },
                        context
                      ),
                    () => Alt(data, context)
                  )}
                `,
              },
              context
            );
          }
        )}
        ${when(withSizes, () =>
          Sizes<TArgs>(
            {
              Template: resolvedSizeTemplate,
              wrapperStyles,
              containerStyles,
              direction: sizeDirection,
              ...args,
            },
            context
          )
        )}
      </div>
    `;
  };
}
