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
export const ShapesIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Shapes',
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
                d="m12.5,6.0625c-.60693,0-1.20453.08704-1.78503.25586l-2.56555-4.44336c-.26758-.46387-1.03125-.46387-1.29883,0L1.07715,11.875c-.13428.23193-.13428.51807,0,.75.13379.23193.38135.375.64941.375h4.36127c.25671,3.31616,3.03113,5.9375,6.41217,5.9375,3.5498,0,6.4375-2.8877,6.4375-6.4375s-2.8877-6.4375-6.4375-6.4375Zm-5-2.3125l4.47461,7.75H3.02539L7.5,3.75Zm5,13.6875c-2.55145,0-4.63226-1.95215-4.88696-4.4375h5.66089c.26807,0,.51562-.14307.64941-.375.13428-.23193.13428-.51807,0-.75l-2.42651-4.20264c.32965-.06909.66418-.10986,1.00317-.10986,2.72266,0,4.9375,2.21484,4.9375,4.9375s-2.21484,4.9375-4.9375,4.9375Z"
                fill="currentColor"
            />
        </svg>
    `;
};
