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

import { render } from 'lit';

type SwcTestGlobals = {
    warn: (...args: unknown[]) => void;
    DEBUG?: boolean;
    issuedWarnings?: Set<string>;
};

// Returns the shared SWC test globals, creating defaults when needed.
export const getSwcTestGlobals = (): SwcTestGlobals => {
    const swcWindow = window as Window & { __swc?: SwcTestGlobals };

    if (!swcWindow.__swc) {
        swcWindow.__swc = { warn: () => {} };
    }

    return swcWindow.__swc;
};

// Enables debug warnings and captures warn calls for assertions.
export const setupSwcWarningSpy = () => {
    const swcGlobals = getSwcTestGlobals();
    const originalWarn = swcGlobals.warn;
    const originalDebug = swcGlobals.DEBUG ?? false;
    const originalIssuedWarnings = swcGlobals.issuedWarnings;
    const warnCalls: unknown[][] = [];

    swcGlobals.warn = (...args: unknown[]) => {
        warnCalls.push(args);
    };
    swcGlobals.issuedWarnings = new Set();
    swcGlobals.DEBUG = true;

    return {
        swcGlobals,
        warnCalls,
        restore: () => {
            swcGlobals.warn = originalWarn;
            swcGlobals.DEBUG = originalDebug;
            swcGlobals.issuedWarnings = originalIssuedWarnings;
        },
    };
};

/**
 * Scoped warning spy that sets up debug mode, runs the callback, and
 * automatically restores the original state — no manual `try/finally` needed.
 *
 * @example
 * ```ts
 * await withWarningSpy(async (warnCalls) => {
 *     badge.variant = 'invalid' as Badge['variant'];
 *     await badge.updateComplete;
 *     expect(warnCalls.length).toBeGreaterThan(0);
 * });
 * ```
 *
 * @param fn - Async callback that receives the captured warn calls array
 */
export async function withWarningSpy(
    fn: (warnCalls: unknown[][]) => Promise<void>
): Promise<void> {
    const { warnCalls, restore } = setupSwcWarningSpy();
    try {
        await fn(warnCalls);
    } finally {
        restore();
    }
}

/**
 * Helper to query a single component from the canvas and await its update.
 *
 * @example
 * ```ts
 * const badge = await getComponent<Badge>(canvasElement, 'swc-badge');
 * ```
 *
 * @param canvasElement - The Storybook canvas root element
 * @param selector - CSS selector for the component
 * @returns Promise that resolves to the queried element after its update completes
 */
export async function getComponent<T extends HTMLElement>(
    canvasElement: HTMLElement,
    selector: string
): Promise<T> {
    const el = canvasElement.querySelector(selector) as T;
    if ('updateComplete' in el) {
        await (el as { updateComplete: Promise<boolean> }).updateComplete;
    }
    return el;
}

/**
 * Helper to query multiple components from the canvas and await all their updates.
 *
 * @example
 * ```ts
 * const badges = await getComponents<Badge>(canvasElement, 'swc-badge');
 * ```
 *
 * @param canvasElement - The Storybook canvas root element
 * @param selector - CSS selector for the components
 * @returns Promise that resolves to an array of queried elements after all updates complete
 */
export async function getComponents<T extends HTMLElement>(
    canvasElement: HTMLElement,
    selector: string
): Promise<T[]> {
    const elements = Array.from(
        canvasElement.querySelectorAll(selector)
    ) as T[];
    await Promise.all(
        elements.map((el) =>
            'updateComplete' in el
                ? (el as { updateComplete: Promise<boolean> }).updateComplete
                : Promise.resolve()
        )
    );
    return elements;
}

/**
 * Helper to render a Lit template and return the first element.
 *
 * @example
 * ```ts
 * const badge = await fixture<Badge>(html`<swc-badge>Label</swc-badge>`);
 * ```
 *
 * @param template - Lit html template to render
 * @returns Promise that resolves to the rendered element
 */
export async function fixture<T extends HTMLElement>(
    template: unknown
): Promise<T> {
    const container = document.createElement('div');
    render(template, container);
    document.body.appendChild(container);
    const element = container.firstElementChild as T;
    await customElements.whenDefined(element.localName);
    if ('updateComplete' in element) {
        await (element as { updateComplete: Promise<boolean> }).updateComplete;
    }
    return element;
}
