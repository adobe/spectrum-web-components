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

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';

/** Returns the checkbox's inner native input, or throws if it didn't render. */
export function inputOf(checkbox: Checkbox): HTMLInputElement {
  const input = checkbox.shadowRoot?.querySelector('input');
  if (!input) {
    throw new Error('swc-checkbox rendered no input');
  }
  return input;
}

/** Returns a rendered part of the checkbox's shadow root, or `null`. */
export function partOf<T extends Element = HTMLElement>(
  checkbox: Checkbox,
  selector: string
): T | null {
  return checkbox.shadowRoot?.querySelector<T>(selector) ?? null;
}

/** Returns the first element matching `selector`, or throws if there is none. */
export function elementOf<T extends Element>(
  root: ParentNode,
  selector: string
): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Test requires ${selector}`);
  }
  return element;
}
