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
import { defineCustomElements } from '../define';
import '../icon';
import * as MediumIcons from '../icons/icons-medium';
import { ActionButton } from '../button';

defineCustomElements(...Object.values(MediumIcons));

/**
 * Spectrum Link Component
 *
 * @attr quiet - uses quiet styles or not
 * @attr over-background - uses over background styles or not
 */
export class MenuItem extends ActionButton {
    public static get styles(): CSSResultArray {
        return [menuItemStyles];
    }

    @property({ type: Number, reflect: true })
    public tabIndex = -1;

    protected get buttonContent(): TemplateResult[] {
        const content = super.buttonContent;
        if (this.selected) {
            content.push(html`
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
        this.setAttribute('role', 'menuitem');
    }
}
