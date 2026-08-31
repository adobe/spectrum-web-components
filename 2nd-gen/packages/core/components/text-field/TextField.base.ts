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

import { FieldAssociationController } from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import { validateEnum } from '@adobe/spectrum-wc-core/utils/index.js';

import {
  TEXT_FIELD_LABEL_POSITIONS,
  TEXT_FIELD_TYPES,
  TEXT_FIELD_VALID_SIZES,
  type TextFieldAutocomplete,
  type TextFieldLabelPosition,
  type TextFieldSize,
  type TextFieldType,
} from './TextField.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-text-field--docs';

/**
 * A single-line text field for entering and editing text.
 *
 * @attribute {ElementSize} size - The size of the text field.
 *
 * @slot label - Visible label content, rendered in-shadow as a real `<label for>`.
 * @slot description - Guidance / non-error help text, associated via `aria-describedby`.
 * @slot error-text - Error message shown when `invalid`, targeted by `aria-errormessage`.
 */
export abstract class TextFieldBase extends SizedMixin(SpectrumElement, {
  validSizes: TEXT_FIELD_VALID_SIZES,
  defaultSize: 'm',
}) {
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
   * The size of the text field.
   *
   * @default m
   */
  declare public size: TextFieldSize;

  /**
   * Accessible name for the input, applied as `aria-label`. Use when there is no
   * visible label slotted.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /**
   * Element IDs, from the light DOM, that provide the field's accessible name.
   * Takes precedence over `accessibleLabel` and a slotted label.
   *
   * @todo (SWC-2466): the `LabellingController` resolves these IDREFs to the
   * cross-root `ariaLabelledByElements` property; raw `aria-labelledby` is not
   * exposed on the host.
   */
  @property({ attribute: 'accessible-labelledby' })
  public accessibleLabelledby?: string;

  /**
   * Element IDs, from the light DOM, that describe the field.
   *
   * @todo (SWC-2466): the `LabellingController` resolves these IDREFs to the
   * cross-root `ariaDescribedByElements` property; raw `aria-describedby` is not
   * exposed on the host.
   */
  @property({ attribute: 'accessible-describedby' })
  public accessibleDescribedby?: string;

  /**
   * The value of the input.
   */
  @property({ type: String })
  public value = '';

  /**
   * The form control name submitted with the field's value.
   */
  @property({ type: String, reflect: true })
  public name: string | undefined;

  /**
   * The type of input to render.
   */
  @property({ type: String, reflect: true })
  public type: TextFieldType = 'text';

  /**
   * Placeholder text shown when the field is empty. Never used as the accessible name.
   */
  @property({ type: String })
  public placeholder = '';

  /**
   * A regular expression the value is checked against during constraint validation.
   */
  @property({ type: String })
  public pattern?: string;

  /**
   * Hint for the virtual keyboard to display.
   */
  @property({ type: String })
  public inputmode?: string;

  /**
   * Hint for the browser's autofill feature.
   */
  @property({ type: String, reflect: true })
  public autocomplete?: TextFieldAutocomplete;

  /**
   * The maximum number of characters the value may contain.
   */
  @property({ type: Number })
  public maxlength?: number;

  /**
   * The minimum number of characters the value may contain.
   */
  @property({ type: Number })
  public minlength?: number;

  /**
   * Whether the field is focusable but not editable. Distinct from `disabled`.
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Whether the field must have a value for the form to submit.
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Whether the field is in an invalid state.
   */
  @property({ type: Boolean, reflect: true })
  public invalid = false;

  /**
   * Whether the field is in a valid state. The value lets consumers react to a
   * valid state; the visual checkmark is deferred.
   */
  @property({ type: Boolean, reflect: true })
  public valid = false;

  /**
   * Position of the visible label relative to the input.
   *
   * @default top
   */
  @property({ type: String, reflect: true, attribute: 'label-position' })
  public labelPosition: TextFieldLabelPosition = 'top';

  /**
   * Whether the field is disabled: not editable and removed from tab order.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  // @todo (SWC-2466): resolve the accessible-labelledby / accessible-describedby
  // IDREF stubs to cross-root element references, and add the "unlabeled field"
  // dev-warning, via the LabellingController.

  // Form association. `formAssociated` (static, above) and `attachInternals`
  // stay on the element; the controller wraps the ElementInternals surface.
  // Populating validity from constraints (required/pattern/…) lands with the
  // labelling and render work.
  private internals = this.attachInternals();

  private fieldAssoc = new FieldAssociationController(this.internals, {
    onDisabledChange: () => this.requestUpdate(),
  });

  /**
   * Effective disabled state: the host's own `disabled` attribute OR the
   * cascaded form / `<fieldset disabled>` state. Never the attribute alone.
   * Internal; the subclass render reads it to disable the inner control.
   */
  protected get effectiveDisabled(): boolean {
    return this.disabled || this.fieldAssoc.formDisabled;
  }

  /** The form the field participates in, or `null`. */
  public get form(): HTMLFormElement | null {
    return this.fieldAssoc.form;
  }

  /** The field's constraint-validation state. */
  public get validity(): ValidityState {
    return this.fieldAssoc.validity;
  }

  /** The localized validation message. */
  public get validationMessage(): string {
    return this.fieldAssoc.validationMessage;
  }

  /** Whether the field is a candidate for constraint validation. */
  public get willValidate(): boolean {
    return this.fieldAssoc.willValidate;
  }

  /** Runs constraint validation; returns whether the field is valid. */
  public checkValidity(): boolean {
    return this.fieldAssoc.checkValidity();
  }

  /** Runs constraint validation and reports any problem to the user. */
  public reportValidity(): boolean {
    return this.fieldAssoc.reportValidity();
  }

  /** Restores the value to the initial `value` attribute on a native form reset. */
  public formResetCallback(): void {
    this.value = this.fieldAssoc.defaultValue;
  }

  /** Delegates the ancestor form / fieldset disabled cascade to the controller. */
  public formDisabledCallback(disabled: boolean): void {
    this.fieldAssoc.formDisabledCallback(disabled);
  }

  // @todo (Phase 5): setSelectionRange() / select() delegate to the rendered
  // native <input>, so they land with the render implementation.

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    // The reset target is the initial `value` attribute.
    this.fieldAssoc.defaultValue = this.value;
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
    super.update(changedProperties);
    // Push the current value into the form; exclude it entirely when disabled.
    this.fieldAssoc.setValue(this.effectiveDisabled ? null : this.value);
  }
}
