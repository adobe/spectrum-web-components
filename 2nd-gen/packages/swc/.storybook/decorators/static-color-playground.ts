/**
 * Copyright 2025 Adobe. All rights reserved.
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

/**
 * Static color background settings - matching spectrum-css gradients
 */
const staticColorSettings = {
    black: 'linear-gradient(45deg, rgb(255 241 246), rgb(238 245 255))',
    white: 'linear-gradient(45deg, rgb(64 0 22), rgb(14 24 67))',
} as const;

/**
 * Decorator that applies background colors based on static-color arg.
 * Wraps the story in a div with the appropriate background when static-color is set.
 */
export const withStaticColorPlayground: DecoratorFunction = makeDecorator({
    name: 'withStaticColorPlayground',
    parameterName: 'staticColorPlayground',
    wrapper: (StoryFn, context) => {
        const { args } = context;
        const staticColor = args?.[
            'static-color'
        ] as keyof typeof staticColorSettings;

        const background =
            staticColor && staticColorSettings[staticColor]
                ? staticColorSettings[staticColor]
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
