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
import { when } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import chevronIconStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import chevronIconOverrides from '@spectrum-web-components/icon/src/icon-chevron-overrides.css.js';
import styles from './accordion-item.css.js';

/**
 * A mapping of size keys to functions that return the corresponding chevron icon template.
 * The chevron icon indicates the open/closed state of the accordion item.
 */
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
 * The `<sp-accordion-item>` element represents a single item in an `<sp-accordion>` parent element. Its label attribute and default
 * slot content make up the "headline" and "body" of the toggleable content item.
 *
 * @element sp-accordion-item
 *
 * @slot - The content of the item that is hidden when the item is not open
 *
 * @fires sp-accordion-item-toggle - Announce that an accordion item has been toggled while allowing the event to be cancelled.
 */
export class AccordionItem extends SizedMixin(Focusable, {
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles, chevronIconStyles, chevronIconOverrides];
    }

    /**
     * Indicates whether the accordion item is open to display its contents.
     * When true, the contents are visible; otherwise, they are hidden.
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * The label for the accordion heading.
     * This is displayed as the title of the accordion item.
     */
    @property({ type: String, reflect: true })
    public label = '';

    /**
     * Indicates whether the accordion item's heading can be used to toggle open or closed.
     * When true, the heading is disabled and cannot be interacted with.
     */
    @property({ type: Boolean, reflect: true })
    public override disabled = false;

    /**
     * Returns the element that should receive focus when the accordion item is focused.
     * In this case, it is the header element.
     */
    public override get focusElement(): HTMLElement {
        return this.shadowRoot.querySelector('#header') as HTMLElement;
    }

    /**
     * Handles the click event on the accordion item's header.
     * Toggles the open state of the accordion item if it is not disabled.
     */
    private onClick(): void {
        if (this.disabled) {
            return;
        }

        this.toggle();
    }

    /**
     * Toggles the open state of the accordion item.
     * Dispatches a custom event 'sp-accordion-item-toggle' to notify listeners of the toggle action.
     * If the event is canceled, the open state is reverted.
     */
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

    /**
     * Renders the chevron icon based on the size of the accordion item.
     */
    protected renderChevronIcon = (): TemplateResult => {
        return chevronIcon[this.size || 'm']();
    };

    /**
     * Renders the accordion item template.
     * Includes the heading with a button to toggle the open state and a content area for the item details.
     */
    protected override render(): TemplateResult {
        return html`
            <h3 id="heading">
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
            </h3>
            <div id="content" role="region" aria-labelledby="header">
                <slot></slot>
            </div>
        `;
    }

    /**
     * Updates the 'aria-disabled' attribute based on the disabled property.
     */
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
