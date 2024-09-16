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
export const LockOpenIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Lock Open',
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
                d="m15.25,8H6.5v-2.75c0-1.92969,1.57031-3.5,3.5-3.5.86523,0,1.6958.31836,2.33838.89551.30859.27734.78223.25293,1.05908-.05664.27686-.30762.25195-.78223-.05615-1.05859-.91846-.82568-2.10498-1.28027-3.34131-1.28027-2.75684,0-5,2.24316-5,5v2.75h-.25c-.96484,0-1.75.78516-1.75,1.75v7.5c0,.96484.78516,1.75,1.75,1.75h10.5c.96484,0,1.75-.78516,1.75-1.75v-7.5c0-.96484-.78516-1.75-1.75-1.75Zm.25,9.25c0,.1377-.1123.25-.25.25H4.75c-.1377,0-.25-.1123-.25-.25v-7.5c0-.1377.1123-.25.25-.25h10.5c.1377,0,.25.1123.25.25v7.5Z"
                fill="currentColor"
            />
            <path
                d="m11.25,12.5c0-.68945-.56055-1.25-1.25-1.25s-1.25.56055-1.25,1.25c0,.40259.20361.74487.5.97363v.77637c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.77637c.29639-.22876.5-.57104.5-.97363Z"
                fill="currentColor"
            />
        </svg>
    `;
};
