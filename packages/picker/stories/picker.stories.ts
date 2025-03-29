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

import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import '../../overlay/stories/index.js';
import { areIconsPresent, isOverlayOpen } from '../../overlay/stories/index.js';
import { argTypes } from './args.js';
import { states } from './states.js';
import { handleChange, Properties, Template } from './template.js';

export default {
    title: 'Picker',
    component: 'sp-picker',
    args: {
        disabled: false,
        invalid: false,
        open: false,
        quiet: false,
        pending: false,
    },
    argTypes: {
        ...argTypes,
        onChange: { action: 'change' },
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
        pending: {
            name: 'pending',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

export const Default = {
    render: (args: Properties): TemplateResult => {
        return html`
        <sp-field-label for="picker-1" size=${ifDefined(args.size)}>
            Where do you live?
        </sp-field-label>
        <sp-picker
            id="picker-1"
            @change=${handleChange(args)}
            label="Select a Country with a very long label, too long, in fact"
            ${spreadProps(args)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
    },
};

export const ForcePopoverOnMobile = {
    render: (args: Properties): TemplateResult => {
        return html`
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
                    Chrome will set user-agent strings, simulate touch, and
                    adjust DPI.
                </li>
                <li>Reload the page</li>
                <li>Click the Picker 1 and see a tray</li>
                <li>Click the Picker 2 and see a popover</li>
            </ol>
            <sp-field-label for="picker-1" size=${ifDefined(args.size)}>
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-1"
                @change=${handleChange(args)}
                label="Select a Country with a very long label, too long, in fact"
                ${spreadProps(args)}
            >
                <sp-menu-item value="option-1">Deselect</sp-menu-item>
                <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                <sp-menu-item value="option-3">Feather...</sp-menu-item>
                <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
                <sp-menu-item value="option-5">Save Selection</sp-menu-item>
                <sp-menu-item disabled value="option-6">
                    Make Work Path
                </sp-menu-item>
            </sp-picker>
            <sp-field-label for="picker-2" size=${ifDefined(args.size)}>
                Do you want to see a popover menu?
            </sp-field-label>
            <sp-picker
                id="picker-2"
                force-popover
                @change=${handleChange(args)}
                label="Select an option"
            >
                <sp-menu-item value="option-1">Yes</sp-menu-item>
                <sp-menu-item value="option-2">No</sp-menu-item>
            </sp-picker>
            <div>
                <p>
                    The forcePopover attribute overrides the mobile device
                    functionality of rendering a tray so that a popover will
                    always render no matter the device.
                </p>
                <ol>
                    <li>Open Chrome DevTools (or equivalent).</li>
                    <li>Toggle the Device Toolbar (the phone/tablet icon).</li>
                    <li>Select a device preset (e.g. iPhone 12).</li>
                    <li>
                        Chrome will set user-agent strings, simulate touch, and
                        adjust DPI.
                    </li>
                    <li>Reload the page</li>
                    <li>Click the Picker 1 and see a tray</li>
                    <li>Click the Picker 2 and see a popover</li>
                </ol>
                <sp-field-label for="picker-1" size=${ifDefined(args.size)}>
                    Do you want to see a tray menu?
                </sp-field-label>
                <sp-picker
                    id="picker-1"
                    @change=${handleChange(args)}
                    label="Select an option"
                >
                    <sp-menu-item value="option-1">Yes</sp-menu-item>
                    <sp-menu-item value="option-2">No</sp-menu-item>
                </sp-picker>
                <sp-field-label for="picker-2" size=${ifDefined(args.size)}>
                    Do you want to see a popover menu?
                </sp-field-label>
                <sp-picker
                    id="picker-2"
                    forcePopover
                    @change=${handleChange(args)}
                    label="Select an option"
                >
                    <sp-menu-item value="option-1">Yes</sp-menu-item>
                    <sp-menu-item value="option-2">No</sp-menu-item>
                </sp-picker>
                <div>
                    <p>
                        This button should't be clickable if a popover is open
                        over it.
                    </p>
                    <sp-button
                        @click=${() => console.log('Whoops! I was clicked.')}
                    >
                        Shouldn't be clickable
                    </sp-button>
                </div>
            </div>
        `;
    },
};

export const Disabled = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        disabled: true,
    } as Properties,
};

export const Invalid = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        invalid: true,
    } as Properties,
};

export const Tooltip = {
    render: (args: Properties): TemplateResult => {
        const { open, ...rest } = args;
        return html`
            <sp-field-label for="picker-1" size=${ifDefined(args.size)}>
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-1"
                @change=${handleChange(args)}
                label="Select a Country with a very long label, too long, in fact"
                ${spreadProps(rest)}
            >
                <sp-menu-item value="option-1">Deselect</sp-menu-item>
                <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                <sp-menu-item value="option-3">Feather...</sp-menu-item>
                <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
                <sp-menu-item value="option-5">Save Selection</sp-menu-item>
                <sp-menu-item disabled value="option-6">
                    Make Work Path
                </sp-menu-item>
                <sp-tooltip
                    slot="tooltip"
                    ?open=${open}
                    self-managed
                    placement="right"
                >
                    This Picker wants to know where you live.
                </sp-tooltip>
            </sp-picker>
            <p>This is some text.</p>
            <p>This is some text.</p>
            <p>
                This is a
                <a href="#anchor">link</a>
                .
            </p>
        `;
    },

    args: {
        open: true,
    } as Properties,

    decorators: [isOverlayOpen],
};

export const LeftSideLabel = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-field-label
                side-aligned="start"
                for="picker-1"
                size=${ifDefined(args.size)}
            >
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-1"
                @change=${handleChange(args)}
                label="Select a Country with a very long label, too long, in fact"
                ${spreadProps(args)}
            >
                <sp-menu-item value="option-1">Deselect</sp-menu-item>
                <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                <sp-menu-item value="option-3">Feather...</sp-menu-item>
                <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
                <sp-menu-item value="option-5">Save Selection</sp-menu-item>
                <sp-menu-item disabled value="option-6">
                    Make Work Path
                </sp-menu-item>
            </sp-picker>
            <p>This is some text.</p>
            <p>This is some text.</p>
            <p>
                This is a
                <a href="#anchor">link</a>
                .
            </p>
        `;
    },
};

export const NoVisibleLabel = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-picker
                @change=${handleChange(args)}
                label="Where do you live?"
                ${spreadProps(args)}
            >
                <sp-menu-item value="option-1">Deselect</sp-menu-item>
                <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                <sp-menu-item value="option-3">Feather...</sp-menu-item>
                <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
                <sp-menu-item value="option-5">Save Selection</sp-menu-item>
                <sp-menu-item disabled value="option-6">
                    Make Work Path
                </sp-menu-item>
            </sp-picker>
            <p>This is some text.</p>
            <p>This is some text.</p>
            <p>
                This is a
                <a href="#anchor">link</a>
                .
            </p>
        `;
    },
};

export const SlottedLabel = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-picker @change=${handleChange(args)} ${spreadProps(args)}>
                <span slot="label">Where do you live?</span>
                <sp-menu-item value="option-1">Deselect</sp-menu-item>
                <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                <sp-menu-item value="option-3">Feather...</sp-menu-item>
                <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
                <sp-menu-item value="option-5">Save Selection</sp-menu-item>
                <sp-menu-item disabled value="option-6">
                    Make Work Path
                </sp-menu-item>
            </sp-picker>
            <p>This is some text.</p>
            <p>This is some text.</p>
            <p>
                This is a
                <a href="#anchor">link</a>
                .
            </p>
        `;
    },
};

export const Quiet = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>
                Where do you live?
            </sp-field-label>
            <sp-picker
                ${spreadProps(args)}
                id="picker-quiet"
                @change=${handleChange(args)}
                label="Pick an item"
            >
                <sp-menu-item value="1">Item 1</sp-menu-item>
                <sp-menu-item value="2">Item 2</sp-menu-item>
                <sp-menu-item value="3">Item 3</sp-menu-item>
                <sp-menu-item value="4">Item 4</sp-menu-item>
            </sp-picker>
            <p>This is some text.</p>
            <p>This is some text.</p>
            <p>
                This is a
                <a href="#anchor">link</a>
                .
            </p>
        `;
    },

    args: {
        quiet: true,
    } as Properties,
};

export const iconsNone = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            value="1"
            icons="none"
        >
            <sp-menu-item value="1" selected active focused>
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `;
};

export const Icons = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>
                Choose an action type...
            </sp-field-label>
            <sp-picker
                ${spreadProps(args)}
                id="picker-quiet"
                @change=${handleChange(args)}
                label="Pick an action"
                value="1"
            >
                <sp-menu-item value="1">
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                    Edit
                </sp-menu-item>
                <sp-menu-item value="2">
                    <sp-icon-copy slot="icon"></sp-icon-copy>
                    Copy
                </sp-menu-item>
                <sp-menu-item value="3">
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                    Delete
                </sp-menu-item>
            </sp-picker>
        `;
    },
};

export const IconsNone = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>
                Choose an action type...
            </sp-field-label>
            <sp-picker
                ${spreadProps(args)}
                id="picker-quiet"
                @change=${handleChange(args)}
                label="Pick an action"
                value="1"
                icons="none"
            >
                <sp-menu-item value="1">
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                    Edit
                </sp-menu-item>
                <sp-menu-item value="2">
                    <sp-icon-copy slot="icon"></sp-icon-copy>
                    Copy
                </sp-menu-item>
                <sp-menu-item value="3">
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                    Delete
                </sp-menu-item>
            </sp-picker>
        `;
    },

    args: {
        open: true,
    } as Properties,

    decorators: [isOverlayOpen],
};

export const IconValue = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>
                Choose an action type...
            </sp-field-label>
            <sp-picker
                ${spreadProps(args)}
                id="picker-quiet"
                @change=${handleChange(args)}
                label="Pick an action"
                icons="only"
                style="width: 100px"
                value="2"
            >
                <sp-menu-item value="1">
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                    Edit
                </sp-menu-item>
                <sp-menu-item value="2">
                    <sp-icon-copy slot="icon"></sp-icon-copy>
                    Copy
                </sp-menu-item>
                <sp-menu-item value="3">
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                    Delete
                </sp-menu-item>
            </sp-picker>
        `;
    },
};

export const IconsOnly = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>
                Choose an action type...
            </sp-field-label>
            <sp-picker
                ${spreadProps(args)}
                id="picker-quiet"
                @change=${handleChange(args)}
                label="Pick an action"
                style="width: 100px"
                value="3"
            >
                <sp-menu-item value="1">
                    <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
                </sp-menu-item>
                <sp-menu-item value="2">
                    <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>
                </sp-menu-item>
                <sp-menu-item value="3">
                    <sp-icon-delete slot="icon" label="Delete"></sp-icon-delete>
                </sp-menu-item>
            </sp-picker>
        `;
    },

    args: {
        open: true,
    } as Properties,

    decorators: [isOverlayOpen],
};

export const DynamicIcons = {
    render: (args: Properties): TemplateResult => {
        return html`
            <p>
                The icon displayed in the picker should match the icon of the
                selected menu item, even when the icons are updated dynamically.
            </p>
            <sp-field-label for="picker-quiet" size=${ifDefined(args.size)}>
                Choose an action type...
            </sp-field-label>
            <sp-picker
                ${spreadProps(args)}
                id="picker-quiet"
                @change=${handleChange(args)}
                label="Pick an action"
                value="2"
            >
                <sp-menu-item value="1">
                    <sp-icon
                        slot="icon"
                        src="https://loremicon.com/rect/20/20/1/png"
                    ></sp-icon>
                    Edit
                </sp-menu-item>
                <sp-menu-item value="2">
                    <sp-icon
                        slot="icon"
                        src="https://loremicon.com/rect/20/20/2/png"
                    ></sp-icon>
                    Copy
                </sp-menu-item>
                <sp-menu-item value="3">
                    <sp-icon
                        slot="icon"
                        src="https://loremicon.com/rect/20/20/3/png"
                    ></sp-icon>
                    Delete
                </sp-menu-item>
            </sp-picker>
            <sp-button
                @click=${() => {
                    const icons = document.querySelectorAll('sp-icon');
                    const seed = Math.round(Math.random() * 1000);
                    icons.forEach((icon, index) => {
                        icon.setAttribute(
                            'src',
                            `https://loremicon.com/rect/20/20/${seed + index}/png`
                        );
                    });
                    const picker = document.querySelector('sp-picker');
                    if (picker) picker.open = true;
                }}
            >
                Change icons
            </sp-button>
        `;
    },

    args: {
        open: true,
    } as Properties,

    decorators: [areIconsPresent],
};

export const Open = {
    render: (args: Properties): TemplateResult => {
        return html`
            <style>
                fieldset {
                    float: left;
                    clear: left;
                    margin-bottom: 15px;
                }
            </style>
            <fieldset class="backdrop-filter-test">
                <sp-field-label for="picker-open" size=${ifDefined(args.size)}>
                    Where do you live?
                </sp-field-label>
                <sp-picker
                    id="picker-open"
                    label="Open picker"
                    ${spreadProps(args)}
                    @change=${handleChange(args)}
                >
                    <span slot="label">
                        Select a Country with a very long label, too long, in
                        fact
                    </span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-picker>
            </fieldset>
            <fieldset>
                <sp-field-label
                    for="picker-closed"
                    size=${ifDefined(args.size)}
                >
                    Where do you live?
                </sp-field-label>
                <sp-picker
                    id="picker-closed"
                    label="Picker that displays below the options"
                    @change=${handleChange(args)}
                >
                    <span slot="label">
                        Other menu that goes behind the open one
                    </span>
                    <sp-menu-item>Not so many options...</sp-menu-item>
                </sp-picker>
            </fieldset>
        `;
    },

    args: {
        open: true,
    } as Properties,

    decorators: [isOverlayOpen],
};

export const OpenShowingEdgeCase = {
    render: (args: Properties): TemplateResult => {
        return html`
            <style>
                fieldset {
                    float: left;
                    clear: left;
                    margin-bottom: 15px;
                }
                /* Enforce CSS stacking to test "transition-behavior: allow-discrete" */
                /* Breaks the story in non-[popover] supporting browsers */
                fieldset:nth-of-type(2) {
                    position: relative;
                    z-index: 2;
                }
                .backdrop-filter-test {
                    backdrop-filter: saturate(80%);
                }
            </style>
            <p>
                In browser that do not support
                <code>[popover]</code>
                , the following "open"
                <code>sp-picker</code>
                will display behind both the closed
                <code>sp-picker</code>
                as well as the
                <code>fieldset</code>
                that contains it.
            </p>
            <p>
                Learn more about this situation in our
                <sp-link
                    href="https://opensource.adobe.com/spectrum-web-components/components/overlay/#fallback-support"
                >
                    documentation site
                </sp-link>
                .
            </p>
            <fieldset class="backdrop-filter-test">
                <sp-field-label for="picker-open" size=${ifDefined(args.size)}>
                    Where do you live?
                </sp-field-label>
                <sp-picker
                    id="picker-open"
                    label="Open picker"
                    ${spreadProps(args)}
                    @change=${handleChange(args)}
                >
                    <span slot="label">
                        Select a Country with a very long label, too long, in
                        fact
                    </span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-picker>
            </fieldset>
            <fieldset>
                <sp-field-label
                    for="picker-closed"
                    size=${ifDefined(args.size)}
                >
                    Where do you live?
                </sp-field-label>
                <sp-picker
                    id="picker-closed"
                    label="Picker that displays below the options"
                    @change=${handleChange(args)}
                >
                    <span slot="label">
                        Other menu that goes behind the open one
                    </span>
                    <sp-menu-item>Not so many options...</sp-menu-item>
                </sp-picker>
            </fieldset>
        `;
    },

    args: {
        open: true,
    } as Properties,

    decorators: [isOverlayOpen],

    swc_vrt: {
        skip: true,
    },

    parameters: {
        // Disables Chromatic's snapshotting on a global level
        chromatic: { disableSnapshot: true },
    },
};

export const InitialValue = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-field-label for="picker-initial" size=${ifDefined(args.size)}>
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-initial"
                @change=${handleChange(args)}
                value="item-2"
                ${spreadProps(args)}
            >
                <span slot="label">
                    Select a Country with a very long label, too long in fact
                </span>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save Selection</sp-menu-item>
                <sp-menu-item disabled value="item-6">
                    Make Work Path
                </sp-menu-item>
            </sp-picker>
        `;
    },
};

export const ReadOnly = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-picker
                @change=${handleChange(args)}
                readonly
                value="item-2"
                ${spreadProps(args)}
            >
                <span slot="label">
                    Select a Country with a very long label, too long in fact
                </span>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save Selection</sp-menu-item>
                <sp-menu-item disabled value="item-6">
                    Make Work Path
                </sp-menu-item>
            </sp-picker>
        `;
    },
};

export const Custom = {
    render: (args: Properties): TemplateResult => {
        const initialState = 'lb1-mo';
        return html`
            <sp-field-label for="picker-state" size=${ifDefined(args.size)}>
                What state do you live in?
            </sp-field-label>
            <sp-picker
                style="width: 400px;"
                @change=${handleChange(args)}
                id="picker-state"
                label="Pick a state"
                ${spreadProps(args)}
                value=${initialState}
            >
                ${states.map(
                    (state) => html`
                        <sp-menu-item
                            id=${state.id}
                            value=${state.id}
                            ?selected=${state.id === initialState}
                        >
                            ${state.label}
                        </sp-menu-item>
                    `
                )}
            </sp-picker>
            <p>This is some text.</p>
            <p>This is some text.</p>
            <p>
                This is a
                <a href="#anchor">link</a>
                .
            </p>
        `;
    },

    args: {
        open: true,
    } as Properties,

    decorators: [isOverlayOpen],
};

export const BackgroundClickTest = {
    render: (): TemplateResult => {
        return html`
            <div style="display: flex; flex-direction: column;">
                <sp-picker size="l">
                    <sp-menu-item value="option-1">Deselect</sp-menu-item>
                    <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
                </sp-picker>
                <div style="position: absolute; bottom: 50px;">
                    <sp-button
                        @click=${() => {
                            console.log(
                                'this button should not have been clicked...'
                            );
                        }}
                        size="l"
                    >
                        I shall not be clicked
                    </sp-button>
                </div>
            </div>
        `;
    },

export const BackgroundClickTest = (): TemplateResult => {
    return html`
        <div style="display: flex; flex-direction: column;">
            <sp-picker size="l">
                <sp-menu-item value="option-1">Deselect</sp-menu-item>
                <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            </sp-picker>
            <div style="position: absolute; bottom: 50px;">
                <sp-button
                    @click=${() => {
                        alert(
                            'this button should not receive a click event on menu-item selection'
                        );
                        console.log(
                            'this button should not receive a click event on menu-item selection'
                        );
                    }}
                    size="l"
                >
                    I shall not be clicked
                </sp-button>
            </div>
        </div>
    `;
};
