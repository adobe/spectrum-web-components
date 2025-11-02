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
    TemplateResult,
} from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import {
    PROGRESS_CIRCLE_STATIC_COLORS_S1,
    ProgressCircleBase,
    type ProgressCircleStaticColorS1,
} from '@spectrum-web-components/core/components/progress-circle';

import progressCircleStyles from './progress-circle.css.js';

/**
 * @element sp-progress-circle
 */
export class ProgressCircle extends ProgressCircleBase {
    // ────────────────────
    //     API OVERRIDES
    // ────────────────────

    /**
     * @internal
     */
    static override readonly STATIC_COLORS = PROGRESS_CIRCLE_STATIC_COLORS_S1;

    /**
     * Static color variant for use on different backgrounds.
     *
     * When set to 'white', the component uses white styling for images with a dark tinted background.
     */
    @property({ type: String, reflect: true, attribute: 'static-color' })
    public override staticColor?: ProgressCircleStaticColorS1;

    // ──────────────────────────────
    //     RENDERING & STYLING
    // ──────────────────────────────

    public static override get styles(): CSSResultArray {
        return [progressCircleStyles];
    }

    protected override render(): TemplateResult {
        const styles = [
            this.makeRotation(-180 + (180 / 50) * Math.min(this.progress, 50)),
            this.makeRotation(
                -180 + (180 / 50) * Math.max(this.progress - 50, 0)
            ),
        ];
        const masks = ['Mask1', 'Mask2'];
        return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
            <div class="track"></div>
            <div class="fills">
                ${masks.map(
                    (mask, index) => html`
                        <div class="fill${mask}">
                            <div
                                class="fillSub${mask}"
                                style=${ifDefined(styles[index])}
                            >
                                <div class="fill"></div>
                            </div>
                        </div>
                    `
                )}
            </div>
        `;
    }
}
