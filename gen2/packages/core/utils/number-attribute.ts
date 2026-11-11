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

import type { ComplexAttributeConverter } from 'lit';

/**
 * Returns numeric text as a number and any other value unchanged.
 *
 * A numeric property can hold a string: frameworks such as React 19 and Vue
 * set custom element properties directly, so `<swc-accordion level="4">` in
 * JSX assigns `level = "4"`, and `numberAttribute` keeps non-numeric markup as
 * text. Read the property through this helper before comparing it or doing
 * math with it, so `"4"` behaves like `4`. It doesn't change the property.
 *
 * @param value - The property value.
 * @returns `value` as a number when it is numeric text, otherwise `value`.
 *
 * @example
 * ```typescript
 * parseNumericText('4') // 4
 * parseNumericText(4) // 4
 * parseNumericText('banana') // 'banana'
 * parseNumericText(null) // null
 * ```
 */
export function parseNumericText<T>(value: T): T | number {
  if (typeof value !== 'string' || value.trim() === '') {
    return value;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : value;
}

/**
 * Builds an attribute converter for a reflected numeric property that keeps
 * the consumer's text when it isn't a number.
 *
 * Lit's default `Number` converter parses `size="banana"` to `NaN`. A
 * reflected property with a default value has already queued a write to its
 * attribute when the element is created, so the first update then writes
 * `size="NaN"` over the consumer's markup. Keeping the raw text instead means
 * that write puts back exactly what the consumer wrote.
 *
 * - A numeric attribute becomes a number.
 * - Any other text, including an empty attribute, stays a string. Read the
 *   property through `parseNumericText`, then check it with `Number.isFinite`,
 *   `validateEnum`, or `resolveEnum`, so the text renders the default.
 * - A removed attribute becomes `whenRemoved`.
 *
 * @param whenRemoved - The property value when the attribute is removed.
 * @returns A converter for the `converter` option of `@property`.
 *
 * @example
 * ```typescript
 * @property({ type: Number, reflect: true, converter: numberAttribute(100) })
 * public size: AvatarSize = 100;
 * ```
 */
export function numberAttribute<T extends number | null>(
  whenRemoved: T
): ComplexAttributeConverter<number | string | T> {
  return {
    fromAttribute: (value: string | null): number | string | T => {
      return value === null ? whenRemoved : parseNumericText(value);
    },
  };
}
