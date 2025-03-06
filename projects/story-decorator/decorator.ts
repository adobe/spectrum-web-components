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

import { html, render, TemplateResult } from '@spectrum-web-components/base';
import './sp-story-decorator.js';
import { Parameters, Renderer, StoryContext } from '@storybook/csf';

export const themeStyles = html`
    <style>
        #root {
            padding: 0;
        }
        .docs-story sp-story-decorator::part(container) {
            min-height: auto;
            position: relative;
        }
        .docs-story sp-story-decorator::part(controls) {
            position: absolute;
        }
    </style>
`;

export const swcThemeDecoratorWithConfig =
    ({ bundled } = { bundled: true }) =>
    (
        story: () => TemplateResult,
        context: StoryContext<Renderer, Parameters>
    ) => {
        if (!bundled) {
            requestAnimationFrame(() => {
                document.documentElement.setAttribute('lang', 'en');
                const decorator = document.querySelector(
                    'sp-story-decorator'
                ) as HTMLElement;
                render(story(), decorator);
            });
        }

        let hideNavStyles;
        // If the global settings exist, hide the bottom toolbar
        if (
            context?.globals?.system ||
            context?.globals?.color ||
            context?.globals?.scale ||
            context?.globals?.textDirection ||
            context?.globals?.reduceMotion
        ) {
            hideNavStyles = html`
                <style>
                    sp-story-decorator::part(controls) {
                        display: none;
                    }
                </style>
            `;
        }

        // Update window.__swc_hack_knobs__ values with current context globals
        if (context?.globals) {
            if (context.globals.system) {
                window.__swc_hack_knobs__.defaultSystemVariant =
                    context.globals.system;
            }
            if (context.globals.color) {
                window.__swc_hack_knobs__.defaultColor = context.globals.color;
            }
            if (context.globals.scale) {
                window.__swc_hack_knobs__.defaultScale = context.globals.scale;
            }
            if (context.globals.textDirection) {
                window.__swc_hack_knobs__.defaultDirection =
                    context.globals.textDirection;
                if (
                    document.documentElement.dir !==
                    context.globals.textDirection
                ) {
                    document.documentElement.dir =
                        context.globals.textDirection;
                }
            }
            if (context.globals.reduceMotion !== undefined) {
                window.__swc_hack_knobs__.defaultReduceMotion =
                    context.globals.reduceMotion;
            }
        }

        return html`
            ${themeStyles} ${hideNavStyles}
            <sp-story-decorator
                role="main"
                system=${context?.globals?.system}
                color=${context?.globals?.color}
                scale=${context?.globals?.scale}
                .direction=${context?.globals?.textDirection}
                ?reduce-motion=${context?.globals?.reduceMotion}
            >
                ${bundled ? story() : html``}
            </sp-story-decorator>
        `;
    };

export const swcThemeDecorator = swcThemeDecoratorWithConfig();
