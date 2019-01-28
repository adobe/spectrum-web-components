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

import { html, LitElement, property } from 'lit-element';

import styles from './demo-section.css.js';

export class DemoSection extends LitElement {
    public static is = 'demo-section';

    public static get styles() {
        return [styles];
    }

    @property()
    public title = '';

    @property({ type: Boolean, reflect: true, attribute: 'show-demo-code' })
    public showDemoCode = false;

    protected render() {
        return html`
            <div id="container">
                <h2>${this.title}</h2>
                <div id="description"><slot name="description"></slot></div>
                <div id="demo-container">
                    <div id="demo">
                        <slot
                            name="demo"
                            @slotchange="${(e: Event) => this.codeHandler(e)}"
                        ></slot>
                    </div>
                    <a
                        id="code-toggle"
                        @click="${(e: Event) => this.toggleDemoCode(e)}"
                    >
                        ${this.showDemoCode ? 'hide code' : 'show code'}
                    </a>
                    <demo-code id="demo-code" language="html">
                        <template slot="code" id="code-target"></template>
                    </demo-code>
                </div>
            </div>
        `;
    }
    private toggleDemoCode(evt: Event) {
        this.showDemoCode = !this.showDemoCode;
    }
    private codeHandler(evt: Event) {
        const slot = evt.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        let demoCode = '';
        nodes.forEach((node) => {
            const nodeCode = (node as HTMLElement).innerHTML;
            demoCode += nodeCode;
        });
        const root = this.shadowRoot;
        if (root) {
            // NOTE: we're doing direct injection here because using lit-html expansion would cause comments
            // to appear in the output example
            const target = root.querySelector('#code-target');
            if (target) {
                target.innerHTML = demoCode;
            }
        }
    }
}
