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
export const BrightnessContrastIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Brightness Contrast',
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
                d="m10,3.0127c-.41406,0-.75-.33594-.75-.75v-1.0127c0-.41406.33594-.75.75-.75s.75.33594.75.75v1.0127c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m10,19.5c-.41406,0-.75-.33594-.75-.75v-1c0-.41406.33594-.75.75-.75s.75.33594.75.75v1c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m18.75,10.75h-.99902c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h.99902c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m2.24512,10.75h-.99512c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h.99512c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m4.51953,5.26953c-.19238,0-.38379-.07324-.53027-.21973l-.70703-.70703c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l.70703.70703c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m16.1875,16.9375c-.19238,0-.38379-.07324-.53027-.21973l-.70508-.70508c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l.70508.70508c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
            <path
                d="m15.47656,5.26855c-.19238,0-.38574-.07422-.53223-.22168-.29199-.29395-.29004-.76855.00391-1.06055l.71094-.70605c.29395-.29199.76855-.29004,1.06055.00391s.29004.76855-.00391,1.06055l-.71094.70605c-.14648.14551-.33691.21777-.52832.21777Z"
                fill="currentColor"
            />
            <path
                d="m3.8125,16.9375c-.19238,0-.38477-.07324-.53125-.2207-.29199-.29297-.29199-.76758.00195-1.06055l.70703-.70508c.29297-.29199.76758-.29199,1.06055.00195.29199.29297.29199.76758-.00195,1.06055l-.70703.70508c-.14648.14551-.33789.21875-.5293.21875Z"
                fill="currentColor"
            />
            <path
                d="m10,4c-3.30811,0-6,2.69189-6,6s2.69189,6,6,6,6-2.69189,6-6-2.69189-6-6-6Zm-4.5,6c0-2.4812,2.0188-4.5,4.5-4.5v9c-2.4812,0-4.5-2.0188-4.5-4.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};
