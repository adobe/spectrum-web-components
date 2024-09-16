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
export const FolderAddIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Folder Add',
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
                d="m8.37305,15.49811H3.25c-.41357,0-.75-.33643-.75-.75V6.49811h14.25c.41357,0,.75.33643.75.75v1.82227c0,.41406.33594.75.75.75s.75-.33594.75-.75v-1.82227c0-1.24072-1.00928-2.25-2.25-2.25h-5.96387c-.21729,0-.42432-.09424-.56641-.2583l-1.70508-1.9668c-.42773-.49219-1.04736-.7749-1.69922-.7749h-3.56543c-1.24072,0-2.25,1.00928-2.25,2.25v10.5c0,1.24072,1.00928,2.25,2.25,2.25h5.12305c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75ZM3.25,3.49811h3.56543c.21729,0,.42432.09424.56641.2583l1.07648,1.2417H2.5v-.75c0-.41357.33643-.75.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m15,10.49805c-2.48529,0-4.5,2.01465-4.5,4.5s2.01471,4.5,4.5,4.5,4.5-2.01465,4.5-4.5-2.01471-4.5-4.5-4.5Zm2.5,5.125h-1.875v1.875c0,.34521-.27979.625-.625.625s-.625-.27979-.625-.625v-1.875h-1.875c-.34521,0-.625-.27979-.625-.625s.27979-.625.625-.625h1.875v-1.875c0-.34521.27979-.625.625-.625s.625.27979.625.625v1.875h1.875c.34521,0,.625.27979.625.625s-.27979.625-.625.625Z"
                fill="currentColor"
            />
        </svg>
    `;
};
