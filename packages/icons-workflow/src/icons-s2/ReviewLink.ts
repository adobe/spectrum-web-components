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
export const ReviewLinkIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Review Link',
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
            <circle cx="4.125" cy="6" r=".75" fill="currentColor" />
            <path
                d="m16.75,3H3.25c-1.24072,0-2.25,1.00977-2.25,2.25v9.5c0,1.24023,1.00928,2.25,2.25,2.25h3.75c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-3.75c-.41357,0-.75-.33691-.75-.75v-5.75h8.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75H2.5v-2.25c0-.41309.33643-.75.75-.75h13.5c.41357,0,.75.33691.75.75v.97852c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.97852c0-1.24023-1.00928-2.25-2.25-2.25Z"
                fill="currentColor"
            />
            <path
                d="m12.19971,18.25c-.92139,0-1.7876-.35938-2.43896-1.01074-.65186-.65137-1.01074-1.51758-1.01074-2.43945,0-.9209.35889-1.78809,1.01074-2.43945l.10986-.10938c.29346-.29199.76758-.29199,1.06104.00195.29199.29395.29102.76855-.00244,1.06055l-.10889.1084c-.36719.36719-.57031.85742-.57031,1.37793,0,.52148.20264,1.01074.57129,1.37891.73633.73633,2.02051.73535,2.75732,0l.11182-.11035c.29346-.29199.76904-.29004,1.06055.00391.2915.29492.28955.76953-.00488,1.06055l-.10938.1084c-.64893.64941-1.51514,1.00879-2.43701,1.00879Z"
                fill="currentColor"
            />
            <path
                d="m17.6001,13.96777c-.19238,0-.38477-.07324-.53174-.2207-.29199-.29395-.29102-.76855.00244-1.06055l.10889-.1084c.36719-.36719.57031-.85742.57031-1.37793,0-.52148-.20264-1.01074-.57129-1.37891-.7373-.7373-2.02197-.73633-2.75732,0l-.11182.11035c-.29346.29297-.76904.28906-1.06055-.00391-.2915-.29492-.28955-.76953.00488-1.06055l.10938-.1084c1.29736-1.29883,3.57275-1.30078,4.87598.00195.65186.65137,1.01074,1.51758,1.01074,2.43945,0,.9209-.35889,1.78809-1.01074,2.43945l-.10986.10938c-.14648.14551-.33789.21875-.5293.21875Z"
                fill="currentColor"
            />
            <path
                d="m12.7998,14.9502c-.19189,0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758,0-1.06055l2.40039-2.40039c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-2.40039,2.40039c-.14648.14648-.33838.21973-.53027.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};
