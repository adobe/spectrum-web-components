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

import { tag as html, TemplateResult } from '../custom-tag.js';

export { setCustomTemplateLiteralTag } from '../custom-tag.js';
export const Polygon3Icon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Polygon3',
} = {}): string | TemplateResult => {
    return html`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width=${width}
            height=${height}
            viewBox="0 0 20 20"
            aria-hidden=${hidden ? 'true' : 'false'}
            role="img"
            fill="currentColor"
            aria-label=${title}
        >
            <path
                d="m16.94873,18H3.05127c-.81348,0-1.54199-.4209-1.94873-1.125-.40674-.70508-.40625-1.5459.00049-2.25L8.05176,2.58984c.40674-.7041,1.13477-1.125,1.94824-1.125s1.54199.4209,1.94824,1.125l6.94873,12.03516c.40674.7041.40723,1.54492.00049,2.25-.40674.7041-1.13525,1.125-1.94873,1.125ZM10,2.96484c-.13037,0-.4541.03613-.64941.375L2.40186,15.375c-.19531.33887-.06543.6377,0,.75.06494.1123.2583.375.64941.375h13.89746c.39111,0,.58447-.2627.64941-.375.06543-.1123.19531-.41113,0-.75L10.64941,3.33984c-.19531-.33887-.51904-.375-.64941-.375Z"
                fill="currentColor"
            />
        </svg>
    `;
};
