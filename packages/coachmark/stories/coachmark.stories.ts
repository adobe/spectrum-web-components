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
        currentStep: {
            name: 'currentStep',
            type: { name: 'number' },
            description:
                'Current step in coachmark. Should always be less than totalSteps',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 1 },
            },
            control: {
                type: 'number',
                min: 1,
                max: 8,
            },
        },
        totalSteps: {
            name: 'totalSteps',
            type: { name: 'number' },
            description: 'totalSteps step in coachmark',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 8 },
            },
            control: {
                type: 'number',
                min: 1,
            },
        },
        inTour: {
            name: 'inTour',
            type: { name: 'boolean' },
            description: 'Show or hide tour',
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
        currentStep: 1,
        totalSteps: 8,
        inTour: true,
    },
};

export const Default = ({
    currentStep = 1,
    totalSteps = 8,
    inTour = true,
}): TemplateResult => {
    return html`
        <sp-popover
            open
            style="--mod-popover-content-area-spacing-vertical:0; position: relative"
        >
            <sp-coachmark
                heading="Try playing with a pixel brush"
                currentStep=${currentStep}
                totalSteps=${totalSteps}
                ?inTour=${inTour}
            >
                Pixel brushes use pixels to create brush strokes, just like in
                other design and drawing tools. Start drawing, and zoom in to
                see the pixels in each stroke.
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark>
        </sp-popover>
    `;
};

export const withMedia = ({
    currentStep = 1,
    totalSteps = 8,
    inTour = true,
}): TemplateResult => {
    return html`
        <sp-popover
            open
            style="--mod-popover-content-area-spacing-vertical:0; position: relative"
        >
            <sp-coachmark
                heading="Try playing with a pixel brush"
                currentStep=${currentStep}
                totalSteps=${totalSteps}
                ?inTour=${inTour}
            >
                Pixel brushes use pixels to create brush strokes, just like in
                other design and drawing tools. Start drawing, and zoom in to
                see the pixels in each stroke.
                <img
                    slot="cover-photo"
                    src="https://picsum.photos/id/18/200/300"
                    alt="Demo"
                />
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark>
        </sp-popover>
    `;
};
