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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  deepContains,
  getActiveElement,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import type { ToastBase } from './Toast.base.js';
import {
  TOAST_CONTAINER_PLACEMENTS,
  type ToastContainerPlacement,
  type ToastQueueEntry,
} from './ToastContainer.types.js';
import { ToastCountdown } from './ToastCountdown.js';
import { ToastQueue } from './ToastQueue.js';

const connectedContainers = new Set<ToastContainerBase>();
const docsUrl =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-toast-container--docs';

export abstract class ToastContainerBase extends SpectrumElement {
  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  protected abstract get currentToast(): ToastBase | undefined;

  /** The rendered `role="region"` wrapper, absent while the queue is empty. */
  protected abstract get region(): HTMLElement | undefined;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /** The viewport edge at which notifications appear. End is logical. */
  @property({ type: String, reflect: true })
  public placement: ToastContainerPlacement = 'bottom';

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

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected readonly countdown = new ToastCountdown(this);
  private _unsubscribe?: () => void;
  private _unregisterToast?: () => void;
  private _frontKey?: string;
  private _activeToast?: ToastBase;
  private _closingToast?: ToastBase;
  private _focusWithin = false;
  private _lastFocused?: HTMLElement;

  protected get frontEntry(): ToastQueueEntry | undefined {
    return ToastQueue.entries[0];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    warnIf(
      this,
      [...connectedContainers].some(
        (container) => container.ownerDocument === this.ownerDocument
      ),
      'Only one swc-toast-container should be connected per app view.',
      docsUrl
    );
    connectedContainers.add(this);
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
    this._unregisterToast?.();
    this._activeToast = undefined;
    connectedContainers.delete(this);
    super.disconnectedCallback();
  }

  protected override update(changedProperties: PropertyValues): void {
    validateEnum(this, {
      prop: 'placement',
      value: this.placement,
      valid: TOAST_CONTAINER_PLACEMENTS,
      url: docsUrl,
    });
    super.update(changedProperties);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    const entry = this.frontEntry;
    const toast = this.currentToast;
    if (!entry || !toast || this._activeToast === toast) {
      return;
    }
    this._activeToast = toast;
    // Removing a focused toast fires no focusout, so drop a pause its focus left behind.
    if (
      this._focusWithin &&
      !deepContains(this, getActiveElement(this.ownerDocument))
    ) {
      this._focusWithin = false;
      this.countdown.setPaused('focus', false);
    }
    this._unregisterToast = ToastQueue.setRendered(entry.key, () => {
      toast.close();
      return !toast.open;
    });
    void this.openToast(entry, toast);
  }

  protected readonly handleAfterClose = (event: Event): void => {
    if (event.target !== this.currentToast || !this.frontEntry) {
      return;
    }
    this.countdown.stop();
    ToastQueue.remove(this.frontEntry.key);
  };

  protected readonly handleClose = (event: Event): void => {
    const toast = this.currentToast;
    const key = this.frontEntry?.key;
    if (event.target !== toast || !key) {
      return;
    }
    queueMicrotask(() => {
      if (toast && !event.defaultPrevented && !toast.open) {
        if (!this.isConnected || this.frontEntry?.key !== key) {
          ToastQueue.remove(key);
          return;
        }
        this._closingToast = toast;
        this.countdown.stop();
        ToastQueue.close(key);
      }
    });
  };

  protected readonly handleAction = (event: Event): void => {
    const entry = this.frontEntry;
    if (event.target !== this.currentToast || !entry) {
      return;
    }
    entry.onAction?.();
    if (entry.shouldCloseOnAction) {
      ToastQueue.close(entry.key);
    }
  };

  protected readonly handlePointerEnter = (): void => {
    this.countdown.setPaused('pointer', true);
  };

  protected readonly handlePointerLeave = (): void => {
    this.countdown.setPaused('pointer', false);
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
      this.countdown.setPaused('focus', this._focusWithin);
    });
  };

  // F6 and Shift+F6 move focus into the region and back, as React Aria's toast region does.
  private readonly handleLandmarkKeydown = (event: KeyboardEvent): void => {
    if (
      event.key !== 'F6' ||
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
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
    if (key !== this._frontKey) {
      const active = getActiveElement(this.ownerDocument);
      if (
        !key &&
        this._focusWithin &&
        (deepContains(this, active) || active === this.ownerDocument.body) &&
        this._lastFocused?.isConnected
      ) {
        this._lastFocused.focus({ preventScroll: true });
      }
      this.countdown.stop();
      if (!key) {
        this._focusWithin = false;
        this._lastFocused = undefined;
        this.countdown.setPaused('pointer', false);
        this.countdown.setPaused('focus', false);
      }
      this._unregisterToast?.();
      this._unregisterToast = undefined;
      this._frontKey = key;
      this._closingToast = undefined;
    }
    this.requestUpdate();
  };

  private async openToast(
    entry: ToastQueueEntry,
    toast: ToastBase
  ): Promise<void> {
    await toast.updateComplete;
    if (!this.isConnected || this.frontEntry?.key !== entry.key) {
      return;
    }
    // A close requested before the toast was open had nothing to close, so finish it here.
    if (ToastQueue.isClosing(entry.key)) {
      ToastQueue.remove(entry.key);
      return;
    }
    toast.open = true;
    await toast.updateComplete;
    if (!this.isConnected || this.frontEntry?.key !== entry.key) {
      return;
    }
    const hasAction = Boolean(entry.actionLabel && entry.onAction);
    warnIf(
      this,
      Boolean(entry.actionLabel) !== Boolean(entry.onAction),
      'A toast action needs both actionLabel and onAction.',
      docsUrl
    );
    warnIf(
      this,
      hasAction && toast.timeout !== null,
      'Toasts with an action cannot auto-dismiss; timeout is ignored.',
      docsUrl
    );
    this.countdown.start(hasAction ? null : toast.timeout, () =>
      ToastQueue.close(entry.key)
    );
  }
}
