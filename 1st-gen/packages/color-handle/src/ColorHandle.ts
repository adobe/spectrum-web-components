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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/color-loupe/sp-color-loupe.js';
import opacityCheckerboardStyles from '@spectrum-web-components/opacity-checkerboard/src/is-opacity-checkerboard.css.js';
import styles from './color-handle.css.js';

/**
 * @element sp-color-handle
 */
export class ColorHandle extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [opacityCheckerboardStyles, styles];
    }

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: String })
    public color = 'rgba(255, 0, 0, 0.5)';

    private handlePointerdown(event: PointerEvent): void {
        if (event.pointerType === 'touch') {
            this.open = true;
        }
        this.setPointerCapture(event.pointerId);
    }

    private handlePointerup(event: PointerEvent): void {
        this.open = false;
        this.releasePointerCapture(event.pointerId);
    }

    protected override render(): TemplateResult {
        return html`
            <div class="inner" style="background-color: ${this.color}"></div>
            <sp-color-loupe
                color=${this.color}
                ?open=${this.open && !this.disabled}
            ></sp-color-loupe>
        `;
    }

    protected override firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.addEventListener('pointerdown', this.handlePointerdown);
        this.addEventListener('pointerup', this.handlePointerup);
        this.addEventListener('pointercancel', this.handlePointerup);
    }
}
