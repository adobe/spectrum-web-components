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

  @query('button')
  private trigger!: HTMLButtonElement;

  private readonly pressGuard = new TriggerPressGuardController(this);

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
    } else if (!this.open && this.surface.matches(':popover-open')) {
      this.surface.hidePopover();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <button
        type="button"
        @click=${this.naive ? this.onNaiveClick : undefined}
      >
        ${this.open ? 'Close' : 'Open'} popover
      </button>
      <div
        class="surface"
        popover="auto"
        @beforetoggle=${this.onBeforeToggle}
        style="padding: 8px 12px; border: 1px solid; margin-top: 4px;"
      >
        Popover content
      </div>
    `;
  }
}
