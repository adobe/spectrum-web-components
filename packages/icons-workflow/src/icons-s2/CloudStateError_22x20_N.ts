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
export const CloudStateError22x20NIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'CloudStateError 22x20 N',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="ICONS"
            xmlns="http://www.w3.org/2000/svg"
            width=${width}
            height=${height}
            viewBox="0 0 22 20"
            aria-hidden=${hidden ? 'true' : 'false'}
            role="img"
            fill="currentColor"
            aria-label=${title}
        >
            <path
                d="m11.30664,17H3.71777c-1.90332,0-3.45215-1.54785-3.45215-3.45117,0-1.49219.9668-2.78027,2.32422-3.25-.04297-.23145-.06445-.46582-.06445-.70312,0-2.17969,1.80957-3.95215,4.0332-3.95215.2793,0,.55762.0293.83105.08789.6377-1.95898,2.47656-3.34766,4.58887-3.34766,2.49512,0,4.56738,1.87012,4.81934,4.34961.04199.41211-.25781.78027-.66992.82227-.41602.04395-.78027-.25781-.82227-.66992-.17383-1.71191-1.60449-3.00195-3.32715-3.00195-1.66309,0-3.08008,1.25195-3.29688,2.91211-.03125.23535-.17188.44238-.37891.55762-.20801.11621-.45898.125-.6748.02832-.34863-.1582-.70898-.23828-1.06934-.23828-1.39648,0-2.5332,1.09961-2.5332,2.45215,0,.33203.06934.65625.20605.96484.09961.22363.08301.48242-.04395.69238s-.34863.34375-.59375.35938c-1.02539.06641-1.82812.91699-1.82812,1.93652,0,1.07617.87598,1.95117,1.95215,1.95117h7.58887c.41406,0,.75.33594.75.75s-.33594.75-.75.75Zm10.67334-3.47888c0,2.48523-1.99463,4.5-4.47998,4.5s-4.5-2.01477-4.5-4.5,2.01465-4.5,4.5-4.5,4.47998,2.01477,4.47998,4.5Zm-3.72998,2.30017c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v.2002c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.2002Zm0-5.0498c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v2.64941c0,.41406.33594.75.75.75s.75-.33594.75-.75v-2.64941Z"
                fill="currentColor"
            />
        </svg>
    `;
};
