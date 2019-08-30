/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, property, CSSResultArray, TemplateResult } from 'lit-element';

import menuItemStyles from './menu-item.css.js';
import focusableStyles from '../shared/focusable.css.js';
import '@spectrum-web-components/icon';
import '@spectrum-web-components/icons';
import { ActionButton } from '@spectrum-web-components/button';

export interface MenuItemQueryRoleEventDetail {
    role: string;
}

/**
 * Spectrum Menu Item Component
 * @element sp-menu-item
 */
export class MenuItem extends ActionButton {
    public static get styles(): CSSResultArray {
        return [focusableStyles, menuItemStyles];
    }

    @property({ type: Number, reflect: true })
    public tabIndex = -1;

    protected get buttonContent(): TemplateResult[] {
        const content = super.buttonContent;
        if (this.selected) {
            content.push(html`
                <sp-icons-medium></sp-icons-medium>
                <sp-icon
                    id="selected"
                    name="ui:CheckmarkMedium"
                    size="s"
                    slot="icon"
                ></sp-icon>
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
