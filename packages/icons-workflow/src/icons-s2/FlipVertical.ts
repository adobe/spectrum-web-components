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
export const FlipVerticalIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Flip Vertical',
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
                d="m17.5,10.75c-.41421,0-.75-.33579-.75-.75s.33579-.75.75-.75.75.33579.75.75-.33579.75-.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029749"
                d="m14.5,10.75c-.41421,0-.75-.33579-.75-.75s.33579-.75.75-.75.75.33579.75.75-.33579.75-.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029751"
                d="m11.5,10.75c-.41421,0-.75-.33579-.75-.75s.33579-.75.75-.75.75.33579.75.75-.33579.75-.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029753"
                d="m8.5,10.75c-.41421,0-.75-.33579-.75-.75s.33579-.75.75-.75.75.33579.75.75-.33579.75-.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029755"
                d="m5.5,10.75c-.41421,0-.75-.33579-.75-.75s.33579-.75.75-.75.75.33579.75.75-.33579.75-.75.75"
                fill="currentColor"
            />
            <path
                data-name="Path 1029756"
                d="m2.5,10.75c-.41421,0-.75-.33579-.75-.75s.33579-.75.75-.75.75.33579.75.75-.33579.75-.75.75"
                fill="currentColor"
            />
            <path
                d="m10,8.43848c-.48242,0-.96387-.15332-1.36621-.46094l-3.8457-2.94043c-.77832-.59473-1.07812-1.58008-.76465-2.50879.31445-.92871,1.15137-1.52832,2.13184-1.52832h7.68945c.98047,0,1.81738.59961,2.13184,1.52832.31348.92871.01367,1.91406-.76562,2.50879l-3.84375,2.94043c-.40332.30762-.88477.46094-1.36719.46094Zm-3.84473-5.93848c-.49902,0-.66992.38965-.71094.50977-.04004.11914-.1416.5332.25488.83594l3.8457,2.94043c.26758.20508.6416.20508.91113,0l3.84375-2.94043c.39746-.30273.2959-.7168.25586-.83594-.04102-.12012-.21191-.50977-.71094-.50977h-7.68945Z"
                fill="currentColor"
                opacity=".5"
            />
            <path
                d="m13.84473,19h-7.68945c-.98047,0-1.81738-.59961-2.13184-1.52832-.31348-.92871-.01367-1.91406.76562-2.50879l3.84375-2.94043c.80664-.61523,1.92871-.61523,2.7334,0l3.8457,2.94043c.77832.59473,1.07812,1.58008.76465,2.50879-.31445.92871-1.15137,1.52832-2.13184,1.52832Zm-3.84473-5.93945c-.16113,0-.32129.05078-.45605.15332l-3.84375,2.94043c-.39746.30273-.2959.7168-.25586.83594.04102.12012.21191.50977.71094.50977h7.68945c.49902,0,.66992-.38965.71094-.50977.04004-.11914.1416-.5332-.25488-.83594l-3.8457-2.94043c-.13379-.10254-.29395-.15332-.45508-.15332Z"
                fill="currentColor"
            />
        </svg>
    `;
};
