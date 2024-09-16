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
export const MentionIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Mention',
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
                d="m10.71484,18.98081c-4.9624,0-9-4.0376-9-9C1.71484,5.02378,5.7417.9896,10.69482.97886c.00244-.00049.00488-.00049.00879,0,.01221.00049.02295-.00049.03369.00049,2.50977.02832,4.6333.90918,5.9834,2.48096,1.2998,1.51416,1.80371,3.5874,1.45654,5.99561-.62891,4.3667-4.55713,5.48486-8.02588,5.06836-1.36133-.19629-3.83154-1.49463-3.56543-5.01904.12451-1.65137.74121-2.8877,1.83252-3.67383,1.98877-1.43213,4.79395-.74854,4.91113-.71826.35254.08887.59082.41748.56494.78027l-.49609,6.97852c1.48633-.38428,2.96631-1.35254,3.29443-3.62988.2832-1.96729-.10059-3.62842-1.11035-4.80469-1.06836-1.24414-2.80273-1.93945-4.88428-1.9585-4.12793.00928-7.4834,3.37012-7.4834,7.5,0,4.13672,3.36426,7.50195,7.5,7.50195.41406,0,.75.33594.75.75s-.33594.75-.75.75Zm.88086-12.55811c-.729,0-1.61426.12891-2.30518.62939-.7124.51562-1.11914,1.37891-1.2085,2.56592-.22217,2.93701,2.01465,3.37939,2.27051,3.41992.34082.04102.89062.08447,1.52637.0542l.47119-6.62549c-.21436-.02441-.47266-.04395-.75439-.04395Z"
                fill="currentColor"
            />
        </svg>
    `;
};
