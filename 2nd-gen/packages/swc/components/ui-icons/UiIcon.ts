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
import { property } from 'lit/decorators.js';

import { IconBase } from '@adobe/spectrum-wc-core/components/icon';

import { UI_ICONS, UiIconName } from './icon-set/index.js';
import { uiStepFor } from './ui-icons.types.js';

import styles from '../../stylesheets/_lit-styles/icon-base.css';

/**
 * An internal icon renderer for Spectrum UI icons (chevrons, checkmarks, arrows, and
 * other control internals). The `icon` attribute selects the icon-set, and the
 * element renders the optically-tuned step that matches its `size`. Extends
 * `IconBase` for size and host-owned accessibility. Not published for consumers;
 * used by other swc components.
 *
 * @element swc-ui-icon
 * @status internal
 * @since 2.0.0-beta.1
 *
 * @example
 * <swc-ui-icon icon="chevron" size="m" accessible-label="Expand"></swc-ui-icon>
 *
 * @cssprop --swc-icon-color - Color of the icon.
 * @cssprop --swc-icon-inline-size - Inline size of the icon box.
 * @cssprop --swc-icon-block-size - Block size of the icon box.
 */
export class UiIcon extends IconBase {
  /**
   * The logical UI icon to render, matching a key in the icon-set registry (for
   * example `chevron` or `corner-triangle`).
   */
  @property({ type: String })
  public icon!: UiIconName;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    const iconSet = UI_ICONS[this.icon];
    // Prefer the step for the current size; fall back to the nearest available.
    const art =
      iconSet?.[uiStepFor(this.size)] ??
      (iconSet ? Object.values(iconSet)[0] : undefined);
    return html`
      <span class="swc-Icon">${art}</span>
    `;
  }
}
