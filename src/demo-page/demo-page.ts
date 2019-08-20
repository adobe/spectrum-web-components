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
    html,
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import styles from './demo-page.css';

export class DemoPage extends LitElement {
    public static is = 'demo-page';

    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property()
    public title = '';

    protected render(): TemplateResult {
        return html`
            <div id="container">
                <div id="heading">
                    <div id="heading-container">
                        ${this.title &&
                            html`
                                <h1>${this.title}</h1>
                            `}
                        <slot name="heading"></slot>
                    </div>
                </div>
                <slot></slot>
            </div>
        `;
    }
}
