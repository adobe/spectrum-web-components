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
import { MediaType, VideoType } from '../src/CoachmarkItem.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import '@spectrum-web-components/coachmark/sp-coachmark-trigger.js';
import { cave, gif, tree } from './images.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { Placement } from '@spectrum-web-components/overlay';

export default {
    title: 'Coachmark',
    component: 'sp-coachmark-trigger',
    // argTypes: {
    //     currentStep: {
    //         name: 'currentStep',
    //         type: { name: 'number' },
    //         description:
    //             'Current step in coachmark. Should always be less than totalSteps',
    //         table: {
    //             type: { summary: 'number' },
    //         },
    //         control: {
    //             type: 'number',
    //             min: 1,
    //             default: 1,
    //         },
    //     },
    //     totalSteps: {
    //         name: 'totalSteps',
    //         type: { name: 'number' },
    //         description: 'totalSteps step in coachmark',
    //         table: {
    //             type: { summary: 'number' },
    //         },
    //         control: {
    //             type: 'number',
    //         },
    //     },
    //     prevButton: {
    //         name: 'prevButton',
    //         type: { name: 'boolean' },
    //         description: 'Show or hide prevButton',
    //         table: {
    //             type: { summary: 'boolean' },
    //             defaultValue: { summary: true },
    //         },
    //         control: {
    //             type: 'boolean',
    //         },
    //     },
    //     nextButton: {
    //         name: 'nextButton',
    //         type: { name: 'boolean' },
    //         description: 'Show or hide nextButton',
    //         table: {
    //             type: { summary: 'boolean' },
    //             defaultValue: { summary: true },
    //         },
    //         control: {
    //             type: 'boolean',
    //         },
    //     },
    //     inTour: {
    //         name: 'inTour',
    //         type: { name: 'boolean' },
    //         description: 'Show or hide tour',
    //         table: {
    //             type: { summary: 'boolean' },
    //             defaultValue: { summary: true },
    //         },
    //         control: {
    //             type: 'boolean',
    //         },
    //     },
    //     hasActionMenu: {
    //         name: 'hasActionMenu',
    //         type: { name: 'boolean' },
    //         description: 'Show or hide Action Menu',
    //         table: {
    //             type: { summary: 'boolean' },
    //             defaultValue: { summary: true },
    //         },
    //         control: {
    //             type: 'boolean',
    //         },
    //     },
    //     showSteps: {
    //         name: 'showSteps',
    //         type: { name: 'boolean' },
    //         description: 'Show or hide Step Counter',
    //         table: {
    //             type: { summary: 'boolean' },
    //             defaultValue: { summary: true },
    //         },
    //         control: {
    //             type: 'boolean',
    //         },
    //     },
    // },
    // args: {
    //     currentStep: undefined,
    //     totalSteps: undefined,
    //     inTour: true,
    //     prevButton: true,
    //     nextButton: true,
    //     hasActionMenu: true,
    //     showSteps: true,
    // },
};

type Properties = {
    open?: boolean;
    placement?: Placement;
    id?: string;
    heading: string;
    shortcutKey?: string;
    modifierKeys?: string[];
    content: string;
    src?: string;
    videoType?: VideoType;
    mediaType?: MediaType;
    imageAlt?: string;
    toolVideoData?: string;
    triggerInteraction: 'click' | 'hover' | 'longpress';
    currentStep: number;
    totalSteps: number;
    inTour?: boolean;
    prevButton?: boolean;
    nextButton?: boolean;
    hasActionMenu?: boolean;
    showSteps?: boolean;
};

const Template = (props: Properties): TemplateResult => {
    const { open, placement, triggerInteraction, ...item } = props;
    return html`
        <sp-coachmark-trigger
            ?open=${open}
            placement=${ifDefined(placement)}
            .item=${item}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark-trigger>
    `;
};

export const Default = (args: Properties): TemplateResult => Template(args);
Default.args = {
    placement: 'right-start',
    heading: 'Tooltip with 16:9 image',
    content:
        'This is a Rich Tooltip with nothing but text in it. Kind of lonely in here.',
    src: tree,
    mediaType: MediaType.IMAGE,
};

export const TextOnly = (args: Properties): TemplateResult => Template(args);
TextOnly.args = {
    placement: 'right',
    heading: 'Bare bones',
    content:
        'This is a Rich Tooltip with nothing but text in it. Kind of lonely in here.',
};

export const Clickable = (args: Properties): TemplateResult => Template(args);
Clickable.args = {
    placement: 'right-start',
    heading: 'Tooltip with 16:9 image',
    content: '16:9 is the default aspect ratio for the Rich Tooltip.',
    triggerInteraction: 'click',
};

export const withGif = (args: Properties): TemplateResult => Template(args);
withGif.args = {
    placement: 'right-start',
    heading: 'Rich Tooltip with GIF',
    shortcutKey: 'G',
    content: 'This Rich Tooltip has a GIF in it.',
    src: gif,
    mediaType: MediaType.IMAGE,
};

export const Video = (args: Properties): TemplateResult => Template(args);
Video.args = {
    placement: 'right',
    heading: 'Tooltip with Video',
    shortcutKey: 'v',
    content: 'This rich tooltip has a video in it.',
    src: 'https://download.samplelib.com/mp4/sample-5s.mp4',
    videoType: VideoType.MP4,
    mediaType: MediaType.VIDEO,
};

export const Keys = (args: Properties): TemplateResult => Template(args);
Keys.args = {
    placement: 'right-start',
    heading: 'Tooltip with shortcut keys',
    shortcutKey: 'Z',
    modifierKeys: ['⇧ Shift', '⌘'],
    content:
        'Scale, rotate, skew, distort, warp, or apply perspective to pixel and vector layers',
    src: cave,
    mediaType: MediaType.IMAGE,
};

export const linkInDescription = (args: Properties): TemplateResult =>
    Template(args);
linkInDescription.args = {
    placement: 'right-start',
    heading: 'Tooltip with a link',
    shortcutKey: 'L',
    content: 'This <a href="#">link</a> is applied through HTML.',
    src: cave,
    mediaType: MediaType.IMAGE,
    imageAlt: 'A gif of a red letter A over a purple background.',
    triggerInteraction: 'click',
};
