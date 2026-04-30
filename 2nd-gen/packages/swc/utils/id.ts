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
 * Returns a collision-resistant component id with the provided prefix.
 * Uses getRandomValues() to remain compatible in non-secure contexts.
 */
export function uniqueId(prefix: string): string {
  const randomPart = Array.from(
    crypto.getRandomValues(new Uint8Array(4)),
    (b) => `0${(b & 0xff).toString(16)}`.slice(-2)
  ).join('');
  return `${prefix}-${randomPart}`;
}
