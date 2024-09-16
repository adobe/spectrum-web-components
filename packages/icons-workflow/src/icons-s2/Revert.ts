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
export const RevertIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Revert',
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
                d="m18,15.5H3c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h15c.41406,0,.75.33594.75.75s-.33594.75-.75.75ZM11,3.25c-3.77661,0-6.92633,2.81616-7.6087,6.52832l-.85858-1.43994c-.21143-.35596-.67236-.47119-1.02832-.25977-.35547.21191-.47217.67236-.25977,1.02832l1.79541,3.01172c.10352.17383.27344.29834.47021.34521.05762.01367.11572.02051.17383.02051.14111,0,.28076-.04004.40186-.1167l2.91943-1.85254c.34961-.22217.45312-.68555.23145-1.03516-.22217-.3501-.68604-.45312-1.03516-.23145l-1.34387.85291c.53448-3.03955,3.0827-5.35144,6.14221-5.35144,3.44629,0,6.25,2.93115,6.25,6.53418,0,.41406.33594.75.75.75s.75-.33594.75-.75c0-4.43018-3.47656-8.03418-7.75-8.03418Z"
                fill="currentColor"
            />
        </svg>
    `;
};
