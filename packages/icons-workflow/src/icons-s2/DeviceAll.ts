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
export const DeviceAllIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Device All',
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
                d="m3.25586,11.96191h-1.09668c-1.19043,0-2.15918-.91309-2.15918-2.03516V2.03516C0,.91309.96875,0,2.15918,0h11.68164c1.19043,0,2.15918.91309,2.15918,2.03516l-.00049.89453c0,.41406-.33594.75-.75.75h-.00049c-.41406,0-.74951-.33594-.74951-.75l.00049-.89453c0-.29492-.2959-.53516-.65918-.53516H2.15918c-.36328,0-.65918.24023-.65918.53516v7.8916c0,.29492.2959.53516.65918.53516h1.09668c.41406,0,.75.33594.75.75s-.33594.75-.75.75Zm9.32471,2.28809c0-.41406-.33594-.75-.75-.75h-4.08057c-.41357,0-.75-.33691-.75-.75v-3.25h9.75c.41406,0,.75-.33594.75-.75v-1.5c0-1.24023-1.00928-2.25-2.25-2.25h-7.5c-1.24072,0-2.25,1.00977-2.25,2.25v5.5c0,1.24023,1.00928,2.25,2.25,2.25h4.08057c.41406,0,.75-.33594.75-.75Zm-5.58057-7c0-.41309.33643-.75.75-.75h7.5c.41357,0,.75.33691.75.75v.75H7v-.75Zm13,11v-5.5c0-.96484-.78516-1.75-1.75-1.75h-2.5c-.96484,0-1.75.78516-1.75,1.75v5.5c0,.96484.78516,1.75,1.75,1.75h2.5c.96484,0,1.75-.78516,1.75-1.75Zm-1.75-5.75c.1377,0,.25.1123.25.25v5.5c0,.1377-.1123.25-.25.25h-2.5c-.1377,0-.25-.1123-.25-.25v-5.5c0-.1377.1123-.25.25-.25h2.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};
