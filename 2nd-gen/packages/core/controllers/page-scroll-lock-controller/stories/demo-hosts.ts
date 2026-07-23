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

import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PageScrollLockController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-scroll-lock-host': DemoScrollLockHost;
  }
}

/**
 * @internal
 *
 * Storybook-only host pairing {@link PageScrollLockController} with a single
 * toggle button and a tall filler area so the effect on the document's
 * scrollbar is observable in the Canvas iframe. `PageScrollLockController` has
 * no host interface requirement, so a plain `LitElement` is enough here.
 */
@customElement('demo-scroll-lock-host')
export class DemoScrollLockHost extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    button {
      font: inherit;
      padding: 6px 16px;
      border: 1px solid rgb(0 0 0 / 20%);
      border-radius: 16px;
      cursor: pointer;
    }
  `;

  /** Whether this host currently holds a page scroll lock. */
  @property({ type: Boolean, reflect: true })
  public locked = false;

  private readonly _scrollLock = new PageScrollLockController(this);

  private readonly _onToggle = (): void => {
    this.locked = !this.locked;
    if (this.locked) {
      this._scrollLock.lock();
    } else {
      this._scrollLock.unlock();
    }
  };

  protected override render(): TemplateResult {
    return html`
      <button type="button" @click=${this._onToggle}>
        ${this.locked ? 'Unlock page scroll' : 'Lock page scroll'}
      </button>
    `;
  }
}

/** Tall filler so the lock's effect on the scrollbar is visible. */
export const scrollFiller: TemplateResult = html`
  <div style="block-size: 1200px;"></div>
`;
