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
export const DrawIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Draw',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="strokes"
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
                d="m17.53027,1.99902c-1.27051-1.04199-3.22559-.90039-4.44922.32422L3.10547,12.29883c-.31934.31738-.55762.71582-.68945,1.15039l-1.38379,4.58398c-.08008.26465-.00781.55176.1875.74707.14258.14258.33398.21973.53027.21973.07227,0,.14551-.01074.2168-.03223l4.58496-1.38379c.43359-.13184.83203-.37012,1.14844-.68848l10.07715-10.07715c.64844-.64746.99414-1.54395.94824-2.45996s-.48145-1.77539-1.19531-2.35938ZM7.46826,15.00635l-2.47949-2.46973,6.85742-6.85742,2.47461,2.47461-6.85254,6.85254Zm-4.59619,2.12158l.97949-3.24414c.02661-.08887.06616-.17236.11133-.2522l2.41211,2.40259c-.08154.04688-.16724.08691-.25781.11426l-3.24512.97949Zm13.84473-11.37012l-1.33545,1.33545-2.47461-2.47461,1.23486-1.23486c.38672-.38672.89648-.58594,1.39062-.58594.37988,0,.75098.11816,1.04883.36133.3916.32129.62109.77344.64648,1.27344.02441.49316-.16211.97656-.51074,1.3252Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
