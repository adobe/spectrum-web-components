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
export const LinkIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Link',
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
                d="m5.31348,18.74805c-1.04102,0-2.08105-.39648-2.87305-1.18848-1.58398-1.58398-1.58398-4.16211,0-5.74707l3.90527-3.90527c1.58496-1.58398,4.16211-1.58301,5.74707,0,.2168.21777.40723.45703.56641.70996.2207.35059.11523.81348-.23535,1.03418-.35254.22168-.81348.11426-1.03418-.23535-.10059-.16016-.22168-.31152-.35938-.44922-.99902-.99902-2.625-.99805-3.62402.00098l-3.90527,3.90527c-.99902,1-.99902,2.62695,0,3.62598,1.00098,1.00098,2.62695.99707,3.62598,0l1.95215-1.95215c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-1.95215,1.95215c-.79199.79199-1.83301,1.1875-2.87402,1.18848Zm8.34082-6.65527l3.90527-3.90527c1.58398-1.58496,1.58398-4.16309,0-5.74707s-4.16309-1.58398-5.74707,0l-1.95215,1.95215c-.29297.29297-.29297.76758,0,1.06055s.76758.29297,1.06055,0l1.95215-1.95215c.99902-.99805,2.625-1,3.62598,0,.99902.99902.99902,2.62598,0,3.62598l-3.90527,3.90527c-.99902.99902-2.625,1-3.62402.00098-.1377-.1377-.25879-.28906-.35938-.44922-.2207-.34961-.68164-.45703-1.03418-.23535-.35059.2207-.45605.68359-.23535,1.03418.15918.25293.34961.49219.56641.70996.79297.79199,1.83301,1.18848,2.87402,1.18848,1.04004,0,2.08105-.39648,2.87305-1.18848Z"
                fill="currentColor"
            />
        </svg>
    `;
};
