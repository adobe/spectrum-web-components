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
import { query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { LinkBase } from '@spectrum-web-components/core/components/link';

import styles from './link.css';

/**
 * A link component that displays a text link with Spectrum styling.
 *
 * @element swc-link
 *
 * @slot - Link text content.
 *
 * @example
 * <swc-link href="#">Link text</swc-link>
 *
 * @example
 * <swc-link href="#" variant="secondary" quiet>Quiet secondary link</swc-link>
 */
export class Link extends LinkBase {
  @query('#anchor')
  private anchorElement!: HTMLAnchorElement;

  public override get focusElement(): HTMLElement {
    return this.anchorElement;
  }

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <a
        id="anchor"
        class=${classMap({
          ['swc-Link']: true,
          ['swc-Link--quiet']: this.quiet,
        })}
        href=${ifDefined(this.disabled ? undefined : this.href)}
        download=${ifDefined(this.download)}
        target=${ifDefined(this.target)}
        rel=${ifDefined(this.rel)}
        referrerpolicy=${ifDefined(this.referrerPolicy)}
        aria-label=${ifDefined(this.label)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        tabindex=${ifDefined(this.disabled ? -1 : undefined)}
        @click=${this._handleClick}
      >
        <slot></slot>
      </a>
    `;
  }

  private _handleClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
