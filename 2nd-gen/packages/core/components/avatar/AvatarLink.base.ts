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
import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { AvatarBase } from './Avatar.base.js';

/**
 * Base class for the linked avatar component.
 *
 * Extends `AvatarBase` with link-specific properties (href, target, rel,
 * download, disabled) and additional accessibility validation for the linked
 * context.
 *
 * @attribute {string} href - The URL the avatar links to.
 * @attribute {string} target - Where to open the linked document.
 * @attribute {string} rel - Relationship of the linked URL.
 * @attribute {string} download - Prompts the browser to download the linked URL.
 * @attribute {boolean} disabled - Disables the link, removing it from the tab order.
 *
 * @todo OQ-2/OQ-3: Link behavior and focus management are implemented inline
 * because LikeAnchor and Focusable mixins from 1st-gen shared do not yet exist
 * in 2nd-gen core. If/when shared link and focus mixins are added to core, this
 * class should be refactored to use them.
 * See: CONTRIBUTOR-DOCS/03_project-planning/03_components/avatar/migration-plan.md
 */
export abstract class AvatarLinkBase extends AvatarBase {
  // ───────────────────
  //     LINK API
  // ───────────────────

  /**
   * The URL the avatar links to.
   */
  @property({ type: String })
  public href = '';

  /**
   * Specifies where to open the linked document. Maps to the `target`
   * attribute of the underlying `<a>` element.
   */
  @property({ type: String })
  public target?: '_blank' | '_parent' | '_self' | '_top' | string;

  /**
   * The relationship of the linked URL. Maps to the `rel` attribute of the
   * underlying `<a>` element.
   */
  @property({ type: String })
  public rel?: string;

  /**
   * Prompts the browser to download the linked URL instead of navigating to
   * it. Maps to the `download` attribute of the underlying `<a>` element.
   */
  @property({ type: String })
  public download?: string;

  /**
   * Disables the avatar link, preventing navigation and removing it from the
   * tab order. When disabled, the component renders as a static image with no
   * `<a>` element.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (
      changes.has('label') ||
      changes.has('isDecorative') ||
      changes.has('href')
    ) {
      this.warnMissingLabel();
    }
  }

  /**
   * Extends the base label warning with an additional check for the invalid
   * combination of `is-decorative` + `href` without a `label`.
   */
  protected override warnMissingLabel(): void {
    super.warnMissingLabel();

    if (!window.__swc?.DEBUG) {
      return;
    }

    if (this.isDecorative && this.href && !this.label) {
      window.__swc.warn(
        this,
        `<${this.localName}> used as a link with "is-decorative" must also have a "label" for screen readers — the link would otherwise have no accessible name.`,
        'https://opensource.adobe.com/spectrum-web-components/components/avatar-link/#accessibility',
        { type: 'accessibility' }
      );
    }
  }
}
