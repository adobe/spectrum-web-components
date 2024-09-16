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
export const DeselectIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Deselect',
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
                d="m12.75,3.49996h-1.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.25c.41406,0,.75.33594.75.75s-.33594.75-.75.75Zm.75,13.75c0-.41406-.33594-.75-.75-.75h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75ZM9.25,2.74996c0-.41406-.33594-.75-.75-.75h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75Zm0,14.5c0-.41406-.33594-.75-.75-.75h-1.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.25c.41406,0,.75-.33594.75-.75Zm8.75-13c0-1.24072-1.00928-2.25-2.25-2.25-.41406,0-.75.33594-.75.75s.33594.75.75.75c.41357,0,.75.33643.75.75,0,.41406.33594.75.75.75s.75-.33594.75-.75Zm0,4.25v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75Zm-14.5,0v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75Zm14.5,4.25v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75Zm-14.5,0v-1.25c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1.25c0,.41406.33594.75.75.75s.75-.33594.75-.75Zm1.5,4.5c0-.41406-.33594-.75-.75-.75-.41357,0-.75-.33643-.75-.75,0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75c0,1.24072,1.00928,2.25,2.25,2.25.41406,0,.75-.33594.75-.75Zm13.78027,1.53027c.29297-.29297.29297-.76758,0-1.06055L2.28027,1.21969c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l16.5,16.5c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};
