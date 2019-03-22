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

import tabListStyles from './tab-list.css';

export class TabList extends LitElement {
    public static readonly is = 'sp-tab-list';

    public static get styles(): CSSResultArray {
        return [tabListStyles];
    }

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Number, reflect: true })
    public value = '';

    @property()
    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
