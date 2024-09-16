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
export const StrokeWidthIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Stroke Width',
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
                d="m18.75,14.75c0-.96631-.78369-1.75-1.75-1.75H3c-.96631,0-1.75.78369-1.75,1.75s.78369,1.75,1.75,1.75h14c.96631,0,1.75-.78369,1.75-1.75Z"
                fill="currentColor"
            />
            <path
                d="m18,5.5H2c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h16c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m18.75,9.25c0-.69043-.55957-1.25-1.25-1.25H2.5c-.69043,0-1.25.55957-1.25,1.25s.55957,1.25,1.25,1.25h15c.69043,0,1.25-.55957,1.25-1.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};
