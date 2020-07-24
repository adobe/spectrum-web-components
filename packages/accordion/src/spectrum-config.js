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
    spectrum: 'accordion',
    components: [
        {
            name: 'accordion',
            host: {
                selector: '.spectrum-Accordion',
            },
            attributes: [
                {
                    type: 'boolean',
                    name: 'open',
                    selector: '.is-open',
                },
                {
                    type: 'boolean',
                    name: '.is-disabled',
                    selector: 'disabled',
                },
            ],
            exclude: [
                /\.spectrum-Accordion-item/,
                /\.spectrum-Accordion-itemIndicator/,
                /\.spectrum-Accordion-itemHeading/,
                /\.spectrum-Accordion-itemHeader/,
                /\.spectrum-Accordion-itemContent/,
            ],
        },
        {
            name: 'accordion-item',
            host: {
                selector: '.spectrum-Accordion-item',
            },
            attributes: [
                {
                    type: 'boolean',
                    name: 'open',
                    selector: '.is-open',
                },
                {
                    type: 'boolean',
                    name: 'disabled',
                    selector: '.is-disabled',
                },
            ],
            ids: [
                {
                    selector: '.spectrum-Accordion-itemIndicator',
                    name: 'indicator',
                },
                {
                    selector: '.spectrum-Accordion-itemHeading',
                    name: 'heading',
                },
                {
                    selector: '.spectrum-Accordion-itemHeader',
                    name: 'header',
                },
                {
                    selector: '.spectrum-Accordion-itemContent',
                    name: 'content',
                },
            ],
        },
    ],
};
