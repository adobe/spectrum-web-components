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
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  CardViewBase,
  type CardViewItem,
  type CardViewModel,
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
  private collectionHeight = 0;

  private observer?: ResizeObserver;
  private frame = 0;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected get positions(): CardViewPosition[] {
    return this.geometry;
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
    const width = this.getBoundingClientRect().width;
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
    const columnHeights = Array.from({ length: columns }, () => 0);
    const rowHeight = Math.max(0, ...heights);
    const rtl = getComputedStyle(this).direction === 'rtl';
    const next = cards.map((_, index) => {
      const column =
        this.layout === 'waterfall'
          ? columnHeights.indexOf(Math.min(...columnHeights))
          : index % columns;
      const top =
        this.layout === 'waterfall'
          ? columnHeights[column]
          : Math.floor(index / columns) * (rowHeight + gap);
      const height = heights[index];
      columnHeights[column] = top + height + gap;
      return {
        left: (rtl ? columns - column - 1 : column) * (cardWidth + gap),
        top,
        width: cardWidth,
        height,
        column,
      };
    });
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
    return html`
      <swc-card
        variant=${this.variant}
        density=${this.density}
        data-selected=${selected}
      >
        <img
          slot="preview"
          src=${item.image}
          alt=""
          style=${styleMap({
            aspectRatio: String(
              this.layout === 'waterfall' ? (item.aspectRatio ?? 1) : 1.5
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
    return html`
      <div
        class="item"
        data-index=${index}
        role="row"
        aria-rowindex=${index + 1}
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
          role=${this.model === 'baseline' ? 'gridcell' : 'rowheader'}
          aria-colindex="1"
          aria-label=${item.title}
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
              @focusin=${this.handleFocus}
            >
              ${content}
            </ul>
          `
        : html`
            <div
              class="collection"
              role=${this.model === 'feed' ? 'feed' : 'grid'}
              aria-label=${this.label}
              aria-rowcount=${ifDefined(
                this.composite ? this.items.length : undefined
              )}
              aria-colcount=${ifDefined(this.composite ? 1 : undefined)}
              aria-multiselectable=${ifDefined(
                this.composite && this.selectionMode === 'multiple'
                  ? 'true'
                  : undefined
              )}
              aria-busy=${ifDefined(
                this.model === 'feed' ? 'false' : undefined
              )}
              style=${height}
              @keydown=${this.handleKeydown}
              @focusin=${this.handleFocus}
            >
              ${content}
            </div>
          `}
      <div class="status" role="status" aria-live="polite">
        ${this.selected.length ? `${this.selected.length} selected` : ''}
      </div>
    `;
  }
}

export class CardViewOption1 extends CardView {
  protected override readonly model: CardViewModel = 'sequential';
}

export class CardViewOption2 extends CardView {
  protected override readonly model: CardViewModel = 'wrapping';
}

export class CardViewOption3 extends CardView {
  protected override readonly model: CardViewModel = 'list';
}

export class CardViewOption4 extends CardView {
  protected override readonly model: CardViewModel = 'feed';
}
