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

export type Directionality = 'ltr' | 'rtl' | 'auto';

// `SpectrumElement` overrides `dir` to return the *computed* CSS direction
// rather than the attribute, so an element's authored `dir` must be read via
// `getAttribute('dir')` rather than the `dir` property. Callers pass that raw
// attribute value (or plain data's `dir` field) through here to validate and
// normalize it against the allowed `Directionality` values.
export function normalizeDir(
  value: string | null | undefined
): Directionality | undefined {
  const dir = typeof value === 'string' ? value.trim().toLowerCase() : value;
  return dir === 'ltr' || dir === 'rtl' || dir === 'auto' ? dir : undefined;
}
