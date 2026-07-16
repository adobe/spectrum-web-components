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
import { classMap } from 'lit/directives/class-map.js';

import { SlotTextController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-slot-text-host': DemoSlotTextHost;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link SlotTextController}. It reports
 * whether the default slot has meaningful content and toggles a "no label"
 * presentation when empty, mirroring how Badge and Button switch to an
 * icon-only layout. The default slot binds `handleSlotChange` so content added
 * or removed after the first render is tracked.
 */
@customElement('demo-slot-text-host')
export class DemoSlotTextHost extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      font: inherit;
    }

    .status {
      color: var(--swc-gray-700, #6d6d6d);
    }

    .label {
      padding-inline: 12px;
    }

    .label--empty {
      /* Icon-only style: tighter, symmetric padding when there is no label. */
      padding-inline: 4px;
    }
  `;

  private readonly slotText = new SlotTextController(this);

  /** Whether the default slot has meaningful content. */
  public get hasContent(): boolean {
    return this.slotText.hasContent;
  }

  protected override render(): TemplateResult {
    return html`
      <span class="status">Has content: ${this.hasContent ? 'yes' : 'no'}</span>
      <span
        class=${classMap({ label: true, 'label--empty': !this.hasContent })}
      >
        <slot @slotchange=${this.slotText.handleSlotChange}></slot>
      </span>
    `;
  }
}
