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

import { stripIndent } from 'common-tags';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// UGLY-HACK: workaround incompatibility of prismjs with es-modules
import 'prismjs'; // import the dependency, it'll be added to window.Prism
declare var Prism: typeof import('prismjs'); // tell typescript about the types

import styles from './demo-code.css';

export class DemoCode extends LitElement {
    public static is = 'demo-code';

    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property()
    public language = 'html';

    @property()
    public caption = '';

    @property({ type: Boolean, reflect: true, attribute: 'hide-code' })
    public hideCode = false;

    private highlightedCode = '';

    protected render(): TemplateResult {
        const caption = html`
            <div id="caption" @click=${this.toggleCode}>
                ${this.caption}
                <div id="caption-icon">
                    ${this.hideCode
                        ? html`
                              &#x25BE;
                          `
                        : html`
                              &#x25B4;
                          `}
                </div>
            </div>
        `;
        // don't prettier format next block because we don't want whitespace injection
        // prettier-ignore
        const codeBlock = html`
            <pre><code class="language-${this.language}">${unsafeHTML(this.highlightedCode)}</code></pre>
        `;
        return html`
            <div id="container">
                ${this.caption && caption} ${codeBlock}
                <slot name="code" @slotchange=${this.codeHandler}></slot>
            </div>
        `;
    }
    private toggleCode(): void {
        this.hideCode = !this.hideCode;
    }
    private codeHandler(evt: Event): void {
        const slot = evt.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        if (nodes.length > 0) {
            const codeTemplate = nodes[0] as HTMLTemplateElement;
            let codeString = stripIndent`${codeTemplate.innerHTML}`;
            // fix boolean attributes, innerHTML adds empty string assignment
            codeString = codeString.replace('=""', '');
            const code = Prism.highlight(
                codeString,
                Prism.languages.html,
                'html'
            );

            const oldCode = this.highlightedCode;
            this.highlightedCode = code;
            this.requestUpdate('highlightedCode', oldCode);
        }
    }
}
