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
export const FlipHorizontalIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Flip Horizontal',
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
                data-name="Path 1029747"
                d="m10.75,2.5c0,.41421-.33579.75-.75.75s-.75-.33579-.75-.75.33579-.75.75-.75.75.33579.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029749"
                d="m10.75,5.5c0,.41421-.33579.75-.75.75s-.75-.33579-.75-.75.33579-.75.75-.75.75.33579.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029751"
                d="m10.75,8.5c0,.41421-.33579.75-.75.75s-.75-.33579-.75-.75.33579-.75.75-.75.75.33579.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029753"
                d="m10.75,11.5c0,.41421-.33579.75-.75.75s-.75-.33579-.75-.75.33579-.75.75-.75.75.33579.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029755"
                d="m10.75,14.5c0,.41421-.33579.75-.75.75s-.75-.33579-.75-.75.33579-.75.75-.75.75.33579.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029756"
                d="m10.75,17.5c0,.41421-.33579.75-.75.75s-.75-.33579-.75-.75.33579-.75.75-.75.75.33579.75.75"
                fill="currentColor"
            />
            <path
                d="m3.26563,16.09863c-.24414,0-.49219-.04004-.7373-.12207-.92871-.31445-1.52832-1.15137-1.52832-2.13184v-7.68945c0-.98047.59961-1.81738,1.52832-2.13184.93066-.3125,1.91406-.01367,2.50879.76562l2.94043,3.84375c.61523.80566.61523,1.92871,0,2.7334l-2.94043,3.8457c-.43848.57324-1.08789.88672-1.77148.88672Zm.00195-10.69629c-.11621,0-.20996.02637-.25781.04199-.12012.04102-.50977.21191-.50977.71094v7.68945c0,.49902.38965.66992.50977.71094.11914.03809.53125.1416.83594-.25488l2.94043-3.8457c.20508-.26758.20508-.64258,0-.91113l-2.94043-3.84375c-.18262-.23926-.4043-.29785-.57812-.29785Z"
                fill="currentColor"
                opacity=".5"
            />
            <path
                d="m16.73438,16.09863c-.68359,0-1.33301-.31348-1.77148-.8877l-2.94043-3.84375c-.61523-.80566-.61523-1.92871,0-2.7334l2.94043-3.8457c.59473-.77832,1.57715-1.07715,2.50879-.76465.92871.31445,1.52832,1.15137,1.52832,2.13184v7.68945c0,.98047-.59961,1.81738-1.52832,2.13184-.24512.08203-.49316.12207-.7373.12207Zm-.00195-10.69629c-.17383,0-.39551.05859-.57812.29688l-2.94043,3.8457c-.20508.26758-.20508.64258,0,.91113l2.94043,3.84375c.30469.39941.7168.29492.83594.25586.12012-.04102.50977-.21191.50977-.71094v-7.68945c0-.49902-.38965-.66992-.50977-.71094-.04785-.01562-.1416-.04199-.25781-.04199Z"
                fill="currentColor"
            />
        </svg>
    `;
};
