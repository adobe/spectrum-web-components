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
export const NoEditIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'No Edit',
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
                d="m18.25,19.02344c-.19238,0-.38379-.07324-.53027-.21973L1.21973,2.30371c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l16.5,16.5c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m14.39844,10.20703l-1.06055-1.06055,3.65234-3.65332c.34863-.34863.53516-.83105.51074-1.32422-.02539-.5-.25488-.95215-.64648-1.27344-.68457-.55859-1.75488-.46094-2.43945.22363l-3.55176,3.55176c-.29297.29297-.76758.29297-1.06055,0s-.29297-.76758,0-1.06055l3.55176-3.55176c1.22266-1.22363,3.17969-1.36523,4.44922-.32324.71387.58398,1.14941,1.44336,1.19531,2.35938.0459.91504-.2998,1.81152-.94824,2.45898l-3.65234,3.65332Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m10.33887,13.20605c-.29297-.29297-.76758-.29297-1.06055,0l-1.8374,1.8374-2.4751-2.4751,1.79395-1.79395c.29297-.29297.29297-.76758,0-1.06055s-.76758-.29297-1.06055,0l-2.62305,2.62305c-.31934.31836-.55664.71582-.6875,1.14941l-1.38477,4.58398c-.08008.26465-.00781.55176.1875.74707.14258.14258.33398.21973.53027.21973.07227,0,.14551-.01074.2168-.03223l4.58398-1.38379c.43262-.12988.83008-.36816,1.15039-.68848l2.66602-2.66602c.29297-.29297.29297-.76758,0-1.06055Zm-7.49414,3.95898l.97949-3.24512c.02734-.09058.06744-.17627.11414-.25781l2.40881,2.40869c-.08142.04663-.16687.08643-.25732.11377l-3.24512.98047Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
