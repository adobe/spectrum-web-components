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
var __decorate =
    (this && this.__decorate) ||
    function(decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d;
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
import { html, LitElement, property } from '@polymer/lit-element/lit-element';
// @ts-ignore - css generated at build time
import styles from './demo-section.css.js';
export class DemoSection extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        this.showDemoCode = false;
    }
    render() {
        return html`
            <style>
                ${styles}
            </style>
            <div id="container">
                <h2>${this.title}</h2>
                <div id="description"><slot name="description"></slot></div>
                <div id="demo-container">
                    <div id="demo">
                        <slot
                            name="demo"
                            @slotchange="${(e) => this.codeHandler(e)}"
                        ></slot>
                    </div>
                    <a
                        id="code-toggle"
                        @click="${(e) => this.toggleDemoCode(e)}"
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
    toggleDemoCode(evt) {
        this.showDemoCode = !this.showDemoCode;
    }
    codeHandler(evt) {
        const slot = evt.target;
        const nodes = slot.assignedNodes();
        let demoCode = '';
        nodes.forEach((node) => {
            const nodeCode = node.innerHTML;
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
__decorate(
    [property({ type: String })],
    DemoSection.prototype,
    'title',
    void 0
);
__decorate(
    [property({ type: Boolean, reflect: true, attribute: 'show-demo-code' })],
    DemoSection.prototype,
    'showDemoCode',
    void 0
);
customElements.define('demo-section', DemoSection);

//# sourceMappingURL=demo-section.js.map
