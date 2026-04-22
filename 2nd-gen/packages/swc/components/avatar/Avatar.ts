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

import { AvatarBase } from '@spectrum-web-components/core/components/avatar';

import styles from './avatar.css';

/**
 * A circular profile image for identifying a person or entity.
 *
 * An avatar displays a circular profile image representing a person or entity.
 *
 * @element swc-avatar
 * @status preview
 * @since 0.0.1
 *
 * @example
 * <swc-avatar src="/path/to/image.jpg" alt="Jane Doe"></swc-avatar>
 *
 * @example
 * <swc-avatar src="/path/to/image.jpg" alt=""></swc-avatar>
 *
 * @example
 * <swc-avatar src="/path/to/image.jpg" alt="Jane Doe" outline></swc-avatar>
 */
export class Avatar extends AvatarBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Avatar">
        <img class="swc-Avatar-image" src=${this.src} alt=${this.alt ?? ''} />
      </div>
    `;
  }
}
