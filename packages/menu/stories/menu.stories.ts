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
import {
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import type { Menu, MenuItem } from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-export.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-share.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js';
import '@spectrum-web-components/search/sp-search.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/number-field/sp-number-field.js';
import '@spectrum-web-components/combobox/sp-combobox.js';
import '@spectrum-web-components/color-field/sp-color-field.js';

export default {
    component: 'sp-menu',
    title: 'Menu',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};

export const singleSelect = (): TemplateResult => {
    return html`
        <sp-menu
            selects="single"
            @change=${({
                target: { value },
            }: Event & { target: Menu }): void => {
                navigator.clipboard.writeText(value);
            }}
        >
            <sp-menu-item selected>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu
                selects="single"
                @change=${({
                    target: { value },
                }: Event & { target: Menu }): void => {
                    navigator.clipboard.writeText(value);
                }}
            >
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item selected>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};

export const multipleSelect = (): TemplateResult => {
    return html`
        <sp-menu selects="multiple">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item selected>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item selected>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>

        <sp-popover open>
            <sp-menu selects="multiple">
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item selected>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item selected>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};

export const controlled = (): TemplateResult => {
    const forceSelection = (event: Event & { target: Menu }): void => {
        event.target.updateComplete.then(() => {
            event.target.selected = ['Select and Mask...'];
        });
    };
    return html`
        <p>
            This Menu will default to a
            <code>selected</code>
            value of
            <code>[ 'Feather...', 'Save Selection' ]</code>
            but then on any subsequent interaction be forced to a
            <code>selected</code>
            value of
            <code>[ 'Select and Mask...' ]</code>
            .
        </p>
        <sp-menu selects="multiple" @change=${forceSelection}>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item selected>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item selected>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>
    `;
};
controlled.swc_vrt = {
    skip: true,
};

controlled.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

class MenuItemWithDescription extends LitElement {
    public overriderender(): TemplateResult {
        return html`
            <sp-menu>
                <sp-menu-item>
                    <sp-icon-export slot="icon"></sp-icon-export>
                    Quick export
                    <span slot="description">Share a snapshot</span>
                </sp-menu-item>
                <sp-menu-item>
                    <sp-icon-folder-open slot="icon"></sp-icon-folder-open>
                    Open a copy
                    <span slot="description">Illustrator for iPad</span>
                </sp-menu-item>
                <sp-menu-item disabled>
                    <sp-icon-share slot="icon"></sp-icon-share>
                    Share link
                    <span slot="description">Enable comments and download</span>
                </sp-menu-item>
            </sp-menu>

            <sp-popover open>
                <sp-menu selects="multiple">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item selected>
                        Select Inverse
                        <span slot="description">Enable inverse selection</span>
                    </sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item selected>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>
                        Make Work Path
                        <span slot="description">
                            Create a reusable work path
                        </span>
                    </sp-menu-item>
                </sp-menu>
            </sp-popover>
        `;
    }
}

customElements.define('menu-item-with-description', MenuItemWithDescription);

export const menuItemWithDescription = (): TemplateResult => html`
    <menu-item-with-description></menu-item-with-description>
`;

class WithIcons extends LitElement {
    public override render(): TemplateResult {
        return html`
            <sp-popover open>
                <sp-menu selects="single">
                    <sp-menu-item>
                        <sp-icon-export slot="icon"></sp-icon-export>
                        Quick export
                    </sp-menu-item>
                    <sp-menu-item selected>
                        <sp-icon-folder-open slot="icon"></sp-icon-folder-open>
                        Open a copy
                    </sp-menu-item>
                    <sp-menu-item>
                        <sp-icon-share slot="icon"></sp-icon-share>
                        Share link
                        <span slot="description">
                            Enable comments and download
                        </span>
                    </sp-menu-item>
                </sp-menu>
            </sp-popover>
        `;
    }
}

customElements.define('menu-with-icons', WithIcons);

export const SelectsWithIcons = (): TemplateResult => html`
    <menu-with-icons></menu-with-icons>
`;

class HeadersAndIcons extends LitElement {
    public override render(): TemplateResult {
        return html`
            <sp-popover open>
                <sp-menu selects="single">
                    <sp-menu-group>
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>Action 1</sp-menu-item>
                        <sp-menu-item>Action 2</sp-menu-item>
                        <sp-menu-item>Action 3</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group>
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>
                            <sp-icon-checkmark-circle
                                slot="icon"
                            ></sp-icon-checkmark-circle>
                            Save
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            <sp-icon-checkmark-circle
                                slot="icon"
                            ></sp-icon-checkmark-circle>
                            Download
                        </sp-menu-item>
                        <sp-menu-item disabled>
                            <sp-icon-checkmark-circle
                                slot="icon"
                            ></sp-icon-checkmark-circle>
                            Share link
                            <span slot="description">Enable comments</span>
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            </sp-popover>
        `;
    }
}

customElements.define('headers-and-icons', HeadersAndIcons);

export const headersAndIcons = (): TemplateResult => html`
    <headers-and-icons></headers-and-icons>
`;

headersAndIcons.storyName = 'Headers and Icons';

export const Selected = (): TemplateResult => {
    return html`
        <sp-popover open style="width: 200px;">
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">San Francisco</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item>South of Market</sp-menu-item>
                    <sp-menu-item>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">Oakland</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
};

export const MenuGroupSelects = (): TemplateResult => {
    return html`
        <sp-popover open style="width: 200px;">
            <sp-menu selects="single">
                <sp-menu-group selects="inherit">
                    <span slot="header">One of these</span>
                    <sp-menu-item>Camden</sp-menu-item>
                    <sp-menu-item>Cedar Riverside</sp-menu-item>
                    <sp-menu-item>Downtown</sp-menu-item>
                    <sp-menu-item>Northeast Arts District</sp-menu-item>
                    <sp-menu-item selected>Uptown</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="inherit">
                    <span slot="header">Or of these</span>
                    <sp-menu-item>Lowertown</sp-menu-item>
                    <sp-menu-item>Grand Ave</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="multiple">
                    <span slot="header">Many of these</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item selected>South of Market</sp-menu-item>
                    <sp-menu-item selected>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">One of these</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
};

export const selectedOffPage = (): TemplateResult => {
    return html`
        <p style="height: 100vh; padding-bottom: 50px;">
            In this example the \`&lt;sp-menu-item selected&gt;\` element is off
            the visible page by default, but does not alter the page scroll on
            load.
        </p>
        <sp-menu>
            <sp-menu-item selected style="padding-bottom: 50px;">
                My best friend's mom's house in the burbs just off Silverado
                street
            </sp-menu-item>
        </sp-menu>
    `;
};

export const MenuGroupSelectsMultiple = (): TemplateResult => {
    return html`
        <sp-popover open style="width: 200px;">
            <sp-menu selects="multiple">
                <sp-menu-group selects="inherit">
                    <span slot="header">Many of these</span>
                    <sp-menu-item>Camden</sp-menu-item>
                    <sp-menu-item selected>Cedar Riverside</sp-menu-item>
                    <sp-menu-item selected>Downtown</sp-menu-item>
                    <sp-menu-item>Northeast Arts District</sp-menu-item>
                    <sp-menu-item>Uptown</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group selects="inherit">
                    <span slot="header">And these, too</span>
                    <sp-menu-item>Lowertown</sp-menu-item>
                    <sp-menu-item selected>Grand Ave</sp-menu-item>
                </sp-menu-group>
                <sp-menu-group>
                    <span slot="header">None of these</span>
                    <sp-menu-item>Financial District</sp-menu-item>
                    <sp-menu-item>South of Market</sp-menu-item>
                    <sp-menu-item>North Beach</sp-menu-item>
                </sp-menu-group>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-group selects="single">
                    <span slot="header">One of these</span>
                    <sp-menu-item>City Center</sp-menu-item>
                    <sp-menu-item disabled>Jack London Square</sp-menu-item>
                    <sp-menu-item selected>
                        My best friend's mom's house in the burbs just off
                        Silverado street
                    </sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
};

export const menuWithValueSlots = (): TemplateResult => {
    return html`
        <sp-menu style="width: 150px">
            <sp-menu-item>
                Undo
                <span slot="value">⌘​Z</span>
            </sp-menu-item>
            <sp-menu-item disabled>
                Redo
                <span slot="value">⇧⌘​Z</span>
            </sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>
                Cut
                <span slot="value">⌘​X</span>
            </sp-menu-item>
            <sp-menu-item>
                Copy
                <span slot="value">⌘​S</span>
            </sp-menu-item>
            <sp-menu-item disabled>
                Paste
                <span slot="value">⌘​P</span>
            </sp-menu-item>
        </sp-menu>
        <sp-popover open style="width: 150px">
            <sp-menu>
                <sp-menu-item>
                    Undo
                    <span slot="value">⌘​Z</span>
                </sp-menu-item>
                <sp-menu-item disabled>
                    Redo
                    <span slot="value">⇧⌘​Z</span>
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>
                    Cut
                    <span slot="value">⌘​X</span>
                </sp-menu-item>
                <sp-menu-item>
                    Copy
                    <span slot="value">⌘​S</span>
                </sp-menu-item>
                <sp-menu-item disabled>
                    Paste
                    <span slot="value">⌘​P</span>
                </sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;
};

headersAndIcons.storyName = 'Dynamic MenuItems';

export const dynamicRemoval = (): TemplateResult => {
    const removeItem = async function (event: FocusEvent) {
        await (event.target as MenuItem)?.updateComplete;
        (event.target as MenuItem)?.remove();
    };
    return html`
        <sp-menu id="casey" selects="single">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item id="nikkimk" @focus=${removeItem}>
                Feather...
            </sp-menu-item>
            <sp-menu-item selected>Select and Mask...</sp-menu-item>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-menu>
    `;
};

export const InputsWithMenu = (): TemplateResult => {
    return html`
        <div style="padding: 20px; max-width: 600px;">
            <h3>Input Focus Demo</h3>
            <p>
                Try typing in any input field below, then hover over the menu
                items. The input should maintain focus and not be interrupted.
                This demonstrates the fix for focus stealing from all supported
                input types.
            </p>

            <div
                style="display: grid; gap: 16px; grid-template-columns: 1fr 1fr; margin-bottom: 20px;"
            >
                <!-- Search Input -->
                <div>
                    <label for="demo-search">Search:</label>
                    <sp-search
                        id="demo-search"
                        placeholder="Search input..."
                        style="width: 100%; margin-top: 8px;"
                    ></sp-search>
                </div>

                <!-- Textfield Input -->
                <div>
                    <label for="demo-textfield">Textfield:</label>
                    <sp-textfield
                        id="demo-textfield"
                        placeholder="Textfield input..."
                        style="width: 100%; margin-top: 8px;"
                    ></sp-textfield>
                </div>

                <!-- Number Field Input -->
                <div>
                    <label for="demo-number">Number Field:</label>
                    <sp-number-field
                        id="demo-number"
                        placeholder="Number input..."
                        style="width: 100%; margin-top: 8px;"
                    ></sp-number-field>
                </div>

                <!-- Combobox Input -->
                <div>
                    <label for="demo-combobox">Combobox:</label>
                    <sp-combobox
                        id="demo-combobox"
                        placeholder="Combobox input..."
                        style="width: 100%; margin-top: 8px;"
                    ></sp-combobox>
                </div>

                <!-- Color Field Input -->
                <div>
                    <label for="demo-color">Color Field:</label>
                    <sp-color-field
                        id="demo-color"
                        placeholder="Color input..."
                        style="width: 100%; margin-top: 8px;"
                    ></sp-color-field>
                </div>

                <!-- Native Input -->
                <div>
                    <label for="demo-native">Native Input:</label>
                    <input
                        id="demo-native"
                        placeholder="Native input..."
                        style="width: 100%; margin-top: 8px; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
                    />
                </div>
            </div>

            <sp-popover open>
                <sp-menu>
                    <sp-menu-item>Search Results</sp-menu-item>
                    <sp-menu-item>Recent Searches</sp-menu-item>
                    <sp-menu-item>Saved Searches</sp-menu-item>
                    <sp-menu-item>Advanced Search</sp-menu-item>
                    <sp-menu-item>Search Settings</sp-menu-item>
                    <sp-menu-item>Clear History</sp-menu-item>
                </sp-menu>
            </sp-popover>
        </div>
    `;
};

InputsWithMenu.parameters = {
    tags: ['!dev'],
};

InputsWithMenu.swc_vrt = {
    skip: true,
};

InputsWithMenu.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};
