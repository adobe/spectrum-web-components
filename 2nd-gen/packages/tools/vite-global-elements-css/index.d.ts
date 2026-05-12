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

import type { Plugin } from 'vite';

export interface GlobalElementEntry {
  /**
   * Component identifier used to derive source and output paths.
   *
   * `'button'` resolves to:
   *   - source: `components/button/button.css`
   *   - base (auto): `components/button/button-base.css` (if it exists)
   *   - output: `stylesheets/global/global-button.css`
   *   - block (auto): `swc-Button`
   */
  component: string;

  /**
   * Override the source path segment when the CSS filename differs from the component name.
   * Only needed for naming discrepancies.
   *
   * @example
   * // CSS is at components/close-btn/close-btn.css but component is 'close-button'
   * { component: 'close-button', source: 'close-btn' }
   */
  source?: string;

  /**
   * Override the BEM block class used for selector derivation.
   * Derived automatically from `component` if omitted: 'button' → 'swc-Button',
   * 'action-button' → 'swc-ActionButton'.
   *
   * @example 'swc-Button'
   */
  rootElementSelector?: string;
}

export interface GlobalElementCSSOptions {
  /**
   * One entry per component whose global stylesheet should be derived.
   */
  elements: GlobalElementEntry[];
}

/**
 * Vite plugin that derives `global-{component}.css` from a component's shadow-DOM
 * stylesheet, transforming selectors to BEM class equivalents and stripping
 * component-only blocks marked with `@global-exclude` fences.
 */
export declare function globalElementCSS(
  options: GlobalElementCSSOptions
): Plugin;

/**
 * Derives the BEM block class from a component name.
 * 'button' → 'swc-Button', 'action-button' → 'swc-ActionButton'.
 */
export declare function deriveBlock(component: string): string;

/**
 * Transforms a comma-separated shadow-DOM selector list to its global BEM equivalent.
 * Wildcard selectors (`*`) are scoped to `.block, .block *`.
 * Attributes in the stable SWC API (`size`, `static-color`) are automatically prefixed:
 * `size="l"` → `--sizeL`, `static-color="white"` → `--staticWhite`.
 */
export declare function transformSelector(list: string, block: string): string;

/**
 * Derives a global-elements stylesheet from raw component shadow-DOM CSS.
 * Strips fenced blocks, removes comments, transforms selectors, merges duplicate
 * rules, and wraps in the cascade layer. Token calls are left intact for the
 * PostCSS pipeline to resolve.
 */
export declare function deriveCSS(sourceCss: string, block: string): string;
