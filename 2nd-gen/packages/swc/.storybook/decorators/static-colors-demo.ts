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
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Static color background settings - matching spectrum-css gradients
 */
const staticColorSettings = {
    black: 'linear-gradient(45deg, rgb(255 241 246), rgb(238 245 255))',
    white: 'linear-gradient(45deg, rgb(64 0 22), rgb(14 24 67))',
} as const;

/**
 * Decorator that displays static color variants side-by-side with appropriate backgrounds.
 * The first child gets a dark gradient background (for static-color="white"),
 * and the last child gets a light gradient background (for static-color="black").
 *
 * Enable per-story by setting parameters.staticColorsDemo = true
 */
export const withStaticColorsDemo: DecoratorFunction = makeDecorator({
    name: 'withStaticColorsDemo',
    parameterName: 'staticColorsDemo',
    wrapper: (StoryFn, context) => {
        const { parameters } = context;
        const { styles, staticColorsDemo } = parameters;

        // Only apply when staticColorsDemo is enabled
        if (!staticColorsDemo) {
            return StoryFn(context);
        }

        return html`
            <style>
                .spectrum-examples-static-colors {
                    display: flex;
                    gap: 24px;
                    align-items: center;
                }
                .spectrum-examples-static-colors > * {
                    padding: 24px;
                }

                .spectrum-examples-static-colors > *:first-child {
                    color: white;
                    background: ${staticColorSettings.white};
                }

                .spectrum-examples-static-colors > *:last-child {
                    color: black;
                    background: ${staticColorSettings.black};
                }
            </style>
            <div
                class="spectrum-examples-static-colors"
                style=${styleMap({ ...styles })}
            >
                ${StoryFn(context)}
            </div>
        `;
    },
});
