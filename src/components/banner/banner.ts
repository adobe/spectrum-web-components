// @ts-ignore - css generated at build time
import bannerStyles from './banner.css.js';

export class SpectrumBanner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (!this.shadowRoot) {
            throw new Error('Failed to attach ShadowRoot!');
        }
        this.shadowRoot.innerHTML = this.render();
    }

    /**
     * Getter for type attribute
     */
    public get type(): string | null {
        return this.getAttribute('type');
    }

    /**
     * Setter for type attribute
     */
    public set type(value: string | null) {
        if (value) {
            this.setAttribute('type', value);
        } else {
            this.removeAttribute('type');
        }
    }

    private render() {
        return /* html */ `
            <style>
                ${bannerStyles}
            </style>
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `;
    }
}

if (!customElements.get('spectrum-banner')) {
    customElements.define('spectrum-banner', SpectrumBanner);
}
