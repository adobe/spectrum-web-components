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
export const ObjectSelectionLassoIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Object Selection Lasso',
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
                d="m12.75,3.5h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m8.5,3.5h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m8.5,18h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,5c-.41406,0-.75-.33594-.75-.75,0-.41309-.33643-.75-.75-.75-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75c1.24072,0,2.25,1.00977,2.25,2.25,0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,9.25c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.75,9.25c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.75,13.5c-.41406,0-.75-.33594-.75-.75v-1.25c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.25c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m4.25,18c-1.24072,0-2.25-1.00977-2.25-2.25,0-.41406.33594-.75.75-.75s.75.33594.75.75c0,.41309.33643.75.75.75.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.75,5c-.41406,0-.75-.33594-.75-.75,0-1.24023,1.00928-2.25,2.25-2.25.41406,0,.75.33594.75.75s-.33594.75-.75.75c-.41357,0-.75.33691-.75.75,0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m8.7002,15h-2.9502c-.41406,0-.75-.33594-.75-.75V5.75c0-.41406.33594-.75.75-.75h8.5c.41406,0,.75.33594.75.75v.84961c0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75v-.09961h-7v7h2.2002c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m12.48779,19.7168c-.19043,0-.38086-.03809-.56299-.11328-.56201-.2334-.9248-.77734-.9248-1.38574v-8.23535c0-.60547.36084-1.14844.91895-1.38281.55811-.23535,1.19775-.11328,1.63135.31055l5.61523,5.51074c.43652.42773.56934,1.07031.33838,1.63672-.23145.56738-.77686.93359-1.38916.93359h-2.31689c-.2251,0-.43652.09961-.58008.27441l-1.60889,1.95898c-.3252.32812-.72363.49219-1.12109.49219Zm.01221-9.73535v8.23633c0,.00488.00049.00781.00049.00781l1.55859-1.91211c.42969-.52246,1.06348-.82227,1.73877-.82227h2.31689l-5.61475-5.50977Z"
                fill="currentColor"
            />
        </svg>
    `;
};
