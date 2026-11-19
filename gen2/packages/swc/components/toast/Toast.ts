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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  SWC_TOAST_ACTION_EVENT,
  SWC_TOAST_EXPAND_EVENT,
  ToastBase,
} from '@adobe/spectrum-wc-core/components/toast/index.js';

import '@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js';
import '@adobe/spectrum-wc-icons/swc-icon-checkmark-circle.js';
import '@adobe/spectrum-wc-icons/swc-icon-info-circle.js';
import '../action-button/swc-action-button.js';
import '../button/swc-button.js';
import '../close-button/swc-close-button.js';
import '../ui-icons/swc-ui-icon.js';

import styles from './toast.css';

/**
 * A toast displays a temporary notification in response to a user action or system event.
 *
 * @element swc-toast
 * @since 2.0.0
 *
 * @slot - Toast message text.
 *
 * @cssprop --swc-toast-focus-indicator-color - Color of the focus indicator. The container sets it to white in the expanded view, for contrast against the scrim.
 *
 * @fires swc-open - Dispatched when the toast begins to open.
 * @fires swc-after-open - Dispatched after the toast finishes opening.
 * @fires swc-close - Cancelable event dispatched when the toast begins to close.
 * @fires swc-after-close - Dispatched after the toast finishes closing.
 * @fires swc-toast-action - Dispatched when the optional action button is activated.
 * @fires swc-toast-expand - Dispatched when the Show all control is activated.
 */
export class Toast extends ToastBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * @internal
   *
   * Set by the container while Show all fades out: the toast takes its shape
   * without it, and Show all leaves the layout.
   */
  @property({ attribute: false })
  public showAllLeaving = false;

  /**
   * @internal
   *
   * Set by the container when Show all was hovered as it was activated, so it
   * keeps its hover look while it fades out. It is inert by then, so `:hover`
   * no longer applies.
   */
  @property({ attribute: false })
  public showAllHovered = false;

  protected override get internalElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.swc-Toast') ?? null;
  }

  protected override get variantIcon(): Element | null {
    return this.shadowRoot?.querySelector('.swc-Toast-icon') ?? null;
  }

  protected override render(): TemplateResult {
    const action = this.actionLabel
      ? html`
          <swc-button
            class="swc-Toast-action"
            size="m"
            variant="secondary"
            fill-style="outline"
            static-color="white"
            @click=${this.requestAction}
          >
            ${this.actionLabel}
          </swc-button>
        `
      : nothing;
    const showAll = this.showAllLabel
      ? html`
          <swc-action-button
            class=${classMap({
              ['swc-Toast-showAll']: true,
              ['swc-Toast-showAll--hovered']:
                this.showAllLeaving && this.showAllHovered,
            })}
            quiet
            static-color="white"
            @click=${this.requestExpand}
          >
            <swc-ui-icon
              slot="icon"
              class=${classMap({
                ['swc-Toast-showAllIcon']: true,
                ['swc-Toast-showAllIcon--down']:
                  this.showAllDirection === 'down',
              })}
              icon="chevron"
            ></swc-ui-icon>
            ${this.showAllLabel}
          </swc-action-button>
        `
      : nothing;
    const inFooter = Boolean(this.showAllLabel) && !this.showAllLeaving;
    return html`
      <div class="swc-Toast">
        <div
          class=${classMap({
            ['swc-Toast-main']: true,
            ['swc-Toast-main--showAll']: inFooter,
          })}
        >
          <div
            class="swc-Toast-body"
            role=${ifDefined(this.announces ? 'alert' : undefined)}
            aria-atomic=${ifDefined(this.announces ? 'true' : undefined)}
          >
            ${this.contentRevealed
              ? html`
                  ${this.renderIcon()}
                  <div class="swc-Toast-text"><slot></slot></div>
                `
              : nothing}
          </div>
          ${inFooter ? nothing : action}
          ${this.showAllLabel
            ? html`
                <div
                  class=${classMap({
                    ['swc-Toast-footer']: true,
                    ['swc-Toast-footer--leaving']: this.showAllLeaving,
                  })}
                  ?inert=${this.showAllLeaving}
                >
                  ${showAll} ${inFooter ? action : nothing}
                </div>
              `
            : nothing}
        </div>
        <swc-close-button
          class="swc-Toast-close"
          size="m"
          static-color="white"
          accessible-label=${this.closeLabel || 'Close'}
          @click=${this.requestClose}
        ></swc-close-button>
      </div>
    `;
  }

  private readonly requestAction = (): void => {
    this.dispatchEvent(
      new Event(SWC_TOAST_ACTION_EVENT, { bubbles: true, composed: true })
    );
  };

  private readonly requestExpand = (): void => {
    this.dispatchEvent(
      new Event(SWC_TOAST_EXPAND_EVENT, { bubbles: true, composed: true })
    );
  };

  private renderIcon(): TemplateResult | typeof nothing {
    const accessibleLabel = this.variantIconLabel || undefined;
    switch (this.variant) {
      case 'info':
        return html`
          <swc-icon-info-circle
            class="swc-Toast-icon"
            size="m"
            accessible-label=${ifDefined(accessibleLabel)}
          ></swc-icon-info-circle>
        `;
      case 'positive':
        return html`
          <swc-icon-checkmark-circle
            class="swc-Toast-icon"
            size="m"
            accessible-label=${ifDefined(accessibleLabel)}
          ></swc-icon-checkmark-circle>
        `;
      case 'negative':
        return html`
          <swc-icon-alert-triangle
            class="swc-Toast-icon"
            size="m"
            accessible-label=${ifDefined(accessibleLabel)}
          ></swc-icon-alert-triangle>
        `;
      default:
        return nothing;
    }
  }
}
