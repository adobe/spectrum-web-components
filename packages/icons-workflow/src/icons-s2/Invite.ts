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
export const InviteIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Invite',
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
                d="m15,10.5c-2.48529,0-4.5,2.01465-4.5,4.5s2.01471,4.5,4.5,4.5,4.5-2.01465,4.5-4.5-2.01471-4.5-4.5-4.5Zm2.5,5.125h-1.875v1.875c0,.34521-.27979.625-.625.625s-.625-.27979-.625-.625v-1.875h-1.875c-.34521,0-.625-.27979-.625-.625s.27979-.625.625-.625h1.875v-1.875c0-.34521.27979-.625.625-.625s.625.27979.625.625v1.875h1.875c.34521,0,.625.27979.625.625s-.27979.625-.625.625Z"
                fill="currentColor"
            />
            <path
                d="m10.05811,11.42188c-.65283.01172-1.3042-.17188-1.85938-.52441-.5293-.33887-.96143-.81152-1.25049-1.36621-.30566-.58203-.4624-1.24023-.45215-1.90039-.02441-1.27344.60986-2.47266,1.69727-3.18262,1.09863-.69824,2.5083-.69727,3.59912-.00488.52783.3418.95996.81055,1.25488,1.3584.30615.56543.46436,1.20605.45654,1.84961.01074.64062-.14551,1.30078-.45215,1.88867-.29053.55664-.72266,1.03125-1.25,1.37109-.52637.33496-1.12646.51074-1.74365.51074Zm-.04785-1.50098h.00928c.34766-.00488.68115-.08691.97266-.27246.30518-.19727.55908-.47559.72949-.80176.19141-.36719.28906-.7793.28223-1.19141.00488-.41113-.09082-.79785-.27686-1.14062-.17627-.3291-.43359-.60742-.74414-.80859-.59668-.37891-1.37451-.37793-1.97705.00293-.64404.4209-1.02441,1.14062-1.00977,1.91895-.00635.43652.09082.8457.28125,1.20801.16943.3252.4209.60059.72852.79688.29541.18848.63867.28809.9917.28809h.0127Z"
                fill="currentColor"
            />
            <path
                d="m10,1.27148C5.17529,1.27148,1.25,5.19629,1.25,10.02148c0,4.34082,3.23682,8.06543,7.5293,8.66504.03516.00488.06982.00684.10449.00684.36816,0,.68945-.27148.7417-.64648.05762-.41016-.22852-.78906-.63916-.84668-1.43335-.19995-2.71997-.82617-3.75073-1.73193.78394-.68213,1.91571-1.20288,3.23022-1.43701.40771-.07227.67969-.46191.60693-.86914-.07227-.40918-.45996-.67969-.86963-.60742-1.58936.28271-3.00714.92798-4.00055,1.80078-.91241-1.21875-1.45258-2.72412-1.45258-4.33398,0-3.99805,3.25244-7.25,7.25-7.25,3.60303,0,6.69043,2.68652,7.18164,6.24902.05664.41016.43799.69238.8457.64062.41016-.05664.69727-.43555.64062-.8457-.59375-4.30078-4.31982-7.54395-8.66797-7.54395Z"
                fill="currentColor"
            />
        </svg>
    `;
};
