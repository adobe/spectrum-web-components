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

import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * Options for {@link TriggerPressGuardController.attach}.
 */
export interface TriggerPressGuardControllerOptions {
  /**
   * Called on a trigger click that is not consumed as a same-gesture reopen
   * guard (see {@link TriggerPressGuardController} for when a click is
   * consumed instead). Typically flips the host's own `open` property.
   */
  onToggle: () => void;
}

/**
 * **TriggerPressGuardController** — click-to-toggle wiring for a trigger that
 * opens a native light-dismissible surface (`popover="auto"`, a non-modal
 * `<dialog>`, or anything else the platform can close on its own), without
 * the surface reopening on the same click that was meant to close it.
 *
 * ### The bug this prevents
 *
 * A naive click-to-toggle handler (`trigger.onclick = () => (open = !open)`)
 * looks correct, but breaks the moment the surface can close itself: pressing
 * the trigger again while the surface is open is, from the surface's own
 * perspective, a press *outside* it. The platform's light-dismiss closes the
 * surface **before** the trailing `click` event fires on the trigger. By the
 * time that `click` handler runs, `open` already reads `false` (synced down
 * by the dismissal), so `!open` flips it back to `true` — the surface
 * silently reopens on the very click that should have closed it.
 *
 * ### How it's fixed
 *
 * A capturing `pointerdown`/`touchstart` listener on the trigger opens a
 * short "gesture window" before the platform gets a chance to light-dismiss.
 * The consumer calls {@link TriggerPressGuardController.noteNativeDismiss}
 * from its own native-close handler (for example a `popover` element's
 * `beforetoggle` reaction) whenever it observes a close that was **not**
 * driven by its own `open` setter. If that close lands inside the gesture
 * window, the controller remembers it, and the trailing `click` — read by
 * this controller's own listener — is consumed instead of calling
 * {@link TriggerPressGuardControllerOptions.onToggle}. A close observed
 * outside the gesture window (Escape, an outside click elsewhere, a
 * programmatic close) is not affected.
 *
 * This is a JS-only fix because a custom element's shadow-internal surface
 * cannot be associated with an external trigger via the native
 * `popovertarget` attribute (that attribute cannot reach across shadow
 * boundaries), so the platform has no way to know the trigger and the
 * surface belong together.
 *
 * ### Usage
 *
 * Construct once per host, then call {@link TriggerPressGuardController.attach}
 * every time the resolved trigger element changes (attaching the same
 * element again is a no-op for the listeners, but still updates the
 * {@link TriggerPressGuardControllerOptions.onToggle} callback). Call
 * {@link TriggerPressGuardController.noteNativeDismiss} from the surface's own
 * native-close reaction, guarded by whatever the host already uses to tell a
 * genuine native dismissal apart from its own programmatic close (typically:
 * the close reaction fires while the host's `open` property is still `true`).
 *
 * @example
 * ```typescript
 * class MyToggle extends LitElement {
 *   @property({ type: Boolean, reflect: true }) open = false;
 *
 *   private readonly pressGuard = new TriggerPressGuardController(this);
 *
 *   private wireTrigger(trigger: HTMLElement | null): void {
 *     this.pressGuard.attach(trigger, {
 *       onToggle: () => (this.open = !this.open),
 *     });
 *   }
 *
 *   // Bound to the surface's `beforetoggle` in render().
 *   private onBeforeToggle = (event: ToggleEvent): void => {
 *     if (event.newState === 'open') {
 *       return;
 *     }
 *     if (this.open) {
 *       // Not already closed via our own setter, so this is a genuine
 *       // native dismissal (Escape, outside click, ...).
 *       this.pressGuard.noteNativeDismiss();
 *     }
 *     this.open = false;
 *   };
 * }
 * ```
 */
export class TriggerPressGuardController implements ReactiveController {
  /** The element currently carrying the press/click listeners. */
  private trigger: HTMLElement | null = null;

  private options: TriggerPressGuardControllerOptions | null = null;

  /**
   * True between a trigger press start (`pointerdown`/`touchstart`) and its
   * `click`, so a native dismissal observed inside that window is attributed
   * to the press.
   */
  private pointerActive = false;

  /** Cancels the pending press-end listeners armed in {@link onPressStart}. */
  private pressEndAbort: AbortController | null = null;

  /**
   * Set by {@link noteNativeDismiss} when a native dismissal is observed
   * while {@link pointerActive}, so the trailing `click` of that same
   * gesture is read as the close rather than a reopen.
   */
  private dismissedByPress = false;

  /**
   * Registers this controller on `host` via `addController`.
   *
   * @param host - Reactive element whose trigger this controller wires.
   */
  constructor(host: ReactiveControllerHost) {
    host.addController(this);
  }

  /**
   * Wires (or rewires) the click-to-toggle and press-tracking listeners.
   *
   * A no-op for the listeners themselves when `trigger` is the same element
   * already attached — safe to call on every re-resolution of the trigger
   * (for example from a Lit `updated()` reacting to `for`/`triggerElement`
   * changes) without needing to compare against the previous element
   * yourself. `options` is always updated, even when `trigger` is unchanged.
   *
   * @param trigger - Element to wire, or `null` to only detach.
   * @param options - Callback invoked on an un-consumed click.
   */
  public attach(
    trigger: HTMLElement | null,
    options: TriggerPressGuardControllerOptions
  ): void {
    this.options = options;
    if (trigger === this.trigger) {
      return;
    }
    this.detach();
    this.trigger = trigger;
    if (trigger) {
      trigger.addEventListener('pointerdown', this.onPressStart, {
        capture: true,
      });
      trigger.addEventListener('touchstart', this.onPressStart, {
        capture: true,
      });
      trigger.addEventListener('click', this.onClick);
    }
  }

  /**
   * Removes the currently-wired listeners (if any) and resets gesture state.
   * Safe to call multiple times. Also called automatically by
   * {@link hostDisconnected}.
   */
  public detach(): void {
    this.trigger?.removeEventListener('pointerdown', this.onPressStart, {
      capture: true,
    });
    this.trigger?.removeEventListener('touchstart', this.onPressStart, {
      capture: true,
    });
    this.trigger?.removeEventListener('click', this.onClick);
    this.trigger = null;
    this.pressEndAbort?.abort();
    this.pressEndAbort = null;
    this.pointerActive = false;
    this.dismissedByPress = false;
  }

  /**
   * Call from the surface's own native-close reaction when the close was
   * **not** driven by the host's own `open` setter (a genuine native
   * dismissal: Escape, an outside click, or the platform closing it for any
   * other reason). No-op unless a press on the attached trigger is currently
   * in flight; that gesture window is the only time a dismissal needs to be
   * correlated with the trailing click.
   */
  public noteNativeDismiss(): void {
    if (this.pointerActive) {
      this.dismissedByPress = true;
    }
  }

  /**
   * Lit `ReactiveController` hook: tears down listeners when the host
   * disconnects.
   */
  public hostDisconnected(): void {
    this.detach();
  }

  // ─────────────────────────
  //     IMPLEMENTATION
  // ─────────────────────────

  // Capture phase, before a native light-dismiss (which runs on the same
  // press) gets a chance to close the surface first.
  private readonly onPressStart = (): void => {
    this.pointerActive = true;
    // A touch gesture fires both `pointerdown` and `touchstart` on the same
    // trigger, so this runs twice per press. Without aborting the previous
    // controller first, the second `addEventListener` below is a no-op (the
    // DOM dedupes on type/listener/capture, ignoring the new `signal`), so
    // `pressEndAbort` would end up pointing at a controller with nothing
    // attached to it while the real listeners stay tied to the first one.
    this.pressEndAbort?.abort();
    // Catches a press that ends without a click (drag off the trigger, or a
    // cancelled gesture), which would otherwise leave the flag stuck true.
    this.pressEndAbort = new AbortController();
    const { signal } = this.pressEndAbort;
    document.addEventListener('pointerup', this.onPressEnd, {
      capture: true,
      once: true,
      signal,
    });
    document.addEventListener('pointercancel', this.onPressEnd, {
      capture: true,
      once: true,
      signal,
    });
  };

  private readonly onPressEnd = (event: PointerEvent): void => {
    this.pressEndAbort?.abort();
    // A same-target pointerup still gets its own click, which reads and
    // clears `dismissedByPress` itself; clearing it here too would race that
    // read. Any other press end (pointercancel, or a pointerup that lands off
    // the trigger) means no click is coming for this gesture, so both flags
    // are cleared here instead — otherwise a dismissal noted during a press
    // that never resolves to a click would incorrectly consume the next,
    // unrelated click on the trigger.
    if (
      event.type === 'pointerup' &&
      event.composedPath().includes(this.trigger as EventTarget)
    ) {
      return;
    }
    this.pointerActive = false;
    this.dismissedByPress = false;
  };

  // If a native dismissal already consumed this gesture (recorded via
  // `noteNativeDismiss`), consume this click so it does not toggle back
  // open; otherwise call the consumer's own toggle.
  private readonly onClick = (): void => {
    const dismissedByThisGesture = this.dismissedByPress;
    this.pointerActive = false;
    this.dismissedByPress = false;
    if (dismissedByThisGesture) {
      return;
    }
    this.options?.onToggle();
  };
}
