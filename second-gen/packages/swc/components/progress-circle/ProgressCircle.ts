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

import { CSSResultArray, html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ProgressCircleBase } from '@swc/core/components/progress-circle';

import progressCircleStyles from './progress-circle.css';

/**
 * A progress circle component that visually represents the completion progress of a task.
 * Can be used in both determinate (with specific progress value) and indeterminate (loading) states.
 *
 * @element swc-progress-circle
 * @since 2.0.0
 * @status stable
 * @github https://github.com/adobe/spectrum-web-components/tree/main/second-gen/packages/swc/components/progress-circle
 * @figma https://spectrum.figma.com/file/progress-circle
 *
 * @slot - Optional content to display inside the progress circle (e.g., percentage text)
 *
 * @csspart track - The background track of the progress circle
 * @csspart fill - The filled portion of the progress circle
 *
 * @fires progress-change - Dispatched when the progress value changes
 *
 * @example
 * <swc-progress-circle progress="75" label="Loading progress"></swc-progress-circle>
 *
 * @example
 * <swc-progress-circle indeterminate label="Loading..."></swc-progress-circle>
 */
export class ProgressCircle extends ProgressCircleBase {
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
