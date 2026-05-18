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
 * Maps the "Testing preview" toolbar global to `parameters.showTestingGrid`, matching
 * spectrum-css `.storybook/decorators/testing-preview.js`.
 */
export const withTestingPreview: DecoratorFunction = makeDecorator({
  name: 'withTestingPreview',
  parameterName: 'testingPreview',
  wrapper: (StoryFn, context) => {
    const {
      globals: { testingPreview = false } = {},
      parameters: { showTestingGrid } = {},
      viewMode,
    } = context;

    if (isChromatic()) {
      context.parameters.showTestingGrid = true;
    } else if (viewMode === 'docs') {
      context.parameters.showTestingGrid = false;
    } else if (typeof showTestingGrid === 'undefined') {
      context.parameters.showTestingGrid = testingPreview;
    } else if (showTestingGrid !== testingPreview) {
      context.parameters.showTestingGrid = testingPreview;
    }

    return StoryFn(context);
  },
});
