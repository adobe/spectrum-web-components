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
import { Variants } from './utilities.js';

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

        // @todo: can we fetch custom test data or state data from the story?
        return Variants({
            Template: StoryFn,
            testData,
            stateData,
            withSizes,
        })(args, context);
    },
});
