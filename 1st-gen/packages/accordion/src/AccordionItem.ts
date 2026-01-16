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
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { when } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import chevronIconStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

import styles from './accordion-item.css.js';

const chevronIcon: Record<string, () => TemplateResult> = {
    s: () => html`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight75"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,
    m: () => html`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight100"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,
    l: () => html`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight200"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,
    xl: () => html`
        <span class="iconContainer">
            <sp-icon-chevron100
                class="indicator spectrum-UIIcon-ChevronRight300"
                slot="icon"
            ></sp-icon-chevron100>
        </span>
    `,
};

/**
 * @element sp-accordion-item
 * @slot - The content of the item that is hidden when the item is not open
 * @fires sp-accordion-item-toggle - Announce that an accordion item has been toggled while allowing the event to be cancelled.
 */
export class AccordionItem extends SizedMixin(Focusable, {
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles, chevronIconStyles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String, reflect: true })
    public label = '';

    @property({ type: Boolean, reflect: true })
    public override disabled = false;

    /**
     * The heading level (1-6) to use for the accordion item title.
     * Defaults to 3.
     */
    @property({ type: Number, reflect: true })
    public level: number = 3;

    public override get focusElement(): HTMLElement {
        return this.shadowRoot.querySelector('#header') as HTMLElement;
    }

    private onClick(): void {
        /* c8 ignore next 3 */
        if (this.disabled) {
            return;
        }
        this.toggle();
    }

    private toggle(): void {
        this.open = !this.open;
        const applyDefault = this.dispatchEvent(
            new CustomEvent('sp-accordion-item-toggle', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.open = !this.open;
        }
    }

    protected renderChevronIcon = (): TemplateResult => {
        return chevronIcon[this.size || 'm']();
    };

    private getHeadingLevel(): number {
        return Math.max(1, Math.min(6, this.level || 3));
    }

    private renderHeading(): TemplateResult {
        const level = this.getHeadingLevel();
        const headingContent = html`
            ${when(this.size, this.renderChevronIcon)}
            <button
                id="header"
                @click=${this.onClick}
                aria-expanded=${this.open}
                aria-controls="content"
                ?disabled=${this.disabled}
            >
                ${this.label}
            </button>
        `;

        switch (level) {
            case 1:
                return html`
                    <h1 id="heading">${headingContent}</h1>
                `;
            case 2:
                return html`
                    <h2 id="heading">${headingContent}</h2>
                `;
            case 3:
                return html`
                    <h3 id="heading">${headingContent}</h3>
                `;
            case 4:
                return html`
                    <h4 id="heading">${headingContent}</h4>
                `;
            case 5:
                return html`
                    <h5 id="heading">${headingContent}</h5>
                `;
            case 6:
                return html`
                    <h6 id="heading">${headingContent}</h6>
                `;
            default:
                return html`
                    <h3 id="heading">${headingContent}</h3>
                `;
        }
    }

    protected override render(): TemplateResult {
        return html`
            ${this.renderHeading()}
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `;
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
}
