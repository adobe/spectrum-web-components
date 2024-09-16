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
export const TextKerningIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Text Kerning',
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
                d="m19.08984,12.53711l-3.5-8.16602c-.23633-.55078-1.14258-.55078-1.37891,0l-3.5,8.16602c-.16309.38086.01367.82227.39355.98535.38086.16016.82227-.0127.98535-.39355l1.11792-2.6084h3.38525l1.11792,2.6084c.12207.28418.39844.4541.68945.4541.09863,0,.19922-.01953.2959-.06055.37988-.16309.55664-.60449.39355-.98535Zm-5.23926-3.5166l1.0498-2.44922,1.0498,2.44922h-2.09961Z"
                fill="currentColor"
            />
            <path
                d="m5.09961,13.58301c-.2998,0-.57129-.17871-.68945-.4541L.91016,4.96289c-.16309-.38086.01367-.82227.39355-.98535.38184-.16211.82227.0127.98535.39355l2.81055,6.55762,2.81055-6.55762c.16309-.38086.60254-.55664.98535-.39355.37988.16309.55664.60449.39355.98535l-3.5,8.16602c-.11816.27539-.38965.4541-.68945.4541Z"
                fill="currentColor"
            />
            <path
                d="m18.25,16h-5.43945l.46973-.46973c.29297-.29297.29297-.76758,0-1.06055s-.76758-.29297-1.06055,0l-1.75,1.75c-.29297.29297-.29297.76758,0,1.06055l1.75,1.75c.14648.14648.33789.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055l-.46973-.46973h5.43945c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                fill="currentColor"
            />
            <path
                data-name="Path 1029747"
                d="m13.55864,2.10556c-.15826.38279-.59687.5648-.97965.40655s-.5648-.59687-.40655-.97965.59687-.5648.97965-.40655.5648.59687.40655.97965"
                fill="currentColor"
            />
            <path
                data-name="Path 1029749"
                d="m12.41242,4.87796c-.15826.38279-.59687.5648-.97965.40655s-.5648-.59687-.40655-.97965.59687-.5648.97965-.40655.5648.59687.40655.97965"
                fill="currentColor"
            />
            <path
                data-name="Path 1029751"
                d="m11.26621,7.65036c-.15826.38279-.59687.5648-.97965.40655s-.5648-.59687-.40655-.97965.59687-.5648.97965-.40655.5648.59687.40655.97965"
                fill="currentColor"
            />
            <path
                data-name="Path 1029753"
                d="m10.11999,10.42275c-.15826.38279-.59687.5648-.97965.40655s-.5648-.59687-.40655-.97965.59687-.5648.97965-.40655.5648.59687.40655.97965"
                fill="currentColor"
            />
            <path
                data-name="Path 1029755"
                d="m8.97377,13.19515c-.15826.38279-.59687.5648-.97965.40655s-.5648-.59687-.40655-.97965.59687-.5648.97965-.40655.5648.59687.40655.97965"
                fill="currentColor"
            />
            <path
                data-name="Path 1029756"
                d="m7.82756,15.96755c-.15826.38279-.59687.5648-.97965.40655s-.5648-.59687-.40655-.97965.59687-.5648.97965-.40655.5648.59687.40655.97965"
                fill="currentColor"
            />
        </svg>
    `;
};
