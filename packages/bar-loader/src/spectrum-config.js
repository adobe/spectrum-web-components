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

module.exports = {
    spectrum: 'barloader',
    components: [
        {
            name: 'bar-loader',
            host: {
                selector: '.spectrum-BarLoader',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-BarLoader--sideLabel',
                    name: 'side-label',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-BarLoader--small',
                    name: 'small',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-BarLoader--indeterminate',
                    name: 'indeterminate',
                },
                {
                    type: 'boolean',
                    name: 'over-background',
                    selector: '.spectrum-BarLoader--overBackground',
                },
                {
                    type: 'boolean',
                    name: 'positive',
                    selector: '.is-positive',
                },
                {
                    type: 'boolean',
                    name: 'warning',
                    selector: '.is-warning',
                },
                {
                    type: 'boolean',
                    name: 'critical',
                    selector: '.is-critical',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-BarLoader-track',
                    name: 'track',
                },
                {
                    selector: '.spectrum-BarLoader-fill',
                    name: 'fill',
                },
                {
                    selector: '.spectrum-BarLoader-label',
                    name: 'label',
                },
                {
                    selector: '.spectrum-BarLoader-percentage',
                    name: 'percentage',
                },
            ],
        },
    ],
};
