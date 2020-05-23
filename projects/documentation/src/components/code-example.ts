/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    LitElement,
    html,
    customElement,
    TemplateResult,
    CSSResultArray,
    property,
    css,
    query,
} from 'lit-element';
import { toHtmlTemplateString } from '../utils/templates.js';
import DarkThemeStyles from 'prismjs/themes/prism-okaidia.css';
import LightThemeStyles from 'prismjs/themes/prism.css';
import Styles from './code-example.css';

class Code extends LitElement {
    @property()
    public code: string = '';

    get highlightedCode(): TemplateResult {
        return toHtmlTemplateString(this.code);
    }

    protected render(): TemplateResult {
        return html`
            <pre><code>${this.highlightedCode}</code></pre>
        `;
    }
}

@customElement('dark-code')
export class DarkCode extends Code {
    public static get styles(): CSSResultArray {
        return [
            DarkThemeStyles,
            css`
                .token.constant,
                .token.deleted,
                .token.property,
                .token.symbol,
                .token.tag {
                    color: #f9a4c3;
                }
            `,
        ];
    }
}

@customElement('light-code')
export class LightCode extends Code {
    public static get styles(): CSSResultArray {
        return [
            LightThemeStyles,
            css`
                .token.attr-name,
                .token.builtin,
                .token.char,
                .token.inserted,
                .token.selector,
                .token.string {
                    color: #567f01;
                }
                .token.punctuation {
                    color: #737373;
                }
                .language-css .token.function {
                    color: inherit;
                }
            `,
        ];
    }
}

@customElement('code-example')
export class CodeExample extends LitElement {
    @query('#markup')
    private markup?: HTMLDivElement;

    @query('.demo-example')
    private demo?: HTMLDivElement;

    @property()
    public codeTheme: 'dark' | 'light' = 'light';

    @property({ type: Boolean })
    public preprocessed = false;

    private prismjsLoaded = false;

    public static get styles(): CSSResultArray {
        return [Styles];
    }

    private get codeSlot(): Element | this {
        const code = [...(this.children || [])].find(
            (child) => child.slot === 'code'
        );
        return code || this;
    }

    public get highlightedHTML(): string {
        const el = this.codeSlot;
        return el.innerHTML || '';
    }

    public get liveHTML(): string {
        const el = this.codeSlot;
        return el.textContent || '';
    }

    public get language(): 'markup' | 'javascript' {
        if (this.classList.contains('language-javascript')) {
            return 'javascript';
        }
        return 'markup';
    }

    public get showDemo() {
        return (
            this.classList.contains('language-html') ||
            this.classList.contains('language-html-live')
        );
    }

    private get highlightedCode(): TemplateResult {
        const highlightedHTML = this.preprocessed
            ? this.highlightedHTML
            : window.Prism.highlight(
                  this.liveHTML,
                  window.Prism.languages[this.language],
                  this.language
              );

        if (this.codeTheme === 'dark') {
            return html`
                <dark-code .code=${highlightedHTML}></dark-code>
            `;
        }
        return html`
            <light-code .code=${highlightedHTML}></light-code>
        `;
    }

    private get renderedCode(): TemplateResult {
        if (this.classList.contains('language-html-live')) {
            const demo =
                this.querySelector('[slot="demo"]') ||
                document.createElement('div');
            demo.slot = 'demo';
            demo.innerHTML = this.liveHTML;
            this.append(demo);
        }
        return toHtmlTemplateString(this.liveHTML);
    }

    protected shouldUpdate(): boolean {
        if (this.preprocessed || this.prismjsLoaded) {
            return true;
        }
        if (!this.preprocessed) {
            import('prismjs').then(() => {
                this.prismjsLoaded = true;
                this.requestUpdate();
            });
        }
        return false;
    }

    protected render(): TemplateResult {
        // highlighedCode needs to happen first in case the HTML is live and
        // needs to be placed into the light DOM
        const { highlightedCode, renderedCode } = this;
        return html`
            ${this.showDemo
                ? html`
                      <div class="demo-example">
                          <slot name="demo">
                              ${renderedCode}
                          </slot>
                      </div>
                  `
                : undefined}
            <div class="markup">
                ${highlightedCode}
            </div>
        `;
    }

    private shouldManageTabOrderForScrolling = (): void => {
        [this.markup, this.demo].map((el) => {
            if (!el) return;
            const { offsetWidth, scrollWidth } = el;
            if (offsetWidth < scrollWidth) {
                el.tabIndex = 0;
            } else {
                el.removeAttribute('tabindex');
            }
        });
    };

    protected updated(): void {
        requestAnimationFrame(() => {
            this.shouldManageTabOrderForScrolling();
        });
    }

    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener(
            'resize',
            this.shouldManageTabOrderForScrolling
        );
    }

    public disconnectedCallback(): void {
        window.removeEventListener(
            'resize',
            this.shouldManageTabOrderForScrolling
        );
        super.disconnectedCallback();
    }
}
