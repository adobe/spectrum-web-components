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
export const CalendarAddIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Calendar Add',
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
                d="m8.64355,16.5h-4.39355c-.41357,0-.75-.33643-.75-.75v-7.25h13v.14355c0,.41406.33594.75.75.75s.75-.33594.75-.75v-3.39355c0-1.24072-1.00928-2.25-2.25-2.25h-2v-1c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1h-4.5v-1c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1h-2c-1.24072,0-2.25,1.00928-2.25,2.25v10.5c0,1.24072,1.00928,2.25,2.25,2.25h4.39355c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75ZM4.25,4.5h2v.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.5h4.5v.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.5h2c.41357,0,.75.33643.75.75v1.75H3.5v-1.75c0-.41357.33643-.75.75-.75Z"
                fill="currentColor"
            />
            <path
                d="m15,10.5c-2.48529,0-4.5,2.01465-4.5,4.5s2.01471,4.5,4.5,4.5,4.5-2.01465,4.5-4.5-2.01471-4.5-4.5-4.5Zm2.5,5.125h-1.875v1.875c0,.34521-.27979.625-.625.625s-.625-.27979-.625-.625v-1.875h-1.875c-.34521,0-.625-.27979-.625-.625s.27979-.625.625-.625h1.875v-1.875c0-.34521.27979-.625.625-.625s.625.27979.625.625v1.875h1.875c.34521,0,.625.27979.625.625s-.27979.625-.625.625Z"
                fill="currentColor"
            />
        </svg>
    `;
};
