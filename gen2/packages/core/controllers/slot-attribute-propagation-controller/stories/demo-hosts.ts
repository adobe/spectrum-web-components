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

import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SlotAttributePropagationController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-slot-propagation-default': DemoSlotPropagationDefault;
    'demo-slot-propagation-named': DemoSlotPropagationNamed;
    'demo-slot-propagation-selector': DemoSlotPropagationSelector;
    'demo-slot-propagation-optional': DemoSlotPropagationOptional;
  }
}

/** Shared by demo hosts that lay out assigned elements in a wrapping row. */
const sharedStyles = css`
  :host {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

// ─────────────────────────────────────────
//     DEFAULT (UNNAMED) SLOT DEMO HOST
// ─────────────────────────────────────────

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link SlotAttributePropagationController}
 * targeting the default (unnamed) slot, mirroring `ButtonGroupBase`'s usage:
 * no `slotName` and no `selector`, so every assigned element receives the
 * `size` attribute.
 */
@customElement('demo-slot-propagation-default')
export class DemoSlotPropagationDefault extends LitElement {
  static override styles = sharedStyles;

  static override properties = {
    size: { type: String },
  };

  declare size: string;

  constructor() {
    super();
    this.size = 'm';
  }

  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => this.size,
    }
  );

  /** Re-propagates to elements assigned after the first render. */
  private _handleSlotchange(): void {
    this._sizePropagation.propagate();
  }

  protected override render(): TemplateResult {
    return html`
      <slot @slotchange=${this._handleSlotchange}></slot>
    `;
  }
}

// ─────────────────────────────
//     NAMED SLOT DEMO HOST
// ─────────────────────────────

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link SlotAttributePropagationController}
 * targeting a named slot, mirroring `IllustratedMessageBase`'s usage:
 * `slotName: 'actions'` so only elements assigned to the `actions` slot
 * receive the `size` attribute. A default slot is also rendered to prove
 * elements assigned there are left untouched.
 */
@customElement('demo-slot-propagation-named')
export class DemoSlotPropagationNamed extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  `;

  static override properties = {
    size: { type: String },
  };

  declare size: string;

  constructor() {
    super();
    this.size = 'm';
  }

  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => this.size,
      slotName: 'actions',
    }
  );

  /** Re-propagates to elements assigned to the `actions` slot after the first render. */
  private _handleActionsSlotchange(): void {
    this._sizePropagation.propagate();
  }

  protected override render(): TemplateResult {
    return html`
      <slot></slot>
      <div class="actions">
        <slot
          name="actions"
          @slotchange=${this._handleActionsSlotchange}
        ></slot>
      </div>
    `;
  }
}

// ─────────────────────────────────
//    OPTIONAL ATTRIBUTE DEMO HOST
// ─────────────────────────────────

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link SlotAttributePropagationController}
 * with a `getValue` that can return `null`: when `invalid` is `false`,
 * `getValue` returns `null` and the controller removes the `invalid`
 * attribute from assigned elements instead of setting it.
 */
@customElement('demo-slot-propagation-optional')
export class DemoSlotPropagationOptional extends LitElement {
  static override styles = sharedStyles;

  static override properties = {
    invalid: { type: Boolean },
  };

  declare invalid: boolean;

  constructor() {
    super();
    this.invalid = false;
  }

  private readonly _invalidPropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'invalid',
      getValue: () => (this.invalid ? '' : null),
    }
  );

  /** Re-propagates to elements assigned after the first render. */
  private _handleSlotchange(): void {
    this._invalidPropagation.propagate();
  }

  protected override render(): TemplateResult {
    return html`
      <slot @slotchange=${this._handleSlotchange}></slot>
    `;
  }
}

// ────────────────────────────────
//     SELECTOR-FILTERED DEMO HOST
// ────────────────────────────────

/**
 * @internal
 *
 * Storybook-only host demonstrating the {@link SlotAttributePropagationController}
 * `selector` option: only default-slot elements matching `.target` receive
 * the `variant` attribute; sibling elements without that class are left
 * untouched.
 */
@customElement('demo-slot-propagation-selector')
export class DemoSlotPropagationSelector extends LitElement {
  static override styles = sharedStyles;

  static override properties = {
    variant: { type: String },
  };

  declare variant: string;

  constructor() {
    super();
    this.variant = 'accent';
  }

  private readonly _variantPropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'variant',
      getValue: () => this.variant,
      selector: '.target',
    }
  );

  /** Re-propagates to matching elements assigned after the first render. */
  private _handleSlotchange(): void {
    this._variantPropagation.propagate();
  }

  protected override render(): TemplateResult {
    return html`
      <slot @slotchange=${this._handleSlotchange}></slot>
    `;
  }
}
