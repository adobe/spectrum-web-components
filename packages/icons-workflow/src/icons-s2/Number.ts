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
export const NumberIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Number',
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
                d="m3.02881,13.26172v-5.54883h-.03223l-1.13281.78906c-.15039.10742-.26367.14551-.42969.14551-.32812,0-.56934-.23633-.56934-.58008,0-.24707.09668-.42969.34863-.60645l1.53613-1.06445c.37598-.25781.63379-.30566.9668-.30566.5752,0,.91895.34863.91895.90723v6.26367c0,.48828-.32227.81055-.80078.81055-.47754,0-.80566-.32227-.80566-.81055Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m6.39648,13.30762c0-.30566.11816-.51074.44531-.81152l2.30957-2.20703c.95605-.91797,1.20312-1.29492,1.20312-1.85352,0-.63867-.49414-1.0957-1.18652-1.0957-.62305,0-1.05273.3125-1.33203.93555-.18262.32227-.37109.47266-.71973.47266-.43555,0-.69336-.25781-.69336-.66113,0-.12402.02148-.23633.05957-.34863.2627-.85938,1.23535-1.66016,2.70117-1.66016,1.64355,0,2.75.92383,2.75,2.25586,0,.94531-.46191,1.53613-1.72949,2.73438l-1.67578,1.61133v.03125h2.92188c.41895,0,.67188.25293.67188.64453,0,.38184-.25293.64453-.67188.64453h-4.29102c-.51074,0-.7627-.28418-.7627-.69238Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m13.16895,12.72949c-.08594-.17676-.12305-.34863-.12305-.51074,0-.41797.26855-.68164.71387-.68164.32227,0,.52637.12891.6875.42383.27441.54297.69336.86523,1.49902.86523.79492,0,1.34277-.46191,1.34277-1.10645.00488-.75195-.54785-1.1709-1.48828-1.1709h-.33789c-.39258,0-.61816-.23047-.61816-.58008,0-.33789.22559-.57422.61816-.57422h.31641c.81152,0,1.33789-.44141,1.33789-1.07422,0-.62305-.41895-1.03711-1.20312-1.03711-.65527,0-1.05273.27344-1.30566.82227-.17676.36523-.36523.49902-.73047.49902-.45117,0-.68164-.2627-.68164-.65527,0-.18262.03711-.33789.11816-.52148.34375-.75684,1.22461-1.39062,2.59375-1.39062,1.63867,0,2.74512.81055,2.74512,2.05176,0,.9834-.7041,1.62793-1.61719,1.81543v.03223c1.15527.10742,1.90137.78418,1.90137,1.85254,0,1.4082-1.21875,2.3418-3.01855,2.3418-1.47656,0-2.38477-.63867-2.75-1.40137Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
