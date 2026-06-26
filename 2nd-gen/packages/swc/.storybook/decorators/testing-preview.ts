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

import { makeDecorator } from '@storybook/preview-api';
import type { DecoratorFunction } from '@storybook/types';

import { isChromatic } from '../helpers/testing-grid.js';

/**
 * Lets you preview the Chromatic testing view locally.
 *
 * Maps the **Testing preview** toolbar global to `parameters.showTestingGrid` so
 * stories using the testing-grid helpers can switch between a compact docs-style
 * preview and the full VRT matrix.
 */
export const withTestingPreview: DecoratorFunction = makeDecorator({
  name: 'withTestingPreview',
  parameterName: 'testingPreview',
  wrapper: (StoryFn, context) => {
    const {
      // Testing preview reflects the state of the user-selected global value.
      globals: { testingPreview = false } = {},
      viewMode,
    } = context;

    // Set `showTestingGrid` to reflect whether the testing grid should be visible.
    // This ensures the grid is always shown in the Chromatic testing view while the
    // user-selected toolbar global is respected in the Storybook canvas.

    if (isChromatic()) {
      // Always show the testing grid under Chromatic.
      context.parameters.showTestingGrid = true;
    } else if (viewMode === 'docs') {
      // Disable the testing grid in docs view.
      context.parameters.showTestingGrid = false;
    } else {
      // In canvas view, follow the Testing preview toolbar toggle.
      context.parameters.showTestingGrid = testingPreview;
    }

    return StoryFn(context);
  },
});
