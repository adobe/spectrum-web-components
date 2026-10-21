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

/**
 * Defines a custom element in a registry, the global registry by default.
 * Defining the same constructor again does nothing, so components that share
 * a dependency can each define it. A different constructor for a defined name
 * throws.
 */
export function defineElement(
  name: string,
  constructor: CustomElementConstructor,
  registry: CustomElementRegistry = customElements
): void {
  const existing = registry.get(name);
  if (existing === constructor) {
    return;
  }
  if (window.__swc && window.__swc.DEBUG) {
    if (existing) {
      window.__swc.warn(
        undefined,
        `Attempted to redefine <${name}>. This usually indicates that multiple versions of the same web component were loaded onto a single page.`,
        'https://spectrum-web-components.adobe.com/registry-conflicts'
      );
    }
  }
  registry.define(name, constructor);
}
