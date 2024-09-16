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
export const LightenIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Lighten',
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
                d="m10,6.3501c2.01245,0,3.6499,1.63745,3.6499,3.6499s-1.63745,3.6499-3.6499,3.6499-3.6499-1.63745-3.6499-3.6499,1.63745-3.6499,3.6499-3.6499Zm0-1.5c-2.8396,0-5.1499,2.3103-5.1499,5.1499s2.3103,5.1499,5.1499,5.1499,5.1499-2.3103,5.1499-5.1499-2.3103-5.1499-5.1499-5.1499Z"
                fill="currentColor"
            />
            <path
                d="m10,3.25c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m10,19.5c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.5,10.75h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m18.75,10.75h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m15.30371,5.44629c-.19238,0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758,0-1.06055l.88379-.88379c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-.88379.88379c-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m3.8125,16.9375c-.19238,0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758,0-1.06055l.88379-.88379c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-.88379.88379c-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m4.69629,5.44629c-.19238,0-.38379-.07324-.53027-.21973l-.88379-.88379c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l.88379.88379c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m16.1875,16.9375c-.19238,0-.38379-.07324-.53027-.21973l-.88379-.88379c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l.88379.88379c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};
