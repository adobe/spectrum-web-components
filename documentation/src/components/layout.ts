/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, CSSResultArray, property } from 'lit-element';
import './side-nav';
import layoutStyles from './layout.css';
import { RouteComponent } from './route-component';

export class LayoutElement extends RouteComponent {
    public static get styles(): CSSResultArray {
        return [layoutStyles];
    }

    @property({ type: Boolean })
    public open = false;

    toggleNav() {
        this.open = !this.open;
    }

    renderContent() {
        return html`
            <div></div>
        `;
    }

    render() {
        return html`
            <sp-theme color="light" scale="medium" id="app">
                <header>
                    <sp-action-button
                        quiet
                        aria-label="Open Navigation"
                        @click=${this.toggleNav}
                    >
                        <svg
                            slot="icon"
                            viewBox="0 0 36 36"
                            focusable="false"
                            aria-hidden="true"
                            role="img"
                            width="18"
                            height="18"
                            fill="currentColor"
                        >
                            <rect
                                height="4"
                                rx="1"
                                ry="1"
                                width="28"
                                x="4"
                                y="16"
                            ></rect>
                            <rect
                                height="4"
                                rx="1"
                                ry="1"
                                width="28"
                                x="4"
                                y="6"
                            ></rect>
                            <rect
                                height="4"
                                rx="1"
                                ry="1"
                                width="28"
                                x="4"
                                y="26"
                            ></rect>
                        </svg>
                    </sp-action-button>
                </header>
                <div id="body">
                    <docs-side-nav
                        id="side-nav"
                        ?inert=${!this.open}
                        ?open=${this.open}
                        @close=${this.toggleNav}
                    ></docs-side-nav>
                    <main id="layout-content" ?inert=${this.open} role="main">
                        <div id="page">
                            ${this.renderContent()}
                        </div>
                    </main>
                </div>
            </sp-theme>
        `;
    }
}
