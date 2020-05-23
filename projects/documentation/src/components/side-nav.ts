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
import {
    LitElement,
    html,
    CSSResultArray,
    property,
    PropertyValues,
    TemplateResult,
} from 'lit-element';
import './side-nav-search.js';
import sideNavStyles from './side-nav.css';
import './adobe-logo.js';

export class SideNav extends LitElement {
    public static get styles(): CSSResultArray {
        return [sideNavStyles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    public toggle() {
        this.open = !this.open;
    }

    public focus() {
        (this.shadowRoot!.querySelector('#logo')! as HTMLAnchorElement).focus();
    }

    render(): TemplateResult {
        return html`
            <div class="scrim" @click=${this.toggle}></div>
            <aside>
                <div id="nav-header">
                    <div id="logo-container">
                        <a id="logo" href="">
                            <docs-spectrum-logo></docs-spectrum-logo>
                            <div id="header-title">
                                Spectrum
                                <br />
                                Web&nbsp;Components
                            </div>
                        </a>
                    </div>
                    <docs-search></docs-search>
                </div>
                <div class="navigation">
                    <slot></slot>
                </div>
            </aside>
        `;
    }

    firstUpdated() {
        setTimeout(() => import('@spectrum-web-components/sidenav'), 0);
    }

    updated(changes: PropertyValues) {
        if (changes.has('open') && !this.open && changes.get('open')) {
            this.dispatchEvent(new Event('close'));
        }
    }
}
