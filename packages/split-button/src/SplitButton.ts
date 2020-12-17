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
    TemplateResult,
    property,
    html,
    PropertyValues,
    query,
    ifDefined,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/button/sp-button.js';
import { ButtonVariants } from '@spectrum-web-components/button';
import { DropdownBase } from '@spectrum-web-components/dropdown';
import { Chevron100Icon } from '@spectrum-web-components/icons-ui';
import { MoreIcon } from '@spectrum-web-components/icons-workflow';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import styles from './split-button.css.js';

/**
 * @slot options - The menu with options that will display when the dropdown is open
 */
export class SplitButton extends DropdownBase {
    public static get styles(): CSSResultArray {
        return [styles, chevronStyles];
    }

    @property({ type: Boolean, reflect: true })
    public left = false;

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public variant: ButtonVariants = 'cta';

    @property({ type: String, reflect: true })
    public size = 'm';

    public get target(): HTMLButtonElement | this {
        return this;
    }

    @property({ type: String })
    public type: 'field' | 'more' = 'field';

    @query('.trigger')
    private trigger!: HTMLButtonElement;

    protected listRole = 'menu';
    protected itemRole = 'menuitem';

    public focus(): void {
        if (this.disabled) {
            return;
        }
        if (this.left) {
            this.trigger.focus();
            return;
        }

        super.focus();
    }

    protected sizePopover(popover: HTMLElement): void {
        popover.style.setProperty('min-width', `${this.offsetWidth}px`);
    }

    private passClick(): void {
        /* c8 ignore next 3 */
        if (!this.optionsMenu) {
            return;
        }
        const target =
            this.type === 'more'
                ? this.optionsMenu.menuItems[0]
                : this.optionsMenu.menuItems.find((el) => el.selected) ||
                  this.optionsMenu.menuItems[0];
        if (target) {
            target.click();
        }
    }

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <div
                    id="label"
                    role="presentation"
                    class=${ifDefined(this.value ? undefined : 'placeholder')}
                >
                    ${this.selectedItemText}
                </div>
            `,
        ];
    }

    protected render(): TemplateResult {
        const buttons: TemplateResult[] = [
            html`
                <sp-button
                    aria-haspopup="true"
                    aria-label=${ifDefined(this.label || undefined)}
                    id="button"
                    class="button ${this.variant}"
                    @click=${this.passClick}
                    ?disabled=${this.disabled}
                    variant=${this.variant}
                >
                    ${this.buttonContent}
                </sp-button>
            `,
            html`
                <sp-button
                    class="button trigger ${this.variant}"
                    @blur=${this.onButtonBlur}
                    @click=${this.onButtonClick}
                    @focus=${this.onButtonFocus}
                    ?disabled=${this.disabled}
                    aria-label="More"
                    variant=${this.variant}
                >
                    <sp-icon
                        class="icon ${this.type === 'field'
                            ? 'spectrum-UIIcon-ChevronDown100'
                            : 'more-medium'}"
                    >
                        ${this.type === 'field'
                            ? Chevron100Icon()
                            : MoreIcon({ hidden: true })}
                    </sp-icon>
                </sp-button>
            `,
        ];
        if (this.left) {
            buttons.reverse();
        }
        return html`
            ${buttons}
            <sp-popover
                open
                id="popover"
                @click=${this.onClick}
                @sp-overlay-closed=${this.onOverlayClosed}
            ></sp-popover>
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('value')) {
            this.manageSplitButtonItems();
        }
    }

    private async manageSplitButtonItems(): Promise<void> {
        /* c8 ignore next 3 */
        if (!this.optionsMenu) {
            return;
        }
        if (this.optionsMenu.menuItems.length) {
            if (this.type === 'more') {
                this.optionsMenu.menuItems[0].hidden = true;
                this.optionsMenu.menuItems.forEach(
                    (el) => (el.selected = false)
                );
                this.optionsMenu.menuItems[0].selected = true;
                this.selectedItemText = this.optionsMenu.menuItems[0].itemText;
            } else {
                const selected =
                    this.optionsMenu.menuItems.find((el) => el.selected) ||
                    this.optionsMenu.menuItems[0];
                selected.selected = true;
                this.selectedItemText = selected.itemText;
            }
            return;
        }
        await this.optionsMenu.updateComplete;
        if (this.optionsMenu.menuItems.length) {
            this.manageSplitButtonItems();
        }
    }
}
