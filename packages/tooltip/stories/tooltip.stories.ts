/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { storiesOf } from '@storybook/polymer';
import { boolean, select, text } from '@storybook/addon-knobs';
import { html } from 'lit-html';

import '../';
import '../../icon';
import '../../iconset';

const tipOptions = ['top', 'bottom', 'left', 'right'];

const variantOptions = ['', 'info', 'positive', 'negative'];

const iconOptions = ['AlertSmall', 'CheckmarkSmall', 'InfoSmall'];

storiesOf('Tooltip', module)
    .add('Default', () => {
        return html`
            <sp-tooltip
                ?open=${boolean('Open', true, 'Element')}
                tip=${select(
                    'Tip direction',
                    tipOptions,
                    tipOptions[0],
                    'Element'
                )}
                variant=${select(
                    'Variant',
                    variantOptions,
                    variantOptions[0],
                    'Element'
                )}
            >
                ${text('Tip text', 'Tooltip', 'Element')}
            </sp-tooltip>
        `;
    })
    .add('w/ Icon', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-tooltip
                ?open=${boolean('Open', true, 'Element')}
                tip=${select(
                    'Tip direction',
                    tipOptions,
                    tipOptions[0],
                    'Element'
                )}
                variant=${select(
                    'Variant',
                    variantOptions,
                    variantOptions[0],
                    'Element'
                )}
            >
                <sp-icon
                    size="s"
                    name="ui:${select(
                        'Icon',
                        iconOptions,
                        iconOptions[0],
                        'Element'
                    )}"
                    slot="icon"
                ></sp-icon>
                ${text('Tip text', 'Tooltip', 'Element')}
            </sp-tooltip>
        `;
    });
