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
    PropertyValues,
    html,
    query,
    ifDefined,
    SizedMixin,
    ElementSize,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/button/sp-button.js';
import { ButtonVariants } from '@spectrum-web-components/button';
import { PickerBase } from '@spectrum-web-components/picker';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import styles from './split-button.css.js';

const chevronClass = {
    s: 'spectrum-UIIcon-ChevronDown75',
    m: 'spectrum-UIIcon-ChevronDown100',
    l: 'spectrum-UIIcon-ChevronDown200',
    xl: 'spectrum-UIIcon-ChevronDown300',
};

/**
 * @element sp-split-button
 **/
type SplitButtonSize = Exclude<ElementSize, 'xxl'>;
export class SplitButton extends SizedMixin(PickerBase) {
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
        const target =
            this.type === 'more'
                ? this.menuItems[0]
                : this.menuItems.find((el) => el.selected) || this.menuItems[0];
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
                    ${this.selectedItem?.itemText || ''}
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
                    size=${this.size}
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
                    size=${this.size}
                >
                    ${this.type === 'field'
                        ? html`
                              <sp-icon-chevron100
                                  class="icon ${chevronClass[
                                      this.size as SplitButtonSize
                                  ]}"
                              ></sp-icon-chevron100>
                          `
                        : html`
                              <sp-icon-more class="icon"></sp-icon-more>
                          `}
                </sp-button>
            `,
        ];
        if (this.left) {
            buttons.reverse();
        }
        return html`
            ${buttons} ${this.renderPopover}
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('value')) {
            this.manageSplitButtonItems();
        }
    }

    protected manageSelection(): void {
        super.manageSelection();
        this.manageSplitButtonItems();
    }

    private async manageSplitButtonItems(): Promise<void> {
        if (this.menuItems.length) {
            if (this.type === 'more') {
                this.menuItems[0].hidden = true;
                this.menuItems.forEach((el) => (el.selected = false));
                this.menuItems[0].selected = true;
                this.selectedItem = this.menuItems[0];
            } else {
                this.selectedItem = this.selectedItem || this.menuItems[0];
                this.selectedItem.selected = true;
            }
            return;
        }
        await this.updateComplete;
        if (this.menuItems.length) {
            this.manageSplitButtonItems();
        }
    }
}
