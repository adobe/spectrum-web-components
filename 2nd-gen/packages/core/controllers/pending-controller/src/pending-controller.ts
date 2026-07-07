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

import {
  type PendingSpinnerResult,
  renderPendingSpinner,
} from '../../../directives/pending-spinner/index.js';

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

// ─────────────────────────
//     CONTROLLER
// ─────────────────────────

/**
 * A Lit {@link ReactiveController} that manages the pending (busy) *state* of a
 * host element: the delayed visual activation, freezing the host's inline size
 * while busy, and deriving the pending accessible name. Rendering is handled
 * separately by the `renderPendingSpinner` directive
 * (`@spectrum-web-components/core/directives/pending-spinner`); wiring (the
 * `pending` / `pending-label` properties and click suppression) is handled by
 * `PendingMixin` (`@spectrum-web-components/core/mixins`).
 *
 * The accessible name and `aria-disabled` are applied by the host's own
 * template, keyed off `host.pending` for an immediate (non-delayed) response;
 * this controller exposes {@link getPendingAccessibleName} for the host to read.
 *
 * @example
 * ```ts
 * const pendingController = new PendingController(this, {
 *   resolveAccessibleName: () => this.textContent?.trim() || null,
 * });
 * // in render(): class=${classMap({ active: pendingController.pendingActive })}
 * ```
 */
export class PendingController implements ReactiveController {
  private readonly _host: PendingControllerHost;
  private readonly _delay: number;
  private readonly _targetSelector: string | null;
  private readonly _resolveAccessibleName: () => string | null;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  /** Tracks the last-seen `pending` value so transitions can be detected in `hostUpdate`. */
  private _wasPending = false;

  /**
   * Whether the pending visual is currently active. Becomes `true` only after
   * the configured delay so the host does not flash to its busy appearance for
   * operations that complete quickly. Read this from the host's `render`.
   */
  public get pendingActive(): boolean {
    return this._pendingActive;
  }
  private _pendingActive = false;

  constructor(
    host: PendingControllerHost,
    options: PendingControllerOptions = {}
  ) {
    this._host = host;
    this._delay = options.delay ?? DEFAULT_DELAY;
    this._targetSelector =
      options.targetSelector === undefined ? 'button' : options.targetSelector;
    this._resolveAccessibleName = options.resolveAccessibleName ?? (() => null);
    host.addController(this);
  }

  // ─────────────────────────
  //     PUBLIC API
  // ─────────────────────────

  /**
   * Derives the pending-state accessible label. Prefers an explicit
   * `pendingLabel`, then the resolved non-busy name plus a ", busy" suffix,
   * then a fixed "Busy" fallback.
   */
  public getPendingAccessibleName(): string {
    if (this._host.pendingLabel) {
      return this._host.pendingLabel;
    }
    const resolvedName = this._resolveAccessibleName();
    return resolvedName ? `${resolvedName}, busy` : 'Busy';
  }

  /**
   * Renders the pending spinner for the controller's current state via the
   * `renderPendingSpinner` directive. Exposed here so a host gets the indicator
   * straight from the controller, without importing the directive separately.
   * Returns `nothing` while the host is not pending.
   */
  public renderPendingState(): PendingSpinnerResult {
    return renderPendingSpinner(this._host.pending, this._pendingActive);
  }

  // ─────────────────────────
  //     LIFECYCLE
  // ─────────────────────────

  public hostConnected(): void {
    // Lit does not schedule an update on reconnect, so `hostUpdate` would not
    // restart the delay timer for an element that reconnects while still
    // pending. Re-arm it here. Setting `_wasPending` first prevents a later
    // `hostUpdate` from starting a second timer.
    if (this._host.pending && !this._wasPending) {
      this._wasPending = true;
      this._activateAfterDelay();
    }
  }

  public hostUpdate(): void {
    if (this._host.pending === this._wasPending) {
      return;
    }
    this._wasPending = this._host.pending;
    if (this._host.pending) {
      this._activateAfterDelay();
    } else {
      this._deactivate();
    }
  }

  public hostDisconnected(): void {
    this._clearTimer();
    this._wasPending = false;
    this._pendingActive = false;
  }

  // ─────────────────────────
  //     IMPLEMENTATION
  // ─────────────────────────

  private _activateAfterDelay(): void {
    this._timer = setTimeout(() => {
      this._timer = null;
      // Guard against `pending` flipping back to false after the timer fired
      // but before this callback ran.
      if (!this._host.pending) {
        return;
      }
      this._freezeInlineSize();
      this._pendingActive = true;
      this._host.requestUpdate();
    }, this._delay);
  }

  private _deactivate(): void {
    this._clearTimer();
    this._releaseInlineSize();
    if (this._pendingActive) {
      this._pendingActive = false;
      this._host.requestUpdate();
    }
  }

  private _clearTimer(): void {
    if (this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  private get _freezeTarget(): HTMLElement | null {
    if (!this._targetSelector) {
      return null;
    }
    return this._host.renderRoot.querySelector<HTMLElement>(
      this._targetSelector
    );
  }

  private _freezeInlineSize(): void {
    const target = this._freezeTarget;
    if (target) {
      target.style.setProperty(INLINE_SIZE_PROPERTY, `${target.offsetWidth}px`);
    }
  }

  private _releaseInlineSize(): void {
    this._freezeTarget?.style.removeProperty(INLINE_SIZE_PROPERTY);
  }
}
