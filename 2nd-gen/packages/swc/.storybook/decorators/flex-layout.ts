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
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Decorator that wraps stories in a flex container with consistent spacing.
 * This is useful for components that benefit from horizontal layout with gap spacing.
 *
 * Can be disabled per-story by setting parameters.flexLayout = false
 */
export const withFlexLayout: DecoratorFunction = makeDecorator({
    name: 'withFlexLayout',
    parameterName: 'flexLayout',
    wrapper: (StoryFn, context) => {
        // Allow stories to opt-out of the flex layout
        const { args, parameters } = context;
        const { flexLayout, styles } = parameters;
        const flexStyles =
            (flexLayout ?? true)
                ? { display: 'flex', gap: '24px', alignItems: 'center' }
                : undefined;

        if (!flexStyles || !styles) {
            return StoryFn(context);
        }

        return html`
            <div style=${styleMap({ ...flexStyles, ...styles })}>
                ${StoryFn(context)}
            </div>
        `;
    },
});
