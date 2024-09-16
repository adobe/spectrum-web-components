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
export const SmallCapsIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Small Caps',
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
                d="m12.52246,2H3.47754c-1.22852,0-2.22754,1.00977-2.22754,2.25v1.11035c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.11035c0-.41309.32617-.75.72754-.75h3.77246v13h-1.57031c-.41406,0-.75.33594-.75.75s.33594.75.75.75h4.64062c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-1.57031V3.5h3.77246c.40137,0,.72754.33691.72754.75v1.11035c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.11035c0-1.24023-.99902-2.25-2.22754-2.25Z"
                fill="currentColor"
            />
            <path
                d="m17.75,9h-5c-.82715,0-1.5.67285-1.5,1.5v.86035c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.86035h1.75v6h-.58594c-.41406,0-.75.33594-.75.75s.33594.75.75.75h2.63965c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-.55371v-6h1.75v.86035c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.86035c0-.82715-.67285-1.5-1.5-1.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};
