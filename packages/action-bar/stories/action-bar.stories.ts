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

import { Template } from './template.js';
import { argTypes } from './args.js';

import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-share.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';

export default {
    title: 'Action Bar',
    component: 'sp-action-bar',
    args: {
        open: true,
        emphasized: false,
        tools: true,
        content: '2 selected',
        hasActionMenu: false,
    },
    argTypes,
    parameters: {
        // Getting the Figma link: https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/MPtRIVRzPp2VHiEplwXL2X/S-%2F-Manual?node-id=465%3A3127&t=xbooxCWItOFgG2xM-1',
        },
    },
};

export const Default = Template.bind({});

// ********* VRT ONLY ********* //
export const WithForcedColors = Template.bind({});
WithForcedColors.args = Default.args;
WithForcedColors.tags = ['!autodocs', '!dev'];
WithForcedColors.parameters = {
    chromatic: {
        forcedColors: 'active',
        modes: {
            'Light | LTR': {
                disable: true,
            },
            'Dark | RTL': {
                disable: true,
            },
        },
    },
};

// ********* DOCS ONLY ********* //

/**
 * The emphasized variant provides additional visual weight to the action bar.
 */
export const Emphasized = Template.bind({});
Emphasized.tags = ['!dev'];
Emphasized.args = {
    emphasized: true,
};
Emphasized.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * The fixed variant positions the action bar at a fixed location on the screen.
 */
export const Fixed = Template.bind({});
Fixed.tags = ['!dev'];
Fixed.args = {
    variant: 'fixed',
};
Fixed.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * The flexible variant allows the action bar to adapt to different screen sizes.
 */
export const Flexible = Template.bind({});
Flexible.tags = ['!dev'];
Flexible.args = {
    variant: 'flexible',
    emphasized: true,
};
Flexible.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * Action bars can include action menus for additional functionality.
 */
export const WithActionMenu = Template.bind({});
WithActionMenu.tags = ['!dev'];
WithActionMenu.args = {
    hasActionMenu: true,
};
WithActionMenu.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * Action bars can be displayed without tools for simpler use cases.
 */
export const WithoutTools = Template.bind({});
WithoutTools.tags = ['!dev'];
WithoutTools.args = {
    tools: false,
};
WithoutTools.parameters = {
    chromatic: { disableSnapshot: true },
};
