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
import { customElement } from 'lit/decorators.js';

import { AttributeObserverController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-attribute-observer-host': DemoAttributeObserverHost;
    'demo-attribute-observer-stale-host': DemoAttributeObserverStaleHost;
    'demo-attribute-observer-debug-host': DemoAttributeObserverDebugHost;
  }
}

const boxStyles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border: 1px solid var(--swc-gray-300, #d5d5d5);
    border-radius: 6px;
    font: inherit;
  }

  .status {
    display: inline-block;
    margin: 0;
    padding: 4px 8px;
    border-radius: 4px;
    background: var(--swc-gray-100, #f5f5f5);
    font-family: monospace;
    white-space: pre;
  }

  .reacted {
    margin: 0;
    color: var(--swc-green-800, #0a7a3f);
    font-weight: 700;
  }

  .idle {
    margin: 0;
    color: var(--swc-gray-600, #8f8f8f);
  }
`;

/**
 * @internal
 *
 * Renders its own `aria-label` and, when it detects the value changed, a "re-ran
 * its follow-up" confirmation. Because it **uses**
 * {@link AttributeObserverController}, an `aria-label` change re-renders the host
 * (`updated()` runs) and the confirmation appears. This is the visible follow-up
 * action a real consumer would run there (for example re-checking the accessible
 * name). `renderCount` lets tests assert the re-render.
 */
@customElement('demo-attribute-observer-host')
export class DemoAttributeObserverHost extends LitElement {
  static override styles = boxStyles;

  protected readonly attributeObserver = new AttributeObserverController(
    this,
    'aria-label'
  );

  /** Increments on every completed update so a test can prove a re-render. */
  public renderCount = 0;

  private _lastLabel: string | null = null;
  private _changeCount = 0;

  protected override willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes);
    // Detect the (non-reactive) aria-label change before render, so the
    // confirmation reflects this render rather than lagging one behind.
    const current = this.getAttribute('aria-label') ?? '';
    if (this._lastLabel !== null && current !== this._lastLabel) {
      this._changeCount += 1;
    }
    this._lastLabel = current;
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    // `aria-label` needs a naming-capable role to be valid; set it here rather
    // than overriding `connectedCallback`.
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'group');
    }
    this.renderCount += 1;
  }

  protected override render(): TemplateResult {
    const display = `aria-label="${this.getAttribute('aria-label') ?? ''}"`;
    return html`
      <code class="status">${display}</code>
      ${this._changeCount > 0
        ? html`
            <p class="reacted">
              ✓ observer fired, host re-rendered (${this._changeCount}×)
            </p>
          `
        : html`
            <p class="idle">waiting for an aria-label change…</p>
          `}
    `;
  }
}

/**
 * @internal
 *
 * Identical markup to {@link DemoAttributeObserverHost} but with **no**
 * controller. It reads `aria-label` in `render()` too, but nothing tells Lit the
 * attribute changed, so it never re-renders: the value goes stale and the
 * confirmation never appears. This is the negative control that makes the
 * controller's contribution visible.
 */
@customElement('demo-attribute-observer-stale-host')
export class DemoAttributeObserverStaleHost extends LitElement {
  static override styles = boxStyles;

  /** Increments on every completed update so a test can prove it did NOT re-render. */
  public renderCount = 0;

  private _lastLabel: string | null = null;
  private _changeCount = 0;

  protected override willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes);
    const current = this.getAttribute('aria-label') ?? '';
    if (this._lastLabel !== null && current !== this._lastLabel) {
      this._changeCount += 1;
    }
    this._lastLabel = current;
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'group');
    }
    this.renderCount += 1;
  }

  protected override render(): TemplateResult {
    const display = `aria-label="${this.getAttribute('aria-label') ?? ''}"`;
    return html`
      <code class="status">${display}</code>
      ${this._changeCount > 0
        ? html`
            <p class="reacted">
              ✓ observer fired, host re-rendered (${this._changeCount}×)
            </p>
          `
        : html`
            <p class="idle">waiting for an aria-label change…</p>
          `}
    `;
  }
}

/**
 * @internal
 *
 * Observes `aria-label` only when dev-mode validation is active
 * (`debugOnly: true`). Used to verify the observer stays detached, and the host
 * does not re-render on attribute changes, when `isDebug()` is `false`.
 */
@customElement('demo-attribute-observer-debug-host')
export class DemoAttributeObserverDebugHost extends LitElement {
  static override styles = boxStyles;

  protected readonly attributeObserver = new AttributeObserverController(
    this,
    'aria-label',
    { debugOnly: true }
  );

  /** Increments on every completed update so a test can prove a re-render. */
  public renderCount = 0;

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    this.renderCount += 1;
  }

  protected override render(): TemplateResult {
    const display = `aria-label="${this.getAttribute('aria-label') ?? ''}"`;
    return html`
      <code class="status">${display}</code>
    `;
  }
}
