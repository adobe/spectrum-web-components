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
export const LineIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Line',
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
                d="m2.87549,17.875c-.19189,0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758,0-1.06055L16.36621,2.57324c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055L3.40576,17.65527c-.14648.14648-.33838.21973-.53027.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};
