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
        size: 'm',
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
        size: {
            name: 'size',
            type: { name: 'string', required: false },
            table: {
                type: { summary: '"s" | "m"' },
                defaultValue: { summary: 'm' },
            },
            control: { type: 'text' },
        },
    },
};

export interface StoryArgs {
    horizontal?: boolean;
    size?: 's' | 'm';
    onClick?: ((event: Event) => void) | undefined;
}

export const Default = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            size=${args.size}
            ?horizontal=${args.horizontal}
        >
            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
            <div slot="footer">Footer</div>
        </sp-card>
    `;
};
Default.args = {};

export const href = (args: StoryArgs): TemplateResult => {
    const { onClick } = args;
    return html`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            .size=${args.size}
            toggles
            ?horizontal=${args.horizontal}
            href="https://opensource.adobe.com/spectrum-web-components"
            @click=${(event: Event) => {
                const composedTarget = event.composedPath()[0] as HTMLElement;
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
            <sp-action-menu slot="actions" placement="bottom-end" quiet>
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
};
href.argTypes = {
    onClick: { action: 'link click' },
};

export const actions = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-card
            heading="Card Heading"
            subheading="JPG"
            size=${args.size}
            ?horizontal=${args.horizontal}
        >
            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
            <div slot="footer">Footer</div>
            <sp-action-menu slot="actions" placement="bottom-end" quiet>
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
};

export const Gallery = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-card
            variant="gallery"
            heading="Card Heading"
            subheading="JPG"
            size=${args.size}
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
};

export const noPreviewImage = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-card
            heading="Card Heading"
            subheading="No preview image"
            size=${args.size}
            ?horizontal=${args.horizontal}
        >
            <div slot="footer">Footer</div>
        </sp-card>
    `;
};

export const Quiet = (args: StoryArgs): TemplateResult => {
    return html`
        <div style="width: 208px; height: 264px">
            <sp-card
                variant="quiet"
                heading="Card Heading"
                subheading="JPG"
                size=${args.size}
                ?horizontal=${args.horizontal}
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `;
};

export const quietFile = (args: StoryArgs): TemplateResult => {
    return html`
        <div style="width: 208px; height: 264px">
            <sp-card
                variant="quiet"
                subheading="JPG"
                asset="file"
                size=${args.size}
                ?horizontal=${args.horizontal}
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="heading">File Name</div>
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `;
};

export const quietFolder = (args: StoryArgs): TemplateResult => {
    return html`
        <div style="width: 208px; height: 264px">
            <sp-card
                variant="quiet"
                subheading="JPG"
                asset="folder"
                size=${args.size}
                ?horizontal=${args.horizontal}
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="heading">Folder Name</div>
                <div slot="description">10/15/18</div>
            </sp-card>
        </div>
    `;
};

export const quietActions = (args: StoryArgs): TemplateResult => {
    return html`
        <div style="width: 208px; height: 264px">
            <sp-card
                variant="quiet"
                heading="Card Heading"
                subheading="JPG"
                size=${args.size}
                ?horizontal=${args.horizontal}
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="description">10/15/18</div>
                <sp-action-menu slot="actions" placement="bottom-end" quiet>
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
};

quietActions.storyName = 'Quiet w/ Actions';

export const small = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-card
            style="--spectrum-card-title-padding-right: 0; --spectrum-card-title-padding-left: 0;"
            size=${args.size}
            ?horizontal=${args.horizontal}
            heading="Card Heading"
            subheading="JPG"
        >
            <img
                slot="cover-photo"
                src=${portrait}
                alt="Demo Graphic"
                style="width: 140px"
            />
            <div slot="footer">Footer</div>
        </sp-card>
    `;
};
small.args = {
    size: 's',
};

export const smallHorizontal = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-card
            size=${args.size}
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
};
smallHorizontal.args = {
    horizontal: true,
    size: 's',
};

export const smallHorizontalWithHREF = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-card
            .size=${args.size}
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
};
smallHorizontalWithHREF.args = {
    horizontal: true,
    size: 's',
};

export const smallQuiet = (args: StoryArgs): TemplateResult => {
    return html`
        <div style="width: 115px">
            <sp-card
                size=${args.size}
                ?horizontal=${args.horizontal}
                heading="Card Heading"
                subheading="JPG"
                variant="quiet"
            >
                <img src=${portrait} alt="Demo Graphic" slot="preview" />
                <div slot="footer">Footer</div>
                <sp-action-menu slot="actions" placement="bottom-end" quiet>
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
};
smallQuiet.args = {
    size: 's',
};

export const SlottedHeading = (args: StoryArgs): TemplateResult => {
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
            size=${args.size}
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
            <sp-action-menu slot="actions" placement="bottom-end" quiet>
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
};
