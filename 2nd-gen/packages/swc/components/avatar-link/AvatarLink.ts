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

import { AvatarLinkBase } from '@spectrum-web-components/core/components/avatar';

import styles from './avatar-link.css';

/**
 * A linked avatar component that renders a circular profile image as a navigable link.
 *
 * When `disabled`, the link is suppressed and the component renders as a static image.
 * For a non-interactive avatar, use `<swc-avatar>`.
 *
 * @element swc-avatar-link
 *
 * @example
 * <swc-avatar-link src="/path/to/image.jpg" href="/profile" label="Jane Doe"></swc-avatar-link>
 *
 * @example
 * <swc-avatar-link src="/path/to/image.jpg" href="/profile" label="Jane Doe" disabled></swc-avatar-link>
 */
export class AvatarLink extends AvatarLinkBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    const ariaHidden = this.isDecorative && !this.label ? 'true' : undefined;

    const image = html`
      <img
        class="swc-Avatar-image"
        src=${this.src}
        alt=${this.label}
        aria-hidden=${ifDefined(ariaHidden)}
      />
    `;

    if (this.href && !this.disabled) {
      return html`
        <div class="swc-Avatar">
          <a
            class="swc-Avatar-link"
            href=${this.href}
            target=${ifDefined(this.target)}
            rel=${ifDefined(this.rel)}
            download=${ifDefined(this.download)}
          >
            ${image}
          </a>
        </div>
      `;
    }

    return html`
      <div class="swc-Avatar">${image}</div>
    `;
  }
}
