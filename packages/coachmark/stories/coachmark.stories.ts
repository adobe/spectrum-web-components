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

import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

export default {
    title: 'Coachmark',
    component: 'sp-coachmark',
    argTypes: {
        hasActionMenu: {
            name: 'ActionMenu',
            type: { name: 'boolean' },
            description: 'Show or hide action menu',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
            control: {
                type: 'boolean',
            },
        },
        hasPagination: {
            name: 'Pagination',
            type: { name: 'boolean' },
            description: 'Show or hide pagination',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
            control: {
                type: 'boolean',
            },
        },
    },
    args: {
        hasActionMenu: true,
        hasPagination: true,
    },
};

export const Default = ({
    hasActionMenu = false,
    hasPagination = false,
}): TemplateResult => {
    return html`
        <sp-popover
            open
            style="--mod-popover-content-area-spacing-vertical:0; position: relative"
        >
            <sp-coachmark
                heading="Try playing with a pixel brush"
                ?hasActionMenu=${hasActionMenu}
                ?hasPagination=${hasPagination}
            >
                Pixel brushes use pixels to create brush strokes, just like in
                other design and drawing tools. Start drawing, and zoom in to
                see the pixels in each stroke.
            </sp-coachmark>
        </sp-popover>
    `;
};

export const withMedia = ({
    hasActionMenu = false,
    hasPagination = false,
}): TemplateResult => {
    return html`
        <sp-popover
            open
            style="--mod-popover-content-area-spacing-vertical:0; position: relative"
        >
            <sp-coachmark
                heading="Try playing with a pixel brush"
                ?hasActionMenu=${hasActionMenu}
                ?hasPagination=${hasPagination}
            >
                Pixel brushes use pixels to create brush strokes, just like in
                other design and drawing tools. Start drawing, and zoom in to
                see the pixels in each stroke.
                <img
                    slot="cover-photo"
                    src="https://picsum.photos/id/18/200/300"
                    alt="Demo"
                />
            </sp-coachmark>
        </sp-popover>
    `;
};
