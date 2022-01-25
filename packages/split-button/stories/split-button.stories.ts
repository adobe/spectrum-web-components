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
import { openSplitButtonDecorator } from './helpers.js';
import './helpers.js';

import '../sp-split-button.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

export default {
    title: 'Split Button',
    component: 'sp-split-button',
    argTypes: {
        onFirstItem: { action: 'click: "Option 1"' },
        onSecondItem: { action: 'click: "Option Really Extended"' },
        onThirdItem: { action: 'click: "Short"' },
    },
};

type StoryArgs = {
    onFirstItem?: () => void;
    onSecondItem?: () => void;
    onThirdItem?: () => void;
};

const menu = ({
    onFirstItem,
    onSecondItem,
    onThirdItem,
}: StoryArgs): TemplateResult => html`
    <sp-menu-item @click=${onFirstItem}>Option 1</sp-menu-item>
    <sp-menu-item @click=${onSecondItem}>Option Really Extended</sp-menu-item>
    <sp-menu-item @click=${onThirdItem}>Short</sp-menu-item>
`;

export const cta = (options: StoryArgs = {}): TemplateResult => {
    return html`
        <div>
            <sp-split-button>${menu(options)}</sp-split-button>
            <sp-split-button left>${menu(options)}</sp-split-button>
        </div>
    `;
};

cta.story = {
    name: 'Field, variant: CTA',
};

export const ctaOpen = (options: StoryArgs = {}): TemplateResult => {
    return html`
        <div>
            <sp-split-button open>${menu(options)}</sp-split-button>
        </div>
    `;
};

ctaOpen.story = {
    name: 'Field, Open, variant: CTA',
};
ctaOpen.decorators = [openSplitButtonDecorator];

export const primary = (options: StoryArgs = {}): TemplateResult => {
    return html`
        <div>
            <sp-split-button variant="primary">
                ${menu(options)}
            </sp-split-button>
            <sp-split-button left variant="primary">
                ${menu(options)}
            </sp-split-button>
        </div>
    `;
};

primary.story = {
    name: 'Field, variant: Primary',
};

export const secondary = (options: StoryArgs = {}): TemplateResult => {
    return html`
        <div>
            <sp-split-button variant="secondary">
                ${menu(options)}
            </sp-split-button>
            <sp-split-button left variant="secondary">
                ${menu(options)}
            </sp-split-button>
        </div>
    `;
};

secondary.story = {
    name: 'Field, variant: Secondary',
};

export const moreCta = (options: StoryArgs = {}): TemplateResult => {
    return html`
        <div>
            <sp-split-button type="more">${menu(options)}</sp-split-button>
            <sp-split-button type="more" left>${menu(options)}</sp-split-button>
        </div>
    `;
};

moreCta.story = {
    name: 'More, variant: CTA',
};

export const moreCtaOpen = (options: StoryArgs = {}): TemplateResult => {
    return html`
        <div>
            <sp-split-button type="more" open>${menu(options)}</sp-split-button>
        </div>
    `;
};

moreCtaOpen.story = {
    name: 'More, Open, variant: CTA',
};
moreCtaOpen.decorators = [openSplitButtonDecorator];

export const morePrimary = (options: StoryArgs = {}): TemplateResult => {
    return html`
        <div>
            <sp-split-button type="more" variant="primary">
                ${menu(options)}
            </sp-split-button>
            <sp-split-button type="more" left variant="primary">
                ${menu(options)}
            </sp-split-button>
        </div>
    `;
};

morePrimary.story = {
    name: 'More, variant: Primary',
};

export const moreSecondary = (options: StoryArgs = {}): TemplateResult => {
    return html`
        <div>
            <sp-split-button type="more" variant="secondary">
                ${menu(options)}
            </sp-split-button>
            <sp-split-button type="more" left variant="secondary">
                ${menu(options)}
            </sp-split-button>
        </div>
    `;
};

moreSecondary.story = {
    name: 'More, variant: Secondary',
};
