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

import { setupSwcWarningSpy } from './setup-swc-warning-spy.js';

/**
 * Scoped warning spy that sets up debug mode, runs the callback, and
 * automatically restores the original state; no manual `try/finally` needed.
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
