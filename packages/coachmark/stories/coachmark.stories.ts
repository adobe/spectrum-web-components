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
import type { MediaType } from '../src/CoachmarkItem.js';
import '@spectrum-web-components/coachmark/sp-coachmark-popover.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
import { cave, gif } from './images.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import type { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
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
    mediaType?: MediaType;
    imageAlt?: string;
    triggerInteraction: 'click' | 'hover' | 'longpress';
    currentStep?: number;
    totalSteps?: number;
    hasActionMenu?: boolean;
    primaryCTA?: string;
    secondaryCTA?: string;
};

export const Default = (props: Properties): TemplateResult => {
    const { open = true, placement, triggerInteraction } = props;

    return html`
        <sp-coachmark
            ?open=${open}
            placement=${ifDefined(placement)}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coachmark-popover
                ?open=${open}
                currentstep="2"
                totalsteps="8"
                primary-cta="Next"
                secondary-cta="Previous"
            >
                <div slot="title">Coachmark with Text Only</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark-popover>
            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark>
    `;
};

export const single = (props: Properties): TemplateResult => {
    const { open = true, placement, triggerInteraction } = props;

    return html`
        <sp-coachmark
            ?open=${open}
            placement=${ifDefined(placement)}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coachmark-popover ?open=${open} primary-cta="Ok">
                <div slot="title">A single coachmark</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
            </sp-coachmark-popover>
            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark>
    `;
};

export const userActionDependent = (props: Properties): TemplateResult => {
    const { open = true, placement, triggerInteraction } = props;

    return html`
        <sp-coachmark
            ?open=${open}
            placement=${ifDefined(placement)}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coachmark-popover
                ?open=${open}
                currentstep="2"
                totalsteps="8"
                primary-cta="Asset added"
                secondary-cta="Previous"
            >
                <div slot="title">Coachmark with user action</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark-popover>

            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark>
    `;
};

export const Clickable = (props: Properties): TemplateResult => {
    const {
        open = true,
        placement = 'right-start',
        triggerInteraction = 'click',
    } = props;

    return html`
        <sp-coachmark
            ?open=${open}
            placement=${ifDefined(placement)}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coachmark-popover
                ?open=${open}
                currentstep="2"
                totalsteps="8"
                primary-cta="Next"
                secondary-cta="Previous"
            >
                <div slot="title">Coachmark with Click</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark-popover>

            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark>
    `;
};
export const withImage = (props: Properties): TemplateResult => {
    const {
        open = true,
        placement = 'right-start',
        triggerInteraction = 'hover',
    } = props;

    return html`
        <sp-coachmark
            ?open=${open}
            placement=${ifDefined(placement)}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coachmark-popover
                ?open=${open}
                src=${cave}
                media-type="image"
                primary-cta="Next"
                secondary-cta="Previous"
                currentstep="2"
                totalsteps="8"
            >
                <div slot="title">Coachmark with Media</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark-popover>

            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark>
    `;
};

export const withGif = (props: Properties): TemplateResult => {
    const {
        open = true,
        placement = 'right-start',
        triggerInteraction = 'hover',
    } = props;

    return html`
        <sp-coachmark
            ?open=${open}
            placement=${ifDefined(placement)}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coachmark-popover
                ?open=${open}
                src=${gif}
                media-type="image"
                primary-cta="Next"
                secondary-cta="Previous"
                currentstep="2"
                totalsteps="8"
            >
                <div slot="title">Coachmark with GIF</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark-popover>

            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark>
    `;
};

withGif.swc_vrt = {
    skip: true,
};

export const withKeys = (props: Properties): TemplateResult => {
    const {
        open = true,
        placement = 'right-start',
        modifierKeys = ['⇧ Shift', '⌘'],
        triggerInteraction = 'hover',
    } = props;
    return html`
        <sp-coachmark
            ?open=${open}
            placement=${ifDefined(placement)}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coachmark-popover
                ?open=${open}
                currentstep="2"
                totalsteps="8"
                primary-cta="Next"
                secondary-cta="Previous"
                .modifierKeys=${modifierKeys}
                .content=${{
                    title: 'I am a Coachmark with keys',
                    description:
                        'This is a Coachmark with nothing but text in it. Kind of lonely in here',
                }}
            >
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark-popover>
            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark>
    `;
};

export const linkInDescription = (props: Properties): TemplateResult => {
    const {
        open = true,
        placement = 'right-start',
        triggerInteraction = 'hover',
    } = props;
    return html`
        <sp-coachmark
            ?open=${open}
            placement=${ifDefined(placement)}
            .triggerInteraction=${triggerInteraction}
        >
            <sp-coachmark-popover
                ?open=${open}
                primary-cta="Ok"
                shortcut-key="L"
                .content=${{
                    title: 'Coachmark with Shortcut and links in description',
                    description:
                        'This is a Coachmark with nothing but text in it. Kind of lonely in here',
                }}
            ></sp-coachmark-popover>
            <sp-coach-indicator slot="trigger"></sp-coach-indicator>
        </sp-coachmark>
    `;
};
