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
import { html, LitElement, property } from '@polymer/lit-element';
import { stripIndent } from 'common-tags';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
// UGLY-HACK: workaround incompatibility of prismjs with es-modules
import 'prismjs'; // import the dependency, it'll be added to window.Prism
// @ts-ignore - css generated at build time
import styles from './demo-code.css.js';
export class DemoCode extends LitElement {
    constructor() {
        super(...arguments);
        this.language = 'html';
        this.caption = '';
        this.hideCode = false;
        this.highlightedCode = '';
    }
    render() {
        const caption = html`
            <div id="caption" @click="${(e) => this.toggleCode()}">
                ${this.caption}
                <div id="caption-icon">
                    ${
                        this.hideCode
                            ? html`
                                  &#x25BE;
                              `
                            : html`
                                  &#x25B4;
                              `
                    }
                </div>
            </div>
        `;
        // don't prettier format next block because we don't want whitespace injection
        // prettier-ignore
        const codeBlock = html `
            <pre><code class="language-${this.language}">${unsafeHTML(this.highlightedCode)}</code></pre>
        `;
        return html`
            <style>
                ${styles}
            </style>
            <div id="container">
                ${this.caption && caption} ${codeBlock}
                <slot
                    name="code"
                    @slotchange="${(e) => this.codeHandler(e)}"
                ></slot>
            </div>
        `;
    }
    toggleCode() {
        this.hideCode = !this.hideCode;
    }
    codeHandler(evt) {
        const slot = evt.target;
        const nodes = slot.assignedNodes();
        if (nodes.length > 0) {
            const codeTemplate = nodes[0];
            let codeString = stripIndent`${codeTemplate.innerHTML}`;
            // fix boolean attributes, innerHTML adds empty string assignment
            codeString = codeString.replace('=""', '');
            const code = Prism.highlight(codeString, Prism.languages.html);
            const oldCode = this.highlightedCode;
            this.highlightedCode = code;
            this.requestUpdate('highlightedCode', oldCode);
        }
    }
}
__decorate(
    [property({ type: String })],
    DemoCode.prototype,
    'language',
    void 0
);
__decorate([property({ type: String })], DemoCode.prototype, 'caption', void 0);
__decorate(
    [property({ type: Boolean, reflect: true, attribute: 'hide-code' })],
    DemoCode.prototype,
    'hideCode',
    void 0
);
customElements.define('demo-code', DemoCode);

//# sourceMappingURL=demo-code.js.map
