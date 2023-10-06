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
import { Placement } from '@spectrum-web-components/overlay';

export default {
    title: 'Coachmark',
    component: 'sp-coachmark',
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
    currentStep?: number;
    totalSteps?: number;
    hasActionMenu?: boolean;
    primaryCTA?: string;
    secondaryCTA?: string;
};

export const Default = (props: Properties): TemplateResult => {
    const { open = true } = props;
    return html`
        <sp-coachmark
            ?open=${open}
            currentstep="2"
            totalsteps="8"
            primary-cta="Next"
            secondary-cta="Previous"
        >
            <div slot="title">Tooltip with 16:9 image</div>
            <div slot="content">
                This is a Rich Tooltip with nothing but text in it. Kind of
                lonely in here.
            </div>
        </sp-coachmark>
    `;
};

export const withMedia = (props: Properties): TemplateResult => {
    const { open = true } = props;
    return html`
        <sp-coachmark
            ?open=${open}
            currentstep="2"
            totalsteps="8"
            primary-cta="Next"
            secondary-cta="Previous"
            src="https://download.samplelib.com/mp4/sample-5s.mp4"
            media-type="video"
            video-type="video/mp4"
            can-play
        >
            <div slot="title">Tooltip with 16:9 image</div>
            <div slot="content">
                This is a Rich Tooltip with nothing but text in it. Kind of
                lonely in here.
            </div>
        </sp-coachmark>
    `;
};

export const withKeys = (props: Properties): TemplateResult => {
    const { open = true, modifierKeys = ['⇧ Shift', '⌘'] } = props;
    return html`
        <sp-coachmark
            ?open=${open}
            currentstep="2"
            totalsteps="8"
            primary-cta="Next"
            secondary-cta="Previous"
            .modifierKeys=${modifierKeys}
            .content=${{
                title: 'Tooltip with 16:9 image',
                description:
                    'This is a Rich Tooltip with nothing but text in it. Kind of lonely in here',
                imageAlt: 'media',
            }}
        ></sp-coachmark>
    `;
};

export const single = (props: Properties): TemplateResult => {
    const { open = true } = props;
    return html`
        <sp-coachmark ?open=${open} primary-cta="Ok">
            <div slot="title">Tooltip with 16:9 image</div>
            <div slot="content">
                This is a Rich Tooltip with nothing but text in it. Kind of
                lonely in here.
            </div>
        </sp-coachmark>
    `;
};
