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

import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import { scopedStory } from '@spectrum-web-components/shared/src/scoped-story.js';
import { ActionBarScoped } from '../src/ActionBarScoped.js';
import { ActionButton } from '@spectrum-web-components/action-button';
import { IconEdit } from '@spectrum-web-components/icons-workflow/src/elements/IconEdit.js';
import { IconMore } from '@spectrum-web-components/icons-workflow/src/elements/IconMore.js';
import { ScopedStory } from '@spectrum-web-components/shared';

export default {
    title: 'Action Bar',
    component: 'sp-action-bar',
};

/**
 * scoped story creates a scoped component which assigns the tags used in the story template to be reused with scoped defination, however it would
 * also require the children defination as it can not pick up the global defination in ScopedRegistryHost.
 */
const scopedComponentMapping = [
    ['sp-action-bar', ActionBarScoped],
    ['sp-action-button', ActionButton],
    ['sp-icon-edit', IconEdit],
    ['sp-icon-more', IconMore],
];

export const Default = (): TemplateResult => {
    return html`
        <sp-action-bar open>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};

export const DefaultScoped = (): ScopedStory =>
    scopedStory(Default, scopedComponentMapping);

export const emphasized = (): TemplateResult => {
    return html`
        <sp-action-bar open emphasized>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};

export const emphasizedScoped = (): ScopedStory =>
    scopedStory(emphasized, scopedComponentMapping);

export const fixed = (): TemplateResult => {
    return html`
        <style>
            [variant='fixed'] {
                bottom: 2.5em;
                inset-inline-end: 1em;
            }
        </style>
        <sp-action-bar open variant="fixed">
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};

export const flexible = (): TemplateResult => {
    return html`
        <sp-action-bar open flexible emphasized>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};
