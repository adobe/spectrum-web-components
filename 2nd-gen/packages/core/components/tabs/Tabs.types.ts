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
 * Valid orientation directions for the tabs component.
 *
 * **Breaking change (B13):** `'vertical-right'` was supported in 1st-gen
 * but is not part of the Spectrum CSS specification and has been removed.
 * Consumers using `direction="vertical-right"` must switch to
 * `direction="vertical"`.
 */
export const TABS_DIRECTIONS = ['horizontal', 'vertical'] as const;

export type TabsDirection = (typeof TABS_DIRECTIONS)[number];

export const TABS_DEFAULT_DIRECTION =
  'horizontal' as const satisfies TabsDirection;

/**
 * Structural interface for tab-like elements managed by the tabs
 * container. Allows the base class to work with any element that
 * satisfies this contract without coupling to a concrete class.
 */
export interface TabLike extends HTMLElement {
  value: string;
  selected: boolean;
  disabled: boolean;
}

/**
 * Structural interface for tab-panel-like elements managed by the
 * tabs container.
 */
export interface TabPanelLike extends HTMLElement {
  value: string;
  selected: boolean;
}
