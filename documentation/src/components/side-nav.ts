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
import {
    LitElement,
    html,
    CSSResultArray,
    property,
    PropertyValues,
} from 'lit-element';
import docs from '../../custom-elements.json';
import { AppRouter } from '../router';
import { SidenavSelectDetail } from '../../../packages/sidenav';
import sideNavStyles from './side-nav.css';
import './adobe-logo';

class SideNav extends LitElement {
    public static get styles(): CSSResultArray {
        return [sideNavStyles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    private get components(): string[] {
        return docs.tags.map((el) => el.name.replace('sp-', ''));
    }

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

    render() {
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
                </div>
                <div id="navigation">
                    <sp-sidenav manage-tab-index variant="multilevel">
                        <sp-sidenav-item
                            label="Components"
                            expanded
                            @sidenav-select=${this.handleComponentSelect}
                        >
                            ${this.components.map(
                                (name) =>
                                    html`
                                        <sp-sidenav-item
                                            value="${name}"
                                            label="${name}"
                                        ></sp-sidenav-item>
                                    `
                            )}
                        </sp-sidenav-item>
                        <sp-sidenav-item
                            label="Contributing"
                            expanded
                            @sidenav-select=${this.handleGuideSelect}
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
