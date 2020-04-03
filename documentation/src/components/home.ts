import { html, CSSResultArray } from 'lit-element';
import { RouteComponent } from './route-component';
import componentStyles from './markdown.css';
import homeStyles from './home.css';
import '@spectrum-web-components/button';
import '@spectrum-web-components/link';

class HomeElement extends RouteComponent {
    public static get styles(): CSSResultArray {
        return [componentStyles, homeStyles];
    }

    render() {
        // prettier-ignore
        return html`
            <section id="hero">
                <div class="spectrum-Article">
                    <h1 class="spectrum-Heading1--display">
                        Spectrum Web Components
                    </h1>
                </div>
                <p class="spectrum-Body3">
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
                    <h2 class="spectrum-Heading4">
                        Standards based
                    </h2>
                    <p class="spectrum-Body3">
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
                    <h2 class="spectrum-Heading4">
                        Light weight
                    </h2>
                    <p class="spectrum-Body3">
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
                    <h2 class="spectrum-Heading4">
                        Framework agnostic
                    </h2>
                    <p class="spectrum-Body3">
                        You can use web components with any framework, since
                        they’re supported and encapsulated at the browser level.
                    </p>
                </div>
            </section>
            <section id="example">
                <h2 class="spectrum-Heading">
                    Sample element usage
                </h2>
                <code-example class="language-html">
                    &lt;sp-button variant='cta' href='components/button'&gt;Use
                    Spectrum Web Component buttons&lt;/sp-button&gt;
                </code-example>
            </section>
        `;
    }
}
customElements.define('docs-home', HomeElement);
