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
export const VolumeOffIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Volume Off',
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
                d="m18.78027,17.73926L2.28027,1.23926c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l2.72168,2.72168h-.69141c-1.24023,0-2.25,1.00977-2.25,2.25v5.5c0,1.24023,1.00977,2.25,2.25,2.25h1.62891c.19824,0,.3916.08008.53027.21875l2.60352,2.60449c.33594.33594.78125.51367,1.23535.51367.22559,0,.45312-.04395.6709-.13477.65723-.27148,1.08105-.90625,1.08105-1.61719v-4.52637l6.71973,6.71973c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Zm-9.28027-1.13281c0,.14551-.09668.20801-.1543.23145-.05859.02441-.1709.04688-.27246-.05371l-2.60352-2.60449c-.4248-.4248-.98926-.6582-1.59082-.6582h-1.62891c-.41309,0-.75-.33691-.75-.75v-5.5c0-.41309.33691-.75.75-.75h2.19141l4.05859,4.05859v6.02637Z"
                fill="currentColor"
            />
            <path
                d="m8.25879,4.07324l.81445-.81445c.10449-.10254.21582-.07617.27246-.05469.07031.0293.1543.09277.1543.23145v2.59082c0,.41406.33594.75.75.75s.75-.33594.75-.75v-2.59082c0-.70996-.42383-1.34473-1.08008-1.61719-.65723-.27051-1.4043-.12207-1.90723.37988l-.81445.81445c-.29297.29297-.29297.76758,0,1.06055s.76758.29297,1.06055,0Z"
                fill="currentColor"
            />
            <path
                d="m13.22266,9.8252c.04004.38574.36523.67285.74512.67285.02539,0,.05176-.00098.07812-.00391.41211-.04297.71191-.41113.66895-.82324-.09961-.96289-.57324-1.79395-1.29883-2.27734-.34473-.22852-.81055-.13574-1.04004.20801-.22949.34473-.13672.81055.20801,1.04004.34766.23145.58594.67383.63867,1.18359Z"
                fill="currentColor"
            />
            <path
                d="m17.25,10.01758c0,.86621-.28418,1.68652-.80078,2.30957-.26367.31934-.21875.79199.09961,1.05664.14062.11523.30957.17188.47852.17188.21484,0,.42969-.09277.57812-.27148.73828-.89258,1.14453-2.05273,1.14453-3.2666,0-1.68555-.79785-3.26562-2.08301-4.12402-.34766-.22949-.81152-.13672-1.04102.20703-.22949.34473-.13672.81055.20703,1.04102.87402.58301,1.41699,1.68555,1.41699,2.87598Z"
                fill="currentColor"
            />
        </svg>
    `;
};
