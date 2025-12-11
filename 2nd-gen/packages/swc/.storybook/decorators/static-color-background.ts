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

import { makeDecorator } from '@storybook/preview-api';
import type { DecoratorFunction } from '@storybook/types';
import { html } from 'lit';

/**
 * Static color background settings - matching spectrum-css gradients
 */
const staticColorSettings = {
    black: `var(--spectrum-examples-gradient-static-black)`,
    white: `var(--spectrum-examples-gradient-static-white)`,
} as const;

/**
 * Decorator that applies background colors based on static-color arg.
 * Wraps the story in a div with the appropriate background when static-color is set.
 */
export const withStaticColorBackground: DecoratorFunction = makeDecorator({
    name: 'withStaticColorBackground',
    parameterName: 'staticColorBackground',
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

        // Wrap the story with the background.
        // Note: withFlexLayout will handle the flex styling if enabled,
        // so we only add justify-content: center here for additional centering.
        return html`
            <div
                style="background: ${background}; padding: 36px; display: flex; justify-content: center;"
            >
                ${StoryFn(context)}
            </div>
        `;
    },
});
