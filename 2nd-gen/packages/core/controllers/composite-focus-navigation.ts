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
 * # Composite focus navigation (native `focusgroup` + polyfill)
 *
 * **2nd-gen** linear keyboard navigation for Spectrum composites. Replaces scattered
 * copies of 1st-gen `FocusGroupController` / `RovingTabindexController` with one
 * configuration object and two engines:
 *
 * 1. **Native** — If {@link hasNativeFocusgroup} is true, sets `focusgroup="…"` on the
 *    root so the browser handles arrows, Tab collapsing, and (per explainer) shadow/slot
 *    participation.
 * 2. **Polyfill** — Otherwise uses {@link LinearFocusgroupPolyfill}: roving `tabindex`,
 *    arrow keys, optional wrap, Home/End.
 * 3. **Grids** — Use `GridFocusNavigationController` in `grid-focus-navigation.ts`;
 *    do not rely on linear `focusgroup` alone for 2D APG grids.
 *
 * ## Maintainers
 *
 * - Track Open UI focusgroup explainer + Chromium feedback posts; update
 *   {@link buildFocusgroupAttribute} when tokens change.
 * - Accessibility: this layer moves focus only; roles, names, and states stay the
 *   component’s responsibility (WAI-ARIA APG).
 *
 * ## Polyfill limits
 *
 * - Logical **RTL** / **writing-mode** mapping is not fully implemented; native path
 *   should match the platform when available.
 * - {@link CompositeFocusNavigationConfig.hostDelegatesFocus} is reserved for future
 *   parity with 1st-gen; item roots get `tabIndex` 0/-1 today.
 *
 * @packageDocumentation
 */

import type { ReactiveController, ReactiveElement } from 'lit';

import {
  buildFocusgroupAttribute,
  defaultFocusgroupForKind,
  hasNativeFocusgroup,
  type NativeFocusgroupOptions,
  type SwcCompositeKind,
} from './focusgroup-env.js';

// ─────────────────────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────────────────────

/**
 * Polyfill arrow-key mode: which keys advance focus. Maps to typical toolbar (horizontal)
 * vs menu (vertical) patterns. `both` accepts all four arrow keys as next/previous.
 */
export type LinearDirection = 'horizontal' | 'vertical' | 'both';

/**
 * Configuration for {@link CompositeFocusNavigationController}.
 */
export interface CompositeFocusNavigationConfig {
  /**
   * Root element for `focusgroup` (native) or for `focusin` / `focusout` / `keydown`
   * listeners (polyfill). Defaults to the Lit host.
   */
  root?: HTMLElement | (() => HTMLElement);

  /**
   * Ordered list of **item roots** (one tab stop per item after roving is applied).
   * Native path: still used by callers for semantics; browser discovers focusables.
   * Polyfill: this exact list is navigated.
   */
  elements: () => HTMLElement[];

  /** Polyfill only: which arrow keys are handled. */
  direction?: LinearDirection | (() => LinearDirection);

  /** Polyfill only: whether focus wraps at the ends of `elements()`. */
  wrap?: boolean | (() => boolean);

  /**
   * Polyfill only: return false to skip an item (e.g. `disabled`, `hidden`, or
   * `aria-disabled` patterns that should not take focus).
   */
  isItemFocusable?: (el: HTMLElement) => boolean;

  /**
   * Reserved for future tabindex rules when focus lands inside shadowed controls
   * (`delegatesFocus`). Prefer native `focusgroup` for complex composites today.
   */
  hostDelegatesFocus?: boolean;

  /**
   * Called when keyboard navigation selects an item **before** `focus()` (e.g. update
   * `aria-selected`, activate tab).
   */
  onNavigateToItem?: (el: HTMLElement) => void;

  /** If true, call `stopPropagation()` after handling a navigation key (polyfill). */
  stopKeydownPropagation?: boolean;

  /** Selects a default native `focusgroup` string via {@link defaultFocusgroupForKind}. */
  kind?: SwcCompositeKind;

  /**
   * Native only: override the attribute value. Static options call
   * {@link buildFocusgroupAttribute}; a function can return a custom string or `null`
   * to skip setting the attribute.
   */
  nativeFocusgroup?: NativeFocusgroupOptions | (() => string | null);

  /** If true, always use the polyfill (testing or staged rollout). */
  forcePolyfill?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Small helpers
// ─────────────────────────────────────────────────────────────

/** Unwraps `T | () => T` values from config (e.g. reactive `wrap` or `direction`). */
function resolveMaybeCall<T>(value: T | (() => T)): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/** Effective linear direction; default `both`. */
function resolveDirection(
  direction: CompositeFocusNavigationConfig['direction']
): LinearDirection {
  if (!direction) {
    return 'both';
  }
  return resolveMaybeCall(direction);
}

/**
 * Whether `key` should be handled for the given direction mode (polyfill).
 * Home/End are always accepted when the polyfill handles the event.
 */
function acceptsLinearKey(direction: LinearDirection, key: string): boolean {
  if (key === 'Home' || key === 'End') {
    return true;
  }
  switch (direction) {
    case 'horizontal':
      return key === 'ArrowLeft' || key === 'ArrowRight';
    case 'vertical':
      return key === 'ArrowUp' || key === 'ArrowDown';
    default:
      return key.startsWith('Arrow');
  }
}

// ─────────────────────────────────────────────────────────────
// Polyfill (linear roving tabindex)
// ─────────────────────────────────────────────────────────────

/**
 * Implements linear roving `tabindex` when native `focusgroup` is unavailable.
 *
 * **Behavior:** One item has `tabIndex === 0`, others `-1`; arrows move focus; Home/End
 * jump to first/last **focusable** item per {@link CompositeFocusNavigationConfig.isItemFocusable}.
 *
 * @internal
 */
class LinearFocusgroupPolyfill {
  private readonly host: ReactiveElement;

  private config: CompositeFocusNavigationConfig;

  /** True while focus is inside any configured item (or its descendants). */
  private focusedInside = false;

  /** Index into `items()` for the last focused or navigated item. */
  private currentIndex = 0;

  /** Cached result of `elements()` until DOM changes invalidate it. */
  private cachedItems: HTMLElement[] | undefined;

  /** Observes host subtree to drop `cachedItems` when children change. */
  private mutationObserver?: MutationObserver;

  constructor(host: ReactiveElement, config: CompositeFocusNavigationConfig) {
    this.host = host;
    this.config = config;
  }

  /** Keeps polyfill in sync when the host calls {@link CompositeFocusNavigationController.updateConfig}. */
  syncConfig(config: CompositeFocusNavigationConfig): void {
    this.config = config;
    this.clearItemCache();
  }

  /** Navigation root: explicit `root` config or the Lit host. */
  private get root(): HTMLElement {
    const r = this.config.root;
    if (!r) {
      return this.host;
    }
    return typeof r === 'function' ? r() : r;
  }

  /** Lazily built list of item roots from `config.elements()`. */
  private get items(): HTMLElement[] {
    if (!this.cachedItems) {
      this.cachedItems = this.config.elements();
    }
    return this.cachedItems;
  }

  private isFocusable(el: HTMLElement): boolean {
    const fn = this.config.isItemFocusable;
    return fn ? fn(el) : true;
  }

  private clearItemCache(): void {
    delete this.cachedItems;
  }

  /**
   * Finds which item index owns a node in `composedPath()` (direct match or
   * `contains()` for focus inside an item).
   */
  private indexOfFocusedPath(path: EventTarget[]): number {
    for (const node of path) {
      if (!(node instanceof HTMLElement)) {
        continue;
      }
      const direct = this.items.indexOf(node);
      if (direct !== -1) {
        return direct;
      }
    }
    // `Element.contains` does not cross shadow boundaries; map shadow targets to hosts.
    for (const node of path) {
      if (!(node instanceof HTMLElement)) {
        continue;
      }
      const root = node.getRootNode();
      if (root instanceof ShadowRoot) {
        const host = root.host as HTMLElement;
        const fromShadow = this.items.indexOf(host);
        if (fromShadow !== -1) {
          return fromShadow;
        }
      }
      const ancestorItem = this.items.findIndex((item) => item.contains(node));
      if (ancestorItem !== -1) {
        return ancestorItem;
      }
    }
    return -1;
  }

  /**
   * Applies roving tabindex: exactly one item has `tabIndex 0`, the rest `-1`.
   */
  private setRovingTabindexForIndex(i: number): void {
    const list = this.items;
    for (let j = 0; j < list.length; j += 1) {
      list[j].tabIndex = j === i ? 0 : -1;
    }
  }

  /** First index in DOM order where `isFocusable` is true. */
  private firstFocusableIndex(): number {
    const list = this.items;
    for (let i = 0; i < list.length; i += 1) {
      if (this.isFocusable(list[i])) {
        return i;
      }
    }
    return -1;
  }

  /** Last index in DOM order where `isFocusable` is true. */
  private lastFocusableIndex(): number {
    const list = this.items;
    for (let i = list.length - 1; i >= 0; i -= 1) {
      if (this.isFocusable(list[i])) {
        return i;
      }
    }
    return -1;
  }

  /** Focuses item `i`, updates roving tabindex, fires `onNavigateToItem`. */
  private focusIndexAt(i: number): void {
    const list = this.items;
    if (i < 0 || i >= list.length || !this.isFocusable(list[i])) {
      return;
    }
    this.currentIndex = i;
    const next = list[i];
    this.config.onNavigateToItem?.(next);
    this.setRovingTabindexForIndex(i);
    next.focus();
  }

  /**
   * Moves focus by `delta` positions in the flat list (+1 = forward, -1 = back).
   * Skips non-focusable slots. Honors `wrap` at list ends.
   */
  private move(delta: number, wrap: boolean): void {
    const list = this.items;
    if (!list.length) {
      return;
    }

    let next = this.currentIndex + delta;

    if (wrap) {
      next = ((next % list.length) + list.length) % list.length;
      let guard = list.length;
      while (guard > 0 && !this.isFocusable(list[next])) {
        next = (next + Math.sign(delta) + list.length) % list.length;
        guard -= 1;
      }
    } else {
      next = Math.max(0, Math.min(list.length - 1, next));
      let guard = list.length;
      while (
        guard > 0 &&
        (next < 0 || next >= list.length || !this.isFocusable(list[next]))
      ) {
        next += Math.sign(delta);
        guard -= 1;
      }
    }

    if (next >= 0 && next < list.length && this.isFocusable(list[next])) {
      this.focusIndexAt(next);
    }
  }

  private handleFocusin = (event: FocusEvent): void => {
    const path = event.composedPath() as EventTarget[];
    const idx = this.indexOfFocusedPath(path);
    if (idx < 0) {
      return;
    }
    this.focusedInside = true;
    this.currentIndex = idx;
    this.setRovingTabindexForIndex(idx);
  };

  private handleFocusout = (event: FocusEvent): void => {
    const related = event.relatedTarget as Node | null;
    if (related && this.host.contains(related)) {
      return;
    }
    const stillInside =
      !!related &&
      this.items.some((item) => {
        if (item === related || item.contains(related as Node)) {
          return true;
        }
        if (related instanceof HTMLElement) {
          const r = related.getRootNode();
          return r instanceof ShadowRoot && r.host === item;
        }
        return false;
      });
    if (!stillInside) {
      this.focusedInside = false;
    }
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (!this.focusedInside || event.defaultPrevented) {
      return;
    }

    const linearDirection = resolveDirection(this.config.direction);
    if (!acceptsLinearKey(linearDirection, event.key)) {
      return;
    }

    const wrap = resolveMaybeCall(this.config.wrap ?? false);
    event.preventDefault();
    if (this.config.stopKeydownPropagation) {
      event.stopPropagation();
    }

    const forward = 1;
    const backward = -1;

    switch (event.key) {
      case 'ArrowRight':
        // Horizontal / both: left-right as forward/back. Vertical mode ignores.
        if (linearDirection === 'vertical') {
          return;
        }
        this.move(forward, wrap);
        break;
      case 'ArrowLeft':
        if (linearDirection === 'vertical') {
          return;
        }
        this.move(backward, wrap);
        break;
      case 'ArrowDown':
        // Vertical / both: down as forward. Horizontal mode ignores.
        if (linearDirection === 'horizontal') {
          return;
        }
        this.move(forward, wrap);
        break;
      case 'ArrowUp':
        if (linearDirection === 'horizontal') {
          return;
        }
        this.move(backward, wrap);
        break;
      case 'Home': {
        const first = this.firstFocusableIndex();
        if (first >= 0) {
          this.focusIndexAt(first);
        }
        break;
      }
      case 'End': {
        const last = this.lastFocusableIndex();
        if (last >= 0) {
          this.focusIndexAt(last);
        }
        break;
      }
      default:
        break;
    }
  };

  attach(): void {
    this.root.addEventListener('focusin', this.handleFocusin);
    this.root.addEventListener('focusout', this.handleFocusout);
    this.root.addEventListener('keydown', this.handleKeydown);
    this.mutationObserver = new MutationObserver(() => this.clearItemCache());
    this.mutationObserver.observe(this.host, { childList: true, subtree: true });
  }

  detach(): void {
    this.root.removeEventListener('focusin', this.handleFocusin);
    this.root.removeEventListener('focusout', this.handleFocusout);
    this.root.removeEventListener('keydown', this.handleKeydown);
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
  }

  /** Call from the host’s `updated` so `elements()` is re-read after render. */
  hostUpdated(): void {
    this.clearItemCache();
  }
}

// ─────────────────────────────────────────────────────────────
// Native attribute resolution
// ─────────────────────────────────────────────────────────────

/** Computes the `focusgroup` attribute string for the native path, or `null` to omit. */
function nativeAttributeFromConfig(
  config: CompositeFocusNavigationConfig
): string | null {
  const native = config.nativeFocusgroup;
  if (typeof native === 'function') {
    return native();
  }
  if (native) {
    return buildFocusgroupAttribute(native);
  }
  if (config.kind) {
    return defaultFocusgroupForKind(config.kind);
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// Exported controller
// ─────────────────────────────────────────────────────────────

/**
 * Lit reactive controller for **linear** composite keyboard navigation.
 *
 * - **Connected:** sets `focusgroup` on {@link CompositeFocusNavigationConfig.root}
 *   when native, or attaches the polyfill listeners.
 * - **Disconnected:** removes the attribute or detaches listeners.
 *
 * @example Toolbar
 * ```ts
 * class SwcToolbar extends LitElement {
 *   private focusNav = new CompositeFocusNavigationController(this, {
 *     kind: 'toolbar',
 *     direction: 'horizontal',
 *     elements: () => [...this.querySelectorAll('[role="button"], button')],
 *     wrap: false,
 *   });
 * }
 * ```
 *
 * @example Tab list (selection follows focus)
 * ```ts
 * class SwcTabList extends LitElement {
 *   private focusNav = new CompositeFocusNavigationController(this, {
 *     kind: 'tablist',
 *     direction: 'horizontal',
 *     elements: () => [...this.querySelectorAll('[role="tab"]')],
 *     onNavigateToItem: (tab) => tab.click(),
 *   });
 * }
 * ```
 */
export class CompositeFocusNavigationController implements ReactiveController {
  private readonly polyfill?: LinearFocusgroupPolyfill;

  private readonly useNative: boolean;

  constructor(
    private readonly host: ReactiveElement,
    private config: CompositeFocusNavigationConfig
  ) {
    this.useNative = !config.forcePolyfill && hasNativeFocusgroup();
    if (!this.useNative) {
      this.polyfill = new LinearFocusgroupPolyfill(host, config);
    }
    host.addController(this);
  }

  /**
   * Replace the full config (e.g. new `elements` closure after children change) and
   * re-sync native attribute or polyfill cache.
   */
  updateConfig(config: CompositeFocusNavigationConfig): void {
    this.config = config;
    this.syncNativeAttribute();
    this.polyfill?.syncConfig(config);
    this.polyfill?.hostUpdated();
  }

  private get root(): HTMLElement {
    const r = this.config.root;
    if (!r) {
      return this.host;
    }
    return typeof r === 'function' ? r() : r;
  }

  private syncNativeAttribute(): void {
    if (!this.useNative) {
      return;
    }
    const value = nativeAttributeFromConfig(this.config);
    if (value) {
      this.root.setAttribute('focusgroup', value);
    }
  }

  hostConnected(): void {
    if (this.useNative) {
      this.syncNativeAttribute();
    } else {
      this.polyfill?.attach();
    }
  }

  hostDisconnected(): void {
    if (this.useNative) {
      this.root.removeAttribute('focusgroup');
    } else {
      this.polyfill?.detach();
    }
  }

  hostUpdated(): void {
    if (this.useNative) {
      this.syncNativeAttribute();
    } else {
      this.polyfill?.hostUpdated();
    }
  }
}

export type {
  FocusgroupAxis,
  NativeFocusgroupOptions,
  SwcCompositeKind,
} from './focusgroup-env.js';

export {
  buildFocusgroupAttribute,
  defaultFocusgroupForKind,
  hasNativeFocusgroup,
} from './focusgroup-env.js';
