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
export const UserAvatarIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'User Avatar',
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
                d="m10,1.25C5.17529,1.25,1.25,5.17529,1.25,10s3.92529,8.75,8.75,8.75,8.75-3.92529,8.75-8.75S14.82471,1.25,10,1.25Zm0,1.5c3.99756,0,7.25,3.25244,7.25,7.25,0,1.63177-.54846,3.13422-1.46179,4.34717-1.48169-1.24371-3.58673-1.97217-5.78821-1.97217-2.26733,0-4.41754.74091-5.79742,1.95984-.90771-1.21082-1.45258-2.70856-1.45258-4.33484,0-3.99756,3.25244-7.25,7.25-7.25Zm-4.77966,12.68713c1.10168-.95905,2.90839-1.56213,4.77966-1.56213,1.7973,0,3.56195.59155,4.76843,1.57239-1.27618,1.11859-2.94214,1.80261-4.76843,1.80261-1.83173,0-3.50201-.68835-4.77966-1.81287Zm4.83777-4.03723c-.02148,0-.05713-.01025-.06299-.00049-.63721,0-1.25781-.18066-1.7959-.52295-.5293-.33887-.96143-.81055-1.25098-1.36621-.30566-.58301-.4624-1.24072-.45215-1.90039-.02441-1.27246.60986-2.47168,1.69727-3.18262,1.09814-.69775,2.50781-.69824,3.59912-.00537.52783.3418.95947.81055,1.25439,1.3584.30664.56543.46484,1.20605.45703,1.85059.01074.64014-.14551,1.30078-.45215,1.88818-.29053.55615-.72266,1.03027-1.24951,1.37109-.52637.33496-1.12646.50977-1.74414.50977Zm-.04834-1.50049h.00977c.34814.01562.68164-.08643.97266-.27197.30518-.19727.55908-.47607.72949-.80273.19141-.36621.28906-.77832.28223-1.19092.00488-.41064-.09082-.79785-.27686-1.14062-.17627-.32812-.43359-.60742-.74414-.80859-.59619-.37793-1.37402-.37891-1.97705.00391-.64404.4209-1.02441,1.14014-1.00977,1.91895-.00635.43555.09082.84424.28125,1.20801.16992.32471.42139.6001.72852.79639.29541.18799.6377.2876.98926.2876h.01465Z"
                fill="currentColor"
            />
        </svg>
    `;
};
