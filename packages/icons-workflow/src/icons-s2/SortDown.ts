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
export const SortDownIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Sort Down',
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
                d="m18.28027,13.21973c-.29297-.29297-.76758-.29297-1.06055,0l-1.21973,1.21973V3.75c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v10.68945l-1.21973-1.21973c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l2.5,2.5c.06909.06909.15186.12354.24341.16162s.18896.05811.28687.05811.19531-.02002.28687-.05811.17432-.09253.24341-.16162l2.5-2.5c.29297-.29297.29297-.76758,0-1.06055Z"
                fill="currentColor"
            />
            <path
                d="m7.25,14.5H2.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h4.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m9.25,10.5H2.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m11.25,6.5H2.75c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h8.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};
