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
  type CSSResultArray,
  html,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { keyed } from 'lit/directives/keyed.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  CardViewBase,
  type CardViewItem,
  type CardViewLayout,
  type CardViewModel,
  type CardViewNavigation,
  type CardViewPosition,
} from '@adobe/spectrum-wc-core/components/card-view/index.js';

import '../card/swc-card.js';

import styles from './card-view.css';

export class CardView extends CardViewBase {
  protected readonly model: CardViewModel = 'baseline';

  @property({ reflect: true })
  public variant = 'secondary';

  @property({ reflect: true })
  public density = 'regular';

  @state()
  private geometry: CardViewPosition[] = [];

  @state()
  private previewSizes: number[][] = [];

  @state()
  private contentHeights: number[] = [];

  @state()
  private collectionHeight = 0;

  private observer?: ResizeObserver;
  private frame = 0;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected get positions(): CardViewPosition[] {
    return this.geometry;
  }

  private get singleRow(): boolean {
    return this.model === 'single-row' || this.model === 'vertical';
  }

  protected get focusTargets(): HTMLElement[] {
    return [...this.renderRoot.querySelectorAll<HTMLElement>('[data-focus]')];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.observer = new ResizeObserver(() => this.scheduleLayout());
    this.observer.observe(this);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    const enabled = this.items.findIndex((item) => !item.disabled);
    if (
      !this.items[this.activeIndex] ||
      this.items[this.activeIndex]?.disabled
    ) {
      this.activeIndex = Math.max(0, enabled);
    }
    this.renderRoot
      .querySelectorAll('swc-card')
      .forEach((card) => this.observer?.observe(card));
    this.scheduleLayout();
  }

  private scheduleLayout(): void {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.measureLayout());
  }

  private measureLayout(): void {
    const hostStyle = getComputedStyle(this);
    const width =
      this.clientWidth -
      parseFloat(hostStyle.paddingInlineStart) -
      parseFloat(hostStyle.paddingInlineEnd);
    if (!width) {
      return;
    }
    const gap =
      this.density === 'compact' ? 12 : this.density === 'spacious' ? 24 : 16;
    const columns = Math.max(1, Math.floor((width + gap) / (224 + gap)));
    const cardWidth = (width - (columns - 1) * gap) / columns;
    const cards = [
      ...this.renderRoot.querySelectorAll<HTMLElement>('swc-card'),
    ];
    const heights = cards.map((card) => card.getBoundingClientRect().height);
    const previewSizes = cards.map((card) => {
      const bounds = card.querySelector('img')!.getBoundingClientRect();
      return [
        Math.max(1, Math.round(bounds.width)),
        Math.max(1, Math.round(bounds.height)),
      ];
    });
    if (JSON.stringify(previewSizes) !== JSON.stringify(this.previewSizes)) {
      this.previewSizes = previewSizes;
    }
    const rowHeight = Math.max(0, ...heights);
    const rtl = hostStyle.direction === 'rtl';
    const next: CardViewPosition[] = [];
    const contentHeights: number[] = [];
    if (this.layout === 'waterfall') {
      const columnBottoms = Array<number>(columns).fill(0);
      cards.forEach((_, index) => {
        const column = index % columns;
        const left = column * (cardWidth + gap);
        next.push({
          left: rtl ? width - left - cardWidth : left,
          top: columnBottoms[column],
          width: cardWidth,
          height: heights[index],
          column,
        });
        columnBottoms[column] += heights[index] + gap;
      });
    } else {
      let top = 0;
      for (let start = 0; start < cards.length; start += columns) {
        const row = cards.slice(start, start + columns);
        const ratios = row.map((_, offset) => {
          const ratio = this.items[start + offset].aspectRatio ?? 1;
          return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
        });
        const available = width - (row.length - 1) * gap;
        const justifiedHeight =
          available / ratios.reduce((sum, ratio) => sum + ratio, 0);
        const previewHeight =
          row.length === columns
            ? justifiedHeight
            : Math.min(justifiedHeight, cardWidth / 1.5);
        const contentHeight = Math.max(
          0,
          ...row.map(
            (card) =>
              card.shadowRoot?.querySelector<HTMLElement>(
                '.swc-CardBase-content'
              )?.scrollHeight ?? 0
          )
        );
        const height =
          this.layout === 'masonry'
            ? previewHeight +
              Math.max(
                0,
                ...row.map(
                  (card, offset) =>
                    heights[start + offset] -
                    card.querySelector('img')!.getBoundingClientRect().height
                )
              )
            : rowHeight;
        let left = 0;
        row.forEach((_, column) => {
          const itemWidth =
            this.layout === 'masonry'
              ? ratios[column] * previewHeight
              : cardWidth;
          contentHeights.push(contentHeight);
          next.push({
            left: rtl ? width - left - itemWidth : left,
            top,
            width: itemWidth,
            height,
            column,
          });
          left += itemWidth + gap;
        });
        top += height + gap;
      }
    }
    if (
      JSON.stringify(contentHeights) !== JSON.stringify(this.contentHeights)
    ) {
      this.contentHeights = contentHeights;
    }
    const height = Math.max(
      0,
      ...next.map((position) => position.top + position.height)
    );
    if (JSON.stringify(next) !== JSON.stringify(this.geometry)) {
      this.geometry = next;
    }
    if (height !== this.collectionHeight) {
      this.collectionHeight = height;
    }
  }

  private childTabIndex(index: number): number {
    if (this.moreInfoEnabled && !this.expandedInfo.has(this.items[index].id)) {
      return -1;
    }
    if (this.groupedControls) {
      return index === this.activeIndex && !this.items[index].disabled ? 0 : -1;
    }
    return !this.composite || index === this.activeIndex ? 0 : -1;
  }

  private handleSelection(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    this.select(Number(input.dataset.index), input.checked);
  }

  private handleAction(event: Event): void {
    const button = event.currentTarget as HTMLButtonElement;
    this.activate(
      Number(button.dataset.index),
      button.dataset.action as 'open' | 'share'
    );
  }

  private renderCard(item: CardViewItem, index: number): TemplateResult {
    const selected = this.selected.includes(item.id);
    const [width, height] = this.previewSizes[index] ?? [224, 149];
    const image = item.image.startsWith('https://picsum.photos/id/')
      ? `https://picsum.photos/id/${index + 1}/${height}/${width}`
      : item.image;
    return html`
      <swc-card
        variant=${this.variant}
        density=${this.density}
        style=${styleMap({
          '--swc-card-base-grid-template-rows':
            this.layout === 'masonry' &&
            this.contentHeights[index] !== undefined
              ? `auto minmax(${this.contentHeights[index]}px, auto) auto`
              : undefined,
        })}
        data-selected=${selected}
        aria-hidden=${ifDefined(
          this.moreInfoEnabled && !this.expandedInfo.has(item.id)
            ? 'true'
            : undefined
        )}
        aria-live=${ifDefined(this.moreInfoEnabled ? 'polite' : undefined)}
      >
        <img
          slot="preview"
          src=${image}
          alt=""
          style=${styleMap({
            aspectRatio: String(
              this.layout !== 'grid' ? (item.aspectRatio ?? 1) : 1.5
            ),
            objectFit: 'cover',
          })}
          @load=${this.scheduleLayout}
        />
        ${this.selectionMode !== 'none'
          ? html`
              <label slot="media" class="selection">
                <input
                  type="checkbox"
                  data-index=${index}
                  ?data-focus=${this.groupedControls}
                  aria-label=${`Select ${item.title}`}
                  .checked=${selected}
                  ?disabled=${item.disabled}
                  tabindex=${this.childTabIndex(index)}
                  @change=${this.handleSelection}
                />
              </label>
            `
          : ''}
        <button
          slot="title"
          type="button"
          class="title"
          data-index=${index}
          data-action="open"
          ?data-focus=${this.groupedControls}
          tabindex=${this.childTabIndex(index)}
          ?disabled=${item.disabled}
          @click=${this.handleAction}
        >
          ${item.title}
        </button>
        <span slot="description">${item.description}</span>
        <button
          slot="actions"
          type="button"
          class="share"
          data-index=${index}
          data-action="share"
          ?data-focus=${this.groupedControls}
          aria-label=${`Share ${item.title}`}
          tabindex=${this.childTabIndex(index)}
          ?disabled=${item.disabled}
          @click=${this.handleAction}
        >
          Share
        </button>
      </swc-card>
    `;
  }

  private renderItem(item: CardViewItem, index: number): TemplateResult {
    const position = this.geometry[index];
    const style = styleMap(
      position
        ? {
            position: 'absolute',
            left: `${position.left}px`,
            top: `${position.top}px`,
            width: `${position.width}px`,
          }
        : { position: 'relative', width: '100%' }
    );
    if (this.model === 'list') {
      return html`
        <li
          class="item"
          data-index=${index}
          data-focus
          tabindex=${!item.disabled && index === this.activeIndex ? 0 : -1}
          aria-label=${item.title}
          aria-disabled=${ifDefined(item.disabled ? 'true' : undefined)}
          style=${style}
          aria-posinset=${index + 1}
          aria-setsize=${this.items.length}
        >
          ${this.renderCard(item, index)}
        </li>
      `;
    }
    if (this.model === 'feed') {
      return html`
        <article
          class="item"
          data-index=${index}
          data-focus
          tabindex=${item.disabled ? -1 : 0}
          style=${style}
          aria-label=${item.title}
          aria-posinset=${index + 1}
          aria-setsize=${this.items.length}
        >
          ${this.renderCard(item, index)}
        </article>
      `;
    }
    if (this.groupedControls) {
      return html`
        <div
          class="item"
          role="group"
          aria-label=${item.title}
          data-index=${index}
          style=${style}
        >
          ${this.renderCard(item, index)}
        </div>
      `;
    }
    const label = `${index + 1} of ${this.items.length}, ${item.title}`;
    if (this.singleRow) {
      return html`
        <div
          class="item"
          data-focus
          data-index=${index}
          role="gridcell"
          aria-label=${label}
          aria-selected=${ifDefined(
            this.selectionMode === 'none'
              ? undefined
              : this.selected.includes(item.id)
                ? 'true'
                : 'false'
          )}
          aria-disabled=${ifDefined(item.disabled ? 'true' : undefined)}
          tabindex=${!item.disabled && index === this.activeIndex ? 0 : -1}
          style=${style}
        >
          ${this.moreInfoEnabled
            ? html`
                <div
                  id=${`more-info-${index}`}
                  class="more-info-hint"
                  aria-hidden=${this.focusedCellId === item.id
                    ? 'false'
                    : 'true'}
                >
                  tab for more info
                </div>
              `
            : ''}
          ${this.renderCard(item, index)}
        </div>
      `;
    }
    return html`
      <div
        class="item"
        data-index=${index}
        role="row"
        aria-selected=${ifDefined(
          this.selectionMode === 'none'
            ? undefined
            : String(this.selected.includes(item.id))
        )}
        style=${style}
      >
        <div
          data-focus
          data-index=${index}
          role="gridcell"
          aria-label=${label}
          aria-selected=${ifDefined(
            this.selectionMode === 'none'
              ? undefined
              : String(this.selected.includes(item.id))
          )}
          aria-disabled=${ifDefined(item.disabled ? 'true' : undefined)}
          tabindex=${!item.disabled && index === this.activeIndex ? 0 : -1}
        >
          ${this.renderCard(item, index)}
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const grid = this.composite && !this.groupedControls;
    const content = repeat(
      this.items,
      (item) => item.id,
      (item, index) => this.renderItem(item, index)
    );
    const height = styleMap({
      height: this.geometry.length ? `${this.collectionHeight}px` : 'auto',
    });
    return html`
      ${this.model === 'list'
        ? html`
            <ul
              class="collection"
              aria-label=${this.label}
              style=${height}
              @keydown=${this.handleKeydown}
              @focusin=${this.handleFocus}
            >
              ${content}
            </ul>
          `
        : this.model === 'fieldset'
          ? html`
              <fieldset>
                <legend>${this.label}</legend>
                <div
                  class="collection"
                  style=${height}
                  @keydown=${this.handleKeydown}
                  @focusin=${this.handleFocus}
                >
                  ${content}
                </div>
              </fieldset>
            `
          : html`
              <div
                class="collection"
                role=${this.model === 'feed'
                  ? 'feed'
                  : this.model === 'toolbar'
                    ? 'toolbar'
                    : 'grid'}
                aria-orientation=${ifDefined(
                  this.model === 'toolbar' ? 'horizontal' : undefined
                )}
                aria-label=${this.label}
                aria-describedby=${ifDefined(
                  grid ? 'selection-status' : undefined
                )}
                aria-multiselectable=${ifDefined(
                  grid && this.selectionMode === 'multiple' ? 'true' : undefined
                )}
                aria-busy=${ifDefined(
                  this.model === 'feed' ? 'false' : undefined
                )}
                style=${height}
                @keydown=${this.handleKeydown}
                @focusin=${this.handleFocus}
                @focusout=${this.handleFocusOut}
              >
                ${this.singleRow
                  ? html`
                      <div role="row">${content}</div>
                    `
                  : content}
              </div>
            `}
      <div
        id="selection-status"
        class="status"
        role="status"
        aria-live="assertive"
      >
        ${keyed(this.selectionAnnouncement, this.selectionAnnouncement.text)}
      </div>
    `;
  }
}

/** @element swc-card-view-single-column-grid */
export class CardViewSingleColumnGrid extends CardView {
  protected override readonly navigation: CardViewNavigation = 'spatial';
}

/** @element swc-card-view-list */
export class CardViewList extends CardView {
  protected override readonly model: CardViewModel = 'list';
}

/** @element swc-card-view-feed */
export class CardViewFeed extends CardView {
  protected override readonly model: CardViewModel = 'feed';
}

/**
 * Card collection semantics: one row containing a gridcell per card.
 *
 * @element swc-card-view-single-row-grid
 */
export class CardViewSingleRowGrid extends CardView {
  protected override readonly model: CardViewModel = 'single-row';
}

/**
 * Experimental toolbar grouping each card's selection and action controls.
 *
 * @element swc-card-view-toolbar
 */
export class CardViewToolbar extends CardView {
  protected override readonly model: CardViewModel = 'toolbar';
}

/**
 * Experimental fieldset grouping card selection and action controls.
 *
 * @element swc-card-view-fieldset
 */
export class CardViewFieldset extends CardView {
  protected override readonly model: CardViewModel = 'fieldset';
}

/** @element swc-card-view-grid-nowrap */
export class CardViewGridNoWrap extends CardViewSingleRowGrid {
  protected override readonly navigation: CardViewNavigation = 'spatial';

  protected override get moreInfoEnabled(): boolean {
    return true;
  }
}

/** @element swc-card-view-grid-loop */
export class CardViewGridLoop extends CardViewGridNoWrap {
  protected override readonly navigation: CardViewNavigation = 'spatial-wrap';
}

/** @element swc-card-view-grid-advance */
export class CardViewGridAdvance extends CardViewGridNoWrap {
  protected override readonly navigation: CardViewNavigation =
    'spatial-advance';
}

/** @element swc-card-view-grid-semantic */
export class CardViewGridSemantic extends CardViewGridNoWrap {
  protected override readonly navigation: CardViewNavigation = 'semantic';
}

/** @element swc-card-view-masonry-nowrap */
export class CardViewMasonryNoWrap extends CardViewGridNoWrap {
  public override layout: CardViewLayout = 'masonry';
}

/** @element swc-card-view-masonry-loop */
export class CardViewMasonryLoop extends CardViewGridLoop {
  public override layout: CardViewLayout = 'masonry';
}

/** @element swc-card-view-masonry-advance */
export class CardViewMasonryAdvance extends CardViewGridAdvance {
  public override layout: CardViewLayout = 'masonry';
}

/** @element swc-card-view-waterfall-advance */
export class CardViewWaterfallAdvance extends CardViewGridAdvance {
  public override layout: CardViewLayout = 'waterfall';
}

/** @element swc-card-view-masonry-semantic */
export class CardViewMasonrySemantic extends CardViewGridSemantic {
  public override layout: CardViewLayout = 'masonry';
}

/** @element swc-card-view-masonry-top-to-bottom */
export class CardViewMasonryTopToBottom extends CardViewMasonryNoWrap {
  protected override readonly navigation: CardViewNavigation = 'visual-column';
}
