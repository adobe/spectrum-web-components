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
export const StampCloneIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Stamp Clone',
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
                d="m16,18H4c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h12c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m17.25,15H2.75c-.41406,0-.75-.33594-.75-.75v-2c0-1.24023,1.00977-2.25,2.25-2.25h3.19922l.50098-2.3623c-1.04883-.68555-1.7002-1.86035-1.7002-3.1377,0-2.06738,1.68262-3.75,3.75-3.75s3.75,1.68262,3.75,3.75c0,1.27734-.65137,2.45215-1.7002,3.1377l.50098,2.3623h3.19922c1.24023,0,2.25,1.00977,2.25,2.25v2c0,.41406-.33594.75-.75.75Zm-13.75-1.5h13v-1.25c0-.41309-.33691-.75-.75-.75h-3.80664c-.35449,0-.66016-.24805-.7334-.59473l-.74316-3.50293c-.07422-.34766.10645-.69922.43262-.8418.82031-.36035,1.35059-1.16895,1.35059-2.06055,0-1.24023-1.00977-2.25-2.25-2.25s-2.25,1.00977-2.25,2.25c0,.8916.53027,1.7002,1.35059,2.06055.32617.14258.50684.49414.43262.8418l-.74316,3.50293c-.07324.34668-.37891.59473-.7334.59473h-3.80664c-.41309,0-.75.33691-.75.75v1.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};
