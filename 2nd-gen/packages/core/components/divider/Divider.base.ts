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

import type { PropertyValues } from 'lit';

import { property } from 'lit/decorators.js';

import {
    SizedMixin,
    SpectrumElement,
} from '@spectrum-web-components/core/shared/base/index.js';

import {
    DIVIDER_STATIC_COLORS,
    DIVIDER_VALID_SIZES,
    type DividerStaticColor,
} from './Divider.types.js';

/**
 * @element swc-divider
 */
export abstract class DividerBase extends SizedMixin(SpectrumElement, {
    validSizes: DIVIDER_VALID_SIZES,
    noDefaultSize: true,
}) {
    /**
     * @internal
     *
     * A readonly array of the valid static color variants for the divider.
     */
    static readonly STATIC_COLORS: readonly string[] = DIVIDER_STATIC_COLORS;
    /**
     * Whether the divider is vertical. If false, the divider is horizontal. The default is false.
     */
    @property({ type: Boolean, reflect: true })
    public vertical = false;

    /**
     * The static color variant to use for the divider.
     *
     * @todo Add runtime validation separately. When implementing,
     * access STATIC_COLORS from this.constructor.STATIC_COLORS to ensure
     * correct values are used.
     */
    @property({ reflect: true, attribute: 'static-color' })
    public staticColor?: DividerStaticColor;

    protected override firstUpdated(changed: PropertyValues<this>): void {
        super.firstUpdated(changed);
        this.setAttribute('role', 'separator');
    }

    protected override updated(changed: PropertyValues<this>): void {
        super.updated(changed);
        if (changed.has('vertical')) {
            if (this.vertical) {
                this.setAttribute('aria-orientation', 'vertical');
            } else {
                this.removeAttribute('aria-orientation');
            }
        }
    }
}
