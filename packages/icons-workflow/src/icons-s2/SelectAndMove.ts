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
export const SelectAndMoveIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Select And Move',
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
                d="m2.45703,9.89551c-.18652,0-.375-.03613-.55566-.11035-.54736-.22461-.90137-.75293-.90137-1.3457V2.35352c0-.59082.35254-1.11816.89795-1.34473.54492-.22656,1.16748-.10352,1.58496.31348l4.15967,4.14844c.42236.4209.54541,1.05566.31299,1.61816-.22852.55371-.75439.91113-1.34033.91113h-1.65039c-.00928.00293-.01953,0-.02246-.00195l-1.45361,1.4668c-.2793.28125-.65186.43066-1.03174.43066Zm-.70703-1.45605l.75.00098v-.00098h-.75Zm.67334-6.05469l.07568,5.98633,1.43213-1.48438c.38281-.38672.87256-.38672,1.03369-.38672h1.65039L2.42334,2.38477Z"
                fill="currentColor"
            />
            <path
                d="m19.21094,11.5293l-2.00293-1.75c-.26123-.22754-.65527-.2002-.88184.05957-.22705.25977-.20068.6543.05957.88184l.60583.5293h-4.24158v-4.29126l.5293.60571c.12354.1416.29688.21387.47119.21387.14551,0,.29248-.05078.41064-.1543.26025-.22754.28662-.62207.05957-.88184l-1.75-2.00293c-.2373-.27148-.7041-.27148-.94141,0l-1.75,2.00293c-.22705.25977-.20068.6543.05957.88184.26074.22754.65479.2002.88184-.05957l.5293-.60571v4.29126h-3.84167l.60583-.5293c.26025-.22754.28662-.62207.05957-.88184s-.62207-.28711-.88184-.05957l-2.00293,1.75c-.13574.11914-.21387.29004-.21387.4707s.07812.35156.21387.4707l2.00293,1.75c.11865.10352.26514.1543.41064.1543.17432,0,.34766-.07227.47119-.21387.22705-.25977.20068-.6543-.05957-.88184l-.60583-.5293h3.84167v3.79126l-.5293-.60571c-.22705-.25977-.62207-.28711-.88184-.05957-.26025.22754-.28662.62207-.05957.88184l1.75,2.00293c.11865.13574.29053.21387.4707.21387s.35205-.07812.4707-.21387l1.75-2.00293c.22705-.25977.20068-.6543-.05957-.88184-.26123-.22754-.65527-.2002-.88184.05957l-.5293.60571v-3.79126h4.24158l-.60583.5293c-.26025.22754-.28662.62207-.05957.88184.12354.1416.29688.21387.47119.21387.14551,0,.29248-.05078.41064-.1543l2.00293-1.75c.13574-.11914.21387-.29004.21387-.4707s-.07812-.35156-.21387-.4707Z"
                fill="currentColor"
            />
        </svg>
    `;
};
