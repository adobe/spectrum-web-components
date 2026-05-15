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

import { CSSResultArray } from 'lit';

import { AccordionBase } from '@spectrum-web-components/core/components/accordion';

import styles from './accordion.css';

/**
 * An accordion component that groups expandable content sections.
 *
 * @element swc-accordion
 * @since 2.0.0
 *
 * @example
 * <swc-accordion density="regular">
 *   <swc-accordion-item>
 *     <span slot="label">Section heading</span>
 *     Panel content goes here.
 *   </swc-accordion-item>
 * </swc-accordion>
 */
export class Accordion extends AccordionBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }
}
