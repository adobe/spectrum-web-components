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

import '../sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-properties.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-view-all-tags.js';
import { ActionGroup } from '../src/ActionGroup.js';

export default {
    title: 'Action Group',
    component: 'sp-action-group',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-action-group>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
};

export const selectsSingle = (): TemplateResult => {
    return html`
        <sp-action-group
            label="Favorite Color"
            selects="single"
            @change=${({ target }: Event & { target: ActionGroup }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
        >
            <sp-action-button>Red</sp-action-button>
            <sp-action-button>Green</sp-action-button>
            <sp-action-button>Blue</sp-action-button>
            <sp-action-button selected>Yellow</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `;
};

export const selectsSingleWithTooltips = (): TemplateResult => {
    return html`
        <sp-action-group
            label="Favorite Color"
            selects="single"
            @change=${({ target }: Event & { target: ActionGroup }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
        >
            <overlay-trigger>
                <sp-action-button slot="trigger">Red</sp-action-button>
                <sp-tooltip slot="hover-content">
                    This is a cool color.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Green</sp-action-button>
                <sp-tooltip slot="hover-content">
                    You wouldn't be wrong.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Blue</sp-action-button>
                <sp-tooltip slot="hover-content">The sky in spring.</sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Yellow</sp-action-button>
                <sp-tooltip slot="hover-content">The sun at noon.</sp-tooltip>
            </overlay-trigger>
        </sp-action-group>
        <div>Selected:</div>
    `;
};

export const selectsMultiple = (): TemplateResult => {
    return html`
        <sp-action-group
            label="Favorite Colors"
            selects="multiple"
            emphasized
            @change=${({ target }: Event & { target: ActionGroup }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
        >
            <sp-action-button>Red</sp-action-button>
            <sp-action-button selected>Green</sp-action-button>
            <sp-action-button selected>Blue</sp-action-button>
            <sp-action-button>Yellow</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `;
};

export const selectsMultipleWithTooltips = (): TemplateResult => {
    return html`
        <sp-action-group
            label="Favorite Color"
            selects="multiple"
            @change=${({ target }: Event & { target: ActionGroup }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
        >
            <overlay-trigger>
                <sp-action-button slot="trigger">Red</sp-action-button>
                <sp-tooltip slot="hover-content">
                    This is a cool color.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Green</sp-action-button>
                <sp-tooltip slot="hover-content">
                    You wouldn't be wrong.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Blue</sp-action-button>
                <sp-tooltip slot="hover-content">The sky in spring.</sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Yellow</sp-action-button>
                <sp-tooltip slot="hover-content">The sun at noon.</sp-tooltip>
            </overlay-trigger>
        </sp-action-group>
        <div>Selected:</div>
    `;
};

export const iconsOnly = (): TemplateResult => {
    return html`
        <sp-action-group>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const quietIconsOnly = (): TemplateResult => {
    return html`
        <sp-action-group quiet>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const compact = (): TemplateResult => {
    return html`
        <sp-action-group compact>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
};

export const compactIconsOnly = (): TemplateResult => {
    return html`
        <sp-action-group compact>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const compactQuietIconsOnly = (): TemplateResult => {
    return html`
        <sp-action-group compact quiet>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const vertical = (): TemplateResult => {
    return html`
        <sp-action-group vertical>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
};

export const iconsOnlyVertical = (): TemplateResult => {
    return html`
        <sp-action-group vertical>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const quietIconsOnlyVertical = (): TemplateResult => {
    return html`
        <sp-action-group vertical quiet>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const compactVertical = (): TemplateResult => {
    return html`
        <sp-action-group vertical compact>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
};

export const compactIconsOnlyVertical = (): TemplateResult => {
    return html`
        <sp-action-group vertical compact>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const compactQuietIconsOnlyVertical = (): TemplateResult => {
    return html`
        <sp-action-group vertical compact quiet>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const justified = (): TemplateResult => {
    return html`
        <sp-action-group justified>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
};

export const iconsOnlyJustified = (): TemplateResult => {
    return html`
        <sp-action-group justified>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};

export const compactIconsOnlyJustified = (): TemplateResult => {
    return html`
        <sp-action-group compact justified>
            <sp-action-button label="Properties">
                <sp-icon-properties slot="icon"></sp-icon-properties>
            </sp-action-button>
            <sp-action-button label="Info">
                <sp-icon-info slot="icon"></sp-icon-info>
            </sp-action-button>
            <sp-action-button label="View All Tags">
                <sp-icon-view-all-tags slot="icon"></sp-icon-view-all-tags>
            </sp-action-button>
        </sp-action-group>
    `;
};
