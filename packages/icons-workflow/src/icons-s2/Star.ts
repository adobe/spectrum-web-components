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
export const StarIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Star',
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
                d="m5.51465,18.62402c-.36133,0-.7207-.1123-1.03027-.33789-.59668-.43262-.85645-1.17188-.66211-1.88281l.95996-3.5127c.08789-.31934-.02246-.65918-.28027-.86621l-2.84277-2.27832c-.5752-.45996-.7998-1.21094-.57227-1.91113.22754-.70117.85059-1.17578,1.58691-1.21094l3.63867-.17285c.33008-.01562.61914-.22559.73633-.53516l1.28809-3.40723c.26074-.68945.90527-1.13379,1.6416-1.13379h.00098c.73633,0,1.37988.44531,1.63965,1.13379l1.28906,3.40723c.11719.31055.40527.51953.73633.53516l3.63867.17285c.73633.03516,1.3584.50977,1.58594,1.20996s.00391,1.45117-.57031,1.91211l-2.84375,2.27832c-.25781.20703-.36816.54688-.28125.86621l.96094,3.5127c.19434.71094-.06543,1.4502-.66113,1.88281-.59766.43164-1.37988.45117-1.99609.04688l-2.37012-1.55664c-.67676-.44238-1.58887-.44238-2.25586-.00098l-2.37402,1.55762c-.29492.19434-.62988.29102-.96289.29102ZM9.97852,2.875c-.06641,0-.18457.02148-.23926.16504l-1.28809,3.40723c-.32812.86914-1.14062,1.45898-2.06836,1.50195l-3.63867.17285c-.14551.00684-.20508.09961-.23047.17578-.02441.07715-.03027.18652.08301.27832l2.84277,2.27832c.72461.58008,1.03516,1.53516.79004,2.43066l-.95996,3.51367c-.04102.14844.04297.23535.0957.27344.06445.04688.16504.08691.28906.00684l2.37305-1.55664c1.15527-.76074,2.7334-.76562,3.90234,0l2.37109,1.55664c.12207.0791.22559.04102.29102-.00684.06445-.04688.13379-.13281.0957-.27246l-.96094-3.51367c-.24512-.89648.06543-1.85059.79102-2.43164l2.84277-2.27832c.11914-.0957.10254-.21582.08203-.27832-.02441-.07617-.08496-.16895-.22949-.17578l-3.63867-.17285c-.92969-.04297-1.74121-.63281-2.06934-1.50293l-1.28809-3.40723c-.05176-.13574-.1582-.16406-.23828-.16406h0Z"
                fill="currentColor"
            />
        </svg>
    `;
};
