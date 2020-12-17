/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
    query,
    ifDefined,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/rule/sp-rule.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import crossStyles from '@spectrum-web-components/icon/src/spectrum-icon-cross.css.js';
import '@spectrum-web-components/icon/sp-icon.js';
import { Cross500Icon } from '@spectrum-web-components/icons-ui';
import { AlertIcon } from '@spectrum-web-components/icons-workflow';
import { ObserveSlotPresence } from '@spectrum-web-components/shared';

import styles from './dialog.css.js';

/**
 * @element sp-dialog
 *
 * @fires close - Announces that the dialog has been closed.
 */
export class Dialog extends ObserveSlotPresence(SpectrumElement, [
    '[slot="hero"]',
    '[slot="footer"]',
    '[slot="button"]',
]) {
    public static get styles(): CSSResultArray {
        return [styles, crossStyles];
    }

    @query('.content')
    private contentElement!: HTMLDivElement;

    @property({ type: Boolean, reflect: true })
    public error = false;

    @property({ type: Boolean, reflect: true })
    public dismissable = false;

    protected get hasFooter(): boolean {
        return this.getSlotContentPresence('[slot="footer"]');
    }

    protected get hasButtons(): boolean {
        return this.getSlotContentPresence('[slot="button"]');
    }

    protected get hasHero(): boolean {
        return this.getSlotContentPresence('[slot="hero"]');
    }

    @property({ type: Boolean, reflect: true, attribute: 'no-divider' })
    public noDivider = false;

    @property({ type: String, reflect: true })
    public mode?: 'fullscreen' | 'fullscreenTakeover';

    @property({ type: String, reflect: true })
    public size?: 'small' | 'medium' | 'large' | 'alert';

    public focus(): void {
        if (this.shadowRoot) {
            const firstFocusable = this.shadowRoot.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [focusable]'
            ) as SpectrumElement;
            if (firstFocusable) {
                if (firstFocusable.updateComplete) {
                    firstFocusable.updateComplete.then(() =>
                        firstFocusable.focus()
                    );
                    /* c8 ignore next 3 */
                } else {
                    firstFocusable.focus();
                }
                this.removeAttribute('tabindex');
            }
            /* c8 ignore next 3 */
        } else {
            super.focus();
        }
    }

    public close(): void {
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
            })
        );
    }

    protected render(): TemplateResult {
        return html`
            <div class="grid">
                <slot name="hero"></slot>
                <slot
                    name="heading"
                    class=${ifDefined(this.hasHero ? this.hasHero : undefined)}
                ></slot>
                ${this.error
                    ? html`
                          <sp-icon class="type-icon">
                              ${AlertIcon({ hidden: true })}
                          </sp-icon>
                      `
                    : html``}
                ${this.noDivider
                    ? html``
                    : html`
                          <sp-rule size="m" class="divider"></sp-rule>
                      `}
                <div class="content">
                    <slot @slotchange=${this.onContentSlotChange}></slot>
                </div>
                ${this.hasFooter
                    ? html`
                          <div class="footer">
                              <slot name="footer"></slot>
                          </div>
                      `
                    : html``}
                ${this.hasButtons
                    ? html`
                          <sp-button-group
                              class="buttonGroup ${this.hasFooter
                                  ? ''
                                  : 'buttonGroup--noFooter'}"
                          >
                              <slot name="button"></slot>
                          </sp-button-group>
                      `
                    : html``}
                ${this.dismissable
                    ? html`
                          <sp-action-button
                              class="close-button"
                              label="Close"
                              quiet
                              size="m"
                              @click=${this.close}
                          >
                              <sp-icon
                                  class="spectrum-UIIcon-Cross500"
                                  size="m"
                                  slot="icon"
                              >
                                  ${Cross500Icon()}
                              </sp-icon>
                          </sp-action-button>
                      `
                    : html``}
            </div>
        `;
    }

    private shouldManageTabOrderForScrolling = (): void => {
        const { offsetHeight, scrollHeight } = this.contentElement;
        if (offsetHeight < scrollHeight) {
            this.contentElement.tabIndex = 0;
        } else {
            this.contentElement.removeAttribute('tabindex');
        }
    };

    protected onContentSlotChange(): void {
        this.shouldManageTabOrderForScrolling();
    }

    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener(
            'resize',
            this.shouldManageTabOrderForScrolling
        );
    }

    public disconnectedCallback(): void {
        window.removeEventListener(
            'resize',
            this.shouldManageTabOrderForScrolling
        );
        super.disconnectedCallback();
    }
}
