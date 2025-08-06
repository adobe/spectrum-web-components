/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html } from '@spectrum-web-components/base';
import { useEffect } from '@storybook/preview-api';
import './sp-story-decorator.js';
import type { StoryContext, StoryFn } from '@storybook/web-components';

export const themeStyles = html`
    <style>
        #root {
            padding: 0;
        }
        sp-story-decorator::part(controls) {
            position: absolute;
        }
    </style>
`;

/**
 * Global properties added to each component; determines what stylesheets are loaded
 **/
export const swcThemeDecorator = (story: StoryFn, context: StoryContext) => {
    const {
        globals: {
            system,
            color,
            scale,
            textDirection,
            reduceMotion,
            lang,
        } = {},
    } = context;

    useEffect(() => {
        // Update window.__swc_hack_knobs__ values with current context globals
        if (system) {
            window.__swc_hack_knobs__.defaultSystemVariant = system;
        }
        if (color) {
            window.__swc_hack_knobs__.defaultColor = color;
        }
        if (scale) {
            window.__swc_hack_knobs__.defaultScale = scale;
        }
        if (textDirection) {
            window.__swc_hack_knobs__.defaultDirection = textDirection;
            if (document.documentElement.dir !== textDirection) {
                document.documentElement.dir = textDirection;
            }
        }
        if (reduceMotion !== undefined) {
            window.__swc_hack_knobs__.defaultReduceMotion = reduceMotion;
        }
        if (lang) {
            window.__swc_hack_knobs__.defaultLocale = lang;
        }
    }, [system, color, scale, textDirection, reduceMotion, lang]);

    const hasAnySetting =
        system || color || scale || textDirection || reduceMotion;

    return html`
        <style>
            #root {
                padding: 0;
            }
            sp-story-decorator::part(controls) {
                position: absolute;
            }
            ${hasAnySetting
                ? `sp-story-decorator::part(controls) {
                display: none;
            }
        `
                : ''}
        </style>
        <sp-story-decorator
            role="main"
            system=${system}
            color=${color}
            scale=${scale}
            lang=${lang}
            .direction=${textDirection}
            ?reduce-motion=${reduceMotion}
        >
            ${story({}, context)}
        </sp-story-decorator>
    `;
};
