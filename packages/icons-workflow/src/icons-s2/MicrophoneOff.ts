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
export const MicrophoneOffIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Microphone Off',
} = {}): string | TemplateResult => {
    return html`
        <svg
            data-name="strokes"
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
                d="m13.25,9.5c-.41406,0-.75-.33594-.75-.75v-3.75c0-1.37891-1.12158-2.5-2.5-2.5-.80615,0-1.56787.39746-2.03809,1.06152-.23926.33984-.70654.41797-1.04541.17969-.33789-.23926-.41846-.70703-.1792-1.04492.75098-1.0625,1.9707-1.69629,3.2627-1.69629,2.20557,0,4,1.79395,4,4v3.75c0,.41406-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <g>
                <path
                    d="m15.64307,12.17285c-.10791,0-.21729-.02344-.3208-.07227-.37451-.17773-.53369-.625-.35645-.99902.35449-.74707.53418-1.53906.53418-2.35156v-.68359c0-.41406.33594-.75.75-.75s.75.33594.75.75v.68359c0,1.03711-.22852,2.04395-.67871,2.99414-.12842.27051-.39746.42871-.67822.42871Z"
                    fill="currentColor"
                    stroke-width="0"
                />
                <g>
                    <path
                        d="m14,17.5h-3.26562v-1.66797c0-.04395-.01776-.08203-.02502-.12378.02271-.00244.04633-.00171.06897-.00415.41162-.0459.70801-.41602.6626-.82812-.0459-.41309-.41406-.71777-.82861-.66211-.20117.02246-.40479.03613-.6123.03613-3.03271,0-5.5-2.46777-5.5-5.5v-.68359c0-.41406-.33594-.75-.75-.75s-.75.33594-.75.75v.68359c0,3.60913,2.74646,6.58838,6.25909,6.95972-.00708.04126-.02472.07886-.02472.12231v1.66797h-3.23438c-.41406,0-.75.33594-.75.75s.33594.75.75.75h8c.41406,0,.75-.33594.75-.75s-.33594-.75-.75-.75Z"
                        fill="currentColor"
                        stroke-width="0"
                    />
                    <path
                        d="m18.78027,17.74121L2.28027,1.24121c-.29297-.29297-.76758-.29297-1.06055,0s-.29297.76758,0,1.06055l16.5,16.5c.14648.14648.33838.21973.53027.21973s.38379-.07324.53027-.21973c.29297-.29297.29297-.76758,0-1.06055Z"
                        fill="currentColor"
                        stroke-width="0"
                    />
                </g>
            </g>
        </svg>
    `;
};
