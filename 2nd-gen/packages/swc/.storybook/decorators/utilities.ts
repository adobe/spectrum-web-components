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
 * @param gap - Gap between items (default: var(--swc-spacing-200))
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
    gap: string = 'var(--swc-spacing-200)',
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
            gap: 'var(--swc-spacing-200)',
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
 * @param gap - Gap between items (default: 'var(--swc-spacing-300)' = 16px)
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
    gap: string = 'var(--swc-spacing-300)'
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
 * @param gap - Gap between items (default: 'var(--swc-spacing-200)' = 12px)
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
    gap: string = 'var(--swc-spacing-200)'
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

// ────────────────────────────────────
//    PERMUTATIONS
// ────────────────────────────────────

/**
 * Defines permutation options where each property maps to an array of possible values.
 */
export type PermutationOptions<T> = {
    [K in keyof T]?: ReadonlyArray<T[K]>;
};

/**
 * Creates a cartesian product of all property combinations.
 *
 * @param options - Object where each key maps to an array of possible values
 * @returns Array of all combinations
 *
 * @example
 * ```typescript
 * const combos = createPermutations({
 *     variant: ['positive', 'negative'],
 *     size: ['s', 'm'],
 * });
 * // Result: [
 * //   { variant: 'positive', size: 's' },
 * //   { variant: 'positive', size: 'm' },
 * //   { variant: 'negative', size: 's' },
 * //   { variant: 'negative', size: 'm' },
 * // ]
 * ```
 */
export function createPermutations<T>(
    options: PermutationOptions<T>
): Partial<T>[] {
    const keys = Object.keys(options) as Array<keyof T>;
    const result: Partial<T>[] = [];

    function recurse(index: number, current: Partial<T>): void {
        if (index === keys.length) {
            result.push({ ...current });
            return;
        }

        const key = keys[index];
        const values = options[key];

        if (values && values.length > 0) {
            for (const value of values) {
                current[key] = value;
                recurse(index + 1, current);
            }
        } else {
            recurse(index + 1, current);
        }
    }

    recurse(0, {});
    return result;
}

// ────────────────────────────────────
//    STATES
// ────────────────────────────────────

/**
 * Interaction states for VRT testing.
 */
export type InteractionState = 'default' | 'hover' | 'active' | 'focus';

/**
 * All interaction states.
 */
export const INTERACTION_STATES: readonly InteractionState[] = [
    'default',
    'hover',
    'active',
    'focus',
];

/**
 * Wraps content with a state class for CSS-based state simulation.
 *
 * @param state - The interaction state to apply
 * @param content - The content to wrap
 * @returns Template with state class applied
 */
export function withState(
    state: InteractionState,
    content: TemplateResult
): TemplateResult {
    if (state === 'default') {
        return content;
    }

    // Uses classes that can be targeted with CSS to simulate states
    return html`<div class="is-${state}">${content}</div>`;
}

/**
 * Creates permutations combined with interaction states.
 *
 * @param options - Permutation options
 * @param states - States to combine with (default: all states)
 * @returns Array of combinations, each with a `state` property
 *
 * @example
 * ```typescript
 * const combos = createPermutationsWithStates(
 *     { variant: ['positive', 'negative'] },
 *     ['default', 'hover']
 * );
 * // Result: [
 * //   { variant: 'positive', state: 'default' },
 * //   { variant: 'positive', state: 'hover' },
 * //   { variant: 'negative', state: 'default' },
 * //   { variant: 'negative', state: 'hover' },
 * // ]
 * ```
 */
export function createPermutationsWithStates<T>(
    options: PermutationOptions<T>,
    states: readonly InteractionState[] = INTERACTION_STATES
): Array<Partial<T> & { state: InteractionState }> {
    const basePermutations = createPermutations(options);
    const result: Array<Partial<T> & { state: InteractionState }> = [];

    for (const perm of basePermutations) {
        for (const state of states) {
            result.push({ ...perm, state });
        }
    }

    return result;
}

// ────────────────────────────────────
//    VRT CONTAINERS
// ────────────────────────────────────

/**
 * Renders content in two side-by-side containers:
 * - Left: Light theme, medium scale, LTR
 * - Right: Dark theme, large scale, RTL
 *
 * @param content - Function that receives the context and returns content
 * @returns Template with both containers
 *
 * @example
 * ```typescript
 * export const VRT: Story = {
 *     render: () =>
 *         renderVRTContainers((ctx) =>
 *             createPermutations({ variant: Badge.VARIANTS }).map((combo) =>
 *                 html`<swc-badge variant=${combo.variant}>Badge</swc-badge>`
 *             )
 *         ),
 *     tags: ['!autodocs'],
 * };
 * ```
 */
export function renderVRTContainers(
    content: (context: {
        theme: 'light' | 'dark';
        scale: 'medium' | 'large';
        dir: 'ltr' | 'rtl';
    }) => TemplateResult | TemplateResult[]
): TemplateResult {
    const lightContext = {
        theme: 'light' as const,
        scale: 'medium' as const,
        dir: 'ltr' as const,
    };
    const darkContext = {
        theme: 'dark' as const,
        scale: 'large' as const,
        dir: 'rtl' as const,
    };

    return html`<div
        style=${styleMap({
            display: 'flex',
            'flex-direction': 'column',
        })}
    >
        ${renderThemedContainer(lightContext, content(lightContext))}
        ${renderThemedContainer(darkContext, content(darkContext))}
    </div>`;
}

/**
 * Renders a single themed container with label.
 */
function renderThemedContainer(
    context: {
        theme: 'light' | 'dark';
        scale: 'medium' | 'large';
        dir: 'ltr' | 'rtl';
    },
    content: TemplateResult | TemplateResult[]
): TemplateResult {
    const label = `${context.theme}, ${context.scale}, ${context.dir === 'ltr' ? 'LTR' : 'RTL'}`;
    const scaleClass = context.scale === 'large' ? 'spectrum-theme--sizeL' : '';

    return html`<div
        class="spectrum-theme spectrum-theme--${context.theme} ${scaleClass}"
        dir=${context.dir}
        style=${styleMap({
            padding: '24px',
            'background-color': 'var(--swc-background-base-color)',
        })}
    >
        <div style="margin-block-end: 16px;">
            <span
                class="chromatic-ignore .swc-Typography"
                style=${styleMap({
                    'font-family':
                        'adobe-clean, -apple-system, BlinkMacSystemFont, sans-serif',
                    'font-size': '14px',
                    'font-weight': '300',
                    color: 'var(--swc-neutral-content-color-default)',
                })}
                >${label}</span
            >
        </div>
        <div
            style=${styleMap({
                display: 'flex',
                'flex-wrap': 'wrap',
                gap: '12px',
                'align-items': 'center',
            })}
        >
            ${content}
        </div>
    </div>`;
}

// ────────────────────────────────────
//    VRT TEMPLATE HELPERS
// ────────────────────────────────────

/**
 * Configuration for a VRT template.
 */
export interface VRTTemplateConfig {
    /** The template function that renders each permutation */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Template: (args: Record<string, any>) => TemplateResult;
    /**
     * Permutation options for this template.
     * Can be a single object or an array of objects (all rendered with the same Template).
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    permutations: Record<string, readonly any[]> | Record<string, readonly any[]>[];
    /** Whether to include interaction states (default: false) */
    withStates?: boolean;
    /** Specific states to include (default: all) */
    states?: readonly InteractionState[];
}

/**
 * Renders a set of permutations using the provided template.
 *
 * @param config - Template configuration
 * @returns Array of rendered templates
 *
 * @example
 * ```typescript
 * // Single permutation set
 * renderPermutations({
 *     Template: ({ variant, state }) => html`
 *         <swc-badge variant=${variant}>Badge</swc-badge>
 *     `,
 *     permutations: { variant: ['positive', 'negative'] },
 *     withStates: true,
 *     states: ['default', 'hover'],
 * })
 *
 * // Multiple permutation sets with same template
 * renderPermutations({
 *     Template: (args) => template(args),
 *     permutations: [
 *         { variant: Badge.VARIANTS_SEMANTIC, 'icon-slot': ['', '✓'] },
 *         { variant: Badge.VARIANTS_COLOR, 'icon-slot': [''] },
 *     ],
 * })
 * ```
 */
export function renderPermutations({
    Template,
    permutations,
    withStates = false,
    states = INTERACTION_STATES,
}: VRTTemplateConfig): TemplateResult[] {
    // Normalize to array
    const permutationSets = Array.isArray(permutations)
        ? permutations
        : [permutations];

    const results: TemplateResult[] = [];

    for (const permSet of permutationSets) {
        if (withStates) {
            const combos = createPermutationsWithStates(permSet, states);
            for (const combo of combos) {
                const content = Template(combo);
                results.push(withState(combo.state, content));
            }
        } else {
            const combos = createPermutations(permSet);
            for (const combo of combos) {
                results.push(Template(combo));
            }
        }
    }

    return results;
}

/**
 * Creates a complete VRT story with two containers and permutations.
 *
 * @param configs - Array of template configurations to render
 * @returns Template result for the VRT story
 *
 * @example
 * ```typescript
 * export const VRT: Story = {
 *     render: () =>
 *         VRT([
 *             {
 *                 Template: ({ variant }) =>
 *                     html`<swc-badge variant=${variant}>Badge</swc-badge>`,
 *                 permutations: { variant: Badge.VARIANTS_SEMANTIC },
 *             },
 *             {
 *                 Template: ({ variant }) =>
 *                     html`<swc-badge variant=${variant} outline>Outline</swc-badge>`,
 *                 permutations: { variant: Badge.VARIANTS_SEMANTIC },
 *                 withStates: true,
 *                 states: ['default', 'hover'],
 *             },
 *         ]),
 *     parameters: { layout: 'fullscreen' },
 *     tags: ['!autodocs'],
 * };
 * ```
 */
export function VRT(configs: VRTTemplateConfig[]): TemplateResult {
    return renderVRTContainers(
        () => html`${configs.flatMap((config) => renderPermutations(config))}`
    );
}
