/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { storiesOf } from '@storybook/polymer';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { html } from 'lit-html';

import '../src/popover';

storiesOf('Popover', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        return html`
            <div style="color: var(--spectrum-global-color-gray-800)">
                <sp-popover variant="default" open style="max-width: 320px">
                    <div style="font-size: 14px; padding: 10px">
                        Cupcake ipsum dolor sit amet jelly beans. Chocolate
                        jelly caramels. Icing soufflé chupa chups donut
                        cheesecake. Jelly-o chocolate cake sweet roll cake
                        danish candy biscuit halvah
                    </div>
                </sp-popover>
            </div>
        `;
    })
    .add('Dialog', () => {
        const direction = text('Direction', 'top');
        const tip = boolean('Has Tip', true);
        return html`
            <div
                style="color: var(--spectrum-global-color-gray-800); position: relative"
            >
                <sp-popover
                    variant="dialog"
                    direction=${direction}
                    open
                    style=" max-width: 320px"
                    .tip="${tip}"
                >
                    <div
                        style="padding-bottom: 30px; font-size: 18px; font-weight: 700"
                    >
                        Popover Title
                    </div>
                    <div style="font-size: 14px">
                        Cupcake ipsum dolor sit amet jelly beans. Chocolate
                        jelly caramels. Icing soufflé chupa chups donut
                        cheesecake. Jelly-o chocolate cake sweet roll cake
                        danish candy biscuit halvah
                    </div>
                </sp-popover>
            </div>
        `;
    });
