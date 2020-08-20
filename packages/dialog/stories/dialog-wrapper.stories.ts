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

import { html, TemplateResult } from '@spectrum-web-components/base';
import { action, boolean } from '@open-wc/demoing-storybook';

import '@spectrum-web-components/button/sp-button.js';

import '../sp-dialog-wrapper.js';
import { landscape } from './images.js';

export default {
    title: 'Dialog Wrapped',
    component: 'sp-dialog-wrapper',
};

export const wrapperLabeledHero = (): TemplateResult => {
    const noTransitions = boolean('No Transitions', false, 'Testing');
    return html`
        <sp-dialog-wrapper
            ?no-transitions=${noTransitions}
            open
            hero=${landscape}
            hero-label="Hero Image Alt Text"
            dismissible
            headline="Wrapped Dialog w/ Hero Image"
            @close=${action('close')}
        >
            Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
            onClick="this.previousElementSibling.open = !this.previousElementSibling.open"
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
    `;
};

export const wrapperDismissible = ({
    actionTracking = true,
} = {}): TemplateResult => {
    const noTransitions = boolean('No Transitions', false, 'Testing');
    const announceAction = actionTracking
        ? action
        : () => {
              return;
          };
    return html`
        <sp-dialog-wrapper
            ?no-transitions=${noTransitions}
            open
            hero=${landscape}
            dismissible
            headline="Wrapped Dialog w/ Hero Image"
            @close=${announceAction('close')}
        >
            Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
            onClick="this.previousElementSibling.open = !this.previousElementSibling.open"
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
    `;
};

export const wrapperDismissibleUnderlay = (): TemplateResult => {
    const noTransitions = boolean('No Transitions', false, 'Testing');
    return html`
        <sp-button
            onClick="this.nextElementSibling.open = !this.nextElementSibling.open"
            variant="primary"
        >
            Toggle Dialog
        </sp-button>
        <sp-dialog-wrapper
            ?no-transitions=${noTransitions}
            open
            hero=${landscape}
            dismissible
            headline="Wrapped Dialog w/ Hero Image"
            underlay
            @close=${action('close')}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const wrapperButtons = ({
    actionTracking = true,
} = {}): TemplateResult => {
    const noTransitions = boolean('No Transitions', false, 'Testing');
    const announceAction = actionTracking
        ? action
        : () => {
              return;
          };
    return html`
        <sp-dialog-wrapper
            ?no-transitions=${noTransitions}
            open
            size="large"
            headline="Wrapped Dialog w/ Buttons"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            footer="Content for footer"
            @confirm=${announceAction('confirm')}
            @secondary=${announceAction('secondary')}
            @cancel=${announceAction('cancel')}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const wrapperButtonsUnderlay = (): TemplateResult => {
    const noTransitions = boolean('No Transitions', false, 'Testing');
    return html`
        <sp-dialog-wrapper
            ?no-transitions=${noTransitions}
            open
            underlay
            size="large"
            headline="Wrapped Dialog w/ Buttons"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            footer="Content for footer"
            @confirm=${action('confirm')}
            @secondary=${action('secondary')}
            @cancel=${action('cancel')}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};

export const wrapperFullscreen = (): TemplateResult => {
    const noTransitions = boolean('No Transitions', false, 'Testing');
    return html`
        <sp-dialog-wrapper
            ?no-transitions=${noTransitions}
            open
            headline="Wrapped Dialog - Fullscreen"
            mode="fullscreen"
            confirm-label="Keep Both"
            secondary-label="Replace"
            cancel-label="Cancel"
            footer="Content for footer"
            @confirm=${action('confirm')}
            @secondary=${action('secondary')}
            @cancel=${action('cancel')}
        >
            Content of the dialog
        </sp-dialog-wrapper>
    `;
};
