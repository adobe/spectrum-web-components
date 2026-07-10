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

import {
  CSSResultArray,
  html,
  PropertyValues,
  TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { normalizeDir } from '@spectrum-web-components/base/src/normalize-dir.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';

import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';

import styles from './breadcrumb-item.css.js';

export interface BreadcrumbSelectDetail {
  value: string;
}

// Walks up through `parentElement`, crossing shadow-root boundaries via
// `getRootNode().host` — needed because `Breadcrumbs.renderMenu()` places
// an "is-menu" `BreadcrumbItem` inside its own shadow root rather than as
// a light-DOM child, so a plain `parentElement` walk would stop there
// without ever reaching `<sp-breadcrumbs>` itself.
function* ancestorElements(start: Element): Generator<Element> {
  let node: Node = start;
  for (;;) {
    const parent = (node as Element).parentElement;
    if (parent) {
      yield parent;
      node = parent;
      continue;
    }
    const root = node.getRootNode();
    if (root instanceof ShadowRoot) {
      yield root.host;
      node = root.host;
      continue;
    }
    break;
  }
}

export class BreadcrumbItem extends LikeAnchor(Focusable) {
  public static override get styles(): CSSResultArray {
    return [styles, chevronStyles];
  }

  @property()
  public value: string | undefined = undefined;

  /**
   * @private
   * Marks this breadcrumb item as the current route.
   */
  @property({ type: Boolean })
  public isLastOfType = false;

  public override get focusElement(): HTMLElement {
    return this.shadowRoot.querySelector('#item-link') as HTMLElement;
  }

  // `renderLink()` and `renderSeparator()` bake this host's own `lang`/`dir`
  // and the ambient `direction` into explicit attributes at render time.
  // Neither `lang` nor `dir` is a reactive Lit property here, so — unlike
  // plain CSS inheritance — none of that updates on its own if this host's
  // own `lang`/`dir` change, or an ancestor's `dir` changes, after mount.
  // Watching this host (for `lang`/`dir`) and every ancestor (for `dir`)
  // keeps both cases live.
  private readonly ancestorDirObserver = new MutationObserver(() =>
    this.requestUpdate()
  );

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }

    this.ancestorDirObserver.observe(this, {
      attributes: true,
      attributeFilter: ['dir', 'lang'],
    });

    for (const ancestor of ancestorElements(this)) {
      this.ancestorDirObserver.observe(ancestor, {
        attributes: true,
        attributeFilter: ['dir'],
      });
    }
  }

  override disconnectedCallback(): void {
    this.ancestorDirObserver.disconnect();
    super.disconnectedCallback();
  }

  private announceSelected(value: string): void {
    const selectDetail: BreadcrumbSelectDetail = {
      value,
    };

    const selectionEvent = new CustomEvent('breadcrumb-select', {
      bubbles: true,
      composed: true,
      detail: selectDetail,
    });

    this.dispatchEvent(selectionEvent);
  }

  protected handleClick(event?: Event): void {
    if (!this.href && event) {
      event.preventDefault();
    }

    if (!this.href || event?.defaultPrevented) {
      if (this.value && !this.isLastOfType) {
        this.announceSelected(this.value);
      }
    }
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.handleClick(event);
    }
  }

  protected renderLink(): TemplateResult {
    // Forward `lang`/`dir` from the host onto the link so a single item's
    // language only affects its own text rendering, not the host's own
    // `direction` (which the separator mirrors via `:dir(rtl)`); see
    // `:host([dir]) { direction: inherit; }` in breadcrumb-item.css. Read the raw
    // `dir` attribute rather than `this.dir` — `SpectrumElement` overrides
    // the native `dir` getter to return the *computed* CSS direction, which
    // is exactly what `direction: inherit` decouples from the attribute.
    return html`
      <a
        id="item-link"
        href=${ifDefined(!this.isLastOfType ? this.href : undefined)}
        lang=${ifDefined(this.lang || undefined)}
        dir=${ifDefined(normalizeDir(this.getAttribute('dir')))}
        tabindex="0"
        aria-current=${ifDefined(this.isLastOfType ? 'page' : undefined)}
        @keydown=${this.handleKeyDown}
        @click=${this.handleClick}
      >
        <slot></slot>
      </a>
    `;
  }

  private renderSeparator(): TemplateResult {
    // `:dir()` resolves directionality by walking up the `dir` *attribute*
    // chain, independent of the CSS `direction` property — so it still
    // picks up this host's own `dir` (set for `#item-link`'s content, per
    // `renderLink()`) even though `:host([dir]) { direction: inherit; }` keeps the
    // host's own *computed* direction tied to the ambient context. Read that
    // computed value and set it explicitly here so `:dir()` on `#separator`
    // resolves from its own accurate attribute instead of the host's.
    const ambientDir = getComputedStyle(this).direction as 'ltr' | 'rtl';
    return html`
      <sp-icon-chevron100
        id="separator"
        size="xs"
        class="spectrum-UIIcon-ChevronRight100"
        dir=${ambientDir}
      ></sp-icon-chevron100>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderLink()}
      <slot name="menu"></slot>
      ${this.renderSeparator()}
    `;
  }

  protected override updated(changes: PropertyValues): void {
    if (changes.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }
}
