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
    DefaultElementSize,
    html,
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
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

export type SplitButtonTypes = 'field' | 'more';

/**
 * @element sp-split-button
 *
 * @slot - menu items to be listed in the Button
 **/
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
    public variant: ButtonVariants = 'accent';

    public get target(): HTMLButtonElement | this {
        return this;
    }

    @property({ type: String })
    public type: SplitButtonTypes = 'field';

    @query('.trigger')
    private trigger!: HTMLButtonElement;

    protected listRole: 'listbox' | 'menu' = 'menu';
    protected itemRole = 'menuitem';

    public get focusElement(): HTMLElement {
        if (this.open) {
            return this.optionsMenu;
        }
        if (this.left) {
            return this.trigger;
        }
        return this.button;
    }

    protected sizePopover(popover: HTMLElement): void {
        popover.style.setProperty('min-width', `${this.offsetWidth}px`);
    }

    private passClick(): void {
        const target =
            this.type === 'more'
                ? this.menuItems[0]
                : this.selectedItem || this.menuItems[0];
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

    protected update(changes: PropertyValues<this>): void {
        if (changes.has('type')) {
            if (this.type === 'more') {
                this.selects = undefined;
            } else {
                this.selects = 'single';
            }
        }
        super.update(changes);
    }

    protected render(): TemplateResult {
        const treatment = ['cta', 'accent'].includes(this.variant)
            ? 'fill'
            : 'outline';
        const buttons: TemplateResult[] = [
            html`
                <sp-button
                    aria-label=${ifDefined(this.label || undefined)}
                    id="button"
                    class="button ${this.variant}"
                    @click=${this.passClick}
                    ?disabled=${this.disabled}
                    variant=${this.variant}
                    treatment=${treatment}
                    size=${this.size}
                >
                    ${this.buttonContent}
                </sp-button>
            `,
            html`
                <sp-button
                    aria-haspopup="true"
                    aria-expanded=${this.open ? 'true' : 'false'}
                    class="button trigger ${this.variant}"
                    @blur=${this.onButtonBlur}
                    @click=${this.onButtonClick}
                    @focus=${this.onButtonFocus}
                    ?disabled=${this.disabled}
                    aria-label="More"
                    variant=${this.variant}
                    treatment=${treatment}
                    size=${this.size}
                >
                    ${this.type === 'field'
                        ? html`
                              <sp-icon-chevron100
                                  class="icon ${chevronClass[
                                      this.size as DefaultElementSize
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
            ${buttons}
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('value')) {
            this.manageSplitButtonItems();
        }
    }

    protected async manageSelection(): Promise<void> {
        super.manageSelection();
        this.manageSplitButtonItems();
    }

    private async manageSplitButtonItems(): Promise<void> {
        if (!this.menuItems.length) {
            await this.updateComplete;
            if (!this.menuItems.length) {
                return;
            }
        }

        if (this.type === 'more') {
            this.menuItems[0].hidden = true;
            this.menuItems.forEach((el) => (el.selected = false));
            this.selectedItem = this.menuItems[0];
        } else {
            this.selectedItem = this.selectedItem || this.menuItems[0];
        }
        this.value = this.selectedItem.value;
    }
}
