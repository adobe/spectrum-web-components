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
export const AspectRatioIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Aspect Ratio',
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
                d="m6.75,18h-3.5c-1.24072,0-2.25-1.00928-2.25-2.25v-3.5c0-1.24072,1.00928-2.25,2.25-2.25h3.5c1.24072,0,2.25,1.00928,2.25,2.25v3.5c0,1.24072-1.00928,2.25-2.25,2.25Zm-3.5-6.5c-.41357,0-.75.33643-.75.75v3.5c0,.41357.33643.75.75.75h3.5c.41357,0,.75-.33643.75-.75v-3.5c0-.41357-.33643-.75-.75-.75h-3.5Z"
                fill="currentColor"
            />
            <path
                d="m12.75,15h-1.53125c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h1.53125c.41357,0,.75-.33643.75-.75v-4.5c0-.41357-.33643-.75-.75-.75H3.25c-.3667,0-.67725.26123-.73926.62109-.07031.40869-.45801.68115-.86621.6123-.40869-.07031-.68262-.45801-.6123-.86621.18604-1.08203,1.11914-1.86719,2.21777-1.86719h9.5c1.24072,0,2.25,1.00928,2.25,2.25v4.5c0,1.24072-1.00928,2.25-2.25,2.25Z"
                fill="currentColor"
            />
            <path
                d="m17.33447,10.88232c-.29248,0-.56982-.17139-.69092-.45752-.16162-.38135.0166-.82129.39795-.98291.27832-.11816.4585-.38965.4585-.69189v-4.5c0-.41357-.33643-.75-.75-.75H3.25c-.36523,0-.68359.271-.74072.63037-.06494.40869-.44434.68945-.8584.62305-.40918-.06494-.68799-.44922-.62305-.8584.17432-1.09814,1.10889-1.89502,2.22217-1.89502h13.5c1.24072,0,2.25,1.00928,2.25,2.25v4.5c0,.90576-.53906,1.71924-1.37354,2.07275-.09521.04053-.19434.05957-.29199.05957Z"
                fill="currentColor"
            />
        </svg>
    `;
};
