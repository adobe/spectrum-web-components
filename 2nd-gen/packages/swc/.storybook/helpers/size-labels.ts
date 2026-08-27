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
 * Canonical t-shirt size labels for stories and VRT files.
 * Full xs–xxl set. Components index it with their own narrower size union —
 * an unsupported size fails to type-check at the call site, not here.
 */
export const SIZE_LABELS = {
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
  xxl: 'Extra-extra-large',
} as const;

export type SizeLabelKey = keyof typeof SIZE_LABELS;
