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
export const ColorFillIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Color Fill',
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
                d="m17.58331,9.14575c-.32104-.39319-.71552-.76294-1.0849-1.05688-.00183-.00183-.00293-.00403-.00476-.00586l-4.65088-4.64844c-.87695-.875-2.3042-.87598-3.18115.00098l-.95184.9519-2.97052-2.97046c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l2.97064,2.9707-3.98871,3.98926c-.87695.87695-.87744,2.30469,0,3.18164l4.64844,4.64844c.4248.4248.99023.65918,1.59131.65918.60059,0,1.16602-.23438,1.59082-.65918l6.00244-6.00195c.17871-.17859.31146-.38379.41736-.59888.4649,2.39526-.7243,3.43884-.9201,4.5459-.12762.78906.40857,1.53223,1.19763,1.65991.15985.02588.32288.02466.48236-.00342.83453-.07739,1.39001-.62646,1.34454-1.93823s-.59875-4.76428-1.43213-5.78516Zm-2.15021,1.05933l-6.00244,6.00195c-.29248.29297-.76758.29297-1.06104,0l-4.64844-4.64844c-.1416-.1416-.21973-.33008-.21973-.53027s.07812-.38867.21973-.53027l3.98883-3.98926,2.67084,2.6709c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055l-2.67084-2.6709.95111-.95117c.14648-.14648.33887-.21973.53076-.21973.19238,0,.38428.07324.53027.21875l4.65039,4.64746c.1416.1416.21973.33008.21973.53027,0,.20117-.07812.38965-.21973.53125Z"
                fill="currentColor"
            />
        </svg>
    `;
};
