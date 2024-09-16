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
export const PropertiesIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Properties',
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
                d="m1.75,6.77148h2.6687c.34064,1.43018,1.62128,2.5,3.15405,2.5s2.81342-1.06982,3.15405-2.5h7.52319c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-7.52319c-.34064-1.43018-1.62128-2.5-3.15405-2.5s-2.81342,1.06982-3.15405,2.5H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75Zm5.82275-2.5c.96484,0,1.75.78516,1.75,1.75s-.78516,1.75-1.75,1.75-1.75-.78516-1.75-1.75.78516-1.75,1.75-1.75Z"
                fill="currentColor"
            />
            <path
                d="m18.25,13.27148h-2.52319c-.34064-1.43018-1.62128-2.5-3.15405-2.5s-2.81342,1.06982-3.15405,2.5H1.75c-.41406,0-.75.33594-.75.75s.33594.75.75.75h7.6687c.34064,1.43018,1.62128,2.5,3.15405,2.5s2.81342-1.06982,3.15405-2.5h2.52319c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-5.67725,2.5c-.96484,0-1.75-.78516-1.75-1.75s.78516-1.75,1.75-1.75,1.75.78516,1.75,1.75-.78516,1.75-1.75,1.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};
