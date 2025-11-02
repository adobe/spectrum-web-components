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
import '@spectrum-web-components/popover/sp-popover.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/button/sp-button.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { isOverlayOpen } from '../../overlay/stories/index.js';
import '../../overlay/stories/index.js';

export default {
    component: 'sp-popover',
    title: 'Popover',
    argTypes: {
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the popover is open or not.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: 'boolean',
        },
        placement: {
            name: 'placement',
            type: { name: 'string', required: false },
            description:
                'The placement of the popover content in relation to the tip',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'none' },
            },
            control: 'text',
        },
        tip: {
            name: 'tip',
            description: 'Whether the popover has a tip.',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: 'boolean',
        },
    },
    args: {
        open: true,
        placement: 'none',
        tip: false,
    },
};

export const Default = ({ content }: { content: string }): TemplateResult => {
    return html`
        <div style="color: var(--spectrum-gray-800)">
            <sp-popover variant="default" open style="max-width: 320px">
                <div style="font-size: 14px; padding: 10px">${content}</div>
            </sp-popover>
        </div>
    `;
};
Default.args = {
    content: 'The quick brown fox jumps over the lazy dog',
};
Default.argTypes = {
    content: {
        name: 'content',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: 'text',
    },
};

interface StoryArgs {
    tip?: boolean;
    placement: Placement;
    open?: boolean;
}

const Template = ({ tip, placement, open }: StoryArgs): TemplateResult => {
    return html`
        <div
            style="color: var(--spectrum-gray-800); position: relative; display: contents"
        >
            <sp-popover
                placement=${placement}
                ?open=${open}
                style=" max-width: 320px"
                .tip="${tip}"
            >
                <sp-dialog size="s">
                    <h2 slot="heading">Popover Title</h2>
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </sp-dialog>
            </sp-popover>
        </div>
    `;
};

export const dialogTop = (args: StoryArgs): TemplateResult => Template(args);
dialogTop.args = {
    tip: true,
    placement: 'top',
};
export const dialogRight = (args: StoryArgs): TemplateResult => Template(args);
dialogRight.args = {
    tip: true,
    placement: 'right',
};
export const dialogBottom = (args: StoryArgs): TemplateResult => Template(args);
dialogBottom.args = {
    tip: true,
    placement: 'bottom',
};
export const dialogLeft = (args: StoryArgs): TemplateResult => Template(args);
dialogLeft.args = {
    tip: true,
    placement: 'left',
};

const overlayStyles = html`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator > div {
            display: contents;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
            margin: 24px 0;
        }
    </style>
`;

const overlaid = (openPlacement: Placement): TemplateResult => {
    return html`
        ${overlayStyles}
        ${(['bottom', 'left', 'right', 'top'] as Placement[]).map(
            (placement) => {
                return html`
                    <overlay-trigger
                        placement="${placement}-start"
                        open=${ifDefined(
                            openPlacement === placement ? 'click' : undefined
                        )}
                    >
                        <sp-button
                            label="${placement}-start test"
                            slot="trigger"
                        >
                            Click for ${placement}-start popover
                        </sp-button>
                        <sp-popover tip slot="click-content">
                            <sp-dialog style="--mod-dialog-min-inline-size: 0;">
                                <h2 slot="heading">
                                    Popover ${placement}-start
                                </h2>
                                This popover is on the ${placement}-start of its
                                button.
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                `;
            }
        )}
    `;
};

export const overlaidTop = (): TemplateResult => overlaid('top');
overlaidTop.decorators = [isOverlayOpen];
export const overlaidRight = (): TemplateResult => overlaid('right');
overlaidRight.decorators = [isOverlayOpen];
export const overlaidBottom = (): TemplateResult => overlaid('bottom');
overlaidBottom.decorators = [isOverlayOpen];
export const overlaidLeft = (): TemplateResult => overlaid('left');
overlaidLeft.decorators = [isOverlayOpen];
