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
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { ButtonVariants } from '@spectrum-web-components/button';
import { DropdownBase } from '@spectrum-web-components/dropdown';
import {
    ChevronDownMediumIcon,
    MoreIcon,
} from '@spectrum-web-components/icons-ui';
import buttonBaseStyles from '@spectrum-web-components/button/src/button-base.css.js';
import buttonStyles from '@spectrum-web-components/button/src/button.css.js';
import ChevronDownMediumStyle from '@spectrum-web-components/icon/src/spectrum-icon-chevron-down-medium.css.js';
import styles from './split-button.css.js';

/**
 * @slot options - The menu with options that will display when the dropdown is open
 */
export class SplitButton extends DropdownBase {
    public static get styles(): CSSResultArray {
        return [buttonBaseStyles, buttonStyles, styles, ChevronDownMediumStyle];
    }

    @property({ type: Boolean, reflect: true })
    public left = false;

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public variant: ButtonVariants = 'cta';

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
        /* istanbul ignore if */
        if (!this.optionsMenu) {
            return;
        }
        const target =
            this.type === 'more'
                ? this.optionsMenu.menuItems[0]
                : this.optionsMenu.menuItems.find((el) => el.selected) ||
                  this.optionsMenu.menuItems[0];
        /* istanbul ignore else */
        if (target) {
            target.click();
        }
    }

    protected manageShiftTab(): void {
        this.addEventListener('keydown', (event) => {
            const target = event.composedPath()[0];
            if (
                target &&
                target === (this.left ? this.trigger : this.focusElement) &&
                !event.defaultPrevented &&
                event.shiftKey &&
                event.code === 'Tab'
            ) {
                this.isShiftTabbing = true;
                HTMLElement.prototype.focus.apply(this);
                setTimeout(() => (this.isShiftTabbing = false), 0);
            }
        });
    }

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <div
                    id="label"
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
                <button
                    aria-haspopup="true"
                    aria-label=${ifDefined(this.label || undefined)}
                    id="button"
                    class="button ${this.variant}"
                    @click=${this.passClick}
                    ?disabled=${this.disabled}
                >
                    ${this.buttonContent}
                </button>
            `,
            html`
                <button
                    class="button trigger ${this.variant}"
                    @blur=${this.onButtonBlur}
                    @click=${this.onButtonClick}
                    @focus=${this.onButtonFocus}
                    ?disabled=${this.disabled}
                >
                    <sp-icon
                        class="icon ${this.type === 'field'
                            ? 'chevron-down-medium'
                            : 'more-medium'}"
                    >
                        ${this.type === 'field'
                            ? ChevronDownMediumIcon({ hidden: true })
                            : MoreIcon({ hidden: true })}
                    </sp-icon>
                </button>
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
        /* istanbul ignore if */
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
        /* istanbul ignore else */
        if (this.optionsMenu.menuItems.length) {
            this.manageSplitButtonItems();
        }
    }
}
