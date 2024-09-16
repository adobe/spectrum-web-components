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
export const ToggleIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Toggle',
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
                d="m14.98535,9H5.01465c-2.21387,0-4.01465-1.79395-4.01465-4S2.80078,1,5.01465,1h9.9707c2.21387,0,4.01465,1.79395,4.01465,4s-1.80078,4-4.01465,4ZM5.01465,2.5c-1.38672,0-2.51465,1.12109-2.51465,2.5s1.12793,2.5,2.51465,2.5h9.9707c1.38672,0,2.51465-1.12109,2.51465-2.5s-1.12793-2.5-2.51465-2.5H5.01465Z"
                fill="currentColor"
                opacity=".3"
            />
            <path
                d="m5,9c-2.20605,0-4-1.79395-4-4S2.79395,1,5,1s4,1.79395,4,4-1.79395,4-4,4Zm0-6.5c-1.37891,0-2.5,1.12109-2.5,2.5s1.12109,2.5,2.5,2.5,2.5-1.12109,2.5-2.5-1.12109-2.5-2.5-2.5Z"
                fill="currentColor"
            />
            <path
                d="m19,14c0-2.20605-1.80078-4-4.01465-4H5.01465c-2.21387,0-4.01465,1.79395-4.01465,4s1.80078,4,4.01465,4h9.69971c.07178.00391.13965.02148.2124.02148.5542,0,1.08203-.11389,1.5625-.31848,1.46973-.5946,2.51074-2.02747,2.51074-3.703Zm-4.01465,2.5h-.27124c-1.27808-.10986-2.28735-1.17236-2.28735-2.47852,0-1.37891,1.12109-2.5,2.5-2.5s2.5,1.12109,2.5,2.5c0,1.03137-.62744,1.91772-1.52075,2.29956-.28589.11243-.59497.17896-.92065.17896Zm-12.48535-2.5c0-1.37891,1.12793-2.5,2.51465-2.5h6.83252c-.56641.69019-.92041,1.56079-.92041,2.52148,0,.94067.33984,1.79492.88477,2.47852h-6.79688c-1.38672,0-2.51465-1.12109-2.51465-2.5Z"
                fill="currentColor"
            />
        </svg>
    `;
};
