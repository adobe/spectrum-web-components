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

import '@spectrum-web-components/icon/sp-icon.js';
import '../../iconset/stories/icons-demo.js';
import { html, TemplateResult, until } from '@spectrum-web-components/base';

export default {
    title: 'Icons/UI',
    argTypes: {
        color: { control: 'color' },
        size: {
            control: {
                type: 'inline-radio',
                options: ['s', 'm', 'l', 'xl'],
            },
        },
    },
    args: {
        color: '#000000',
        size: 'm',
    },
};

interface Properties {
    color: string;
    size: 's' | 'm' | 'l' | 'xl';
}

export const elements = ({ color, size }: Properties): TemplateResult => {
    const content = import('./icon-manifest.js').then(
        (iconManifest) => html`
            <icons-demo
                style="color: ${color}"
                size=${size}
                .icons=${iconManifest.iconManifest}
            ></icons-demo>
        `
    );
    return html`
        <style>
            .icon {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            sp-icon {
                margin-bottom: 10px;
            }
        </style>
        <delayed-ready>
            ${until(
                content,
                html`
                    Loading...
                `
            )}
        </delayed-ready>
    `;
};

export const Icons = ({ color, size }: Properties): TemplateResult => {
    const content = import('../').then((icons) => {
        const iconTemplates: {
            template: () => TemplateResult;
            name: string;
        }[] = [];
        for (const icon in icons) {
            if (icon === 'setCustomTemplateLiteralTag') continue;
            iconTemplates.push({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                template: (icons as any)[icon],
                name: icon,
            });
        }
        return html`
            <icons-demo style="color: ${color}">
                ${iconTemplates.map(
                    (icon) => html`
                        <div class="icon">
                            <sp-icon size=${size}>${icon.template()}</sp-icon>
                            ${icon.name}
                        </div>
                    `
                )}
            </icons-demo>
        `;
    });
    return html`
        <style>
            .icon {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            sp-icon {
                margin-bottom: 10px;
            }
        </style>
        <delayed-ready>
            ${until(
                content,
                html`
                    Loading...
                `
            )}
        </delayed-ready>
    `;
};
