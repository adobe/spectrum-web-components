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
  /** Reset target on `formResetCallback` (usually the host's `value`). Defaults to `''`. */
  defaultValue?: string;

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
 * component (textfield, checkbox, radio, combobox): form value, reset default,
 * the `<fieldset disabled>` cascade, and the validity reads. Extracted so each
 * field doesn't re-implement it.
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

  private _defaultValue: string;
  private _formDisabled = false;

  constructor(
    internals: ElementInternals,
    options: FieldAssociationControllerOptions = {}
  ) {
    this._internals = internals;
    this._defaultValue = options.defaultValue ?? '';
    this._onDisabledChange = options.onDisabledChange;
  }

  // ─────────────────────────
  //     FORM VALUE
  // ─────────────────────────

  /** Sets the form value. Pass `null` to exclude the field from `FormData`. */
  public setValue(value: FieldFormValue): void {
    this._internals.setFormValue(value);
  }

  // ─────────────────────────
  //     DEFAULT VALUE
  // ─────────────────────────

  /** The value the field restores to on `formResetCallback`. */
  public get defaultValue(): string {
    return this._defaultValue;
  }

  /** Updates the reset target; coerces `null`/`undefined` to `''`. */
  public set defaultValue(value: string) {
    this._defaultValue = value ?? '';
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
