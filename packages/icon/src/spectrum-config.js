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
    spectrum: 'icon',
    components: [
        {
            name: 'icon',
            host: '.spectrum-Icon',
            attributes: [
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: 'xxs',
                            selector: '.spectrum-Icon--sizeXXS',
                        },
                        {
                            name: 'xs',
                            selector: '.spectrum-Icon--sizeXS',
                        },
                        {
                            name: 's',
                            selector: '.spectrum-Icon--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Icon--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Icon--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Icon--sizeXL',
                        },
                        {
                            name: 'xxl',
                            selector: '.spectrum-Icon--sizeXXL',
                        },
                    ],
                },
            ],
            exclude: [/img/, /svg/],
        },
        {
            name: 'icon-arrow',
            host: '.spectrum-UIIcon-Arrow',
        },
        {
            name: 'icon-asterisk',
            host: '.spectrum-UIIcon-Asterisk',
        },
        {
            name: 'icon-checkmark',
            host: '.spectrum-UIIcon-Checkmark',
        },
        {
            name: 'icon-chevron',
            host: '.spectrum-UIIcon-Chevron',
        },
        {
            name: 'icon-corner-triangle',
            host: '.spectrum-UIIcon-CornerTriangle',
        },
        {
            name: 'icon-cross',
            host: '.spectrum-UIIcon-Cross',
        },
        {
            name: 'icon-dash',
            host: '.spectrum-UIIcon-Dash',
        },
        {
            name: 'icon-double-gripper',
            host: '.spectrum-UIIcon-DoubleGripper',
        },
        {
            name: 'icon-single-gripper',
            host: '.spectrum-UIIcon-SingleGripper',
        },
        {
            name: 'icon-triple-gripper',
            host: '.spectrum-UIIcon-TripleGripper',
        },
    ],
};

export default config;
