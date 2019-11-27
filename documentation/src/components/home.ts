import { html, CSSResultArray } from 'lit-element';
import { LayoutElement } from './layout';
import componentStyles from './markdown.css';
import homeStyles from './home.css';

class HomeElement extends LayoutElement {
    public static get styles(): CSSResultArray {
        return [super.styles, componentStyles, homeStyles];
    }

    renderContent() {
        return html`
            <section id="hero">
                <div class="spectrum-Article">
                    <h1 class="spectrum-Heading1--display">
                        Meet Spectrum Web Components
                    </h1>
                </div>
                <p class="spectrum-Body3">
                    The Spectrum Web Components project is an implementation of
                    Adobe's
                    <a class="spectrum-Link" href="https://spectrum.adobe.com/">
                        Spectrum design system
                    </a>
                    that is designed to work with any web framework, or even
                    without one.
                </p>
                <div id="hero-buttons">
                    <sp-button
                        href="https://github.com/adobe/spectrum-web-components"
                        variant="secondary"
                    >
                        Github
                    </sp-button>
                </div>
            </section>
            <hr class="spectrum-Rule spectrum-Rule--large" />
            <section id="features">
                <div class="feature">
                    <h2 class="spectrum-Heading spectrum-Heading--pageTitle">
                        Standards Based
                    </h2>
                    <p class="spectrum-Body3">
                        <a
                            class="spectrum-Link"
                            href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
                        >
                            Web Components
                        </a>
                        are set of technologies that work together to allow you
                        create custom elements that work just like the standard
                        HTML elements that are built into your browser.
                    </p>
                </div>
                <div class="feature">
                    <h2 class="spectrum-Heading spectrum-Heading--pageTitle">
                        Light Weight
                    </h2>
                    <p class="spectrum-Body3">
                        The Spectrum Web Components are implemented using the
                        <a
                            class="spectrum-Link"
                            href="https://lit-element.polymer-project.org/"
                        >
                            LitElement
                        </a>
                        framework. LitElement is designed for creating Web
                        Components with a minimum amount of overhead.
                    </p>
                </div>
                <div class="feature">
                    <h2 class="spectrum-Heading spectrum-Heading--pageTitle">
                        Framework Agnostic
                    </h2>
                    <p class="spectrum-Body3">
                        Because Web Components are supported and encapsulated at
                        the browser level, you can use them with any framework.
                    </p>
                </div>
            </section>
            <section id="example">
                <h2 class="spectrum-Heading spectrum-Heading--pageTitle">
                    Example
                </h2>
                <code-example class="language-html">
                    &lt;sp-button variant='cta'&gt;Click Here&lt;/sp-button&gt;
                </code-example>
            </section>
        `;
    }
}
customElements.define('docs-home', HomeElement);
