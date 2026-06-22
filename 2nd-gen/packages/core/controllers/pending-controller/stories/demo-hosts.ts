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
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { renderPendingSpinner } from '../../../directives/pending-spinner/index.js';
import { PendingController, type PendingControllerHost } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-pending-host': DemoPendingHost;
  }
}

/**
 * Short demo delay so the stories show the delayed activation without
 * multi-second waits. Production hosts use the controller default (1000 ms).
 */
const DEMO_DELAY = 250;

/**
 * @internal
 *
 * Storybook-only host that pairs {@link PendingController} (state) with the
 * `renderPendingSpinner` directive (render) directly, the way a non-button
 * component would consume the primitives. It owns `pending` / `pendingLabel`
 * (required by {@link PendingControllerHost}) plus a `label` used as the visible
 * text and the resolved accessible name, applies the busy class from
 * `pendingController.pendingActive`, keeps `aria-disabled` / `aria-label`
 * synchronous with `pending`, and consumes `--swc-pending-inline-size` to freeze
 * its width. Spinner styles are inlined here because the shared
 * `pending-spinner.css` fragment lives in the `swc` package and is not reachable
 * from `core`.
 */
@customElement('demo-pending-host')
export class DemoPendingHost
  extends LitElement
  implements PendingControllerHost
{
  static override styles = css`
    button {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      min-inline-size: 6ch;
      padding: 6px 16px;
      font: inherit;
      color: #fff;
      background: #2680eb;
      border: none;
      border-radius: 16px;
      cursor: pointer;
    }

    button.is-pendingActive {
      inline-size: var(--swc-pending-inline-size);
      background: #b3b3b3;
      cursor: default;
    }

    button.is-pendingActive .label {
      display: none;
    }

    @keyframes demo-pending-spinner-rotate {
      0% {
        transform: rotate(-90deg);
      }

      100% {
        transform: rotate(270deg);
      }
    }

    @keyframes demo-pending-spinner-dashoffset {
      0%,
      100% {
        stroke-dashoffset: 75px;
      }

      30% {
        stroke-dashoffset: 20px;
      }
    }

    .swc-PendingSpinner {
      display: none;
      inline-size: 18px;
      block-size: 18px;
    }

    .swc-PendingSpinner--active {
      display: inline-block;
    }

    .swc-PendingSpinner-track,
    .swc-PendingSpinner-fill {
      inline-size: 18px;
      block-size: 18px;
      stroke-width: 2px;
    }

    .swc-PendingSpinner-track {
      stroke: rgb(255 255 255 / 40%);
    }

    .swc-PendingSpinner-fill {
      stroke: #fff;
      transform: rotate(-90deg);
      transform-origin: center;
      animation:
        demo-pending-spinner-rotate 1s cubic-bezier(0.6, 0.1, 0.3, 0.9) infinite,
        demo-pending-spinner-dashoffset 1s cubic-bezier(0.25, 0.1, 0.25, 1.3)
          infinite;
    }
  `;

  /** Whether the host is in a pending (busy) state. */
  @property({ type: Boolean, reflect: true })
  public pending = false;

  /** Explicit busy label; overrides the derived "<label>, busy" name. */
  @property({ type: String, attribute: 'pending-label' })
  public pendingLabel?: string;

  /** Visible button text and source of the resolved accessible name. */
  @property({ type: String })
  public label = 'Save';

  private readonly _pendingController = new PendingController(this, {
    delay: DEMO_DELAY,
    resolveAccessibleName: () => this.label || null,
  });

  protected override render(): TemplateResult {
    const active = this._pendingController.pendingActive;
    return html`
      <button
        class=${classMap({ 'is-pendingActive': active })}
        type="button"
        aria-disabled=${ifDefined(this.pending ? 'true' : undefined)}
        aria-label=${ifDefined(
          this.pending
            ? this._pendingController.getPendingAccessibleName()
            : undefined
        )}
      >
        <span class="label">${this.label}</span>
        ${renderPendingSpinner(this.pending, active)}
      </button>
    `;
  }
}
