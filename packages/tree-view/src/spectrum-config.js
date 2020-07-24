/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const config = {
    spectrum: 'treeview',
    components: [
        {
            name: 'tree-view',
            tagName: 'sp-tree-view',
            host: {
                selector: '.spectrum-TreeView',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-TreeView--standalone',
                    name: 'standalone',
                },
            ],
            slots: [
                {
                    selector: '.spectrum-TreeView',
                    contents: 'sp-tree-view',
                },
            ],
            exclude: [
                /\.spectrum-TreeView-item/,
                /\.spectrum-TreeView-heading/,
            ],
        },
        {
            name: 'tree-view-item-link',
            host: {
                selector: '.spectrum-TreeView--thumbnail',
            },
            classes: [
                {
                    selector: '.spectrum-TreeView-itemLink',
                    name: 'has-thumbnail',
                },
            ],
            exclude: [
                /^(?!\.spectrum-TreeView--thumbnail \.spectrum-TreeView-itemLink).*/,
            ],
        },
        {
            name: 'tree-view-heading',
            host: {
                selector: '.spectrum-TreeView-heading',
            },
            exclude: [/\.spectrum-TreeView-item/, /\.spectrum-TreeView\s/],
        },
        {
            name: 'tree-view-item-label',
            host: {
                selector: '.spectrum-TreeView-item',
            },
            ids: [
                {
                    selector: '.spectrum-TreeView-itemLabel',
                    name: 'label',
                },
            ],
            exclude: [/^(?!\.spectrum-TreeView-itemLabel)/],
        },
        {
            name: 'tree-view-item',
            host: {
                selector: '.spectrum-TreeView-item',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-open',
                    name: 'open',
                },
                {
                    type: 'boolean',
                    selector: '.is-selected',
                    name: 'selected',
                },
                {
                    type: 'boolean',
                    selector: '.is-drop-target',
                    name: 'drop-target',
                },
                {
                    type: 'boolean',
                    selector: '.is-disabled',
                    name: 'disabled',
                },
                {
                    type: 'enum',
                    name: 'indent',
                    root: '.spectrum-TreeView-item--indent',
                    values: [
                        '.spectrum-TreeView-item--indent1',
                        '.spectrum-TreeView-item--indent2',
                        '.spectrum-TreeView-item--indent3',
                        '.spectrum-TreeView-item--indent4',
                        '.spectrum-TreeView-item--indent5',
                        '.spectrum-TreeView-item--indent6',
                        '.spectrum-TreeView-item--indent7',
                        '.spectrum-TreeView-item--indent8',
                        '.spectrum-TreeView-item--indent9',
                        '.spectrum-TreeView-item--indent10',
                    ],
                },
            ],
            ids: [
                {
                    selector: '.spectrum-TreeView-itemIndicator',
                    name: 'indicator',
                },
            ],
            slots: [
                {
                    name: 'children',
                    selector: '.spectrum-TreeView',
                },
                {
                    selector: '.spectrum-TreeView-itemIcon',
                    name: 'icon',
                },
            ],
            classes: [
                {
                    selector: '.spectrum-TreeView-itemLink',
                    name: 'link',
                },
            ],
            exclude: [/\.spectrum-TreeView-itemLabel/],
            complexSelectors: [
                {
                    selector:
                        '.spectrum-TreeView-item[dir=rtl] .spectrum-TreeView--thumbnail .spectrum-TreeView-itemThumbnail',
                    replacement:
                        ':host([dir=rtl]) ::slotted([slot="thumbnail"])',
                },
                {
                    selector:
                        '.spectrum-TreeView-item[dir=ltr] .spectrum-TreeView--thumbnail .spectrum-TreeView-itemThumbnail',
                    replacement:
                        ':host([dir=ltr]) ::slotted([slot="thumbnail"])',
                },
            ],
        },
    ],
};

export default config;
