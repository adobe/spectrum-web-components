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
  'https://spectrum-web-components.adobe.com/?path=/docs/components-radio--docs';

/**
 * A single selectable option within a `swc-radio-group`. Rendering lives in `swc-radio`.
 *
 * @attribute {RadioSize} size - Size of the item. Inherited from the parent
 *   `swc-radio-group`.
 *
 * @slot label - Visible label content.
 * @slot description - Optional secondary/help text for this item.
 */
export abstract class RadioBase extends SpectrumElement {
  /**
   * Identifies this option within the group's shared `name`. Plain content
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
   * Reflected onto the inner input's native `disabled`.
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
   * When set, focuses this control automatically on render.
   */
  @property({ type: Boolean })
  public override autofocus = false;

  /**
   * Whether the `description` slot has content. Consumed by `swc-radio`'s
   * `render()` to gate the description container and its `aria-describedby`.
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

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    warnIf(
      this,
      this.parentElement?.localName !== 'swc-radio-group',
      `<${this.localName}> is not supported as a standalone control; it must be used inside a <swc-radio-group>.`,
      DOCS_URL,
      { type: 'api' }
    );
  }
}
