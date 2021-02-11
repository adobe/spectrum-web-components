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
    spectrum: 'splitview',
    components: [
        {
            name: 'split-view',
            host: {
                selector: '.spectrum-SplitView',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-draggable',
                    name: 'resizable',
                },
                {
                    type: 'boolean',
                    selector: '.spectrum-SplitView--vertical',
                    name: 'vertical',
                },
                // {
                //     type: 'boolean',
                //     selector: '.is-collapsed-start',
                //     name: 'is-collapsed-start',
                // },
                // {
                //     type: 'boolean',
                //     selector: '.is-collapsed-end',
                //     name: 'is-collapsed-end',
                // },
            ],
            ids: [
                {
                    selector: '.spectrum-SplitView-splitter',
                    name: 'splitter',
                },
                {
                    selector: '.spectrum-SplitView-gripper',
                    name: 'gripper',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-SplitView-pane',
                },
            ],
        },
    ],
};

export default config;
