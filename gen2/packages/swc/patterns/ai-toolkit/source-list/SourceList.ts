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
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { SlotAttributePropagationController } from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import {
  isDebug,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import {
  SOURCE_LIST_DOCS_URL,
  SOURCE_LIST_TYPES,
  SOURCE_LIST_VALID_SIZES,
  SOURCE_LIST_VERBOSITIES,
  type SourceListType,
  type SourceListVerbosity,
} from './SourceList.types.js';

import styles from './source-list.css';

const ITEM_SELECTOR = 'swc-source-list-item';

/**
 * A list of the sources behind an AI response. Renders a native `<ol>` or
 * `<ul>` and passes `size` and `verbosity` to every `<swc-source-list-item>`,
 * so every item in the list renders the same way.
 *
 * The list doesn't manage focus, trap focus, or close on Escape: the popover,
 * drawer, or dialog it's placed in owns that behavior.
 *
 * @element swc-source-list
 * @since 2.0.0
 *
 * @slot - `<swc-source-list-item>` elements.
 * @slot heading - Optional visible heading that names the list. When it's empty, nothing renders.
 *
 * @cssprop --swc-source-list-gap - Space between items.
 *
 * @example
 * <swc-source-list accessible-label="Sources">
 *   <swc-source-list-item source="Adobe.com" thumbnail-src="favicon.png">
 *     <a slot="link" href="https://www.adobe.com">How do we do in-line sources?</a>
 *     <p slot="description">In-line sources place citations directly next to statements.</p>
 *   </swc-source-list-item>
 * </swc-source-list>
 */
export class SourceList extends SizedMixin(SpectrumElement, {
  validSizes: SOURCE_LIST_VALID_SIZES,
}) {
  // ─────────────────────────
  //     API
  // ─────────────────────────

  /**
   * Renders an ordered list (`<ol>`) with number boxes, or an unordered list
   * (`<ul>`). Use `unordered` only when no inline citation markers refer to
   * the list.
   *
   * @default ordered
   */
  @property({ type: String, reflect: true })
  public type: SourceListType = 'ordered';

  /**
   * First number of an ordered list, mirroring `<ol start>`.
   *
   * @default 1
   */
  @property({ type: Number })
  public start = 1;

  /**
   * Which parts every item renders: `verbose` shows the thumbnail and source,
   * title link, and description; `regular` drops the description; `concise`
   * shows only the title link.
   *
   * @default verbose
   */
  @property({ type: String, reflect: true })
  public verbosity: SourceListVerbosity = 'verbose';

  /**
   * Localized accessible name for the list, such as "Sources". Used when
   * there's no `heading` slot or `labelElement`. Inside a titled dialog or
   * drawer, the container's name is usually enough.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /**
   * An existing element, such as a visible heading elsewhere on the page,
   * that names the list. Ignored when the `heading` slot is used.
   */
  @property({ attribute: false })
  public labelElement: Element | null = null;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  @state()
  private _headingElement: Element | null = null;

  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    { attribute: 'size', getValue: () => this.size, selector: ITEM_SELECTOR }
  );

  private readonly _verbosityPropagation =
    new SlotAttributePropagationController(this, {
      attribute: 'verbosity',
      getValue: () => this._validVerbosity,
      selector: ITEM_SELECTOR,
    });

  private readonly _orderedPropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'ordered',
      getValue: () => (this._isOrdered ? '' : null),
      selector: ITEM_SELECTOR,
    }
  );

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private get _isOrdered(): boolean {
    return this.type !== 'unordered';
  }

  private get _validVerbosity(): SourceListVerbosity {
    return (SOURCE_LIST_VERBOSITIES as readonly string[]).includes(
      this.verbosity
    )
      ? this.verbosity
      : 'verbose';
  }

  protected override update(changes: PropertyValues): void {
    if (changes.has('type')) {
      validateEnum(this, {
        prop: 'type',
        value: this.type,
        valid: SOURCE_LIST_TYPES,
        url: SOURCE_LIST_DOCS_URL,
      });
    }
    if (changes.has('verbosity')) {
      validateEnum(this, {
        prop: 'verbosity',
        value: this.verbosity,
        valid: SOURCE_LIST_VERBOSITIES,
        url: SOURCE_LIST_DOCS_URL,
      });
    }
    super.update(changes);
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (
      changes.has('type') ||
      changes.has('labelElement') ||
      changes.has('_headingElement')
    ) {
      this._syncLabelledBy();
    }
  }

  /**
   * Names the list from the slotted heading or `labelElement` through ARIA
   * element reflection, which reaches from the shadow `<ol>` into the light
   * DOM. `accessible-label` is the fallback.
   */
  private _syncLabelledBy(): void {
    const list = this.renderRoot.querySelector<HTMLElement>(
      '.swc-SourceList-list'
    );
    if (!list || !('ariaLabelledByElements' in list)) {
      return;
    }
    const labelElement = this._headingElement ?? this.labelElement;
    list.ariaLabelledByElements = labelElement ? [labelElement] : null;
  }

  private get _ariaLabel(): string | undefined {
    if (this._headingElement || this.labelElement) {
      return undefined;
    }
    return this.accessibleLabel.trim() || undefined;
  }

  private readonly _handleHeadingSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    this._headingElement = slot.assignedElements({ flatten: true })[0] ?? null;
  };

  private readonly _handleItemSlotChange = (event: Event): void => {
    this._sizePropagation.propagate();
    this._verbosityPropagation.propagate();
    this._orderedPropagation.propagate();
    if (isDebug()) {
      const slot = event.target as HTMLSlotElement;
      const others = slot
        .assignedElements({ flatten: true })
        .filter((element) => element.localName !== ITEM_SELECTOR);
      warnIf(
        this,
        others.length > 0,
        `<${this.localName}> only supports <${ITEM_SELECTOR}> children. Found: ${others.map((element) => `<${element.localName}>`).join(', ')}.`,
        SOURCE_LIST_DOCS_URL,
        { type: 'accessibility', level: 'medium', issues: ['default slot'] }
      );
    }
  };

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  protected override render(): TemplateResult {
    const items = html`
      <slot @slotchange=${this._handleItemSlotChange}></slot>
    `;
    return html`
      <div class="swc-SourceList">
        <slot
          name="heading"
          @slotchange=${this._handleHeadingSlotChange}
        ></slot>
        ${this._isOrdered
          ? html`
              <ol
                class="swc-SourceList-list"
                start=${this.start}
                aria-label=${ifDefined(this._ariaLabel)}
              >
                ${items}
              </ol>
            `
          : html`
              <ul
                class="swc-SourceList-list"
                aria-label=${ifDefined(this._ariaLabel)}
              >
                ${items}
              </ul>
            `}
      </div>
    `;
  }
}
