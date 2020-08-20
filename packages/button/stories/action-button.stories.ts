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
import { html, action } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';

import '../';
import '../sp-action-button.js';

interface Properties {
    quiet?: boolean;
    disabled?: boolean;
    selected?: boolean;
    toggles?: boolean;
}

function renderButton(properties: Properties): TemplateResult {
    return html`
        <sp-action-button
            .quiet="${!!properties.quiet}"
            .disabled=${!!properties.disabled}
            .selected=${!!properties.selected}
            .toggles=${!!properties.toggles}
            @click=${action(`Action`)}
        >
            Action
        </sp-action-button>
    `;
}

function renderButtonsSelected(properties: Properties): TemplateResult {
    const disabled = Object.assign({}, properties, { disabled: true });
    const selected = Object.assign({}, properties, { selected: true });
    return html`
        <div>
            ${renderButton(properties)} ${renderButton(selected)}
            ${renderButton(disabled)}
        </div>
    `;
}

export default {
    component: 'sp-action-button',
    title: 'ActionButton',
};

export const Default = (): TemplateResult => {
    return renderButtonsSelected({
        quiet: false,
        disabled: false,
        selected: false,
    });
};

export const toggles = (): TemplateResult => {
    return renderButtonsSelected({
        toggles: true,
    });
};

export const wIconButton = (): TemplateResult => {
    return html`
        <sp-action-button>
            <svg
                slot="icon"
                id="spectrum-icon-18-Edit"
                viewBox="0 0 36 36"
                aria-hidden="true"
            >
                <path
                    d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                ></path>
            </svg>
            This is an action button
        </sp-action-button>
    `;
};

wIconButton.story = {
    name: 'w/ Icon button',
};

export const iconOnlyButton = (): TemplateResult => {
    return html`
        <sp-action-button label="Edit">
            <svg
                slot="icon"
                id="spectrum-icon-18-Edit"
                viewBox="0 0 36 36"
                aria-hidden="true"
            >
                <path
                    d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                ></path>
            </svg>
        </sp-action-button>
    `;
};
