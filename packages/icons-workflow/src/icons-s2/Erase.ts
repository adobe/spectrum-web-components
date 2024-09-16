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
export const EraseIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Erase',
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
                d="m17.93652,18.02148h-.43652c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h.43652c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m15.00586,18.02148h-2.50586c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h2.50586c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m18.18359,5.8584l-3.6875-3.6875c-.85059-.85059-2.33398-.84863-3.18262,0L1.81641,11.66797c-.87598.87598-.87695,2.30176-.00293,3.17871l2.92285,2.93262c.14062.1416.33203.2207.53125.2207h3.64941c.19922,0,.38965-.0791.53027-.21973l8.73633-8.74023c.4248-.4248.65918-.99023.65918-1.59082s-.23438-1.16602-.65918-1.59082Zm-9.57715,10.6416h-3.02734l-2.70312-2.71191c-.29102-.29199-.29102-.76758.00098-1.05957l2.63623-2.63623,4.58936,4.58936c.05713.05713.125.09351.19312.12842l-1.68921,1.68994Zm8.5166-8.52051l-5.83179,5.83447c-.03491-.06787-.07129-.13599-.12817-.19287l-4.58936-4.58936,5.80029-5.80029c.29297-.29395.76855-.29199,1.06152,0l3.6875,3.6875c.29199.29199.29199.76855,0,1.06055Z"
                fill="currentColor"
            />
        </svg>
    `;
};
