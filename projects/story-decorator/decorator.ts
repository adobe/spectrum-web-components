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
        context: import('@storybook/csf').StoryContext
    ) => {
        // Needed so that the `sp-language-context` event can be caught by decorator's `sp-theme`
        requestAnimationFrame(() => {
            document.documentElement.setAttribute('lang', 'en-US');
            const decorator = document.querySelector(
                'sp-story-decorator'
            ) as HTMLElement;
            render(bundled ? story() : html``, decorator);
        });

        const isGlobalSettingDefined = (setting: string): boolean => {
            return context?.globals?.[setting] !== undefined;
        };

        let hideNavStyles;
        if (
            isGlobalSettingDefined('system') &&
            isGlobalSettingDefined('color') &&
            isGlobalSettingDefined('scale') &&
            isGlobalSettingDefined('textDirection') &&
            isGlobalSettingDefined('reducedMotion') &&
            isGlobalSettingDefined('locale')
        ) {
            hideNavStyles = html`
                <style>
                    sp-story-decorator::part(controls) {
                        display: none;
                    }
                </style>
            `;
        }

        return html`
            ${themeStyles} ${hideNavStyles}
            <sp-story-decorator
                role="main"
                system=${context?.globals?.system}
                color=${context?.globals?.color}
                scale=${context?.globals?.scale}
                locale=${context?.globals?.locale}
                .direction=${context?.globals?.textDirection}
                ?reduce-motion=${context?.globals?.reduceMotion}
            ></sp-story-decorator>
        `;
    };

export const swcThemeDecorator = swcThemeDecoratorWithConfig();
