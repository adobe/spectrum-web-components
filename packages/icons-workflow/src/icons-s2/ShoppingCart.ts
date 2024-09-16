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
export const ShoppingCartIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Shopping Cart',
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
                d="m17.18028,4.80859c-.42871-.51367-1.05811-.80859-1.72754-.80859H5.08659l-.14069-.86133c-.17822-1.09473-1.1123-1.88867-2.2207-1.88867h-1.72461c-.41406,0-.75.33594-.75.75s.33594.75.75.75h1.72461c.36963,0,.68066.26465.74023.62988l1.58936,9.73145c.17822,1.09473,1.1123,1.88867,2.2207,1.88867h8.72461c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75H7.27549c-.36963,0-.68066-.26465-.74023-.62988l-.30542-1.87012h8.76831c1.08789,0,2.01904-.77637,2.21387-1.84766l.45459-2.5c.11963-.6582-.05762-1.33008-.48633-1.84375Zm-.98926,1.57617l-.45459,2.49902c-.06494.35742-.37549.61621-.73828.61621H5.98484l-.65326-4h10.12115c.30566,0,.49219.16895.57617.26953s.2168.31445.16211.61523Zm-1.19082,12.86533c-.69036,0-1.25-.55964-1.25-1.25s.55964-1.25,1.25-1.25,1.25.55964,1.25,1.25-.55964,1.25-1.25,1.25Zm-7.99892,0c-.69036,0-1.25-.55964-1.25-1.25s.55964-1.25,1.25-1.25,1.25.55964,1.25,1.25-.55964,1.25-1.25,1.25Z"
                fill="currentColor"
            />
        </svg>
    `;
};
