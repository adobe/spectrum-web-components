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
export const StarFilledIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Star Filled',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="outline / production"
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
                d="m14.44238,18.49902c-.31006,0-.62061-.08984-.89551-.27002l-2.37109-1.55713c-.71289-.46875-1.68115-.46875-2.39502,0l-2.37061,1.55713c-.57227.37598-1.29932.35791-1.85303-.04395s-.79443-1.08838-.61426-1.74854l.96045-3.51367c.10059-.36719-.02637-.7583-.32324-.99609l-2.84277-2.27783c-.53418-.42822-.74219-1.12549-.53076-1.77637.21191-.65039.79004-1.0918,1.47314-1.12402l3.63818-.17236c.38037-.01758.71289-.25928.84766-.61572l1.28857-3.40723c.2417-.63965.83984-1.05273,1.52393-1.05322h.00049c.68408,0,1.28223.41357,1.52441,1.05322l1.28809,3.40723c.13477.35645.46729.59814.84766.61572l3.63867.17236c.68311.03223,1.26123.47363,1.47314,1.12451.21143.65088.00293,1.34766-.53125,1.77588l-2.84229,2.27783c-.29688.23779-.42383.62891-.32324.99561l.96045,3.51465c.18018.65967-.06104,1.34619-.61426,1.74805-.2876.20898-.62207.31396-.95752.31396Z"
                fill="currentColor"
            />
        </svg>
    `;
};
