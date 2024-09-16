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
export const BetaAppIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Beta App',
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
                d="m13,2.5h-6c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m16.77295,14.48047c-.01465-.03125-.03125-.0625-.0498-.09082l-4.23389-6.60938v-2.28711h.5c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-1.25c-.41406,0-.75.33594-.75.75v3.25684c0,.14355.04102.28418.11865.4043l1.17157,1.82886-5.6861,1.7439,2.2782-3.57373c.07666-.12109.11768-.26074.11768-.40332v-3.25684c0-.41406-.33594-.75-.75-.75h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h.5v2.28809l-4.21338,6.60938c-.01855.0293-.03467.05859-.04883.08984-.35107.76172-.28955,1.63867.16357,2.34668.47021.73438,1.28027,1.17285,2.16699,1.17285h8.88477c.88672,0,1.69678-.43848,2.16699-1.17285.45312-.70801.51465-1.58496.16357-2.34668Zm-1.42676,1.53809c-.19336.30176-.53125.48145-.90381.48145H5.55762c-.37256,0-.71045-.17969-.90381-.48145-.1709-.26758-.19971-.58203-.08203-.87012l.77887-1.22168,7.76855-2.38281,2.30902,3.60449c.11768.28906.08887.60352-.08203.87012Z"
                fill="currentColor"
            />
        </svg>
    `;
};
