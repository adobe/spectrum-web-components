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
    emphasized?: boolean;
}

function renderButton(properties: Properties): TemplateResult {
    return html`
        <sp-action-button
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            ?disabled=${!!properties.disabled}
            ?selected=${!!properties.selected}
            ?toggles=${!!properties.toggles}
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

export const emphasized = (): TemplateResult => {
    return renderButtonsSelected({
        emphasized: true,
        disabled: false,
        selected: false,
    });
};

export const emphasizedAndQuiet = (): TemplateResult => {
    return renderButtonsSelected({
        emphasized: true,
        quiet: true,
        disabled: false,
        selected: false,
    });
};

export const quiet = (): TemplateResult => {
    return renderButtonsSelected({
        quiet: true,
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

export const holdAffordance = (): TemplateResult => {
    return html`
        <sp-action-group>
            <sp-action-button label="Edit" hold-affordance>
                <svg slot="icon" id="spectrum-icon-18-Edit" viewBox="0 0 36 36">
                    <path
                        d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                    ></path>
                </svg>
            </sp-action-button>

            <sp-action-button hold-affordance quiet>
                <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 18 18"
                    width="18"
                >
                    <path
                        d="M16.45,7.8965H14.8945a5.97644,5.97644,0,0,0-.921-2.2535L15.076,4.54a.55.55,0,0,0,.00219-.77781L15.076,3.76l-.8365-.836a.55.55,0,0,0-.77781-.00219L13.4595,2.924,12.357,4.0265a5.96235,5.96235,0,0,0-2.2535-.9205V1.55a.55.55,0,0,0-.55-.55H8.45a.55.55,0,0,0-.55.55V3.106a5.96235,5.96235,0,0,0-2.2535.9205l-1.1-1.1025a.55.55,0,0,0-.77781-.00219L3.7665,2.924,2.924,3.76a.55.55,0,0,0-.00219.77781L2.924,4.54,4.0265,5.643a5.97644,5.97644,0,0,0-.921,2.2535H1.55a.55.55,0,0,0-.55.55V9.55a.55.55,0,0,0,.55.55H3.1055a5.967,5.967,0,0,0,.921,2.2535L2.924,13.4595a.55.55,0,0,0-.00219.77782l.00219.00218.8365.8365a.55.55,0,0,0,.77781.00219L4.5405,15.076,5.643,13.9735a5.96235,5.96235,0,0,0,2.2535.9205V16.45a.55.55,0,0,0,.55.55H9.55a.55.55,0,0,0,.55-.55V14.894a5.96235,5.96235,0,0,0,2.2535-.9205L13.456,15.076a.55.55,0,0,0,.77782.00219L14.236,15.076l.8365-.8365a.55.55,0,0,0,.00219-.77781l-.00219-.00219L13.97,12.357a5.967,5.967,0,0,0,.921-2.2535H16.45a.55.55,0,0,0,.55-.55V8.45a.55.55,0,0,0-.54649-.55349ZM11.207,9A2.207,2.207,0,1,1,9,6.793H9A2.207,2.207,0,0,1,11.207,9Z"
                    />
                </svg>
            </sp-action-button>

            <sp-action-button hold-affordance selected>
                <svg slot="icon" id="spectrum-icon-18-More" viewBox="0 0 36 36">
                    <circle cx="17.8" cy="18.2" r="3.4"></circle>
                    <circle cx="29.5" cy="18.2" r="3.4"></circle>
                    <circle cx="6.1" cy="18.2" r="3.4"></circle>
                </svg>
            </sp-action-button>
        </sp-action-group>
    `;
};
