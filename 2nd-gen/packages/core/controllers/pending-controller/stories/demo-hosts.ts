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

    /*
     * @todo The spinner rules below are a hand-maintained mirror of
     * swc/stylesheets/_lit-styles/pending-spinner.css: the structure, custom
     * properties, keyframes, animation timing, and reduced-motion behavior are
     * identical, with the fragment's token(...) colors substituted by this
     * demo's literals and --_swc-pending-spinner-size fixed at 18px. It is
     * duplicated because core has no token/lit-css CSS build and must not depend
     * on swc, so the shared fragment cannot be imported here. Investigate
     * enabling a CSS/token build for core so this demo (and any future
     * core-side styles) can consume the shared fragment directly instead of
     * copying it — that would also restore the token-driven static-color and
     * forced-colors treatments, which cannot be reproduced faithfully here.
     */
    @keyframes swc-pending-spinner-rotate {
      0% {
        transform: rotate(var(--swc-pending-spinner-rotate-start, -90deg));
      }

      100% {
        transform: rotate(var(--swc-pending-spinner-rotate-end, 270deg));
      }
    }

    @keyframes swc-pending-spinner-dashoffset {
      0%,
      100% {
        stroke-dashoffset: 75px;
      }

      30% {
        stroke-dashoffset: var(--swc-pending-spinner-dashoffset-30, 20px);
      }
    }

    .swc-PendingSpinner {
      /* token("track-color") / token("accent-content-color-default") → demo literals */
      --_swc-pending-spinner-track-border-color: rgb(255 255 255 / 40%);
      --_swc-pending-spinner-fill-border-color: #fff;
      --_swc-pending-spinner-thickness: 2px;

      /* Provided by the consuming component in the shared fragment. */
      --_swc-pending-spinner-size: 18px;

      display: none;
    }

    .swc-PendingSpinner--active {
      display: inline-block;
    }

    .swc-PendingSpinner-track,
    .swc-PendingSpinner-fill {
      inline-size: var(--_swc-pending-spinner-size);
      block-size: var(--_swc-pending-spinner-size);
    }

    .swc-PendingSpinner-track {
      stroke: var(--_swc-pending-spinner-track-border-color);
      stroke-width: var(--_swc-pending-spinner-thickness);
    }

    .swc-PendingSpinner-fill {
      stroke: var(--_swc-pending-spinner-fill-border-color);
      stroke-width: var(--_swc-pending-spinner-thickness);
      transform: rotate(-90deg);
      transform-origin: center;
    }

    .swc-PendingSpinner--active .swc-PendingSpinner-fill {
      animation:
        swc-pending-spinner-rotate 1s cubic-bezier(0.6, 0.1, 0.3, 0.9) infinite,
        swc-pending-spinner-dashoffset 1s cubic-bezier(0.25, 0.1, 0.25, 1.3)
          infinite;
      will-change: transform;
    }

    @media (prefers-reduced-motion: reduce) {
      .swc-PendingSpinner--active .swc-PendingSpinner-fill {
        --swc-pending-spinner-dashoffset-30: 0;
        --swc-pending-spinner-rotate-start: 0deg;
        --swc-pending-spinner-rotate-end: 360deg;

        animation-duration: 15s;
        animation-timing-function: linear, linear;
      }
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

  /**
   * When set, clicking the button starts a pending operation (focusing the
   * button via the click) and auto-clears it after 2s. Used to demonstrate that
   * focus is retained across the controller-triggered re-render.
   */
  @property({ type: Boolean, attribute: 'click-pending' })
  public clickPending = false;

  private readonly _pendingController = new PendingController(this, {
    delay: DEMO_DELAY,
    resolveAccessibleName: () => this.label || null,
  });

  private _resetTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly _onButtonClick = (): void => {
    if (this.pending) {
      return;
    }
    this.pending = true;
    this._resetTimer = setTimeout(() => {
      this._resetTimer = null;
      this.pending = false;
    }, 2000);
  };

  public override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    if (this._resetTimer !== null) {
      clearTimeout(this._resetTimer);
      this._resetTimer = null;
    }
  }

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
        @click=${this.clickPending ? this._onButtonClick : null}
      >
        <span class="label">${this.label}</span>
        ${this._pendingController.renderPendingState()}
      </button>
    `;
  }
}
