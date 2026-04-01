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
 * # Grid focus navigation (APG-oriented extension)
 *
 * Native `focusgroup` does not yet replace full
 * [data grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) keyboard behavior.
 * This controller implements a **row-major** 2D model over a flat `elements()` list:
 * {@link GridFocusNavigationConfig.columnCount} defines row width; arrows move by row
 * or column; Home/End move within the **current row** only (APG baseline).
 *
 * **Follow-ups:** Page Up/Down, Ctrl+Home/End, merged cells, virtualization, RTL /
 * `writing-mode`, and arrow-key delegation when a cell contains an editor (see module
 * prose in the original design doc).
 *
 * @packageDocumentation
 */

import type { ReactiveController, ReactiveElement } from 'lit';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

/**
 * Configuration for {@link GridFocusNavigationController}.
 *
 * **Layout contract:** `elements()` returns cells in **row-major** order: indices
 * `0 … columnCount-1` are row 0, then row 1, etc. The last row may be short; bounds
 * are clamped to `elements().length`.
 */
export interface GridFocusNavigationConfig {
  /**
   * Cell **hosts** in visual reading order (often `role="gridcell"` custom elements).
   * Same idea as {@link CompositeFocusNavigationConfig.elements} on the linear controller.
   */
  elements: () => HTMLElement[];

  /**
   * Number of columns per row. Used with `Math.floor(index / columnCount)` for row
   * and `index % columnCount` for column. Minimum effective value is 1.
   */
  columnCount: number | (() => number);

  /** Skip cells that return false (disabled, hidden, etc.). */
  isItemFocusable?: (el: HTMLElement) => boolean;

  /**
   * If true, moving past the last column or row wraps within that row or column slice.
   * Most data grids use `false`.
   */
  wrap?: boolean | (() => boolean);

  /** Optional hook when keyboard navigation moves focus to a new cell. */
  onNavigateToItem?: (el: HTMLElement) => void;

  /** If true, `stopPropagation()` after handling a navigation key. */
  stopKeydownPropagation?: boolean;

  /** Root for listeners; defaults to the Lit host. */
  root?: HTMLElement | (() => HTMLElement);
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/** Unwraps `T | () => T` from config. */
function resolveMaybeCall<T>(value: T | (() => T)): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

/** Keys handled by {@link GridFocusNavigationController} (polyfill-style handler). */
const GRID_NAVIGATION_KEYS: readonly string[] = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
] as const;

// ─────────────────────────────────────────────────────────────
// Controller
// ─────────────────────────────────────────────────────────────

/**
 * 2D roving tabindex over a flat, row-major list of cells.
 *
 * @example
 * ```ts
 * class SwcDataGrid extends LitElement {
 *   columns = 4;
 *   private gridNav = new GridFocusNavigationController(this, {
 *     columnCount: () => this.columns,
 *     elements: () => [...this.querySelectorAll('[role="gridcell"]')],
 *   });
 * }
 * ```
 */
export class GridFocusNavigationController implements ReactiveController {
  /** True when focus is inside any registered cell (or descendant). */
  private focusedInside = false;

  /** Flat index into `elements()`; kept in sync with focused cell. */
  private currentIndex = 0;

  private cachedItems: HTMLElement[] | undefined;

  constructor(
    private readonly host: ReactiveElement,
    private config: GridFocusNavigationConfig
  ) {
    host.addController(this);
  }

  private get root(): HTMLElement {
    const r = this.config.root;
    if (!r) {
      return this.host;
    }
    return typeof r === 'function' ? r() : r;
  }

  private get items(): HTMLElement[] {
    if (!this.cachedItems) {
      this.cachedItems = this.config.elements();
    }
    return this.cachedItems;
  }

  /** Column count, at least 1. */
  private get columnCount(): number {
    const n = resolveMaybeCall(this.config.columnCount);
    return Math.max(1, n);
  }

  private isFocusable(el: HTMLElement): boolean {
    return this.config.isItemFocusable
      ? this.config.isItemFocusable(el)
      : true;
  }

  private clearItemCache(): void {
    delete this.cachedItems;
  }

  /**
   * Index of the cell that owns a node in `composedPath()` (direct or `contains`).
   */
  private indexInPath(path: EventTarget[]): number {
    for (const node of path) {
      if (!(node instanceof HTMLElement)) {
        continue;
      }
      const direct = this.items.indexOf(node);
      if (direct !== -1) {
        return direct;
      }
      const containing = this.items.findIndex((item) => item.contains(node));
      if (containing !== -1) {
        return containing;
      }
    }
    return -1;
  }

  /**
   * Sets roving tabindex for cell `i`. If `moveFocus` is false, only updates indices
   * and `tabIndex` (used on `focusin` so we do not re-call `focus()`).
   */
  private setRovingIndex(i: number, moveFocus: boolean): void {
    const list = this.items;
    if (i < 0 || i >= list.length || !this.isFocusable(list[i])) {
      return;
    }
    this.currentIndex = i;
    const el = list[i];
    if (moveFocus) {
      this.config.onNavigateToItem?.(el);
    }
    for (const cell of list) {
      cell.tabIndex = cell === el ? 0 : -1;
    }
    if (moveFocus) {
      el.focus();
    }
  }

  /** Keyboard navigation: move focus and fire `onNavigateToItem`. */
  private focusAt(i: number): void {
    this.setRovingIndex(i, true);
  }

  /**
   * Moves by full rows: same column index, `delta` rows away (`+1` = down).
   * Clamps or wraps at top/bottom row per `wrap`.
   */
  private moveRow(delta: number): void {
    const list = this.items;
    const cols = this.columnCount;
    const row = Math.floor(this.currentIndex / cols);
    const col = this.currentIndex % cols;
    const rowCount = Math.ceil(list.length / cols);

    let nextRow = row + delta;
    const wrap = resolveMaybeCall(this.config.wrap ?? false);

    if (wrap) {
      nextRow = ((nextRow % rowCount) + rowCount) % rowCount;
    } else {
      nextRow = Math.max(0, Math.min(rowCount - 1, nextRow));
    }

    let target = nextRow * cols + col;
    if (target >= list.length) {
      target = list.length - 1;
    }
    if (this.isFocusable(list[target])) {
      this.focusAt(target);
    }
  }

  /**
   * Moves within the current row by `delta` columns (`+1` = right).
   * Width of the row respects a short last row (`rowEnd - rowStart`).
   */
  private moveCol(delta: number): void {
    const list = this.items;
    const cols = this.columnCount;
    const row = Math.floor(this.currentIndex / cols);
    const col = this.currentIndex % cols;
    const rowStart = row * cols;
    const rowEnd = Math.min(rowStart + cols, list.length);
    const width = rowEnd - rowStart;

    let nextCol = col + delta;
    const wrap = resolveMaybeCall(this.config.wrap ?? false);

    if (wrap) {
      nextCol = ((nextCol % width) + width) % width;
    } else {
      nextCol = Math.max(0, Math.min(width - 1, nextCol));
    }

    const target = rowStart + nextCol;
    if (target < list.length && this.isFocusable(list[target])) {
      this.focusAt(target);
    }
  }

  /** Home: first focusable cell in the **current** row. */
  private rowHome(): void {
    const cols = this.columnCount;
    const row = Math.floor(this.currentIndex / cols);
    const rowStart = row * cols;

    for (let c = 0; c < cols && rowStart + c < this.items.length; c += 1) {
      const t = rowStart + c;
      if (this.isFocusable(this.items[t])) {
        this.focusAt(t);
        return;
      }
    }
  }

  /** End: last focusable cell in the **current** row. */
  private rowEnd(): void {
    const cols = this.columnCount;
    const row = Math.floor(this.currentIndex / cols);
    const rowStart = row * cols;
    const rowEnd = Math.min(rowStart + cols, this.items.length);

    for (let t = rowEnd - 1; t >= rowStart; t -= 1) {
      if (this.isFocusable(this.items[t])) {
        this.focusAt(t);
        return;
      }
    }
  }

  private handleFocusin = (event: FocusEvent): void => {
    const idx = this.indexInPath(event.composedPath() as EventTarget[]);
    if (idx < 0) {
      return;
    }
    this.focusedInside = true;
    this.setRovingIndex(idx, false);
  };

  private handleFocusout = (event: FocusEvent): void => {
    const related = event.relatedTarget as Node | null;
    if (related && this.host.contains(related)) {
      return;
    }
    const stillInside = this.items.some(
      (el) => related && (el === related || el.contains(related))
    );
    if (!stillInside) {
      this.focusedInside = false;
    }
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (!this.focusedInside || event.defaultPrevented) {
      return;
    }
    if (!GRID_NAVIGATION_KEYS.includes(event.key)) {
      return;
    }

    event.preventDefault();
    if (this.config.stopKeydownPropagation) {
      event.stopPropagation();
    }

    switch (event.key) {
      case 'ArrowRight':
        this.moveCol(1);
        break;
      case 'ArrowLeft':
        this.moveCol(-1);
        break;
      case 'ArrowDown':
        this.moveRow(1);
        break;
      case 'ArrowUp':
        this.moveRow(-1);
        break;
      case 'Home':
        this.rowHome();
        break;
      case 'End':
        this.rowEnd();
        break;
      default:
        break;
    }
  };

  /**
   * Replace config and invalidate the cached `elements()` list.
   */
  updateConfig(config: GridFocusNavigationConfig): void {
    this.config = config;
    this.clearItemCache();
  }

  hostConnected(): void {
    this.root.addEventListener('focusin', this.handleFocusin);
    this.root.addEventListener('focusout', this.handleFocusout);
    this.root.addEventListener('keydown', this.handleKeydown);
  }

  hostDisconnected(): void {
    this.root.removeEventListener('focusin', this.handleFocusin);
    this.root.removeEventListener('focusout', this.handleFocusout);
    this.root.removeEventListener('keydown', this.handleKeydown);
  }

  hostUpdated(): void {
    this.clearItemCache();
  }
}
