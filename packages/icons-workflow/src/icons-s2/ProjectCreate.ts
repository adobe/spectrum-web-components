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
export const ProjectCreateIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Project Create',
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
            <circle
                cx="16"
                cy="8"
                r=".75"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="M11.5,9.875c-.7583,0-1.375-.6167-1.375-1.375s.6167-1.375,1.375-1.375,1.375.6167,1.375,1.375-.6167,1.375-1.375,1.375ZM11.5,8.125c-.20654,0-.375.16846-.375.375s.16846.375.375.375.375-.16846.375-.375-.16846-.375-.375-.375Z"
                fill="currentColor"
            />
            <path
                d="M10.59473,1.396l-.32227-.27734c-.42139-.36377-.9707-.52295-1.54102-.45068-.54248.06885-1.04443.34277-1.41309.771L1.43945,8.25977c-.78223.90723-.729,2.23877.11768,2.96875l.32275.27832c.18323.15802.39087.27588.61328.35468-.30396.38367-.49316.86206-.49316,1.38849v3c0,1.5166,1.23389,2.75,2.75,2.75h4.7251c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-4.7251c-.68945,0-1.25-.56055-1.25-1.25v-3c0-.41357.33643-.75.75-.75h5.12988c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75h-4.38513l5.71863-6.63428c.78174-.90723.729-2.23926-.11865-2.96973ZM9.57764,3.38623l-5.87939,6.8208c-.12695.14697-.29297.24072-.46729.2627-.08057.01074-.24268.01221-.37158-.09863l-.32275-.27832c-.2168-.18701-.19873-.57764.03857-.85352l5.87891-6.8208c.12695-.14697.29297-.24072.46729-.2627.02002-.00244.04492-.00488.07275-.00488.08643,0,.20166.02002.29932.104l.32227.27734c.2168.18701.19971.57812-.03809.854Z"
                fill="currentColor"
            />
            <path
                d="M8.52539,15.5c-.41406,0-.7627-.33594-.7627-.75s.32324-.75.7373-.75h.02539c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="M14.62744,5.94678c-.104,0-.20752-.02588-.30029-.07715-.14551-.07959-.25342-.21387-.2998-.37256l-.75635-2.59229c-.09668-.33154.09375-.67871.4248-.77539l2.5918-.75635c.3335-.09717.67871.09375.77539.4248l.75635,2.5918c.09668.33154-.09375.67871-.4248.77539l-2.5918.75684c-.05762.0166-.1167.0249-.17529.0249ZM14.646,3.1543l.40625,1.39209,1.39209-.40625-.40625-1.39209-1.39209.40625Z"
                fill="currentColor"
            />
            <path
                d="M15,10.52112c-2.48529,0-4.5,2.01471-4.5,4.5s2.01471,4.5,4.5,4.5,4.5-2.01471,4.5-4.5-2.01471-4.5-4.5-4.5ZM17.5,15.646h-1.875v1.875c0,.34521-.27979.625-.625.625s-.625-.27979-.625-.625v-1.875h-1.875c-.34521,0-.625-.27979-.625-.625s.27979-.625.625-.625h1.875v-1.875c0-.34521.27979-.625.625-.625s.625.27979.625.625v1.875h1.875c.34521,0,.625.27979.625.625s-.27979.625-.625.625Z"
                fill="currentColor"
            />
        </svg>
    `;
};
