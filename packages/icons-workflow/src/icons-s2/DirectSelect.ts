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
export const DirectSelectIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Direct Select',
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
                d="m8.75,9.48926c0-1.31616.89508-2.41663,2.10577-2.75696-.01202-.38879-.09631-.76794-.25568-1.11511l3.03748-2.56873c.0141.005.02606.01318.04041.01794.78754.25708,1.63434-.1731,1.89142-.96057s-.17297-1.6344-.96051-1.89148c-.15629-.05099-.3149-.07493-.47079-.07439-.62962.00219-1.21457.40376-1.42063,1.03496-.07922.2428-.0863.48962-.04462.72461l-3.03973,2.57068c-.22217-.15405-.46094-.28906-.73108-.3772-1.49628-.48828-3.10516.32861-3.59357,1.82495-.23456.71851-.16168,1.46021.13654,2.09399l-3.23639,2.73706c-.00464-.00159-.00848-.00427-.01312-.00586-.78754-.25708-1.63434.1731-1.89142.96057-.05551.17003-.07898.34282-.07374.51185.01903.61385.41675,1.17805,1.03425,1.37962.78754.25696,1.63434-.1731,1.89142-.96057.0827-.2533.08759-.51111.03906-.75513l3.22845-2.73022c.21661.14709.44836.27673.70978.36194.54419.17773,1.10211.17847,1.6167.04077v-.06274Z"
                fill="currentColor"
            />
            <path
                d="m11.62598,18.95518c-.2085,0-.41895-.04004-.62012-.12305-.61084-.25146-1.00586-.84131-1.00586-1.50195v-7.68018c0-.65869.39307-1.24756,1.00146-1.5.6084-.25293,1.30176-.11572,1.76953.34961l5.25,5.23486c.4668.46582.60596,1.16064.354,1.77051s-.84082,1.00391-1.50098,1.00391h-2.09766l-1.99854,1.96436c-.31201.31494-.72754.48193-1.15186.48193Zm.00342-9.43164c-.01514,0-.03271.00342-.05273.01172-.07666.03174-.07666.09229-.07666.11475v7.68018c0,.02295,0,.08301.07666.11475.07861.03271.12061-.01123.13574-.02734l1.91016-1.92773c.30273-.30566.72363-.48985,1.15381-.48985h2.09766c.02295,0,.08301.00889.11475-.06777s-.01074-.11914-.02686-.13525l-5.25049-5.23486c-.01172-.01221-.03809-.03857-.08203-.03857Z"
                fill="currentColor"
            />
        </svg>
    `;
};
