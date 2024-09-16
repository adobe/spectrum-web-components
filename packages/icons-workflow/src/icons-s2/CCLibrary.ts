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
export const CCLibraryIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'CCLibrary',
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
                d="m2.75,15c-.41406,0-.75-.33594-.75-.75V4.25c0-1.24023,1.00928-2.25,2.25-2.25h10c.41406,0,.75.33594.75.75s-.33594.75-.75.75H4.25c-.41357,0-.75.33691-.75.75v10c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m15.62988,5H7.37012c-1.30713,0-2.37012,1.06348-2.37012,2.37012v8.25977c0,1.30664,1.06299,2.37012,2.37012,2.37012h8.25977c1.30713,0,2.37012-1.06348,2.37012-2.37012V7.37012c0-1.30664-1.06299-2.37012-2.37012-2.37012Zm.87012,10.62988c0,.47949-.39014.87012-.87012.87012H7.37012c-.47998,0-.87012-.39062-.87012-.87012V7.37012c0-.47949.39014-.87012.87012-.87012h3.62988v4.13428c0,.35645.43085.53491.68286.28271l1.0343-1.03418c.15619-.15625.40948-.15625.56567,0l1.0343,1.03418c.25201.2522.68286.07373.68286-.28271v-4.13428h.62988c.47998,0,.87012.39062.87012.87012v8.25977Z"
                fill="currentColor"
            />
        </svg>
    `;
};
