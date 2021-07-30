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

import { html, CSSResultArray } from '@spectrum-web-components/base';
import { RouteComponent } from './route-component.js';
import componentStyles from './markdown.css';
import homeStyles from './home.css';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/button-group/sp-button-group.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/divider/sp-divider.js';

class HomeElement extends RouteComponent {
    public static get styles(): CSSResultArray {
        return [componentStyles, homeStyles];
    }

    render() {
        // prettier-ignore
        return html`
            <section id="hero">
                <div class="spectrum-Article">
                    <h1 class="spectrum-Heading spectrum-Heading--sizeXXXL spectrum-Heading--serif">
                        Spectrum Web Components
                    </h1>
                </div>
                <p class="spectrum-Body spectrum-Body--sizeXXL">
                    The Spectrum Web Components project is an implementation of <sp-link
                    href="https://spectrum.adobe.com/">Spectrum, Adobe’s design system</sp-link
                    >. It's designed to work with any web framework — or even
                    without one.
                </p>
                <sp-button-group id="hero-buttons">
                    <sp-button
                        href="https://github.com/adobe/spectrum-web-components"
                        target="_blank"
                        variant="primary"
                        size="xl"
                    >
                        View on GitHub
                    </sp-button>
                </sp-button-group>
            </section>
            <section id="features">
                <div class="feature">
                    <h2 class="spectrum-Heading spectrum-Heading--sizeS">
                        Standards based
                    </h2>
                    <p class="spectrum-Body spectrum-Body--sizeM">
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
                    <h2 class="spectrum-Heading spectrum-Heading--sizeS">
                        Light weight
                    </h2>
                    <p class="spectrum-Body spectrum-Body--sizeM">
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
                    <h2 class="spectrum-Heading spectrum-Heading--sizeS">
                        Framework agnostic
                    </h2>
                    <p class="spectrum-Body spectrum-Body--sizeM">
                        You can use web components with any framework, since
                        they’re supported and encapsulated at the browser level.
                    </p>
                </div>
            </section>
            <section id="example" class="spectrum-Typography">
                <div class="headerContainer">
                    <h2 class="spectrum-Heading spectrum-Heading--sizeM">
                        Sample element usage
                    </h2>
                    <sp-divider size="l"></sp-divider>
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
