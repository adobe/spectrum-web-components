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
import { makeDecorator } from '@storybook/preview-api';
import type { DecoratorFunction } from '@storybook/types';

import { STATIC_COLOR_DEMO_BACKGROUNDS } from './static-colors-demo.js';

/**
 * Decorator that applies background colors based on static-color arg.
 * Wraps the story in a div with the appropriate background when static-color is set.
 */
export const withStaticColorPlayground: DecoratorFunction = makeDecorator({
  name: 'withStaticColorPlayground',
  parameterName: 'staticColorPlayground',
  wrapper: (StoryFn, context) => {
    const { args } = context;
    const staticColor = args?.['static-color'] as
      | keyof typeof STATIC_COLOR_DEMO_BACKGROUNDS
      | undefined;

    const background =
      staticColor && STATIC_COLOR_DEMO_BACKGROUNDS[staticColor]
        ? STATIC_COLOR_DEMO_BACKGROUNDS[staticColor]
        : '';

    // If no static color is set, just return the story as-is
    if (!background) {
      return StoryFn(context);
    }

    // Wrap the story with the background
    return html`
      <div style="background: ${background}; padding: 24px;">
        ${StoryFn(context)}
      </div>
    `;
  },
});
