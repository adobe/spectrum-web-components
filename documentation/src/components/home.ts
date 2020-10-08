import { html, CSSResultArray } from 'lit-element';
import { RouteComponent } from './route-component';
import componentStyles from './markdown.css';
import homeStyles from './home.css';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/rule/sp-rule.js';

class HomeElement extends RouteComponent {
    public static get styles(): CSSResultArray {
        return [componentStyles, homeStyles];
    }

    render() {
        // prettier-ignore
        return html`
            <section id="hero">
                <div class="spectrum-Article">
                    <h1 class="spectrum-Heading spectrum-Heading--XXXL spectrum-Heading--serif">
                        Spectrum Web Components
                    </h1>
                </div>
                <p class="spectrum-Body spectrum-Body--XL">
                    The Spectrum Web Components project is an implementation of <sp-link
                    href="https://spectrum.adobe.com/">Spectrum, Adobe’s design system</sp-link
                    >. It's designed to work with any web framework — or even
                    without one.
                </p>
                <div id="hero-buttons">
                    <sp-button
                        href="https://github.com/adobe/spectrum-web-components"
                        variant="primary"
                    >
                        View on GitHub
                    </sp-button>
                </div>
            </section>
            <section id="features">
                <div class="feature">
                    <h2 class="spectrum-Heading spectrum-Heading--S">
                        Standards based
                    </h2>
                    <p class="spectrum-Body spectrum-Body--M">
                        <sp-link
                            href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
                        >
                            Web Components
                        </sp-link>
                        are a set of technologies that work together, letting
                        you create custom elements that work just like the
                        standard HTML elements built into your browser.
                    </p>
                </div>
                <div class="feature">
                    <h2 class="spectrum-Heading spectrum-Heading--S">
                        Light weight
                    </h2>
                    <p class="spectrum-Body spectrum-Body--M">
                        Spectrum Web Components are implemented using the
                        <sp-link
                            href="https://lit-element.polymer-project.org/"
                        >
                            LitElement
                        </sp-link>
                        base class. LitElement is designed for creating web
                        components with a minimum amount of overhead.
                    </p>
                </div>
                <div class="feature">
                    <h2 class="spectrum-Heading spectrum-Heading--S">
                        Framework agnostic
                    </h2>
                    <p class="spectrum-Body spectrum-Body--M">
                        You can use web components with any framework, since
                        they’re supported and encapsulated at the browser level.
                    </p>
                </div>
            </section>
            <section id="example" class="spectrum-Typography">
                <div class="headerContainer">
                    <h2 class="spectrum-Heading2">
                        Sample element usage
                    </h2>
                    <sp-rule size="large"></sp-rule>
                </div>
                <code-example class="language-html">
                    &lt;sp-button variant='cta' href='components/button'&gt;Use
                    Spectrum Web Component buttons&lt;/sp-button&gt;
                </code-example>
            </section>
        `;
    }
}
customElements.define('docs-home', HomeElement);
