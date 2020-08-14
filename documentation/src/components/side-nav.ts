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
    SpectrumElement,
    html,
    CSSResultArray,
    property,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import {
    SidenavSelectDetail,
    SideNavItem,
} from '@spectrum-web-components/sidenav';
import { AppRouter } from '../router.js';
import './side-nav-search.js';
import { search, Result } from './search-index.js';
import sideNavStyles from './side-nav.css';
import './adobe-logo.js';

class SideNav extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [sideNavStyles];
    }

    public shadowRoot!: ShadowRoot;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Array })
    private components: Result[] = [];

    private handleSelect(
        event: CustomEvent<SidenavSelectDetail>,
        kind: 'guides' | 'components'
    ): void {
        const path = AppRouter.urlForPath(`/${kind}/${event.detail.value}`);
        AppRouter.go(path);
    }

    private handleComponentSelect(
        event: CustomEvent<SidenavSelectDetail>
    ): void {
        this.handleSelect(event, 'components');
    }

    private handleGuideSelect(event: CustomEvent<SidenavSelectDetail>): void {
        this.handleSelect(event, 'guides');
    }

    public toggle() {
        this.open = !this.open;
    }

    async firstUpdated(): Promise<void> {
        const playgroundItem = this.shadowRoot.querySelector(
            'sp-sidenav-item[label="Playground"]'
        ) as SideNavItem;
        playgroundItem.updateComplete.then(() =>
            playgroundItem.focusElement.setAttribute('router-ignore', '')
        );
        const docs = await search('*');
        const components = docs.find((item) => item.name === 'components');
        if (components) {
            this.components = components.results;
            components.results.sort((a, b) => (a.name < b.name ? -1 : 1));
        }
    }

    render(): TemplateResult {
        return html`
            <div class="scrim" @click=${this.toggle}></div>
            <aside>
                <div id="nav-header">
                    <div id="logo-container">
                        <a href="#">
                            <docs-spectrum-logo></docs-spectrum-logo>
                            <div id="header-title">
                                Spectrum
                                <br />
                                Web Components
                            </div>
                        </a>
                    </div>
                    <docs-search></docs-search>
                </div>
                <div id="navigation">
                    <sp-sidenav manage-tab-index>
                        <sp-sidenav-item
                            label="Components"
                            expanded
                            @sidenav-select=${this.handleComponentSelect}
                            multilevel
                        >
                            ${this.components.map(
                                (item) =>
                                    html`
                                        <sp-sidenav-item
                                            value="${item.name}"
                                            label="${item.label}"
                                        ></sp-sidenav-item>
                                    `
                            )}
                        </sp-sidenav-item>
                        <sp-sidenav-item
                            label="Contributing"
                            expanded
                            @sidenav-select=${this.handleGuideSelect}
                            multilevel
                        >
                            <sp-sidenav-item
                                value="adding-component"
                                label="Adding Components"
                            ></sp-sidenav-item>
                            <sp-sidenav-item
                                value="spectrum-config"
                                label="Spectrum Config Reference"
                            ></sp-sidenav-item>
                        </sp-sidenav-item>
                        <sp-sidenav-item
                            label="Playground"
                            href="storybook/index.html"
                            multilevel
                        ></sp-sidenav-item>
                        <sp-sidenav-item
                            class="spectrum-web"
                            label="Spectrum"
                            href="https://spectrum.adobe.com/"
                            target="_blank"
                        ></sp-sidenav-item>
                        <sp-sidenav-item
                            label="Spectrum CSS"
                            href="https://opensource.adobe.com/spectrum-css/"
                            target="_blank"
                        ></sp-sidenav-item>
                    </sp-sidenav>
                </div>
            </aside>
        `;
    }

    updated(changes: PropertyValues) {
        if (changes.has('open') && !this.open && changes.get('open')) {
            this.dispatchEvent(new Event('close'));
        }
    }
}

customElements.define('docs-side-nav', SideNav);
