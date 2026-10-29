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
import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { FieldAssociationController } from '@adobe/spectrum-wc-core/controllers/field-association-controller/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  FieldDescriptionMixin,
  LabellingMixin,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';
import { validateEnum } from '@adobe/spectrum-wc-core/utils/index.js';

import {
  CHECKBOX_STATUSES,
  CHECKBOX_VALID_SIZES,
  type CheckboxSize,
  type CheckboxStatus,
} from './Checkbox.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-checkbox--docs';

/**
 * A checkbox for selecting or marking an item, or for giving consent.
 *
 * @attribute {ElementSize} size - Size of the box, label, and supporting text.
 *
 * @slot label - Visible label. Clicking it toggles the checkbox.
 * @slot description - Help text included in the accessible description. While `field-status="invalid"`, replaced by supplied `error-text`.
 * @slot error-text - Error text shown, included in the accessible description, and used as the validation message while `field-status="invalid"`. Missing or whitespace-only text uses "Enter a valid value." for validation without showing a fallback inline message.
 */
export abstract class CheckboxBase extends SizedMixin(
  FieldDescriptionMixin(LabellingMixin(SpectrumElement)),
  {
    validSizes: CHECKBOX_VALID_SIZES,
    defaultSize: 'm',
  }
) {
  /** Opts the element into native form participation. */
  static formAssociated = true;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Size of the box, label, and supporting text.
   *
   * @default m
   */
  declare public size: CheckboxSize;

  /**
   * Whether the checkbox is checked. The `checked` attribute sets the default
   * state, which form reset restores. Once the user or a script changes
   * `checked`, the attribute no longer changes it until the next reset.
   */
  @property({ type: Boolean })
  public get checked(): boolean {
    return this._checked;
  }

  public set checked(value: boolean) {
    if (!this.#applyingCheckedAttribute) {
      this.#checkedDirty = true;
    }
    if (value === this._checked) {
      return;
    }
    const oldValue = this._checked;
    this._checked = value;
    this.requestUpdate('checked', oldValue);
  }

  private _checked = false;

  /**
   * Shows the mixed state, for a checkbox that summarizes a partially selected
   * set. Does not change `checked` or the form value. The next user activation
   * clears it.
   */
  @property({ type: Boolean, reflect: true })
  public indeterminate = false;

  /**
   * Sets one interaction or validation status. `undefined` clears authored status.
   * `disabled` disables the checkbox; `readonly` keeps it focusable but blocks
   * toggling; `invalid` fails validation and shows `error-text`.
   */
  @property({
    attribute: 'field-status',
    reflect: true,
    converter: { fromAttribute: (value: string | null) => value ?? undefined },
  })
  public fieldStatus?: CheckboxStatus;

  /**
   * Requires the checkbox to be checked when it participates in validation.
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Uses the accent color for the checked and indeterminate fill.
   */
  @property({ type: Boolean, reflect: true })
  public emphasized = false;

  /**
   * Name used for the checkbox's entry in `FormData`.
   */
  @property({ type: String, reflect: true })
  public name: string | undefined;

  /**
   * Value submitted under `name` while the checkbox is checked.
   *
   * @default on
   */
  @property({ type: String })
  public value = 'on';

  /** Associated form, or `null` when the checkbox is not associated with a form. */
  public get form(): HTMLFormElement | null {
    return this.fieldAssoc.form;
  }

  /** Current native and application-controlled constraint-validation flags. */
  public get validity(): ValidityState {
    return this.fieldAssoc.validity;
  }

  /** Validation message, or `''` when valid or excluded from validation. */
  public get validationMessage(): string {
    return this.fieldAssoc.validationMessage;
  }

  /** Whether the checkbox participates in constraint validation. */
  public get willValidate(): boolean {
    return this.fieldAssoc.willValidate;
  }

  /** Returns whether the checkbox passes validation. Fires `invalid` on failure. */
  public checkValidity(): boolean {
    return this.fieldAssoc.checkValidity();
  }

  /** Returns whether the checkbox passes validation and reports failures through native validation UI. */
  public reportValidity(): boolean {
    return this.fieldAssoc.reportValidity();
  }

  /** Toggles the checkbox as a user click does. Does nothing while disabled. */
  public override click(): void {
    if (this.effectiveDisabled) {
      return;
    }
    this.inputElement?.click();
  }

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  // Form association: `formAssociated` (static, above) and `attachInternals` stay
  // on the element; the controller wraps the rest.
  private internals = this.attachInternals();

  private fieldAssoc = new FieldAssociationController(this.internals, {
    onDisabledChange: () => this.requestUpdate(),
    getStatus: () => this.fieldStatus,
    host: this,
  });

  // Slot-presence tracking does not notify when only the message text changes.
  private readonly errorTextObserver = new MutationObserver(() => {
    this.syncValidity();
  });

  // Set once the user or a script changes `checked`, after which the `checked`
  // attribute is only the reset default, as on a native checkbox.
  #checkedDirty = false;

  #applyingCheckedAttribute = false;

  constructor() {
    super();
    // A native checkbox ignores `readonly`, so cancel the click to undo the
    // provisional toggle. Canceling also suppresses `input` and `change`, and
    // covers label clicks and Space, which both click the input.
    this.addEventListener(
      'click',
      (event) => {
        if (
          this.fieldStatus === 'readonly' &&
          event.composedPath()[0] === this.inputElement
        ) {
          event.preventDefault();
        }
      },
      { capture: true }
    );
  }

  /**
   * The authored disabled status OR the native disabled callback state.
   * The subclass render reads it to disable the inner control.
   */
  protected get effectiveDisabled(): boolean {
    return this.fieldAssoc.disabled;
  }

  /** The role element is always the native checkbox `<input>`. */
  private get inputElement(): HTMLInputElement | null {
    return this.roleElement as HTMLInputElement | null;
  }

  /**
   * @internal
   *
   * Takes the inner input's state after a user toggle. The subclass binds it to
   * the input's `input` event, which fires before `change`, so `checked` is
   * current for both.
   */
  protected handleInput(): void {
    const input = this.inputElement;
    if (!input) {
      return;
    }
    this.indeterminate = false;
    this.checked = input.checked;
    // Sync now, not on the next update, so `input` and `change` listeners read
    // the current form value and validity.
    this.syncFormValue();
    this.syncValidity();
  }

  /** @internal Applies the `checked` attribute only until `checked` changes. */
  public override attributeChangedCallback(
    name: string,
    oldValue: string | null,
    value: string | null
  ): void {
    if (name !== 'checked') {
      super.attributeChangedCallback(name, oldValue, value);
      return;
    }
    if (this.#checkedDirty) {
      return;
    }
    this.#applyingCheckedAttribute = true;
    try {
      super.attributeChangedCallback(name, oldValue, value);
    } finally {
      this.#applyingCheckedAttribute = false;
    }
  }

  /** @internal Restores the default checked state and clears an invalid status on native form reset. */
  public formResetCallback(): void {
    this.#checkedDirty = false;
    this.#applyingCheckedAttribute = true;
    this.checked = this.hasAttribute('checked');
    this.#applyingCheckedAttribute = false;
    if (this.fieldStatus === 'invalid') {
      this.fieldStatus = undefined;
    }
  }

  /** @internal Restores the checked state supplied by the browser for navigation or autofill. */
  public formStateRestoreCallback(
    state: string | File | FormData | null
  ): void {
    if (state === 'true' || state === 'false') {
      this.checked = state === 'true';
    }
  }

  /** @internal Delegates the ancestor form / fieldset disabled cascade to the controller. */
  public formDisabledCallback(disabled: boolean): void {
    this.fieldAssoc.formDisabledCallback(disabled);
  }

  /** @internal */
  public override connectedCallback(): void {
    super.connectedCallback();
    this.errorTextObserver.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['slot'],
    });
    this.syncValidity();
  }

  /** @internal */
  public override disconnectedCallback(): void {
    this.errorTextObserver.disconnect();
    super.disconnectedCallback();
  }

  protected override update(changedProperties: PropertyValues): void {
    if (this.fieldStatus !== undefined) {
      validateEnum(this, {
        prop: 'field-status',
        value: this.fieldStatus,
        valid: CHECKBOX_STATUSES,
        url: DOCS_URL,
      });
    }
    this.fieldAssoc.syncDisabledState();
    super.update(changedProperties);
    this.syncFormValue();
  }

  /** Submits `value` only while checked and enabled; restores by checked state. */
  private syncFormValue(): void {
    this.fieldAssoc.setValue(
      this.effectiveDisabled || !this.checked ? null : this.value,
      String(this.checked)
    );
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    this.syncValidity();
  }

  /**
   * Sets host validity, anchored to the inner input. While barred (disabled or
   * read-only), `valueMissing` is dropped and `customError` stays for an
   * invalid status, as in `swc-text-field` and `swc-radio-group`.
   */
  private syncValidity(): void {
    const input = this.inputElement;
    if (!input) {
      return;
    }
    const customError = this.fieldStatus === 'invalid';
    const valueMissing =
      !this.fieldAssoc.barred && this.required && !this.checked;
    if (!customError && !valueMissing) {
      this.internals.setValidity({});
      return;
    }
    const message = customError
      ? this.errorTextContent || 'Enter a valid value.'
      : input.validationMessage || 'Check this box to continue.';
    this.internals.setValidity({ customError, valueMissing }, message, input);
  }

  /** Plain text of the slotted `error-text`, used as the validation message. */
  private get errorTextContent(): string {
    return Array.from(
      this.querySelectorAll(':scope > [slot="error-text"]'),
      (element) => element.textContent ?? ''
    )
      .join(' ')
      .trim();
  }
}
