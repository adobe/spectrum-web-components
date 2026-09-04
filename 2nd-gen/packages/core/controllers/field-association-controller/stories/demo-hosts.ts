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
    'demo-form-readout': DemoFormReadout;
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
    if (!this.checked) {
      return;
    }
    // Native radios in one group are mutually exclusive; each harness lives in
    // its own shadow root, so uncheck same-name siblings by hand.
    this.form
      ?.querySelectorAll<DemoFieldRadio>(`demo-field-radio[name="${this.name}"]`)
      .forEach((radio) => {
        if (radio !== this) {
          radio.checked = false;
        }
      });
  }

  protected override render(): TemplateResult {
    // Wrapping <label> gives the radio a visible, clickable name (native
    // association), so it isn't a label-less dot in the docs demos.
    return html`
      <label>
        <input
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.effectiveDisabled}
          @change=${this.handleChange}
        />
        ${this.label}
      </label>
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
//     SHARED READOUT
// ────────────────────────────────────────

/**
 * @internal
 *
 * Builds the `FormData` + validity summary shared by the bench and the drop-in
 * readout, so a story shows the controller's output instead of hiding it behind
 * the harnesses.
 */
function summarizeForm(form: HTMLFormElement): string {
  const fields = [
    ...form.querySelectorAll<DemoFieldHostBase>(
      'demo-field-text, demo-field-radio, demo-field-combobox'
    ),
  ];
  const entries = [...new FormData(form).entries()].map(
    ([key, value]) => `  ${key} = ${String(value)}`
  );
  const validity = fields.map((field) => {
    const state = field.checkValidity() ? 'valid' : 'invalid';
    const message = field.validationMessage
      ? ` (${field.validationMessage})`
      : '';
    return `  ${field.name ?? '(unnamed)'}: ${state}, willValidate=${field.willValidate}${message}`;
  });
  return [
    'FormData:',
    entries.length ? entries.join('\n') : '  (empty)',
    '',
    'Validity:',
    validity.join('\n'),
    '',
    `form.checkValidity(): ${form.checkValidity()}`,
  ].join('\n');
}

/**
 * @internal
 *
 * Drop-in `<demo-form-readout>`: place inside a `<form>` to add a Submit button
 * and a `FormData` + validity readout, so a focused story demonstrates what the
 * controller contributes *at submit time* (not a live mirror of the fields).
 */
@customElement('demo-form-readout')
export class DemoFormReadout extends LitElement {
  private static readonly placeholder = 'Submit the form to see its output.';
  static override styles = css`
    :host {
      display: block;
      margin-top: 12px;
      font-family: system-ui, sans-serif;
    }
    button {
      margin-bottom: 8px;
    }
    .readout {
      box-sizing: border-box;
      max-inline-size: 100%;
      margin: 0;
      padding: 12px;
      background: var(--swc-gray-100, #f0f0f0);
      border-radius: 4px;
      font-size: 12px;
      /* Wrap normal text and break long unbroken tokens so a long validity
         message can't stretch the container. */
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  `;

  @state()
  private readout = DemoFormReadout.placeholder;

  // Light-DOM child of the story's form.
  private get form(): HTMLFormElement | null {
    return this.closest('form');
  }

  // Snapshot the form's output on submit; that's the moment worth showing.
  private handleSubmit = (event: Event): void => {
    event.preventDefault();
    const form = this.form;
    if (form) {
      this.readout = summarizeForm(form);
    }
  };

  // Reset clears the readout back to the prompt.
  private handleReset = (): void => {
    this.readout = DemoFormReadout.placeholder;
  };

  private requestSubmit(): void {
    this.form?.requestSubmit();
  }

  public override connectedCallback(): void {
    super.connectedCallback?.();
    const form = this.form;
    form?.addEventListener('submit', this.handleSubmit);
    form?.addEventListener('reset', this.handleReset);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback?.();
    const form = this.form;
    form?.removeEventListener('submit', this.handleSubmit);
    form?.removeEventListener('reset', this.handleReset);
  }

  protected override render(): TemplateResult {
    return html`
      <button type="button" @click=${this.requestSubmit}>Submit</button>
      <pre class="readout" aria-live="polite">${this.readout}</pre>
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
    form {
      /* Cap the width so a long readout line can't stretch the whole form. */
      max-inline-size: 480px;
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
      box-sizing: border-box;
      max-inline-size: 100%;
      margin: 0;
      padding: 12px;
      background: var(--swc-gray-100, #f0f0f0);
      border-radius: 4px;
      font-size: 12px;
      /* Wrap normal text and break long unbroken tokens so a long validity
         message can't stretch the container. */
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  `;

  private static readonly placeholder = 'Submit the form to see its output.';

  @state()
  private readout = DemoFieldBench.placeholder;

  private get form(): HTMLFormElement | null {
    return this.renderRoot.querySelector('form');
  }

  // Snapshot the form's FormData + validity into the readout. Called on explicit
  // actions (submit, check, toggle) — never on live typing — so the readout is a
  // deliberate snapshot, not a mirror of every keystroke.
  private refresh = (): void => {
    const form = this.form;
    if (form) {
      this.readout = summarizeForm(form);
    }
  };

  private handleSubmit(event: Event): void {
    event.preventDefault();
    this.refresh();
  }

  // Reset clears the readout back to the prompt.
  private handleReset(): void {
    this.readout = DemoFieldBench.placeholder;
  }

  // Use checkValidity(), not reportValidity(): both run the same check, but
  // checkValidity() is silent whereas reportValidity() would pop the native
  // bubble. The readout surfaces the result inline, the way a real field would.
  private handleCheckValidity(): void {
    this.form?.checkValidity();
    this.refresh();
  }

  private handleToggleDisabled(): void {
    const fieldset = this.renderRoot.querySelector('fieldset');
    if (fieldset) {
      fieldset.disabled = !fieldset.disabled;
      // The disabled cascade runs through async callbacks; read after it settles.
      requestAnimationFrame(this.refresh);
    }
  }

  protected override render(): TemplateResult {
    return html`
      <form
        novalidate
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
          <demo-field-radio
            name="subscribe"
            value="no"
            label="Do not subscribe"
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
        </div>
        <pre class="readout" aria-live="polite">${this.readout}</pre>
      </form>
    `;
  }
}
