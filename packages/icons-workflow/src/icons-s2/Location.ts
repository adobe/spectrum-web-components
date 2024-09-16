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
export const LocationIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Location',
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
                d="M10,9.99023c-1.37891,0-2.5-1.12109-2.5-2.5s1.12109-2.5,2.5-2.5,2.5,1.12109,2.5,2.5-1.12109,2.5-2.5,2.5ZM10,6.49023c-.55176,0-1,.44824-1,1s.44824,1,1,1,1-.44824,1-1-.44824-1-1-1Z"
                fill="currentColor"
            />
            <path
                d="M10.00488,18.58301h-.00391c-.55664-.00098-1.07129-.24805-1.41309-.67871-1.89941-2.39062-5.08789-6.92383-5.08789-10.41406,0-3.44629,2.91602-6.25,6.5-6.25s6.5,2.80371,6.5,6.25c0,3.5498-3.18555,8.05176-5.08398,10.4209h0c-.3418.42676-.85645.67188-1.41113.67188ZM10,2.74023c-2.75684,0-5,2.13086-5,4.75,0,3.14746,3.33105,7.67969,4.7627,9.48145.08008.10059.19531.11133.24121.11133h.00098c.0459,0,.16113-.01074.23926-.10938h.00098c1.42969-1.7832,4.75488-6.27637,4.75488-9.4834,0-2.61914-2.24316-4.75-5-4.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};
