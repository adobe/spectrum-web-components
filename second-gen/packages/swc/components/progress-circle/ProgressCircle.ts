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
import { classMap } from 'lit/directives/class-map.js';

import { ProgressCircleBase } from '@swc/core/components/progress-circle';

// import { property } from '@spectrum-web-components/base/src/decorators.js';
import progressCircleStyles from './progress-circle.css';

function capitalize(str?: string): string {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * A progress circle component that visually represents the completion progress of a task.
 * Can be used in both determinate (with specific progress value) and indeterminate (loading) states.
 *
 * @element swc-progress-circle
 * @since 2.0.0
 * @status stable
 * @github https://github.com/adobe/spectrum-web-components/tree/main/second-gen/packages/swc/components/progress-circle
 * @figma https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2-%2F-Desktop?node-id=13061-181
 *
 * @fires progress-change - Dispatched when the progress value changes
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
    public static override get styles(): CSSResultArray {
        return [progressCircleStyles];
    }

    /**
     * Static color variant for use on different backgrounds.
     * When set to 'white', the component uses white styling for images with a dark tinted background.
     * When set to 'black', the component uses black styling for images with a light tinted background.
     */
    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: 'white' | 'black';

    protected override render(): TemplateResult {
        const strokeWidth = this.size === 's' ? 2 : this.size === 'l' ? 6 : 4;
        // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
        const radius = `calc(50% - ${strokeWidth / 2}px)`;

        return html`
            <div
                class=${classMap({
                    ['spectrum-ProgressCircle']: true,
                    [`spectrum-ProgressCircle--indeterminate`]:
                        this.indeterminate,
                    [`spectrum-ProgressCircle--static${capitalize(this.staticColor)}`]:
                        typeof this.staticColor !== 'undefined',
                    [`spectrum-ProgressCircle--size${this.size?.toUpperCase()}`]:
                        typeof this.size !== 'undefined',
                })}
            >
                <svg
                    fill="none"
                    width="100%"
                    height="100%"
                    class="spectrum-outerCircle"
                >
                    <circle
                        class="spectrum-innerCircle"
                        cx="50%"
                        cy="50%"
                        r=${`calc(50% - ${strokeWidth / 1}px)`}
                        stroke-width=${strokeWidth}
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        class="spectrum-ProgressCircle-track"
                        r=${radius}
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        r=${radius}
                        class="spectrum-ProgressCircle-fill"
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
