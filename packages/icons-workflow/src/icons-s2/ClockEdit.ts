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
export const ClockEditIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Clock Edit',
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
                d="m18.55273,10.03775c-.96582-.7915-2.45312-.68848-3.37891.23926l-4.18262,4.18262c-.24805.24756-.43262.55566-.5332.89062l-.9541,3.15967c-.08008.26465-.00781.55176.1875.74707.14258.14258.33398.21973.53027.21973.07227,0,.14551-.01025.2168-.03223l3.1582-.95361c.33594-.10107.64453-.28516.89062-.53271,0,0,4.125-4.12451,4.25293-4.25293.49316-.49268.75684-1.17529.72168-1.87207-.03418-.69678-.36621-1.35107-.90918-1.79541h0Zm-7.20898,7.56641l.55078-1.82129c.01709-.05737.05786-.10181.09033-.15161l1.33228,1.33215c-.05005.03284-.09473.07373-.15308.09143,0,0-1.82031.54932-1.82031.54932Zm6.33496-4.9585c-.09277.09326-2.25122,2.25146-3.45581,3.45581l-1.37646-1.37598,3.38794-3.38794c.22168-.22168.5127-.33691.79297-.33691.20996,0,.41309.06494.57617.19824.21875.17871.34668.43066.36035.7085.01367.27832-.08691.54004-.28516.73828Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m7.45801,18.2814c-.0791,0-.15918-.01221-.23828-.03906-3.57031-1.1958-5.96973-4.53125-5.96973-8.29883,0-4.82471,3.9248-8.75,8.75-8.75,3.70117,0,7.01758,2.34326,8.25098,5.83154.1377.39062-.06641.81885-.45703.95703-.3916.13965-.81934-.06592-.95703-.45703-1.02246-2.88965-3.76953-4.83154-6.83691-4.83154-3.99805,0-7.25,3.25244-7.25,7.25,0,3.12207,1.9873,5.88574,4.94629,6.87695.39258.13135.60449.55615.47266.94922-.10449.31348-.39746.51172-.71094.51172h-.00001Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m11.4502,11.52994c-.12891,0-.25977-.0332-.37891-.10352l-1.42188-.83643c-.22949-.13477-.37012-.38086-.37012-.64648v-5c0-.41406.33594-.75.75-.75s.75.33594.75.75v4.57129l1.05176.61865c.35742.20996.47656.66992.2666,1.02686-.13965.2373-.39062.36963-.64746.36963h.00001Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
