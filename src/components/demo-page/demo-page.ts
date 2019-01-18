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

import { html, LitElement, property } from '@polymer/lit-element';

// @ts-ignore - css generated at build time
import styles from './demo-page.css.js';

export class DemoPage extends LitElement {
    public static is = 'demo-page';

    @property({ type: String })
    public title = '';

    protected render() {
        return html`
            <style>
                ${styles}
            </style>
            <div id="container">
                <div id="heading">
                    <div id="heading-container">
                        ${
                            this.title &&
                                html`
                                    <h1>${this.title}</h1>
                                `
                        }
                        <slot name="heading"></slot>
                    </div>
                </div>
                <slot></slot>
            </div>
        `;
    }
}
