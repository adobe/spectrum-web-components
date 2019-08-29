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
import { SideNav } from './sidenav.js';
import { SideNavItem } from './sidenav-item.js';
import { SideNavHeading } from './sidenav-heading.js';

export * from './sidenav.js';
export * from './sidenav-item.js';
export * from './sidenav-heading.js';

/* istanbul ignore else */
if (!customElements.get('sp-sidenav')) {
    customElements.define('sp-sidenav', SideNav);
}

/* istanbul ignore else */
if (!customElements.get('sp-sidenav-item')) {
    customElements.define('sp-sidenav-item', SideNavItem);
}

/* istanbul ignore else */
if (!customElements.get('sp-sidenav-heading')) {
    customElements.define('sp-sidenav-heading', SideNavHeading);
}

declare global {
    interface HTMLElementTagNameMap {
        'sp-sidenav': SideNav;
        'sp-sidenav-item': SideNavItem;
        'sp-sidenav-heading': SideNavHeading;
    }
}
