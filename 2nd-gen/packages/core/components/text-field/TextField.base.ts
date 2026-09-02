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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  HelpTextMixin,
  LabellingMixin,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';
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
export abstract class TextFieldBase extends SizedMixin(
  LabellingMixin(HelpTextMixin(SpectrumElement)),
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
   * Whether the field is disabled: not editable and removed from tab order.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  // @todo (SWC-2467): wire the FieldAssociationController (formAssociated,
  // attachInternals, setFormValue, formResetCallback, formDisabledCallback) plus
  // its checkValidity()/reportValidity()/validity pass-throughs.

  // @todo (Phase 5): setSelectionRange() / select() delegate to the rendered
  // native <input>, so they land with the render implementation.

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
  }
}
