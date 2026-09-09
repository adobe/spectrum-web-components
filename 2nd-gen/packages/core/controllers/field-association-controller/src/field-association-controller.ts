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

  private _formDisabled = false;

  constructor(
    internals: ElementInternals,
    options: FieldAssociationControllerOptions = {}
  ) {
    this._internals = internals;
    this._onDisabledChange = options.onDisabledChange;
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

  /** Whether the field is a candidate for constraint validation. */
  public get willValidate(): boolean {
    return this._internals.willValidate;
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
