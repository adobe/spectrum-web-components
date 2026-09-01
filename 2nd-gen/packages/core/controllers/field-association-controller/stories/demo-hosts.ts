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

import {
  css,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { FieldAssociationController, type FieldFormValue } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-field-text': DemoFieldText;
    'demo-field-radio': DemoFieldRadio;
    'demo-field-combobox': DemoFieldCombobox;
    'demo-field-bench': DemoFieldBench;
  }
}

// ─────────────────────────────────────────────
//     BASE (shared logic, not a custom element)
// ─────────────────────────────────────────────

/**
 * @internal
 *
 * Shared base for the Storybook-only form-field harnesses: intentionally
 * unstyled elements that exercise {@link FieldAssociationController} in isolation,
 * so a regression triages as a controller bug rather than inside a full `swc-*`
 * component. They double as the controller's living documentation.
 *
 * It carries the host boilerplate the controller can't own (`formAssociated`,
 * `attachInternals()`, the form callbacks). Each subclass supplies its inner
 * control and its `computeFormValue` mapping (`null` excludes it from `FormData`).
 */
export abstract class DemoFieldHostBase extends LitElement {
  static formAssociated = true;

  /** The form control name the value is submitted under. */
  @property({ type: String, reflect: true })
  public name?: string;

  /** The field's current value. */
  @property({ type: String })
  public value = '';

  /** Whether the field is disabled via its own attribute. */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /** Accessible name applied to the inner control as `aria-label`. */
  @property({ type: String })
  public label = '';

  /** Whether the field must have a value; drives the inner control's validity. */
  @property({ type: Boolean })
  public required = false;

  // Element-owned; passed into the controller, never delegated.
  protected internals = this.attachInternals();

  protected fieldAssoc = new FieldAssociationController(this.internals, {
    onDisabledChange: () => this.syncCascadedDisabled(),
  });

  // Test-only instrumentation, not field or controller API: counts
  // `onDisabledChange` fires so a test can assert the cascade dedups to
  // once-per-change. Not surfaced in the bench readout.
  public disabledChangeCount = 0;

  /** The host's own `disabled` OR the cascaded form/`<fieldset disabled>` state. */
  protected get effectiveDisabled(): boolean {
    return this.disabled || this.fieldAssoc.formDisabled;
  }

  /**
   * Maps state to the submitted value (`null` excludes it). A real field concern,
   * abstract here so one base serves all three harnesses; `TextField.base` inlines it.
   */
  protected abstract computeFormValue(): FieldFormValue;

  protected updateFormValue(): void {
    this.fieldAssoc.setValue(this.computeFormValue());
  }

  // On cascade change: re-render (update() re-pushes the value) and count for tests.
  private syncCascadedDisabled(): void {
    this.disabledChangeCount += 1;
    this.requestUpdate();
  }

  protected override firstUpdated(changed: PropertyValues): void {
    super.firstUpdated(changed);
    // The reset target is the initial `value` attribute.
    this.fieldAssoc.defaultValue = this.value;
  }

  protected override update(changed: PropertyValues): void {
    super.update(changed);
    this.updateFormValue();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    // Validity mirroring needs the rendered control, so it stays post-render.
    this.syncValidity();
  }

  // Mirror the inner control's validity onto the host's ElementInternals so the
  // controller's validity reads are real. `setValidity` is host-owned, not on the controller.
  private syncValidity(): void {
    const control = this.renderRoot.querySelector<
      HTMLInputElement | HTMLSelectElement
    >('input, select');
    if (control) {
      this.internals.setValidity(
        control.validity,
        control.validationMessage,
        control
      );
    }
  }

  // ── Browser form lifecycle hooks, delegated to the controller ──

  public formResetCallback(): void {
    this.resetToDefault();
    this.updateFormValue();
  }

  public formDisabledCallback(disabled: boolean): void {
    this.fieldAssoc.formDisabledCallback(disabled);
  }

  /** Restores state on native form reset. Subclasses extend as needed. */
  protected resetToDefault(): void {
    this.value = this.fieldAssoc.defaultValue;
  }

  // ── Validity pass-throughs, mirroring a native control ──

  public get form(): HTMLFormElement | null {
    return this.fieldAssoc.form;
  }
  public get validity(): ValidityState {
    return this.fieldAssoc.validity;
  }
  public get validationMessage(): string {
    return this.fieldAssoc.validationMessage;
  }
  public get willValidate(): boolean {
    return this.fieldAssoc.willValidate;
  }
  public checkValidity(): boolean {
    return this.fieldAssoc.checkValidity();
  }
  public reportValidity(): boolean {
    return this.fieldAssoc.reportValidity();
  }
}

// ────────────────────────────────────────
//     TEXT HARNESS
// ────────────────────────────────────────

/**
 * @internal
 *
 * Text-input harness. Submits its value unless effectively disabled.
 */
@customElement('demo-field-text')
export class DemoFieldText extends DemoFieldHostBase {
  protected override computeFormValue(): FieldFormValue {
    return this.effectiveDisabled ? null : this.value;
  }

  private handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }

  protected override render(): TemplateResult {
    return html`
      <input
        type="text"
        aria-label=${ifDefined(this.label || undefined)}
        .value=${this.value}
        ?required=${this.required}
        ?disabled=${this.effectiveDisabled}
        @input=${this.handleInput}
      />
    `;
  }
}

// ────────────────────────────────────────
//     RADIO HARNESS
// ────────────────────────────────────────

/**
 * @internal
 *
 * Single-radio harness. Mirrors the checkbox exclusion pattern: submits its
 * value only when checked and not effectively disabled, otherwise `null`.
 */
@customElement('demo-field-radio')
export class DemoFieldRadio extends DemoFieldHostBase {
  /** Whether the radio is currently selected. */
  @property({ type: Boolean })
  public checked = false;

  private defaultChecked = false;

  protected override firstUpdated(changed: PropertyValues): void {
    // Capture the reset target alongside the base's default.
    this.defaultChecked = this.checked;
    super.firstUpdated(changed);
  }

  protected override resetToDefault(): void {
    super.resetToDefault();
    this.checked = this.defaultChecked;
  }

  protected override computeFormValue(): FieldFormValue {
    return this.checked && !this.effectiveDisabled ? this.value || 'on' : null;
  }

  private handleChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
  }

  protected override render(): TemplateResult {
    return html`
      <input
        type="radio"
        aria-label=${ifDefined(this.label || undefined)}
        .checked=${this.checked}
        ?disabled=${this.effectiveDisabled}
        @change=${this.handleChange}
      />
    `;
  }
}

// ────────────────────────────────────────
//     COMBOBOX HARNESS
// ────────────────────────────────────────

/** @internal Options offered by the combobox harness. */
const COMBOBOX_OPTIONS = ['Red', 'Green', 'Blue'] as const;

/**
 * @internal
 *
 * Combobox harness backed by a native `<select>`. The empty option represents
 * "unselected"; while unselected (or effectively disabled) it submits `null`.
 */
@customElement('demo-field-combobox')
export class DemoFieldCombobox extends DemoFieldHostBase {
  protected override computeFormValue(): FieldFormValue {
    return this.value !== '' && !this.effectiveDisabled ? this.value : null;
  }

  private handleChange(event: Event): void {
    this.value = (event.target as HTMLSelectElement).value;
  }

  protected override render(): TemplateResult {
    return html`
      <select
        aria-label=${ifDefined(this.label || undefined)}
        .value=${this.value}
        ?disabled=${this.effectiveDisabled}
        @change=${this.handleChange}
      >
        <option value="">Choose a color</option>
        ${COMBOBOX_OPTIONS.map(
          (option) => html`
            <option value=${option}>${option}</option>
          `
        )}
      </select>
    `;
  }
}

// ────────────────────────────────────────
//     INTERACTIVE TEST BENCH
// ────────────────────────────────────────

/**
 * @internal
 *
 * Hands-on bench: the three harnesses in one `<form>` with action buttons and a
 * live `FormData` + validity readout, so a reader can exercise the controller
 * directly instead of reading the tests.
 */
@customElement('demo-field-bench')
export class DemoFieldBench extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    fieldset {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: start;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 12px 0;
    }
    .readout {
      margin: 0;
      padding: 12px;
      background: var(--swc-gray-100, #f0f0f0);
      border-radius: 4px;
      font-size: 12px;
      white-space: pre-wrap;
    }
  `;

  @state()
  private readout = '';

  private get form(): HTMLFormElement | null {
    return this.renderRoot.querySelector('form');
  }

  private get fields(): DemoFieldHostBase[] {
    return [
      ...(this.form?.querySelectorAll<DemoFieldHostBase>(
        'demo-field-text, demo-field-radio, demo-field-combobox'
      ) ?? []),
    ];
  }

  protected override firstUpdated(): void {
    this.refresh();
  }

  private refresh(): void {
    const form = this.form;
    if (!form) {
      return;
    }
    const entries = [...new FormData(form).entries()].map(
      ([key, value]) => `  ${key} = ${String(value)}`
    );
    const validity = this.fields.map((field) => {
      const state = field.checkValidity() ? 'valid' : 'invalid';
      const message = field.validationMessage
        ? ` (${field.validationMessage})`
        : '';
      return `  ${field.name ?? '(unnamed)'}: ${state}, willValidate=${field.willValidate}${message}`;
    });
    this.readout = [
      'FormData:',
      entries.length ? entries.join('\n') : '  (empty)',
      '',
      'Validity:',
      validity.join('\n'),
      '',
      `form.checkValidity(): ${form.checkValidity()}`,
    ].join('\n');
  }

  private handleActivity(): void {
    this.refresh();
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    this.refresh();
  }

  private handleReset(): void {
    // Reset restores field values via formResetCallback; read the result after.
    requestAnimationFrame(() => this.refresh());
  }

  private handleCheckValidity(): void {
    this.form?.reportValidity();
    this.refresh();
  }

  private handleToggleDisabled(): void {
    const fieldset = this.renderRoot.querySelector('fieldset');
    if (fieldset) {
      fieldset.disabled = !fieldset.disabled;
      requestAnimationFrame(() => this.refresh());
    }
  }

  // Toggles the field's own `disabled` (the other half of effectiveDisabled).
  private handleToggleFieldDisabled(): void {
    const field =
      this.renderRoot.querySelector<DemoFieldText>('demo-field-text');
    if (field) {
      field.disabled = !field.disabled;
      requestAnimationFrame(() => this.refresh());
    }
  }

  protected override render(): TemplateResult {
    return html`
      <form
        @input=${this.handleActivity}
        @change=${this.handleActivity}
        @submit=${this.handleSubmit}
        @reset=${this.handleReset}
      >
        <fieldset>
          <legend>Profile</legend>
          <demo-field-text
            name="username"
            value="Example"
            required
            label="Username (required)"
          ></demo-field-text>
          <demo-field-combobox
            name="color"
            label="Favorite color"
          ></demo-field-combobox>
          <demo-field-radio
            name="subscribe"
            value="yes"
            checked
            label="Subscribe"
          ></demo-field-radio>
        </fieldset>
        <div class="actions">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
          <button type="button" @click=${this.handleCheckValidity}>
            Check validity
          </button>
          <button type="button" @click=${this.handleToggleDisabled}>
            Toggle fieldset disabled
          </button>
          <button type="button" @click=${this.handleToggleFieldDisabled}>
            Toggle Username disabled
          </button>
        </div>
        <pre class="readout" aria-live="polite">${this.readout}</pre>
      </form>
    `;
  }
}
