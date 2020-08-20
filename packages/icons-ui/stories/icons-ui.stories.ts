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

import '../';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/iconset/src/icons-demo.js';
import { html, color, select } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';

import '../';
import * as icons from '../';

export default {
    title: 'Icons',
};

export const ui = (): TemplateResult => {
    const iconTemplates: {
        template: typeof html;
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
    const size = select(
        'Icon Size',
        ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
        'm',
        'Element'
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
        <icons-demo style="color: ${color('Color', '#000', 'Element')}">
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
};

ui.story = {
    name: 'UI Icons',
};
