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
import '../sp-popover.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { Placement } from '@spectrum-web-components/overlay/src/popper';

export default {
    component: 'sp-popover',
    title: 'Popover',
    argTypes: {
        content: { control: 'string' },
    },
    args: {
        content: 'The quick brown fox jumps over the lazy dog',
    },
};

export const Default = ({ content }: { content: string }): TemplateResult => {
    return html`
        <div style="color: var(--spectrum-global-color-gray-800)">
            <sp-popover variant="default" open style="max-width: 320px">
                <div style="font-size: 14px; padding: 10px">${content}</div>
            </sp-popover>
        </div>
    `;
};

interface StoryArgs {
    tip?: boolean;
    placement: Placement;
}

const Template = ({ tip, placement }: StoryArgs): TemplateResult => {
    return html`
        <div
            style="color: var(--spectrum-global-color-gray-800); position: relative; display: contents"
        >
            <sp-popover
                variant="dialog"
                placement=${placement}
                open
                style=" max-width: 320px"
                .tip="${tip}"
            >
                <div
                    style="padding-bottom: 30px; font-size: 18px; font-weight: 700"
                >
                    Popover Title
                </div>
                <div style="font-size: 14px">
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </div>
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
