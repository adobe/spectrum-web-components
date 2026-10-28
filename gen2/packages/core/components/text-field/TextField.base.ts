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

import { FieldAssociationController } from '@adobe/spectrum-wc-core/controllers/field-association-controller.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element.js';
import {
  FieldDescriptionMixin,
  LabellingMixin,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins.js';
import { validateEnum } from '@adobe/spectrum-wc-core/utils.js';

import {
  TEXT_FIELD_LABEL_POSITIONS,
  TEXT_FIELD_NECESSITY_INDICATORS,
  TEXT_FIELD_STATUSES,
  TEXT_FIELD_TYPES,
  TEXT_FIELD_VALID_SIZES,
  type TextFieldAutocomplete,
  type TextFieldLabelPosition,
  type TextFieldNecessityIndicator,
  type TextFieldSize,
  type TextFieldStatus,
  type TextFieldType,
} from './TextField.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-text-field--docs';

/**
 * A single-line text field for entering and editing text.
 *
 * @attribute {ElementSize} size - Size of the control, label, and supporting text.
 *
 * @slot label - Visible label. Clicking it focuses the input.
 * @slot prefix - Non-interactive content before the input, such as an icon, symbol, or avatar.
 * @slot description - Help text included in the accessible description. While `field-status="invalid"`, shown in the error color unless replaced by supplied `error-text`.
 * @slot error-text - Error text shown, included in the accessible description, and used as the validation message while `field-status="invalid"`. Supply translated text when needed. Missing or whitespace-only text uses "Enter a valid value." for validation without showing a fallback inline message.
 */
export abstract class TextFieldBase extends SizedMixin(
  FieldDescriptionMixin(LabellingMixin(SpectrumElement)),
  {
    validSizes: TEXT_FIELD_VALID_SIZES,
    defaultSize: 'm',
  }
) {
  /**
   * Route host focus to the internal native `<input>` so the field is a single
   * tab stop with focus landing on the real control.
   */
  static override shadowRootOptions: ShadowRootInit = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Opts the element into native form participation. */
  static formAssociated = true;

  /**
   * Size of the control, label, and supporting text.
   *
   * @default m
   */
  declare public size: TextFieldSize;

  /**
   * Current input value, normalized using the native input type's rules.
   */
  @property({ type: String })
  public value = '';

  /**
   * Name used for the field's entry in `FormData`.
   */
  @property({ type: String, reflect: true })
  public name: string | undefined;

  /**
   * Native input type. Unsupported values fall back to `text`.
   */
  @property({ type: String, reflect: true })
  public type: TextFieldType = 'text';

  protected get inputType(): TextFieldType {
    return TEXT_FIELD_TYPES.find((type) => type === this.type) ?? 'text';
  }

  /**
   * Hint displayed when the field is empty. Does not replace a visible label.
   */
  @property({ type: String })
  public override placeholder = '';

  /**
   * Regular expression the entire nonempty value must match to pass validation.
   */
  @property({ type: String })
  public pattern?: string;

  /**
   * Suggests a virtual keyboard layout without changing validation.
   */
  @property({ type: String })
  public inputmode?: string;

  /**
   * Browser autofill hint, such as `email` or `username`.
   */
  @property({ type: String, reflect: true })
  public autocomplete?: TextFieldAutocomplete;

  /**
   * Maximum length for user input, measured in UTF-16 code units.
   */
  @property({ type: Number })
  public maxlength?: number;

  /**
   * Minimum nonempty input length, measured in UTF-16 code units.
   * Applies to user edits, not programmatically assigned values.
   */
  @property({ type: Number })
  public minlength?: number;

  /**
   * Requires a nonempty value when the field participates in validation.
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Sets one interaction or validation status. `undefined` clears authored status.
   * An eligible field with `invalid` fails validation; `valid` does not override
   * native constraints.
   */
  @property({
    attribute: 'field-status',
    reflect: true,
    converter: { fromAttribute: (value: string | null) => value ?? undefined },
  })
  public fieldStatus?: TextFieldStatus;

  /**
   * Position of the visible label relative to the control.
   *
   * @default top
   */
  @property({ type: String, reflect: true, attribute: 'label-position' })
  public labelPosition: TextFieldLabelPosition = 'top';

  /**
   * Necessity marker added to a visible label. `icon` shows an asterisk only
   * when required; `label` shows `(required)` or `(optional)`.
   *
   * @default icon
   */
  @property({
    type: String,
    reflect: true,
    attribute: 'necessity-indicator',
  })
  public necessityIndicator: TextFieldNecessityIndicator = 'icon';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  // Form association: `formAssociated` (static, above) and `attachInternals` stay
  // on the element; the controller wraps the rest.
  private internals = this.attachInternals();

  private fieldAssoc = new FieldAssociationController(this.internals, {
    onDisabledChange: () => this.requestUpdate(),
  });

  // Slot-presence tracking does not notify when only the message text changes.
  private readonly errorTextObserver = new MutationObserver(() => {
    this.syncValidity();
  });

  // Text inputs match `:focus-visible` even on pointer click (the platform always
  // shows a ring on elements that take keyboard text), so CSS alone can't suppress
  // the ring on click. Track modality here and expose a `keyboard-focused` custom
  // state the stylesheet keys the ring off of instead.
  #pointerFocus = false;

  constructor() {
    super();
    // Capture-phase so the flag is set before any inner `pointerdown` handler
    // (e.g. the control's click-to-focus, which calls `.focus()` on the input
    // and synchronously fires `focusin`) runs and reads it.
    this.addEventListener(
      'pointerdown',
      () => {
        this.#pointerFocus = true;
        this.internals.states.delete('keyboard-focused');
      },
      { capture: true }
    );
    this.addEventListener('focusin', () => {
      this.internals.states[this.#pointerFocus ? 'delete' : 'add'](
        'keyboard-focused'
      );
      this.#pointerFocus = false;
    });
    this.addEventListener('focusout', () => {
      this.#pointerFocus = false;
      this.internals.states.delete('keyboard-focused');
    });
  }

  /**
   * The authored disabled status OR the native disabled callback state.
   * The subclass render reads it to disable the inner control.
   */
  protected get effectiveDisabled(): boolean {
    return this.fieldStatus === 'disabled' || this.fieldAssoc.formDisabled;
  }

  /** Associated form, or `null` when the field is not associated with a form. */
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

  /** Whether the field participates in constraint validation. */
  public get willValidate(): boolean {
    return this.fieldAssoc.willValidate;
  }

  /** Returns whether the field passes validation. Fires `invalid` on failure. */
  public checkValidity(): boolean {
    return this.fieldAssoc.checkValidity();
  }

  /** Returns whether the field passes validation and reports failures through native validation UI. */
  public reportValidity(): boolean {
    return this.fieldAssoc.reportValidity();
  }

  /** @internal Restores the initial value and clears validation status on native form reset. */
  public formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
    if (this.fieldStatus === 'valid' || this.fieldStatus === 'invalid') {
      this.fieldStatus = undefined;
    }
  }

  /** @internal Restores string state supplied by the browser for navigation or autofill. */
  public formStateRestoreCallback(
    state: string | File | FormData | null
  ): void {
    if (typeof state === 'string') {
      this.value = state;
    }
  }

  /** @internal Delegates the ancestor form / fieldset disabled cascade to the controller. */
  public formDisabledCallback(disabled: boolean): void {
    this.fieldAssoc.formDisabledCallback(disabled);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.isComposing || event.keyCode === 229) {
      return;
    }
    // Let the event finish propagating so consumer handlers can cancel it.
    setTimeout(() => {
      const form = this.form;
      if (
        event.defaultPrevented ||
        this.effectiveDisabled ||
        !this.isConnected ||
        !form
      ) {
        return;
      }
      const root = form.getRootNode();
      const candidates = (
        root instanceof Document || root instanceof ShadowRoot ? root : form
      ).querySelectorAll<HTMLButtonElement | HTMLInputElement>('button, input');
      const submitter = Array.from(candidates).find(
        (element) =>
          element.form === form &&
          (element.type === 'submit' || element.type === 'image')
      );
      if (submitter) {
        submitter.click();
        return;
      }
      const blockingFields = Array.from(form.elements).filter(
        (element) =>
          element instanceof TextFieldBase ||
          (element instanceof HTMLInputElement &&
            TEXT_FIELD_TYPES.some((type) => type === element.type))
      );
      if (blockingFields.length === 1) {
        form.requestSubmit();
      }
    });
  }

  // ──────────────────────
  //     TEXT SELECTION
  // ──────────────────────

  /*
   * Expose native text-selection methods on the host because the internal
   * `<input>` is encapsulated by the shadow root and unavailable to consumers.
   */
  /** The role element is always the `<input>`; cast for its selection members. */
  private get inputElement(): HTMLInputElement | null {
    return this.roleElement as HTMLInputElement | null;
  }

  /** Selects all text in the field. */
  public select(): void {
    this.inputElement?.select();
  }

  /** Sets the selection's start, end, and optional direction. */
  public setSelectionRange(
    start: number | null,
    end: number | null,
    direction?: 'forward' | 'backward' | 'none'
  ): void {
    this.inputElement?.setSelectionRange(start, end, direction);
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

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('type')) {
      const input = this.inputElement ?? document.createElement('input');
      if (input.type !== this.inputType) {
        input.type = this.inputType;
      }
      if (input.value !== this.value) {
        input.value = this.value;
      }
      this.value = input.value;
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    this.syncValidity();
  }

  /** @internal */
  protected syncFormState(): void {
    this.fieldAssoc.setValue(this.effectiveDisabled ? null : this.value);
    this.syncValidity();
  }

  private syncValidity(): void {
    const input = this.inputElement;
    if (input) {
      const errorText = Array.from(
        this.querySelectorAll(':scope > [slot="error-text"]'),
        (element) => element.textContent ?? ''
      )
        .join(' ')
        .trim();
      const message =
        this.fieldStatus === 'invalid'
          ? errorText || 'Enter a valid value.'
          : '';
      input.setCustomValidity(message);
      if (input.disabled || input.readOnly) {
        // Barred inputs can retain native error flags without a validation message.
        this.internals.setValidity(
          message ? { customError: true } : {},
          message,
          input
        );
        return;
      }
      this.internals.setValidity(
        input.validity,
        message || input.validationMessage,
        input
      );
    }
  }

  protected override update(changedProperties: PropertyValues): void {
    validateEnum(this, {
      prop: 'type',
      value: this.type,
      valid: TEXT_FIELD_TYPES,
      url: DOCS_URL,
    });
    validateEnum(this, {
      prop: 'label-position',
      value: this.labelPosition,
      valid: TEXT_FIELD_LABEL_POSITIONS,
      url: DOCS_URL,
    });
    validateEnum(this, {
      prop: 'necessity-indicator',
      value: this.necessityIndicator,
      valid: TEXT_FIELD_NECESSITY_INDICATORS,
      url: DOCS_URL,
    });
    if (this.fieldStatus !== undefined) {
      validateEnum(this, {
        prop: 'field-status',
        value: this.fieldStatus,
        valid: TEXT_FIELD_STATUSES,
        url: DOCS_URL,
      });
    }
    if (changedProperties.has('fieldStatus')) {
      this.toggleAttribute('disabled', this.fieldStatus === 'disabled');
      this.toggleAttribute('readonly', this.fieldStatus === 'readonly');
    }
    super.update(changedProperties);
    // Push the current value into the form; exclude it entirely when disabled.
    this.fieldAssoc.setValue(this.effectiveDisabled ? null : this.value);
  }
}
