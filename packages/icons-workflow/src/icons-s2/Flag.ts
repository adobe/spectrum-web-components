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
export const FlagIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Flag',
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
                d="m17.68945,2.67773c-.19482-.14062-.44629-.18066-.67432-.10449l-.5874.19434c-1.0957.30566-2.25.28516-3.33643-.06641l-2.72754-.87988c-1.20947-.38965-2.50342-.45898-3.74072-.19531l-2.12305.44922v-.3252c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v16.5c0,.41406.33594.75.75.75s.75-.33594.75-.75v-4.61719l2.43311-.51562c.9834-.20605,2.01025-.1543,2.96973.15625l2.72803.88086c.72559.2334,1.47461.35156,2.22852.35156.66895,0,1.34229-.09277,2.00586-.28027l.61963-.2041c.30713-.10059.51514-.3877.51514-.71191V3.28516c0-.24023-.11523-.4668-.31055-.60742Zm-1.18945,10.08984l-.07275.02441c-1.09375.30859-2.24805.28516-3.33594-.06543l-2.72754-.88086c-1.20801-.38965-2.50098-.45605-3.74072-.19531l-2.12305.44971V3.60767l2.43359-.51489c.98193-.20801,2.00977-.15332,2.96924.15625l2.72754.87988c1.24951.4043,2.57178.46191,3.86963.16602v8.47266Z"
                fill="currentColor"
            />
        </svg>
    `;
};
