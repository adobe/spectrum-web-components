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
  CSSResultArray,
  html,
  PropertyValues,
  SizedMixin,
  SpectrumElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import {
  property,
  query,
} from '@spectrum-web-components/base/src/decorators.js';
import type { Button } from '@spectrum-web-components/button';

import styles from './button-group.css.js';

/**
 * @element sp-button-group
 * @slot - the sp-button elements that make up the group
 */
export class ButtonGroup extends SizedMixin(SpectrumElement, {
  noDefaultSize: true,
}) {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * @deprecated Use `orientation="vertical"` on `<swc-button-group>` instead.
   * The `vertical` attribute will not be carried forward to 2nd-gen.
   */
  @property({ type: Boolean, reflect: true })
  public set vertical(value: boolean) {
    const oldValue = this._vertical;
    this._vertical = value;
    this.requestUpdate('vertical', oldValue);
    if (window.__swc?.DEBUG) {
      window.__swc.warn(
        this,
        `The "vertical" attribute on <${this.localName}> is deprecated. Use orientation="vertical" on <swc-button-group> when migrating to 2nd-gen.`,
        'https://opensource.adobe.com/spectrum-web-components/components/button-group/',
        { level: 'deprecation' }
      );
    }
  }

  public get vertical(): boolean {
    return this._vertical;
  }

  private _vertical = false;

  @query('slot')
  slotElement!: HTMLSlotElement;

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('size')) {
      this.manageChildrenSize(this.slotElement);
    }
  }

  protected handleSlotchange({
    target: slot,
  }: Event & { target: HTMLSlotElement }): void {
    this.manageChildrenSize(slot);
  }

  private manageChildrenSize(slot: HTMLSlotElement): void {
    const assignedElements = slot.assignedElements() as Button[];
    assignedElements.forEach((button) => {
      button.size = this.size;
    });
  }

  protected override render(): TemplateResult {
    return html`
      <slot @slotchange=${this.handleSlotchange}></slot>
    `;
  }
}
