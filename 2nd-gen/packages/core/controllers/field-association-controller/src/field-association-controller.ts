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

/**
 * The values `ElementInternals.setFormValue` accepts. Passing `null` excludes
 * the field from the submitted `FormData`.
 */
export type FieldFormValue = string | File | FormData | null;

/** Configuration options for {@link FieldAssociationController}. */
export interface FieldAssociationControllerOptions {
  /**
   * The value the field restores to on `formResetCallback`, populated from the
   * host's `value` attribute. Defaults to `''`.
   */
  defaultValue?: string;

  /**
   * Called when the cascaded (owning form or ancestor `<fieldset disabled>`)
   * disabled state flips, so the host can re-sync its inner control and
   * `FormData` participation. The host typically responds with `requestUpdate()`.
   */
  onDisabledChange?: (disabled: boolean) => void;
}

// ─────────────────────────
//     CONTROLLER
// ─────────────────────────

/**
 * Encapsulates the `ElementInternals` surface shared by every form-associated
 * field component (textfield, checkbox, combobox, radio, …): setting or
 * excluding the form value, restoring a default value on reset, reacting to the
 * ancestor form/`<fieldset>` disabled cascade, and the validity pass-throughs.
 * Left unextracted, this boilerplate gets re-implemented and re-tested per
 * component.
 *
 * Unlike the other controllers in this folder, this is a plain class, **not** a
 * Lit `ReactiveController`: it wraps `ElementInternals` and has no host lifecycle
 * work, so there is nothing to register via `host.addController`. The host drives
 * it directly — calling {@link setValue} when its value changes and delegating
 * its `formResetCallback` / `formDisabledCallback` browser hooks.
 *
 * The host element retains `static formAssociated = true` and its own
 * `attachInternals()` call; those cannot be delegated to the controller. The
 * result of `attachInternals()` is passed in here.
 *
 * @example
 * ```ts
 * class SwcTextField extends LitElement {
 *   static formAssociated = true;
 *   private internals = this.attachInternals();
 *   private fieldAssoc = new FieldAssociationController(this.internals, {
 *     onDisabledChange: () => this.requestUpdate(),
 *   });
 *
 *   protected override firstUpdated(): void {
 *     this.fieldAssoc.defaultValue = this.value;
 *   }
 *
 *   protected override update(changed: PropertyValues): void {
 *     super.update(changed);
 *     const disabled = this.hasAttribute('disabled') || this.fieldAssoc.formDisabled;
 *     this.fieldAssoc.setValue(disabled ? null : this.value);
 *   }
 *
 *   formResetCallback(): void {
 *     this.value = this.fieldAssoc.defaultValue;
 *   }
 *
 *   formDisabledCallback(disabled: boolean): void {
 *     this.fieldAssoc.formDisabledCallback(disabled);
 *   }
 * }
 * ```
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

  /**
   * Sets the current form value. Pass `null` to exclude the field from the
   * submitted `FormData` (unchecked checkbox, disabled field, unselected
   * combobox).
   */
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

  public set defaultValue(value: string) {
    this._defaultValue = value ?? '';
  }

  // ─────────────────────────
  //     DISABLED CASCADE
  // ─────────────────────────

  /**
   * `true` when the owning form or an ancestor `<fieldset disabled>` has disabled
   * this field. Combine with the host's own `disabled` attribute to compute the
   * effective disabled state: `host.hasAttribute('disabled') || formDisabled`.
   */
  public get formDisabled(): boolean {
    return this._formDisabled;
  }

  /**
   * Delegate target for the host's `formDisabledCallback(disabled)` browser hook.
   * The platform invokes it whenever an ancestor `<fieldset disabled>` (or the
   * owning form) disables or re-enables the field. Records the cascaded state and
   * notifies the host via `onDisabledChange` only on an actual change.
   */
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

  /** The form the field is associated with, if any. */
  public get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  /** The field's current validity state. */
  public get validity(): ValidityState {
    return this._internals.validity;
  }

  /** The localized validation message for the field's current validity. */
  public get validationMessage(): string {
    return this._internals.validationMessage;
  }

  /** Whether the field is a candidate for constraint validation. */
  public get willValidate(): boolean {
    return this._internals.willValidate;
  }

  /** Runs constraint validation, returning whether the field is valid. */
  public checkValidity(): boolean {
    return this._internals.checkValidity();
  }

  /**
   * Runs constraint validation and, if invalid, reports the problem to the user.
   */
  public reportValidity(): boolean {
    return this._internals.reportValidity();
  }
}
