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

import {
    CSSResultArray,
    html,
    nothing,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';
import popoverStyles from './popover.css.js';

/**
 * @element sp-popover
 *
 * @slot - content to display within the Popover
 */
export class Popover extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [popoverStyles];
    }

    /**
     * Whether the popover should manage the application
     * of padding to its content or not.
     */
    @property({ type: Boolean, reflect: true })
    public dialog = false;

    /**
     * Whether the popover is visible or not.
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    @property({ reflect: true })
    public placement: Placement | 'none' = 'none';

    @property({ type: Boolean, reflect: true })
    public tip = false;

    @query('#tip')
    public tipElement!: HTMLSpanElement;

    protected renderTip(): TemplateResult {
        return html`
            <div id="tip">
                <svg
                    xmlns="http://www.w3.org/svg/2000"
                    class="tip"
                    viewBox="0 0 24 12"
                >
                    <path
                        class="triangle"
                        d="M 0.7071067811865476 0 L 11.414213562373096 10.707106781186548 L 22.121320343559645 0"
                    ></path>
                </svg>
            </div>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
            ${this.tip ? this.renderTip() : nothing}
        `;
    }
}
