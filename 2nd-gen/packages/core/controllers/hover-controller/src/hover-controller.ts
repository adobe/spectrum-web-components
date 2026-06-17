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

// ─────────────────────────
//     TYPES
// ─────────────────────────

/** Minimum interface required from any element that hosts a {@link HoverController}. */
export interface HoverControllerHost extends ReactiveElement {
  /** Warm-up duration in milliseconds before the popover opens on hover. `0` opens immediately. */
  readonly delay: number;

  /**
   * Cooldown duration in milliseconds after the pointer leaves the trigger or
   * popover before the popover closes. Independent of `delay` so that the
   * WCAG 1.4.13 pointer bridge always has enough time to cancel the close,
   * regardless of how quickly the popover opened.
   *
   * Defaults to `300` when omitted.
   */
  readonly closeDelay?: number;
  /** When `true`, the controller skips all event wiring. */
  readonly manual: boolean;
  /** When `true`, the controller skips all event wiring. */
  readonly disabled: boolean;

  /**
   * Asks the host to open. The host owns its visibility state and is the single
   * source of truth; the controller never drives the Popover API directly. Must
   * be idempotent — calling it while already open is a no-op.
   */
  requestOpen(): void;

  /**
   * Asks the host to close. Must be idempotent — calling it while already closed
   * is a no-op.
   */
  requestClose(): void;
}

/** Configuration options for {@link HoverController}. */
export interface HoverControllerOptions {
  /**
   * Per-component-type key used to namespace shared warm state on `document`.
   * Use the element tag name (e.g. `'swc-tooltip'`). Must be static; must not
   * vary per instance.
   */
  warmStateKey: string;
}

// Minimum time the pointer has to reach the popover bubble after leaving the
// trigger before the popover closes. Independent of `delay` so WCAG 1.4.13
// bridge always has enough time regardless of the open delay.
const DEFAULT_CLOSE_DELAY = 300;

/** @internal */
type WarmState = {
  isWarm: boolean;
  cooldownTimer: ReturnType<typeof setTimeout> | null;
};

// ─────────────────────────────────────────────────
//     WARM STATE HELPER
// ─────────────────────────────────────────────────

// Keyed on `document` (not `window`) so each iframe has independent state.
// Symbol.for() deduplicates across bundle chunks in the same JS realm.
function getWarmState(doc: Document, key: symbol): WarmState {
  const d = doc as Document & { [key: symbol]: WarmState | undefined };
  if (!d[key]) {
    d[key] = { isWarm: false, cooldownTimer: null };
  }
  return d[key]!;
}

// ─────────────────────────────────────────────────────────────────
//     CONTROLLER
// ─────────────────────────────────────────────────────────────────

/**
 * A Lit {@link ReactiveController} that manages hover and keyboard-focus event
 * wiring for components that use the native Popover API.
 *
 * See the Storybook stories for full usage documentation and interactive demos.
 *
 * @example
 * ```ts
 * class SwcTooltip extends LitElement implements HoverControllerHost {
 *   @property({ type: Number }) delay = 1500;
 *   @property({ type: Boolean }) manual = false;
 *   @property({ type: Boolean }) disabled = false;
 *
 *   private hoverController = new HoverController(this, { warmStateKey: 'swc-tooltip' });
 *
 *   protected override updated(changes: PropertyValues): void {
 *     super.updated(changes);
 *     if (changes.has('triggerElement')) {
 *       this.hoverController.setTarget(this.triggerElement ?? null);
 *     }
 *   }
 * }
 * ```
 */
export class HoverController implements ReactiveController {
  private readonly host: HoverControllerHost;
  private readonly warmStateKey: symbol;
  private target: HTMLElement | null = null;
  private warmupTimer: ReturnType<typeof setTimeout> | null = null;
  private isBridgeWired = false;

  /**
   * Tracks whether the `disabled`/`manual` guard is currently active. Used by
   * `hostUpdated()` to skip the rewire on every Lit update when the guard state
   * hasn't changed.
   */
  private isGuardActive = false;

  /** True while the trigger has keyboard focus; pointer-driven timers are suppressed. */
  private hasFocusOpen = false;

  /**
   * Set by `pointerdown` on the trigger and cleared asynchronously after `focusin`
   * fires. The async reset ensures the flag is still `true` when `focusin` arrives
   * synchronously later in the same click event sequence.
   */
  private hadPointerdown = false;

  private readonly boundPointerDownTrigger =
    this.handlePointerDownTrigger.bind(this);
  private readonly boundPointerEnterTrigger =
    this.handlePointerEnterTrigger.bind(this);
  private readonly boundPointerLeaveTrigger =
    this.handlePointerLeaveTrigger.bind(this);
  private readonly boundFocusin = this.handleFocusin.bind(this);
  private readonly boundFocusout = this.handleFocusout.bind(this);
  private readonly boundPointerEnterHost =
    this.handlePointerEnterHost.bind(this);
  private readonly boundPointerLeaveHost =
    this.handlePointerLeaveHost.bind(this);

  constructor(host: HoverControllerHost, options: HoverControllerOptions) {
    this.host = host;
    this.warmStateKey = Symbol.for(`swc-hover-state:${options.warmStateKey}`);
    host.addController(this);
  }

  // ─────────────────────────────────────────────────
  //     PUBLIC API
  // ─────────────────────────────────────────────────

  /**
   * Sets the element that receives pointer and focus listeners. Call this whenever
   * the resolved trigger changes (e.g. in `updated()` after a `for` attribute change).
   * Passing `null` detaches all listeners from the previous target.
   */
  public setTarget(trigger: HTMLElement | null): void {
    this.unwireTarget();
    this.clearWarmupTimer();
    this.target = trigger;
    this.wireTarget();
  }

  public hostConnected(): void {
    this.wireTarget();
  }

  public hostDisconnected(): void {
    this.unwireTarget();
    this.unwireBridge();
    this.clearWarmupTimer();
    this.hasFocusOpen = false;
    this.hadPointerdown = false;
    this.isGuardActive = false;
  }

  /** Re-evaluates `disabled` and `manual` guards whenever the host updates. */
  public hostUpdated(): void {
    const guardNowActive = this.host.disabled || this.host.manual;
    if (guardNowActive === this.isGuardActive) {
      return;
    }
    this.isGuardActive = guardNowActive;

    if (guardNowActive) {
      this.unwireTarget();
      this.clearWarmupTimer();
      this.clearCooldownTimer();
      this.hasFocusOpen = false;
      this.hadPointerdown = false;
      this.unwireBridge();
      this.callHidePopover();
    } else {
      this.wireTarget();
    }
  }

  // ─────────────────────────────────────────────────
  //     WIRING
  // ─────────────────────────────────────────────────

  private wireTarget(): void {
    if (!this.target || this.host.disabled || this.host.manual) {
      return;
    }
    this.target.addEventListener('pointerdown', this.boundPointerDownTrigger);
    this.target.addEventListener('pointerenter', this.boundPointerEnterTrigger);
    this.target.addEventListener('pointerleave', this.boundPointerLeaveTrigger);
    this.target.addEventListener('focusin', this.boundFocusin);
    this.target.addEventListener('focusout', this.boundFocusout);
  }

  private unwireTarget(): void {
    if (!this.target) {
      return;
    }
    this.target.removeEventListener(
      'pointerdown',
      this.boundPointerDownTrigger
    );
    this.target.removeEventListener(
      'pointerenter',
      this.boundPointerEnterTrigger
    );
    this.target.removeEventListener(
      'pointerleave',
      this.boundPointerLeaveTrigger
    );
    this.target.removeEventListener('focusin', this.boundFocusin);
    this.target.removeEventListener('focusout', this.boundFocusout);
  }

  private wireBridge(): void {
    if (this.isBridgeWired) {
      return;
    }
    this.isBridgeWired = true;
    this.host.addEventListener('pointerenter', this.boundPointerEnterHost);
    this.host.addEventListener('pointerleave', this.boundPointerLeaveHost);
  }

  private unwireBridge(): void {
    if (!this.isBridgeWired) {
      return;
    }
    this.isBridgeWired = false;
    this.host.removeEventListener('pointerenter', this.boundPointerEnterHost);
    this.host.removeEventListener('pointerleave', this.boundPointerLeaveHost);
  }

  // ─────────────────────────────────────────────────
  //     SHOW / HIDE
  // ─────────────────────────────────────────────────

  private showWithBridge(): void {
    // The host owns visibility state and reconciles the Popover API itself, so
    // requestOpen() is idempotent — no :popover-open guard needed here.
    this.host.requestOpen();
    this.wireBridge();
  }

  private callHidePopover(): void {
    // requestClose() is idempotent, so no :popover-open guard is needed here.
    this.host.requestClose();
    this.unwireBridge();
  }

  // ─────────────────────────────────────────────────
  //     TIMER HELPERS
  // ─────────────────────────────────────────────────

  private clearWarmupTimer(): void {
    if (this.warmupTimer !== null) {
      clearTimeout(this.warmupTimer);
      this.warmupTimer = null;
    }
  }

  private clearCooldownTimer(): void {
    const warmState = getWarmState(this.host.ownerDocument, this.warmStateKey);
    if (warmState.cooldownTimer !== null) {
      clearTimeout(warmState.cooldownTimer);
      warmState.cooldownTimer = null;
    }
  }

  private startCooldown(): void {
    const warmState = getWarmState(this.host.ownerDocument, this.warmStateKey);
    // closeDelay is independent of the open delay so the WCAG 1.4.13 bridge
    // always has enough time to cancel, even when delay=0. The bridge calls
    // clearCooldownTimer() when the pointer enters the popover bubble;
    // pointerleave (trigger) and pointerenter (host) for a single mouse
    // gesture fire synchronously in the same task, so the bridge always runs
    // before this queued callback.
    const closeDelay = this.host.closeDelay ?? DEFAULT_CLOSE_DELAY;
    warmState.cooldownTimer = setTimeout(() => {
      warmState.cooldownTimer = null;
      warmState.isWarm = false;
      this.callHidePopover();
    }, closeDelay);
  }

  // ─────────────────────────────────────────────────
  //     EVENT HANDLERS — TRIGGER ELEMENT
  // ─────────────────────────────────────────────────

  private handlePointerDownTrigger(): void {
    this.hadPointerdown = true;
    // Cleared asynchronously so the flag is still true when focusin fires
    // synchronously later in the same click event sequence.
    setTimeout(() => {
      this.hadPointerdown = false;
    }, 0);
  }

  private handlePointerEnterTrigger(): void {
    if (this.hasFocusOpen) {
      return;
    }
    const warmState = getWarmState(this.host.ownerDocument, this.warmStateKey);

    // Cancel any in-flight cooldown; the pointer is back in the hover zone.
    this.clearCooldownTimer();

    if (this.host.delay === 0 || warmState.isWarm) {
      this.showWithBridge();
    } else {
      this.warmupTimer = setTimeout(() => {
        this.warmupTimer = null;
        // Guard against the race where disabled/manual became true after the
        // timer fired but before this callback ran (clearTimeout is a no-op
        // once the timer entry has been removed from the active-timer map).
        if (this.host.disabled || this.host.manual) {
          return;
        }
        warmState.isWarm = true;
        this.showWithBridge();
      }, this.host.delay);
    }
  }

  private handlePointerLeaveTrigger(): void {
    // Always clear warmup on leave — focus may have arrived mid-warmup and
    // clearWarmupTimer() is a no-op if no timer is running.
    this.clearWarmupTimer();
    if (this.hasFocusOpen) {
      return;
    }
    this.startCooldown();
  }

  private handleFocusin(): void {
    // hadPointerdown is true when focus arrived via a pointer click; skip the
    // open to avoid the flash caused by popover="auto" light dismiss on pointerdown.
    if (this.hadPointerdown) {
      return;
    }
    this.hasFocusOpen = true;
    this.clearWarmupTimer();
    this.clearCooldownTimer();
    this.showWithBridge();
  }

  private handleFocusout(): void {
    this.hasFocusOpen = false;
    // Clear any warmup that a pointer click may have started before focus left.
    this.clearWarmupTimer();
    this.callHidePopover();
  }

  // ─────────────────────────────────────────────────
  //     EVENT HANDLERS — HOST ELEMENT (WCAG BRIDGE)
  // ─────────────────────────────────────────────────

  private handlePointerEnterHost(): void {
    if (this.hasFocusOpen) {
      return;
    }
    this.clearCooldownTimer();
  }

  private handlePointerLeaveHost(): void {
    if (this.hasFocusOpen) {
      return;
    }
    this.startCooldown();
  }
}
