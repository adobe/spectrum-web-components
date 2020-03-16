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
    LitElement,
    html,
    customElement,
    TemplateResult,
    CSSResultArray,
    property,
    css,
} from 'lit-element';
import * as Prism from 'prismjs';
import { toHtmlTemplateString } from '../utils/templates.js';
import DarkThemeStyles from 'prismjs/themes/prism-okaidia.css';
import LightThemeStyles from 'prismjs/themes/prism.css';
import Styles from './code-example.css';
import { stripIndent } from 'common-tags';

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
        return [DarkThemeStyles];
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
            `,
        ];
    }
}

@customElement('code-example')
export class CodeExample extends LitElement {
    @property()
    protected codeTheme: 'dark' | 'light' = 'light';

    public static get styles(): CSSResultArray {
        return [Styles];
    }

    public get code(): string {
        return stripIndent`${this.textContent}` || '';
    }

    public get language(): 'markup' | 'javascript' {
        if (this.classList.contains('language-javascript')) {
            return 'javascript';
        }
        return 'markup';
    }

    public get showDemo() {
        return this.classList.contains('language-html');
    }

    private get highlightedCode(): TemplateResult {
        const highlightedHtml = Prism.highlight(
            this.code,
            Prism.languages[this.language],
            this.language
        );

        if (this.codeTheme === 'dark') {
            return html`
                <dark-code .code=${highlightedHtml}></dark-code>
            `;
        }
        return html`
            <light-code .code=${highlightedHtml}></light-code>
        `;
    }

    private get renderedCode(): TemplateResult {
        return toHtmlTemplateString(this.code);
    }

    protected render(): TemplateResult {
        return html`
            ${this.showDemo
                ? html`
                      <div id="demo">
                          ${this.renderedCode}
                      </div>
                  `
                : undefined}
            <div id="markup">
                ${this.highlightedCode}
            </div>
        `;
    }
}
