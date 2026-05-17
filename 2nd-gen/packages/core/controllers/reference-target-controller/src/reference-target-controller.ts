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

/**
 * Symbol used as the `requestUpdate` change key when the controller
 * syncs a new relationship onto the shadow target. Host elements can
 * react to this in `willUpdate` or `updated`.
 */
export const referenceTargetUpdatedSymbol = Symbol('reference target updated');

/**
 * ARIA relationship attributes that the shim can forward. Phase 1 of the
 * native `referenceTarget` proposal covers all IDREF attributes; this POC
 * focuses on the labelling and description subset that SWC components need.
 */
export type ForwardableAttribute =
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-errormessage'
  | 'aria-details';

/**
 * Mapping from a forwarded attribute name to the materialized
 * string-value attribute set on the shadow target when true cross-root
 * IDREF resolution is impossible.
 */
const MATERIALIZED_ATTR: Record<ForwardableAttribute, string> = {
  'aria-labelledby': 'aria-label',
  'aria-describedby': 'aria-description',
  'aria-errormessage': 'aria-description',
  'aria-details': 'aria-details',
};

export interface ReferenceTargetOptions {
  /**
   * The shadow-internal element that should act as the reference target.
   * Accepts a CSS selector resolved against the host's shadow root, or
   * a callback that returns the element directly.
   */
  target: string | (() => HTMLElement | null);

  /**
   * Attributes to forward from light-DOM referrers to the shadow target.
   * Defaults to `['aria-labelledby', 'aria-describedby']`.
   */
  forwardedAttributes?: ForwardableAttribute[];
}

/**
 * Checks whether the browser natively supports `ShadowRoot.referenceTarget`.
 */
export function hasNativeReferenceTarget(): boolean {
  return 'referenceTarget' in ShadowRoot.prototype;
}

/**
 * Reactive controller that approximates the behavior of the
 * [Reference Target for Cross-Root ARIA](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md)
 * proposal.
 *
 * When native `referenceTarget` is unavailable, the controller observes
 * light-DOM elements whose IDREF attributes point at the host and
 * materializes equivalent accessible text or relationships on the
 * shadow-internal target element.
 *
 * Lifecycle handled: connect, disconnect, host `id` changes, referrer
 * attribute mutations, and referrer addition/removal from the DOM.
 */
export class ReferenceTargetController implements ReactiveController {
  private host: ReactiveElement;
  private options: Required<ReferenceTargetOptions>;

  private lightDomObserver: MutationObserver | null = null;
  private hostIdObserver: MutationObserver | null = null;
  private connected = false;

  /**
   * Tracks the last value written for each materialized attribute so
   * the controller can detect true changes and avoid redundant DOM writes.
   */
  private lastSynced = new Map<string, string>();

  constructor(host: ReactiveElement, options: ReferenceTargetOptions) {
    this.host = host;
    this.options = {
      target: options.target,
      forwardedAttributes: options.forwardedAttributes ?? [
        'aria-labelledby',
        'aria-describedby',
      ],
    };
    this.host.addController(this);
  }

  // ──────────────────────────────────────────────────
  //  Lifecycle
  // ──────────────────────────────────────────────────

  hostConnected(): void {
    this.connected = true;

    if (hasNativeReferenceTarget()) {
      this.applyNative();
      return;
    }

    this.observeHostId();
    this.observeLightDom();
    this.sync();
  }

  hostDisconnected(): void {
    this.connected = false;
    this.lightDomObserver?.disconnect();
    this.lightDomObserver = null;
    this.hostIdObserver?.disconnect();
    this.hostIdObserver = null;
    this.clearMaterialized();
  }

  hostUpdated(): void {
    if (!this.connected) {
      return;
    }

    if (hasNativeReferenceTarget()) {
      this.applyNative();
      return;
    }

    this.sync();
  }

  // ──────────────────────────────────────────────────
  //  Native path
  // ──────────────────────────────────────────────────

  private applyNative(): void {
    const target = this.resolveTarget();
    if (!target) {
      return;
    }

    const shadowRoot = this.host.shadowRoot;
    if (!shadowRoot) {
      return;
    }

    (shadowRoot as ShadowRoot & { referenceTarget: string }).referenceTarget =
      target.id || '';
  }

  // ──────────────────────────────────────────────────
  //  Shim path
  // ──────────────────────────────────────────────────

  /**
   * The main synchronization routine. For each forwarded attribute,
   * finds light-DOM elements referencing the host by ID, reads their
   * text content, and materializes it on the shadow target.
   */
  sync(): void {
    const target = this.resolveTarget();
    if (!target) {
      return;
    }

    const hostId = this.host.id;
    if (!hostId) {
      return;
    }

    const root = this.host.getRootNode() as Document | ShadowRoot;

    for (const attr of this.options.forwardedAttributes) {
      const referrers = this.findReferrers(root, hostId, attr);
      const text = this.collectText(referrers, attr);
      const materializedAttr = MATERIALIZED_ATTR[attr];

      const previous = this.lastSynced.get(attr);
      if (text === previous) {
        continue;
      }

      if (text) {
        target.setAttribute(materializedAttr, text);
      } else {
        target.removeAttribute(materializedAttr);
      }
      this.lastSynced.set(attr, text);
    }

    this.host.requestUpdate(referenceTargetUpdatedSymbol, undefined);
  }

  /**
   * Finds all elements in the given root whose `attr` value includes
   * `hostId` as one of the space-separated IDREF tokens.
   */
  private findReferrers(
    root: Document | ShadowRoot,
    hostId: string,
    attr: ForwardableAttribute
  ): HTMLElement[] {
    const candidates = root.querySelectorAll<HTMLElement>(`[${attr}]`);
    const referrers: HTMLElement[] = [];
    for (const el of candidates) {
      const ids = el.getAttribute(attr)?.split(/\s+/) ?? [];
      if (ids.includes(hostId)) {
        referrers.push(el);
      }
    }
    return referrers;
  }

  /**
   * For `aria-labelledby` and `aria-describedby`, collects text content
   * from the full IDREF list on each referrer (not just the host token).
   * This matches the spec behavior where `aria-labelledby="id1 id2"`
   * concatenates the text of both referenced elements.
   *
   * For other attributes, collects only the text of the referrer itself.
   */
  private collectText(
    referrers: HTMLElement[],
    attr: ForwardableAttribute
  ): string {
    if (referrers.length === 0) {
      return '';
    }

    if (attr === 'aria-labelledby' || attr === 'aria-describedby') {
      const texts: string[] = [];
      for (const referrer of referrers) {
        const text = this.resolveIdrefText(referrer, attr);
        if (text) {
          texts.push(text);
        }
      }
      return texts.join(' ');
    }

    return referrers
      .map((el) => el.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Given an element with an IDREF-list attribute (e.g. `aria-labelledby`),
   * resolves the text content of each referenced ID element except the host
   * itself (since the host's text is what we're computing *for*).
   */
  private resolveIdrefText(
    referrer: HTMLElement,
    attr: ForwardableAttribute
  ): string {
    const root = referrer.getRootNode() as Document | ShadowRoot;
    const ids = referrer.getAttribute(attr)?.split(/\s+/) ?? [];
    const hostId = this.host.id;
    const parts: string[] = [];

    for (const id of ids) {
      if (id === hostId) {
        continue;
      }
      const el = root.getElementById
        ? root.getElementById(id)
        : root.querySelector(`#${CSS.escape(id)}`);
      if (el) {
        const text = el.textContent?.trim();
        if (text) {
          parts.push(text);
        }
      }
    }

    if (parts.length === 0) {
      const directText = referrer.textContent?.trim();
      if (directText) {
        return directText;
      }
    }

    return parts.join(' ');
  }

  /**
   * For `<label for="host-id">` associations, finds the label element
   * and applies its text as `aria-label` on the shadow target, plus
   * wires up click-to-focus.
   */
  syncLabelFor(): void {
    const target = this.resolveTarget();
    if (!target) {
      return;
    }

    const hostId = this.host.id;
    if (!hostId) {
      return;
    }

    const root = this.host.getRootNode() as Document | ShadowRoot;
    const label = root.querySelector<HTMLLabelElement>(
      `label[for="${CSS.escape(hostId)}"]`
    );

    if (label) {
      const text = label.textContent?.trim() ?? '';
      if (text) {
        target.setAttribute('aria-label', text);
      }
      label.addEventListener('click', this.handleLabelClick);
    }
  }

  private handleLabelClick = (): void => {
    const target = this.resolveTarget();
    if (target && 'focus' in target) {
      (target as HTMLElement).focus();
    }
  };

  // ──────────────────────────────────────────────────
  //  Target resolution
  // ──────────────────────────────────────────────────

  resolveTarget(): HTMLElement | null {
    const { target } = this.options;
    if (typeof target === 'function') {
      return target();
    }

    const shadowRoot = this.host.shadowRoot;
    if (!shadowRoot) {
      return null;
    }
    return shadowRoot.querySelector<HTMLElement>(target);
  }

  // ──────────────────────────────────────────────────
  //  Observers
  // ──────────────────────────────────────────────────

  private observeHostId(): void {
    this.hostIdObserver?.disconnect();
    this.hostIdObserver = new MutationObserver(() => {
      this.sync();
      this.syncLabelFor();
    });
    this.hostIdObserver.observe(this.host, {
      attributes: true,
      attributeFilter: ['id'],
    });
  }

  /**
   * Observes the light DOM root for attribute mutations on elements
   * that reference the host, and for child additions/removals that
   * could add or remove referrers.
   */
  private observeLightDom(): void {
    this.lightDomObserver?.disconnect();
    const root = this.host.getRootNode() as Document | ShadowRoot;
    const observeTarget =
      root instanceof ShadowRoot
        ? root
        : root instanceof Document
          ? root.body
          : root;

    this.lightDomObserver = new MutationObserver((mutations) => {
      let needsSync = false;
      for (const m of mutations) {
        if (m.type === 'attributes') {
          const attrName = m.attributeName ?? '';
          if (
            this.options.forwardedAttributes.includes(
              attrName as ForwardableAttribute
            ) ||
            attrName === 'for'
          ) {
            needsSync = true;
            break;
          }
        }
        if (m.type === 'childList') {
          needsSync = true;
          break;
        }
      }
      if (needsSync) {
        this.sync();
        this.syncLabelFor();
      }
    });

    this.lightDomObserver.observe(observeTarget, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [...this.options.forwardedAttributes, 'for', 'id'],
    });
  }

  // ──────────────────────────────────────────────────
  //  Cleanup
  // ──────────────────────────────────────────────────

  private clearMaterialized(): void {
    const target = this.resolveTarget();
    if (!target) {
      return;
    }

    for (const attr of this.options.forwardedAttributes) {
      target.removeAttribute(MATERIALIZED_ATTR[attr]);
    }
    this.lastSynced.clear();
  }
}
