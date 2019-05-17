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
import { html } from 'lit-html';
import { action } from '@storybook/addon-actions';

import { defineCustomElements, ActionButton } from '../lib';

defineCustomElements(ActionButton);

storiesOf('ActionButton', module).add('Default', () => {
    return renderButtonsSelected({});
});

function renderButton(properties) {
    return html`
        <sp-action-button
            .quiet="${!!properties.quiet}"
            .disabled=${!!properties.disabled}
            .selected=${!!properties.selected}
            @click=${action(`Action`)}
        >
            Action
        </sp-button>
    `;
}

function renderButtonsSelected(properties) {
    const disabled = Object.assign({}, properties, { disabled: true });
    const selected = Object.assign({}, properties, { selected: true });
    return html`
        <div>
            ${renderButton(properties)} ${renderButton(selected)}
            ${renderButton(disabled)}
        </div>
    `;
}
