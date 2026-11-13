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
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import {
  isDebug,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

import {
  SOURCE_LIST_DOCS_URL,
  SOURCE_LIST_ITEM_HEADING_LEVELS,
  SOURCE_LIST_VALID_SIZES,
  SOURCE_LIST_VERBOSITIES,
  type SourceListItemHeadingLevel,
  type SourceListVerbosity,
} from '../SourceList.types.js';

import styles from './source-list-item.css';

/**
 * Returns the hostname of an `http:` or `https:` URL without a leading
 * `www.`, or an empty string for any other URL.
 */
function hostnameOf(href: string): string {
  try {
    const url = new URL(href);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return '';
    }
    return url.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * One clickable source card in an `<swc-source-list>`: a thumbnail and source
 * name, a title link, and a quoted description. Clicking anywhere on the card
 * follows the link.
 *
 * The parent `<swc-source-list>` sets `size` and `verbosity` on every item, so
 * every item in a list renders the same way. The host gets
 * `role="listitem"`, because a custom element has no native role.
 *
 * @element swc-source-list-item
 * @since 2.0.0
 *
 * @slot link - An `<a href>` holding the title text. It's the card's only focusable element, and its hit area covers the card.
 * @slot description - The quoted snippet, such as a `<p>`. The item wraps it in a `<blockquote>`. Rendered only when `verbosity` is `verbose`.
 *
 * @cssprop --swc-source-list-item-background-color - Background color of the card.
 * @cssprop --swc-source-list-item-background-color-hover - Background color of the card on hover.
 *
 * @example
 * <swc-source-list-item source="Adobe.com" thumbnail-src="favicon.png">
 *   <a slot="link" href="https://www.adobe.com">How do we do in-line sources?</a>
 *   <p slot="description">In-line sources place citations directly next to statements.</p>
 * </swc-source-list-item>
 */
export class SourceListItem extends SizedMixin(SpectrumElement, {
  validSizes: SOURCE_LIST_VALID_SIZES,
}) {
  // ─────────────────────────
  //     API
  // ─────────────────────────

  /**
   * Source name shown beside the thumbnail, such as "Adobe.com". When unset,
   * the item shows the hostname of an `http:` or `https:` link, without a
   * leading `www.`.
   */
  @property({ type: String })
  public source = '';

  /**
   * URL of a favicon or logo for the source. Rendered as a decorative
   * thumbnail, because the source text already names the source.
   */
  @property({ type: String, attribute: 'thumbnail-src' })
  public thumbnailSrc = '';

  /**
   * Which parts the item renders. Set by the parent `<swc-source-list>`.
   * `regular` drops the description; `concise` also drops the thumbnail and
   * source.
   *
   * @default verbose
   */
  @property({ type: String, reflect: true })
  public verbosity: SourceListVerbosity = 'verbose';

  /**
   * Number shown in the ordered-list number box, mirroring `<li value>`.
   * Following items count up from it.
   */
  @property({ type: Number })
  public value?: number;

  /**
   * Exposes the title as a heading at this level (2–6). Leave it unset in
   * popovers and drawers, where per-source headings clutter the page outline.
   */
  @property({ type: Number, attribute: 'heading-level' })
  public headingLevel?: SourceListItemHeadingLevel;

  /**
   * @internal
   *
   * Whether the parent list is ordered. Set by `<swc-source-list>` to show the
   * number box.
   */
  @property({ type: Boolean, reflect: true })
  public ordered = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /** Resolved `href` of the slotted link, for the hostname and `cite`. */
  @state()
  private _linkHref = '';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    // `slotchange` never fires for a slot that stays empty, so the empty case
    // is checked once after the first render.
    const slot =
      this.renderRoot.querySelector<HTMLSlotElement>('slot[name="link"]');
    if (isDebug() && slot?.assignedElements({ flatten: true }).length === 0) {
      this._validateLink([]);
    }
  }

  protected override update(changes: PropertyValues): void {
    if (changes.has('verbosity')) {
      validateEnum(this, {
        prop: 'verbosity',
        value: this.verbosity,
        valid: SOURCE_LIST_VERBOSITIES,
        url: SOURCE_LIST_DOCS_URL,
      });
    }
    if (changes.has('headingLevel') && this.headingLevel !== undefined) {
      validateEnum(this, {
        prop: 'heading-level',
        value: String(this.headingLevel),
        valid: SOURCE_LIST_ITEM_HEADING_LEVELS.map(String),
        url: SOURCE_LIST_DOCS_URL,
      });
    }
    super.update(changes);
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('value')) {
      // Applied as a custom property so the host's `counter-set` can read it;
      // the HTML `value` attribute only works on `<li>`.
      if (this.value === undefined || Number.isNaN(this.value)) {
        this.style.removeProperty('--_swc-source-list-item-value');
      } else {
        this.style.setProperty(
          '--_swc-source-list-item-value',
          String(Math.trunc(this.value))
        );
      }
    }
    if (
      changes.has('source') ||
      changes.has('verbosity') ||
      changes.has('_linkHref')
    ) {
      warnIf(
        this,
        this.verbosity !== 'concise' &&
          this._linkHref !== '' &&
          !this._resolvedSource,
        `<${this.localName}> has no "source" and its link has no http or https hostname, so no source name is shown.`,
        SOURCE_LIST_DOCS_URL,
        { level: 'low', issues: ['source'] }
      );
    }
  }

  private get _validVerbosity(): SourceListVerbosity {
    return (SOURCE_LIST_VERBOSITIES as readonly string[]).includes(
      this.verbosity
    )
      ? this.verbosity
      : 'verbose';
  }

  private get _resolvedSource(): string {
    return this.source.trim() || hostnameOf(this._linkHref);
  }

  private get _headingLevel(): SourceListItemHeadingLevel | undefined {
    return (SOURCE_LIST_ITEM_HEADING_LEVELS as readonly number[]).includes(
      Number(this.headingLevel)
    )
      ? this.headingLevel
      : undefined;
  }

  private readonly _handleLinkSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    const assigned = slot.assignedElements({ flatten: true });
    const [first] = assigned;
    this._linkHref =
      first instanceof HTMLAnchorElement && first.hasAttribute('href')
        ? first.href
        : '';
    if (isDebug()) {
      this._validateLink(assigned);
    }
  };

  /**
   * Dev-mode checks that the `link` slot holds exactly one `<a href>` with
   * an accessible name. Nothing is patched when a check fails, so the
   * mistake stays visible.
   */
  private _validateLink(assigned: Element[]): void {
    const [first] = assigned;
    const anchor = first instanceof HTMLAnchorElement ? first : null;
    const hasName = Boolean(
      anchor?.textContent?.trim() ||
      anchor?.getAttribute('aria-label')?.trim() ||
      anchor?.hasAttribute('aria-labelledby')
    );
    warnIf(
      this,
      assigned.length === 0,
      `<${this.localName}> has no link. Slot an <a href> into the "link" slot.`,
      SOURCE_LIST_DOCS_URL,
      { level: 'high', issues: ['link'] }
    );
    warnIf(
      this,
      Boolean(first) && !anchor,
      `<${this.localName}> expects an <a href> in the "link" slot. Received <${first?.localName}>.`,
      SOURCE_LIST_DOCS_URL,
      { type: 'accessibility', level: 'high', issues: ['link'] }
    );
    warnIf(
      this,
      Boolean(anchor) && !anchor?.hasAttribute('href'),
      `<${this.localName}> has an <a> without "href" in the "link" slot, so it isn't focusable or announced as a link.`,
      SOURCE_LIST_DOCS_URL,
      { type: 'accessibility', level: 'high', issues: ['link href'] }
    );
    warnIf(
      this,
      Boolean(anchor) && !hasName,
      `<${this.localName}> has a link with no text, so it has no accessible name.`,
      SOURCE_LIST_DOCS_URL,
      { type: 'accessibility', level: 'high', issues: ['link text'] }
    );
    warnIf(
      this,
      assigned.length > 1,
      `<${this.localName}> has ${assigned.length} elements in the "link" slot. Only the first gets the full-card click.`,
      SOURCE_LIST_DOCS_URL,
      { level: 'medium', issues: ['link'] }
    );
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  private _renderLockup(): TemplateResult | typeof nothing {
    const source = this._resolvedSource;
    if (this._validVerbosity === 'concise' || (!source && !this.thumbnailSrc)) {
      return nothing;
    }
    return html`
      <div class="swc-SourceListItem-lockup">
        ${this.thumbnailSrc
          ? html`
              <swc-thumbnail
                class="swc-SourceListItem-thumbnail"
                size=${this.size === 's' ? '50' : '75'}
                decorative
              >
                <img src=${this.thumbnailSrc} alt="" />
              </swc-thumbnail>
            `
          : nothing}
        ${source
          ? html`
              <span class="swc-SourceListItem-source">${source}</span>
            `
          : nothing}
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const verbosity = this._validVerbosity;
    const headingLevel = this._headingLevel;
    return html`
      <div
        class=${classMap({
          'swc-SourceListItem': true,
          'swc-SourceListItem--ordered': this.ordered,
        })}
      >
        ${this.ordered
          ? html`
              <span class="swc-SourceListItem-marker" aria-hidden="true"></span>
            `
          : nothing}
        <div class="swc-SourceListItem-body">
          ${this._renderLockup()}
          <div class="swc-SourceListItem-content">
            <div
              class=${classMap({
                'swc-SourceListItem-title': true,
                'swc-Title': true,
                'swc-Title--sizeS': this.size === 's',
                'swc-Title--sizeM': this.size !== 's',
              })}
              role=${ifDefined(headingLevel ? 'heading' : undefined)}
              aria-level=${ifDefined(headingLevel)}
            >
              <slot
                name="link"
                @slotchange=${this._handleLinkSlotChange}
              ></slot>
            </div>
            ${verbosity === 'verbose'
              ? html`
                  <blockquote
                    class="swc-SourceListItem-description"
                    cite=${ifDefined(this._linkHref || undefined)}
                  >
                    <slot name="description"></slot>
                  </blockquote>
                `
              : nothing}
          </div>
        </div>
      </div>
    `;
  }
}
