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
export const DeleteIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Delete',
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
                d="m8.24902,15.02148c-.40039,0-.7334-.31738-.74805-.7207l-.25-6.5c-.0166-.41406.30664-.7627.71973-.77832.01074-.00098.02051-.00098.03027-.00098.40039,0,.7334.31738.74805.7207l.25,6.5c.0166.41406-.30664.7627-.71973.77832-.01074.00098-.02051.00098-.03027.00098Z"
                fill="currentColor"
            />
            <path
                d="m11.75098,15.02148c-.00977,0-.01953,0-.03027-.00098-.41309-.01562-.73633-.36426-.71973-.77832l.25-6.5c.01465-.40332.34766-.7207.74805-.7207.00977,0,.01953,0,.03027.00098.41309.01562.73633.36426.71973.77832l-.25,6.5c-.01465.40332-.34766.7207-.74805.7207Z"
                fill="currentColor"
            />
            <path
                d="m17,4h-3.5v-.75c0-1.24023-1.00977-2.25-2.25-2.25h-2.5c-1.24023,0-2.25,1.00977-2.25,2.25v.75h-3.5c-.41406,0-.75.33594-.75.75s.33594.75.75.75h.52002l.42236,10.3418c.04785,1.20996,1.03613,2.1582,2.24805,2.1582h7.61914c1.21191,0,2.2002-.94824,2.24805-2.1582l.42236-10.3418h.52002c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Zm-9-.75c0-.41309.33691-.75.75-.75h2.5c.41309,0,.75.33691.75.75v.75h-4v-.75Zm6.55957,12.53125c-.0166.40332-.3457.71875-.75.71875h-7.61914c-.4043,0-.7334-.31543-.75-.71875l-.41968-10.28125h9.9585l-.41968,10.28125Z"
                fill="currentColor"
            />
        </svg>
    `;
};
