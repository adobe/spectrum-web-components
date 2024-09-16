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
export const SelectIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Select',
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
                d="m6.28125,18.54694c-.29199,0-.58887-.05762-.87646-.17676-.85547-.35547-1.38721-1.15137-1.38721-2.07812l-.00391-12.4707c-.00049-.92773.53223-1.72461,1.38965-2.08008.85498-.35352,1.79639-.16699,2.45312.48926l8.8916,8.91406c.65479.65527.84082,1.59473.48584,2.4502-.35547.85547-1.15186,1.3877-2.07861,1.3877h-4.07861c-.19629,0-.38965.08008-.52979.21973l-2.69092,2.68262c-.43555.43457-.99658.66211-1.57471.66211Zm-.00391-15.47852c-.1377,0-.24951.03809-.30029.05957-.10889.04492-.46338.22754-.46338.69336l.00391,12.4707c0,.46484.354.64746.4624.69238.10791.04492.48682.16699.81689-.16211l2.69141-2.68262c.42529-.42383.98926-.65723,1.58838-.65723h4.07861c.46484,0,.64795-.35449.69287-.46289s.16602-.4873-.16162-.81543L6.79492,3.2901c-.17432-.17383-.3623-.22168-.51758-.22168Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
