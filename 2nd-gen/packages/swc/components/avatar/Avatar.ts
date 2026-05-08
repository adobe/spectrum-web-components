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
 * A static avatar component that displays a circular user profile image.
 *
 * Provide `alt` with a description of the person or entity depicted.
 * Pass `alt=""` to treat the image as decorative and hide it from assistive
 * technology.
 *
 * @element swc-avatar
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
 *
 * @cssprop --swc-avatar-size - Size (inline and block) of the avatar.
 * @cssprop --swc-avatar-outline-color - Color of the avatar outline.
 * @cssprop --swc-avatar-outline-width - Width of the avatar outline.
 * @cssprop --swc-avatar-opacity-disabled - Opacity when the avatar is disabled.
 */
export class Avatar extends AvatarBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

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
