import { html, LitElement, property } from '@polymer/lit-element/lit-element';

// @ts-ignore - css generated at build time
import styles from './demo-section.css.js';

export class DemoSection extends LitElement {
    @property({ type: String })
    title = '';

    @property({ type: Boolean, reflect: true, attribute: 'show-demo-code' })
    showDemoCode = false;

    protected render() {
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

customElements.define('demo-section', DemoSection);
