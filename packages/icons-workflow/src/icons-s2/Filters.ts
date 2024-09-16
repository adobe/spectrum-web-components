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
export const FiltersIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Filters',
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
                d="m15.99023,6.80566c-.10388-3.21826-2.74719-5.80566-5.99023-5.80566s-5.88635,2.5874-5.99023,5.80566c-1.7959,1.03809-3.00977,2.9751-3.00977,5.19434,0,3.30859,2.69141,6,6,6,1.09351,0,2.11621-.29883,3-.81177.88379.51294,1.90649.81177,3,.81177,3.30859,0,6-2.69141,6-6,0-2.21924-1.21387-4.15625-3.00977-5.19434Zm-3.18921,3.68823c-.26392-1.01489-.78345-1.92627-1.49097-2.65845.52258-.21289,1.09155-.33545,1.68994-.33545.50049,0,.97375.10132,1.42383.25269-.18799,1.10693-.78247,2.06592-1.6228,2.74121Zm-2.80103,4.83569c-.71924-.64868-1.23218-1.51562-1.41675-2.50562.4552.11084.92798.17603,1.41675.17603s.96155-.06519,1.41675-.17603c-.18457.98999-.69751,1.85693-1.41675,2.50562Zm-4.42383-7.5769c.45007-.15137.92334-.25269,1.42383-.25269.59839,0,1.16736.12256,1.68994.33545-.70752.73218-1.22705,1.64355-1.49097,2.65845-.84033-.67529-1.43481-1.63428-1.6228-2.74121Zm4.42383,3.74731c-.50049,0-.97375-.10132-1.42383-.25269.1731-1.01855.68774-1.91309,1.42383-2.5769.73608.66382,1.25073,1.55835,1.42383,2.5769-.45007.15137-.92334.25269-1.42383.25269Zm0-9c2.19922,0,4.02759,1.58789,4.41675,3.67603-.4552-.11084-.92798-.17603-1.41675-.17603-1.09351,0-2.11621.29883-3,.81177-.88379-.51294-1.90649-.81177-3-.81177-.48877,0-.96155.06519-1.41675.17603.38916-2.08813,2.21753-3.67603,4.41675-3.67603ZM2.5,12c0-1.41748.67175-2.66846,1.69897-3.4939.40869,1.57227,1.43652,2.8938,2.81079,3.68823.0498,1.53979.67871,2.93384,1.68018,3.97021-.52258.21289-1.09155.33545-1.68994.33545-2.48145,0-4.5-2.01855-4.5-4.5Zm10.5,4.5c-.59839,0-1.16736-.12256-1.68994-.33545,1.00146-1.03638,1.63037-2.43042,1.68018-3.97021,1.37427-.79443,2.4021-2.11597,2.81079-3.68823,1.02722.82544,1.69897,2.07642,1.69897,3.4939,0,2.48145-2.01855,4.5-4.5,4.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};
