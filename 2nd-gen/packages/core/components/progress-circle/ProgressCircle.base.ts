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
import { PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';

import {
    SizedMixin,
    SpectrumElement,
} from '@spectrum-web-components/core/shared/base/index.js';
import { getLabelFromSlot } from '@spectrum-web-components/core/shared/get-label-from-slot.js';

import {
    PROGRESS_CIRCLE_VALID_SIZES,
    ProgressCircleStaticColor,
} from './ProgressCircle.types.js';

/**
 * A progress circle component that visually represents the completion progress of a task.
 * Can be used in both determinate (with specific progress value) and indeterminate (loading) states.
 *
 * @attribute {ElementSize} size - The size of the progress circle.
 *
 * @todo Why do we support both the slot and the label attribute? Should we deprecate the slot?
 *
 * @todo Figure out why our tool chain doesn't respect the line breaks in this slot description.
 *
 * @slot - Accessible label for the progress circle.
 *
 *   Used to provide context about what is loading or progressing.
 */
export abstract class ProgressCircleBase extends SizedMixin(SpectrumElement, {
    validSizes: PROGRESS_CIRCLE_VALID_SIZES,
}) {
    // ─────────────────────────
    //     API TO OVERRIDE
    // ─────────────────────────

    /**
     * @internal
     *
     * A readonly array of the valid static colors for the progress circle.
     *
     * This is an actual internal property, intended not for customer use
     * but for use in internal validation logic, stories, tests, etc.
     *
     * Because S1 and S2 support different static colors, the value of this
     * property must be set in each subclass.
     */
    static readonly STATIC_COLORS: readonly string[];

    /**
     * @internal
     *
     * Static color variant for use on different backgrounds.
     *
     * This is a public property, but its valid values vary between S1 and S2,
     * so the property (and its docs) need to be redefined in each subclass.
     *
     * The type declared here is a union of the valid values for S1 and S2,
     * and should be narrowed in each subclass.
     */
    @property({ type: String, reflect: true, attribute: 'static-color' })
    public staticColor?: ProgressCircleStaticColor;

    // ──────────────────
    //     SHARED API
    // ──────────────────

    /**
     * Whether the progress circle shows indeterminate progress (loading state).
     *
     * When true, displays an animated loading indicator instead of a specific progress value.
     */
    @property({ type: Boolean, reflect: true })
    public indeterminate = false;

    /**
     * Accessible label for the progress circle.
     *
     * Used to provide context about what is loading or progressing.
     */
    @property({ type: String })
    public label = '';

    /**
     * Progress value from 0 to 100.
     *
     * Only relevant when indeterminate is false.
     */
    @property({ type: Number })
    public progress = 0;

    // ──────────────────────
    //     IMPLEMENTATION
    // ──────────────────────

    /**
     * @internal
     */
    @query('slot')
    private slotEl!: HTMLSlotElement;

    protected makeRotation(rotation: number): string | undefined {
        return this.indeterminate
            ? undefined
            : `transform: rotate(${rotation}deg);`;
    }

    protected handleSlotchange(): void {
        const labelFromSlot = getLabelFromSlot(this.label, this.slotEl);
        if (labelFromSlot) {
            this.label = labelFromSlot;
        }
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'progressbar');
        }
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (!this.indeterminate && changes.has('progress')) {
            this.setAttribute('aria-valuenow', '' + this.progress);
        } else if (this.hasAttribute('aria-valuenow')) {
            this.removeAttribute('aria-valuenow');
        }
        if (changes.has('label')) {
            if (this.label.length) {
                this.setAttribute('aria-label', this.label);
            } else if (
                changes.get('label') === this.getAttribute('aria-label')
            ) {
                this.removeAttribute('aria-label');
            }
        }

        const hasAccessibleName = (): boolean => {
            return Boolean(
                this.label ||
                    this.getAttribute('aria-label') ||
                    this.getAttribute('aria-labelledby') ||
                    this.slotEl.assignedNodes().length
            );
        };

        if (window.__swc.DEBUG) {
            if (
                !hasAccessibleName() &&
                this.getAttribute('role') === 'progressbar'
            ) {
                window.__swc?.warn(
                    this,
                    '<sp-progress-circle> elements need one of the following to be accessible:',
                    'https://opensource.adobe.com/spectrum-web-components/components/progress-circle/#accessibility',
                    {
                        type: 'accessibility',
                        issues: [
                            'value supplied to the "label" attribute, which will be displayed visually as part of the element, or',
                            'text content supplied directly to the <sp-progress-circle> element, or',
                            'value supplied to the "aria-label" attribute, which will only be provided to screen readers, or',
                            'an element ID reference supplied to the "aria-labelledby" attribute, which will be provided by screen readers and will need to be managed manually by the parent application.',
                        ],
                    }
                );
            }
        }
    }
}
