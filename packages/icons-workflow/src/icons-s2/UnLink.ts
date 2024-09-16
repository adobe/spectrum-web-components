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
export const UnLinkIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Un Link',
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
                d="m13.5,17.77148c-.32031,0-.61621-.20605-.71582-.52734l-.82129-2.64258c-.12305-.39551.09766-.81641.49316-.93848.40039-.125.81641.09863.93848.49316l.82129,2.64258c.12305.39551-.09766.81641-.49316.93848-.07422.02344-.14941.03418-.22266.03418Z"
                fill="currentColor"
            />
            <path
                d="m17,14.27148c-.07422,0-.14941-.01074-.22363-.03418l-2.65723-.8291c-.39551-.12305-.61523-.54395-.49219-.93945.12207-.39551.54395-.62012.93945-.49219l2.65723.8291c.39551.12305.61523.54395.49219.93945-.09961.32031-.39648.52637-.71582.52637Z"
                fill="currentColor"
            />
            <path
                d="m7.31641,6.40527c-.32031,0-.61621-.20605-.7168-.52832l-.81641-2.63379c-.12207-.39551.09863-.81543.49512-.93848.39453-.12207.81445.09863.93848.49512l.81641,2.63379c.12207.39551-.09863.81543-.49512.93848-.07324.02246-.14844.0332-.22168.0332Z"
                fill="currentColor"
            />
            <path
                d="m5.63965,8.09082c-.07324,0-.14844-.01074-.22266-.03418l-2.63965-.81934c-.39551-.12207-.61621-.54297-.49316-.93848.12305-.39453.54004-.61523.93848-.49316l2.63965.81934c.39551.12207.61621.54297.49316.93848-.09961.32129-.39551.52734-.71582.52734Z"
                fill="currentColor"
            />
            <path
                d="m5.31348,18.76953c-1.04102,0-2.08105-.39648-2.87305-1.18848-1.58496-1.58398-1.58496-4.16309,0-5.74707l1.92676-1.92676c.29297-.29297.76758-.29297,1.06055,0s.29297.76758,0,1.06055l-1.92676,1.92676c-1,1-1,2.62598,0,3.62598,1.00098,1.00098,2.62695.99707,3.62598,0l1.95215-1.95312c.29199-.29199.7666-.29395,1.06055,0,.29297.29199.29297.76758,0,1.06055l-1.95215,1.95312c-.79199.79199-1.83301,1.1875-2.87402,1.18848Z"
                fill="currentColor"
            />
            <path
                d="m15.10059,10.35645c-.19238,0-.38379-.07324-.53027-.21973-.29297-.29297-.29297-.76758,0-1.06055l1.92773-1.92773c1-1,1-2.62695.00098-3.62598-.96875-.96875-2.65723-.96875-3.62598,0l-1.95215,1.95215c-.29297.29297-.76758.29297-1.06055,0s-.29297-.76758,0-1.06055l1.95215-1.95215c.76758-.76758,1.78809-1.19141,2.87402-1.19141,1.08496,0,2.10547.42383,2.87305,1.19141,1.58398,1.58398,1.58398,4.16211,0,5.74609l-1.92871,1.92871c-.14648.14648-.33789.21973-.53027.21973Z"
                fill="currentColor"
            />
        </svg>
    `;
};
