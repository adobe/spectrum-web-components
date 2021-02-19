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
import { svg, TemplateResult } from '@spectrum-web-components/base';

const hues = [...Array(360).keys()];

export const wheel = (appliedRadius = 80): TemplateResult => {
    const radius = Math.max(appliedRadius, 25);
    return svg`
        <svg class="wheel" viewBox="0 0 ${radius * 2} ${
        radius * 2
    }" aria-hidden="true">
            <defs>
                <mask id="mask">
                    <circle cx=${radius} cy=${radius} r=${radius} fill="white" />
                    <circle cx=${radius} cy=${radius} r=${
        radius - 24
    } fill="black" />
                </mask>
            </defs>
            <g class="segment" mask="url(#mask)">
                ${hues.map(
                    (hue: number) => svg`
                    <rect
                        width=${radius}
                        height=${radius / 40}
                        x=${radius}
                        y=${radius - 1}
                        fill="hsl(${hue}, 100%, 50%)"
                        transform="rotate(${hue} ${radius} ${radius})"
                    ></rect>
                `
                )}
            </g>
            <circle
                cx=${radius}
                cy=${radius}
                r=${radius - 0.5}
                class="outerCircle"
                mask="url(#mask)"
            />
            <circle cx=${radius} cy=${radius} r=${
        radius - 24
    } class="innerCircle" />
        </svg>
    `;
};
