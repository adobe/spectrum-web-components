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

import { CSSResultArray, html, TemplateResult } from 'lit';

import { AccordionItemBase } from '@spectrum-web-components/core/components/accordion';

import styles from './accordion.css';

/**
 * An accordion item component that wraps a single expandable content section.
 *
 * @element swc-accordion-item
 * @since 2.0.0
 *
 * @example
 * <swc-accordion-item>Content</swc-accordion-item>
 */
export class AccordionItem extends AccordionItemBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html``;
  }
}
