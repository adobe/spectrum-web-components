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
 * Returns `value` when it is one of `valid`, otherwise `fallback`. Use it at
 * the point of use to render the default for an invalid enum value without
 * rewriting the property the consumer set. Pair it with `validateEnum`, which
 * warns about the same value.
 *
 * @param value - The value the consumer set.
 * @param valid - The allowed values.
 * @param fallback - The value to use when `value` is not allowed.
 * @returns `value` when allowed, otherwise `fallback`.
 *
 * @example
 * ```typescript
 * resolveEnum('vertical', ['horizontal', 'vertical'], 'horizontal') // 'vertical'
 * resolveEnum('diagonal', ['horizontal', 'vertical'], 'horizontal') // 'horizontal'
 * resolveEnum(999, [100, 200], 100) // 100
 * ```
 */
export function resolveEnum<T extends string | number, F = T>(
  value: unknown,
  valid: readonly T[],
  fallback: F
): T | F {
  return (valid as readonly unknown[]).includes(value)
    ? (value as T)
    : fallback;
}
