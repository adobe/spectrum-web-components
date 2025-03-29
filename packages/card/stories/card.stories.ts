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

import '@spectrum-web-components/card/sp-card.js';
import { landscape, portrait } from './images';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-file-txt.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    component: 'sp-card',
    title: 'Card',
    args: {
        horizontal: false,
    },
    argTypes: {
        horizontal: {
            name: 'horizontal',
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

export interface Properties {
    horizontal?: boolean;
    size?: 's' | 'm';
    onClick?: ((event: Event) => void) | undefined;
}

export const Default = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-card
                heading="Card Heading"
                subheading="JPG"
                ?horizontal=${args.horizontal}
                style="width: 200px;"
            >
                <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
                <div slot="footer">Footer</div>
            </sp-card>
        `;
    },

    args: {},
};

export const SmallQuiet = {
    render: (args: Properties): TemplateResult => {
        const { onClick } = args;
        return html`
            <sp-card
                heading="Card Heading"
                subheading="JPG"
                toggles
                ?horizontal=${args.horizontal}
                style="width: 200px;"
                href="https://opensource.adobe.com/spectrum-web-components"
                variant="quiet"
                size="s"
                toggles
                @click=${(event: Event) => {
                    const composedTarget =
                        event.composedPath()[0] as HTMLElement;
                    if (composedTarget.id !== 'like-anchor') return;
                    event.stopPropagation();
                    event.preventDefault();
                    onClick && onClick(event);
                }}
            >
                <div slot="footer">
                    Footer with a
                    <sp-link href="https://google.com">link to Google</sp-link>
                </div>
                <sp-action-menu
                    label="More Actions"
                    slot="actions"
                    placement="bottom-end"
                    quiet
                >
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
                <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
            </sp-card>
        `;
    },

    argTypes: {
        onClick: { action: 'link click' },
    },
};

export const Href = {
    render: (args: Properties): TemplateResult => {
        const { onClick } = args;
        return html`
            <sp-card
                heading="Card Heading"
                subheading="JPG"
                toggles
                ?horizontal=${args.horizontal}
                style="width: 200px;"
                href="https://opensource.adobe.com/spectrum-web-components"
                @click=${(event: Event) => {
                    const composedTarget =
                        event.composedPath()[0] as HTMLElement;
                    if (composedTarget.id !== 'like-anchor') return;
                    event.stopPropagation();
                    event.preventDefault();
                    onClick && onClick(event);
                }}
            >
                <div slot="footer">
                    Footer with a
                    <sp-link href="https://google.com">link to Google</sp-link>
                </div>
                <sp-action-menu
                    label="More Actions"
                    slot="actions"
                    placement="bottom-end"
                    quiet
                >
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
                <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
            </sp-card>
        `;
    },

    argTypes: {
        onClick: { action: 'link click' },
    },
};

export const actions = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-card
                heading="Card Heading"
                subheading="JPG"
                ?horizontal=${args.horizontal}
                style="width: 200px;"
            >
                <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
                <div slot="footer">Footer</div>
                <sp-action-menu
                    label="More Actions"
                    slot="actions"
                    placement="bottom-end"
                    quiet
                >
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            </sp-card>
        `;
    },
};

export const Gallery = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-card
                variant="gallery"
                heading="Card Heading"
                subheading="JPG"
                ?horizontal=${args.horizontal}
            >
                <img
                    slot="preview"
                    src=${landscape}
                    style="object-fit: cover"
                    alt="Demo Graphic"
                />
                <div slot="description">10/15/18</div>
            </sp-card>
        `;
    },
};

export const noPreviewImage = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-card
                heading="Card Heading"
                subheading="No preview image"
                ?horizontal=${args.horizontal}
                style="width: 200px;"
            >
                <div slot="footer">Footer</div>
            </sp-card>
        `;
    },
};

export const Quiet = {
    render: (args: Properties): TemplateResult => {
        return html`
            <div>
                <sp-card
                    variant="quiet"
                    heading="Card Heading"
                    subheading="JPG"
                    ?horizontal=${args.horizontal}
                    style="width: 208px; height: 264px"
                >
                    <img src=${portrait} alt="Demo Graphic" slot="preview" />
                    <div slot="description">10/15/18</div>
                </sp-card>
            </div>
        `;
    },
};

export const quietFile = {
    render: (args: Properties): TemplateResult => {
        return html`
            <div>
                <sp-card
                    variant="quiet"
                    subheading="JPG"
                    asset="file"
                    ?horizontal=${args.horizontal}
                    style="width: 208px; height: 264px"
                >
                    <img src=${portrait} alt="Demo Graphic" slot="preview" />
                    <div slot="heading">File Name</div>
                    <div slot="description">10/15/18</div>
                </sp-card>
            </div>
        `;
    },
};

export const quietFolder = {
    render: (args: Properties): TemplateResult => {
        return html`
            <div>
                <sp-card
                    variant="quiet"
                    subheading="JPG"
                    asset="folder"
                    ?horizontal=${args.horizontal}
                    style="width: 208px; height: 264px"
                >
                    <img src=${portrait} alt="Demo Graphic" slot="preview" />
                    <div slot="heading">Folder Name</div>
                    <div slot="description">10/15/18</div>
                </sp-card>
            </div>
        `;
    },
};

export const quietActions = {
    render: (args: Properties): TemplateResult => {
        return html`
            <div>
                <sp-card
                    variant="quiet"
                    heading="Card Heading"
                    subheading="JPG"
                    ?horizontal=${args.horizontal}
                    style="width: 208px; height: 264px"
                >
                    <img src=${portrait} alt="Demo Graphic" slot="preview" />
                    <div slot="description">10/15/18</div>
                    <sp-action-menu
                        label="More Actions"
                        slot="actions"
                        placement="bottom-end"
                        quiet
                    >
                        <sp-menu-item>Deselect</sp-menu-item>
                        <sp-menu-item>Select Inverse</sp-menu-item>
                        <sp-menu-item>Feather...</sp-menu-item>
                        <sp-menu-item>Select and Mask...</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Save Selection</sp-menu-item>
                        <sp-menu-item disabled>Make Work Path</sp-menu-item>
                    </sp-action-menu>
                </sp-card>
            </div>
        `;
    },

    name: 'Quiet w/ Actions',
};

export const Horizontal = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-card
                ?horizontal=${args.horizontal}
                heading="Card Heading"
                subheading="JPG"
            >
                <sp-icon-file-txt
                    slot="preview"
                    style="width: 36px; height: 36px;"
                ></sp-icon-file-txt>
            </sp-card>
        `;
    },

    args: {
        horizontal: true,
    },
};

export const horizontalWithHREF = {
    render: (args: Properties): TemplateResult => {
        return html`
            <sp-card
                ?horizontal=${args.horizontal}
                heading="Card Heading"
                subheading="JPG"
                href="https://opensource.adobe.com/spectrum-web-components"
                target="_blank"
            >
                <sp-icon-file-txt
                    slot="preview"
                    style="width: 36px; height: 36px;"
                ></sp-icon-file-txt>
            </sp-card>
        `;
    },

    args: {
        horizontal: true,
    },
};

export const smallQuiet = {
    render: (args: Properties): TemplateResult => {
        return html`
            <div>
                <sp-card
                    size=${args.size}
                    ?horizontal=${args.horizontal}
                    heading="Card Heading"
                    subheading="JPG"
                    variant="quiet"
                    style="width: 115px"
                >
                    <img src=${portrait} alt="Demo Graphic" slot="preview" />
                    <div slot="footer">Footer</div>
                    <sp-action-menu
                        label="More Actions"
                        slot="actions"
                        placement="bottom-end"
                        quiet
                    >
                        <sp-menu-item>Deselect</sp-menu-item>
                        <sp-menu-item>Select Inverse</sp-menu-item>
                        <sp-menu-item>Feather...</sp-menu-item>
                        <sp-menu-item>Select and Mask...</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Save Selection</sp-menu-item>
                        <sp-menu-item disabled>Make Work Path</sp-menu-item>
                    </sp-action-menu>
                </sp-card>
            </div>
        `;
    },

    args: {
        size: 's',
    },
};

export const SlottedHeading = {
    render: (args: Properties): TemplateResult => {
        return html`
            <style>
                .slotted-textfield-heading {
                    width: 100%;
                }
            </style>
            <sp-card
                style="
                    --spectrum-card-title-width: 100%;
                    --spectrum-card-title-padding-right: 0;
                    --spectrum-card-title-padding-left: 0;
                    --spectrum-card-body-header-height: auto;
                    --spectrum-alias-single-line-width: 100%;
                "
                ?horizontal=${args.horizontal}
            >
                <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
                <sp-textfield
                    class="slotted-textfield-heading"
                    slot="heading"
                    value="Apr 23 Project"
                    quiet
                ></sp-textfield>
                <div slot="subheading">Last modified on 6/17/2020, 3:37 PM</div>
                <sp-action-menu
                    label="More Actions"
                    slot="actions"
                    placement="bottom-end"
                    quiet
                >
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            </sp-card>
        `;
    },
};
