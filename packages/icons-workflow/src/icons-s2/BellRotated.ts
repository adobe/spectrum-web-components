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
export const BellRotatedIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Bell Rotated',
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
                d="m17.55664,5.12793c-.55859-1.41895-1.62793-2.5293-3.01172-3.125-1.38184-.59473-2.92285-.6123-4.33887-.04395-1.40527.56445-2.50488,1.62988-3.09473,3-.69922,1.62207-1.90332,2.49902-3.17773,3.42676-.34961.25488-.7002.51074-1.04395.78223-.62109.49023-.92969,1.25391-.82617,2.04297.10449.79785.60742,1.46289,1.34375,1.78027l4.15137,1.78906c-.19653.38086-.30859.80225-.30859,1.24121,0,1.5166,1.2334,2.75,2.75,2.75,1.19165,0,2.19824-.76587,2.57935-1.82776l1.48804.64124c.29004.125.59375.18652.89551.18652.46582,0,.92676-.14648,1.32129-.43359.64746-.46973.99023-1.22363.91699-2.01758-.03223-.34961-.07227-.69141-.1123-1.0293-.19238-1.64551-.3584-3.06543.41211-4.85449.59082-1.36816.61035-2.89844.05566-4.30859Zm-7.55664,12.14355c-.68945,0-1.25-.56055-1.25-1.25,0-.23047.06543-.45312.18652-.64648l2.26855.97754c-.14551.5293-.63086.91895-1.20508.91895Zm6.12402-8.42871c-.92969,2.15723-.72363,3.91895-.52441,5.62207.03809.32617.07617.65625.10742.99414.03516.37598-.20117.59082-.30371.66504-.10547.07617-.38672.23535-.74219.08398l-10.66016-4.59375c-.24707-.10645-.41504-.33008-.4502-.59863-.0166-.125-.02344-.43945.26855-.6709.32812-.25879.66406-.50293.99805-.74609,1.38086-1.00586,2.80957-2.04688,3.6709-4.0459.43262-1.00391,1.24121-1.78613,2.27734-2.20215.50781-.2041,1.03809-.30566,1.56543-.30566.55176,0,1.10156.11133,1.62012.33496,1.01367.43652,1.79883,1.25293,2.20898,2.29688.40918,1.03906.39648,2.16309-.03613,3.16602Z"
                fill="currentColor"
            />
        </svg>
    `;
};
