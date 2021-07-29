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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-top-nav.js';
import '../sp-top-nav-item.js';
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
import { logo, avatar } from './images';

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
            <sp-action-menu label="Account" style="margin-inline-start: auto;">
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
    const { href } = location;
    return html`
        <sp-top-nav>
            <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
            <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
                Page 1
            </sp-top-nav-item>
            <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
            <sp-top-nav-item href=${href}>Page 3</sp-top-nav-item>
            <sp-top-nav-item href="#page-4">
                Page with Really Long Name
            </sp-top-nav-item>
            <sp-action-menu label="Account" style="margin-inline-start: auto;">
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
            <sp-action-group style="margin-inline-start: auto;">
                <sp-action-button quiet label="Search">
                    <sp-icon-search slot="icon"></sp-icon-search>
                </sp-action-button>
                <sp-action-button quiet label="Download">
                    <sp-icon-download slot="icon"></sp-icon-download>
                </sp-action-button>
                <sp-action-button quiet label="Link">
                    <sp-icon-link slot="icon"></sp-icon-link>
                </sp-action-button>
                <sp-action-menu label="User">
                    <sp-avatar
                        slot="icon"
                        label="User avatar"
                        src=${avatar}
                        style="--spectrum-avatar-small-width: var(--spectrum-global-dimension-size-300); --spectrum-avatar-small-height: var(--spectrum-global-dimension-size-300);"
                    ></sp-avatar>
                    <sp-menu-item>Profile</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Sign Out</sp-menu-item>
                </sp-action-menu>
            </sp-action-group>
        </sp-top-nav>
    `;
};
