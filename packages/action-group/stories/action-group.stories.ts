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

import type { Meta } from '@storybook/web-components';
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
import type { Properties } from './args.js';
import { args, argTypes } from './args.js';
import { renderIconButtons} from './template.js';

const meta: Meta<Properties> = {
    title: 'Action Group',
    component: 'sp-action-group',
    args,
    argTypes,
};

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

export const IconsOnly = (args: Properties): TemplateResult =>
    renderIconButtons(args);

export const QuietIconsOnly = IconsOnly.bind({});
QuietIconsOnly.args = {
    quiet: true,
};

export const Compact = Default.bind({});
Compact.args = {
    compact: true,
};

export const CompactIconsOnly = IconsOnly.bind({});
CompactIconsOnly.args = {
    compact: true,
};

export const CompactQuietIconsOnly = IconsOnly.bind({});
CompactQuietIconsOnly.args = {
    compact: true,
    quiet: true,
};

export const Vertical = Default.bind({});
Vertical.args = {
    vertical: true,
};

export const vVrticalIconsOnly = IconsOnly.bind({});
VerticalIconsOnly.args = {
    vertical: true,
};

export const VerticalQuietIconsOnly = IconsOnly.bind({});
VerticalQuietIconsOnly.args = {
    quiet: true,
    vertical: true,
};

export const CompactVertical = Default.bind({});
CompactVertical.args = {
    compact: true,
    vertical: true,
};

export const CompactVerticalIconsOnly = IconsOnly.bind({});
CompactVerticalIconsOnly.args = {
    compact: true,
    vertical: true,
};

export const CompactQuietVerticalIconsOnly = IconsOnly.bind({});
CompactQuietVerticalIconsOnly.args = {
    compact: true,
    quiet: true,
    vertical: true,
};

export const Justified = Default.bind({});
Justified.args = {
    justified: true,
};

export const JustifiedIconsOnly = IconsOnly.bind({});
JustifiedIconsOnly.args = {
    justified: true,
};

export const CompactJustifiedIconsOnly = IconsOnly.bind({});
CompactJustifiedIconsOnly.args = {
    compact: true,
    justified: true,
};

export default meta;
