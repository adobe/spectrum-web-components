/**
 * Copyright 2026 Adobe. All rights reserved.
 *
 * Minimal form-associated text field custom element.
 * Tests what ElementInternals does OUT OF THE BOX — no custom JS
 * that resolves cross-root IDREFs or forwards text between scopes.
 *
 * What this component does:
 * - static formAssociated = true
 * - ElementInternals for form value, validation, role, and ARIA
 * - labelling-strategy attribute to isolate which layer carries the name
 * - Constraint validation (setValidity, reportValidity)
 * - formResetCallback, formDisabledCallback, formStateRestoreCallback
 *
 * What this component does NOT do (intentionally removed):
 * - No cross-root IDREF resolution
 * - No reading text from light DOM elements by ID
 * - No slotchange-based label forwarding
 * - No ariaLabelledByElements / ariaDescribedByElements usage
 */
export class FaceTextField extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return [
      'value',
      'name',
      'required',
      'pattern',
      'placeholder',
      'type',
      'disabled',
      'internal-label',
      'internal-help',
      'use-internals-aria-label',
      'internals-role',
      'labelling-strategy',
      'min-value',
      'aria-label',
      'aria-errormessage',
    ];
  }

  #internals;
  #input;
  #shadowLabel;
  #shadowHelp;

  constructor() {
    super();
    this.#internals = this.attachInternals();

    const shadow = this.attachShadow({
      mode: 'open',
      delegatesFocus: true,
    });
    shadow.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          flex-direction: column;
          gap: 4px;
          min-width: 200px;
        }

        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }

        .internal-label {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .internal-help {
          font-size: 0.8125rem;
          color: #6b7280;
        }

        input {
          font: inherit;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          outline: none;
          transition: border-color 0.15s;
        }

        input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        input:disabled {
          background: #f3f4f6;
          cursor: not-allowed;
        }

        :host(:state(invalid)) input,
        input:invalid {
          border-color: #dc2626;
        }

        ::slotted([slot='label']) {
          font-weight: 600;
          font-size: 0.875rem;
        }

        ::slotted([slot='help-text']) {
          font-size: 0.8125rem;
          color: #6b7280;
        }
      </style>

      <slot name="label"></slot>
      <span class="internal-label" id="shadow-label" hidden></span>

      <input id="internal-input" part="input" />

      <slot name="help-text"></slot>
      <span class="internal-help" id="shadow-help" hidden></span>
    `;

    this.#input = shadow.getElementById('internal-input');
    this.#shadowLabel = shadow.getElementById('shadow-label');
    this.#shadowHelp = shadow.getElementById('shadow-help');

    this.#input.addEventListener('input', () => {
      this.#syncValue();
      this.#validate();
    });

    this.#input.addEventListener('change', () => {
      this.#validate();
    });
  }

  connectedCallback() {
    this.#syncFromAttributes();
    this.#syncValue();
    this.#validate();
  }

  attributeChangedCallback(name, _oldVal, newVal) {
    switch (name) {
      case 'value':
        if (this.#input && this.#input.value !== newVal) {
          this.#input.value = newVal ?? '';
          this.#syncValue();
        }
        break;
      case 'placeholder':
        if (this.#input) {
          this.#input.placeholder = newVal ?? '';
        }
        break;
      case 'type':
        if (this.#input) {
          this.#input.type = newVal ?? 'text';
        }
        break;
      case 'required':
        if (this.#input) {
          this.#input.required = newVal !== null;
        }
        break;
      case 'pattern':
        if (this.#input) {
          this.#input.pattern = newVal ?? '';
        }
        break;
      case 'disabled':
        if (this.#input) {
          this.#input.disabled = newVal !== null;
        }
        break;
      case 'internal-label':
        this.#updateInternalLabel(newVal);
        break;
      case 'internal-help':
        this.#updateInternalHelp(newVal);
        break;
      case 'use-internals-aria-label':
        if (newVal !== null) {
          this.#applyLabel(newVal);
        }
        break;
      case 'internals-role':
        if (newVal !== null) {
          this.#internals.role = newVal;
        }
        break;
      case 'aria-label':
        if (newVal !== null) {
          this.#applyLabel(newVal);
        }
        break;
      case 'min-value':
        this.#validate();
        break;
      case 'aria-errormessage':
        break;
    }
  }

  // -- Public form API -------------------------------------------------------

  get form() {
    return this.#internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.localName;
  }

  get value() {
    return this.#input?.value ?? '';
  }

  set value(v) {
    if (this.#input) {
      this.#input.value = v;
      this.#syncValue();
    }
  }

  get validity() {
    return this.#internals.validity;
  }

  get validationMessage() {
    return this.#internals.validationMessage;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  checkValidity() {
    this.#validate();
    return this.#internals.checkValidity();
  }

  reportValidity() {
    this.#validate();
    return this.#internals.reportValidity();
  }

  formResetCallback() {
    const defaultValue = this.getAttribute('value') ?? '';
    this.#input.value = defaultValue;
    this.#syncValue();
    this.#validate();
    this.#clearErrorState();
  }

  formDisabledCallback(disabled) {
    this.#input.disabled = disabled;
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  formStateRestoreCallback(state, _mode) {
    this.#input.value = state ?? '';
    this.#syncValue();
  }

  // -- Private methods -------------------------------------------------------

  #syncFromAttributes() {
    const attrs = { value: '', placeholder: '', type: 'text' };
    for (const [attr, fallback] of Object.entries(attrs)) {
      const val = this.getAttribute(attr) ?? fallback;
      if (attr === 'value') {
        this.#input.value = val;
      } else {
        this.#input[attr] = val;
      }
    }

    if (this.hasAttribute('required')) {
      this.#input.required = true;
    }
    if (this.hasAttribute('pattern')) {
      this.#input.pattern = this.getAttribute('pattern');
    }
    if (this.hasAttribute('disabled')) {
      this.#input.disabled = true;
    }

    const internalLabel = this.getAttribute('internal-label');
    if (internalLabel) {
      this.#updateInternalLabel(internalLabel);
    }

    const internalHelp = this.getAttribute('internal-help');
    if (internalHelp) {
      this.#updateInternalHelp(internalHelp);
    }

    const internalsRole = this.getAttribute('internals-role');
    if (internalsRole) {
      this.#internals.role = internalsRole;
    }

    const internalsAriaLabel = this.getAttribute('use-internals-aria-label');
    if (internalsAriaLabel) {
      this.#applyLabel(internalsAriaLabel);
    }

    const hostAriaLabel = this.getAttribute('aria-label');
    if (hostAriaLabel) {
      this.#applyLabel(hostAriaLabel);
    }
  }

  #syncValue() {
    this.#internals.setFormValue(this.#input.value);
  }

  #validate() {
    const input = this.#input;

    const minValue = this.getAttribute('min-value');
    if (minValue !== null && input.value !== '') {
      const num = parseFloat(input.value);
      if (!isNaN(num) && num < parseFloat(minValue)) {
        this.#internals.setValidity(
          { rangeUnderflow: true },
          `Value must be at least ${minValue}.`,
          input
        );
        this.#showErrorState();
        return;
      }
    }

    if (!input.validity.valid) {
      this.#internals.setValidity(
        input.validity,
        input.validationMessage,
        input
      );
      this.#showErrorState();
    } else {
      this.#internals.setValidity({});
      this.#clearErrorState();
    }
  }

  #showErrorState() {
    this.#internals.ariaInvalid = 'true';
    const errorId = this.getAttribute('aria-errormessage');
    if (errorId) {
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        errorEl.hidden = false;
      }
    }
  }

  #clearErrorState() {
    this.#internals.ariaInvalid = 'false';
    const errorId = this.getAttribute('aria-errormessage');
    if (errorId) {
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        errorEl.hidden = true;
      }
    }
  }

  #updateInternalLabel(text) {
    if (text) {
      this.#shadowLabel.textContent = text;
      this.#shadowLabel.hidden = false;
      this.#input.setAttribute('aria-labelledby', 'shadow-label');
    } else {
      this.#shadowLabel.hidden = true;
      this.#input.removeAttribute('aria-labelledby');
    }
  }

  #updateInternalHelp(text) {
    if (text) {
      this.#shadowHelp.textContent = text;
      this.#shadowHelp.hidden = false;
      const existing = this.#input.getAttribute('aria-describedby') ?? '';
      if (!existing.includes('shadow-help')) {
        this.#input.setAttribute(
          'aria-describedby',
          (existing + ' shadow-help').trim()
        );
      }
    } else {
      this.#shadowHelp.hidden = true;
    }
  }

  get #labellingStrategy() {
    return this.getAttribute('labelling-strategy') || 'dual-write';
  }

  /**
   * Applies a label using the configured strategy.
   * No cross-root resolution — just sets the value where configured.
   */
  #applyLabel(text) {
    if (!text) {
      return;
    }
    const strategy = this.#labellingStrategy;

    if (strategy === 'internals-only' || strategy === 'dual-write') {
      this.#internals.ariaLabel = this.#internals.ariaLabel || text;
    }

    if (strategy === 'input-only' || strategy === 'dual-write') {
      if (!this.#input.hasAttribute('aria-labelledby')) {
        this.#input.setAttribute('aria-label', text);
      }
    }
  }
}

customElements.define('face-text-field', FaceTextField);
