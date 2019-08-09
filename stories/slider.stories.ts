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
import {
    withKnobs,
    boolean,
    radios,
    text,
    number,
} from '@storybook/addon-knobs';
import { html } from 'lit-html';

import '../src/slider';

storiesOf('Slider', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        const value = number('Value', 50);
        const min = number('Min', 0);
        const max = number('Min', 100);
        const step = number('Step', 1);
        const label = text('Label', 'Opacity');
        return html`
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    value="${value}"
                    step="${step}"
                    min="${min}"
                    max="${max}"
                    label="${label}"
                    id="opacity-slider"
                />
            </div>
        `;
    })
    .add('Disabled', () => {
        const label = text('Label', 'Intensity');
        return html`
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    disabled
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="${label}"
                />
            </div>
        `;
    })
    .add('Color', () => {
        return html`
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    variant="color"
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Color"
                    id="color-slider"
                />
            </div>
        `;
    })
    .add('Color with Alpha', () => {
        return html`
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    variant="color"
                    has-alpha
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Color"
                    id="color-slider"
                />
            </div>
        `;
    })
    .add('Color disabled', () => {
        return html`
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    variant="color"
                    has-alpha
                    disabled
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Color"
                    id="color-slider"
                />
            </div>
        `;
    })
    .add('Focus tab demo', () => {
        const value = number('Value', 50);
        const min = number('Min', 0);
        const max = number('Min', 100);
        const step = number('Step', 1);
        return html`
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    value="${value}"
                    step="${step}"
                    min="${min}"
                    max="${max}"
                    label="Opacity"
                    id="opacity-slider-opacity"
                />
            </div>
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    value="${value}"
                    step="${step}"
                    min="${min}"
                    max="${max}"
                    label="Lightness"
                    id="opacity-slider-lightness"
                />
            </div>
            <div style="width: 500px; margin: 20px;">
                <sp-slider
                    value="${value}"
                    step="${step}"
                    min="${min}"
                    max="${max}"
                    label="Saturation"
                    id="opacity-slider-saturation"
                />
            </div>
        `;
    });
