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

import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { ActionMenuMarkup } from './';

import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import { MenuItem } from '@spectrum-web-components/menu/src/MenuItem.js';

export default {
    component: 'sp-action-menu',
    title: 'Action menu',
    argTypes: {
        disabled: {
            name: 'disabled',
            type: { name: 'boolean', required: false },
            description:
                'Disable this control. It will not receive focus or events.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the menu is open or not.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: 'boolean',
        },
        visibleLabel: {
            name: 'Visible Label',
            description: 'The placeholder content for the picker.',
            type: { name: 'string', required: false },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            control: 'text',
        },
    },
    args: {
        visibleLabel: 'More Actions',
        disabled: false,
        open: false,
    },
};

interface StoryArgs {
    visibleLabel?: string;
    disabled?: boolean;
    open?: boolean;
    customIcon?: string | TemplateResult;
    selects?: 'single';
    selected?: boolean;
}

const Template = (args: StoryArgs = {}): TemplateResult =>
    ActionMenuMarkup(args);

export const Default = (args: StoryArgs = {}): TemplateResult => Template(args);

export const selects = (args: StoryArgs = {}): TemplateResult =>
    Template({
        ...args,
        selects: 'single',
        selected: true,
    });
selects.args = {
    open: true,
};

export const iconOnly = (args: StoryArgs = {}): TemplateResult =>
    Template(args);
iconOnly.args = {
    visibleLabel: '',
};

export const customIcon = (args: StoryArgs): TemplateResult => Template(args);
customIcon.args = {
    customIcon: html`
        <sp-icon-settings slot="icon"></sp-icon-settings>
    `,
    visibleLabel: '',
};

export const submenu = (): TemplateResult => {
    return html`
        <sp-action-menu label="More Actions">
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
    `;
};

export const controlled = (): TemplateResult => {
    const state = {
        snap: true,
        grid: false,
        guides: true,
    };
    function toggle(prop: keyof typeof state) {
        return (event: Event): void => {
            const item = event.target as MenuItem;
            state[prop] = !state[prop];
            // in Lit-based usage, this would be handled via render():
            // <sp-menu-item ?selected=${this.isSomethingSelected}>
            item.selected = state[prop];
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            document.getElementById(
                'state-json'
            )!.textContent = `application state: ${JSON.stringify(state)}`;
        };
    }
    return html`
        <sp-action-menu label="View">
            <sp-menu-item @click=${() => alert('action')}>
                Non-selectable action
            </sp-menu-item>
            <sp-menu-item ?selected=${state.snap} @click=${toggle('snap')}>
                Snap
            </sp-menu-item>
            <sp-menu-item>
                Show
                <sp-menu slot="submenu">
                    <sp-menu-item
                        ?selected=${state.grid}
                        @click=${toggle('grid')}
                    >
                        Grid
                    </sp-menu-item>
                    <sp-menu-item
                        ?selected=${state.guides}
                        @click=${toggle('guides')}
                    >
                        Guides
                    </sp-menu-item>
                </sp-menu>
            </sp-menu-item>
        </sp-action-menu>
        <span id="state-json"></span>
    `;
};
