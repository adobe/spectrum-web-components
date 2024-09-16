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
export const DiscoverIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Discover',
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
                d="m10,18.75c-4.8252,0-8.75-3.9248-8.75-8.75S5.1748,1.25,10,1.25s8.75,3.9248,8.75,8.75-3.9248,8.75-8.75,8.75Zm0-16c-3.99805,0-7.25,3.25195-7.25,7.25s3.25195,7.25,7.25,7.25,7.25-3.25195,7.25-7.25-3.25195-7.25-7.25-7.25Z"
                fill="currentColor"
            />
            <path
                d="m14.29199,13.50098l-2.12109-5.30371c-.00098-.00244-.00317-.00391-.00415-.00635-.02417-.05835-.06274-.10852-.10339-.15723-.0116-.01392-.01794-.03247-.03064-.04517-.01978-.0199-.04797-.03064-.07056-.04785-.04272-.03235-.08386-.06677-.13306-.08716-.0022-.00098-.00354-.00293-.00586-.00391l-5.30273-2.12109c-.23242-.09375-.49707-.03906-.6748.1377-.17676.17676-.23047.44238-.1377.6748l2.12109,5.30371c.00073.00195.00305.00269.00391.00476.04138.10095.11487.18323.20398.25134.02258.01721.04333.03052.06787.04443.02527.01453.04407.03601.0719.04712l5.30273,2.12109c.0752.03027.1543.04492.23242.04492.16211,0,.32227-.06348.44238-.18262.17676-.17676.23047-.44238.1377-.6748Zm-5.4021-2.36938v-.00024l2.22034-2.22046,1.47961,3.70044-3.69995-1.47974Z"
                fill="currentColor"
            />
        </svg>
    `;
};
