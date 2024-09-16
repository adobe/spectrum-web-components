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
export const FileAddIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'File Add',
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
                d="m12.25,8h3.25v.37695c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.50586c0-.6001-.23389-1.16455-.65869-1.59033l-3.62256-3.62256c-.42529-.42432-.98975-.6582-1.58984-.6582h-5.87891c-1.24072,0-2.25,1.00928-2.25,2.25v12.5c0,1.24072,1.00928,2.25,2.25,2.25h3.42041c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-3.42041c-.41357,0-.75-.33643-.75-.75V3.25c0-.41357.33643-.75.75-.75h4.75v3.25c0,1.24072,1.00928,2.25,2.25,2.25Zm3.03027-1.65918c.04559.04578.07379.10388.10596.15918h-3.13623c-.41357,0-.75-.33643-.75-.75v-3.13629c.05518.03204.11316.06012.15869.10553l3.62158,3.62158Z"
                fill="currentColor"
            />
            <path
                d="m15,10.5c-2.48529,0-4.5,2.01465-4.5,4.5s2.01471,4.5,4.5,4.5,4.5-2.01465,4.5-4.5-2.01471-4.5-4.5-4.5Zm2.5,5.125h-1.875v1.875c0,.34521-.27979.625-.625.625s-.625-.27979-.625-.625v-1.875h-1.875c-.34521,0-.625-.27979-.625-.625s.27979-.625.625-.625h1.875v-1.875c0-.34521.27979-.625.625-.625s.625.27979.625.625v1.875h1.875c.34521,0,.625.27979.625.625s-.27979.625-.625.625Z"
                fill="currentColor"
            />
        </svg>
    `;
};
