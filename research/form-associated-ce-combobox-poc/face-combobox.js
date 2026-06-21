/**
 * Copyright 2026 Adobe. All rights reserved.
 *
 * Minimal form-associated combobox custom element using ElementInternals.
 *
 * This file intentionally does NOT include cross-root IDREF workarounds.
 * It shows what ElementInternals provides out of the box.
 *
 * Toggle USE_INTERNALS_ROLE below to compare behavior with and without
 * setting internals.role on the host element.
 */

// ─── Configuration ──────────────────────────────────────────────────────────
// Set to true to assign internals.role = 'combobox' on the host.
// Set to false to leave the host without a role (shadow input carries role).
const USE_INTERNALS_ROLE = true;
// ─────────────────────────────────────────────────────────────────────────────

class FaceCombobox extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return [
      'value',
      'placeholder',
      'required',
      'disabled',
      'options',
      'internal-label',
      'internal-help',
      'aria-label',
    ];
  }

  #internals;
  #input;
  #listbox;
  #trigger;
  #shadowLabel;
  #shadowHelp;
  #options = [];
  #filteredOptions = [];
  #activeIndex = -1;
  #isOpen = false;
  #inputId;
  #listboxId;

  constructor() {
    super();
    this.#internals = this.attachInternals();

    if (USE_INTERNALS_ROLE) {
      this.#internals.role = 'combobox';
    }

    this.#inputId = `combo-input-${FaceCombobox.#nextId}`;
    this.#listboxId = `combo-listbox-${FaceCombobox.#nextId}`;
    FaceCombobox.#nextId++;

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
          min-width: 240px;
          position: relative;
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

        .combobox-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #fff;
          transition: border-color 0.15s;
        }

        .combobox-wrapper:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        :host(:state(invalid)) .combobox-wrapper {
          border-color: #dc2626;
        }

        input {
          flex: 1;
          font: inherit;
          padding: 0.5rem 0.75rem;
          border: none;
          outline: none;
          background: transparent;
          min-width: 0;
        }

        input:disabled {
          cursor: not-allowed;
        }

        .trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 100%;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0.5rem 0.25rem;
          color: #6b7280;
          flex-shrink: 0;
        }

        .trigger:hover {
          color: #1f2937;
        }

        .trigger svg {
          width: 12px;
          height: 12px;
          transition: transform 0.15s;
        }

        :host([open]) .trigger svg {
          transform: rotate(180deg);
        }

        .listbox {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 100;
          max-height: 200px;
          overflow-y: auto;
          background: #fff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          margin-top: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 4px 0;
        }

        :host([open]) .listbox {
          display: block;
        }

        .option {
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          font-size: 0.875rem;
          border-radius: 3px;
          margin: 0 4px;
        }

        .option:hover {
          background: #f3f4f6;
        }

        .option[aria-selected="true"] {
          background: #eff6ff;
          color: #1d4ed8;
          font-weight: 500;
        }

        .option.active {
          background: #e0e7ff;
          outline: 2px solid #3b82f6;
          outline-offset: -2px;
        }

        .no-results {
          padding: 0.5rem 0.75rem;
          color: #6b7280;
          font-size: 0.875rem;
          font-style: italic;
        }
      </style>

      <span class="internal-label" id="shadow-label" hidden></span>

      <div class="combobox-wrapper">
        <input
          id="${this.#inputId}"
          part="input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="false"
          aria-controls="${this.#listboxId}"
          aria-haspopup="listbox"
          autocomplete="off"
        />
        <button
          class="trigger"
          type="button"
          tabindex="-1"
          aria-label="Show options"
          aria-controls="${this.#listboxId}"
          aria-expanded="false"
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M2 4l4 4 4-4" />
          </svg>
        </button>
      </div>

      <div
        class="listbox"
        id="${this.#listboxId}"
        role="listbox"
        aria-label="Options"
      ></div>

      <span class="internal-help" id="shadow-help" hidden></span>
    `;

    this.#input = shadow.getElementById(this.#inputId);
    this.#listbox = shadow.getElementById(this.#listboxId);
    this.#trigger = shadow.querySelector('.trigger');
    this.#shadowLabel = shadow.getElementById('shadow-label');
    this.#shadowHelp = shadow.getElementById('shadow-help');

    this.#input.addEventListener('input', () => this.#onInput());
    this.#input.addEventListener('keydown', (e) => this.#onKeydown(e));
    this.#input.addEventListener('focus', () => this.#emitLog('focus'));

    this.#input.addEventListener('blur', () => {
      requestAnimationFrame(() => {
        if (
          !this.shadowRoot.activeElement ||
          this.shadowRoot.activeElement === this.#input
        ) {
          return;
        }
        this.#close();
      });
    });

    this.#trigger.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.#toggle();
    });

    this.#listbox.addEventListener('mousedown', (e) => e.preventDefault());

    this.#listbox.addEventListener('click', (e) => {
      const option = e.target.closest('[role="option"]');
      if (option) this.#selectOption(option.dataset.value);
    });

    shadow.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (!this.shadowRoot.contains(this.shadowRoot.activeElement)) {
          this.#close();
        }
      });
    });
  }

  static #nextId = 0;

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
        if (this.#input) this.#input.placeholder = newVal ?? '';
        break;
      case 'required':
        if (this.#input) this.#input.required = newVal !== null;
        break;
      case 'disabled':
        if (this.#input) {
          this.#input.disabled = newVal !== null;
          this.#trigger.disabled = newVal !== null;
        }
        break;
      case 'options':
        this.#parseOptions(newVal);
        break;
      case 'internal-label':
        this.#updateInternalLabel(newVal);
        break;
      case 'internal-help':
        this.#updateInternalHelp(newVal);
        break;
      case 'aria-label':
        if (newVal !== null) {
          this.#internals.ariaLabel = newVal;
          this.#input.setAttribute('aria-label', newVal);
        }
        break;
    }
  }

  // ─── Form-associated API ────────────────────────────────────────────────

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
    this.#close();
  }

  formDisabledCallback(disabled) {
    this.#input.disabled = disabled;
    this.#trigger.disabled = disabled;
    if (disabled) {
      this.setAttribute('disabled', '');
      this.#close();
    } else {
      this.removeAttribute('disabled');
    }
  }

  formStateRestoreCallback(state, _mode) {
    this.#input.value = state ?? '';
    this.#syncValue();
  }

  // ─── Combobox behavior ──────────────────────────────────────────────────

  #parseOptions(json) {
    try {
      this.#options = JSON.parse(json || '[]');
    } catch {
      this.#options = [];
    }
    this.#filteredOptions = [...this.#options];
    this.#renderOptions();
  }

  #onInput() {
    const query = this.#input.value.toLowerCase();
    this.#filteredOptions = this.#options.filter((opt) =>
      opt.toLowerCase().includes(query)
    );
    this.#activeIndex = -1;
    this.#open();
    this.#renderOptions();
    this.#syncValue();
    this.#validate();
    this.#emitLog(
      `input: "${this.#input.value}" → ${this.#filteredOptions.length} matches`
    );
  }

  #onKeydown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.#isOpen) {
          this.#open();
          this.#renderOptions();
        }
        this.#moveActive(1);
        this.#emitLog(`ArrowDown → active: ${this.#activeIndex}`);
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!this.#isOpen) {
          this.#open();
          this.#renderOptions();
        }
        this.#moveActive(-1);
        this.#emitLog(`ArrowUp → active: ${this.#activeIndex}`);
        break;

      case 'Enter':
        if (this.#isOpen && this.#activeIndex >= 0) {
          e.preventDefault();
          this.#selectOption(this.#filteredOptions[this.#activeIndex]);
        }
        break;

      case 'Escape':
        if (this.#isOpen) {
          e.preventDefault();
          this.#close();
          this.#emitLog('Escape → closed');
        }
        break;

      case 'Home':
        if (this.#isOpen && this.#filteredOptions.length > 0) {
          e.preventDefault();
          this.#activeIndex = 0;
          this.#updateActive();
        }
        break;

      case 'End':
        if (this.#isOpen && this.#filteredOptions.length > 0) {
          e.preventDefault();
          this.#activeIndex = this.#filteredOptions.length - 1;
          this.#updateActive();
        }
        break;

      case 'Tab':
        if (this.#isOpen) this.#close();
        break;
    }
  }

  #moveActive(delta) {
    if (this.#filteredOptions.length === 0) return;

    if (this.#activeIndex === -1) {
      this.#activeIndex = delta > 0 ? 0 : this.#filteredOptions.length - 1;
    } else {
      this.#activeIndex += delta;
      if (this.#activeIndex < 0)
        this.#activeIndex = this.#filteredOptions.length - 1;
      if (this.#activeIndex >= this.#filteredOptions.length)
        this.#activeIndex = 0;
    }

    this.#updateActive();
  }

  #updateActive() {
    const options = this.#listbox.querySelectorAll('[role="option"]');
    options.forEach((opt, i) => {
      opt.classList.toggle('active', i === this.#activeIndex);
    });

    if (this.#activeIndex >= 0 && options[this.#activeIndex]) {
      const activeOpt = options[this.#activeIndex];
      this.#input.setAttribute('aria-activedescendant', activeOpt.id);
      activeOpt.scrollIntoView({ block: 'nearest' });

      this.dispatchEvent(
        new CustomEvent('activedescendant-change', {
          detail: {
            id: activeOpt.id,
            text: activeOpt.textContent,
            index: this.#activeIndex,
          },
          bubbles: true,
        })
      );
    } else {
      this.#input.removeAttribute('aria-activedescendant');
    }
  }

  #selectOption(value) {
    this.#input.value = value;
    this.#syncValue();
    this.#validate();
    this.#close();
    this.#input.focus();

    this.dispatchEvent(
      new CustomEvent('combo-change', {
        detail: { value },
        bubbles: true,
      })
    );
  }

  #open() {
    if (this.#isOpen) return;
    this.#isOpen = true;
    this.setAttribute('open', '');
    this.#input.setAttribute('aria-expanded', 'true');
    this.#trigger.setAttribute('aria-expanded', 'true');
    this.#internals.ariaExpanded = 'true';

    this.dispatchEvent(
      new CustomEvent('combo-expanded', {
        detail: { expanded: true },
        bubbles: true,
      })
    );
  }

  #close() {
    if (!this.#isOpen) return;
    this.#isOpen = false;
    this.removeAttribute('open');
    this.#input.setAttribute('aria-expanded', 'false');
    this.#trigger.setAttribute('aria-expanded', 'false');
    this.#input.removeAttribute('aria-activedescendant');
    this.#activeIndex = -1;
    this.#internals.ariaExpanded = 'false';

    this.#filteredOptions = [...this.#options];
    this.#renderOptions();

    this.dispatchEvent(
      new CustomEvent('combo-expanded', {
        detail: { expanded: false },
        bubbles: true,
      })
    );
  }

  #toggle() {
    if (this.#isOpen) {
      this.#close();
    } else {
      this.#filteredOptions = [...this.#options];
      this.#renderOptions();
      this.#open();
    }
    this.#input.focus();
  }

  #renderOptions() {
    this.#listbox.innerHTML = '';

    if (this.#filteredOptions.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'No matches found';
      this.#listbox.appendChild(noResults);
      return;
    }

    const currentValue = this.#input.value;

    this.#filteredOptions.forEach((opt, i) => {
      const el = document.createElement('div');
      el.setAttribute('role', 'option');
      el.id = `${this.#listboxId}-opt-${i}`;
      el.className = 'option';
      el.dataset.value = opt;
      el.textContent = opt;

      if (opt === currentValue) el.setAttribute('aria-selected', 'true');
      if (i === this.#activeIndex) {
        el.classList.add('active');
        this.#input.setAttribute('aria-activedescendant', el.id);
      }

      this.#listbox.appendChild(el);
    });
  }

  // ─── Private helpers ────────────────────────────────────────────────────

  #syncFromAttributes() {
    const value = this.getAttribute('value') ?? '';
    const placeholder = this.getAttribute('placeholder') ?? '';
    this.#input.value = value;
    this.#input.placeholder = placeholder;

    if (this.hasAttribute('required')) this.#input.required = true;
    if (this.hasAttribute('disabled')) {
      this.#input.disabled = true;
      this.#trigger.disabled = true;
    }

    this.#parseOptions(this.getAttribute('options'));

    const internalLabel = this.getAttribute('internal-label');
    if (internalLabel) this.#updateInternalLabel(internalLabel);

    const internalHelp = this.getAttribute('internal-help');
    if (internalHelp) this.#updateInternalHelp(internalHelp);

    const hostAriaLabel = this.getAttribute('aria-label');
    if (hostAriaLabel) {
      this.#internals.ariaLabel = hostAriaLabel;
      this.#input.setAttribute('aria-label', hostAriaLabel);
    }
  }

  #syncValue() {
    this.#internals.setFormValue(this.#input.value);
  }

  #validate() {
    const input = this.#input;

    if (this.hasAttribute('required') && !input.value.trim()) {
      this.#internals.setValidity(
        { valueMissing: true },
        'Please select or enter a value.',
        input
      );
      this.#internals.ariaInvalid = 'true';
    } else {
      this.#internals.setValidity({});
      this.#internals.ariaInvalid = 'false';
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

  #emitLog(msg) {
    this.dispatchEvent(
      new CustomEvent('combo-log', {
        detail: { message: msg },
        bubbles: true,
      })
    );
  }
}

customElements.define('face-combobox', FaceCombobox);
