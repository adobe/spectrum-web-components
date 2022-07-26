/* sepctrum config
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const config = {
    spectrum: 'table',
    components: [
        {
            name: 'table',
            host: {
                selector: '.spectrum-Table',
            },
            attributes: [
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: 's',
                            selector: '.spectrum-Table--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Table--sizeM',
                        },
                    ],
                },
                {
                    type: 'enum',
                    name: 'density', // is this the right naming?
                    values: [
                        {
                            name: 'compact',
                            selector: '.spectrum-Table--compact',
                        },
                        {
                            name: 'spacious',
                            selector: '.spectrum-Table--spacious',
                        },
                    ],
                },
            ],
            exclude: [
                /\.spectrum-Table-sortedIcon/,
                /\.spectrum-Table-headCell/,
            ],
        },
        {
            name: 'table-body',
            host: {
                selector: '.spectrum-Table-body',
            },
            attributes: [
                {
                    type: 'boolean',
                    selector: '.is-drop-target',
                    name: 'drop-target',
                },
            ],
            exclude: [
                /\.spectrum-Table--spacious/,
                /\.spectrum-Table--compact/,
                /\.spectrum-Table-sortedIcon/,
                /\.spectrum-Table-headCell/,
                /\.spectrum-Table-cell--alignRight/,
                /\.spectrum-Table-row/,
                /\.spectrum-Table-cell/,
                /\.spectrum-Table-checkboxCell/,
            ],
        },
        {
            name: 'table-cell',
            host: {
                selector: '.spectrum-Table-cell',
            },
            attributes: [
                {
                    type: 'enum',
                    name: 'align',
                    values: [
                        {
                            name: 'center',
                            selector: '.spectrum-Table-cell--alignCenter',
                        },
                        {
                            name: 'end',
                            selector: '.spectrum-Table-cell--alignRight',
                        },
                    ],
                },
            ],
            classes: [
                {
                    name: 'divider',
                    selector: '.spectrum-Table-cell--divider',
                },
            ],
            exclude: [
                /\.spectrum-Table-row/,
                /\.spectrum-Table-body/,
                /\.spectrum-Table-headCell/,
                /\.spectrum-Table-checkboxCell/,
                /\.spectrum-Table--spacious/,
                /\.spectrum-Table--compact/,
                /\.spectrum-Table-sortedIcon/,
            ],
        },
        {
            name: 'table-checkbox-cell',
            host: {
                selector: '.spectrum-Table',
            },
            complexSelectors: [
                {
                    replacement: ':host([dir=ltr])',
                    selector:
                        '.spectrum-Table[dir=ltr] .spectrum-Table-checkboxCell',
                },
                {
                    replacement: ':host([dir=rtl])',
                    selector:
                        '.spectrum-Table[dir=rtl] .spectrum-Table-checkboxCell',
                },
                {
                    replacement: ':host',
                    selector: '.spectrum-Table-checkboxCell',
                },
                {
                    replacement: '.checkbox',
                    selector: /.spectrum-Table-checkbox(?!Cell)/,
                },
            ],
            exclude: [/\.spectrum-Table(?!-checkbox)/],
        },
        {
            name: 'table-head',
            host: {
                selector: '.spectrum-Table-head',
            },
            exclude: [
                /\.spectrum-Table-sortedIcon/,
                /\.spectrum-Table-body/,
                /\.spectrum-Table-headCell/,
                /\.spectrum-Table-cell/,
                /\.spectrum-Table-checkboxCell/,
                /\.spectrum-Table-row/,
            ],
        },
        {
            name: 'table-head-cell',
            host: {
                selector: '.spectrum-Table-headCell',
            },
            attributes: [
                {
                    type: 'boolean',
                    name: 'sortable',
                    selector: '.is-sortable',
                },
                {
                    type: 'enum',
                    name: 'sort-direction',
                    values: [
                        {
                            name: 'asc',
                            selector: '.is-sorted-asc',
                        },
                        {
                            name: 'desc',
                            selector: '.is-sorted-desc',
                        },
                    ],
                },
                {
                    type: 'boolean',
                    name: 'focused',
                    selector: '.is-focused',
                },
                {
                    type: 'boolean',
                    name: 'active',
                    selector: ':active',
                },
            ],
            classes: [
                {
                    name: 'sortedIcon',
                    selector: '.spectrum-Table-sortedIcon',
                },
            ],
            complexSelectors: [
                {
                    selector: '  .spectrum-Table-headCell',
                    replacement: ' .spectrum-Table-headCell',
                },
            ],
            exclude: [
                /\.spectrum-Table-row/,
                /\.spectrum-Table-body/,
                /\.spectrum-Table-cell/,
                /\.spectrum-Table-checkboxCell/,
                /\.spectrum-Table--spacious/,
                /\.spectrum-Table--compact/,
            ],
        },
        {
            name: 'table-row',
            host: {
                selector: '.spectrum-Table-row',
            },
            attributes: [
                {
                    type: 'boolean',
                    name: 'drop-target',
                    selector: '.is-drop-target',
                },
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
            ],
            exclude: [
                /\.spectrum-Table-sortedIcon/,
                /\.spectrum-Table-headCell/,
                /\.spectrum-Table-cell--/,
                /tbody/,
                /\.spectrum-Table-body/,
                /\.spectrum-Table--/,
                /\.spectrum-Table-cell/,
            ],
        },
    ],
};

export default config;
