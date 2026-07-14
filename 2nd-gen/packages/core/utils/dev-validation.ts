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

/**
 * Warns when `value` is not one of `valid`. Covers union-type/enum property
 * validation (e.g. `variant`, `size`).
 *
 * @param element - The component instance the warning is attributed to.
 * @param check - The enum check to perform.
 * @param check.prop - The property name, for the warning message.
 * @param check.value - The value received.
 * @param check.valid - The allowed values.
 * @param check.url - Documentation URL for the component.
 * @param check.options - Passed through to `window.__swc.warn`.
 */
export function validateEnum<T extends string>(
  element: HTMLElement,
  {
    prop,
    value,
    valid,
    url,
    options,
  }: {
    prop: string;
    value: string;
    valid: readonly T[];
    url: string;
    options?: SWCWarningOptions;
  }
): void {
  if (!window.__swc?.DEBUG) {
    return;
  }
  if ((valid as readonly string[]).includes(value)) {
    return;
  }
  window.__swc.warn(
    element,
    `<${element.localName}> expects "${prop}" to be one of: ${valid.join(', ')}. Received "${value}".`,
    url,
    { issues: [`${prop}="${value}"`], ...options }
  );
}

/**
 * Warns when `condition` is true. The general-purpose validation primitive:
 * covers required properties, conditionally required properties, mutually
 * exclusive/no-effect property combinations, and any component-specific
 * quirk that doesn't fit the other helpers here.
 *
 * @param element - The component instance the warning is attributed to.
 * @param condition - Warn when this is true.
 * @param message - The warning message.
 * @param url - Documentation URL for the component.
 * @param options - Passed through to `window.__swc.warn`.
 */
export function warnIf(
  element: HTMLElement,
  condition: boolean,
  message: string,
  url: string,
  options?: SWCWarningOptions
): void {
  if (!window.__swc?.DEBUG || !condition) {
    return;
  }
  window.__swc.warn(element, message, url, options);
}

/**
 * Warns when a slot has no assigned nodes. Covers required-slot validation.
 *
 * @param element - The component instance the warning is attributed to.
 * @param slot - The slot element to check (`null`/`undefined` counts as empty).
 * @param slotName - The slot's `name` attribute (or `"default"`), for the message.
 * @param url - Documentation URL for the component.
 * @param options - Passed through to `window.__swc.warn`.
 */
export function validateRequiredSlot(
  element: HTMLElement,
  slot: HTMLSlotElement | null | undefined,
  slotName: string,
  url: string,
  options?: SWCWarningOptions
): void {
  if (!window.__swc?.DEBUG) {
    return;
  }
  const isEmpty = !slot || slot.assignedNodes({ flatten: true }).length === 0;
  if (!isEmpty) {
    return;
  }
  window.__swc.warn(
    element,
    `<${element.localName}> requires content in the "${slotName}" slot.`,
    url,
    options
  );
}

/**
 * Warns for each assigned element in `slot` whose tag name is not in
 * `allowedTagNames`. Covers allowed-children slot validation (e.g. a heading
 * slot that only accepts `<h2>`-`<h6>`).
 *
 * @param element - The component instance the warning is attributed to.
 * @param slot - The slot element to check.
 * @param allowedTagNames - Allowed tag names (case-insensitive, e.g. `['h2', 'h3']`).
 * @param slotName - The slot's `name` attribute (or `"default"`), for the message.
 * @param url - Documentation URL for the component.
 * @param options - Passed through to `window.__swc.warn`.
 */
export function validateAllowedChildren(
  element: HTMLElement,
  slot: HTMLSlotElement | null | undefined,
  allowedTagNames: readonly string[],
  slotName: string,
  url: string,
  options?: SWCWarningOptions
): void {
  if (!window.__swc?.DEBUG || !slot) {
    return;
  }
  const allowed = allowedTagNames.map((tag) => tag.toUpperCase());
  const allowedList = allowedTagNames.map((tag) => `<${tag}>`).join(', ');
  for (const el of slot.assignedElements()) {
    if (!allowed.includes(el.tagName)) {
      window.__swc.warn(
        element,
        `<${element.localName}> "${slotName}" slot received a <${el.tagName.toLowerCase()}> element. Only ${allowedList} elements are allowed.`,
        url,
        {
          issues: [`${slotName} slot: <${el.tagName.toLowerCase()}>`],
          ...options,
        }
      );
    }
  }
}
