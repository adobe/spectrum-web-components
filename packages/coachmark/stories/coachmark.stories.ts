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
import '@spectrum-web-components/coachmark/sp-coachmark.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import { cave, gif } from './images.js';
import type { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';

export default {
    title: 'Coachmark',
    component: 'sp-coachmark',
    argTypes: {
        onPrimary: { action: 'primary' },
        onSecondary: { action: 'secondary' },
    },
};

type StoryArgs = {
    onPrimary?: (event: Event) => void;
    onSecondary?: (event: Event) => void;
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
    currentStep?: number;
    totalSteps?: number;
    primaryCTA?: string;
    secondaryCTA?: string;
};

export const Default = (): TemplateResult => {
    return html`
        <sp-coachmark open>
            <div id="heading" slot="title">Coachmark with Text Only</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
        </sp-coachmark>
    `;
};

export const InTour = (
    props: Properties,
    args: StoryArgs = {}
): TemplateResult => {
    const {
        open = true,
        heading = 'Coachmark in Tour',
        content = 'This is a Coachmark with nothing but text in it.',
    } = props;
    return html`
        <sp-coachmark
            ?open=${open}
            primary-cta="Next"
            secondary-cta="Previous"
            current-step="2"
            total-steps="8"
            .content=${{
                title: heading,
                description: content,
            }}
            @primary=${(event: Event & { target: HTMLElement }) => {
                event.target.dispatchEvent(
                    new Event('close', { bubbles: true, composed: true })
                );
                args.onPrimary?.(event);
            }}
            @secondary=${(event: Event & { target: HTMLElement }) => {
                event.target.dispatchEvent(
                    new Event('close', { bubbles: true, composed: true })
                );
                args.onSecondary?.(event);
            }}
        >
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};

export const single = (): TemplateResult => {
    return html`
        <sp-coachmark open primary-cta="Ok">
            <div slot="title">A single coachmark</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
        </sp-coachmark>
    `;
};

export const TriggerOnClick = (props: Properties): TemplateResult => {
    const { open = true } = props;

    return html`
        <sp-coach-indicator id="trigger"></sp-coach-indicator>
        <sp-overlay
            trigger="trigger@click"
            placement="right"
            .receivesFocus=${'false'}
            ?open=${open}
        >
            <sp-coachmark
                ?open=${open}
                current-step="2"
                total-steps="8"
                primary-cta="Next"
                secondary-cta="Previous"
            >
                <div slot="title">Coachmark on Click</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
                <sp-action-menu
                    placement="bottom-end"
                    quiet
                    slot="actions"
                    label="More Actions"
                >
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark>
        </sp-overlay>
    `;
};

export const TriggerOnHover = (props: Properties): TemplateResult => {
    const { open = true } = props;

    return html`
        <sp-coach-indicator id="trigger"></sp-coach-indicator>
        <sp-overlay
            trigger="trigger@hover"
            placement="right"
            .receivesFocus=${'false'}
            ?open=${open}
        >
            <sp-coachmark
                ?open=${open}
                current-step="2"
                total-steps="8"
                primary-cta="Next"
                secondary-cta="Previous"
            >
                <div slot="title">Coachmark on hover</div>
                <div slot="content">
                    This is a Coachmark with nothing but text in it. Kind of
                    lonely in here.
                </div>
                <sp-action-menu
                    placement="bottom-end"
                    quiet
                    slot="actions"
                    label="More Actions"
                >
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </sp-coachmark>
        </sp-overlay>
    `;
};

export const withImage = (): TemplateResult => {
    return html`
        <sp-coachmark
            open
            src=${cave}
            media-type="image"
            primary-cta="Next"
            secondary-cta="Previous"
            current-step="2"
            total-steps="8"
        >
            <div slot="title">Coachmark with Media</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};

export const withGif = (): TemplateResult => {
    return html`
        <sp-coachmark
            open
            src=${gif}
            media-type="image"
            primary-cta="Next"
            secondary-cta="Previous"
            current-step="2"
            total-steps="8"
        >
            <div slot="title">Coachmark with GIF</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};

withGif.swc_vrt = {
    skip: true,
};

export const withKeys = (props: Properties): TemplateResult => {
    const {
        modifierKeys = ['⇧ Shift', '⌘'],
        heading = 'Coachmark with Keys',
        content = 'This is a Coachmark with nothing but text in it.',
    } = props;
    return html`
        <sp-coachmark
            open
            .modifierKeys=${modifierKeys}
            .content=${{
                title: heading,
                description: content,
            }}
            primary-cta="Next"
            secondary-cta="Previous"
            current-step="2"
            total-steps="8"
        >
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};

export const withShortCut = (): TemplateResult => {
    return html`
        <sp-coachmark
            open
            primary-cta="Next"
            secondary-cta="Previous"
            current-step="2"
            total-steps="8"
            shortcut-key="Z"
            .content=${{
                title: 'Coachmark Shortcut',
                description:
                    'This is a Coachmark with nothing but text in it. Kind of lonely in here',
            }}
        >
            <sp-action-menu
                placement="bottom-end"
                quiet
                slot="actions"
                label="More Actions"
            >
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    `;
};
