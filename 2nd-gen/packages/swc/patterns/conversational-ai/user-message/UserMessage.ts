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

import { CSSResultArray, html, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './user-message.css';

/**
 * User-authored conversation bubble for conversational AI pattern exploration.
 *
 * @element swc-user-message
 * @slot - Message content. Slotted `swc-upload-artifact[type]` drives bubble layout inference.
 */
export class UserMessage extends SpectrumElement {
  @state()
  private _contentKind: 'copy' | 'card' | 'media' = 'copy';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _elementHasArtifactType(
    element: Element,
    type: 'card' | 'media'
  ): boolean {
    if (element.matches(`swc-upload-artifact[type="${type}"]`)) {
      return true;
    }
    return element.querySelector(`swc-upload-artifact[type="${type}"]`) !== null;
  }

  private _inferContentKind(slot?: HTMLSlotElement): 'copy' | 'card' | 'media' {
    const defaultSlot =
      slot ?? this.shadowRoot?.querySelector<HTMLSlotElement>('slot');
    const assigned = defaultSlot?.assignedElements({ flatten: true }) ?? [];

    if (
      assigned.some((element) =>
        this._elementHasArtifactType(element, 'media')
      )
    ) {
      return 'media';
    }

    if (
      assigned.some((element) =>
        this._elementHasArtifactType(element, 'card')
      )
    ) {
      return 'card';
    }

    return 'copy';
  }

  private _syncContentKind(slot?: HTMLSlotElement): void {
    const nextKind = this._inferContentKind(slot);
    if (nextKind === this._contentKind) {
      return;
    }

    this._contentKind = nextKind;
    this.requestUpdate();
  }

  private _handleDefaultSlotChange(event: Event): void {
    this._syncContentKind(event.target as HTMLSlotElement);
  }

  protected override firstUpdated(): void {
    this._syncContentKind();
  }

  protected override updated(): void {
    this.setAttribute('data-content-kind', this._contentKind);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-UserMessage">
        <slot @slotchange=${this._handleDefaultSlotChange}></slot>
      </div>
    `;
  }
}
