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

import type { PropertyValues, ReactiveElement } from 'lit';
import { property, state } from 'lit/decorators.js';

type Constructor<T = Record<string, unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  prototype: T;
};

export interface PendingInterface {
  pending: boolean;
  pendingLabel?: string;
  readonly pendingActive: boolean;
  getPendingAccessibleName(): string;
}

const PENDING_INLINE_SIZE_PROPERTY = '--swc-pending-inline-size';
const PENDING_TARGET_SELECTOR = 'button';
const PENDING_DELAY_MS = 1000;

/**
 * A mixin that adds the pending (busy) state to a host element: the reactive
 * `pending` and `pending-label` properties, a 1-second-delayed `pendingActive`
 * flag with inline-size freeze, an accessible-name derivation helper, and
 * capture-phase click suppression so activation is blocked while pending.
 *
 * The host stays focusable while pending; the mixin never sets the native
 * `disabled` attribute. The host's template is responsible for applying
 * `aria-disabled` and the pending `aria-label` (read from
 * {@link PendingInterface.getPendingAccessibleName}), and for rendering the
 * spinner with the `renderPendingSpinner` directive.
 *
 * Hosts override {@link resolvePendingAccessibleName} to supply their non-busy
 * accessible name; the default uses trimmed `textContent`.
 *
 * @example
 * ```typescript
 * class MyButton extends PendingMixin(SpectrumElement) {
 *   render() {
 *     return html`<button
 *       aria-disabled=${ifDefined(this.pending ? 'true' : undefined)}
 *       aria-label=${ifDefined(this.pending ? this.getPendingAccessibleName() : undefined)}
 *     >
 *       <slot></slot>
 *       ${renderPendingSpinner(this.pending, this.pendingActive)}
 *     </button>`;
 *   }
 * }
 * ```
 */
export function PendingMixin<T extends Constructor<ReactiveElement>>(
  Base: T
): T & Constructor<PendingInterface> {
  class PendingElement extends Base implements PendingInterface {
    /**
     * Whether the element is in a pending (busy) state. The element remains
     * focusable but activation is suppressed.
     */
    @property({ type: Boolean, reflect: true })
    public pending = false;

    /**
     * Custom accessible label used during the pending state. When omitted, the
     * pending label is derived from the resolved non-busy accessible name plus
     * a busy suffix (e.g. "Save, busy").
     */
    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel?: string;

    /**
     * Tracks whether the pending visual (disabled colors + spinner) is active.
     * Becomes `true` after a 1-second delay once `pending` becomes true, so the
     * element does not immediately flash to its unavailable appearance. Read
     * this in `render()` to apply busy styling.
     */
    @state()
    protected pendingActive = false;

    private _pendingTimer: ReturnType<typeof setTimeout> | null = null;

    /**
     * Returns the host's non-busy accessible name, used to derive the default
     * busy label. Hosts override this to supply a richer name (e.g. an
     * `accessible-label` fallback); the default uses trimmed `textContent`.
     */
    protected resolvePendingAccessibleName(): string | null {
      return this.textContent?.trim() || null;
    }

    /** Derives the pending-state accessible label. */
    public getPendingAccessibleName(): string {
      if (this.pendingLabel) {
        return this.pendingLabel;
      }
      const resolved = this.resolvePendingAccessibleName();
      return resolved ? `${resolved}, busy` : 'Busy';
    }

    /**
     * Suppresses click activation while pending. Capture phase so slotted
     * light-DOM clicks are suppressed before host listeners run.
     */
    private readonly _suppressPendingActivation = (event: Event): void => {
      if (this.pending) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    public override connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener('click', this._suppressPendingActivation, true);
    }

    public override disconnectedCallback(): void {
      this.removeEventListener('click', this._suppressPendingActivation, true);
      if (this._pendingTimer !== null) {
        clearTimeout(this._pendingTimer);
        this._pendingTimer = null;
      }
      this.pendingActive = false;
      super.disconnectedCallback();
    }

    protected override update(changedProperties: PropertyValues): void {
      if (changedProperties.has('pending')) {
        if (this.pending) {
          this._pendingTimer = setTimeout(() => {
            this._pendingTimer = null;
            if (!this.pending) {
              return;
            }
            const target = this.renderRoot.querySelector<HTMLElement>(
              PENDING_TARGET_SELECTOR
            );
            if (target) {
              target.style.setProperty(
                PENDING_INLINE_SIZE_PROPERTY,
                `${target.offsetWidth}px`
              );
            }
            this.pendingActive = true;
          }, PENDING_DELAY_MS);
        } else {
          if (this._pendingTimer !== null) {
            clearTimeout(this._pendingTimer);
            this._pendingTimer = null;
          }
          this.renderRoot
            .querySelector<HTMLElement>(PENDING_TARGET_SELECTOR)
            ?.style.removeProperty(PENDING_INLINE_SIZE_PROPERTY);
          this.pendingActive = false;
        }
      }
      super.update(changedProperties);
      if (window.__swc?.DEBUG) {
        if (
          this.pending &&
          'disabled' in this &&
          (this as unknown as { disabled: boolean }).disabled
        ) {
          window.__swc.warn(
            this,
            `<${this.localName}> should not set both "pending" and "disabled" simultaneously. Use "pending" to keep the element focusable while unavailable, or "disabled" to fully remove it from the tab order.`,
            'https://opensource.adobe.com/spectrum-web-components/components/button/#pending',
            { issues: ['pending + disabled'] }
          );
        }
      }
    }
  }
  return PendingElement as unknown as T & Constructor<PendingInterface>;
}
