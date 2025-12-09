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
import type { TemplateResult } from 'lit';
import gradientBackgroundDark from '../assets/images/gradient-background-dark.png';
import gradientBackgroundLight from '../assets/images/gradient-background-light.png';

/**
 * Background settings for static color variants
 */
const staticColorBackgrounds = {
    white: `url(${gradientBackgroundDark}) no-repeat center center`,
    black: `url(${gradientBackgroundLight}) no-repeat center center`,
} as const;

/**
 * Wraps a component template in a background appropriate for the given static color
 *
 * @param content - The component template to wrap
 * @param staticColor - The static color variant ('white' or 'black')
 * @returns The wrapped template with background styling
 */
export function withStaticColorWrapper(
    content: TemplateResult,
    staticColor: 'white' | 'black'
): TemplateResult {
    const background = staticColorBackgrounds[staticColor];

    return html`
        <div
            style="background: ${background}; padding: 36px; display: flex; gap: 24px; align-items: center; justify-content: center;"
        >
            ${content}
        </div>
    `;
}

/**
 * Creates a story that displays multiple static color variants side by side
 *
 * @param renderFn - Function that renders a component with given args
 * @param variants - Array of variant configurations with args and static color
 * @returns Story render function that wraps each variant appropriately
 *
 * @example
 * ```typescript
 * export const StaticColors: Story = {
 *     render: createStaticColorStory(template, [
 *         { args: { progress: 60, label: 'Loading on dark', 'static-color': 'white' } },
 *         { args: { progress: 60, label: 'Loading on light', 'static-color': 'black' } },
 *     ]),
 *     tags: ['options'],
 * };
 * ```
 */
export function createStaticColorStory<T extends Record<string, any>>(
    renderFn: (args: T) => TemplateResult,
    variants: Array<{ args: Partial<T> }>
) {
    return (args: T) => html`
        ${variants.map(({ args: variantArgs }) =>
            withStaticColorWrapper(
                renderFn({ ...args, ...variantArgs }),
                variantArgs['static-color'] as 'white' | 'black'
            )
        )}
    `;
}

/**
 * Generates clean source code for documentation that excludes the wrapper styling
 *
 * @param componentName - The web component tag name (e.g., 'swc-progress-circle')
 * @param variants - Array of variant configurations
 * @returns Source code string for documentation
 *
 * @example
 * ```typescript
 * parameters: {
 *     docs: {
 *         source: {
 *             code: generateStaticColorSource('swc-progress-circle', [
 *                 { args: { progress: 60, label: 'Loading', 'static-color': 'white' } },
 *                 { args: { progress: 60, label: 'Loading', 'static-color': 'black' } },
 *             ]),
 *         },
 *     },
 * }
 * ```
 */
export function generateStaticColorSource<T extends Record<string, any>>(
    componentName: string,
    variants: Array<{ args: Partial<T> }>
): string {
    return variants
        .map(({ args }) => {
            const attributes = Object.entries(args)
                .map(([key, value]) => {
                    if (typeof value === 'boolean') {
                        return value ? key : '';
                    }
                    if (typeof value === 'string') {
                        return `${key}="${value}"`;
                    }
                    if (typeof value === 'number') {
                        return `${key}="${value}"`;
                    }
                    return '';
                })
                .filter(Boolean)
                .join(' ');

            return `<${componentName} ${attributes}></${componentName}>`;
        })
        .join('\n\n');
}
