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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import { slottableRequest } from '@spectrum-web-components/overlay/src/slottable-request-directive.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { makeOverBackground } from '../../button/stories/index.js';
import { isOverlayOpen } from '../../overlay/stories/index.js';
import { ActionMenuMarkup } from './';

import type { ActionMenu } from '@spectrum-web-components/action-menu';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import { Menu } from '@spectrum-web-components/menu';
import type { MenuItem } from '@spectrum-web-components/menu/src/MenuItem.js';
import { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';

export default {
    component: 'sp-action-menu',
    title: 'Action menu',
    argTypes: {
        onChange: { action: 'change' },
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
        tooltipDescription: {
            name: 'Tooltip Description',
            type: { name: 'string', required: false },
            description: 'Tooltip description',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            control: {
                type: 'text',
            },
        },
        tooltipPlacement: {
            name: 'Tooltip Placement',
            type: { name: 'string', required: false },
            description: 'Tooltip Placement.',
            table: {
                defaultValue: { summary: 'bottom' },
            },
            control: {
                options: [
                    'auto',
                    'auto-start',
                    'auto-end',
                    'top',
                    'bottom',
                    'right',
                    'left',
                    'top-start',
                    'top-end',
                    'bottom-start',
                    'bottom-end',
                    'right-start',
                    'right-end',
                    'left-start',
                    'left-end',
                    'none',
                ],
                type: 'select',
            },
        },
        quiet: {
            name: 'quiet',
            type: { name: 'boolean', required: false },
            description: 'Quiet rendering',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        staticColorValue: {
            name: 'static-color',
            type: { name: 'string', required: false },
            description:
                'The visual static color variant to apply to the button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'none' },
            },
            control: {
                type: 'select',
                labels: {
                    white: 'white',
                    black: 'black',
                    none: undefined,
                },
                options: ['white', 'black', 'none'],
            },
        },
        align: {
            name: 'align',
            type: { name: 'string', required: false },
            description: 'Alignment of the Action Menu',
            table: {
                defaultValue: { summary: 'start' },
            },
            control: {
                type: 'select',
                labels: {
                    start: 'start',
                    end: 'end',
                },
            },
            options: ['start', 'end'],
        },
    },
    args: {
        align: 'start',
        visibleLabel: 'More Actions',
        disabled: false,
        forcePopover: false,
        open: false,
        quiet: false,
        tooltipDescription: '',
        tooltipPlacement: 'bottom',
        static: undefined,
    },
};

interface StoryArgs {
    align?: 'start' | 'end';
    visibleLabel?: string;
    disabled?: boolean;
    open?: boolean;
    customIcon?: string | undefined;
    selects?: 'single';
    selected?: boolean;
    quiet?: boolean;
    staticValue?: 'white' | 'black' | undefined;
    tooltipDescription?: string | 'none';
    tooltipPlacement?: Placement;
    forcePopover?: boolean;
}

const Template = (args: StoryArgs = {}): TemplateResult =>
    ActionMenuMarkup(args);

export const Default = (args: StoryArgs = {}): TemplateResult => Template(args);

export const staticWhite = (args: StoryArgs = {}): TemplateResult =>
    Template(args);
staticWhite.args = {
    staticValue: 'white',
};
staticWhite.decorators = [makeOverBackground()];
export const staticBlack = (args: StoryArgs = {}): TemplateResult =>
    Template(args);
staticBlack.args = {
    staticValue: 'black',
};
staticBlack.decorators = [makeOverBackground()];
export const quiet = (args: StoryArgs = {}): TemplateResult => Template(args);
quiet.args = {
    quiet: true,
};

export const forcePopoverOnMobile = (): TemplateResult => html`
    <div style="padding: 40px">
        <h1>Force Popover on Mobile</h1>
        <p>
            The force-popover attribute overrides the mobile device
            functionality of rendering a tray so that a popover will always
            render no matter the device.
        </p>
        <ol>
            <li>Open Chrome DevTools (or equivalent).</li>
            <li>Toggle the Device Toolbar (the phone/tablet icon).</li>
            <li>Select a device preset (e.g. iPhone 12).</li>
            <li>
                Chrome will set user-agent strings, simulate touch, and adjust
                DPI.
            </li>
            <li>Reload the page</li>
            <li>Click the Action Menu and see a popover</li>
        </ol>
        <sp-action-menu force-popover>
            <span slot="icon">
                <sp-icon-settings></sp-icon-settings>
            </span>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-action-menu>
    </div>
`;
export const labelOnly = ({
    align = 'start',
    changeHandler = (() => undefined) as (event: Event) => void,
    disabled = false,
    open = false,
    size = 'm' as 'm' | 's' | 'l' | 'xl' | 'xxl',
    selects = '' as 'single',
    selected = false,
} = {}): TemplateResult => html`
    <sp-action-menu
        ?disabled=${disabled}
        ?open=${open}
        size=${size}
        @change=${(event: Event & { target: Menu }): void => {
            navigator.clipboard.writeText(event.target.value);
            changeHandler(event);
        }}
        .selects=${selects ? selects : undefined}
        value=${selected ? 'Select Inverse' : ''}
        style=${ifDefined(align === 'end' ? 'float: inline-end;' : undefined)}
    >
        <span slot="label-only">Label Only</span>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item ?selected=${selected}>Select Inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    </sp-action-menu>
`;

export const selects = (args: StoryArgs = {}): TemplateResult =>
    Template({
        ...args,
        selects: 'single',
        selected: true,
    });
selects.args = {
    open: true,
};
selects.decorators = [isOverlayOpen];
selects.swc_vrt = {
    skip: true,
};

export const iconOnly = (args: StoryArgs = {}): TemplateResult =>
    Template(args);
iconOnly.args = {
    visibleLabel: '',
};

export const tooltipDescriptionAndPlacement = (
    args: StoryArgs = {}
): TemplateResult => Template(args);
tooltipDescriptionAndPlacement.args = {
    tooltipDescription: 'Your tooltip string here',
    visibleLabel: '',
    tooltipPlacement: 'bottom',
} as StoryArgs;

export const customIcon = (args: StoryArgs): TemplateResult => Template(args);
customIcon.args = {
    customIcon: `<sp-icon-settings slot="icon"></sp-icon-settings>`,
    visibleLabel: '',
};

export const submenu = ({ align = 'start' } = {}): TemplateResult => {
    return html`
        <sp-action-menu
            label="More Actions"
            style=${ifDefined(
                align === 'end' ? 'float: inline-end;' : undefined
            )}
        >
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

export const controlled = ({ align = 'start' } = {}): TemplateResult => {
    const state = {
        snap: true,
        grid: false,
        guides: true,
        latestChange: '',
    };
    function toggle(prop: 'snap' | 'grid' | 'guides') {
        return (event: Event): void => {
            const item = event.target as MenuItem;
            state[prop] = !state[prop];
            // in Lit-based usage, this would be handled via render():
            // <sp-menu-item ?selected=${this.isSomethingSelected}>
            item.selected = state[prop];
        };
    }
    function onChange(event: Event): void {
        state.latestChange = (event.target as MenuItem).value;
        logState();
    }
    function logState(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('state-json')!.textContent =
            `application state: ${JSON.stringify(state)}`;
    }
    return html`
        <sp-action-menu
            label="View"
            @change=${onChange}
            style=${ifDefined(
                align === 'end' ? 'float: inline-end;' : undefined
            )}
        >
            <sp-menu-item value="action" @click=${() => alert('action')}>
                Non-selectable action
            </sp-menu-item>
            <sp-menu-item
                value="snap"
                ?selected=${state.snap}
                @click=${toggle('snap')}
            >
                Snap
            </sp-menu-item>
            <sp-menu-item>
                Show
                <sp-menu
                    slot="submenu"
                    selects="multiple"
                    @change=${(event: Event) => event.preventDefault()}
                >
                    <sp-menu-item
                        value="grid"
                        ?selected=${state.grid}
                        @click=${toggle('grid')}
                    >
                        Grid
                    </sp-menu-item>
                    <sp-menu-item
                        value="guides"
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

export const groups = ({
    align = 'start',
    onChange,
}: {
    align: 'start' | 'end';
    onChange(value: string): void;
}): TemplateResult => html`
    <sp-action-menu
        id="groups"
        @change=${({ target: { value } }: Event & { target: ActionMenu }) =>
            onChange(value)}
        open
        style=${ifDefined(align === 'end' ? 'float: inline-end;' : undefined)}
    >
        <sp-menu-group id="cms">
            <span slot="header">cms</span>
            <sp-menu-item value="updateAllSiteContent">
                Update All Content
            </sp-menu-item>
            <sp-menu-item value="refreshAllXDs">Refresh All XDs</sp-menu-item>
        </sp-menu-group>
        <sp-menu-group id="ssg">
            <span slot="header">ssg</span>
            <sp-menu-item value="clearCache">Clear Cache</sp-menu-item>
        </sp-menu-group>
        <sp-menu-group id="vrt">
            <span slot="header">vrt</span>
            <sp-menu-item value="vrt-contributions">Contributions</sp-menu-item>
            <sp-menu-item value="vrt-internal">Internal</sp-menu-item>
            <sp-menu-item value="vrt-public">Public</sp-menu-item>
            <sp-menu-item value="vrt-patterns">Patterns</sp-menu-item>
            <sp-menu-item value="vrt">All</sp-menu-item>
        </sp-menu-group>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-group id="misc">
            <sp-menu-item value="logout">Logout</sp-menu-item>
        </sp-menu-group>
    </sp-action-menu>
`;

groups.decorators = [isOverlayOpen];

export const groupsWithSelects = ({
    onChange,
}: {
    onChange(value: string): void;
}): TemplateResult => {
    return html`
        <sp-action-menu
            @change=${({ target: { value } }: Event & { target: ActionMenu }) =>
                onChange(value)}
            label="Filter or Sort"
        >
            <sp-menu-group selects="single">
                <span slot="header">Sort By</span>
                <sp-menu-item>Name</sp-menu-item>
                <sp-menu-item>Created</sp-menu-item>
                <sp-menu-item>Modified</sp-menu-item>
            </sp-menu-group>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-group selects="multiple">
                <sp-menu-item>Reverse Order</sp-menu-item>
            </sp-menu-group>
        </sp-action-menu>
    `;
};

groupsWithSelects.swc_vrt = {
    skip: true,
};

groupsWithSelects.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

export const directive = (): TemplateResult => {
    const renderSubmenu = (): TemplateResult => html`
        <sp-menu-item>Submenu Item 1</sp-menu-item>
        <sp-menu-item>Submenu Item 2</sp-menu-item>
        <sp-menu-item>Submenu Item 3</sp-menu-item>
        <sp-menu-item>Submenu Item 4</sp-menu-item>
    `;
    const renderOptions = (): TemplateResult => html`
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select Inverse</sp-menu-item>
        <sp-menu-item>
            Feather...
            <sp-menu
                slot="submenu"
                ${slottableRequest(renderSubmenu)}
            ></sp-menu>
        </sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    `;
    return html`
        <sp-action-menu ${slottableRequest(renderOptions)}>
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
        </sp-action-menu>
    `;
};

directive.swc_vrt = {
    skip: true,
};

directive.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

export const withScrollEvent = (): TemplateResult => {
    function handleActionMenuScroll(): void {
        console.log('attached action menu scroll listener');
    }

    function renderMenuItems(): TemplateResult[] {
        return Array.from(
            { length: 30 },
            (_, i) => html`
                <sp-menu-item style="width: 100%;">
                    This is an Action Menu Item ${i + 1}
                </sp-menu-item>
            `
        );
    }

    return html`
        <sp-action-menu @scroll=${handleActionMenuScroll} open>
            <span slot="label">This is an Action Menu</span>
            ${renderMenuItems()}
        </sp-action-menu>
    `;
};

withScrollEvent.parameters = {
    chromatic: { disableSnapshot: true },
};

export const MenuItemAlerts = (): TemplateResult => html`
    <sp-action-menu size="m">
        <span slot="label">More Actions</span>
        <sp-menu-item @click=${() => alert('Deselect')}>Deselect</sp-menu-item>
        <sp-menu-item @click=${() => alert('Select inverse')}>
            Select inverse
        </sp-menu-item>
        <sp-menu-item @click=${() => alert('Feather...')}>
            Feather...
        </sp-menu-item>
        <sp-menu-item @click=${() => alert('Select and mask...')}>
            Select and mask...
        </sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item @click=${() => alert('Save selection')}>
            Save selection
        </sp-menu-item>
        <sp-menu-item disabled>Make work path</sp-menu-item>
    </sp-action-menu>
`;
