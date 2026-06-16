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

import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { PendingController, pendingControllerStyles } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-pending-host': DemoPendingHost;
  }
}

// ────────────────────────────────────────
//     DEMO HOST
// ────────────────────────────────────────

/**
 * @internal
 *
 * Storybook-only host that wires `PendingController` onto a minimal `<button>`.
 * It mirrors how a real component consumes the controller: it owns the `pending`
 * and `pendingLabel` reactive properties, includes `pendingControllerStyles`,
 * applies the busy class from `pendingController.pendingActive`, keeps
 * `aria-disabled` / `aria-label` synchronous with `pending`, and renders the
 * spinner via `renderPendingState()`.
 *
 * A short demo `delay` (250 ms) keeps the visual transition responsive for the
 * stories without multi-second waits; production hosts use the 1000 ms default.
 */
@customElement('demo-pending-host')
export class DemoPendingHost extends LitElement {
  static override styles = [
    pendingControllerStyles,
    css`
      :host {
        display: inline-flex;
      }

      .demo-button {
        display: inline-flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
        min-block-size: 32px;
        padding-inline: 16px;
        color: var(--swc-white, #fff);
        background: var(--swc-blue-900, #2680eb);
        border: none;
        border-radius: 16px;
        font: inherit;
        cursor: pointer;
      }

      .demo-button--pendingActive {
        /* Freeze the measured width so hiding the label does not collapse the
           button, and swap to an unavailable appearance. */
        inline-size: var(--swc-pending-inline-size);
        background: var(--swc-gray-300, #b3b3b3);
        cursor: default;
      }

      .demo-button--pendingActive .demo-button-label {
        display: none;
      }

      /* Theme the controller-rendered spinner. */
      .swc-PendingSpinner {
        --swc-pending-spinner-size: 18px;
        --swc-pending-spinner-track-color: var(--swc-gray-500, #747474);
        --swc-pending-spinner-fill-color: var(--swc-white, #fff);
        --swc-pending-spinner-thickness: 2px;
      }
    `,
  ];

  static override properties = {
    pending: { type: Boolean, reflect: true },
    pendingLabel: { type: String, attribute: 'pending-label' },
    label: { type: String },
    clickPending: { type: Boolean, attribute: 'click-pending' },
  };

  declare pending: boolean;
  declare pendingLabel?: string;
  declare label: string;
  declare clickPending: boolean;

  private readonly pendingController = new PendingController(this, {
    delay: 250,
    targetSelector: '.demo-button',
    resolveAccessibleName: () =>
      this.label || (this.textContent?.trim() ?? null),
  });

  private resetTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly onButtonClick = (): void => {
    if (this.pending) {
      return;
    }
    this.pending = true;
    this.resetTimer = setTimeout(() => {
      this.resetTimer = null;
      this.pending = false;
    }, 2000);
  };

  constructor() {
    super();
    this.pending = false;
    this.label = 'Save';
    this.clickPending = false;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    if (this.resetTimer !== null) {
      clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <button
        class=${classMap({
          'demo-button': true,
          'demo-button--pendingActive': this.pendingController.pendingActive,
        })}
        type="button"
        aria-disabled=${ifDefined(this.pending ? 'true' : undefined)}
        aria-label=${ifDefined(
          this.pending
            ? this.pendingController.getPendingAccessibleName()
            : undefined
        )}
        @click=${this.clickPending ? this.onButtonClick : null}
      >
        <span class="demo-button-label">${this.label}</span>
        ${this.pendingController.renderPendingState()}
      </button>
    `;
  }
}
