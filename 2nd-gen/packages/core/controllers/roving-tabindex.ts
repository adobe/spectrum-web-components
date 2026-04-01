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

import type { ReactiveController, ReactiveElement } from 'lit';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type DirectionTypes = 'horizontal' | 'vertical' | 'both' | 'grid';

export interface RovingTabindexConfig<T extends HTMLElement> {
  /** Function returning the current list of focusable elements. */
  elements: () => T[];

  /** Navigation direction. Default: 'both'. */
  direction?: DirectionTypes | (() => DirectionTypes);

  /**
   * Which element index to focus when entering the group.
   * Accepts a static number or a function. Default: first element (0).
   */
  focusInIndex?: number | ((elements: T[]) => number);

  /** Filter to determine if an element is currently focusable. */
  isFocusableElement?: (el: T) => boolean;

  /** Called before focusing an element (e.g., to auto-select in radio groups). */
  elementEnterAction?: (el: T) => void;

  /**
   * When true, arrow key events will stop propagation after being handled.
   * This prevents parent elements from also reacting to arrow keys.
   *
   * @default false
   */
  stopKeyEventPropagation?: boolean;

  /**
   * Scope element for event listeners. Accepts a static element or a function.
   * Default: host.renderRoot (shadow root) for better shadow DOM encapsulation.
   */
  listenerScope?: HTMLElement | (() => HTMLElement);

  /** Whether host uses delegatesFocus. @default false */
  hostDelegatesFocus?: boolean;

  /**
   * Number of items per row in grid mode.
   * Required when direction is 'grid' — no arbitrary default.
   */
  directionLength?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Normalizes a config value that may be a static value or a function.
 * Always returns a function for consistent internal access.
 */
function normalize<TFn, TStatic>(
  value: TFn | TStatic | undefined,
  staticType: string,
  fallback: TFn
): TFn {
  if (typeof value === 'function') {
    return value as TFn;
  }
  if (typeof value === staticType) {
    return (() => value) as unknown as TFn;
  }
  return fallback;
}

// ---------------------------------------------------------------------------
// Controller
// ---------------------------------------------------------------------------

/**
 * A reactive controller implementing the WAI-ARIA roving tabindex pattern.
 *
 * Manages keyboard navigation (arrow keys, Home/End) and tabindex attributes
 * across a group of elements so that only the current element has
 * `tabindex="0"` and all others have `tabindex="-1"`. The group appears as
 * a single tab stop.
 *
 * Consolidates the 1st-gen `FocusGroupController` + `RovingTabindexController`
 * into a single, self-contained file.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export class RovingTabindexController<
  T extends HTMLElement,
> implements ReactiveController {
  // ---- State ---------------------------------------------------------------

  private host: ReactiveElement;
  private _elements: () => T[];
  private _direction: () => DirectionTypes;
  private _focusInIndex: (elements: T[]) => number;
  private _listenerScope: () => HTMLElement;

  isFocusableElement: (el: T) => boolean;
  elementEnterAction: (el: T) => void;
  stopKeyEventPropagation: boolean;
  hostDelegatesFocus: boolean;
  directionLength: number;

  private cachedElements?: T[];
  private _currentIndex = -1;
  private prevIndex = -1;
  private _focused = false;
  private managed = true;
  private recentlyConnected = false;
  private manageIndexesAnimationFrame = 0;

  private mutationObserver: MutationObserver;

  // ---- Constructor ---------------------------------------------------------

  constructor(host: ReactiveElement, config: RovingTabindexConfig<T>) {
    this.host = host;
    this.host.addController(this);

    this._elements = config.elements;

    this._direction = normalize<() => DirectionTypes, DirectionTypes>(
      config.direction,
      'string',
      () => 'both'
    );

    this._focusInIndex = normalize<(els: T[]) => number, number>(
      config.focusInIndex,
      'number',
      () => 0
    );

    this._listenerScope = normalize<() => HTMLElement, HTMLElement>(
      config.listenerScope,
      'object',
      () => (this.host.renderRoot as unknown as HTMLElement) ?? this.host
    );

    this.isFocusableElement = config.isFocusableElement ?? (() => true);
    this.elementEnterAction = config.elementEnterAction ?? (() => {});
    this.stopKeyEventPropagation = config.stopKeyEventPropagation ?? false;
    this.hostDelegatesFocus = config.hostDelegatesFocus ?? false;
    this.directionLength = config.directionLength ?? 1;

    this.mutationObserver = new MutationObserver(() => {
      this.handleItemMutation();
    });
  }

  // ---- Public getters ------------------------------------------------------

  get direction(): DirectionTypes {
    return this._direction();
  }

  get elements(): T[] {
    if (!this.cachedElements) {
      this.cachedElements = this._elements();
    }
    return this.cachedElements;
  }

  get currentIndex(): number {
    if (this._currentIndex === -1) {
      this._currentIndex = this.focusInIndex;
    }
    return this._currentIndex;
  }

  set currentIndex(index: number) {
    this._currentIndex = index;
  }

  get focusInIndex(): number {
    return this._focusInIndex(this.elements);
  }

  get focusInElement(): T {
    return this.elements[this.focusInIndex];
  }

  private get focused(): boolean {
    return this._focused;
  }

  private set focused(value: boolean) {
    if (value === this._focused) {
      return;
    }
    this._focused = value;
    this.manageTabindexes();
  }

  // ---- Public methods ------------------------------------------------------

  /**
   * Focus the current element in the group, advancing circularly if needed.
   */
  focus(options?: FocusOptions): void {
    const elements = this.elements;
    if (!elements.length) {
      return;
    }

    let focusElement = elements[this.currentIndex];
    if (!focusElement || !this.isFocusableElement(focusElement)) {
      this.setCurrentIndexCircularly(1);
      focusElement = elements[this.currentIndex];
    }
    if (focusElement && this.isFocusableElement(focusElement)) {
      if (
        !this.hostDelegatesFocus ||
        elements[this.prevIndex] !== focusElement
      ) {
        elements[this.prevIndex]?.setAttribute('tabindex', '-1');
      }
      focusElement.tabIndex = 0;
      focusElement.focus(options);
      if (this.hostDelegatesFocus && !this.focused) {
        this.hostContainsFocus();
      }
    }
  }

  /**
   * Focus a specific item in the group.
   */
  focusOnItem(item?: T, options?: FocusOptions): void {
    const elements = this.elements || [];
    const newIndex =
      !item || !this.isFocusableElement(item) ? -1 : elements.indexOf(item);
    if (newIndex > -1) {
      this.currentIndex = newIndex;
      elements[this.prevIndex]?.setAttribute('tabindex', '-1');
    }
    this.focus(options);
  }

  /**
   * Reset focus tracking to the initial element.
   */
  reset(): void {
    const elements = this.elements;
    if (!elements.length) {
      return;
    }

    this.setCurrentIndexCircularly(this.focusInIndex - this.currentIndex);
    let focusElement = elements[this.currentIndex];
    if (this.currentIndex < 0) {
      return;
    }

    if (!focusElement || !this.isFocusableElement(focusElement)) {
      this.setCurrentIndexCircularly(1);
      focusElement = elements[this.currentIndex];
    }
    if (focusElement && this.isFocusableElement(focusElement)) {
      elements[this.prevIndex]?.setAttribute('tabindex', '-1');
      focusElement.setAttribute('tabindex', '0');
    }
  }

  /**
   * Clear the element cache. Call when the set of managed elements changes
   * dynamically (e.g., items added/removed via slots).
   */
  clearElementCache(): void {
    cancelAnimationFrame(this.manageIndexesAnimationFrame);
    this.mutationObserver.disconnect();
    delete this.cachedElements;

    requestAnimationFrame(() => {
      this.elements.forEach((element) => {
        this.mutationObserver.observe(element, {
          attributes: true,
          attributeFilter: ['disabled', 'aria-disabled'],
        });
      });
    });

    if (!this.managed) {
      return;
    }
    this.manageIndexesAnimationFrame = requestAnimationFrame(() =>
      this.manageTabindexes()
    );
  }

  /**
   * Replace the element supplier and re-initialize.
   */
  update(config: Pick<RovingTabindexConfig<T>, 'elements'>): void {
    this.unmanage();
    this._elements = config.elements;
    this.clearElementCache();
    this.manage();
  }

  /**
   * Start managing tabindexes and listening for events.
   */
  manage(): void {
    this.managed = true;
    this.manageTabindexes();
    this.addEventListeners();
  }

  /**
   * Stop managing — restore all elements to `tabindex="0"`.
   */
  unmanage(): void {
    this.managed = false;
    this.elements.forEach((el) => {
      el.tabIndex = 0;
    });
    this.removeEventListeners();
  }

  // ---- Circular index calculation ------------------------------------------

  setCurrentIndexCircularly(diff: number): void {
    const { length } = this.elements;
    let steps = length;
    this.prevIndex = this.currentIndex;
    let nextIndex = (length + this.currentIndex + diff) % length;
    while (
      steps &&
      this.elements[nextIndex] &&
      !this.isFocusableElement(this.elements[nextIndex])
    ) {
      nextIndex = (length + nextIndex + diff) % length;
      steps -= 1;
    }
    this.currentIndex = nextIndex;
  }

  // ---- Tabindex management -------------------------------------------------

  private manageTabindexes(): void {
    if (this.focused && !this.hostDelegatesFocus) {
      // While focused, only the current element keeps tabindex="0"
      // (set by focus()), all others get -1.
      this.elements.forEach((el) => {
        if (el !== this.elements[this.currentIndex]) {
          el.tabIndex = -1;
        }
      });
    } else {
      // When not focused (or host delegates focus), the focusInElement
      // gets tabindex="0" so Tab lands there; all others get -1.
      this.elements.forEach((el) => {
        el.tabIndex = el === this.focusInElement ? 0 : -1;
      });
    }
  }

  // ---- Event handling ------------------------------------------------------

  private isEventWithinListenerScope(event: Event): boolean {
    const scope = this._listenerScope();
    if (scope === this.host) {
      return true;
    }
    return event.composedPath().includes(scope);
  }

  private isRelatedTargetAnElementOrChild(event: FocusEvent): boolean {
    const relatedTarget = event.relatedTarget as null | Element;
    const isElement = this.elements.includes(relatedTarget as T);
    const isChild = this.elements.some((el) => el.contains(relatedTarget));
    return !(isElement || isChild);
  }

  private handleFocusin = (event: FocusEvent): void => {
    if (!this.isEventWithinListenerScope(event)) {
      return;
    }

    const path = event.composedPath() as T[];
    let targetIndex = -1;
    path.find((el) => {
      targetIndex = this.elements.indexOf(el);
      return targetIndex !== -1;
    });
    this.prevIndex = this.currentIndex;
    this.currentIndex = targetIndex > -1 ? targetIndex : this.currentIndex;

    if (this.isRelatedTargetAnElementOrChild(event)) {
      this.hostContainsFocus();
    }
  };

  private handleFocusout = (event: FocusEvent): void => {
    if (this.isRelatedTargetAnElementOrChild(event)) {
      this.hostNoLongerContainsFocus();
    }
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (!this.acceptsEventKey(event.key) || event.defaultPrevented) {
      return;
    }

    let diff = 0;
    this.prevIndex = this.currentIndex;
    switch (event.key) {
      case 'ArrowRight':
        diff += 1;
        break;
      case 'ArrowDown':
        diff += this.direction === 'grid' ? this.directionLength : 1;
        break;
      case 'ArrowLeft':
        diff -= 1;
        break;
      case 'ArrowUp':
        diff -= this.direction === 'grid' ? this.directionLength : 1;
        break;
      case 'End':
        this.currentIndex = 0;
        diff -= 1;
        break;
      case 'Home':
        this.currentIndex = this.elements.length - 1;
        diff += 1;
        break;
    }

    event.preventDefault();
    if (this.stopKeyEventPropagation) {
      event.stopPropagation();
    }

    // Grid mode: clamp rather than wrap
    if (this.direction === 'grid' && this.currentIndex + diff < 0) {
      this.currentIndex = 0;
    } else if (
      this.direction === 'grid' &&
      this.currentIndex + diff > this.elements.length - 1
    ) {
      this.currentIndex = this.elements.length - 1;
    } else {
      this.setCurrentIndexCircularly(diff);
    }

    // Enter action before focus so callbacks can read "after" state
    this.elementEnterAction(this.elements[this.currentIndex]);
    this.focus();
  };

  private acceptsEventKey(key: string): boolean {
    if (key === 'End' || key === 'Home') {
      return true;
    }
    switch (this.direction) {
      case 'horizontal':
        return key === 'ArrowLeft' || key === 'ArrowRight';
      case 'vertical':
        return key === 'ArrowUp' || key === 'ArrowDown';
      case 'both':
      case 'grid':
        return key.startsWith('Arrow');
    }
  }

  // ---- Focus containment tracking ------------------------------------------

  private hostContainsFocus(): void {
    this.host.addEventListener('focusout', this.handleFocusout);
    this.host.addEventListener('keydown', this.handleKeydown);
    this.focused = true;
  }

  private hostNoLongerContainsFocus(): void {
    this.host.addEventListener('focusin', this.handleFocusin);
    this.host.removeEventListener('focusout', this.handleFocusout);
    this.host.removeEventListener('keydown', this.handleKeydown);
    this.focused = false;
  }

  // ---- Mutation handling ---------------------------------------------------

  private handleItemMutation(): void {
    if (
      this._currentIndex === -1 ||
      this.elements.length <= this._elements().length
    ) {
      return;
    }
    const focusedElement = this.elements[this.currentIndex];
    this.clearElementCache();
    if (this.elements.includes(focusedElement)) {
      return;
    }

    const moveToNext = this.currentIndex !== this.elements.length;
    const diff = moveToNext ? 1 : -1;
    if (moveToNext) {
      this.setCurrentIndexCircularly(-1);
    }
    this.setCurrentIndexCircularly(diff);
    this.focus();
  }

  // ---- Listener lifecycle --------------------------------------------------

  private addEventListeners(): void {
    this.host.addEventListener('focusin', this.handleFocusin);
  }

  private removeEventListeners(): void {
    this.host.removeEventListener('focusin', this.handleFocusin);
    this.host.removeEventListener('focusout', this.handleFocusout);
    this.host.removeEventListener('keydown', this.handleKeydown);
  }

  // ---- Reactive controller lifecycle ---------------------------------------

  hostConnected(): void {
    this.recentlyConnected = true;
    this.addEventListeners();
  }

  hostDisconnected(): void {
    this.mutationObserver.disconnect();
    this.removeEventListeners();
  }

  hostUpdated(): void {
    if (this.recentlyConnected) {
      this.recentlyConnected = false;
      this.elements.forEach((element) => {
        this.mutationObserver.observe(element, {
          attributes: true,
          attributeFilter: ['disabled', 'aria-disabled'],
        });
      });
    }
    if (!this.host.hasUpdated) {
      this.manageTabindexes();
    }
  }
}
