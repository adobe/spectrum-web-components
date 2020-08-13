/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

module.exports = {
    spectrum: 'sidenav',
    components: [
        {
            name: 'sidenav',
            host: '.spectrum-SideNav',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-SideNav--multiLevel',
                    name: 'multilevel',
                },
            ],
            exclude: [
                /^\.spectrum-SideNav-(item|heading)/,
                // We cannot do global matches like this with shadow DOM
                /^\.spectrum-SideNav--multiLevel\s\.spectrum-SideNav/,
                /\.spectrum-SideNav\s\.spectrum-SideNav/,
            ],
        },
        {
            name: 'sidenav-item',
            host: '.spectrum-SideNav-item',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-selected',
                    name: 'selected',
                },
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-SideNav-itemLink',
                    name: 'itemLink',
                },
                {
                    // Sub-lists also inherit from .spectrum-SideNav
                    selector: '.spectrum-SideNav',
                    name: 'list',
                },
            ],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-SideNav-itemIcon',
                },
            ],
        },
        {
            name: 'sidenav-heading',
            host: {
                selector: '.spectrum-SideNav-heading',
                shadowSelector: '#heading',
            },
            ids: [
                {
                    // Headings also inherit from .spectrum-SideNav
                    selector: '.spectrum-SideNav-heading',
                    name: 'heading',
                },
                {
                    // Headings also inherit from .spectrum-SideNav
                    selector: '.spectrum-SideNav',
                    name: 'list',
                },
            ],
        },
    ],
};
