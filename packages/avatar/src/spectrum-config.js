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
    spectrum: 'avatar',
    components: [
        {
            name: 'avatar',
            host: {
                selector: '.spectrum-Avatar',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: '50',
                            selector: '.spectrum-Avatar--size50',
                        },
                        {
                            name: '75',
                            selector: '.spectrum-Avatar--size75',
                        },
                        {
                            name: '100',
                            selector: '.spectrum-Avatar--size100',
                        },
                        {
                            name: '200',
                            selector: '.spectrum-Avatar--size200',
                        },
                        {
                            name: '300',
                            selector: '.spectrum-Avatar--size300',
                        },
                        {
                            name: '400',
                            selector: '.spectrum-Avatar--size400',
                        },
                        {
                            name: '500',
                            selector: '.spectrum-Avatar--size500',
                        },
                        {
                            name: '600',
                            selector: '.spectrum-Avatar--size600',
                        },
                        {
                            name: '700',
                            selector: '.spectrum-Avatar--size700',
                        },
                    ],
                },
            ],
        },
    ],
};

export default config;
