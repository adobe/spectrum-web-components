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
import { PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/shared/base/index.js';

/**
 * An icon renderer that displays either an external image or slotted SVG markup.
 *
 * @attribute {string} src - URL to an image file.
 * @attribute {string} label - Accessible label for the icon.
 */
export abstract class IconBase extends SpectrumElement {
    // ──────────────────
    //     SHARED API
    // ──────────────────

    /**
     * URL to an image or SVG file.
     */
    @property()
    public src?: string;

    /**
     * Accessible label for the icon.
     */
    @property()
    public label = '';

    @query('slot')
    private defaultSlot?: HTMLSlotElement;

    // ──────────────────────
    //     IMPLEMENTATION
    // ──────────────────────

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('label')) {
            if (this.label) {
                this.removeAttribute('aria-hidden');
            } else {
                this.setAttribute('aria-hidden', 'true');
            }
            this.updateSlottedIcon();
        }
    }

    protected handleSlotChange(): void {
        this.updateSlottedIcon();
    }

    private updateSlottedIcon(): void {
        const slot = this.defaultSlot;
        if (!slot) {
            return;
        }
        const [slotted] = slot.assignedElements({ flatten: true });
        if (!slotted) {
            return;
        }
        const svgElement =
            slotted instanceof SVGElement
                ? slotted
                : slotted.querySelector?.('svg');
        if (!svgElement) {
            return;
        }
        svgElement.setAttribute('role', 'img');
        if (this.label) {
            svgElement.setAttribute('aria-label', this.label);
            svgElement.removeAttribute('aria-hidden');
        } else {
            svgElement.setAttribute('aria-hidden', 'true');
            svgElement.removeAttribute('aria-label');
        }
    }
}
