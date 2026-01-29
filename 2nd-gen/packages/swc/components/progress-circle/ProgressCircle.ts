/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { CSSResultArray, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import {
    PROGRESS_CIRCLE_STATIC_COLORS_S2,
    ProgressCircleBase,
    type ProgressCircleStaticColorS2,
} from '@spectrum-web-components/core/components/progress-circle';
import { capitalize } from '@spectrum-web-components/core/shared/utilities';

import progressCircleStyles from './progress-circle.css';
/**
 * Progress circles show the progression of a system operation such as downloading, uploading, processing, etc. in a visual way.
 * They can represent determinate (with a specific progress value) or indeterminate (loading) progress.
 *
 * @element swc-progress-circle
 *
 * @prop {string} static-color - Static color variant for use on different backgrounds.
 * @prop {number} progress - Progress value between 0 and 100.
 * @prop {boolean} indeterminate - Indeterminate state for loading.
 * @prop {string} size - Size of the component.
 * @prop {string} label - Label for the component.
 *
 * @example
 * <swc-progress-circle progress="75" label="Loading progress"></swc-progress-circle>
 *
 * @example
 * <swc-progress-circle indeterminate label="Loading..."></swc-progress-circle>
 */
export class ProgressCircle extends ProgressCircleBase {
    // ────────────────────
    //     API OVERRIDES
    // ────────────────────

    /**
     * @internal
     */
    static override readonly STATIC_COLORS = PROGRESS_CIRCLE_STATIC_COLORS_S2;

    /**
     * Static color variant for use on different backgrounds.
     *
     * When set to 'white', the component uses white styling for images with a dark tinted background.
     *
     * When set to 'black', the component uses black styling for images with a light tinted background.
     */
    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: ProgressCircleStaticColorS2;

    // ──────────────────────────────
    //     RENDERING & STYLING
    // ──────────────────────────────

    public static override get styles(): CSSResultArray {
        return [progressCircleStyles];
    }

    protected override render(): TemplateResult {
        const strokeWidth = this.size === 's' ? 2 : this.size === 'l' ? 6 : 4;
        // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
        const radius = `calc(50% - ${strokeWidth / 2}px)`;

        return html`
            <div
                class=${classMap({
                    ['swc-ProgressCircle']: true,
                    [`swc-ProgressCircle--indeterminate`]: this.indeterminate,
                    [`swc-ProgressCircle--static${capitalize(this.staticColor)}`]:
                        typeof this.staticColor !== 'undefined',
                    [`swc-ProgressCircle--size${this.size?.toUpperCase()}`]:
                        typeof this.size !== 'undefined',
                })}
            >
                <slot @slotchange=${this.handleSlotchange}></slot>
                <svg
                    fill="none"
                    width="100%"
                    height="100%"
                    class="swc-outerCircle"
                >
                    <circle
                        class="swc-innerCircle"
                        cx="50%"
                        cy="50%"
                        r=${`calc(50% - ${strokeWidth / 1}px)`}
                        stroke-width=${strokeWidth}
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        class="swc-ProgressCircle-track"
                        r=${radius}
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        r=${radius}
                        class="swc-ProgressCircle-fill"
                        pathLength="100"
                        stroke-dasharray="100 200"
                        stroke-dashoffset=${100 - this.progress}
                        stroke-linecap="round"
                    />
                </svg>
            </div>
        `;
    }
}
