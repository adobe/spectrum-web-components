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
    property,
    CSSResultArray,
    TemplateResult,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/icon/sp-icon.js';
import { CheckmarkMediumIcon } from '@spectrum-web-components/icons-ui';
import { ActionButton } from '@spectrum-web-components/button';

import menuItemStyles from './menu-item.css.js';
import focusableStyles from '@spectrum-web-components/shared/src/focusable.css.js';
import checkmarkMediumStyles from '@spectrum-web-components/icon/src/spectrum-icon-checkmark-medium.css.js';

export interface MenuItemQueryRoleEventDetail {
    role: string;
}

/**
 * Spectrum Menu Item Component
 * @element sp-menu-item
 */
export class MenuItem extends ActionButton {
    public static get styles(): CSSResultArray {
        return [focusableStyles, menuItemStyles, checkmarkMediumStyles];
    }

    @property({ type: Number, reflect: true })
    public tabIndex = -1;

    private _value = '';

    @property({ type: String })
    public get value(): string {
        return this._value || this.itemText;
    }
    public set value(value: string) {
        if (value === this._value) {
            return;
        }
        this._value = value || '';
        if (this._value) {
            this.setAttribute('value', this._value);
        } else {
            this.removeAttribute('value');
        }
    }

    /**
     * Hide this getter from web-component-analyzer until
     * https://github.com/runem/web-component-analyzer/issues/131
     * has been addressed.
     *
     * @private
     */
    public get itemText(): string {
        return (this.textContent || /* istanbul ignore next */ '').trim();
    }

    protected get buttonContent(): TemplateResult[] {
        const content = super.buttonContent;
        if (this.selected) {
            content.push(html`
                <sp-icon
                    id="selected"
                    size="s"
                    slot="icon"
                    class="checkmark-medium"
                >
                    ${CheckmarkMediumIcon({ hidden: true })}
                </sp-icon>
            `);
        }
        return content;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            const queryRoleEvent = new CustomEvent('sp-menu-item-query-role', {
                bubbles: true,
                composed: true,
                detail: {
                    role: '',
                },
            });
            this.dispatchEvent(queryRoleEvent);
            this.setAttribute('role', queryRoleEvent.detail.role || 'menuitem');
        }
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-menu-item-query-role': CustomEvent<MenuItemQueryRoleEventDetail>;
    }
}
