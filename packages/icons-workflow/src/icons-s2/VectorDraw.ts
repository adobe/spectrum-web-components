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
export const VectorDrawIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Vector Draw',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="ICONS"
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
                d="m17.67773,5.25098l-2.95898-2.95898c-.84961-.84961-2.33301-.85059-3.18262,0l-1.24609,1.24707c-.00708.00708-.00928.01685-.01611.02417l-4.48389,2.44556c-.57422.31445-1.01953.82324-1.25293,1.43555l-3.31738,8.71777c-.27734.73242-.09961,1.5625.4541,2.11816.38184.38184.88965.58398,1.4082.58398.25098,0,.50293-.04688.74512-.14355l9.24805-3.71973c.62305-.25,1.13281-.71875,1.43457-1.32227l2.07812-4.15625,1.08984-1.08984c.87695-.87598.87695-2.30371,0-3.18164Zm-4.50977,7.75684c-.13672.27441-.36816.4873-.65234.60059l-8.43457,3.39258,4.2616-4.26172c.05383.00732.10156.03174.15735.03174.69043,0,1.25-.55957,1.25-1.25,0-.69019-.55957-1.25-1.25-1.25s-1.25.55981-1.25,1.25c0,.05615.02466.104.03186.1582l-4.4408,4.44067,3.09839-8.14136c.10547-.27832.30859-.51074.56934-.65332l4.35742-2.37695,4.22168,4.22168-1.91992,3.83789Zm3.44922-5.63574l-.60303.60303-4.01978-4.01978.60229-.60278c.2832-.2832.77734-.2832,1.06055,0l2.95898,2.95898c.29297.29199.29297.76855.00098,1.06055Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
