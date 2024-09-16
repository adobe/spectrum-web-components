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
export const AnimationNoIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Animation No',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="ICONS"
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
                d="m6.5,19c-3.03223,0-5.5-2.46777-5.5-5.5,0-2.3916,1.52734-4.49414,3.80078-5.23242.39941-.12598.81738.08887.94531.48242.12695.39355-.08887.81738-.48242.94531-1.65332.53613-2.76367,2.06543-2.76367,3.80469,0,2.20605,1.79395,4,4,4,1.74707,0,3.27832-1.11719,3.81152-2.7793.12598-.39453.5459-.60938.94238-.48535.39453.12598.6123.54785.48535.94238-.73242,2.28613-2.83789,3.82227-5.23926,3.82227Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m15.2168,12.05078c-.20312,0-.40527-.08203-.55273-.24316-.28027-.30566-.25977-.7793.0459-1.05957.50977-.4668.79004-1.10449.79004-1.79395,0-1.35352-1.10059-2.4541-2.4541-2.4541-.68652,0-1.32422.28125-1.7959.79102-.2832.30371-.75684.32031-1.06055.04102-.30371-.28223-.32227-.75684-.04102-1.06055.74902-.80762,1.80469-1.27148,2.89746-1.27148,2.18066,0,3.9541,1.77344,3.9541,3.9541,0,1.09863-.46484,2.15527-1.27637,2.89941-.14355.13184-.3252.19727-.50684.19727Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m17.88477,5.83203c-.14355,0-.28906-.04102-.41797-.12793-.34375-.23047-.43457-.69727-.20312-1.04102.15332-.22754.23438-.49512.23438-.77148,0-.76562-.62207-1.3877-1.38672-1.3877-.49902,0-.96289.27832-1.20898.72656-.2002.3623-.65723.49609-1.01855.2959-.36328-.19922-.49512-.65527-.2959-1.01855.50977-.92773,1.47656-1.50391,2.52344-1.50391,1.5918,0,2.88672,1.2959,2.88672,2.8877,0,.57617-.16895,1.13184-.49023,1.60938-.14453.21484-.38184.33105-.62305.33105Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m18.25,19c-.19238,0-.38379-.07324-.53027-.21973L1.21973,2.28027c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l16.5,16.5c.29297.29297.29297.76758,0,1.06055-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
