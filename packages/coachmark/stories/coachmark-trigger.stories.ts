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
import { MediaType } from '../src/CoachmarkItem.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import '@spectrum-web-components/coachmark/sp-coachmark-trigger.js';
import { cave, gif, tree } from './images.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { Placement } from '@spectrum-web-components/overlay';

export default {
    title: 'Coachmark Trigger',
    component: 'sp-coachmark-trigger',
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
    mediaType?: MediaType;
    imageAlt?: string;
    triggerInteraction: 'click' | 'hover' | 'longpress';
    currentStep?: number;
    totalSteps?: number;
    hasActionMenu?: boolean;
    primaryCTA?: string;
    secondaryCTA?: string;
};

const Template = (props: Properties): TemplateResult => {
    const { open = true, placement, triggerInteraction, ...item } = props;
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
    heading: 'Coachmark with 16:9 image',
    content:
        'This is a Coachmark with nothing but text in it. Kind of lonely in here.',
    src: tree,
    mediaType: MediaType.IMAGE,
    currentStep: 2,
    totalSteps: 8,
    primaryCTA: 'Next',
    secondaryCTA: 'Previous',
};

export const TextOnly = (args: Properties): TemplateResult => Template(args);
TextOnly.args = {
    placement: 'right',
    heading: 'Bare bones',
    content:
        'This is a Coachmark with nothing but text in it. Kind of lonely in here.',
    currentStep: 2,
    totalSteps: 8,
    primaryCTA: 'Next',
    secondaryCTA: 'Previous',
};

export const single = (args: Properties): TemplateResult => Template(args);
single.args = {
    placement: 'right-start',
    heading: 'Single Coachmark',
    content:
        'Scale, rotate, skew, distort, warp, or apply perspective to pixel and vector layers',
    primaryCTA: 'Ok',
};

export const userActionDependent = (args: Properties): TemplateResult =>
    Template(args);
userActionDependent.args = {
    placement: 'right-start',
    heading: 'Coachmark with a user Action',
    content:
        'Scale, rotate, skew, distort, warp, or apply perspective to pixel and vector layers',
    currentStep: 2,
    totalSteps: 8,
    primaryCTA: 'Asset added',
    secondaryCTA: 'Previous',
};

export const Clickable = (args: Properties): TemplateResult => Template(args);
Clickable.args = {
    placement: 'right-start',
    heading: 'Coachmark with 16:9 image',
    content: '16:9 is the default aspect ratio for the Coachmark.',
    triggerInteraction: 'click',
    currentStep: 2,
    totalSteps: 8,
    primaryCTA: 'Next',
    secondaryCTA: 'Previous',
};

export const withGif = (args: Properties): TemplateResult => Template(args);
withGif.args = {
    placement: 'right-start',
    heading: 'Coachmark with GIF',
    shortcutKey: 'G',
    content: 'This Coachmark has a GIF in it.',
    src: gif,
    mediaType: MediaType.IMAGE,
    currentStep: 2,
    totalSteps: 8,
    primaryCTA: 'Next',
    secondaryCTA: 'Previous',
};
withGif.swc_vrt = {
    skip: true,
};

export const Keys = (args: Properties): TemplateResult => Template(args);
Keys.args = {
    placement: 'right-start',
    heading: 'Coachmark with shortcut keys',
    shortcutKey: 'Z',
    modifierKeys: ['⇧ Shift', '⌘'],
    content:
        'Scale, rotate, skew, distort, warp, or apply perspective to pixel and vector layers',
    src: cave,
    mediaType: MediaType.IMAGE,
    currentStep: 2,
    totalSteps: 8,
    primaryCTA: 'Next',
    secondaryCTA: 'Previous',
};

export const linkInDescription = (args: Properties): TemplateResult =>
    Template(args);
linkInDescription.args = {
    placement: 'right-start',
    heading: 'Coachmark with a link',
    shortcutKey: 'L',
    content: 'This <a href="#">link</a> is applied through HTML.',
    src: cave,
    mediaType: MediaType.IMAGE,
    imageAlt: 'A gif of a red letter A over a purple background.',
    triggerInteraction: 'click',
    currentStep: 2,
    totalSteps: 8,
    primaryCTA: 'Next',
    secondaryCTA: 'Previous',
};
