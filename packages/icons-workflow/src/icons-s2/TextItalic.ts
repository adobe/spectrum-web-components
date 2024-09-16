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
export const TextItalicIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Text Italic',
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
                d="m16.6543,2.75586c-.38184-.48047-.95312-.75586-1.56641-.75586H6.04102c-.93457,0-1.75391.59668-2.13867,1.55957l-.55762,1.4043c-.15234.38477.03516.82031.4209.97363.38184.15332.81934-.03418.97363-.4209l.55664-1.40234c.05762-.14355.28223-.61426.74512-.61426h3.7207l-3.49219,13h-1.60742c-.41406,0-.75.33594-.75.75s.33594.75.75.75h4.63965c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-1.47852l3.49219-13h3.77246c.20996,0,.33496.11816.3916.18848.05566.07129.14258.21973.09473.4248l-.25,1.07715c-.09375.4043.15723.80664.56055.90039.05762.01367.11426.01953.1709.01953.34082,0,.64941-.23438.72949-.58008l.25-1.07715c.13965-.59766,0-1.2168-.38086-1.69727Z"
                fill="currentColor"
            />
        </svg>
    `;
};
