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
export const PerspectiveTransformIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Perspective Transform',
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
                d="m17,11.26855v-2.53711c.80139-.30444,1.375-1.07446,1.375-1.98145,0-1.17188-.95312-2.125-2.125-2.125-.72998,0-1.37451.37012-1.75732.93237L5.8479,3.48242c-.1333-1.04443-1.01758-1.85742-2.0979-1.85742-1.17188,0-2.125.95312-2.125,2.125,0,.90698.57361,1.677,1.375,1.98145v8.53711c-.80139.30444-1.375,1.07446-1.375,1.98145,0,1.17188.95312,2.125,2.125,2.125,1.08032,0,1.9646-.81274,2.0979-1.85742l8.6449-2.07495c.38269.56226,1.02722.93237,1.7572.93237,1.17188,0,2.125-.95312,2.125-2.125,0-.90698-.57361-1.67725-1.375-1.98145Zm-2.8479,1.71411l-8.64502,2.07446c-.24377-.35791-.59619-.63257-1.00708-.78857V5.73145c.41089-.15601.76331-.43066,1.00708-.78857l8.64502,2.07446c.10046.78857.62744,1.44043,1.3479,1.71411v2.53711c-.72046.27368-1.24744.92554-1.3479,1.71411Zm2.0979-7.10767c.48242,0,.875.39258.875.875s-.39258.875-.875.875-.875-.39258-.875-.875.39258-.875.875-.875ZM3.75,2.875c.48242,0,.875.39258.875.875s-.39258.875-.875.875-.875-.39258-.875-.875.39258-.875.875-.875Zm0,14.25c-.48242,0-.875-.39258-.875-.875s.39258-.875.875-.875.875.39258.875.875-.39258.875-.875.875Zm12.5-3c-.48242,0-.875-.39258-.875-.875s.39258-.875.875-.875.875.39258.875.875-.39258.875-.875.875Z"
                fill="currentColor"
            />
        </svg>
    `;
};
