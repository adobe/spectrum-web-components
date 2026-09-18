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

import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { PlacementController } from '@adobe/spectrum-wc-core/controllers/index.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';

import { TriggerPressGuardController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-press-guard-host': DemoPressGuardHost;
  }
}

/**
 * @internal
 *
 * Storybook-only host pairing {@link TriggerPressGuardController} with a real
 * `popover="auto"` surface, so the reopen bug it prevents (and its fix) are
 * both directly observable: click the button to open the popover, then click
 * it again — with the controller wired, the popover closes; without it (see
 * `NaiveReopenBug`), the same click reopens it instead.
 *
 * Positioning uses `PlacementController` (the same Floating UI-based
 * mechanism every real anchored surface in this project uses) rather than
 * CSS anchor positioning, which silently stops resolving the anchor once
 * this story renders inside the Storybook docs page's wrapped Canvas iframe
 * — it only worked in the story's own isolated canvas.
 */
@customElement('demo-press-guard-host')
export class DemoPressGuardHost extends LitElement {
  /** Reflects the popover's open state so it's inspectable from the DOM. */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /** Uses the naive `open = !open` click handler instead of the controller. */
  @property({ type: Boolean, attribute: 'naive' })
  public naive = false;

  @query('.surface')
  private surface!: HTMLElement;

  @query('swc-button')
  private trigger!: HTMLElement;

  private readonly pressGuard = new TriggerPressGuardController(this);
  private readonly placement = new PlacementController(this);

  private readonly onNaiveClick = (): void => {
    this.open = !this.open;
  };

  private readonly onBeforeToggle = (event: ToggleEvent): void => {
    if (event.newState === 'open') {
      return;
    }
    if (this.open) {
      // Not already closed via our own setter below, so this is a genuine
      // native dismissal (Escape or an outside click).
      this.pressGuard.noteNativeDismiss();
    }
    this.open = false;
  };

  protected override firstUpdated(): void {
    if (!this.naive) {
      this.pressGuard.attach(this.trigger, {
        onToggle: () => (this.open = !this.open),
      });
    }
  }

  protected override updated(): void {
    if (this.open && !this.surface.matches(':popover-open')) {
      this.surface.showPopover();
      this.placement.start(this.trigger, this.surface, {
        placement: 'bottom-start',
        offset: 8,
      });
    } else if (!this.open && this.surface.matches(':popover-open')) {
      this.surface.hidePopover();
      this.placement.stop();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <swc-button @click=${this.naive ? this.onNaiveClick : undefined}>
        ${this.open ? 'Close' : 'Open'} popover
      </swc-button>
      <div
        class="surface"
        popover="auto"
        @beforetoggle=${this.onBeforeToggle}
        style="
          position: absolute;
          inset: auto;
          padding: 8px 12px;
          border: 1px solid;
        "
      >
        Popover content
      </div>
    `;
  }
}
