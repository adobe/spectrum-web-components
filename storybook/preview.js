/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { swcThemeDecorator } from '@spectrum-web-components/story-decorator/decorator.js';
import { Locales } from '@spectrum-web-components/story-decorator/src/locales.js';
import { setCustomElementsManifest } from '@storybook/web-components';

const cem = await import('./custom-elements.json', {
    assert: { type: 'json' },
});

setCustomElementsManifest(cem);

export const title = 'Spectrum Web Components';

export const globalTypes = {
    system: {
        title: 'Design context',
        description: 'The variation of Spectrum to use in the component',
        defaultValue: 'spectrum',
        type: 'string',
        showName: true,
        toolbar: {
            items: [
                {
                    value: 'spectrum-two',
                    title: 'Spectrum 2',
                    right: 'default',
                },
                { value: 'spectrum', title: 'Spectrum 1', right: 'legacy' },
                { value: 'express', title: 'Express' },
            ],
            dynamicTitle: true,
        },
    },
    color: {
        title: 'Color',
        description: 'Controls the color context of the component',
        defaultValue: 'light',
        icon: 'paintbrush',
        type: 'string',
        toolbar: {
            items: [
                { value: 'light', title: 'Light', right: 'default' },
                { value: 'dark', title: 'Dark' },
            ],
            dynamicTitle: true,
        },
    },
    scale: {
        title: 'Platform scale',
        description: 'Controls the platform scale of the component',
        defaultValue: 'medium',
        type: 'string',
        toolbar: {
            items: [
                {
                    value: 'medium',
                    title: 'Medium',
                    right: 'default',
                    icon: 'browser',
                },
                { value: 'large', title: 'Large', icon: 'mobile' },
            ],
            dynamicTitle: true,
        },
    },
    textDirection: {
        title: 'Text direction',
        description: 'Direction of the content flow',
        defaultValue: 'ltr',
        type: 'string',
        toolbar: {
            items: [
                { value: 'ltr', title: 'Left to right' },
                { value: 'rtl', title: 'Right to left' },
            ],
            dynamicTitle: true,
        },
    },
    lang: {
        title: 'Language',
        description: 'Language of the content',
        defaultValue: 'en-US',
        type: 'string',
        toolbar: {
            items: Object.entries(Locales).map(([key, value]) => ({
                value: key,
                title: value,
            })),
            dynamicTitle: true,
        },
    },
    reducedMotion: {
        title: 'Reduce motion',
        description: 'Reduce animation and transitions',
        defaultValue: false,
        type: 'boolean',
        toolbar: {
            items: [
                { value: false, title: 'Default', icon: 'play' },
                { value: true, title: 'Reduced motion', icon: 'stop' },
            ],
            dynamicTitle: true,
        },
    },
};

export const parameters = {
    docs: { hidden: true },
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        hideNoControlsWarning: true,
        sort: 'alpha',
        exclude: [
            'dir',
            'isLTR',
            '_dirParent',
            'shadowRoot',
            'focusGroupController',
            '[assignedNodesList]',
            '[slotContentIsPresent]',
            'VERSION',
        ],
    },
    layout: 'fullscreen',
    badgesConfig: {
        deprecated: {
            styles: {
                backgroundColor: '#FFF',
                borderColor: '#ea3829',
                color: '#ea3829',
            },
            title: 'Deprecated',
        },
    },
    chromatic: {
        forcedColors: 'none',
        prefersReducedMotion: 'no-preference',
        pauseAnimationAtEnd: true,
        modes: {
            'Light | LTR': {
                system: 'spectrum-two',
                color: 'light',
                textDirection: 'ltr',
            },
            'Dark | RTL': {
                system: 'spectrum-two',
                color: 'dark',
                textDirection: 'rtl',
            },
            Legacy: {
                system: 'spectrum',
            },
            'Legacy | Express': {
                system: 'express',
            },
        },
    },
};

export const decorators = [swcThemeDecorator];
