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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ButtonBase } from '@adobe/spectrum-wc-core/components/button';
import { validateEnum } from '@adobe/spectrum-wc-core/utils';

import '../pixel-loader/swc-pixel-loader.js';

import {
  PIXEL_LOADER_ICON_NAMES,
  type PixelLoaderIconName,
} from '../pixel-loader/index.js';

import styles from './ai-button.css';

/** Docs URL attributed to dev-mode validation warnings. */
const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/patterns-ai-toolkit-ai-button--docs';

/**
 * A pill-shaped button that starts an AI action, such as "Ask AI". It shows a
 * pixel-art icon, drawn by a static `<swc-pixel-loader>`, before an optional
 * label, on a glass surface with a gradient glow that grows on hover. The
 * icon is the AI mark unless `icon` names another pixel loader icon.
 *
 * Without a label, the button is a circle that shows only the icon. Give
 * icon-only buttons an `accessible-label`.
 *
 * The AI button's appearance is fixed by design, so it has no public CSS
 * custom properties.
 *
 * @element swc-ai-button
 * @status preview
 * @since 2.0.0-beta.7
 *
 * @slot - Visible button label. Leave empty for an icon-only button.
 *
 * @example
 * <swc-ai-button>Ask AI</swc-ai-button>
 *
 * @example
 * <swc-ai-button icon="wand">Generate</swc-ai-button>
 *
 * @example
 * <swc-ai-button accessible-label="Ask AI"></swc-ai-button>
 */
export class AiButton extends ButtonBase {
  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * The pixel-art icon shown before the label, by name. Accepts any
   * `<swc-pixel-loader>` icon. An unknown name shows the AI mark.
   */
  @property({ type: String, reflect: true })
  public icon: PixelLoaderIconName = 'aiLogo';

  /**
   * The icon always renders, so the button always has an icon for the shared
   * {@link ButtonBase} accessible-name check.
   *
   * @internal
   */
  protected override get hasIcon(): boolean {
    return true;
  }

  /**
   * The icon passed to the pixel loader. Unknown or missing names fall back
   * to the AI mark here, so the loader never warns about a value it didn't
   * receive from the author.
   */
  private get _loaderIcon(): PixelLoaderIconName {
    return (PIXEL_LOADER_ICON_NAMES as readonly string[]).includes(this.icon)
      ? this.icon
      : 'aiLogo';
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <button
        class=${classMap({
          'swc-AiButton': true,
          'swc-AiButton--iconOnly': !this.hasLabel,
        })}
        type="button"
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-label=${ifDefined(this.accessibleLabel)}
      >
        <span class="swc-AiButton-glow"></span>
        <span class="swc-AiButton-surface"></span>
        <span class="swc-AiButton-icon" aria-hidden="true">
          <swc-pixel-loader icon=${this._loaderIcon} paused></swc-pixel-loader>
        </span>
        <span class="swc-AiButton-label">
          <slot @slotchange=${this.slotText.handleSlotChange}></slot>
        </span>
      </button>
    `;
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    // A removed attribute (`null`) or empty value means the default icon.
    if (changedProperties.has('icon') && this.icon) {
      validateEnum(this, {
        prop: 'icon',
        value: this.icon,
        valid: PIXEL_LOADER_ICON_NAMES,
        url: DOCS_URL,
      });
    }
  }
}
