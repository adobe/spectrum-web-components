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
export const PolygonLassoSelectIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Polygon Lasso Select',
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
                d="m15.19629,1.43262c-.09644-.12158-.21912-.21899-.33838-.31909-.03052-.04663-.05322-.09692-.09521-.13696-.29785-.28613-.77441-.27734-1.06055.02344l-4.54297,4.74121L2.07812,3.04688c-.27148-.10547-.57812-.04102-.78613.16016-.20898.20117-.28418.50488-.19141.78027l2.6709,7.92871c.25,1.12988,1.19629,3.07617,3.06348,3.07617.05786,0,.1228-.01489.18262-.0188.15698.25879.33374.4895.49316.69263.2207.28223.44922.57324.45703.78418.00488.07227.00195.14648-.01074.21875-.08301.48145-.53809.80176-1.02344.72266-.41113-.0625-.79492.20508-.86621.6123-.07031.4082.2041.7959.6123.86621.13574.02344.27148.03516.40527.03516,1.13965,0,2.15039-.82227,2.35059-1.9834.0332-.19238.04199-.3877.03027-.55176-.02344-.67188-.42285-1.18066-.77539-1.62988-.073-.09326-.11768-.16528-.17932-.24854.09436-.05786.19617-.10913.27991-.17554.56714.13623,1.14941.22998,1.92285.28052.43359.02441.77051-.28516.79785-.69824.02734-.41406-.28516-.77051-.69824-.79785-.46021-.03027-.83545-.07642-1.1875-.14014.1731-.92432-.23462-1.93506-1.07129-2.60693-.90625-.72559-2.24902-.81641-3.27148-.21777-.15723.0918-.2998.19629-.42773.3125l-1.82715-5.43457,6.06152,2.30664c.28027.10742.59961.03613.80859-.18262l4.37878-4.56958c.10413.05151.21704.08032.33215.08032.16309,0,.32715-.05273.46484-.16211.3252-.25781.37891-.72949.12207-1.05371ZM6.04199,11.42969c.47949-.28027,1.15527-.24121,1.57324.09375.36572.29321.56226.7002.54102,1.05762-.16455-.05103-.33606-.10449-.52441-.16406-.19434-.06152-.40918-.04004-.58984.05957s-.31152.27051-.3623.46973c-.04553.17822-.06677.34619-.07581.50854-.44983-.11157-.77185-.49658-.99158-.89526,0-.03809-.00391-.07617-.01074-.11523-.07617-.45703.07129-.79883.44043-1.01465Z"
                fill="currentColor"
            />
            <path
                d="m16.49219,5.65625c-.28125,0-.5498-.1582-.67773-.42773-.14746-.30957-.30176-.60547-.45703-.88477-.20117-.3623-.07129-.81934.29004-1.02051.36523-.20312.82031-.07031,1.02051.29004.1709.30664.33887.63184.5.9707.17871.37402.01953.82129-.35449.99902-.10352.0498-.21387.07324-.32129.07324Z"
                fill="currentColor"
            />
            <path
                d="m17.54785,9.11035c-.36719,0-.68848-.26953-.74121-.64355-.04883-.33984-.10742-.66895-.17285-.98145-.08398-.40625.17578-.80273.58105-.8877.40625-.08398.80371.17578.8877.58105.07129.34375.13574.7041.18848,1.0752.05859.41016-.22559.79004-.63574.84863-.03613.00586-.07227.00781-.10742.00781Z"
                fill="currentColor"
            />
            <path
                d="m16.60547,12.57617c-.15137,0-.30469-.0459-.4375-.1416-.33594-.24219-.41211-.71094-.16992-1.04688.2002-.27734.38672-.55469.55566-.8252.21973-.35156.68262-.45801,1.0332-.23828.35156.21973.45801.68262.23828,1.0332-.18652.29785-.39062.60254-.61035.90723-.14648.20312-.37598.31152-.60938.31152Z"
                fill="currentColor"
            />
            <path
                d="m13.44141,14.48047c-.33008,0-.63184-.21875-.72363-.55176-.10938-.39941.12598-.8125.52539-.92188.3291-.08984.64844-.19043.9502-.29492.39258-.13672.81934.07227.9541.46387s-.07227.81836-.46387.9541c-.33105.11426-.68164.22461-1.04395.32422-.06641.01758-.13281.02637-.19824.02637Z"
                fill="currentColor"
            />
        </svg>
    `;
};
