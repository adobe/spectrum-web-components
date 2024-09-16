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
export const BellIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Bell',
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
                d="m17.78613,12.67578c-.16846-.30859-.34082-.60742-.51123-.90234-.82666-1.43457-1.54102-2.67285-1.54102-4.62012,0-3.11914-2.5376-5.65723-5.65723-5.65723s-5.65723,2.53809-5.65723,5.65723c0,1.7666-.75879,3.04883-1.56201,4.40527-.22021.37207-.44141.74609-.64941,1.13086-.37598.69629-.35693,1.52051.05078,2.2041.41211.69043,1.13672,1.10254,1.93848,1.10254h3.05225c0,1.5166,1.2334,2.75,2.75,2.75s2.75-1.2334,2.75-2.75h3.05518c.80322,0,1.52783-.41309,1.93896-1.10547.40771-.6875.42383-1.51562.04248-2.21484Zm-7.78662,4.57031c-.68945,0-1.25-.56055-1.25-1.25h2.5c0,.68945-.56055,1.25-1.25,1.25Zm6.4541-3.12109c-.06641.11133-.26221.37109-.64893.37109H4.19727c-.26855,0-.51172-.13867-.65039-.37109-.06445-.1084-.19531-.39551-.01855-.72266.19824-.36816.40967-.72461.61963-1.0791.87109-1.4707,1.77148-2.99219,1.77148-5.16992,0-2.25391,1.90381-4.15723,4.15723-4.15723s4.15723,1.90332,4.15723,4.15723c0,2.34863.88525,3.88379,1.7417,5.36914.16455.28516.33057.57324.49365.87207.18066.33105.04932.62109-.01562.73047Z"
                fill="currentColor"
            />
        </svg>
    `;
};
