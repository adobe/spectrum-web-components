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
export const ZoomInIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Zoom In',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="ICONS"
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
                d="m10.7998,7.25h-2.0498v-2.0498c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v2.0498h-2.0498c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.0498v2.0498c0,.41406.33594.75.75.75s.75-.33594.75-.75v-2.0498h2.0498c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m18.78027,17.71973l-5.33301-5.33301c-.00006,0-.00024,0-.00031-.00024.96942-1.20142,1.55304-2.72632,1.55304-4.38647,0-3.85938-3.14014-7-7-7S1,4.14062,1,8s3.14014,7,7,7c1.66022,0,3.18524-.5835,4.38654-1.55298.00006,0,.00012.00024.00018.00024l5.33301,5.33301c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Zm-10.78027-4.21973c-3.03271,0-5.5-2.46777-5.5-5.5s2.46729-5.5,5.5-5.5,5.5,2.46777,5.5,5.5-2.46729,5.5-5.5,5.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};
