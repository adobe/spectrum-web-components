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
export const WarpIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Warp',
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
                d="m18.9502,5.9375c0-1.17188-.95312-2.125-2.125-2.125-.37646,0-.7251.10669-1.03198.27905-1.31836-.9397-3.36572-2.02905-5.79321-2.02905-2.43262,0-4.50073,1.09473-5.83203,2.03491-.30945-.17603-.66211-.28491-1.04297-.28491-1.17188,0-2.125.95312-2.125,2.125,0,1.05371.77271,1.92407,1.78027,2.09009l1.20703,6.00269c-.5979.37646-.99902,1.0376-.99902,1.79492,0,1.17188.95312,2.125,2.125,2.125s2.125-.95312,2.125-2.125c0-.10645-.01624-.20898-.03149-.31128.86475-.40381,1.88696-.76392,2.79321-.76392.92944,0,1.92358.36035,2.73816.74805-.01672.10742-.03308.21509-.03308.32715,0,1.17188.95312,2.125,2.125,2.125s2.125-.95312,2.125-2.125c0-.66455-.31287-1.25146-.79211-1.6416l1.06372-6.16162c.98022-.18848,1.72351-1.05005,1.72351-2.08447Zm-1.25,0c0,.48242-.39258.875-.875.875s-.875-.39258-.875-.875.39258-.875.875-.875.875.39258.875.875Zm-15.4502,0c0-.48242.39258-.875.875-.875s.875.39258.875.875-.39258.875-.875.875-.875-.39258-.875-.875Zm2.86328,10.7627c-.48242,0-.875-.39258-.875-.875s.39258-.875.875-.875.875.39258.875.875-.39258.875-.875.875Zm1.35266-2.50024c-.28442-.23706-.62732-.4021-1.00818-.46509l-1.20703-6.0022c.59814-.37646.99927-1.03784.99927-1.79517,0-.23633-.04785-.45972-.11926-.67212,1.15247-.7981,2.88708-1.70288,4.86926-1.70288,1.97241,0,3.68506.89624,4.82324,1.69092-.07422.21582-.12305.44336-.12305.68408,0,.77759.42432,1.45166,1.04907,1.82227l-1.02759,5.95142c-.46777.02417-.89197.19946-1.23218.47876-.9884-.47681-2.25977-.93994-3.4895-.93994-1.2395,0-2.53052.46997-3.53406.94995Zm8.36414,2.50024c-.48242,0-.875-.39258-.875-.875s.39258-.875.875-.875.875.39258.875.875-.39258.875-.875.875Z"
                fill="currentColor"
            />
        </svg>
    `;
};
