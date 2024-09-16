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
export const ColorIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Color',
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
            <circle cx="10.85885" cy="5.52114" r="1.5" fill="currentColor" />
            <circle cx="6.85885" cy="7.52114" r="1.5" fill="currentColor" />
            <circle cx="6.85885" cy="12.52114" r="1.5" fill="currentColor" />
            <circle cx="10.85885" cy="14.52114" r="1.5" fill="currentColor" />
            <path
                d="m11.00293,18.77148c-2.59473-.01855-4.93457-.91016-6.66211-2.50781-1.76172-1.63086-2.73145-3.81348-2.73145-6.14453s.96973-4.51367,2.73145-6.14453c1.85156-1.71777,4.3418-2.70312,6.83008-2.70312,2.15723,0,4.14355.73633,5.59375,2.07324,1.04883.9707,1.62598,2.26953,1.62598,3.65918s-.57715,2.68945-1.625,3.66016l-1.2041,1.11914c-.08594.0791-.1875.20703-.1875.3623,0,.15625.10156.28418.1875.36426.14648.13672.18066.16895.5166.22656.41406.07227.9502.16602,1.37305.57617l.00098.00098c.39551.38574.62598.97852.61816,1.58594-.00879.58887-.23438,1.11816-.63672,1.48926-1.625,1.51367-3.96973,2.38281-6.43066,2.38281Zm.16797-16c-2.11426,0-4.23242.83984-5.81055,2.30371-1.45215,1.34473-2.25098,3.13574-2.25098,5.04395s.79883,3.69922,2.25098,5.04297c1.43066,1.3252,3.46484,2.09375,5.58105,2.10938,2.14648,0,4.11914-.72266,5.47266-1.98242.13281-.12305.1543-.30957.15625-.41016.00293-.22266-.08301-.41016-.16406-.49023-.0918-.08789-.35254-.13379-.5625-.16992-.61035-.10547-.92285-.25391-1.30566-.61328-.42773-.39746-.66406-.91602-.66406-1.45996,0-.54297.23633-1.06152.66602-1.46094l1.20508-1.12109c.73926-.68359,1.14551-1.59277,1.14551-2.55957s-.40625-1.87402-1.14355-2.55664c-1.17188-1.08008-2.79688-1.67578-4.57617-1.67578Z"
                fill="currentColor"
            />
        </svg>
    `;
};
