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

/**
 * Concrete implementation of the Swan abstract base class.
 * This component provides the rendering layer and styles, while
 * the core logic resides in Swan's abstract class.
 *
 * @see swan/src/components/accordion/AccordionBase.ts for the abstract base implementation
 */

import {
    CSSResultArray,
    html,
    TemplateResult,
} from '@spectrum-web-components/base';

import { AccordionBase } from '@spectrum-web-components/swan/accordion/AccordionBase.js';
import styles from './accordion.css.js';

/**
 * @element sp-accordion
 * @slot - The sp-accordion-item children to display.
 */
export class Accordion extends AccordionBase {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override render(): TemplateResult {
        return html`
            <slot
                @slotchange=${this.handleSlotchange}
                @sp-accordion-item-toggle=${this.onToggle}
            ></slot>
        `;
    }
}
