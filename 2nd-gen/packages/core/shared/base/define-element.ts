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

interface CustomElementConstructor {
    new (...params: unknown[]): HTMLElement;
}

export function defineElement(
    name: string,
    constructor: CustomElementConstructor
): void {
    if (window.__swc && window.__swc.DEBUG) {
        if (customElements.get(name)) {
            window.__swc.warn(
                undefined,
                `Attempted to redefine <${name}>. This usually indicates that multiple versions of the same web component were loaded onto a single page.`,
                'https://opensource.adobe.com/spectrum-web-components/registry-conflicts'
            );
        }
    }
    customElements.define(name, constructor);
}
