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
export const RedoIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Redo',
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
                d="m7.74268,5h8.44922s-1.71973-1.71973-1.71973-1.71973c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l2.99756,2.99756c.29297.29248.29297.76709.00049,1.06006l-2.99756,3.00244c-.14648.14697-.33838.22021-.53076.22021-.19189,0-.3833-.07324-.52979-.21924-.29346-.29248-.29346-.76758-.00098-1.06055l1.71747-1.72021H7.74268c-2.48145,0-4.50049,2.01855-4.50049,4.5s2.01904,4.5,4.50049,4.5h3.73779c.41406,0,.75.33594.75.75,0,.41406-.33594.75-.75.75h-3.73779c-3.30859,0-6.00049-2.69141-6.00049-6s2.69189-6,6.00049-6Z"
                fill="currentColor"
            />
        </svg>
    `;
};
