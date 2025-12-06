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
import gradientBackgroundDark from '../assets/images/gradient-background-dark.png';
import gradientBackgroundLight from '../assets/images/gradient-background-light.png';

/**
 * Static color background settings - matching spectrum-css gradients
 */
const staticColorSettings = {
    black: `url(${gradientBackgroundLight}) no-repeat center center`,
    white: `url(${gradientBackgroundDark}) no-repeat center center`,
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

        // Wrap the story with the background
        return html`
            <div
                style="background: ${background}; padding: 36px; display: flex; gap: 24px; align-items: center; justify-content: center;"
            >
                ${StoryFn(context)}
            </div>
        `;
    },
});
