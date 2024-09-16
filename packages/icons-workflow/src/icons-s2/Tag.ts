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
export const TagIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Tag',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="outline / production"
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
                d="m11.86424,18.8042c-.55176,0-1.10352-.20752-1.52344-.62207l-7.63281-7.4668c-.4502-.43994-.70801-1.05322-.70801-1.68262v-4.6792c0-1.29785,1.05566-2.35352,2.35352-2.35352h4.7793c.62793,0,1.21777.24414,1.66211.68701l7.57129,7.54834c.4082.40234.63379.94141.63379,1.51514s-.22559,1.11279-.63672,1.51758l-4.97559,4.91406c-.41992.41455-.97168.62207-1.52344.62207ZM4.3535,3.5c-.4707,0-.85352.38281-.85352.85352v4.6792c0,.22803.09375.45068.25684.61035l7.63574,7.46924c.26172.2583.68262.25781.94043.00244l4.97656-4.91406c.12305-.12109.19043-.28076.19043-.4502s-.06738-.3291-.18945-.4502l-7.5752-7.55127c-.15918-.1582-.37793-.24902-.60254-.24902h-4.7793Z"
                fill="currentColor"
            />
            <circle cx="5.99998" cy="6" r="1" fill="currentColor" />
        </svg>
    `;
};
