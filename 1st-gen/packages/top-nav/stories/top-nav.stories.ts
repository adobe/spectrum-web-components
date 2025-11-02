/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/top-nav/sp-top-nav.js';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/avatar/sp-avatar.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-download.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-link.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-search.js';
import { avatar, logo } from './images';

export default {
    title: 'Top Nav',
    component: 'sp-top-nav',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-top-nav>
            <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
            <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
                Page 1
            </sp-top-nav-item>
            <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
            <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
            <sp-top-nav-item href="#page-4">
                Page with Really Long Name
            </sp-top-nav-item>
            <sp-action-menu
                label="Account"
                style="margin-inline-start: auto;"
                quiet
            >
                <sp-icon-settings slot="icon"></sp-icon-settings>
                <sp-menu-item>Account Settings</sp-menu-item>
                <sp-menu-item>My Profile</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Share</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Help</sp-menu-item>
                <sp-menu-item>Sign Out</sp-menu-item>
            </sp-action-menu>
        </sp-top-nav>
    `;
};

export const Selected = (): TemplateResult => {
    let { href } = location;
    href = href.replace(location.search, '');
    /**
     * The location's `href` is leveraged as the value of "Page 3" here
     * so that within the default Storybook UI there can be a `href` attribute
     * driven "selection" that ensures the delivery of a visible selection.
     */
    return html`
        <sp-top-nav ignore-url-parts="search">
            <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
            <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
                Page 1
            </sp-top-nav-item>
            <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
            <sp-top-nav-item href=${href} class="selected">
                Page 3
            </sp-top-nav-item>
            <sp-top-nav-item href="#page-4">
                Page with Really Long Name
            </sp-top-nav-item>
            <sp-action-menu
                label="Account"
                style="margin-inline-start: auto;"
                quiet
            >
                <sp-icon-settings slot="icon"></sp-icon-settings>
                <sp-menu-item>Account Settings</sp-menu-item>
                <sp-menu-item>My Profile</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Share</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Help</sp-menu-item>
                <sp-menu-item>Sign Out</sp-menu-item>
            </sp-action-menu>
        </sp-top-nav>
    `;
};

class WrappedTopNav extends HTMLElement {
    override shadowRoot!: ShadowRoot;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <sp-top-nav>
                <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
                <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
                    Page 1
                </sp-top-nav-item>
                <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
                <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
                <sp-top-nav-item href="#page-4" autofocus>
                    Page with Really Long Name
                </sp-top-nav-item>
                <sp-action-menu label="Account" style="margin-inline-start: auto;" quiet>
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    <sp-menu-item>Account Settings</sp-menu-item>
                    <sp-menu-item>My Profile</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Share</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Help</sp-menu-item>
                    <sp-menu-item>Sign Out</sp-menu-item>
                </sp-action-menu>
            </sp-top-nav>
        `;
    }
}

customElements.define('wrapped-top-nav', WrappedTopNav);

export const autofocus = (): TemplateResult => {
    return html`
        <wrapped-top-nav></wrapped-top-nav>
    `;
};

// https://spectrum.adobe.com/page/application-frame/#Application-mode
// https://spectrum.adobe.com/page/headers/#Anatomy

export const Modes = (): TemplateResult => {
    return html`
        <sp-top-nav>
            <sp-action-button quiet href="/marketing-page" label="App">
                <sp-icon slot="icon" src=${logo}></sp-icon>
            </sp-action-button>
            <sp-top-nav-item href="#">Design</sp-top-nav-item>
            <sp-top-nav-item href="#prototype">Prototype</sp-top-nav-item>
            <span style="margin-inline-start: auto; font-size: 1.1em;">
                document_name.pdf
            </span>
            <sp-action-group style="margin-inline-start: auto;" quiet>
                <sp-action-button label="Search">
                    <sp-icon-search slot="icon"></sp-icon-search>
                </sp-action-button>
                <sp-action-button label="Download">
                    <sp-icon-download slot="icon"></sp-icon-download>
                </sp-action-button>
                <sp-action-button label="Link">
                    <sp-icon-link slot="icon"></sp-icon-link>
                </sp-action-button>
                <sp-action-menu label="User" quiet>
                    <sp-avatar
                        slot="icon"
                        label="User avatar"
                        src=${avatar}
                        style="--mod-avatar-block-size: 100%; --mod-avatar-inline-size: 100%;"
                    ></sp-avatar>
                    <sp-menu-item>Profile</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Sign Out</sp-menu-item>
                </sp-action-menu>
            </sp-action-group>
        </sp-top-nav>
    `;
};
