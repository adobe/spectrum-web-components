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
export const DistortIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Distort',
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
                d="m17.11627,12.14941l-1.06458-4.2146c.5506-.38452.91315-1.02051.91315-1.74146,0-1.17188-.95312-2.125-2.125-2.125-.66705,0-1.25592.31494-1.64575.79736l-5.32819-1.76221c-.04822-1.12939-.97479-2.03516-2.11591-2.03516-1.17188,0-2.125.95312-2.125,2.125,0,.75757.40131,1.41895.99945,1.79517l-1.8429,9.17114c-1.00806.16553-1.78156,1.03613-1.78156,2.09033,0,1.17188.95312,2.125,2.125,2.125,1.01227,0,1.85815-.7124,2.07068-1.66162l9.83374-1.43066c.36432.64819,1.05048,1.09229,1.84558,1.09229,1.17188,0,2.125-.95312,2.125-2.125,0-1.08936-.82654-1.979-1.88373-2.10059Zm-2.31647,1.65186l-9.82251,1.42822c-.1745-.31543-.42133-.58252-.7254-.77393l1.8429-9.17212c.52264-.08618.97614-.36328,1.29681-.75732l5.33307,1.76465c.04828,1.04297.84711,1.88354,1.87024,2.00269l1.06549,4.21729c-.43134.30225-.74573.75879-.8606,1.29053Zm.04004-8.48291c.48242,0,.875.39258.875.875s-.39258.875-.875.875-.875-.39258-.875-.875.39258-.875.875-.875ZM5.75,2.31836c.48242,0,.875.39258.875.875s-.39258.875-.875.875-.875-.39258-.875-.875.39258-.875.875-.875Zm-2.625,14.80664c-.48242,0-.875-.39258-.875-.875s.39258-.875.875-.875.875.39258.875.875-.39258.875-.875.875Zm13.75-2c-.48242,0-.875-.39258-.875-.875s.39258-.875.875-.875.875.39258.875.875-.39258.875-.875.875Z"
                fill="currentColor"
            />
        </svg>
    `;
};
