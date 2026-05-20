/**
 * Copyright 2026 Adobe. All rights reserved.
 *
 * Variant WITHOUT delegatesFocus.
 * Tests whether removing delegatesFocus changes how internals.role
 * and internals.ariaLabel interact with the accessibility tree.
 *
 * If delegatesFocus is what causes the shadow input to be the
 * "focused" element, then without it the HOST should receive focus
 * and the SR should read internals.ariaLabel from the host.
 */
export class FaceTextFieldNoDelegate extends HTMLElement {
  static formAssociated = true;

  static get observedAttributes() {
    return [
      'value',
      'placeholder',
      'type',
      'use-internals-aria-label',
      'internals-role',
      'labelling-strategy',
    ];
  }

  #internals;
  #input;

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // No delegatesFocus — focus stays on the host unless user clicks input
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          min-width: 200px;
        }
        input {
          font: inherit;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          outline: none;
          width: 100%;
        }
        input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
      </style>
      <input id="internal-input" part="input" />
    `;

    this.#input = shadow.getElementById('internal-input');
    this.#input.addEventListener('input', () => {
      this.#internals.setFormValue(this.#input.value);
    });
  }

  connectedCallback() {
    const role = this.getAttribute('internals-role');
    if (role) {
      this.#internals.role = role;
    }

    const label = this.getAttribute('use-internals-aria-label');
    if (label) {
      const strategy = this.getAttribute('labelling-strategy') || 'dual-write';
      if (strategy === 'internals-only' || strategy === 'dual-write') {
        this.#internals.ariaLabel = label;
      }
      if (strategy === 'input-only' || strategy === 'dual-write') {
        this.#input.setAttribute('aria-label', label);
      }
    }

    const placeholder = this.getAttribute('placeholder');
    if (placeholder) {
      this.#input.placeholder = placeholder;
    }

    const value = this.getAttribute('value');
    if (value) {
      this.#input.value = value;
    }
  }

  get value() {
    return this.#input?.value ?? '';
  }

  set value(v) {
    if (this.#input) {
      this.#input.value = v;
      this.#internals.setFormValue(v);
    }
  }
}

customElements.define('face-text-field-no-delegate', FaceTextFieldNoDelegate);
