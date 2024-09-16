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
export const PossibleClippingMaskIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Possible Clipping Mask',
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
                d="m15.75,18h-3.81104c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h3.81104c.41357,0,.75-.33643.75-.75V4.25c0-.41357-.33643-.75-.75-.75H4.25c-.41357,0-.75.33643-.75.75v3.71924c0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75v-3.71924c0-1.24072,1.00928-2.25,2.25-2.25h11.5c1.24072,0,2.25,1.00928,2.25,2.25v11.5c0,1.24072-1.00928,2.25-2.25,2.25Z"
                fill="currentColor"
            />
            <path
                d="m7.25,9h2.20605c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-2.20605c-1.24072,0-2.25,1.00928-2.25,2.25v6.43945l-1.71973-1.71973c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l3,3c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l3-3c.29297-.29297.29297-.76758,0-1.06055s-.76758-.29297-1.06055,0l-1.71973,1.71973v-6.43945c0-.41357.33643-.75.75-.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};
