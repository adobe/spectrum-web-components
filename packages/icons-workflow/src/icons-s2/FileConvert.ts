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
export const FileConvertIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'File Convert',
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
                d="m12.28027,12.53023l-1.75,1.75c-.14648.14648-.33838.21973-.53027.21973s-.38379-.07324-.53027-.21973l-1.75-1.75c-.29297-.29297-.29297-.76758,0-1.06055s.76758-.29297,1.06055,0l.42114.42114c-.03412-1.01489-.50116-1.99365-1.32837-2.64331-1.51855-1.19287-3.72217-.92627-4.91406.59082-.31494.40137-.53467.85449-.65186,1.34619-.0957.40283-.50244.65186-.90381.55518-.40283-.09619-.65137-.50098-.55518-.90381.16797-.70312.48096-1.35059.93115-1.92383,1.70166-2.16895,4.85156-2.54688,7.02051-.84424,1.21918.95776,1.89832,2.41553,1.9068,3.91504l.51312-.51318c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055Zm4.71973-5.65918v8.87891c0,1.24072-1.00928,2.25-2.25,2.25H5.25c-1.24072,0-2.25-1.00928-2.25-2.25v-2c0-.41406.33594-.75.75-.75s.75.33594.75.75v2c0,.41357.33643.75.75.75h9.5c.41357,0,.75-.33643.75-.75v-7.75h-3.25c-1.24072,0-2.25-1.00928-2.25-2.25v-3.25h-4.75c-.41357,0-.75.33643-.75.75v1.5c0,.41406-.33594.75-.75.75s-.75-.33594-.75-.75v-1.5c0-1.24072,1.00928-2.25,2.25-2.25h5.87891c.6001,0,1.16455.23389,1.58984.6582l3.62256,3.62256c.4248.42578.65869.99023.65869,1.59033Zm-4.75-.37109h3.13623c-.03217-.0553-.06036-.1134-.10596-.15918l-3.62158-3.62158c-.04553-.04541-.10352-.07349-.15869-.10547v3.13623c0,.41357.33643.75.75.75Z"
                fill="currentColor"
            />
        </svg>
    `;
};
