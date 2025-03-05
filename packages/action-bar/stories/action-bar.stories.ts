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
import { css, html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

import { Template } from './template.js';
import type { Properties } from './args.js';
import { args, argTypes } from './args.js';

const meta: Meta<Properties> = {
    title: 'Action Bar',
    component: 'sp-action-bar',
    parameters: {
        // Getting the Figma link: https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/MPtRIVRzPp2VHiEplwXL2X/S-%2F-Manual?node-id=465%3A3127&t=xbooxCWItOFgG2xM-1',
        },
    },
    argTypes,
    args,
};

export const Default = (args?: Properties): TemplateResult => Template(args);
Default.args = {
    tools: html`
        <sp-action-button slot="buttons" label="Edit">
            <sp-icon-edit slot="icon"></sp-icon-edit>
        </sp-action-button>
        <sp-action-button slot="buttons" label="Share">
            <sp-icon-share slot="icon"></sp-icon-share>
        </sp-action-button>
    `,
};

export const Emphasized = Default.bind({});
Emphasized.args = {
    emphasized: true
};

export const Fixed = Default.bind({});
Fixed.args = {
    variant: 'fixed',
    customStyles: css`
        [variant='fixed'] {
            bottom: 2.5em;
            inset-inline-end: 1em;
        }
    `,
};

export const Flexible = Default.bind({});
Flexible.args = {
    variant: 'flexible',
    emphasized: true,
};

export const ActionMenuAsChild = Default.bind({});
ActionMenuAsChild.args = {
    tools: html`
        <sp-action-button slot="buttons" label="Edit">
            <sp-icon-edit slot="icon"></sp-icon-edit>
        </sp-action-button>
        <sp-action-menu label="More Actions" slot="buttons">
            <sp-menu-item>One</sp-menu-item>
            <sp-menu-item>Two</sp-menu-item>
            <sp-menu-item>
                Select some items
                <sp-menu slot="submenu" selects="multiple">
                    <sp-menu-item>A</sp-menu-item>
                    <sp-menu-item selected>B</sp-menu-item>
                    <sp-menu-item>C</sp-menu-item>
                </sp-menu>
            </sp-menu-item>
        </sp-action-menu>
    `,
};

export default meta;
