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

const config = {
    spectrum: 'typography',
    components: [
        {
            name: 'base',
            host: {
                selector: '.spectrum',
                shadowSelector: '.spectrum',
            },
            exclude: [/\.spectrum-/, /\.spectrum:lang/],
        },
        {
            name: 'typography',
            keepHostSelector: true,
            host: {
                selector: '.spectrum-Typography',
                shadowSelector: '.spectrum-Typography',
            },
        },
        {
            name: 'heading',
            keepHostSelector: true,
            host: {
                selector: '.spectrum-Heading',
                shadowSelector: '.spectrum-Heading',
            },
        },
        {
            name: 'body',
            keepHostSelector: true,
            host: {
                selector: '.spectrum-Body',
                shadowSelector: '.spectrum-Body',
            },
        },
        {
            name: 'detail',
            keepHostSelector: true,
            host: {
                selector: '.spectrum-Detail',
                shadowSelector: '.spectrum-Detail',
            },
        },
        {
            name: 'code',
            keepHostSelector: true,
            host: {
                selector: '.spectrum-Code',
                shadowSelector: '.spectrum-Code',
            },
        },
        {
            name: 'lang',
            host: {
                selector: '.spectrum',
                shadowSelector: '.spectrum',
            },
            exclude: [/^\.spectrum(?!:lang)/],
        },
    ],
};

export default config;
