/*
Copyright 2018 Adobe. All rights reserved.
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
    LitElement,
    property,
    TemplateResult,
    css,
    CSSResultArray,
} from 'lit-element';

import { IconsetRegistry } from '../../iconset/iconset-registry';
import { Icon } from '../../icon';
import { defineCustomElement } from '../../define';

export class IconsetTable extends LitElement {
    public static is = 'demo-iconset-table';

    public static get styles(): CSSResultArray {
        return [
            css`
                thead {
                    font-weight: bold;
                }
                td:not(:first-child) {
                    text-align: center;
                }
                td {
                    width: 80px;
                }
            `,
        ];
    }

    private registry!: IconsetRegistry;

    @property()
    public iconset?: string;

    public constructor() {
        super();
        this.registry = IconsetRegistry.getInstance();
        defineCustomElement(Icon);
    }

    protected render(): TemplateResult {
        return html`
            ${this.renderMatrix()}
        `;
    }

    private renderMatrix(): TemplateResult {
        if (!this.iconset) {
            return html`
                <div id="error">No Iconset Specified</div>
            `;
        }
        const iconsetInstance = this.registry.getIconset(this.iconset);
        if (!iconsetInstance) {
            return html`
                <div id="error">Could not find iconset '${this.iconset}'</div>
            `;
        }
        const iconNames = iconsetInstance.getIconList();
        const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];
        return html`
            <table>
                <thead>
                    <td>Icon Name</td>
                    ${sizes.map((size: string) => {
                        return html`
                            <td>${size}</td>
                        `;
                    })}
                </thead>
                <tbody>
                    ${iconNames.map((iconName: string) => {
                        return html`
                            <tr>
                                <td>${iconName}</td>
                                ${sizes.map((size: string) => {
                                    return html`
                                        <td>
                                            <sp-icon
                                                name="${this
                                                    .iconset}:${iconName}"
                                                size="${size}"
                                            ></sp-icon>
                                        </td>
                                    `;
                                })}
                            </tr>
                        `;
                    })}
                </tbody>
            </table>
        `;
    }
}
