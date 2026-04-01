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
 * Feature detection and token building for the proposed HTML `focusgroup` attribute.
 *
 * This module stays **small and dependency-free** so both the native path and polyfill
 * can import it without pulling in Lit.
 *
 * **Maintainers:** Token strings must track the Open UI / HTML proposal and Chromium.
 * See `composite-focus-navigation.ts` for design context and links.
 *
 * @packageDocumentation
 */

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

/**
 * Which logical axes participate in focusgroup navigation (`inline` / `block` in the
 * proposal). `both` adds both tokens so either axis can be used by the engine.
 */
export type FocusgroupAxis = 'inline' | 'block' | 'both';

/**
 * Spectrum composite “kind” used only to pick a **default** `focusgroup="…"` string.
 * These names are SWC conveniences, not spec enums.
 */
export type SwcCompositeKind =
  | 'toolbar'
  | 'tablist'
  | 'menubar'
  | 'menu'
  | 'listbox'
  | 'radiogroup'
  | 'accordion-headers'
  | 'segmented-control'
  | 'generic-linear';

/**
 * Whether Tab returns to the **last** focused item in the group or always follows DOM
 * order (`nomemory` in the proposal).
 */
export type FocusgroupMemoryMode = 'memory' | 'nomemory';

/**
 * Options for {@link buildFocusgroupAttribute} when you are not using
 * {@link defaultFocusgroupForKind}.
 */
export interface NativeFocusgroupOptions {
  /** Primary navigation axis for linear composites. */
  axis: FocusgroupAxis;
  /** If set, emits `wrap` or `nowrap` in the attribute string. */
  wrap?: boolean;
  /** If `nomemory`, emits the `nomemory` token. */
  memory?: FocusgroupMemoryMode;
}

// ─────────────────────────────────────────────────────────────
// Feature detection
// ─────────────────────────────────────────────────────────────

/**
 * True when the runtime exposes the `focusgroup` IDL on `HTMLElement`, as described in
 * Chromium’s public `focusgroup` developer feedback. Use this to choose native vs
 * polyfill behavior in one place.
 */
export function hasNativeFocusgroup(): boolean {
  return (
    typeof HTMLElement !== 'undefined' &&
    // If the spec moves the IDL to `Element`, widen this check in this function only.
    'focusgroup' in HTMLElement.prototype
  );
}

// ─────────────────────────────────────────────────────────────
// Attribute string builders
// ─────────────────────────────────────────────────────────────

/**
 * Builds the `focusgroup` **attribute value** (space-separated tokens) for a host
 * element when the browser implements the feature.
 *
 * **Stability:** Token grammar is still proposal-stage; update this when the explainer
 * or implementation changes (e.g. `inline`, `block`, `wrap`, `nowrap`, `nomemory`).
 */
export function buildFocusgroupAttribute(
  options: NativeFocusgroupOptions
): string {
  const tokens: string[] = [];

  if (options.axis === 'inline' || options.axis === 'both') {
    tokens.push('inline');
  }
  if (options.axis === 'block' || options.axis === 'both') {
    tokens.push('block');
  }

  if (options.wrap === true) {
    tokens.push('wrap');
  } else if (options.wrap === false) {
    tokens.push('nowrap');
  }

  if (options.memory === 'nomemory') {
    tokens.push('nomemory');
  }

  return tokens.join(' ');
}

/**
 * Returns a default `focusgroup` attribute string for a known Spectrum composite.
 * Extend the `switch` as more widgets adopt the composite focus navigation controller.
 */
export function defaultFocusgroupForKind(kind: SwcCompositeKind): string {
  // Horizontal toolbars, tabs, segmented controls: inline, no wrap.
  const inlineNoWrap = (): string =>
    buildFocusgroupAttribute({
      axis: 'inline',
      wrap: false,
      memory: 'memory',
    });

  // Vertical lists: block, no wrap.
  const blockNoWrap = (): string =>
    buildFocusgroupAttribute({
      axis: 'block',
      wrap: false,
      memory: 'memory',
    });

  switch (kind) {
    case 'toolbar':
    case 'tablist':
    case 'menubar':
    case 'segmented-control':
      return inlineNoWrap();

    case 'menu':
    case 'listbox':
    case 'accordion-headers':
      return blockNoWrap();

    // APG radio group: arrows cycle; wrap is typical.
    case 'radiogroup':
      return buildFocusgroupAttribute({
        axis: 'inline',
        wrap: true,
        memory: 'memory',
      });

    // Unknown / mixed: allow both axes; tighten per component when possible.
    default:
      return buildFocusgroupAttribute({
        axis: 'both',
        wrap: false,
        memory: 'memory',
      });
  }
}
