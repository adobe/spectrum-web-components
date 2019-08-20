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
import { LitElement, html, CSSResultArray } from 'lit-element';
import { ComponentDocs } from '../../components';
import { AppRouter } from '../router';
import { StrictCustomEvent } from '../../../src/events';
import sideNavStyles from './side-nav.css';
import './spectrum-logo';

class SideNav extends LitElement {
    public static get styles(): CSSResultArray {
        return [sideNavStyles];
    }

    private get components(): string[] {
        return Array.from(ComponentDocs.keys());
    }

    private handleSelect(
        event: StrictCustomEvent<'sp-sidenav:select'>,
        kind: 'guides' | 'components'
    ): void {
        const path = AppRouter.urlForPath(`/${kind}/${event.detail.value}`);
        AppRouter.go(path);
    }

    private handleComponentSelect(
        event: StrictCustomEvent<'sp-sidenav:select'>
    ): void {
        this.handleSelect(event, 'components');
    }

    private handleGuideSelect(
        event: StrictCustomEvent<'sp-sidenav:select'>
    ): void {
        this.handleSelect(event, 'guides');
    }

    render() {
        return html`
            <div id="nav-header">
                <a href="/">
                    <docs-spectrum-logo></docs-spectrum-logo>
                    <div>SPECTRUM WEB COMPONENTS</div>
                </a>
            </div>
            <sp-sidenav>
                <sp-sidenav-heading
                    label="Components"
                    @sp-sidenav:select=${this.handleComponentSelect}
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
                </sp-sidenav-heading>
                <sp-sidenav-heading
                    label="Contributing"
                    @sp-sidenav:select=${this.handleGuideSelect}
                >
                    <sp-sidenav-item
                        value="adding-component"
                        label="Adding Components"
                    ></sp-sidenav-item>
                    <sp-sidenav-item
                        value="spectrum-config"
                        label="Spectrum Config Reference"
                    ></sp-sidenav-item>
                </sp-sidenav-heading>
            </sp-sidenav>
        `;
    }
}
customElements.define('docs-side-nav', SideNav);
