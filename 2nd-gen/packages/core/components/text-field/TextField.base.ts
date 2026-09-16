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
  HelpTextMixin,
  LabellingMixin,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';
import { validateEnum } from '@adobe/spectrum-wc-core/utils/index.js';

import {
  TEXT_FIELD_LABEL_POSITIONS,
  TEXT_FIELD_NECESSITY_INDICATORS,
  TEXT_FIELD_TYPES,
  TEXT_FIELD_VALID_SIZES,
  type TextFieldAutocomplete,
  type TextFieldLabelPosition,
  type TextFieldNecessityIndicator,
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
 * @slot label - Visible label content, rendered as a same-root `<label for>` by `LabellingMixin`.
 * @slot prefix - Non-interactive content shown before the input inside the field (e.g. an icon, symbol, or avatar).
 * @slot description - Guidance / non-error help text, associated via `aria-describedby`.
 * @slot error-text - Error message shown when `invalid`, folded into `aria-describedby`.
 */
export abstract class TextFieldBase extends SizedMixin(
  HelpTextMixin(LabellingMixin(SpectrumElement)),
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
   * The size of the text field.
   *
   * @default m
   */
  declare public size: TextFieldSize;

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
   * How the field's necessity is marked in the visible label. `icon` shows an
   * asterisk only when `required`. `label` appends `(required)` when required and
   * `(optional)` when not required. Requires a visible label to show.
   *
   * @default icon
   */
  @property({
    type: String,
    reflect: true,
    attribute: 'necessity-indicator',
  })
  public necessityIndicator: TextFieldNecessityIndicator = 'icon';

  /**
   * Whether the field is disabled: not editable and removed from tab order.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  // Form association: `formAssociated` (static, above) and `attachInternals` stay
  // on the element; the controller wraps the rest. 
  private internals = this.attachInternals();

  private fieldAssoc = new FieldAssociationController(this.internals, {
    onDisabledChange: () => this.requestUpdate(),
  });

  // Text inputs match `:focus-visible` even on pointer click (the platform always
  // shows a ring on elements that take keyboard text), so CSS alone can't suppress
  // the ring on click. Track modality here and expose a `keyboard-focused` custom
  // state the stylesheet keys the ring off of instead.
  #pointerFocus = false;

  constructor() {
    super();
    this.addEventListener('pointerdown', () => (this.#pointerFocus = true));
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
   * The host's own `disabled` OR the cascaded form / `<fieldset disabled>` state.
   * The subclass render reads it to disable the inner control.
   */
  protected get effectiveDisabled(): boolean {
    return this.disabled || this.fieldAssoc.formDisabled;
  }

  /** Exposes the placeholder to `LabellingMixin`'s placeholder-only-name warning. */
  public override get placeholderText(): string | undefined {
    return this.placeholder || undefined;
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

  /** Restores the authored `value` attribute (unreflected, so it holds the initial value) on native form reset. */
  public formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  /** Delegates the ancestor form / fieldset disabled cascade to the controller. */
  public formDisabledCallback(disabled: boolean): void {
    this.fieldAssoc.formDisabledCallback(disabled);
  }

  // ──────────────────────
  //     TEXT SELECTION
  // ──────────────────────

  /**
   * The rendered native `<input>`. `roleElement` is typed `Element | null` on
   * the mixin, but a text field's role element is always the input, so the cast
   * gives the selection API below its `<input>`-only members.
   */
  private get inputElement(): HTMLInputElement | null {
    return this.roleElement as HTMLInputElement | null;
  }

  /** The offset to the start of the current text selection. */
  public get selectionStart(): number | null {
    return this.inputElement?.selectionStart ?? null;
  }

  public set selectionStart(value: number | null) {
    if (this.inputElement) {
      this.inputElement.selectionStart = value;
    }
  }

  /** The offset to the end of the current text selection. */
  public get selectionEnd(): number | null {
    return this.inputElement?.selectionEnd ?? null;
  }

  public set selectionEnd(value: number | null) {
    if (this.inputElement) {
      this.inputElement.selectionEnd = value;
    }
  }

  /** The direction in which the current selection was made. */
  public get selectionDirection(): 'forward' | 'backward' | 'none' | null {
    return this.inputElement?.selectionDirection ?? null;
  }

  public set selectionDirection(
    value: 'forward' | 'backward' | 'none' | null
  ) {
    if (this.inputElement) {
      this.inputElement.selectionDirection = value;
    }
  }

  /** Selects all text in the field. */
  public select(): void {
    this.inputElement?.select();
  }

  /**
   * Sets the start and end positions of the current text selection. Delegates
   * straight to the native input, including its behavior on input types that
   * don't support selection (e.g. `email`), matching a bare `<input>`.
   */
  public setSelectionRange(
    start: number | null,
    end: number | null,
    direction?: 'forward' | 'backward' | 'none'
  ): void {
    this.inputElement?.setSelectionRange(start, end, direction);
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
    super.update(changedProperties);
    // Custom state for `:host(:state(disabled))`; unlike `[disabled]` it covers
    // the cascaded `<fieldset disabled>` case, not just the host's own property.
    this.internals.states[this.effectiveDisabled ? 'add' : 'delete'](
      'disabled'
    );
    // Push the current value into the form; exclude it entirely when disabled.
    this.fieldAssoc.setValue(this.effectiveDisabled ? null : this.value);
  }
}
