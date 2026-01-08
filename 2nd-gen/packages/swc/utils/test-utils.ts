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

import { render } from 'lit';

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
