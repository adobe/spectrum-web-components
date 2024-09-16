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
export const FileUserIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'File User',
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
                d="m16.34131,5.28027l-3.62207-3.62109c-.4248-.4248-.98975-.65918-1.59033-.65918h-5.87891c-1.24072,0-2.25,1.00977-2.25,2.25v12.5c0,1.24023,1.00928,2.25,2.25,2.25h3.38574c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-3.38574c-.41357,0-.75-.33691-.75-.75V3.25c0-.41309.33643-.75.75-.75h4.75v3.25c0,1.24023,1.00928,2.25,2.25,2.25h3.25v.34863c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.47754c0-.5918-.23975-1.17188-.65869-1.59082Zm-4.84131.46973v-3.13599c.05518.03223.11316.06018.15869.10571l3.62158,3.62109c.04565.04565.07385.10376.10602.15918h-3.13629c-.41357,0-.75-.33691-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m15,10.5c-2.48529,0-4.5,2.01471-4.5,4.5s2.01471,4.5,4.5,4.5,4.5-2.01471,4.5-4.5-2.01471-4.5-4.5-4.5Zm-2.45227,6.61127c.59326-.69269,1.47296-1.10144,2.41327-1.07727.96741-.03723,1.87494.38092,2.47632,1.09534-.59576.68134-1.46112,1.12067-2.43732,1.12067-.98462,0-1.85626-.44714-2.45227-1.13873Zm2.26428-5.23871c.87878-.05194,1.6333.61841,1.68524,1.49719.00183.03137.00275.06281.00275.09424.02411.85315-.64691,1.56488-1.5,1.591-.87878.05188-1.6333-.61841-1.68524-1.49725-.05188-.87878.61841-1.6333,1.49725-1.68518Z"
                fill="currentColor"
            />
        </svg>
    `;
};
