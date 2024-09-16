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
export const EmojiIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Emoji',
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
                d="m10,14.5c-1.92676,0-3.28271-1.12939-3.33936-1.17773-.31641-.26758-.35547-.74072-.08789-1.05713.26709-.31543.74023-.35645,1.05664-.0874.00732.00586,1.0083.82227,2.37061.82227,1.37109,0,2.41748-.82471,2.42773-.8335.32227-.25781.79443-.20801,1.05371.11328.25928.3208.21191.79053-.10791,1.05127-.05859.04785-1.45459,1.16895-3.37354,1.16895Z"
                fill="currentColor"
            />
            <circle cx="7.25" cy="8" r="1.25" fill="currentColor" />
            <circle cx="12.75" cy="8" r="1.25" fill="currentColor" />
            <path
                d="m10,18.75c-4.82471,0-8.75-3.92529-8.75-8.75S5.17529,1.25,10,1.25s8.75,3.92529,8.75,8.75-3.92529,8.75-8.75,8.75Zm0-16c-3.99756,0-7.25,3.25244-7.25,7.25s3.25244,7.25,7.25,7.25,7.25-3.25244,7.25-7.25-3.25244-7.25-7.25-7.25Z"
                fill="currentColor"
            />
            <path
                d="m9.97754,14.5c-1.92627,0-3.28223-1.12988-3.33887-1.17773-.31641-.26758-.35547-.74121-.08789-1.05664.26709-.31738.74023-.35547,1.05664-.08789.00732.00586,1.0083.82227,2.37012.82227,1.37109,0,2.41748-.8252,2.42773-.83301.32227-.25879.79395-.20801,1.05371.1123.25928.32129.21191.79102-.10791,1.05176-.05859.04785-1.45459,1.16895-3.37354,1.16895Z"
                fill="currentColor"
            />
            <circle cx="7.25" cy="8.02303" r="1.25" fill="currentColor" />
            <circle cx="12.75" cy="8.02303" r="1.25" fill="currentColor" />
            <path
                d="m10,18.75c-4.82471,0-8.75-3.9248-8.75-8.75S5.17529,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.92529,8.75-8.75,8.75Zm0-16c-3.99756,0-7.25,3.25195-7.25,7.25s3.25244,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25244-7.25-7.25-7.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};
