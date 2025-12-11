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

import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

// ────────────────────────
//    STRING UTILITIES
// ────────────────────────

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - String to capitalize
 * @returns Capitalized string or empty string if input is not a string
 *
 * @example
 * ```typescript
 * capitalize('positive') // 'Positive'
 * capitalize('red')      // 'Red'
 * ```
 */
export function capitalize(str?: string): string {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ────────────────────────
//    LAYOUT CONTAINERS
// ────────────────────────

/**
 * Container for laying out components in a flexible grid.
 * Used in stories to display multiple variants side by side.
 *
 * @param content - Array of template results to render
 * @param gap - Gap between items (default: var(--spectrum-spacing-200))
 * @param maxInlineSize - Maximum inline size for readability (default: 80ch)
 * @returns Template result with flex layout
 *
 * @example
 * ```typescript
 * export const AllVariants: Story = {
 *     render: () =>
 *         Container(
 *             Badge.VARIANTS.map((variant) => html`
 *                 <swc-badge variant=${variant}>${variant}</swc-badge>
 *             `)
 *         ),
 * };
 * ```
 */
export function Container(
    content: TemplateResult[],
    gap: string = 'var(--spectrum-spacing-200)',
    maxInlineSize: string = '80ch'
): TemplateResult {
    return html`<div
        style=${styleMap({
            display: 'flex',
            gap,
            'flex-wrap': 'wrap',
            'justify-content': 'center',
            // Used 80ch because that's generally considered the maximum readable width for text in a web page.

            'max-inline-size': maxInlineSize,
        })}
    >
        ${content}
    </div>`;
}

/**
 * Grid container for more structured layouts.
 *
 * @param content - Array of template results to render
 * @param columns - Number of columns (default: 4)
 * @returns Template result with grid layout
 *
 * @example
 * ```typescript
 * export const GridLayout: Story = {
 *     render: () =>
 *         GridContainer(
 *             Badge.VARIANTS.map((variant) => html`
 *                 <swc-badge variant=${variant}>${variant}</swc-badge>
 *             `),
 *             3
 *         ),
 * };
 * ```
 */
export function GridContainer(
    content: TemplateResult[],
    columns: number = 4
): TemplateResult {
    return html`<div
        style=${styleMap({
            display: 'grid',
            'grid-template-columns': `repeat(${columns}, 1fr)`,
            gap: 'var(--spectrum-spacing-200)',
        })}
    >
        ${content}
    </div>`;
}

/**
 * Horizontal flex container with centered alignment.
 * Common pattern for displaying multiple variants side by side.
 *
 * @param content - Array of template results or single template result
 * @param gap - Gap between items (default: 'var(--spectrum-spacing-300)' = 24px)
 * @returns Template result with horizontal flex layout
 *
 * @example
 * ```typescript
 * export const Sizes: Story = {
 *     render: () =>
 *         HorizontalContainer(
 *             Badge.VALID_SIZES.map((size) => html`
 *                 <swc-badge size=${size}>${size}</swc-badge>
 *             `)
 *         ),
 * };
 * ```
 */
export function HorizontalContainer(
    content: TemplateResult | TemplateResult[],
    gap: string = 'var(--spectrum-spacing-300)'
): TemplateResult {
    return html`<div
        style=${styleMap({
            display: 'flex',
            gap,
            'align-items': 'center',
        })}
    >
        ${content}
    </div>`;
}

/**
 * Vertical flex container.
 * Useful for stacking components vertically with consistent spacing.
 *
 * @param content - Array of template results or single template result
 * @param gap - Gap between items (default: 'var(--spectrum-spacing-200)' = 16px)
 * @returns Template result with vertical flex layout
 *
 * @example
 * ```typescript
 * export const VerticalStack: Story = {
 *     render: () =>
 *         VerticalContainer([
 *             html`<swc-badge variant="positive">Success</swc-badge>`,
 *             html`<swc-badge variant="negative">Error</swc-badge>`,
 *         ]),
 * };
 * ```
 */
export function VerticalContainer(
    content: TemplateResult | TemplateResult[],
    gap: string = 'var(--spectrum-spacing-200)'
): TemplateResult {
    return html`<div
        style=${styleMap({
            display: 'flex',
            'flex-direction': 'column',
            gap,
        })}
    >
        ${content}
    </div>`;
}
