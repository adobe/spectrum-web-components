import { html, LitElement, property } from '@polymer/lit-element';
import { stripIndent } from 'common-tags';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// UGLY-HACK: workaround incompatibility of prismjs with es-modules
import 'prismjs'; // import the dependency, it'll be added to window.Prism
declare var Prism: typeof import('prismjs'); // tell typescript about the types

// @ts-ignore - css generated at build time
import styles from './demo-code.css.js';

export class DemoCode extends LitElement {
    @property({ type: String })
    language = 'html';

    @property({ type: String })
    caption = '';

    @property({ type: Boolean, reflect: true, attribute: 'hide-code' })
    hideCode = false;

    private highlightedCode = '';

    protected render() {
        const caption = html`
            <div id="caption" @click="${(e: Event) => this.toggleCode()}">
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
        const codeBlock = html`
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
                    @slotchange="${(e: Event) => this.codeHandler(e)}"
                ></slot>
            </div>
        `;
    }
    private toggleCode() {
        this.hideCode = !this.hideCode;
    }
    private codeHandler(evt: Event) {
        const slot = evt.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        if (nodes.length > 0) {
            const codeTemplate = nodes[0] as HTMLTemplateElement;
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

customElements.define('demo-code', DemoCode);
