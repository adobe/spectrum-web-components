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

export const FLEX_LAYOUT_TYPES = [
    'column-center',
    'column-stretch',
    'row-wrap',
    'row-nowrap',
] as const;
export type FlexLayoutType = (typeof FLEX_LAYOUT_TYPES)[number];

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

        // If no flexLayout or styles provided, render story normally
        if (!flexLayout && !styles) {
            return StoryFn(context);
        }

        let compiledStyles: Record<string, string> = {};

        switch (flexLayout as FlexLayoutType) {
            case 'column-center':
                compiledStyles = {
                    display: 'flex',
                    gap: 'var(--spectrum-spacing-100)',
                    flexDirection: 'column',
                    alignItems: 'center',
                    'max-inline-size': '80ch',
                    ...styles,
                };
                break;

            case 'column-stretch':
                compiledStyles = {
                    display: 'flex',
                    gap: 'var(--spectrum-spacing-100)',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    'max-inline-size': '80ch',
                    ...styles,
                };
                break;

            case 'row-wrap':
                compiledStyles = {
                    display: 'flex',
                    gap: 'var(--spectrum-spacing-200)',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    'max-inline-size': '80ch',
                    ...styles,
                };
                break;

            case 'row-nowrap':
                compiledStyles = {
                    display: 'flex',
                    gap: 'var(--spectrum-spacing-200)',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    'max-inline-size': '80ch',
                    ...styles,
                };
                break;

            default:
                // If flexLayout is not a valid type but styles exist, use styles only
                compiledStyles = styles || {};
                break;
        }

        // If no styles were compiled, render story normally
        if (Object.keys(compiledStyles).length === 0) {
            return StoryFn(context);
        }

        return html`
            <div style=${styleMap(compiledStyles)}>${StoryFn(context)}</div>
        `;
    },
});
