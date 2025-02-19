/*!
 * Copyright 2025 Adobe. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at <http://www.apache.org/licenses/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { swcThemeDecorator } from '@spectrum-web-components/story-decorator/decorator.js';
import {
    createArgsExtractor,
    createLitRenderer,
} from 'cem-plugin-better-lit-types/storybook';

import modes from './modes/index.js';
import cem from 'virtual:vite-plugin-cem/custom-elements-manifest';

import argTypes from './types/args.js';
import globalTypes from './types/global.js';

setCustomElementsManifest(cem);

export default {
    argTypes: {
        ...(createArgsExtractor(cem) ?? {}),
        ...argTypes,
    },
    globalTypes,
    render: createLitRenderer({
        wrapSlots: true,
        joinArrays: true,
    }),
    parameters: {
        layout: 'fullscreen',
        showNav: true,
        showTabs: true,
        showPanel: true,
        panelPosition: 'bottom',
        showToolbar: true,
        isFullscreen: false,
        options: {
            storySort: {
                method: 'alphabetical-by-kind',
                order: [
                    'Guides',
                    ['Contributing', '*', 'Adobe Code of Conduct'],
                    'Components',
                    ['*', ['Docs', 'Default', '*']],
                    'Deprecated',
                    ['*', ['Docs', 'Default', '*']],
                    '*',
                ],
                includeNames: true,
            },
        },
        controls: {
            expanded: true,
            hideNoControlsWarning: true,
            sort: 'requiredFirst',
        },
        chromatic: {
            forcedColors: 'none',
            prefersReducedMotion: 'no-preference',
            pauseAnimationAtEnd: true,
            modes,
        },
    },
    decorators: [swcThemeDecorator],
    tags: ['autodocs', 'dev'],
};
