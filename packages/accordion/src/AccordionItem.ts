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
    CSSResultArray,
    html,
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import {
    classMap,
    when,
} from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import chevronIconStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

import styles from './accordion-item.css.js';

const chevronIcon: Record<string, () => TemplateResult> = {
    s: () => html`
        <sp-icon-chevron100
            class="spectrum-Accordion-itemIndicator spectrum-UIIcon-ChevronRight75"
            slot="icon"
        ></sp-icon-chevron100>
    `,
    m: () => html`
        <sp-icon-chevron100
            class="spectrum-Accordion-itemIndicator spectrum-UIIcon-ChevronRight100"
            slot="icon"
        ></sp-icon-chevron100>
    `,
    l: () => html`
        <sp-icon-chevron100
            class="spectrum-Accordion-itemIndicator spectrum-UIIcon-ChevronRight200"
            slot="icon"
        ></sp-icon-chevron100>
    `,
    xl: () => html`
        <sp-icon-chevron100
            class="spectrum-Accordion-itemIndicator spectrum-UIIcon-ChevronRight300"
            slot="icon"
        ></sp-icon-chevron100>
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
        return html`
            <span class="spectrum-Accordion-itemIconContainer">
                ${chevronIcon[this.size || 'm']()}
            </span>
        `;
    };

    protected override render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    'spectrum-Accordion-item': true,
                    'is-open': this.open && !this.disabled,
                    'is-disabled': this.disabled,
                })}
                role="presentation"
            >
                <h3 id="heading" class="spectrum-Accordion-itemHeading">
                    <button
                        id="header"
                        class="spectrum-Accordion-itemHeader"
                        @click=${this.onClick}
                        aria-expanded=${this.open ? 'true' : 'false'}
                        aria-controls="content"
                        ?disabled=${this.disabled}
                    >
                        ${this.label}
                    </button>
                    ${when(this.size, this.renderChevronIcon)}
                </h3>
                <div
                    id="content"
                    role="region"
                    aria-labelledby="header"
                    class="spectrum-Accordion-itemContent"
                >
                    <slot></slot>
                </div>
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
