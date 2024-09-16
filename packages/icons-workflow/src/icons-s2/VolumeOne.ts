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
export const VolumeOneIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Volume One',
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
                d="m13.00098,12.74707c-.2417,0-.47949-.11719-.62402-.33301-.22998-.34473-.1377-.81055.20703-1.04102.41113-.27441.6665-.80176.6665-1.37598s-.25537-1.10156-.6665-1.37598c-.34473-.23047-.43701-.69629-.20703-1.04102.23047-.34375.69727-.43555,1.04004-.20703.82275.5498,1.3335,1.55566,1.3335,2.62402s-.51074,2.07422-1.3335,2.62402c-.12793.08496-.27246.12598-.41602.12598Z"
                fill="currentColor"
            />
            <path
                d="m9.24805,18.33691c-.45459,0-.8999-.17773-1.23535-.51367l-2.60352-2.60352c-.13965-.13965-.33301-.21973-.53027-.21973h-1.62891c-1.24072,0-2.25-1.00977-2.25-2.25v-5.5c0-1.24023,1.00928-2.25,2.25-2.25h1.62891c.19727,0,.39062-.08008.53027-.21973l2.60352-2.60352c.50244-.50293,1.25-.65234,1.90723-.37891.65625.27148,1.08008.90625,1.08008,1.61621v13.17188c0,.70996-.42383,1.34473-1.08008,1.61621-.21826.09082-.4458.13477-.67188.13477ZM3.25,6.5c-.41357,0-.75.33691-.75.75v5.5c0,.41309.33643.75.75.75h1.62891c.59229,0,1.17188.24023,1.59082.65918l2.60352,2.60352c.10205.10156.21338.07812.27246.05371.05762-.02344.1543-.08496.1543-.23047V3.41406c0-.14551-.09668-.20703-.1543-.23047-.05908-.02539-.17041-.0498-.27246.05371l-2.60352,2.60352c-.41895.41895-.99854.65918-1.59082.65918h-1.62891Z"
                fill="currentColor"
            />
        </svg>
    `;
};
