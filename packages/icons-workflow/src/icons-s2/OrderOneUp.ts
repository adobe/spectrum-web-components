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
export const OrderOneUpIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Order One Up',
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
                d="m13,4.5c-.05078,0-.10156.01562-.14746.04785l-4.20508,2.90137c-.13281.0918-.14746.24121-.14746.30078s.01465.20898.14746.30078l4.20508,2.90137c.0918.06445.20312.06445.29492,0l4.20508-2.90137c.13281-.0918.14746-.24121.14746-.30078s-.01465-.20898-.14746-.30078l-4.2041-2.90137c-.04688-.03223-.09766-.04785-.14844-.04785Z"
                fill="currentColor"
                opacity=".2"
            />
            <path
                d="m5.49414,6.43555l-2-1.75c-.2832-.24805-.70508-.24805-.98828,0l-2,1.75c-.31152.27246-.34277.74707-.07031,1.05859.27441.31152.74707.34082,1.05859.07031l.75586-.66162v7.84717c0,.41406.33594.75.75.75s.75-.33594.75-.75v-7.84717l.75586.66162c.14258.12402.31836.18555.49414.18555.20801,0,.41602-.08691.56445-.25586.27246-.31152.24121-.78613-.07031-1.05859Z"
                fill="currentColor"
            />
            <path
                d="m13,12.50195c-.34766,0-.69629-.10547-1-.31543l-4.2041-2.90137c-.49805-.34375-.7959-.91699-.7959-1.53516s.29785-1.19141.7959-1.53516l4.2041-2.90137c.60742-.41992,1.39355-.41992,2.00098,0l4.20312,2.90137c.49805.34375.7959.91699.7959,1.53516s-.29785,1.19141-.7959,1.53516l-4.2041,2.90137c-.30371.20996-.65137.31543-1,.31543Zm0-8.00195c-.05078,0-.10156.01562-.14746.04785l-4.20508,2.90137c-.13281.0918-.14746.24121-.14746.30078s.01465.20898.14746.30078l4.20508,2.90137c.0918.06445.20312.06445.29492,0l4.20508-2.90137c.13281-.0918.14746-.24121.14746-.30078s-.01465-.20898-.14746-.30078l-4.2041-2.90137c-.04688-.03223-.09766-.04785-.14844-.04785Z"
                fill="currentColor"
            />
            <path
                d="m13,17.00098c-.34766,0-.69434-.10352-.99707-.31055l-4.20508-2.875c-.45312-.31055-.73926-.80566-.78711-1.3584-.04883-.5625.15234-1.10742.5498-1.49414.29883-.28906.77344-.28125,1.06055.01367.28906.29688.2832.77148-.01367,1.06055-.07324.07129-.11133.18066-.10254.29102.00586.06055.03027.17383.14062.24902l4.2041,2.875c.0918.06445.20801.06445.30176,0l4.20312-2.875c.11035-.0752.13477-.18848.14062-.24902.00879-.11035-.0293-.21973-.10254-.29102-.29688-.28906-.30273-.76367-.01367-1.06055.28809-.29492.7627-.30273,1.06055-.01367.39746.38672.59863.93164.5498,1.49414-.04785.55273-.33398,1.04785-.78711,1.3584l-4.2041,2.875c-.30371.20703-.65039.31055-.99805.31055Z"
                fill="currentColor"
            />
        </svg>
    `;
};
