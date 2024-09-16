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
export const AnimationIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Animation',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="ICONS"
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
                d="m1,13.5c0-3.03223,2.46729-5.5,5.5-5.5s5.5,2.46777,5.5,5.5-2.46729,5.5-5.5,5.5S1,16.53223,1,13.5Zm1.5,0c0,2.20605,1.79443,4,4,4s4-1.79395,4-4c0-2.20605-1.79443-4-4-4s-4,1.79395-4,4Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m14.09717,12.7207c.08203,0,.16504-.01367.24658-.04199,1.58887-.55273,2.65625-2.0498,2.65625-3.72461,0-2.18066-1.77393-3.9541-3.9541-3.9541-1.17969,0-2.29004.52637-3.04736,1.44434-.11523.14062-.17139.30957-.17139.47754,0,.21582.09326.43066.27295.5791.31982.26367.79248.21777,1.05566-.10156.47119-.57129,1.16016-.89941,1.89014-.89941,1.35303,0,2.4541,1.10059,2.4541,2.4541,0,1.03711-.66309,1.96484-1.64941,2.30859-.30957.10742-.50342.39746-.50342.70801-.00049.08105.01318.16504.0415.24707.10791.30957.39844.50293.7085.50293Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m17.88525,5.83203c.24121,0,.47803-.11621.62305-.33105.32031-.47754.48975-1.0332.48975-1.60937,0-1.5918-1.29541-2.8877-2.88721-2.8877-1.04736,0-2.01416.57617-2.52344,1.50488-.19922.3623-.06641.81836.29687,1.01758.36377.2002.81934.06738,1.01855-.29687.24561-.44727.7085-.72559,1.20801-.72559.76514,0,1.38721.62207,1.38721,1.3877,0,.27637-.08105.54395-.23486.77148-.23096.34375-.13965.81055.2041,1.04102.12842.08691.27393.12793.41797.12793Z"
                fill="currentColor"
                stroke-width="0"
            />
        </svg>
    `;
};
