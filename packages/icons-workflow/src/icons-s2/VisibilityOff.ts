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
export const VisibilityOffIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Visibility Off',
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
                d="m9.96582,16.68262C5.11035,16.68262.75,12.29395.75,10.22168c0-.91992.86426-2.35938,2.20117-3.66797.29492-.28809.76953-.28418,1.06055.01172.29004.2959.28418.77051-.01172,1.06055-1.30957,1.28125-1.75,2.31934-1.75,2.5957,0,1.14453,3.64746,4.96094,7.71582,4.96094.60449,0,1.23145-.08496,1.86328-.25195.39746-.10156.81055.13379.91699.53418.10547.40039-.13379.81055-.53418.91699-.75586.19922-1.51172.30078-2.24609.30078Z"
                fill="currentColor"
            />
            <path
                d="m16.60352,13.84277c-.20312,0-.40527-.08203-.55371-.24414-.2793-.30566-.25781-.78027.04785-1.05957,1.13965-1.04199,1.65234-1.98242,1.65234-2.31738,0-.80176-1.9043-3.27637-4.51074-4.55176-1.00879-.50977-2.12891-.78418-3.24902-.79785-.62012,0-1.26465.09375-1.90527.2793-.40039.10938-.81445-.11523-.92871-.5127-.11523-.39746.11426-.81348.5127-.92871.77539-.22461,1.55957-.33789,2.33105-.33789,1.35645.0166,2.7041.34668,3.90723.9541,2.74219,1.34277,5.34277,4.20996,5.34277,5.89551,0,.91895-.7998,2.19922-2.14062,3.4248-.14355.13184-.3252.19629-.50586.19629Z"
                fill="currentColor"
            />
            <g>
                <path
                    d="m18.78027,17.74121l-5.77808-5.77808c.20337-.29639.35767-.61475.45886-.94604.20886-.68457-.45813-1.25049-1.11877-.97607-.49548.20581-.9458.14062-1.18115.08105l-1.37183-1.37183c-.09448-.36938-.07935-.74487.03979-1.08569.22266-.63672-.47266-1.25879-1.09985-1.01025-.23547.09326-.4624.21338-.67676.35913L2.28027,1.24121c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l16.5,16.5c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Z"
                    fill="currentColor"
                />
                <path
                    d="m8.20459,12.9978c.69531.43384,1.52295.5874,2.31909.48462l-3.98169-3.98169c-.16833,1.31567.38574,2.7002,1.6626,3.49707Z"
                    fill="currentColor"
                />
            </g>
        </svg>
    `;
};
