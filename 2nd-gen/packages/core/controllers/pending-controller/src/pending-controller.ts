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

import {
  css,
  html,
  nothing,
  type ReactiveController,
  type ReactiveElement,
  type TemplateResult,
} from 'lit';

// ─────────────────────────
//     TYPES
// ─────────────────────────

/** Minimum interface required from any element that hosts a {@link PendingController}. */
export interface PendingControllerHost extends ReactiveElement {
  /** Whether the host is in a pending (busy) state. */
  pending: boolean;

  /**
   * Optional explicit accessible label used during the pending state. When
   * omitted, the controller derives a busy label from
   * {@link PendingControllerOptions.resolveAccessibleName}.
   */
  pendingLabel?: string;
}

/** Configuration options for {@link PendingController}. */
export interface PendingControllerOptions {
  /**
   * Milliseconds to wait after `pending` becomes true before activating the
   * pending visual, so the host does not flash to its busy appearance for
   * operations that complete quickly. Defaults to `1000`.
   */
  delay?: number;

  /**
   * CSS selector, resolved within the host's `renderRoot`, for the element
   * whose inline size should be frozen while pending (via
   * `--swc-pending-inline-size`) so the host does not resize when its label or
   * icon is hidden. Defaults to `'button'`. Pass `null` to skip the freeze.
   */
  targetSelector?: string | null;

  /**
   * Returns the host's non-busy accessible name, used to derive the default
   * busy label (`"<name>, busy"`). Keeps the controller decoupled from how the
   * host resolves its own name.
   */
  resolveAccessibleName?: () => string | null;
}

const DEFAULT_DELAY = 1000;

/**
 * Custom property the controller sets on the freeze target to lock its measured
 * inline size while pending. Consumers apply it via `inline-size: var(...)`.
 */
const INLINE_SIZE_PROPERTY = '--swc-pending-inline-size';

// ─────────────────────────────────────────────────
//     STYLES
// ─────────────────────────────────────────────────

/**
 * Structural and animation styles for the spinner rendered by
 * {@link PendingController.renderPendingState}. Add to the host's `static
 * styles` array. Colors and size are themeable via custom properties so the
 * controller carries no design-token dependency and can be reused by any
 * component:
 *
 * - `--swc-pending-spinner-size` — inline and block size of the spinner. Defaults to `1em`.
 * - `--swc-pending-spinner-track-color` — color of the static track ring. Defaults to `currentColor`.
 * - `--swc-pending-spinner-fill-color` — color of the animated fill arc. Defaults to `currentColor`.
 * - `--swc-pending-spinner-thickness` — stroke width of both rings. Defaults to `2px`.
 */
export const pendingControllerStyles = css`
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
    flex-shrink: 0;
    display: inline-block;
    inline-size: var(--swc-pending-spinner-size, 1em);
    block-size: var(--swc-pending-spinner-size, 1em);
  }

  .swc-PendingSpinner-track {
    stroke: var(--swc-pending-spinner-track-color, currentColor);
    stroke-width: var(--swc-pending-spinner-thickness, 2px);
  }

  .swc-PendingSpinner-fill {
    stroke: var(--swc-pending-spinner-fill-color, currentColor);
    stroke-width: var(--swc-pending-spinner-thickness, 2px);
    transform: rotate(-90deg);
    transform-origin: center;
    animation:
      swc-pending-spinner-rotate 1s cubic-bezier(0.6, 0.1, 0.3, 0.9) infinite,
      swc-pending-spinner-dashoffset 1s cubic-bezier(0.25, 0.1, 0.25, 1.3)
        infinite;
    will-change: transform;
  }

  @media (prefers-reduced-motion: reduce) {
    .swc-PendingSpinner-fill {
      --swc-pending-spinner-dashoffset-30: 0;
      --swc-pending-spinner-rotate-start: 0deg;
      --swc-pending-spinner-rotate-end: 360deg;

      animation-duration: 15s;
      animation-timing-function: linear, linear;
    }
  }
`;

// ─────────────────────────────────────────────────
//     CONTROLLER
// ─────────────────────────────────────────────────

/**
 * A Lit {@link ReactiveController} that manages the pending (busy) state of a
 * host element: the delayed visual activation, freezing the host's inline size
 * while busy, deriving the pending accessible name, and rendering an animated
 * spinner.
 *
 * The accessible name and `aria-disabled` are applied by the host's own
 * template (keyed off `host.pending` for an immediate response); this
 * controller exposes {@link getPendingAccessibleName} for the host to read.
 * Pair {@link renderPendingState} with {@link pendingControllerStyles}.
 *
 * @example
 * ```ts
 * class SwcButton extends LitElement implements PendingControllerHost {
 *   @property({ type: Boolean, reflect: true }) pending = false;
 *   @property({ attribute: 'pending-label' }) pendingLabel?: string;
 *
 *   static styles = [styles, pendingControllerStyles];
 *
 *   private pendingController = new PendingController(this, {
 *     resolveAccessibleName: () => this.getResolvedAccessibleName(),
 *   });
 *
 *   render() {
 *     return html`
 *       <button
 *         class=${classMap({ active: this.pendingController.pendingActive })}
 *         aria-label=${ifDefined(
 *           this.pending
 *             ? this.pendingController.getPendingAccessibleName()
 *             : undefined
 *         )}
 *       >
 *         <slot></slot>
 *         ${this.pendingController.renderPendingState()}
 *       </button>
 *     `;
 *   }
 * }
 * ```
 */
export class PendingController implements ReactiveController {
  private readonly host: PendingControllerHost;
  private readonly delay: number;
  private readonly targetSelector: string | null;
  private readonly resolveAccessibleName: () => string | null;

  private timer: ReturnType<typeof setTimeout> | null = null;

  /** Tracks the last-seen `pending` value so transitions can be detected in `hostUpdated`. */
  private wasPending = false;

  /**
   * Whether the pending visual is currently active. Becomes `true` only after
   * the configured delay so the host does not flash to its busy appearance for
   * operations that complete quickly. Read this from the host's `render` to
   * apply the busy styling.
   */
  public get pendingActive(): boolean {
    return this._pendingActive;
  }
  private _pendingActive = false;

  constructor(
    host: PendingControllerHost,
    options: PendingControllerOptions = {}
  ) {
    this.host = host;
    this.delay = options.delay ?? DEFAULT_DELAY;
    this.targetSelector =
      options.targetSelector === undefined ? 'button' : options.targetSelector;
    this.resolveAccessibleName = options.resolveAccessibleName ?? (() => null);
    host.addController(this);
  }

  // ─────────────────────────────────────────────────
  //     PUBLIC API
  // ─────────────────────────────────────────────────

  /**
   * Derives the pending-state accessible label. Prefers an explicit
   * `pendingLabel`, then the resolved non-busy name plus a ", busy" suffix,
   * then a fixed "Busy" fallback.
   */
  public getPendingAccessibleName(): string {
    if (this.host.pendingLabel) {
      return this.host.pendingLabel;
    }
    const resolvedName = this.resolveAccessibleName();
    return resolvedName ? `${resolvedName}, busy` : 'Busy';
  }

  /**
   * Renders the animated pending spinner while {@link pendingActive} is true,
   * otherwise renders nothing. Style it via {@link pendingControllerStyles}.
   */
  public renderPendingState(): TemplateResult | typeof nothing {
    if (!this._pendingActive) {
      return nothing;
    }
    return html`
      <svg
        class="swc-PendingSpinner"
        width="100%"
        height="100%"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          class="swc-PendingSpinner-track"
          cx="50%"
          cy="50%"
          r="calc(50% - 1px)"
        />
        <circle
          class="swc-PendingSpinner-fill"
          cx="50%"
          cy="50%"
          r="calc(50% - 1px)"
          pathLength="100"
          stroke-dasharray="100 200"
          stroke-dashoffset="75"
          stroke-linecap="round"
        />
      </svg>
    `;
  }

  // ─────────────────────────────────────────────────
  //     LIFECYCLE
  // ─────────────────────────────────────────────────

  public hostUpdated(): void {
    if (this.host.pending === this.wasPending) {
      return;
    }
    this.wasPending = this.host.pending;
    if (this.host.pending) {
      this.activateAfterDelay();
    } else {
      this.deactivate();
    }
  }

  public hostDisconnected(): void {
    this.clearTimer();
    this.wasPending = false;
    this._pendingActive = false;
  }

  // ─────────────────────────────────────────────────
  //     IMPLEMENTATION
  // ─────────────────────────────────────────────────

  private activateAfterDelay(): void {
    this.timer = setTimeout(() => {
      this.timer = null;
      // Guard against `pending` flipping back to false after the timer fired
      // but before this callback ran.
      if (!this.host.pending) {
        return;
      }
      this.freezeInlineSize();
      this._pendingActive = true;
      this.host.requestUpdate();
    }, this.delay);
  }

  private deactivate(): void {
    this.clearTimer();
    this.releaseInlineSize();
    if (this._pendingActive) {
      this._pendingActive = false;
      this.host.requestUpdate();
    }
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private get freezeTarget(): HTMLElement | null {
    if (!this.targetSelector) {
      return null;
    }
    return this.host.renderRoot.querySelector<HTMLElement>(this.targetSelector);
  }

  private freezeInlineSize(): void {
    const target = this.freezeTarget;
    if (target) {
      target.style.setProperty(INLINE_SIZE_PROPERTY, `${target.offsetWidth}px`);
    }
  }

  private releaseInlineSize(): void {
    this.freezeTarget?.style.removeProperty(INLINE_SIZE_PROPERTY);
  }
}
