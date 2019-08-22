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

import menuItemStyles from './menu-item.css';
import focusableStyles from '../shared/focusable.css';
import { defineCustomElements } from '../define';
import '../icon';
import * as MediumIcons from '../icons/icons-medium';
import { ActionButton } from '../button';

defineCustomElements(...Object.values(MediumIcons));

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

    protected firstUpdated(): void {
        super.firstUpdated();
        if (!this.hasAttribute('role')) {
            requestAnimationFrame(() => {
                const queryRoleEvent = new CustomEvent(
                    'sp-menu-item-query-role',
                    {
                        bubbles: true,
                        composed: true,
                        detail: {
                            role: '',
                        },
                    }
                );
                this.dispatchEvent(queryRoleEvent);
                this.setAttribute(
                    'role',
                    queryRoleEvent.detail.role || 'menuitem'
                );
            });
        }
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-menu-item-query-role': CustomEvent<MenuItemQueryRoleEventDetail>;
    }
}
