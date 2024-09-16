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
export const ZoomOutIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Zoom Out',
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
                d="m10.7998,8.75h-5.59961c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h5.59961c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m8,15c-3.85986,0-7-3.14062-7-7S4.14014,1,8,1s7,3.14062,7,7-3.14014,7-7,7Zm0-12.5c-3.03271,0-5.5,2.46777-5.5,5.5s2.46729,5.5,5.5,5.5,5.5-2.46777,5.5-5.5-2.46729-5.5-5.5-5.5Z"
                fill="currentColor"
            />
            <path
                d="m18.25,19c-.19189,0-.38379-.07324-.53027-.21973l-5.33301-5.33301c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l5.33301,5.33301c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33838.21973-.53027.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};
