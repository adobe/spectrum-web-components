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
export const TextBaselineShiftIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Text Baseline Shift',
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
                d="m17.75,12h-6c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h6c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m9.375,15H1.625c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h7.75c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
            />
            <path
                d="m10.04688,11.00391L6.18945,2.00391c-.23633-.55078-1.14258-.55078-1.37891,0L.95312,11.00391c-.16309.38086.01367.82227.39355.98535.37988.16016.82129-.01367.98535-.39355l1.11255-2.5957h4.11084l1.11255,2.5957c.12207.28418.39844.4541.68945.4541.09863,0,.19922-.01953.2959-.06055.37988-.16309.55664-.60449.39355-.98535Zm-5.95947-3.50391l1.4126-3.2959,1.4126,3.2959h-2.8252Z"
                fill="currentColor"
            />
            <path
                d="m16.94238,15.30762l-1.75-1.75c-.24414-.24414-.64062-.24414-.88477,0l-1.75,1.75c-.24316.24414-.24316.64062,0,.88477.24414.24414.64062.24414.88477,0l.55762-.55811v2.61572c0,.41406.33594.75.75.75s.75-.33594.75-.75v-2.61572l.55762.55811c.12207.12207.28223.18262.44238.18262s.32031-.06055.44238-.18262c.24316-.24414.24316-.64062,0-.88477Z"
                fill="currentColor"
            />
            <path
                d="m14.75586,9.30566c-.96777,0-1.71484-.27539-2.22266-.82129-.71094-.76367-.63086-1.72852-.62012-1.83594.04102-.61426.32227-1.16211.81152-1.55762,1.00293-.80957,2.64355-.7793,3.37012-.7168-.04297-.57129-.18652-.84863-.58105-1.06445-.52832-.28711-1.19824-.27051-2.17969.05371-.39453.13086-.81836-.08398-.94824-.47559-.13086-.39355.08301-.81738.47559-.94824.875-.28906,2.1748-.59961,3.37207.05371,1.41992.77637,1.39551,2.10938,1.37305,3.39746l-.00684,2.7793c0,.28906-.16602.55273-.42773.67676-.08691.04199-.88965.40723-2.22559.45508-.06445.00293-.12793.00391-.19043.00391Zm.69141-3.45898c-.65234,0-1.39746.10059-1.78027.41113-.16406.13379-.24414.29395-.25977.52051-.00195.02148-.02832.42285.23145.69238.29004.30273.83887.35645,1.25391.33203.51562-.01855.92578-.09668,1.20703-.16992v-1.75195c-.19043-.02148-.41504-.03418-.65234-.03418Z"
                fill="currentColor"
            />
        </svg>
    `;
};
