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
export const TextBulletedIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Text Bulleted',
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
                d="m17.25,16.52148H7.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h10c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,10.52148H7.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h10c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,4.52148H7.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h10c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <circle cx="3.5" cy="3.77108" r="1.5" fill="currentColor" />
            <circle cx="3.5" cy="9.77108" r="1.5" fill="currentColor" />
            <circle cx="3.5" cy="15.77108" r="1.5" fill="currentColor" />
        </svg>
    `;
};
