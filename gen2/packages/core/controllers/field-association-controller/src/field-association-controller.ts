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

import type { FieldStatus } from '../../../types/index.js';

// ─────────────────────────
//     TYPES
// ─────────────────────────

/** Values `setFormValue` accepts; `null` excludes the field from `FormData`. */
export type FieldFormValue = string | File | FormData | null;

/** Configuration options for {@link FieldAssociationController}. */
export interface FieldAssociationControllerOptions {
  /**
   * Called when the cascaded `<form>`/`<fieldset disabled>` state flips, so the
   * host can re-sync (typically via `requestUpdate()`).
   */
  onDisabledChange?: (disabled: boolean) => void;

  /**
   * Returns the host's authored `field-status`. Enables the status-aware
   * members: {@link FieldAssociationController.disabled},
   * {@link FieldAssociationController.barred}, and a `willValidate` that
   * reports `false` while the field is disabled or read-only.
   */
  getStatus?: () => FieldStatus | undefined;

  /**
   * The host element. When provided, clicks are suppressed in the capture phase
   * while the field is disabled, which a reflected `disabled` attribute used to
   * do for free.
   */
  host?: HTMLElement;
}

// ─────────────────────────
//     CONTROLLER
// ─────────────────────────

/**
 * Wraps the `ElementInternals` form-participation surface shared by every field
 * component (textfield, checkbox, radio, combobox): form value, the
 * `<fieldset disabled>` cascade, and the validity reads. Extracted so each
 * field doesn't re-implement it.
 *
 * The reset target stays on the host: it is field-shaped (a string for a text
 * field, a boolean for a checkbox/radio) and read lazily from the host's own
 * attribute in `formResetCallback`, so the controller does not own it.
 *
 * A plain class, **not** a Lit `ReactiveController`, so there is nothing to
 * `addController`. The host keeps `static formAssociated = true` and its own
 * `attachInternals()` (neither can be delegated), passes that result in here, and
 * delegates its `formResetCallback` / `formDisabledCallback`. See the docs page
 * for a full host example.
 */
export class FieldAssociationController {
  private readonly _internals: ElementInternals;
  private readonly _onDisabledChange?: (disabled: boolean) => void;
  private readonly _getStatus?: () => FieldStatus | undefined;

  private _formDisabled = false;

  constructor(
    internals: ElementInternals,
    options: FieldAssociationControllerOptions = {}
  ) {
    this._internals = internals;
    this._onDisabledChange = options.onDisabledChange;
    this._getStatus = options.getStatus;
    options.host?.addEventListener(
      'click',
      (event) => {
        if (this.disabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      { capture: true }
    );
  }

  // ─────────────────────────
  //     FORM VALUE
  // ─────────────────────────

  /**
   * Sets the form value. Pass `null` to exclude the field from `FormData`.
   *
   * `state` is the value to restore on autofill / back-forward navigation when it
   * differs from the submitted `value` (e.g. a checkbox's checked-state vs its
   * submitted string). Omit it to restore `value` itself.
   */
  public setValue(value: FieldFormValue, state?: FieldFormValue): void {
    this._internals.setFormValue(value, state);
  }

  // ─────────────────────────
  //     DISABLED CASCADE
  // ─────────────────────────

  /** `true` when an ancestor `<form>`/`<fieldset disabled>` cascaded down. Excludes the host's own `disabled` (see host `effectiveDisabled`). */
  public get formDisabled(): boolean {
    return this._formDisabled;
  }

  /**
   * Effective disabled: the authored `field-status="disabled"` OR the cascaded
   * form state. Use it to disable the inner control and exclude the value.
   */
  public get disabled(): boolean {
    return this._getStatus?.() === 'disabled' || this._formDisabled;
  }

  /**
   * Barred from constraint validation: disabled, or `field-status="readonly"`.
   * A reflected `disabled` or `readonly` host attribute used to bar the field
   * for free; without one the host must apply the same rule itself, and this
   * is that rule.
   */
  public get barred(): boolean {
    return this.disabled || this._getStatus?.() === 'readonly';
  }

  /**
   * Mirrors {@link FieldAssociationController.disabled} into the `disabled`
   * custom state, the single styling hook for both the authored status and the
   * fieldset cascade. Call it from the host's `update()`.
   */
  public syncDisabledState(): void {
    this._internals.states[this.disabled ? 'add' : 'delete']('disabled');
  }

  /** Host delegates its `formDisabledCallback` here; fires `onDisabledChange` only on a change. */
  public formDisabledCallback(disabled: boolean): void {
    if (this._formDisabled === disabled) {
      return;
    }
    this._formDisabled = disabled;
    this._onDisabledChange?.(disabled);
  }

  // ─────────────────────────
  //     VALIDITY PASS-THROUGHS
  // ─────────────────────────

  /** The associated form element, or `null`. */
  public get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  /** The field's current `ValidityState`. */
  public get validity(): ValidityState {
    return this._internals.validity;
  }

  /** The localized validation message; empty when valid. */
  public get validationMessage(): string {
    return this._internals.validationMessage;
  }

  /** Whether the field is a candidate for constraint validation; `false` while {@link FieldAssociationController.barred}. */
  public get willValidate(): boolean {
    return !this.barred && this._internals.willValidate;
  }

  /** Returns whether the field is valid, firing an `invalid` event if not. */
  public checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  /** Runs constraint validation and, if invalid, shows the native error UI. */
  public reportValidity(): boolean {
    return this._internals.reportValidity();
  }
}
