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
export const MagicWandIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Magic Wand',
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
                d="m15.0498,7.2002c0-.60156-.23438-1.16699-.6582-1.59082-.84863-.84961-2.33301-.85156-3.18262,0l-1.82129,1.82129c-.02148.02148-.04199.04492-.06055.06836-.02441.01855-.04688.03906-.06934.06152L1.65918,15.15918c-.4248.4248-.65918.99023-.65918,1.59082s.23438,1.16602.65918,1.59082.99023.65918,1.59082.65918,1.16602-.23438,1.59082-.65918l9.5498-9.5498c.4248-.4248.65918-.99023.65918-1.59082ZM3.78027,17.28027c-.2832.2832-.77734.2832-1.06055,0-.1416-.1416-.21973-.33008-.21973-.53027s.07812-.38867.21973-.53027l7.2002-7.2002,1.06543,1.05566-7.20508,7.20508ZM13.33008,7.73047l-1.28418,1.28418-1.06543-1.05566,1.28906-1.28906c.2832-.2832.77734-.28418,1.06055.00098.1416.14062.21973.3291.21973.5293s-.07812.38867-.21973.53027Z"
                fill="currentColor"
            />
            <path
                d="m18.70605,10.83154l-1.26123-.49854-.20312-1.34204c-.06519-.42798-.75806-.50513-.91577-.10425l-.49878,1.26221-1.34204.20166c-.21289.03198-.37891.20361-.40332.41797-.02441.2146.0979.41821.29907.49805l1.26221.49976.2019,1.34106c.03174.21289.20337.37891.41797.40332.21436.02441.41797-.0979.49805-.29907l.49927-1.26099,1.34131-.20312c.21411-.03271.37891-.20361.40332-.41797s-.09863-.41919-.29883-.49805Z"
                fill="currentColor"
            />
            <path
                d="m14.33618,3.64233l1.26221.49976.2019,1.34094c.03174.21301.20361.37903.41797.40344.2146.02441.41821-.0979.49805-.29907l.49951-1.26111,1.34131-.203c.21387-.03259.37891-.20361.40332-.41797s-.09863-.41919-.29907-.49805l-1.26123-.49854-.20288-1.34204c-.06519-.4281-.7583-.50513-.91602-.10437l-.49854,1.26221-1.34204.2019c-.21313.03186-.37915.20349-.40356.41797s.0979.41809.29907.49792Z"
                fill="currentColor"
            />
            <path
                d="m5.7793,4.69019l1.02417.4054.16382,1.08826c.02588.17273.16528.3075.33936.32727.17383.0199.33911-.07935.40405-.24268l.40527-1.02332,1.08813-.16479c.17383-.02637.30762-.16504.32764-.33911.01978-.17407-.08008-.34009-.24268-.40405l-1.02344-.40454-.16479-1.08911c-.05298-.34741-.61523-.40991-.74316-.08472l-.40454,1.02429-1.08911.16382c-.17285.02576-.30762.16516-.32739.33923-.01978.17395.07935.33911.24268.40405Z"
                fill="currentColor"
            />
        </svg>
    `;
};
