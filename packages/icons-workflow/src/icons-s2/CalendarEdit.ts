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
export const CalendarEditIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Calendar Edit',
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
                d="m18.56193,10.06844c-.96594-.7915-2.45325-.68848-3.37903.23926l-4.18262,4.18262c-.24799.2478-.43256.55566-.5332.89062l-.95404,3.15967c-.08008.26489-.00781.552.1875.74707.14258.14282.33398.21973.53027.21973.07233,0,.14551-.01001.2168-.03223l3.1582-.95337c.33588-.10132.64447-.2854.89062-.53271,0,0,4.125-4.12476,4.25287-4.25317.49323-.49268.7569-1.17529.72168-1.87183-.03418-.69678-.36615-1.35132-.90906-1.79565Zm-5.38873,7.01709l-1.82031.54932.55084-1.82104c.01697-.05762.0578-.10205.09027-.15186l1.33234,1.33228c-.05011.03271-.09485.07373-.15314.09131Zm4.51459-4.40918c-.09265.09326-2.25116,2.25146-3.45575,3.45581l-1.3764-1.37598,3.38788-3.38794c.22168-.22144.5127-.33691.79303-.33691.2099,0,.41309.06519.57605.19849.21881.17847.34674.43042.36041.7085.01373.27808-.08691.53979-.28522.73804Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m7.89371,16.52132h-3.64355c-.41357,0-.75-.33691-.75-.75v-7.25h13.75c.41406,0,.75-.33594.75-.75,0-.00024-.00012-.00024-.00012-.00049s.00012-.00024.00012-.00049v-2.49902c0-1.24023-1.00928-2.25-2.25-2.25h-2v-1c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1h-4.5v-1c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v1h-2c-1.24072,0-2.25,1.00977-2.25,2.25v10.5c0,1.24023,1.00928,2.25,2.25,2.25h3.64355c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-3.64355-12h2v.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.5h4.5v.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-.5h2c.41357,0,.75.33691.75.75v1.75H3.50016v-1.75c0-.41309.33643-.75.75-.75Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
