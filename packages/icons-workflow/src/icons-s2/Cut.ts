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
export const CutIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Cut',
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
                d="m11.47656,7.60645c-.08008,0-.16113-.0127-.24121-.04004-.39258-.13281-.60254-.55957-.46875-.95117l1.7334-5.09668c.13379-.39258.55762-.60352.95117-.46875.39258.13281.60254.55957.46875.95117l-1.7334,5.09668c-.10645.3125-.39746.50879-.70996.50879Z"
                fill="currentColor"
            />
            <path
                d="m19.11914,6.71777c-.13379-.39258-.55859-.60352-.95117-.46875l-7.29004,2.47949c-.33203.1123-.69238.16895-1.13184.23242-.65173.09497-1.46338.40601-2.31006.86279-.03125-.76123-.32703-1.51416-.90674-2.09424-1.22656-1.22754-3.22168-1.22559-4.44824,0-1.22656,1.22656-1.22656,3.22168,0,4.44824.61328.61328,1.41895.91992,2.22461.91992.77783,0,1.55298-.29321,2.15796-.86621.01782-.01147.03784-.01611.05493-.0293,1.13525-.87207,2.22888-1.41504,2.98083-1.64429l-.27185.90698c-.08887.29883-.18652.53516-.30566.74512-.27344.48535-.60449.9834-.95508,1.44141-.01074.01416-.01282.03125-.02246.04565-1.17358,1.23047-1.16187,3.18213.04688,4.39087.61328.61328,1.41895.91992,2.22461.91992.80469,0,1.61035-.30664,2.22363-.91992,1.22656-1.22656,1.22656-3.22168,0-4.44824-.5835-.58301-1.34082-.87988-2.10596-.90869.12451-.25195.2373-.52173.33154-.83447l.50952-1.69995c.0625-.01831.12354-.0271.18579-.0481l7.29004-2.47949c.39258-.13281.60254-.55957.46875-.95117ZM3.1416,11.11719c-.6416-.6416-.6416-1.68555,0-2.32715.32129-.32031.74219-.48145,1.16406-.48145.4209,0,.8418.16016,1.16309.48145.64062.6416.64062,1.68555,0,2.32715-.64258.64355-1.68457.64062-2.32715,0Zm8.2373,5.91016c-.64258.6416-1.68457.64062-2.32715,0-.6416-.6416-.6416-1.68555,0-2.32715.64062-.63867,1.68652-.64062,2.32715,0,.6416.6416.6416,1.68555,0,2.32715Z"
                fill="currentColor"
            />
        </svg>
    `;
};
