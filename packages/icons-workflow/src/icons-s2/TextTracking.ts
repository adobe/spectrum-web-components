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
export const TextTrackingIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Text Tracking',
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
                d="m18.28027,16.21973l-1.75-1.75c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l.46973.46973H4.06055l.46973-.46973c.29297-.29297.29297-.76758,0-1.06055s-.76758-.29297-1.06055,0l-1.75,1.75c-.29297.29297-.29297.76758,0,1.06055l1.75,1.75c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055l-.46973-.46973h11.87891l-.46973.46973c-.29297.29297-.29297.76758,0,1.06055.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973l1.75-1.75c.29297-.29297.29297-.76758,0-1.06055Z"
                fill="currentColor"
            />
            <rect
                x="1"
                y="2"
                width="18"
                height="11"
                rx="1.5"
                ry="1.5"
                fill="currentColor"
                opacity=".12"
            />
            <path
                d="m17.43945,10.66602l-3-7c-.23633-.55078-1.14258-.55078-1.37891,0l-3,7c-.16309.38086.01367.82227.39355.98535.38086.16016.82129-.0127.98535-.39355l.86035-2.00781h2.90039l.86035,2.00781c.12207.28418.39844.4541.68945.4541.09863,0,.19922-.01953.2959-.06055.37988-.16309.55664-.60449.39355-.98535Zm-4.49683-2.91602l.80737-1.88379.80737,1.88379h-1.61475Z"
                fill="currentColor"
            />
            <path
                d="m6.25,11.71191c-.2998,0-.57129-.17871-.68945-.4541l-3-7c-.16309-.38086.01367-.82227.39355-.98535.38281-.16309.82227.01367.98535.39355l2.31055,5.3916,2.31055-5.3916c.16309-.38086.60254-.55762.98535-.39355.37988.16309.55664.60449.39355.98535l-3,7c-.11816.27539-.38965.4541-.68945.4541Z"
                fill="currentColor"
            />
        </svg>
    `;
};
