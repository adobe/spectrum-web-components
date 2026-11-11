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
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import {
  ButtonBase,
  type ButtonSize,
} from '@adobe/spectrum-wc-core/components/button';
import { validateEnum } from '@adobe/spectrum-wc-core/utils';
import { Icon_AIChatConversation } from '@adobe/spectrum-wc-icons/AIChatConversation.js';
import { Icon_AIExpand } from '@adobe/spectrum-wc-icons/AIExpand.js';
import { Icon_AIFill } from '@adobe/spectrum-wc-icons/AIFill.js';
import { Icon_AIImage } from '@adobe/spectrum-wc-icons/AIImage.js';
import { Icon_AIImageGenerate } from '@adobe/spectrum-wc-icons/AIImageGenerate.js';
import { Icon_AILayer } from '@adobe/spectrum-wc-icons/AILayer.js';
import { Icon_AIMark } from '@adobe/spectrum-wc-icons/AIMark.js';
import { Icon_AISearch } from '@adobe/spectrum-wc-icons/AISearch.js';

import styles from './ai-button.css';

/** Docs URL attributed to dev-mode validation warnings. */
const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/patterns-ai-toolkit-ai-button--docs';

/**
 * The icons that `icon` accepts: the AI mark, which is the default, and 7 AI
 * workflow icons. Each name is its workflow icon's tag without `swc-icon-`.
 */
export const AI_BUTTON_ICONS = [
  'ai-mark',
  'ai-chat-conversation',
  'ai-expand',
  'ai-fill',
  'ai-image',
  'ai-image-generate',
  'ai-layer',
  'ai-search',
] as const;

export type AiButtonIcon = (typeof AI_BUTTON_ICONS)[number];

const ICON_SVGS: Record<AiButtonIcon, () => string> = {
  'ai-mark': Icon_AIMark,
  'ai-chat-conversation': Icon_AIChatConversation,
  'ai-expand': Icon_AIExpand,
  'ai-fill': Icon_AIFill,
  'ai-image': Icon_AIImage,
  'ai-image-generate': Icon_AIImageGenerate,
  'ai-layer': Icon_AILayer,
  'ai-search': Icon_AISearch,
};

/**
 * The sizes that `size` accepts. Given the intended use cases of the AI
 * button, there's no small size.
 */
export const AI_BUTTON_VALID_SIZES = [
  'm',
  'l',
  'xl',
] as const satisfies readonly ButtonSize[];

export type AiButtonSize = (typeof AI_BUTTON_VALID_SIZES)[number];

/**
 * A pill-shaped button that starts an AI action, such as "Ask AI". It shows
 * an AI icon before an optional label, on a glass surface with a gradient
 * glow that grows on hover. The icon is the AI mark unless `icon` names
 * another AI icon.
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
 * @attribute {AiButtonSize} size - The size of the button: `m`, `l`, or `xl`. Given the intended use cases of the AI button, there's no small size, and `s` renders as `m`.
 *
 * @slot - Visible button label. Leave empty for an icon-only button.
 *
 * @example
 * <swc-ai-button>Ask AI</swc-ai-button>
 *
 * @example
 * <swc-ai-button icon="ai-image-generate">Generate image</swc-ai-button>
 *
 * @example
 * <swc-ai-button accessible-label="Ask AI"></swc-ai-button>
 */
export class AiButton extends ButtonBase {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /** @internal */
  static override readonly VALID_SIZES: readonly AiButtonSize[] =
    AI_BUTTON_VALID_SIZES;

  /**
   * The size of the button: `m`, `l`, or `xl`. Given the intended use cases
   * of the AI button, there's no small size, and `s` renders as `m`.
   *
   * @default m
   */
  declare public size: AiButtonSize;

  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * The icon shown before the label: `ai-mark` (the AI mark),
   * `ai-chat-conversation`, `ai-expand`, `ai-fill`, `ai-image`,
   * `ai-image-generate`, `ai-layer`, or `ai-search`. An unknown name shows
   * the AI mark.
   */
  @property({ type: String, reflect: true })
  public icon: AiButtonIcon = 'ai-mark';

  /**
   * The icon always renders, so the button always has an icon for the shared
   * {@link ButtonBase} accessible-name check.
   *
   * @internal
   */
  protected override get hasIcon(): boolean {
    return true;
  }

  /** The SVG of the icon. Unknown or missing names show the AI mark. */
  private get _iconSvg(): string {
    const icon = (AI_BUTTON_ICONS as readonly string[]).includes(this.icon)
      ? this.icon
      : 'ai-mark';
    return ICON_SVGS[icon]();
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    // An element in the `icon` slot replaces the built-in icon. The slot is
    // public but undocumented on purpose, so that consumers use `icon`.
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
          <slot name="icon">${unsafeSVG(this._iconSvg)}</slot>
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
        valid: AI_BUTTON_ICONS,
        url: DOCS_URL,
      });
    }
  }
}
