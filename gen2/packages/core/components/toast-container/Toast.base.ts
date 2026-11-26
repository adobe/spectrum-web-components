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
  runAfterTransition,
  validateEnum,
} from '@adobe/spectrum-wc-core/utils/index.js';

import { TOAST_VARIANTS, type ToastVariant } from './Toast.types.js';

// Whether this engine kept a shadow-tree icon in an ElementInternals name; unknown until the first attempt.
let keepsShadowNameParts: boolean | undefined;

/**
 * Abstract base class for toast. Owns shared API and behavior; rendering lives in SWC.
 *
 * @slot - Toast message text.
 */
export abstract class ToastBase extends SpectrumElement {
  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * The rendered element whose CSS transition gates the open/close lifecycle events.
   */
  protected abstract get internalElement(): HTMLElement | null;

  /**
   * The rendered variant icon, or `null` when there is none. Its label is read
   * as the start of the host's accessible name.
   */
  protected abstract get variantIcon(): Element | null;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Whether the toast is visible.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /** The configured auto-dismiss duration in milliseconds, not remaining time. */
  @property({ type: Number, reflect: true })
  public set timeout(value: number | null) {
    const previous = this._timeout;
    this._timeout = value !== null && value > 0 ? Math.max(6000, value) : null;
    this.requestUpdate('timeout', previous);
  }

  public get timeout(): number | null {
    return this._timeout;
  }
  private _timeout: number | null = null;

  /**
   * The semantic variant of the toast.
   */
  @property({ type: String, reflect: true })
  public variant: ToastVariant = 'neutral';

  /**
   * An accessible label for the semantic variant icon.
   *
   * When omitted, the icon is labeled with the variant's default English
   * label. Set a different label to override it, for example to localize it,
   * or set an empty label to make the icon decorative when the message
   * already states the status. Ignored for the `neutral` variant, which has no icon.
   */
  @property({ type: String, attribute: 'icon-label' })
  public iconLabel?: string;

  /**
   * The accessible name of the close button. Set it to localize the name.
   * Defaults to "Close" when omitted or empty.
   *
   * @todo Localize the default via LanguageResolutionController once a runtime
   * i18n system for static strings is available.
   */
  @property({ type: String, attribute: 'close-label' })
  public closeLabel?: string;

  /**
   * The label for the optional action button. When set, Toast renders its own button.
   */
  @property({ type: String, attribute: 'action-label' })
  public actionLabel?: string;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  private _cancelAfterTransition?: () => void;
  // Kept until it runs so a reconnect can restart an event that disconnection canceled.
  private _pendingAfterTransition?: () => void;
  // True once `swc-close` has fired, so the next update must not dispatch it again.
  private _closeEventDispatched = false;
  // The aria-label this toast set itself, so an author's own aria-label is never replaced or removed.
  private _ownedAriaLabel?: string;
  // Names the host from elements in its own shadow tree, which `aria-labelledby` cannot reach.
  private readonly internals = this.attachInternals();
  private _contentRevealed = true;
  private _cancelContentReveal?: () => void;
  private readonly _contentObserver = new MutationObserver(() => {
    this.requestUpdate();
  });

  /**
   * @todo Localize the default labels via LanguageResolutionController once a
   * runtime i18n solution exists. Consumers can override them with `iconLabel`.
   */
  private static readonly DEFAULT_ICON_LABELS: Partial<
    Record<ToastVariant, string>
  > = {
    info: 'Information',
    positive: 'Success',
    negative: 'Error',
  };

  /** The label for the variant icon, or `undefined` when there is no icon or it is decorative. */
  protected get variantIconLabel(): string | undefined {
    const defaultLabel = ToastBase.DEFAULT_ICON_LABELS[this.variant];
    return defaultLabel === undefined
      ? undefined
      : (this.iconLabel ?? defaultLabel);
  }

  /**
   * Whether the message content is rendered inside the live region.
   *
   * False for two frames after opening so the live region is exposed empty
   * first; content is then added as a DOM change, which both Safari and
   * Chrome announce.
   *
   * @internal
   */
  protected get contentRevealed(): boolean {
    return this._contentRevealed;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'alertdialog');
    this.setAttribute('aria-modal', 'false');
    // Text changes count too, because the aria-label fallback copies the message text.
    this._contentObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    // Restarts a reveal that disconnection interrupted, so the message is still announced.
    if (!this._contentRevealed) {
      this.scheduleContentReveal();
    }
    if (this._pendingAfterTransition) {
      this.dispatchAfterTransition(this._pendingAfterTransition);
    }
  }

  public override disconnectedCallback(): void {
    this._contentObserver.disconnect();
    this._cancelAfterTransition?.();
    this._cancelAfterTransition = undefined;
    this._cancelContentReveal?.();
    this._cancelContentReveal = undefined;
    super.disconnectedCallback();
  }

  /**
   * Closes the toast unless the synchronous `swc-close` event is canceled.
   *
   * Assigning `open = false` directly still dispatches `swc-close` during the
   * update cycle.
   */
  public close(): void {
    this.requestClose();
  }

  /**
   * Requests dismissal and closes unless the `swc-close` event is canceled.
   *
   * @internal
   */
  protected readonly requestClose = (): void => {
    if (!this.open) {
      return;
    }
    const accepted = this.dispatchEvent(
      new CustomEvent('swc-close', {
        bubbles: true,
        cancelable: true,
        composed: true,
      })
    );
    if (!accepted) {
      return;
    }
    this._closeEventDispatched = true;
    this.open = false;
  };

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (this.open && changedProperties.get('open') === false) {
      this._contentRevealed = false;
      this.dispatchEvent(
        new CustomEvent('swc-open', {
          bubbles: true,
          composed: true,
        })
      );
    } else if (
      !this.open &&
      changedProperties.get('open') === true &&
      !this._closeEventDispatched
    ) {
      const accepted = this.dispatchEvent(
        new CustomEvent('swc-close', {
          bubbles: true,
          cancelable: true,
          composed: true,
        })
      );
      this._closeEventDispatched = true;
      if (!accepted) {
        this.open = true;
      }
    }
  }

  protected override update(changedProperties: PropertyValues): void {
    validateEnum(this, {
      prop: 'variant',
      value: this.variant,
      valid: TOAST_VARIANTS,
      url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-toast-container--docs',
    });
    if (!this.hasUpdated || changedProperties.has('open')) {
      this.setAttribute('tabindex', '0');
      if (this.open) {
        this.removeAttribute('aria-hidden');
      } else {
        this.setAttribute('aria-hidden', 'true');
      }
    }
    super.update(changedProperties);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // After render, so the variant icon exists and is the current one.
    this.updateAccessibleName();
    if (
      !changedProperties.has('open') ||
      changedProperties.get('open') === undefined
    ) {
      return;
    }

    if (this.open) {
      if (this._closeEventDispatched) {
        this._closeEventDispatched = false;
        return;
      }
      this.scheduleContentReveal();
      this.dispatchAfterTransition(() => {
        this.dispatchEvent(
          new CustomEvent('swc-after-open', {
            bubbles: true,
            composed: true,
          })
        );
      });
      return;
    }

    this._cancelContentReveal?.();
    this._contentRevealed = true;
    this._closeEventDispatched = false;
    this.dispatchAfterTransition(
      () => {
        this.dispatchEvent(
          new CustomEvent('swc-after-close', {
            bubbles: true,
            composed: true,
          })
        );
      },
      { skipWhenHidden: true }
    );
  }

  /**
   * The icon label lives in the live region, which is read when the toast
   * appears. Focusing the host reads its name instead, so the name starts with
   * the icon's own label, followed by the message. `aria-labelledby` cannot
   * reference the shadow icon, so `ElementInternals` does it. Where the engine
   * cannot (WebKit drops the icon, and older browsers lack the API), the host
   * gets an `aria-label` made of the icon label and the message text. With no
   * labeled icon, the name is the message alone, through `aria-labelledby`.
   */
  private updateAccessibleName(): void {
    const messageNodes = [...this.childNodes].filter((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return false;
      }
      // An empty slot="" attribute assigns to the default slot, same as no
      // slot attribute at all.
      return !(node as Element).getAttribute('slot');
    });
    const message =
      messageNodes.length === 1 &&
      messageNodes[0] instanceof HTMLElement &&
      messageNodes[0].id
        ? messageNodes[0]
        : undefined;
    const iconLabel = this.variantIconLabel;
    const icon = iconLabel ? this.variantIcon : null;
    const supportsElementNames = 'ariaLabelledByElements' in this.internals;

    if (
      message &&
      icon &&
      supportsElementNames &&
      keepsShadowNameParts !== false
    ) {
      this.internals.ariaLabelledByElements = [icon, message];
      // WebKit silently drops a target in the host's own shadow tree. Trust the relationship only
      // when the icon was kept, or removing the attribute below would leave the host without a name.
      keepsShadowNameParts =
        this.internals.ariaLabelledByElements?.[0] === icon;
      if (keepsShadowNameParts) {
        // A host `aria-labelledby` attribute overrides `ElementInternals`, so only one of them is set.
        this.removeAttribute('aria-labelledby');
        this.clearOwnedAriaLabel();
        return;
      }
    }

    if (supportsElementNames && this.internals.ariaLabelledByElements) {
      this.internals.ariaLabelledByElements = null;
    }

    if (
      message &&
      iconLabel &&
      (keepsShadowNameParts === false || !supportsElementNames)
    ) {
      const text = (message.textContent ?? '').replace(/\s+/g, ' ').trim();
      // An aria-label overrides aria-labelledby, so only one of them is set.
      this.removeAttribute('aria-labelledby');
      this.setOwnedAriaLabel(`${iconLabel} ${text}`.trim());
      return;
    }

    this.clearOwnedAriaLabel();
    if (message) {
      if (this.getAttribute('aria-labelledby') !== message.id) {
        this.setAttribute('aria-labelledby', message.id);
      }
      return;
    }

    this.removeAttribute('aria-labelledby');
  }

  private setOwnedAriaLabel(value: string): void {
    const current = this.getAttribute('aria-label');
    if (current !== null && current !== this._ownedAriaLabel) {
      return;
    }
    if (current !== value) {
      this.setAttribute('aria-label', value);
    }
    this._ownedAriaLabel = value;
  }

  private clearOwnedAriaLabel(): void {
    if (
      this._ownedAriaLabel !== undefined &&
      this.getAttribute('aria-label') === this._ownedAriaLabel
    ) {
      this.removeAttribute('aria-label');
    }
    this._ownedAriaLabel = undefined;
  }

  /**
   * Waits two frames, then renders the message content into the live region.
   */
  private scheduleContentReveal(): void {
    this._cancelContentReveal?.();
    let cancelled = false;
    requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }
      requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }
        this._contentRevealed = true;
        this.requestUpdate();
      });
    });
    this._cancelContentReveal = () => {
      cancelled = true;
    };
  }

  // With `skipWhenHidden`, settles on the next task if the host is already
  // `display: none`, as in engines that skip the discrete `display` transition
  // (Firefox). Nothing is left to fade, so waiting only delays what follows.
  private dispatchAfterTransition(
    callback: () => void,
    { skipWhenHidden = false }: { skipWhenHidden?: boolean } = {}
  ): void {
    this._cancelAfterTransition?.();
    this._pendingAfterTransition = undefined;
    const element = this.internalElement;
    if (!element) {
      return;
    }
    this._pendingAfterTransition = callback;
    const settle = (): void => {
      this._cancelAfterTransition = undefined;
      this._pendingAfterTransition = undefined;
      callback();
    };
    if (skipWhenHidden && getComputedStyle(this).display === 'none') {
      const timer = setTimeout(settle);
      this._cancelAfterTransition = () => clearTimeout(timer);
      return;
    }
    this._cancelAfterTransition = runAfterTransition(element, settle);
  }
}
