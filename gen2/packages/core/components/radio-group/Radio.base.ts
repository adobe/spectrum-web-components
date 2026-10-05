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

import { SlotPresenceController } from '@adobe/spectrum-wc-core/controllers/slot-presence-controller/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { warnIf } from '@adobe/spectrum-wc-core/utils/index.js';

import type { RadioSize } from './RadioGroup.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-radio-group--docs';

/**
 * A single selectable option within a `swc-radio-group`. Rendering lives in `swc-radio`.
 *
 * Role and state (`role="radio"`, `aria-checked`, `aria-disabled`,
 * `aria-posinset`/`aria-setsize`) live on the host via `ElementInternals`, not
 * a nested `<input type="radio">` because each item has its own shadow root, so a
 * native input never successfully announces a real group position.
 * Do not add `aria-describedby` for the `description` slot; it is already part
 * of the accessible name.
 *
 * @attribute {RadioSize} size - Size of the item. Inherited from the parent
 *   `swc-radio-group`.
 *
 * @slot label - Visible label content.
 * @slot description - Optional secondary/help text for this item.
 */
export abstract class RadioBase extends SpectrumElement {
  private readonly internals = this.attachInternals();

  constructor() {
    super();
    this.internals.role = 'radio';
    this.addEventListener('click', this.handleActivate);
    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('keyup', this.handleKeyup);
  }

  /**
   * Identifies this option as the group's selected value. Plain content
   * attribute, not ARIA.
   */
  @property({ type: String, reflect: true })
  public value = '';

  /**
   * Kept in sync with the enclosing group's `selected`; never emits `"mixed"`.
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Reflected onto `aria-disabled`; also guards activation.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Affects the checked indicator's accent color only.
   */
  @property({ type: Boolean, reflect: true })
  public emphasized = false;

  /**
   * The size of the item. Inherited from the parent radio group.
   */
  @property({ type: String, reflect: true })
  public size?: RadioSize;

  /**
   * This item's 1-based position, for `aria-posinset`. Set by the enclosing
   * group because the browser can't compute it across separate shadow roots.
   *
   * @internal
   */
  @property({ type: Number })
  public posInSet = 1;

  /**
   * The total number of items in the enclosing group, for `aria-setsize`.
   * See `posInSet`.
   *
   * @internal
   */
  @property({ type: Number })
  public setSize = 1;

  /**
   * Whether the `description` slot has content. Consumed by `swc-radio`'s
   * `render()` to gate the description container.
   *
   * @internal
   */
  private readonly descriptionPresence = new SlotPresenceController(
    this,
    '[slot="description"]'
  );

  protected get hasDescription(): boolean {
    return this.descriptionPresence.isPresent;
  }

  private readonly handleActivate = (): void => {
    if (this.disabled) {
      return;
    }
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  };

  // Space scrolls the page on keydown; there is no native input to prevent it.
  private readonly handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  // Activate on keyup, matching native radio behavior.
  private readonly handleKeyup = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      this.handleActivate();
    }
  };

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    if (!this.hasAttribute('tabindex')) {
      // Roving tabindex is owned by the enclosing group's
      // `FocusgroupNavigationController`, which assigns 0/-1 directly.
      this.tabIndex = -1;
    }
    warnIf(
      this,
      this.parentElement?.localName !== 'swc-radio-group',
      `<${this.localName}> is not supported as a standalone control; it must be used inside a <swc-radio-group>.`,
      DOCS_URL,
      { type: 'api' }
    );
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    this.internals.ariaChecked = this.checked ? 'true' : 'false';
    this.internals.ariaDisabled = this.disabled ? 'true' : null;
    this.internals.ariaPosInSet = String(this.posInSet);
    this.internals.ariaSetSize = String(this.setSize);
  }
}
