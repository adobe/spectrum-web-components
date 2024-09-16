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
export const AudioWaveIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Audio Wave',
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
                d="m2.75,11.75c-.41406,0-.75-.33594-.75-.75v-2.5c0-.41406.33594-.75.75-.75s.75.33594.75.75v2.5c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m16.75,12.75c-.41406,0-.75-.33594-.75-.75v-4.5c0-.41406.33594-.75.75-.75s.75.33594.75.75v4.5c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m6.25,16.5c-.41406,0-.75-.33594-.75-.75V3.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v12c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m9.75,14.5c-.41406,0-.75-.33594-.75-.75V5.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v8c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m13.25,19c-.41406,0-.75-.33594-.75-.75V1.75c0-.41406.33594-.75.75-.75s.75.33594.75.75v16.5c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
