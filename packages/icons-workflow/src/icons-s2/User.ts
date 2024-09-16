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
export const UserIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'User',
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
                d="m10,11.25c-2.61914,0-4.75-2.24316-4.75-5S7.38086,1.25,10,1.25s4.75,2.24316,4.75,5-2.13086,5-4.75,5Zm0-8.5c-1.79199,0-3.25,1.57031-3.25,3.5s1.45801,3.5,3.25,3.5,3.25-1.57031,3.25-3.5-1.45801-3.5-3.25-3.5Z"
                fill="currentColor"
            />
            <path
                d="m17.24902,18.75c-.37793,0-.70312-.28516-.74463-.66895-.2627-2.42871-3.12012-4.33105-6.50439-4.33105-3.41357,0-6.27051,1.89844-6.50342,4.32227-.04004.41211-.40967.72754-.81836.67383-.41211-.03906-.71436-.40527-.6748-.81836.30615-3.18359,3.81885-5.67773,7.99658-5.67773,4.2085,0,7.646,2.4375,7.99561,5.66895.04443.41211-.25293.78223-.66504.82715-.02734.00293-.05469.00391-.08154.00391Z"
                fill="currentColor"
            />
        </svg>
    `;
};
