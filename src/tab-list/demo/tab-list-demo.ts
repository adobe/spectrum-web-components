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

import { html, LitElement, property, TemplateResult } from 'lit-element';

import { defineCustomElements, Tab } from '../../index.js';

import { TabList } from '../tab-list';

export class TabListDemo extends LitElement {
    public static readonly is = 'sp-tab-list-demo';

    @property()
    public checkedColValue = '';

    @property()
    public checkedRowValue = '';

    public constructor() {
        super();
        defineCustomElements(TabList, Tab);
    }

    public onColSelect(ev: Event): void {
        const target = ev.target as Element;
        if (target) {
            const value = target.getAttribute('value');
            if (value) {
                this.checkedColValue = value;
            }
        }
    }

    public onRowSelect(ev: Event): void {
        const target = ev.target as Element;
        if (target) {
            const value = target.getAttribute('value');
            if (value) {
                this.checkedRowValue = value;
            }
        }
    }

    protected render(): TemplateResult {
        return html`
            <sp-tab-list
                @click=${this.onColSelect}
                .selected=${this.checkedColValue}
                column
            >
                <sp-tab value="1">
                    Tab 1
                </sp-tab>

                <sp-tab value="2">
                    Tab 2
                </sp-tab>

                <sp-tab value="3">
                    Tab 3
                </sp-tab>
            </sp-tab-list>
            <br />
            <sp-tab-list
                @click=${this.onRowSelect}
                .selected=${this.checkedRowValue}
                row
            >
                <sp-tab value="a">
                    Tab a
                </sp-tab>

                <sp-tab value="b">
                    Tab b
                </sp-tab>

                <sp-tab value="c">
                    Tab c
                </sp-tab>
            </sp-tab-list>
        `;
    }
}
