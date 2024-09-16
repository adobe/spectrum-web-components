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
export const OrderOneDownIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Order One Down',
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
                d="m13.14844,15.45215l4.2041-2.90137c.13281-.0918.14746-.24121.14746-.30078s-.01465-.20898-.14746-.30078l-4.20508-2.90137c-.0918-.06445-.20312-.06445-.29492,0l-4.20508,2.90137c-.13281.0918-.14746.24121-.14746.30078s.01465.20898.14746.30078l4.20508,2.90137c.0459.03223.09668.04785.14746.04785s.10156-.01562.14844-.04785Z"
                fill="currentColor"
                opacity=".2"
            />
            <path
                d="m5.49414,13.56445l-2,1.75c-.2832.24805-.70508.24805-.98828,0l-2-1.75c-.31152-.27246-.34277-.74707-.07031-1.05859.27441-.31152.74707-.34082,1.05859-.07031l.75586.66162v-7.84717c0-.41406.33594-.75.75-.75s.75.33594.75.75v7.84717l.75586-.66162c.14258-.12402.31836-.18555.49414-.18555.20801,0,.41602.08691.56445.25586.27246.31152.24121.78613-.07031,1.05859Z"
                fill="currentColor"
            />
            <path
                d="m14,7.81348l4.2041,2.90137c.49805.34375.7959.91699.7959,1.53516s-.29785,1.19141-.7959,1.53516l-4.20312,2.90137c-.60742.41992-1.39355.41992-2.00098,0l-4.2041-2.90137c-.49805-.34375-.7959-.91699-.7959-1.53516s.29785-1.19141.7959-1.53516l4.2041-2.90137c.30371-.20996.65234-.31543,1-.31543.34863,0,.69629.10547,1,.31543Zm-.85156,7.63867l4.2041-2.90137c.13281-.0918.14746-.24121.14746-.30078s-.01465-.20898-.14746-.30078l-4.20508-2.90137c-.0918-.06445-.20312-.06445-.29492,0l-4.20508,2.90137c-.13281.0918-.14746.24121-.14746.30078s.01465.20898.14746.30078l4.20508,2.90137c.0459.03223.09668.04785.14746.04785s.10156-.01562.14844-.04785Z"
                fill="currentColor"
            />
            <path
                d="m17.91602,9.25c-.19531,0-.39062-.07617-.53711-.22656-.28906-.29688-.2832-.77148.01367-1.06055.07324-.07129.11133-.18066.10254-.29102-.00586-.06055-.03027-.17383-.14062-.24902l-4.2041-2.875c-.0918-.06445-.20801-.06445-.30176,0l-4.20312,2.875c-.11035.0752-.13477.18848-.14062.24902-.00879.11035.0293.21973.10254.29102.29688.28906.30273.76367.01367,1.06055-.28711.2959-.76172.30469-1.06055.01367-.39746-.38672-.59863-.93164-.5498-1.49414.04785-.55273.33398-1.04785.78711-1.3584l4.2041-2.875c.60742-.41406,1.38965-.41406,1.99512,0l4.20508,2.875c.45312.31055.73926.80566.78711,1.3584.04883.5625-.15234,1.10742-.5498,1.49414-.14648.14258-.33496.21289-.52344.21289Z"
                fill="currentColor"
            />
        </svg>
    `;
};
