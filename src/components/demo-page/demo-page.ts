import { html, LitElement, property } from '@polymer/lit-element';

// @ts-ignore - css generated at build time
import styles from './demo-page.css.js';

export class DemoPage extends LitElement {
    @property({ type: String })
    title = '';

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

customElements.define('demo-page', DemoPage);
