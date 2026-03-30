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
import { ifDefined } from 'lit/directives/if-defined.js';

import { AvatarBase } from '@spectrum-web-components/core/components/avatar';

import styles from './avatar.css';

/**
 * A static avatar component that displays a circular user profile image.
 *
 * For a clickable avatar that navigates to a URL, use `<swc-avatar-link>`.
 *
 * @element swc-avatar
 *
 * @example
 * <swc-avatar src="/path/to/image.jpg" label="Jane Doe"></swc-avatar>
 *
 * @example
 * <swc-avatar src="/path/to/image.jpg" is-decorative></swc-avatar>
 */
export class Avatar extends AvatarBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    const ariaHidden = this.isDecorative && !this.label ? 'true' : undefined;

    return html`
      <div class="swc-Avatar">
        <img
          class="swc-Avatar-image"
          src=${this.src}
          alt=${this.label}
          aria-hidden=${ifDefined(ariaHidden)}
        />
      </div>
    `;
  }
}
