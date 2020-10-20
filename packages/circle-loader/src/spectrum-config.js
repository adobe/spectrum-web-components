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

const config = {
    spectrum: 'progresscircle',
    components: [
        {
            name: 'circle-loader',
            host: '.spectrum-ProgressCircle',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-ProgressCircle--indeterminate',
                    name: 'indeterminate',
                },
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        '.spectrum-ProgressCircle--small',
                        '.spectrum-ProgressCircle--large',
                    ],
                },
                {
                    type: 'boolean',
                    name: 'over-background',
                    selector: '.spectrum-ProgressCircle--overBackground',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-ProgressCircle-track',
                    name: 'track',
                },
                {
                    selector: '.spectrum-ProgressCircle-fills',
                    name: 'fills',
                },
                {
                    selector: '.spectrum-ProgressCircle-fill',
                    name: 'fill',
                },
                {
                    selector: '.spectrum-ProgressCircle-fillMask1',
                    name: 'fillMask1',
                },
                {
                    selector: '.spectrum-ProgressCircle-fillMask2',
                    name: 'fillMask2',
                },
                {
                    selector: '.spectrum-ProgressCircle-fillSubMask1',
                    name: 'fillSubMask1',
                },
                {
                    selector: '.spectrum-ProgressCircle-fillSubMask2',
                    name: 'fillSubMask2',
                },
                {
                    selector:
                        '.spectrum-ProgressCircle--indeterminate-fill-submask-2',
                    name: 'fill-submask-2',
                },
            ],
        },
    ],
};

export default config;
