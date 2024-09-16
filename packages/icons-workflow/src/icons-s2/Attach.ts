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
export const AttachIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Attach',
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
                d="m7.02588,18.8984h-.00098c-1.34229-.00049-2.60254-.52246-3.54834-1.46973-.94678-.94629-1.46826-2.20703-1.46826-3.54932,0-1.34277.52148-2.60352,1.46875-3.55029L11.48877,2.32906c.79102-.79102,1.8042-1.22705,2.85303-1.22705,1.021,0,1.89697.35791,2.60303,1.06445.78418.78418,1.15479,1.80176,1.04346,2.86523-.09717.92578-.54346,1.82861-1.25781,2.5415l-5.33643,5.32178c-.07178.07764-.90381.93945-2.00928.95947-.60498.01953-1.15869-.22852-1.62305-.69287-1.20996-1.21045-.85596-2.64844.03223-3.53613l4.50586-4.52197c.29248-.29297.76709-.29492,1.06055-.00195.29346.29248.29443.76709.00195,1.06055l-4.50684,4.52295c-.33105.33105-.60449.84424-.0332,1.41602.23193.23096.43115.26221.53076.25391.39941-.00488.84131-.37549.96484-.50488l5.35303-5.33887c.46436-.46338.76514-1.05957.82568-1.63574.06494-.62256-.14111-1.17676-.6123-1.64844-.4209-.42041-.92529-.625-1.54248-.625-.64795,0-1.28467.27979-1.79297.78809L4.53711,11.3901c-.66357.66309-1.02881,1.54736-1.02881,2.48926,0,.94141.36523,1.82568,1.0293,2.48926.66309.66406,1.54639,1.0293,2.4873,1.02979h.00098c.94189,0,1.82617-.36572,2.48975-1.02979l6.97314-6.97266c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-6.97314,6.97266c-.94678.94727-2.20752,1.46924-3.55029,1.46924Z"
                fill="currentColor"
            />
        </svg>
    `;
};
