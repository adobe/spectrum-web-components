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
 * Decorator that wraps stories in a styled container.
 * This is useful for components that benefit from horizontal layout with gap spacing.
 *
 * Stories can opt-in to this decorator in two ways:
 * 1. Setting `parameters.flexLayout = true` - Applies default flex layout styles
 *    (display: flex, gap: 24px, alignItems: center)
 * 2. Adding styles to `parameters.styles` - Applies custom styles
 *
 * When both are set, flex layout styles are applied first, then merged with custom styles.
 * If neither is provided, no wrapper is applied.
 */
export const withFlexLayout: DecoratorFunction = makeDecorator({
    name: 'withFlexLayout',
    parameterName: 'flexLayout',
    wrapper: (StoryFn, context) => {
        const { parameters } = context;
        const { flexLayout, styles } = parameters;

        // Build styles object based on flexLayout and custom styles parameters
        const stylesObj = flexLayout
            ? {
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'center',
                  ...styles,
              }
            : { ...styles };
        if (Object.keys(stylesObj).length === 0) {
            return StoryFn(context);
        }

        return html`
            <div style=${styleMap(stylesObj)}>${StoryFn(context)}</div>
        `;
    },
});
