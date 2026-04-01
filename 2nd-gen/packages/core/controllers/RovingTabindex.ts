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

import { FocusGroupConfig, FocusGroupController } from './FocusGroup.js';

/**
 * Configuration for {@link RovingTabindexController}. Identical to
 * {@link FocusGroupConfig} — provided as a convenience alias so
 * consuming code can name the config type after the controller it uses.
 *
 * @template T - The type of focusable elements. Must extend `HTMLElement`.
 */
export type RovingTabindexConfig<T> = FocusGroupConfig<T>;

/**
 * Shape returned by the callback passed to
 * {@link RovingTabindexController.updateTabindexes}.
 */
interface UpdateTabIndexes {
  /** The `tabindex` value to apply to the element. */
  tabIndex: number;

  /**
   * When `true`, the element's `tabindex` attribute is *not* set and
   * instead `requestUpdate()` is called on the element (if it is a
   * reactive element). Used when the element is a container that wraps
   * the actual focus target and should not be independently tabbable.
   */
  removeTabIndex?: boolean;
}

/**
 * A Lit reactive controller that extends {@link FocusGroupController} with
 * **roving tabindex** management.
 *
 * While `FocusGroupController` handles arrow-key navigation and focus
 * tracking, it does not manipulate `tabindex` attributes. This subclass
 * adds that layer so composite widgets expose exactly **one Tab stop** to
 * the sequential focus order — the currently active item gets
 * `tabindex="0"` and all siblings get `tabindex="-1"`.
 *
 * This matches the **roving tabindex** technique recommended by the
 * WAI-ARIA Authoring Practices Guide for toolbars, tablists, menus,
 * listboxes, radio groups, and similar composite widgets.
 *
 * ### How this relates to the proposed `focusgroup` HTML attribute
 *
 * The native `focusgroup` attribute automatically collapses participating
 * items into a single Tab stop without authors needing to manage
 * `tabindex`. When `focusgroup` ships in stable browsers, components
 * should prefer the native attribute and this controller becomes
 * unnecessary for linear composites. Until then, this controller provides
 * the equivalent behavior.
 *
 * Feature detection:
 * ```typescript
 * const hasNativeFocusgroup = 'focusgroup' in HTMLElement.prototype;
 * ```
 *
 * @template T - The type of elements managed by this controller.
 *               Must extend `HTMLElement`.
 *
 * @example
 * ```typescript
 * class MyTablist extends LitElement {
 *     private rovingTabindex = new RovingTabindexController<HTMLButtonElement>(this, {
 *         elements: () => [...this.querySelectorAll('[role="tab"]')],
 *         direction: 'horizontal',
 *         focusInIndex: (tabs) => tabs.findIndex((t) => t.ariaSelected === 'true'),
 *         elementEnterAction: (tab) => this.selectTab(tab),
 *     });
 * }
 * ```
 *
 * @see {@link FocusGroupController}
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 * @see https://developer.chrome.com/blog/focusgroup-rfc
 */
export class RovingTabindexController<
  T extends HTMLElement,
> extends FocusGroupController<T> {
  /**
   * Overrides the base `focused` setter to trigger a tabindex update
   * whenever the focus state of the group changes. When focus enters,
   * all non-active items are set to `tabindex="-1"`; when focus leaves,
   * the last-active item is restored to `tabindex="0"`.
   */
  protected override set focused(focused: boolean) {
    if (focused === this.focused) {
      return;
    }
    super.focused = focused;
    this.manageTabindexes();
  }

  protected override get focused(): boolean {
    return super.focused;
  }

  /** Whether the controller is actively managing tabindex values. */
  private managed = true;

  /** Animation frame ID for the deferred tabindex update in `clearElementCache`. */
  private manageIndexesAnimationFrame = 0;

  /**
   * Overrides the base cache-clear to schedule a deferred tabindex
   * recalculation after the element list is refreshed. The
   * `requestAnimationFrame` ensures the DOM has settled before
   * tabindex values are reassigned.
   *
   * @param offset - Virtual scroll offset. Defaults to `0`.
   */
  override clearElementCache(offset = 0): void {
    cancelAnimationFrame(this.manageIndexesAnimationFrame);
    super.clearElementCache(offset);
    if (!this.managed) {
      return;
    }

    this.manageIndexesAnimationFrame = requestAnimationFrame(() =>
      this.manageTabindexes()
    );
  }

  /**
   * Recalculates `tabindex` for every managed element based on the
   * current focus state:
   *
   * - **When focused and host does not delegate focus:** all elements
   *   get `tabindex="-1"` (the focused element's tabindex is managed
   *   separately by the base class's `focus()` method).
   * - **When not focused (or host delegates focus):** the
   *   {@link FocusGroupController.focusInElement|focusInElement} gets
   *   `tabindex="0"` and all others get `tabindex="-1"`. Elements that
   *   *contain* the `focusInElement` get their tabindex removed instead
   *   (to avoid a double Tab stop on the container).
   */
  manageTabindexes(): void {
    if (this.focused && !this.hostDelegatesFocus) {
      this.updateTabindexes(() => ({ tabIndex: -1 }));
    } else {
      this.updateTabindexes((el: HTMLElement): UpdateTabIndexes => {
        return {
          removeTabIndex:
            el.contains(this.focusInElement) && el !== this.focusInElement,
          tabIndex: el === this.focusInElement ? 0 : -1,
        };
      });
    }
  }

  /**
   * Applies a tabindex strategy to every managed element. The `getTabIndex`
   * callback is invoked for each element and must return the desired
   * `tabIndex` value (and optionally signal that the attribute should be
   * removed entirely).
   *
   * @param getTabIndex - Per-element callback returning the desired state.
   */
  updateTabindexes(getTabIndex: (el: HTMLElement) => UpdateTabIndexes): void {
    this.elements.forEach((el) => {
      const { tabIndex, removeTabIndex } = getTabIndex(el);
      if (!removeTabIndex) {
        if (this.focused) {
          if (el !== this.elements[this.currentIndex]) {
            el.tabIndex = tabIndex;
          }
        } else {
          el.tabIndex = tabIndex;
        }
        return;
      }
      const updatable = el as unknown as {
        requestUpdate?: () => void;
      };
      if (updatable.requestUpdate) {
        updatable.requestUpdate();
      }
    });
  }

  /**
   * Activates tabindex management and baseline event listeners. After
   * calling this, the controller owns `tabindex` values on all managed
   * elements.
   */
  override manage(): void {
    this.managed = true;
    this.manageTabindexes();
    super.manage();
  }

  /**
   * Deactivates tabindex management and removes event listeners. Restores
   * all managed elements to `tabindex="0"` so they become independently
   * tabbable again (the group is no longer a single Tab stop).
   */
  override unmanage(): void {
    this.managed = false;
    this.updateTabindexes(() => ({ tabIndex: 0 }));
    super.unmanage();
  }

  /**
   * Lifecycle: runs after the host's `updated()`. On the first render,
   * ensures tabindexes are set correctly before the user can interact
   * with the component.
   */
  override hostUpdated(): void {
    super.hostUpdated();
    if (!this.host.hasUpdated) {
      this.manageTabindexes();
    }
  }
}
