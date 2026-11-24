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
import { PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

import { PageScrollLockController } from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  deepContains,
  getActiveElement,
  isTopDismissible,
  registerDismissible,
  unregisterDismissible,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import type { ToastBase } from './Toast.base.js';
import { ToastCountdown } from './ToastCountdown.js';
import { ToastQueue } from './ToastQueue.js';
import {
  TOAST_REGION_PLACEMENTS,
  type ToastQueueEntry,
  type ToastRegionPlacement,
} from './ToastRegion.types.js';

const connectedRegions = new Set<ToastRegionBase>();
const docsUrl =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-toast-region--docs';

export abstract class ToastRegionBase extends SpectrumElement {
  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /** The rendered toast for the front entry. */
  protected abstract get currentToast(): ToastBase | undefined;

  /** Every rendered toast, by queue entry key, in queue order. */
  protected abstract get renderedToasts(): ReadonlyMap<string, ToastBase>;

  /**
   * The rendered surface, absent while the queue is empty: the
   * `role="region"` popover while collapsed, or the modal `<dialog>` while expanded.
   */
  protected abstract get region(): HTMLElement | undefined;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /** The viewport edge at which notifications appear. End is logical. */
  @property({ type: String, reflect: true })
  public placement: ToastRegionPlacement = 'bottom';

  /**
   * Builds the accessible name of the notification region from the number of
   * queued notifications. Set it to localize the name, including plural forms.
   * Property only: a function cannot be set as an attribute.
   *
   * @todo Localize the default via LanguageResolutionController once a runtime
   * i18n system for static strings is available.
   */
  @property({ attribute: false })
  public getRegionLabel: (count: number) => string = (count) =>
    `${count} ${count === 1 ? 'notification' : 'notifications'}.`;

  /**
   * The label for the Show all control on the front toast. Set it to localize the label.
   * Removing the attribute restores the default label.
   *
   * @todo Localize the default via LanguageResolutionController once a runtime
   * i18n system for static strings is available.
   */
  @property({ type: String, attribute: 'show-all-label', useDefault: true })
  public showAllLabel = 'Show all';

  /**
   * The label for the control that collapses the expanded view. Set it to localize the label.
   * Removing the attribute restores the default label.
   *
   * @todo Localize the default via LanguageResolutionController once a runtime
   * i18n system for static strings is available.
   */
  @property({ type: String, attribute: 'collapse-label', useDefault: true })
  public collapseLabel = 'Collapse';

  /**
   * The label for the control that clears every notification in the expanded
   * view. Set it to localize the label.
   * Removing the attribute restores the default label.
   *
   * @todo Localize the default via LanguageResolutionController once a runtime
   * i18n system for static strings is available.
   */
  @property({ type: String, attribute: 'clear-all-label', useDefault: true })
  public clearAllLabel = 'Clear all';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * @internal
   *
   * Whether every queued toast is shown in the modal list.
   */
  @state()
  protected expanded = false;

  protected readonly countdown = new ToastCountdown(this);
  private readonly scrollLock = new PageScrollLockController(this);
  // Each rendered toast's queue key and the function that ends its registration with the queue.
  private readonly _registrations = new Map<
    ToastBase,
    { key: string; unregister: () => void }
  >();
  private _unsubscribe?: () => void;
  private _frontKey?: string;
  private _closingToast?: ToastBase;
  private _focusWithin = false;
  private _lastFocused?: HTMLElement;
  // True when the last input in the region was a pointer, which decides where focus goes when the front changes.
  private _pointerInput = false;
  private _focusFrontOnOpen = false;
  private _focusRegionOnCollapse = false;

  protected get frontEntry(): ToastQueueEntry | undefined {
    return ToastQueue.entries[0];
  }

  /** The queued entries behind the front toast, newest first. */
  protected get layerEntries(): readonly ToastQueueEntry[] {
    return ToastQueue.entries.slice(1);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    warnIf(
      this,
      [...connectedRegions].some(
        (region) => region.ownerDocument === this.ownerDocument
      ),
      'Only one swc-toast-region should be connected per app view.',
      docsUrl
    );
    connectedRegions.add(this);
    this.ownerDocument.addEventListener('keydown', this.handleLandmarkKeydown, {
      capture: true,
    });
    this._unsubscribe = ToastQueue.subscribe(this.handleQueueChange);
    this.handleQueueChange();
  }

  public override disconnectedCallback(): void {
    this.ownerDocument.removeEventListener(
      'keydown',
      this.handleLandmarkKeydown,
      { capture: true }
    );
    this._unsubscribe?.();
    for (const { unregister } of this._registrations.values()) {
      unregister();
    }
    this._registrations.clear();
    unregisterDismissible(this);
    this.expanded = false;
    connectedRegions.delete(this);
    super.disconnectedCallback();
  }

  // A disconnected region must not render: it would register its own toasts for the shared
  // queue's entries, taking over their close lifecycle from the region that shows them.
  // Connecting again requests an update (`handleQueueChange()`).
  protected override shouldUpdate(changedProperties: PropertyValues): boolean {
    return this.isConnected && super.shouldUpdate(changedProperties);
  }

  protected override update(changedProperties: PropertyValues): void {
    validateEnum(this, {
      prop: 'placement',
      value: this.placement,
      valid: TOAST_REGION_PLACEMENTS,
      url: docsUrl,
    });
    super.update(changedProperties);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    this.syncRenderedToasts();
    // The initial value is not a change of state, so only real toggles run.
    if (
      changedProperties.has('expanded') &&
      changedProperties.get('expanded') !== undefined
    ) {
      if (this.expanded) {
        this.showExpanded();
      } else {
        this.finishCollapse();
      }
    }
  }

  /**
   * Opens the expanded view, which shows every queued toast in a modal list.
   * Needs two or more queued toasts.
   */
  protected expand(): void {
    if (this.expanded || ToastQueue.entries.length < 2) {
      return;
    }
    // No toast auto-dismisses while expanded (Q12).
    this.countdown.stop();
    this.expanded = true;
  }

  /** Closes the expanded view. `focusRegion` moves focus to the collapsed region. */
  protected collapse(focusRegion: boolean): void {
    if (!this.expanded) {
      return;
    }
    this._focusRegionOnCollapse = focusRegion;
    this.teardownExpanded();
    this.expanded = false;
  }

  protected readonly handleAfterClose = (event: Event): void => {
    const registration = this.registrationOf(event.target);
    if (!registration) {
      return;
    }
    if (event.target === this.currentToast) {
      this.countdown.stop();
    }
    ToastQueue.remove(registration.key);
  };

  protected readonly handleClose = (event: Event): void => {
    const registration = this.registrationOf(event.target);
    if (!registration) {
      return;
    }
    const toast = event.target as ToastBase;
    const { key } = registration;
    // Checked now, while the close button still has focus.
    const hadFocus =
      this.expanded &&
      deepContains(toast, getActiveElement(this.ownerDocument));
    queueMicrotask(() => {
      if (event.defaultPrevented || toast.open) {
        return;
      }
      if (
        !this.isConnected ||
        !this._registrations.has(toast) ||
        (!this.expanded && this.frontEntry?.key !== key)
      ) {
        ToastQueue.remove(key);
        return;
      }
      if (toast === this.currentToast) {
        this._closingToast = toast;
        this.countdown.stop();
      }
      if (hadFocus) {
        this.focusNearestToast(key);
      }
      ToastQueue.close(key);
    });
  };

  protected readonly handleAction = (event: Event): void => {
    const registration = this.registrationOf(event.target);
    const entry = ToastQueue.entries.find(
      (entry) => entry.key === registration?.key
    );
    if (!entry) {
      return;
    }
    entry.onAction?.();
    if (entry.shouldCloseOnAction) {
      ToastQueue.close(entry.key);
    }
  };

  protected readonly handleExpand = (): void => {
    this.expand();
  };

  // Clicking anywhere on the collapsed stack expands it, except a click on a
  // button, including a button component's host (for example `swc-close-button`).
  protected readonly handleRegionClick = (event: MouseEvent): void => {
    if (this.expanded) {
      return;
    }
    const onButton = event
      .composedPath()
      .some(
        (node) =>
          node instanceof HTMLElement &&
          (/(^|-)button$/.test(node.localName) ||
            node.getAttribute('role') === 'button')
      );
    if (!onButton) {
      this.expand();
    }
  };

  protected readonly handleCollapseClick = (): void => {
    this.collapse(true);
  };

  protected readonly handleClearAllClick = (): void => {
    // The view collapses on its own once the queue empties.
    ToastQueue.clear();
  };

  // Escape follows the dismissible stack, as `swc-popover` modal mode does: if
  // another surface opened above the expanded view, it handles Escape first.
  protected readonly handleCancel = (event: Event): void => {
    if (!isTopDismissible(this)) {
      event.preventDefault();
    }
  };

  // Fires after Escape closes the dialog natively. The event is queued, so one
  // from a dialog that a collapse already replaced is ignored.
  protected readonly handleDialogClose = (event: Event): void => {
    if (event.target !== this.region) {
      return;
    }
    this.collapse(true);
  };

  // A pointerdown on the backdrop targets the dialog itself, as does its own
  // box, so only a point outside the box counts as a scrim press.
  protected readonly handleDialogPointerDown = (event: PointerEvent): void => {
    this._pointerInput = true;
    const dialog = this.region;
    if (!dialog || event.target !== dialog) {
      return;
    }
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      this.collapse(true);
    }
  };

  protected readonly handlePointerEnter = (): void => {
    this.countdown.setPaused('pointer', true);
  };

  protected readonly handlePointerLeave = (): void => {
    this.countdown.setPaused('pointer', false);
  };

  // Tracks the last input device inside the region; it decides where focus goes when the front toast changes.
  protected readonly handlePointerDown = (): void => {
    this._pointerInput = true;
  };

  protected readonly handleKeyDown = (): void => {
    this._pointerInput = false;
  };

  protected readonly handleFocusIn = (event: FocusEvent): void => {
    if (!this._focusWithin && event.relatedTarget instanceof HTMLElement) {
      this._lastFocused = event.relatedTarget;
    }
    this._focusWithin = true;
    this.countdown.setPaused('focus', true);
  };

  protected readonly handleFocusOut = (): void => {
    queueMicrotask(() => {
      const active = getActiveElement(this.ownerDocument);
      if (
        this._closingToast === this.currentToast &&
        this._closingToast &&
        active === this.ownerDocument.body
      ) {
        return;
      }
      this._focusWithin = deepContains(this, active);
      if (!this._focusWithin) {
        this._pointerInput = false;
      }
      this.countdown.setPaused('focus', this._focusWithin);
    });
  };

  // F6 and Shift+F6 move focus into the region and back, as React Aria's toast region does.
  // The expanded view is modal, so it keeps focus instead.
  private readonly handleLandmarkKeydown = (event: KeyboardEvent): void => {
    if (
      event.key !== 'F6' ||
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      this.expanded
    ) {
      return;
    }
    const region = this.region;
    if (!region) {
      return;
    }
    if (deepContains(this, getActiveElement(this.ownerDocument))) {
      if (!this._lastFocused?.isConnected) {
        return;
      }
      event.preventDefault();
      this._lastFocused.focus({ preventScroll: true });
      return;
    }
    event.preventDefault();
    region.focus({ preventScroll: true });
  };

  private readonly handleQueueChange = (): void => {
    const key = this.frontEntry?.key;
    // The expanded view collapses on its own when the queue empties, with no focus redirect.
    if (!key && this.expanded) {
      this.collapse(false);
    }
    // An add always lands at the front, so every add changes the front key. Only removing a non-front entry skips this block.
    if (key !== this._frontKey) {
      const active = getActiveElement(this.ownerDocument);
      // The queue emptied while focus was in the region (or fell to body when its toast left the DOM): return focus to where it was before the region.
      if (
        !key &&
        this._focusWithin &&
        (deepContains(this, active) || active === this.ownerDocument.body) &&
        this._lastFocused?.isConnected
      ) {
        this._lastFocused.focus({ preventScroll: true });
      }
      // The old toast's timer never carries over; openToast() starts the new one.
      this.countdown.stop();
      if (!key) {
        // Clear all focus and pause state so none of it leaks into the next toast.
        this._focusWithin = false;
        this._pointerInput = false;
        this._focusFrontOnOpen = false;
        this._lastFocused = undefined;
        this.countdown.setPaused('pointer', false);
        this.countdown.setPaused('focus', false);
      } else if (
        !this.expanded &&
        this._focusWithin &&
        (deepContains(this, active) || active === this.ownerDocument.body)
      ) {
        // The focused toast was replaced at the front, so keep focus in the region.
        // The expanded list keeps every toast, so focus stays where it is there.
        this.moveFocusForNewFront();
      }
      this._frontKey = key;
      this._closingToast = undefined;
    }
    this.requestUpdate();
  };

  /**
   * Keeps focus from being lost when the focused toast is replaced at the front.
   * Keyboard users land on the new front toast. Pointer users leave the region,
   * so the new front toast's timer is not left paused by focus.
   */
  private moveFocusForNewFront(): void {
    if (!this._pointerInput) {
      this._focusFrontOnOpen = true;
      return;
    }
    const target = this._lastFocused;
    this._focusWithin = false;
    this._pointerInput = false;
    this._lastFocused = undefined;
    this.countdown.setPaused('focus', false);
    if (target?.isConnected) {
      target.focus({ preventScroll: true });
    }
  }

  /** Moves focus to the toast nearest a closing one: the newer one, otherwise the older one. */
  private focusNearestToast(key: string): void {
    const entries = ToastQueue.entries;
    const index = entries.findIndex((entry) => entry.key === key);
    const nearest = [entries[index - 1], entries[index + 1]].find(
      (entry) => entry && !ToastQueue.isClosing(entry.key)
    );
    if (nearest) {
      this.renderedToasts.get(nearest.key)?.focus({ preventScroll: true });
    }
  }

  /** Registers newly rendered toasts with the queue and releases toasts that left the DOM. */
  private syncRenderedToasts(): void {
    const rendered = this.renderedToasts;
    const departed: (() => void)[] = [];
    for (const [toast, registration] of this._registrations) {
      if (rendered.get(registration.key) !== toast) {
        this._registrations.delete(toast);
        departed.push(registration.unregister);
      }
    }
    // Releasing a toast that left the DOM mid-close finishes its removal and changes the queue,
    // so it runs after this update instead of scheduling another one from inside it.
    if (departed.length > 0) {
      queueMicrotask(() => {
        for (const unregister of departed) {
          unregister();
        }
      });
    }
    let added = false;
    for (const [key, toast] of rendered) {
      const entry = ToastQueue.entries.find((entry) => entry.key === key);
      if (!entry || this._registrations.has(toast)) {
        continue;
      }
      added = true;
      this._registrations.set(toast, {
        key,
        unregister: ToastQueue.setRendered(key, () => {
          toast.close();
          return !toast.open;
        }),
      });
      void this.openToast(entry, toast);
    }
    // Removing a focused toast fires no focusout, so drop a pause its focus left behind.
    if (
      added &&
      this._focusWithin &&
      !deepContains(this, getActiveElement(this.ownerDocument))
    ) {
      this._focusWithin = false;
      this.countdown.setPaused('focus', false);
    }
  }

  private registrationOf(
    target: EventTarget | null
  ): { key: string; unregister: () => void } | undefined {
    return this._registrations.get(target as ToastBase);
  }

  private showExpanded(): void {
    const dialog = this.region;
    if (!(dialog instanceof HTMLDialogElement)) {
      return;
    }
    if (!dialog.open) {
      // `showModal()` scrolls to the focused element and has no `preventScroll`
      // option, so restore the scroll position around it, as `swc-popover` does.
      const { scrollX, scrollY } = window;
      try {
        dialog.showModal();
      } catch {
        this.expanded = false;
        return;
      }
      window.scrollTo(scrollX, scrollY);
    }
    this.scrollLock.lock();
    registerDismissible(this);
    // The Show all control is gone once expanded, so focus its toast.
    this.currentToast?.focus({ preventScroll: true });
  }

  private teardownExpanded(): void {
    unregisterDismissible(this);
    this.scrollLock.unlock();
    const dialog = this.region;
    if (dialog instanceof HTMLDialogElement && dialog.open) {
      dialog.close();
    }
  }

  private finishCollapse(): void {
    // The region element replaced the dialog, so a pointer pause has no pointerleave to end it.
    this.countdown.setPaused('pointer', false);
    if (this._focusRegionOnCollapse) {
      this._focusRegionOnCollapse = false;
      this.region?.focus({ preventScroll: true });
    }
    const entry = this.frontEntry;
    const toast = this.currentToast;
    // The front toast gets a fresh timeout after the expanded view (Q12).
    if (entry && toast?.open) {
      this.startCountdown(entry, toast);
    }
  }

  private async openToast(
    entry: ToastQueueEntry,
    toast: ToastBase
  ): Promise<void> {
    await toast.updateComplete;
    if (!this.isConnected || !this._registrations.has(toast)) {
      return;
    }
    // A close requested before the toast was open had nothing to close, so finish it here.
    if (ToastQueue.isClosing(entry.key)) {
      ToastQueue.remove(entry.key);
      return;
    }
    toast.open = true;
    await toast.updateComplete;
    if (
      !this.isConnected ||
      !this._registrations.has(toast) ||
      toast !== this.currentToast ||
      this.frontEntry?.key !== entry.key
    ) {
      return;
    }
    if (this._focusFrontOnOpen) {
      this._focusFrontOnOpen = false;
      toast.focus({ preventScroll: true });
    }
    warnIf(
      this,
      Boolean(entry.actionLabel) !== Boolean(entry.onAction),
      'A toast action needs both actionLabel and onAction.',
      docsUrl
    );
    warnIf(
      this,
      Boolean(entry.actionLabel && entry.onAction) && toast.timeout !== null,
      'Toasts with an action cannot auto-dismiss; timeout is ignored.',
      docsUrl
    );
    if (!this.expanded) {
      this.startCountdown(entry, toast);
    }
  }

  private startCountdown(entry: ToastQueueEntry, toast: ToastBase): void {
    const hasAction = Boolean(entry.actionLabel && entry.onAction);
    this.countdown.start(hasAction ? null : toast.timeout, () =>
      ToastQueue.close(entry.key)
    );
  }
}
