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
    spectrum: 'thumbnail',
    components: [
        {
            name: 'thumbnail',
            host: {
                selector: '.spectrum-Thumbnail',
            },
            attributes: [
                {
                    type: 'boolean',
                    name: 'selected',
                    selector: '.is-selected',
                },
                {
                    type: 'boolean',
                    name: 'focused',
                    selector: '.is-focused',
                },
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: 'xxs',
                            selector: '.spectrum-Thumbnail--sizeXXS',
                        },
                        {
                            name: 'xs',
                            selector: '.spectrum-Thumbnail--sizeXS',
                        },
                        {
                            name: 's',
                            selector: '.spectrum-Thumbnail--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Thumbnail--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Thumbnail--sizeL',
                        },
                    ],
                },
            ],
            classes: [
                {
                    name: 'background',
                    selector: '.spectrum-Thumbnail-background',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-Thumbnail-image',
                    contents: '*',
                },
            ],
        },
    ],
};

export default config;
