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
export const BrushIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Brush',
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
                d="m18.07422,1.60052c-.52832-.44141-1.19238-.6543-1.88281-.58789-.68555.06152-1.30664.38672-1.74512.91211-.03638.04297-5.02991,6.01904-6.6936,8.01196-.34375.01636-.69238.06714-1.04175.16382-1.97266.54688-2.68652,2.23242-3.31543,3.71875-.50098,1.18359-.97461,2.30176-2.00293,2.8584-.28613.1543-.43945.47656-.37988.79688.05957.31934.31836.56445.6416.60645.93555.12012,1.97656.20801,3.02344.20801,2.16016,0,4.35156-.37207,5.7207-1.59375.9248-.8252,1.38477-1.9375,1.36523-3.30664-.00085-.0625-.01978-.12158-.02417-.18359l1.20679-1.44336c2.10254-2.5166,5.38086-6.44238,5.45508-6.5293.91113-1.09082.76465-2.7207-.32715-3.63184Zm-8.67383,13.97461c-1.05273.94043-3.10938,1.34473-5.86523,1.17969.55371-.72461.91016-1.56934,1.24121-2.35059.56934-1.34375,1.06055-2.50488,2.33496-2.8584.875-.24121,1.73145-.11328,2.35352.35254.5.375.79102.92578.79883,1.51172.0127.92676-.26953,1.63574-.86328,2.16504Zm7.85254-11.30859c-.04297.05078-3.34473,4.00293-5.45801,6.5332l-.63416.75952c-.21741-.31958-.47217-.61816-.79651-.86108-.27283-.2041-.57422-.36011-.89014-.48413,2.01074-2.40723,6.05859-7.25122,6.12158-7.32544.18359-.2207.44336-.35645.72949-.38281.29297-.02246.56641.0625.78809.24707.45605.38086.51758,1.06152.13965,1.51367Z"
                fill="currentColor"
            />
        </svg>
    `;
};
