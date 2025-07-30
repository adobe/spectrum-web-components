/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import styles from './color-loupe.css.js';
import opacityCheckerboardStyles from '@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js';

/**
 * @element sp-color-loupe
 */
export class ColorLoupe extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [opacityCheckerboardStyles, styles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String })
    public color = 'rgba(255, 0, 0, 0.5)';

    protected override render(): TemplateResult {
        return html`
            <div class="opacity-checkerboard loupe-clipped"></div>
            <div class="spectrum-ColorLoupe-inner-border loupe-clipped"></div>
            <div class="spectrum-ColorLoupe-outer-border loupe-clipped"></div>
            <svg
                aria-hidden="true"
                class="spectrum-ColorLoupe is-open"
                overflow="visible"
                style="--spectrum-picked-color: ${this
                    .color}; position: absolute;"
            >
                <defs>
                    <path
                        id="loupe-path"
                        d="M23 61.575C19.0044 57.435 15.2591 53.0606 11.784 48.475C8.68949 44.4532 5.96348 40.1608 3.639 35.65C1.224 30.8 0 26.549 0 23C0.00319993 17.6937 1.84059 12.5516 5.20091 8.44488C8.56122 4.33815 13.2378 1.51928 18.4385 0.465803C23.6392 -0.587678 29.0442 0.189006 33.7378 2.66428C38.4314 5.13955 42.125 9.16122 44.193 14.048C45.3915 16.88 46.0061 19.9248 46 23C46 26.551 44.774 30.811 42.355 35.661C40.0274 40.1747 37.298 44.4698 34.2 48.494C30.7297 53.0728 26.9898 57.4409 23 61.575ZZ"
                        transform="translate(2, 2)"
                    />
                    <mask id="loupe-mask">
                        <rect
                            x="0"
                            y="0"
                            height="100"
                            width="100"
                            fill="white"
                        />
                        <use xlink:href="#path" fill="black" />
                    </mask>
                </defs>

                <g class="spectrum-ColorLoupe-loupe">
                    <g>
                        <use
                            xlink:href="#loupe-path"
                            mask="url(#loupe-mask)"
                            transform="translate(2, 2)"
                            class="spectrum-ColorLoupe-inner-border"
                        />
                        <use
                            xlink:href="#loupe-path"
                            mask="url(#loupe-mask)"
                            class="spectrum-ColorLoupe-outer-border"
                        />
                    </g>
                </g>
            </svg>
        `;
    }
}
