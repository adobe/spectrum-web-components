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
export const LayersIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Layers',
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
                d="m10,13.5c-.43018,0-.85986-.12305-1.23535-.36914l-6.03564-3.96582c-.63525-.41699-1.01465-1.11914-1.01465-1.87891-.00049-.76074.37891-1.46387,1.01416-1.88184l6.03613-3.96582c.75-.49219,1.71973-.49219,2.4707,0l6.03564,3.96582c.63574.41797,1.01514,1.12109,1.01465,1.88184,0,.75977-.37939,1.46191-1.01465,1.87891l-6.03564,3.96582c-.375.24609-.80518.36914-1.23535.36914Zm-.41211-1.62305c.25.16406.57422.16406.82422,0l6.03564-3.96582c.21484-.14062.33789-.36914.33789-.62598s-.12305-.48535-.33838-.62695l-6.03516-3.96582c-.25-.16406-.57422-.16406-.82422,0l-6.03564,3.96582c-.21484.1416-.33789.37012-.33789.62695s.12305.48535.33789.62598l6.03564,3.96582Z"
                fill="currentColor"
            />
            <path
                d="m10,19c-.43018,0-.85986-.12305-1.23535-.36914l-6.03564-3.96582c-.57715-.37891-.94238-.99023-1.00098-1.6748-.05957-.69434.19678-1.36426.70312-1.83887.30225-.28223.77734-.2666,1.06006.03516.2832.30273.26758.77734-.03467,1.06055-.16895.15723-.25391.38184-.23389.61426.01123.13184.06885.37891.32959.5498l6.03564,3.96582c.25.16406.57422.16406.82422,0l6.03564-3.96582c.26074-.1709.31885-.41797.33008-.5498.02002-.23242-.06543-.45605-.23438-.61426-.30225-.2832-.31787-.75781-.03467-1.06055.2832-.30176.7583-.31738,1.06006-.03516.50684.47461.76318,1.14453.70361,1.83887-.05908.68555-.42432,1.2959-1.00146,1.6748l-6.03564,3.96582c-.375.24609-.80518.36914-1.23535.36914Z"
                fill="currentColor"
            />
        </svg>
    `;
};
