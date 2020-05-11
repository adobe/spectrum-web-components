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
    LitElement,
    CSSResultArray,
    TemplateResult,
    property,
} from 'lit-element';

import '@spectrum-web-components/button';
import alertMediumStyles from '@spectrum-web-components/icon/lib/spectrum-icon-alert-medium.css.js';
import crossLargeStyles from '@spectrum-web-components/icon/lib/spectrum-icon-cross-large.css.js';
import '@spectrum-web-components/icon';
import {
    AlertMediumIcon,
    CrossLargeIcon,
} from '@spectrum-web-components/icons-ui';

import styles from './dialog.css.js';

/**
 * @element sp-dialog
 *
 * @fires close - Announces that the dialog has been closed.
 */
export class Dialog extends LitElement {
    public static get styles(): CSSResultArray {
        return [styles, alertMediumStyles, crossLargeStyles];
    }

    @property({ type: Boolean, reflect: true })
    public error = false;

    @property({ type: Boolean, reflect: true })
    public dismissible = false;

    @property({ type: Boolean, reflect: true, attribute: 'no-divider' })
    public noDivider = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String, reflect: true })
    public mode?: 'fullscreen' | 'fullscreenTakeover';

    @property({ type: String, reflect: true })
    public size?: 'small' | 'medium' | 'large' | 'alert';

    public close(): void {
        this.open = false;
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
            })
        );
    }

    private get hasFooter(): boolean {
        return !!this.querySelector('[slot="footer"]');
    }

    protected render(): TemplateResult {
        return html`
            <slot name="hero"></slot>
            <div class="header">
                <slot name="title"></slot>
                ${this.error
                    ? html`
                          <sp-icon class="type-icon alert-medium" size="s">
                              ${AlertMediumIcon({ hidden: true })}
                          </sp-icon>
                      `
                    : html``}
                ${this.dismissible
                    ? html`
                          <sp-action-button
                              class="close-button"
                              label="Close"
                              quiet
                              @click=${this.close}
                          >
                              <sp-icon class="cross-large">
                                  ${CrossLargeIcon({ hidden: true })}
                              </sp-icon>
                          </sp-action-button>
                      `
                    : html``}
                ${this.mode
                    ? html`
                          <slot name="button"></slot>
                      `
                    : html``}
            </div>
            <div class="content">
                <slot></slot>
            </div>
            ${!this.mode || this.hasFooter
                ? html`
                      <div class="footer">
                          <slot name="footer"></slot>
                          ${!this.mode
                              ? html`
                                    <slot name="button"></slot>
                                `
                              : html``}
                      </div>
                  `
                : html``}
        `;
    }
}
