/**
 * Copyright 2025 Adobe. All rights reserved.
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
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/button-group/sp-button-group.js';
import '@spectrum-web-components/button/sp-close-button.js';
// NOTE: sp-divider is already imported by AlertDialog (parent class)
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared';

import { AlertDialog } from '@spectrum-web-components/alert-dialog/src/AlertDialog.js';
import { classMap } from '@spectrum-web-components/base/src/directives.js';
import type { CloseButton } from '@spectrum-web-components/button';
import styles from './dialog.css.js';

/**
 * @element sp-dialog
 *
 * @slot hero - Accepts a hero image to display at the top of the dialog
 * @slot heading - Acts as the heading of the dialog. This should be an actual heading tag `<h1-6 />`
 * @slot - Content not addressed to a specific slot will be interpreted as the main content of the dialog
 * @slot footer - Content addressed to the `footer` will be placed below the main content and to the side of any `[slot='button']` content
 * @slot button - Button elements addressed to this slot may be placed below the content when not delivered in a fullscreen mode
 * @fires close - Announces that the dialog has been closed.
 */
export class Dialog extends ObserveSlotPresence(AlertDialog, [
    '[slot="hero"]',
    '[slot="footer"]',
    '[slot="button"]',
]) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @query('.close-button')
    closeButton?: CloseButton;

    @property({ type: Boolean, reflect: true })
    public error = false;

    @property({ type: Boolean, reflect: true })
    public dismissable = false;

    @property({ type: String, reflect: true, attribute: 'dismiss-label' })
    public dismissLabel = 'Close';

    protected get hasFooter(): boolean {
        return this.getSlotContentPresence('[slot="footer"]');
    }

    protected get hasButtons(): boolean {
        return this.getSlotContentPresence('[slot="button"]');
    }

    /* c8 ignore next 3 */
    protected get hasHero(): boolean {
        return this.getSlotContentPresence('[slot="hero"]');
    }

    @property({ type: Boolean, reflect: true, attribute: 'no-divider' })
    public noDivider = false;

    @property({ type: String, reflect: true })
    public mode?: 'fullscreen' | 'fullscreenTakeover';

    @property({ type: String, reflect: true })
    public size?: 's' | 'm' | 'l';

    public close(): void {
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
    }

    protected renderHero(): TemplateResult {
        return html`
            <slot name="hero"></slot>
        `;
    }

    protected renderFooter(): TemplateResult {
        return html`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `;
    }

    protected override renderButtons(): TemplateResult {
        const classes = {
            'button-group': true,
            'button-group--noFooter': !this.hasFooter,
        };
        return html`
            <sp-button-group class=${classMap(classes)}>
                <slot name="button"></slot>
            </sp-button-group>
        `;
    }

    protected renderDismiss(): TemplateResult {
        return html`
            <sp-close-button
                class="close-button"
                label=${this.dismissLabel}
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error
                    ? html`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `
                    : nothing}
                ${this.noDivider
                    ? nothing
                    : html`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter ? this.renderFooter() : nothing}
                ${this.hasButtons ? this.renderButtons() : nothing}
                ${this.dismissable ? this.renderDismiss() : nothing}
            </div>
        `;
    }

    protected override shouldUpdate(changes: PropertyValues): boolean {
        if (changes.has('mode') && !!this.mode) {
            this.dismissable = false;
        }
        if (changes.has('dismissable') && this.dismissable) {
            this.dismissable = !this.mode;
        }
        return super.shouldUpdate(changes);
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'dialog');
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
    }
}
