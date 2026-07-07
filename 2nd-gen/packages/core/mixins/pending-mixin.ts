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
import { property } from 'lit/decorators.js';

import { PendingController } from '../controllers/pending-controller/index.js';
import type { PendingSpinnerResult } from '../directives/pending-spinner/index.js';

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
  renderPendingState(): PendingSpinnerResult;
}

/**
 * A mixin that adds the pending (busy) state to a host: the reactive `pending`
 * and `pending-label` properties, a {@link PendingController} for the delayed
 * visual / inline-size freeze / accessible-name derivation, and capture-phase
 * click suppression so activation is blocked while pending.
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
  constructor: T
): T & Constructor<PendingInterface> {
  class PendingElement extends constructor implements PendingInterface {
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

    private _pendingController = new PendingController(this, {
      resolveAccessibleName: () => this.resolvePendingAccessibleName(),
    });

    /**
     * Whether the delayed busy visual is active. Read this in `render()` to
     * apply the busy styling.
     */
    public get pendingActive(): boolean {
      return this._pendingController.pendingActive;
    }

    /** Derives the pending-state accessible label. */
    public getPendingAccessibleName(): string {
      return this._pendingController.getPendingAccessibleName();
    }

    /**
     * Renders the pending spinner for the current state, via the controller.
     * Lets hosts render the indicator with `${this.renderPendingState()}` and no
     * separate directive import.
     */
    public renderPendingState(): PendingSpinnerResult {
      return this._pendingController.renderPendingState();
    }

    /**
     * Returns the host's non-busy accessible name, used to derive the default
     * busy label. Hosts override this to supply a richer name (e.g. an
     * `accessible-label` fallback); the default uses trimmed `textContent`.
     */
    protected resolvePendingAccessibleName(): string | null {
      return this.textContent?.trim() || null;
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
      super.disconnectedCallback();
    }

    protected override update(changedProperties: PropertyValues): void {
      super.update(changedProperties);
      // Guard the `disabled` read with an `in` check rather than a cast: not
      // every host that applies this mixin necessarily has a `disabled`
      // property.
      const hasDisabled = 'disabled' in this && this.disabled === true;
      if (window.__swc?.DEBUG && this.pending && hasDisabled) {
        window.__swc.warn(
          this,
          `<${this.localName}> should not set both "pending" and "disabled" simultaneously. Use "pending" to keep the element focusable while unavailable, or "disabled" to fully remove it from the tab order.`,
          'https://opensource.adobe.com/spectrum-web-components/',
          { issues: ['pending + disabled'] }
        );
      }
    }
  }
  return PendingElement as unknown as T & Constructor<PendingInterface>;
}
