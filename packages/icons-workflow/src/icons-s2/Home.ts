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
export const HomeIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Home',
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
                d="m17.13086,5.73438L11.38086,1.26172c-.8125-.63086-1.94922-.63184-2.76172.00098L2.86914,5.73438h-.00098c-.54395.42285-.86816,1.08691-.86816,1.77637v8.23926c0,1.24023,1.00977,2.25,2.25,2.25h11.5c1.24023,0,2.25-1.00977,2.25-2.25V7.51074c0-.68945-.32422-1.35352-.86914-1.77637Zm-5.63086,10.76562h-3v-4.75c0-.41309.33691-.75.75-.75h1.5c.41309,0,.75.33691.75.75v4.75Zm5-.75c0,.41309-.33691.75-.75.75h-2.75v-4.75c0-1.24023-1.00977-2.25-2.25-2.25h-1.5c-1.24023,0-2.25,1.00977-2.25,2.25v4.75h-2.75c-.41309,0-.75-.33691-.75-.75V7.51074c0-.22949.1084-.45117.28906-.59277l5.75-4.4707c.27246-.21191.65137-.20898.92188-.00098l5.74902,4.47168c.18164.1416.29004.36328.29004.59277v8.23926Z"
                fill="currentColor"
            />
        </svg>
    `;
};
