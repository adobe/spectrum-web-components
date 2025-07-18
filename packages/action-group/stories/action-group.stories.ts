/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, TemplateResult } from '@spectrum-web-components/base';
import { spreadProps } from '../../../test/lit-helpers.js';

import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-properties.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-view-all-tags.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { ActionGroup } from '@spectrum-web-components/action-group/src/ActionGroup.js';

export default {
    title: 'Action Group',
    component: 'sp-action-group',
    args: {
        compact: false,
        emphasized: false,
        justified: false,
        quiet: false,
        vertical: false,
        size: 'm',
    },
    argTypes: {
        compact: {
            name: 'compact',
            description:
                'Visually joins the buttons together to clarify their relationship to one another.',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        emphasized: {
            name: 'emphasized',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        justified: {
            name: 'justified',
            description:
                'Aligns the action group items to use all the available space on that line.',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        quiet: {
            name: 'quiet',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        vertical: {
            name: 'vertical',
            description: 'Changes the orientation of the action group.',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        size: {
            name: 'size',
            description: 'The size at which to display the action group.',
            type: { name: 'string', required: true },
            table: {
                type: { summary: '"s" | "m" | "l" | "xl"' },
                defaultValue: { summary: 'm' },
            },
            control: {
                type: 'select',
                options: ['s', 'm', 'l', 'xl'],
            },
        },
    },
};

interface Properties {
    compact?: boolean;
    emphasized?: boolean;
    justified?: boolean;
    quiet?: boolean;
    vertical?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    [prop: string]: unknown;
}

function renderIconButtons(args: Properties): TemplateResult {
    return html`
        <sp-action-group ${spreadProps(args)}>
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
}

function renderButtons(args: Properties): TemplateResult {
    return html`
        <sp-action-group ${spreadProps(args)}>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
        </sp-action-group>
    `;
}

function displaySelectionState(): void {
    const group = document.querySelector('sp-action-group') as ActionGroup;
    const selectedDiv = group.nextElementSibling;
    if (selectedDiv) {
        selectedDiv.textContent = `Selected: ${JSON.stringify(group.selected)}`;
    }
}

export const Default = (args: Properties): TemplateResult =>
    renderButtons(args);

export const HasActionMenuAsChild = (args: Properties): TemplateResult => {
    return html`
        <sp-action-group ${spreadProps(args)}>
            <sp-action-button id="first">Button 1</sp-action-button>
            <sp-action-button id="second">Longer Button 2</sp-action-button>
            <sp-action-button id="third">Short 3</sp-action-button>
            <sp-action-menu label="More Actions" id="action-menu">
                <sp-menu-item id="first-menu-item">One</sp-menu-item>
                <sp-menu-item id="second-menu-item">Two</sp-menu-item>
                <sp-menu-item id="third-menu-item">Three</sp-menu-item>
                <sp-menu-item id="fourth-menu-item">
                    Select some items
                    <sp-menu slot="submenu" selects="multiple">
                        <sp-menu-item id="first-sub-menu-item">A</sp-menu-item>
                        <sp-menu-item selected id="second-sub-menu-item">
                            B
                        </sp-menu-item>
                        <sp-menu-item id="third-sub-menu-item">C</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-action-menu>
        </sp-action-group>
    `;
};

export const selectsSingle = (args: Properties): TemplateResult => {
    requestAnimationFrame(displaySelectionState);
    return html`
        <sp-action-group
            ?compact=${args.compact}
            ?emphasized=${args.emphasized}
            ?quiet=${args.quiet}
            ?justified=${args.justified}
            ?vertical=${args.vertical}
            size=${args.size}
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

export const selectsMultiple = (args: Properties): TemplateResult => {
    requestAnimationFrame(displaySelectionState);
    return html`
        <sp-action-group
            ${spreadProps(args)}
            label="Favorite Colors"
            selects="multiple"
            size=${args.size}
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

export const selectsMultipleWithTooltips = (
    args: Properties
): TemplateResult => {
    return html`
        <sp-action-group
            ${spreadProps(args)}
            label="Favorite Color"
            selects="multiple"
            size=${args.size}
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

export const selectsMultipleControlled = (args: Properties): TemplateResult => {
    requestAnimationFrame(displaySelectionState);
    return html`
        <sp-action-group
            ${spreadProps(args)}
            selects="multiple"
            .selected=${['donuts', 'crepecakes']}
            label="Favorite Dessert"
            size=${args.size}
            @change=${({ target }: Event & { target: ActionGroup }) => {
                const next = target.nextElementSibling as HTMLDivElement;
                next.textContent = `Selected: ${JSON.stringify(
                    target.selected
                )}`;
            }}
        >
            <sp-action-button value="lavacakes">Lava Cakes</sp-action-button>
            <sp-action-button value="donuts">Donuts</sp-action-button>
            <sp-action-button value="crepecakes">Crepe Cake</sp-action-button>
            <sp-action-button value="fruittarts">Fruit Tarts</sp-action-button>
        </sp-action-group>
        <div>Selected:</div>
    `;
};

export const iconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);

export const quietIconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);
quietIconsOnly.args = {
    quiet: true,
};

export const compact = (args: Properties): TemplateResult =>
    renderButtons(args);
compact.args = {
    compact: true,
};

export const compactIconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);
compactIconsOnly.args = {
    compact: true,
};

export const compactQuietIconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);
compactQuietIconsOnly.args = {
    compact: true,
    quiet: true,
};

export const vertical = (args: Properties): TemplateResult =>
    renderButtons(args);
vertical.args = {
    vertical: true,
};

export const verticalIconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);
verticalIconsOnly.args = {
    vertical: true,
};

export const verticalQuietIconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);
verticalQuietIconsOnly.args = {
    quiet: true,
    vertical: true,
};

export const compactVertical = (args: Properties): TemplateResult =>
    renderButtons(args);
compactVertical.args = {
    compact: true,
    vertical: true,
};

export const compactVerticalIconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);
compactVerticalIconsOnly.args = {
    compact: true,
    vertical: true,
};

export const compactQuietVerticalIconsOnly = (
    args: Properties
): TemplateResult => renderIconButtons(args);
compactQuietVerticalIconsOnly.args = {
    compact: true,
    quiet: true,
    vertical: true,
};

export const justified = (args: Properties): TemplateResult =>
    renderButtons(args);
justified.args = {
    justified: true,
};

export const justifiedIconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);
justifiedIconsOnly.args = {
    justified: true,
};

export const compactJustifiedIconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);
compactJustifiedIconsOnly.args = {
    compact: true,
    justified: true,
};
