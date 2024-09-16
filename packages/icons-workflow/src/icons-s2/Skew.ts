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
export const SkewIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Skew',
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
                d="m18.375,3.75c0-1.17188-.95312-2.125-2.125-2.125-.90698,0-1.67706.57373-1.98151,1.375h-4.53693c-.30444-.80127-1.07458-1.375-1.98157-1.375-1.17188,0-2.125.95312-2.125,2.125,0,.67212.31964,1.26514.80817,1.65479l-2.79407,8.73145c-1.11945.05908-2.0141.97998-2.0141,2.11377,0,1.17188.95312,2.125,2.125,2.125.90698,0,1.67706-.57373,1.98151-1.375h4.53699c.30444.80127,1.07452,1.375,1.98151,1.375,1.17188,0,2.125-.95312,2.125-2.125,0-.67212-.31964-1.26514-.80817-1.65479l2.79407-8.73145c1.11951-.05908,2.0141-.97998,2.0141-2.11377Zm-2.125-.875c.48242,0,.875.39258.875.875s-.39258.875-.875.875-.875-.39258-.875-.875.39258-.875.875-.875Zm-5.98151,12.625h-4.53693c-.13672-.35986-.36871-.6687-.66473-.90479l2.79407-8.73145c.85797-.04541,1.57892-.59595,1.87061-1.36377h4.53699c.13666.35986.36865.6687.66467.90479l-2.79407,8.73145c-.85791.04541-1.57892.59595-1.87061,1.36377ZM7.75,2.875c.48242,0,.875.39258.875.875s-.39258.875-.875.875-.875-.39258-.875-.875.39258-.875.875-.875Zm-4,14.25c-.48242,0-.875-.39258-.875-.875s.39258-.875.875-.875.875.39258.875.875-.39258.875-.875.875Zm8.5,0c-.48242,0-.875-.39258-.875-.875s.39258-.875.875-.875.875.39258.875.875-.39258.875-.875.875Z"
                fill="currentColor"
            />
        </svg>
    `;
};
