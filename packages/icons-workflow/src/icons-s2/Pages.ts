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
export const PagesIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Pages',
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
            <g>
                <path
                    d="m5.12305,15.08008c-.05957,0-.08789-.02539-.08789-.07812v-5.53223c-.16211.08789-.35645.16895-.58301.24121-.22754.07422-.41797.125-.57227.1543-.05859.00781-.08789-.01367-.08789-.06543v-.93457c0-.05176.02148-.08105.06543-.08887.25684-.06543.52246-.15723.79785-.27441s.51855-.24609.73145-.38477c.03613-.0293.0918-.04492.16504-.04492h.75879c.03711,0,.05469.02539.05469.07715v6.85254c0,.05273-.02148.07812-.06543.07812h-1.17676Z"
                    fill="currentColor"
                />
                <path
                    d="m10.3916,15.18945c-.45508,0-.84375-.09375-1.16602-.28027s-.58789-.44434-.79785-.77051c-.20898-.32617-.3623-.70703-.46191-1.14355-.09863-.43652-.14844-.90723-.14844-1.41309,0-.51367.05664-.98828.1709-1.4248.11328-.43652.27832-.81348.49512-1.13379.21582-.31836.4834-.56738.80273-.74805.31934-.17871.68359-.26953,1.09473-.26953.50586,0,.92188.10938,1.24805.3252s.58496.49512.77539.83594c.19141.34082.32324.72461.39648,1.14941.07324.42578.11035.84766.11035,1.26562,0,.46094-.04395.90918-.13281,1.3418-.08789.43262-.23242.81738-.43457,1.1543-.20117.33789-.46191.60742-.78027.80859-.31934.20215-.70996.30273-1.17188.30273Zm-.0332-6.06055c-.35156,0-.6416.19238-.86914.57715-.22656.38574-.34082.99902-.34082,1.84277,0,.78516.10254,1.39648.30859,1.83691.20508.44043.5166.65918.93457.65918s.72266-.20996.91309-.63184c.19043-.4209.28613-1.03613.28613-1.84277,0-.84277-.10254-1.46094-.30859-1.85352-.20508-.39258-.5127-.58789-.92383-.58789Z"
                    fill="currentColor"
                />
            </g>
            <path
                d="m13.75,19H3.25c-1.24023,0-2.25-1.00977-2.25-2.25V6.25c0-1.24023,1.00977-2.25,2.25-2.25h10.5c1.24023,0,2.25,1.00977,2.25,2.25v10.5c0,1.24023-1.00977,2.25-2.25,2.25ZM3.25,5.5c-.41309,0-.75.33691-.75.75v10.5c0,.41309.33691.75.75.75h10.5c.41309,0,.75-.33691.75-.75V6.25c0-.41309-.33691-.75-.75-.75H3.25Z"
                fill="currentColor"
            />
            <path
                d="m18.25,14.75c-.41406,0-.75-.33594-.75-.75V3.25c0-.41309-.33691-.75-.75-.75H6c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h10.75c1.24023,0,2.25,1.00977,2.25,2.25v10.75c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};
