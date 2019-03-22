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
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import { defineCustomElements, Tab } from '../index.js';

import { Tab } from './tab';

import tabDemoStyles from './tab-demo.css';

export class TabDemo extends LitElement {
    public static readonly is = 'sp-tab-demo';

    public static get styles(): CSSResultArray {
        return [tabDemoStyles];
    }

    @property()
    public checkedValue = '';

    public constructor() {
        super();
        defineCustomElements(Tab);
    }

    public onSelect(ev: Event): void {
        const target = ev.target as Element;
        if (target) {
            const value = target.getAttribute('value');
            if (value) {
                this.checkedValue = value;
            }
        }
    }

    protected render(): TemplateResult {
        return html`
            <div @click=${this.onSelect} id="tabList-vertical">
                <sp-tab value="1" ?selected=${this.checkedValue === '1'}>
                    Tab 1
                </sp-tab>

                <sp-tab value="2" ?selected=${this.checkedValue === '2'}>
                    Tab 2
                </sp-tab>

                <sp-tab value="3" ?selected=${this.checkedValue === '3'}>
                    Tab 3
                </sp-tab>
            </div>
        `;
    }
}
