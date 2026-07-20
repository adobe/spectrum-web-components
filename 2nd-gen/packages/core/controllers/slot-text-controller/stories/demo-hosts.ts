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
    'demo-slot-text-named-host': DemoSlotTextNamedHost;
  }
}

/**
 * @internal
 *
 * Abstract base that constructs {@link SlotTextController} as a protected field,
 * exactly as the real consumers (`BadgeBase`, `ButtonBase`) do. Instantiating
 * the controller on an abstract class is safe: the field initializer runs in
 * this constructor during construction of the concrete subclass, so the
 * controller receives the concrete element as its host. The concrete subclass
 * binds `handleSlotChange` in its template — the `protected` field is reachable
 * from the subclass `render()`, mirroring how `swc-badge` / `swc-button` bind
 * the controller their abstract base owns.
 */
export abstract class AbstractSlotTextHost extends LitElement {
  protected readonly slotText = new SlotTextController(this);

  /** Whether the default slot has meaningful content. */
  public get hasContent(): boolean {
    return this.slotText.hasContent;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link SlotTextController}, driven from the
 * abstract base above. It reports whether the default slot has meaningful
 * content and toggles a "no label" presentation when empty, mirroring how Badge
 * and Button switch to an icon-only layout. The default slot binds
 * `handleSlotChange` so content added or removed after the first render is
 * tracked.
 */
@customElement('demo-slot-text-host')
export class DemoSlotTextHost extends AbstractSlotTextHost {
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

/**
 * @internal
 *
 * Storybook/test-only host that observes a **named** `label` slot. Used to
 * verify that bare text nodes (which can never carry a `slot` attribute, so are
 * only assigned to the default slot) do not count as content for a named slot —
 * only an element carrying `slot="label"` does.
 */
@customElement('demo-slot-text-named-host')
export class DemoSlotTextNamedHost extends LitElement {
  protected readonly slotText = new SlotTextController(this, {
    slotName: 'label',
  });

  /** Whether the observed `label` slot has meaningful content. */
  public get hasContent(): boolean {
    return this.slotText.hasContent;
  }

  protected override render(): TemplateResult {
    return html`
      <span class="status">Has content: ${this.hasContent ? 'yes' : 'no'}</span>
      <slot name="label" @slotchange=${this.slotText.handleSlotChange}></slot>
    `;
  }
}
