/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { makeDecorator } from '@storybook/preview-api';
import isChromatic from 'chromatic/isChromatic';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { Container, Sizes, States } from './utilities.js';

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 * @description Lets you preview the Chromatic testing view locally
 **/
export const withTestingGridWrapper = makeDecorator({
    name: 'withTestingGridWrapper',
    parameterName: 'testingGrid',
    wrapper: (StoryFn, context) => {
        const {
            args = {},
            // Testing preview reflects the state of the user-selected global value
            globals: { testingGrid = false } = {},
            // Show testing grid reflects whether the testing grid is currently visible in the UI
            parameters: {
                docs = {},
                showTestingGrid,
                testData,
                stateData,
                withSizes,
            } = {},
            viewMode,
        } = context;

        // Below we're setting a new parameter "showTestingGrid" to reflect whether the testing grid should be visible
        // This is done to ensure that the testing grid is always visible in the Chromatic testing view
        // and that the user-selected global value is respected in the Storybook UI

        // If isChromatic() is true, we should update the global value to always show the testing grid
        if (typeof isChromatic === 'function' && isChromatic() === true) {
            context.parameters.showTestingGrid = true;
        } else if (viewMode === 'docs') {
            // If we're in the docs view, we should disable the testing grid
            context.parameters.showTestingGrid = false;
        } else if (typeof showTestingGrid === 'undefined') {
            // If the global value is undefined, we should set it to the testing preview value
            context.parameters.showTestingGrid = testingGrid;
        } else if (showTestingGrid !== testingGrid) {
            context.parameters.showTestingGrid = testingGrid;
        }

        const height = docs?.story?.height;
        const width = docs?.story?.width;

        if (
            viewMode === 'docs' ||
            (!showTestingGrid &&
                typeof isChromatic === 'function' &&
                !isChromatic())
        ) {
            return html`
                <!-- Simple, clean template preview for non-testing grid views -->
                <div
                    style=${styleMap({
                        padding: '12px',
                        'min-block-size':
                            typeof height === 'number' ? `${height}px` : height,
                        'min-inline-size':
                            typeof width === 'number' ? `${width}px` : width,
                    })}
                    data-html-preview
                >
                    ${StoryFn(args, context)}
                </div>
            `;
        }

        return html`
            <!-- Start testing grid markup -->
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
                <!-- Test data can include: a custom template, descriptive heading, and container styles -->
                <!-- Tests can also opt out of rendering the test in each available state -->
                ${testData.map(
                    ({
                        Template: AltTemplate,
                        testHeading,
                        wrapperStyles: testWrapperStyles = {},
                        withStates,
                        withSizes = false,
                        // Capture any additional data to pass to the template
                        ...item
                    }) => {
                        if (typeof withStates === 'undefined') {
                            withStates = stateData.length > 0;
                        }

                        if (
                            stateData[0] &&
                            Object.keys(stateData[0]).length !== 0
                        ) {
                            // Add a default value at the beginning of the array to represent the base state
                            stateData.unshift({});
                        }

                        // If a custom template is provided, use it, otherwise use the default template
                        if (typeof AltTemplate === 'undefined') {
                            AltTemplate = StoryFn;
                        }

                        // Show the border if we are rendering the test in multiple states or if there are several
                        // tests in the grid, this helps distinguish between tests
                        const withBorder = withStates || testData.length > 1;

                        // Merge the test data with the args to pass to the template
                        const data = { ...args, ...item };

                        // If there are other test headings in the set, add "Default" to those missing a heading
                        if (
                            testData.some(({ testHeading }) => testHeading) &&
                            !testHeading
                        ) {
                            testHeading = 'Default';
                        }

                        return Container(
                            {
                                heading: testHeading,
                                withBorder,
                                containerStyles: {
                                    // the z-index is necessary to ensure elements always appear above the overlay
                                    'z-index': '1',
                                    ...testWrapperStyles,
                                },
                                // if the test has multiple states, pass the wrapper styles to that container, otherwise use it here
                                wrapperStyles: withStates
                                    ? {}
                                    : testWrapperStyles,
                                content: html`
                                    ${when(
                                        withStates,
                                        () =>
                                            States(
                                                {
                                                    Template: AltTemplate,
                                                    stateData,
                                                    wrapperStyles:
                                                        testWrapperStyles,
                                                    containerHeading:
                                                        testHeading,
                                                    ...data,
                                                },
                                                context
                                            ),
                                        () =>
                                            when(
                                                withSizes,
                                                () =>
                                                    Sizes(
                                                        {
                                                            Template: StoryFn,
                                                            withHeading: false,
                                                            ...data,
                                                        },
                                                        context
                                                    ),
                                                () => AltTemplate(data, context)
                                            )
                                    )}
                                `,
                            },
                            context
                        );
                    }
                )}

                <!-- If sizing exists for the component, it will render all sizes for testing -->
                ${when(withSizes, () =>
                    Sizes(
                        {
                            Template: StoryFn,
                            ...args,
                        },
                        context
                    )
                )}
            </div>
        `;
    },
});
