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
  PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';
import { computePosition, offset } from '@floating-ui/dom';

import { HoverController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-hover-host': DemoHoverHost;
    'demo-hover-host-b': DemoHoverHostB;
  }
}

// ─────────────────────────────────────────────
//     BASE (shared logic, not a custom element)
// ─────────────────────────────────────────────

/**
 * @internal
 *
 * Shared base for Storybook-only demo hosts. Subclasses pass their `warmStateKey`
 * to the constructor so each element type has isolated warm state.
 *
 * The element registers itself as `popover="auto"` in `firstUpdated` and uses
 * Floating UI (`computePosition`) to position above its trigger whenever the
 * native `toggle` event fires with `newState === 'open'`. Placement logic beyond
 * simple top-placement is out of scope; see `PlacementController` for that.
 *
 * A short `delay` default (100 ms) is intentional so Storybook play tests can
 * verify timer-based behaviour without multi-second waits.
 */
class DemoHoverHostBase extends LitElement {
  static override styles = css`
    :host {
      position: absolute;
      inset: auto;
      margin: 0;
      padding: 8px 12px;
      color: var(--swc-gray-800);
      background: var(--swc-purple-200);
      border-radius: 4px;
      font-size: var(--swc-body-size-s);
      max-width: 25ch;
      border: 1px solid var(--swc-purple-500);
    }
  `;

  static override properties = {
    delay: { type: Number },
    closeDelay: { type: Number, attribute: 'close-delay' },
    manual: { type: Boolean },
    disabled: { type: Boolean },
    triggerId: { type: String, attribute: 'trigger-id' },
  };

  declare delay: number;
  declare closeDelay: number;
  declare manual: boolean;
  declare disabled: boolean;
  declare triggerId: string;

  private hoverController: HoverController;

  constructor(warmStateKey: string) {
    super();
    this.delay = 100;
    this.closeDelay = 300;
    this.manual = false;
    this.disabled = false;
    this.triggerId = '';
    this.hoverController = new HoverController(this, { warmStateKey });
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('popover')) {
      this.setAttribute('popover', 'auto');
    }
    this.addEventListener('toggle', (event) => {
      if ((event as ToggleEvent).newState !== 'open') {
        return;
      }
      const trigger = this.triggerId
        ? this.ownerDocument.getElementById(this.triggerId)
        : null;
      if (!trigger) {
        return;
      }
      void computePosition(trigger, this, {
        placement: 'top',
        middleware: [offset(6)],
      }).then(({ x, y }) => {
        Object.assign(this.style, { left: `${x}px`, top: `${y}px` });
      });
    });
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('triggerId')) {
      const trigger = this.triggerId
        ? this.ownerDocument.getElementById(this.triggerId)
        : null;
      this.hoverController.setTarget(trigger);
    }
  }

  // HoverControllerHost contract. This demo host has no reconciliation layer of
  // its own, so it drives the native Popover API directly, guarding against the
  // DOMException thrown when show/hidePopover is called in the wrong state.
  public requestOpen(): void {
    if (!this.matches(':popover-open')) {
      this.showPopover();
    }
  }

  public requestClose(): void {
    if (this.matches(':popover-open')) {
      this.hidePopover();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }
}

// ────────────────────────────────────────
//     CONCRETE HOSTS
// ────────────────────────────────────────

/**
 * Primary demo host used in most hover-controller stories.
 *
 * @internal
 */
@customElement('demo-hover-host')
export class DemoHoverHost extends DemoHoverHostBase {
  constructor() {
    super('demo-hover-host');
  }
}

/**
 * Second demo host with a different `warmStateKey`. Used in the multi-type
 * warm-state isolation story to confirm that warming `demo-hover-host` does not
 * accelerate `demo-hover-host-b` warm-up.
 *
 * @internal
 */
@customElement('demo-hover-host-b')
export class DemoHoverHostB extends DemoHoverHostBase {
  constructor() {
    super('demo-hover-host-b');
  }
}
