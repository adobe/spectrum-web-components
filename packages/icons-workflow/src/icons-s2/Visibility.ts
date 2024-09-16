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
export const VisibilityIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Visibility',
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
                d="m10.03418,16.66162C5.14258,16.66162.75,12.27295.75,10.20068c0-1.68506,2.59814-4.55029,5.34717-5.89746,1.20117-.60596,2.54736-.93506,3.89307-.95264,5.15771,0,9.25977,4.91943,9.25977,6.8501,0,2.07227-4.36035,6.46094-9.21582,6.46094Zm-.03418-11.81104c-1.11084.01465-2.23145.28906-3.23096.79346-.00244.00146-.00537.00293-.0083.00439-2.60596,1.27539-4.51074,3.75-4.51074,4.55225,0,1.14453,3.67969,4.96094,7.78418,4.96094,4.06836,0,7.71582-3.81641,7.71582-4.96094,0-1.04883-3.48145-5.3501-7.75-5.3501Zm-3.56885.12402h.00977-.00977Z"
                fill="currentColor"
            />
            <path
                d="m9.82907,7.64351c.22275-.63691-.47262-1.25888-1.09987-1.01025-.47319.18757-.91275.48099-1.28245.88097-1.49146,1.6136-1.20734,4.23592.75785,5.46243,1.20025.7491,2.79762.68815,3.93958-.14712.6684-.48889,1.10383-1.13556,1.31685-1.83367.20882-.68436-.45803-1.25043-1.1188-.97598-.5365.22284-1.03207.12822-1.24493.06689-.57058-.16439-1.03427-.59003-1.24706-1.14381-.16744-.43575-.16335-.8929-.02115-1.29947Z"
                fill="currentColor"
            />
        </svg>
    `;
};
