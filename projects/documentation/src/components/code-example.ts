/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    CSSResultArray,
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    customElement,
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { toHtmlTemplateString } from '../utils/templates.js';
import Styles from './code-example.css';
import StylesLight from './code-example-light.css';
import StylesDark from './code-example-dark.css';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js';
import { copyNode } from './copy-to-clipboard.js';
import { TrackTheme } from './layout.js';
import { Color } from '@spectrum-web-components/theme';

@customElement('code-example')
export class CodeExample extends FocusVisiblePolyfillMixin(LitElement) {
    @query('#markup')
    private markup?: HTMLDivElement;

    @query('.demo-example')
    private demo?: HTMLDivElement;

    @property()
    public codeTheme: 'dark' | 'light' = 'light';

    @property({ type: Boolean })
    public preprocessed = false;

    @property({ type: Boolean, attribute: 'no-demo' })
    public noDemo = false;

    private prismjsLoaded = false;

    public static override get styles(): CSSResultArray {
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
        if (this.noDemo) {
            return false;
        }
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

        const code = toHtmlTemplateString(highlightedHTML);

        return html`
            <pre><code>${code}</code></pre>
        `;
    }

    private liveHTMLTransferred = false;

    private get renderedCode(): TemplateResult {
        if (
            this.classList.contains('language-html-live') &&
            !this.liveHTMLTransferred
        ) {
            const demo =
                this.querySelector('[slot="demo"]') ||
                document.createElement('div');
            demo.slot = 'demo';
            demo.innerHTML = this.liveHTML;
            this.append(demo);
            this.liveHTMLTransferred = true;
        }
        return toHtmlTemplateString(this.liveHTML);
    }

    protected override shouldUpdate(): boolean {
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

    protected override render(): TemplateResult {
        // highlighedCode needs to happen first in case the HTML is live and
        // needs to be placed into the light DOM
        const { highlightedCode, renderedCode } = this;
        return html`
            ${this.showDemo
                ? html`
                      <div class="demo-example">
                          <slot name="demo">${renderedCode}</slot>
                      </div>
                  `
                : undefined}
            <bdo class="markup" dir="ltr">
                ${highlightedCode}
                <div class="copy-holder">
                    <sp-action-button
                        class="copy"
                        @click=${this.copyToClipboard}
                        quiet
                    >
                        <sp-icon-copy slot="icon"></sp-icon-copy>
                        Copy to Clipboard
                    </sp-action-button>
                </div>
            </bdo>
            <style>
                ${this.codeTheme === 'light'
                    ? StylesLight.toString()
                    : StylesDark.toString()}
            </style>
        `;
    }

    private copyToClipboard(): void {
        copyNode(this);
    }

    private shouldManageTabOrderForScrolling = (): void => {
        [this.markup, this.demo].map((el) => {
            if (!el) {
                return;
            }
            const { offsetWidth, scrollWidth } = el;
            if (offsetWidth < scrollWidth) {
                el.tabIndex = 0;
            } else {
                el.removeAttribute('tabindex');
            }
        });
    };

    protected override updated(): void {
        setTimeout(this.shouldManageTabOrderForScrolling);
    }

    private trackTheme(): void {
        const queryThemeEvent = new CustomEvent<TrackTheme>('sp-track-theme', {
            bubbles: true,
            composed: true,
            detail: {
                callback: (color: Color) => {
                    this.codeTheme = color.startsWith('light')
                        ? 'light'
                        : 'dark';
                },
            },
            cancelable: true,
        });
        this.dispatchEvent(queryThemeEvent);
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener(
            'resize',
            this.shouldManageTabOrderForScrolling
        );
        this.trackTheme();
    }

    public override disconnectedCallback(): void {
        window.removeEventListener(
            'resize',
            this.shouldManageTabOrderForScrolling
        );
        this.trackTheme();
        super.disconnectedCallback();
    }
}
