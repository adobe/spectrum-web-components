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
export const SwitchVerticalIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Switch Vertical',
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
                d="m9.53027,4.46973l-3-3c-.29297-.29297-.76758-.29297-1.06055,0l-3,3c-.29297.29297-.29297.76758,0,1.06055s.76758.29297,1.06055,0l1.71973-1.71973v12.18945c0,.41406.33594.75.75.75s.75-.33594.75-.75V3.81055l1.71973,1.71973c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Z"
                fill="currentColor"
            />
            <path
                d="m17.53027,14.46973c-.29297-.29297-.76758-.29297-1.06055,0l-1.71973,1.71973V4c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v12.18945l-1.71973-1.71973c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l3,3c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973l3-3c.29297-.29297.29297-.76758,0-1.06055Z"
                fill="currentColor"
            />
        </svg>
    `;
};
