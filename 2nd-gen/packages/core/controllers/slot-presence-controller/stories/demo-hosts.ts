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

import { css, html, LitElement, nothing, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotPresenceController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-slot-presence-host': DemoSlotPresenceHost;
    'demo-slot-presence-multi-host': DemoSlotPresenceMultiHost;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link SlotPresenceController} with a single
 * selector. It reports whether an element is slotted into `[slot="icon"]` and
 * only renders the icon container when one is present, mirroring how Badge and
 * Button gate their icon markup.
 */
@customElement('demo-slot-presence-host')
export class DemoSlotPresenceHost extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      font: inherit;
    }

    .status {
      font-variant-numeric: tabular-nums;
      color: var(--swc-gray-700, #6d6d6d);
    }

    .icon-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 18px;
      block-size: 18px;
      color: var(--swc-blue-900, #1473e6);
    }
  `;

  private readonly slotPresence = new SlotPresenceController(
    this,
    '[slot="icon"]'
  );

  /** Whether an icon is currently slotted. */
  public get hasIcon(): boolean {
    return this.slotPresence.isPresent;
  }

  protected override render(): TemplateResult {
    return html`
      <span class="status">Icon present: ${this.hasIcon ? 'yes' : 'no'}</span>
      ${this.hasIcon
        ? html`
            <span class="icon-box"><slot name="icon"></slot></span>
          `
        : nothing}
      <slot></slot>
    `;
  }
}

/**
 * @internal
 *
 * Storybook-only host demonstrating {@link SlotPresenceController} with multiple
 * selectors, read individually through `getPresence(selector)`. Mirrors how
 * LinearProgress tracks its `label` and `description` slots independently.
 */
@customElement('demo-slot-presence-multi-host')
export class DemoSlotPresenceMultiHost extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: 4px;
      font: inherit;
    }

    .status {
      color: var(--swc-gray-700, #6d6d6d);
    }
  `;

  private readonly slotPresence = new SlotPresenceController(this, [
    '[slot="label"]',
    '[slot="description"]',
  ]);

  public get hasLabel(): boolean {
    return this.slotPresence.getPresence('[slot="label"]');
  }

  public get hasDescription(): boolean {
    return this.slotPresence.getPresence('[slot="description"]');
  }

  protected override render(): TemplateResult {
    return html`
      <span class=${classMap({ status: true })}>
        Label present: ${this.hasLabel ? 'yes' : 'no'} · Description present:
        ${this.hasDescription ? 'yes' : 'no'}
      </span>
      <slot name="label"></slot>
      <slot name="description"></slot>
    `;
  }
}
