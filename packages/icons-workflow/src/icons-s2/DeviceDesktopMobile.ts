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
export const DeviceDesktopMobileIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Device Desktop Mobile',
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
            <g>
                <path
                    d="m16.46973,18h-4.93945c-.84375,0-1.53027-.76465-1.53027-1.7041V7.7041c0-.93945.68652-1.7041,1.53027-1.7041h4.93945c.84375,0,1.53027.76465,1.53027,1.7041v8.5918c0,.93945-.68652,1.7041-1.53027,1.7041Zm-.04297-10.50977l-4.89648.00977c.02344.00293-.03027.07812-.03027.2041v8.5918c0,.12598.05371.20117.07324.21387l4.89648-.00977c-.02344-.00293.03027-.07812.03027-.2041V7.7041c0-.12598-.05371-.20117-.07324-.21387Z"
                    fill="currentColor"
                />
                <ellipse
                    cx="14"
                    cy="15.18182"
                    rx=".61905"
                    ry=".63636"
                    fill="currentColor"
                />
            </g>
            <path
                d="m7.75,13h-3.68164c-1.14062,0-2.06836-.90137-2.06836-2.00977v-6.98047c0-1.1084.92773-2.00977,2.06836-2.00977h11.68164c1.24023,0,2.25,1.00977,2.25,2.25,0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75c0-.41309-.33691-.75-.75-.75H4.06836c-.31348,0-.56836.22852-.56836.50977v6.98047c0,.28125.25488.50977.56836.50977h3.68164c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m7.75,15.5h-1.5c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.5c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};
