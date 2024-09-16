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
export const EyedropperIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Eyedropper',
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
                d="m18.27051,2.16211c-.56152-.66895-1.33203-1.05762-2.16895-1.09473-.90137-.0127-1.81348.33496-2.50391,1.02539l-1.29883,1.29102c-.95312-.50098-2.16309-.35156-2.96387.44922l-.38477.38477c-.91919.91821-.96948,2.3689-.17383,3.3595l-3.8623,3.86316c-1.66602,1.66504-3.13379,3.13281-3.15918,3.15918-1.00488,1.00488-1.00488,2.64062,0,3.64551.50293.50293,1.16309.75391,1.82227.75391.66016,0,1.32031-.25098,1.82324-.75391l7.02026-7.01953c.46411.38159,1.02759.58398,1.59692.58398.64648,0,1.29395-.24609,1.78613-.73828l.38477-.38477c.79883-.79883.9502-2.00391.45312-2.95605l1.20801-1.1875.00488-.00488c1.28906-1.28906,1.46387-3.12988.41602-4.37598Zm-13.93066,15.02246c-.41895.41895-1.10352.4209-1.52441,0-.41992-.41992-.41992-1.10449.00391-1.52734.04883-.05078,1.50488-1.50586,3.15527-3.15625l3.84277-3.84375,1.52539,1.52539-7.00293,7.00195Zm12.45703-11.70996l-1.66406,1.63477c-.14258.14062-.22363.33203-.22461.53223-.00098.19922.07812.3916.21973.5332.40039.40039.40039,1.05078,0,1.45117l-.38477.38477c-.40039.40039-1.05078.40039-1.45117,0l-3.28125-3.28125c-.40039-.40039-.40039-1.05078,0-1.45117l.38477-.38477c.2002-.2002.46289-.2998.72559-.2998s.52539.09961.72559.2998c.29199.29297.7666.29297,1.05859.00195l1.75098-1.74023c.39453-.39551.88867-.61035,1.37988-.58887.41797.01855.79297.21191,1.08594.56055.63379.75391.27539,1.74414-.3252,2.34766Z"
                fill="currentColor"
            />
        </svg>
    `;
};
