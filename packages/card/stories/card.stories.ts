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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

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
            ?horizontal=${args.horizontal}
            style="width: 200px;"
        >
            <img slot="cover-photo" src=${portrait} alt="Demo Graphic" />
            <div slot="footer">Footer</div>
        </sp-card>
    `;
};
Default.args = {};

export const SmallQuiet = (args: StoryArgs): TemplateResult => {
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
};
SmallQuiet.argTypes = {
    onClick: { action: 'link click' },
};

export const href = (args: StoryArgs): TemplateResult => {
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
};
href.argTypes = {
    onClick: { action: 'link click' },
};

export const actions = (args: StoryArgs): TemplateResult => {
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
};

export const Gallery = (args: StoryArgs): TemplateResult => {
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
};

export const noPreviewImage = (args: StoryArgs): TemplateResult => {
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
};

export const Quiet = (args: StoryArgs): TemplateResult => {
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
};

export const quietFile = (args: StoryArgs): TemplateResult => {
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
};

export const quietFolder = (args: StoryArgs): TemplateResult => {
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
};

export const quietActions = (args: StoryArgs): TemplateResult => {
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
};

quietActions.storyName = 'Quiet w/ Actions';

export const Horizontal = (args: StoryArgs): TemplateResult => {
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
};
Horizontal.args = {
    horizontal: true,
};

export const horizontalWithHREF = (args: StoryArgs): TemplateResult => {
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
};
horizontalWithHREF.args = {
    horizontal: true,
};

export const smallQuiet = (args: StoryArgs): TemplateResult => {
    return html`
        <div>
            <sp-card
                size=${ifDefined(args.size)}
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
};

export const ScrollTest = {
    render: (args: StoryArgs) => html`
        <style>
            .scroll-container {
                height: 400px;
                overflow-y: auto;
                padding: 16px;
                background: var(--spectrum-global-color-gray-100);
                border: 1px solid var(--spectrum-global-color-gray-300);
                border-radius: 4px;
            }
            .card-wrapper {
                margin-bottom: 16px;
            }
            .scroll-indicator {
                position: fixed;
                bottom: 16px;
                right: 16px;
                background: var(--spectrum-global-color-gray-800);
                color: white;
                padding: 8px 16px;
                border-radius: 4px;
                font-size: 12px;
                opacity: 0;
                transition: opacity 0.2s;
            }
            .scroll-container:hover .scroll-indicator {
                opacity: 1;
            }
        </style>
        <div class="scroll-container">
            <div class="scroll-indicator">Scroll to test mobile behavior</div>
            ${Array.from(
                { length: 20 },
                (_, i) => html`
                    <div class="card-wrapper">
                        <sp-card
                            heading="Card ${i + 1}"
                            subheading="Scroll Test"
                            ?horizontal=${args.horizontal}
                            href="https://opensource.adobe.com/spectrum-web-components"
                        >
                            <img
                                slot="preview"
                                src="https://picsum.photos/532/192?random=${i}"
                                alt="Card ${i + 1} Preview"
                            />
                            <div slot="description">
                                Try scrolling through these cards on mobile. The
                                click event should not trigger while scrolling.
                                ${i % 2 === 0
                                    ? html`
                                          <sp-action-menu
                                              slot="actions"
                                              placement="bottom-end"
                                              quiet
                                          >
                                              <sp-menu-item>
                                                  Action 1
                                              </sp-menu-item>
                                              <sp-menu-item>
                                                  Action 2
                                              </sp-menu-item>
                                          </sp-action-menu>
                                      `
                                    : ''}
                            </div>
                            <div slot="footer">
                                ${i % 3 === 0
                                    ? html`
                                          <sp-link href="https://example.com">
                                              View Details
                                          </sp-link>
                                      `
                                    : 'Footer Content'}
                            </div>
                        </sp-card>
                    </div>
                `
            )}
        </div>
    `,
};
