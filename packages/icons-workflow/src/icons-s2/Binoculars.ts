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
export const BinocularsIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Binoculars',
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
                d="m18.61914,12.90405l-1.91406-8.58765c-.25977-1.27539-1.39258-2.20117-2.69531-2.20117-1.5166,0-2.75,1.2334-2.75,2.75v.51074c-.37671-.19421-.79761-.31445-1.25-.31445s-.87329.12024-1.25.31445v-.51074c0-1.5166-1.2334-2.75-2.75-2.75-1.30273,0-2.43652.92578-2.69238,2.18652l-1.91699,8.60254c-.08252.30859-.14062.62671-.14062.96094,0,2.06738,1.68262,3.75,3.75,3.75,2.06665,0,3.74878-1.68164,3.74976-3.74805h.00024v-2.00195c0-.68945.56055-1.25,1.25-1.25s1.25.56055,1.25,1.25v2.00195h.00024c-.00049,1.00122.38989,1.94189,1.09741,2.64941.70801.70898,1.64941,1.09863,2.65137,1.09863,2.06738,0,3.75-1.68164,3.75098-3.75,0-.33423-.05811-.65259-.14062-.96118ZM14.00977,3.61523c.5918,0,1.10742.4209,1.22852,1.01465l1.30652,5.82227c-.46985-.21216-.98694-.33691-1.53503-.33691-.84741,0-1.62134.29321-2.25.76904v-6.01904c0-.68945.56055-1.25,1.25-1.25Zm-9.22559,1c.11719-.5791.63281-1,1.22559-1,.68945,0,1.25.56055,1.25,1.25v6.01929c-.62866-.47583-1.40259-.76929-2.25-.76929-.54834,0-1.06592.125-1.53589.3374l1.3103-5.8374Zm.22559,11.5c-1.24023,0-2.25-1.00977-2.25-2.25s1.00977-2.25,2.25-2.25,2.25,1.00977,2.25,2.25-1.00977,2.25-2.25,2.25Zm5-7c-.45239,0-.87329.12012-1.25.31445v-1.61816c0-.68945.56055-1.25,1.25-1.25s1.25.56055,1.25,1.25v1.61816c-.37671-.19434-.79761-.31445-1.25-.31445Zm4.99902,7c-.60059,0-1.16602-.23438-1.59082-.65918s-.6582-.98926-.6582-1.59082c0-1.24023,1.00977-2.25,2.25-2.25s2.25,1.00977,2.25,2.25c-.00098,1.24023-1.01074,2.25-2.25098,2.25Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
