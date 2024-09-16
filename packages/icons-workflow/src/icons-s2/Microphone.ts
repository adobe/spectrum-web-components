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
export const MicrophoneIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Microphone',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="strokes"
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
                d="m10,12.75c-2.20557,0-4-1.79395-4-4v-3.75c0-2.20605,1.79443-4,4-4s4,1.79395,4,4v3.75c0,2.20605-1.79443,4-4,4Zm0-10.25c-1.37842,0-2.5,1.12109-2.5,2.5v3.75c0,1.37891,1.12158,2.5,2.5,2.5s2.5-1.12109,2.5-2.5v-3.75c0-1.37891-1.12158-2.5-2.5-2.5Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m16.25,7.31641c-.41406,0-.75.33594-.75.75v.68359c0,3.03223-2.46729,5.5-5.5,5.5s-5.5-2.46777-5.5-5.5v-.68359c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v.68359c0,3.60596,2.7417,6.58276,6.25,6.9585v1.7915h-3.25c-.41406,0-.75.33594-.75.75s.33594.75.75.75h8c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-3.25v-1.7915c3.5083-.37573,6.25-3.35254,6.25-6.9585v-.68359c0-.41406-.33594-.75-.75-.75Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
