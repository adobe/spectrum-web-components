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

import {
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
    html,
} from 'lit-element';
import { Dropdown } from '../dropdown';
import actionMenuStyles from './action-menu.css';
import { nothing } from 'lit-html';

/**
 * @slot options - The menu with options that will display when the dropdown is open
 */
export class ActionMenu extends Dropdown {
    public static get styles(): CSSResultArray {
        return [...super.styles, actionMenuStyles];
    }

    @property({ type: String })
    public label = '';

    @property({ type: Boolean, reflect: true })
    public selected: boolean = false;

    protected listRole: string = 'menu';
    protected itemRole: string = 'menuitem';

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <svg
                    viewBox="0 0 36 36"
                    class="spectrum-Icon"
                    focusable="false"
                    aria-hidden="true"
                >
                    <circle cx="17.8" cy="18.2" r="3.4"></circle>
                    <circle cx="29.5" cy="18.2" r="3.4"></circle>
                    <circle cx="6.1" cy="18.2" r="3.4"></circle>
                </svg>
                ${this.label
                    ? html`
                          <div id="label">${this.label}</div>
                      `
                    : nothing}
            `,
        ];
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('open')) {
            this.selected = this.open;
        }
        if (changedProperties.has('quiet')) {
            this.quiet = true;
        }
        if (changedProperties.has('invalid')) {
            this.invalid = false;
        }
    }

    protected firstUpdated(): void {
        this.quiet = true;
    }
}
