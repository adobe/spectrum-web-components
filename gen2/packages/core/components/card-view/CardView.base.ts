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
import { property, state } from 'lit/decorators.js';

import { SpectrumElement } from '../../element/index.js';
import type {
  CardViewItem,
  CardViewLayout,
  CardViewModel,
  CardViewPosition,
  CardViewSelectionMode,
} from './CardView.types.js';

export abstract class CardViewBase extends SpectrumElement {
  @property({ attribute: false })
  public items: CardViewItem[] = [];

  @property({ reflect: true })
  public layout: CardViewLayout = 'grid';

  @property()
  public label = 'Photos';

  @property({ attribute: 'selection-mode', reflect: true })
  public selectionMode: CardViewSelectionMode = 'multiple';

  @property({ attribute: false })
  public selected: string[] = [];

  @state()
  protected activeIndex = 0;

  protected anchorIndex = 0;

  protected get groupedControls(): boolean {
    return this.model === 'toolbar' || this.model === 'fieldset';
  }

  protected abstract readonly model: CardViewModel;
  protected abstract get positions(): CardViewPosition[];
  protected abstract get focusTargets(): HTMLElement[];

  protected get composite(): boolean {
    return this.model !== 'list' && this.model !== 'feed';
  }

  protected select(index: number, checked: boolean): void {
    const item = this.items[index];
    if (!item || item.disabled || this.selectionMode === 'none') {
      return;
    }
    const next = new Set(this.selectionMode === 'single' ? [] : this.selected);
    if (checked) {
      next.add(item.id);
    } else {
      next.delete(item.id);
    }
    this.selected = [...next];
    this.anchorIndex = index;
    this.dispatchEvent(
      new CustomEvent('swc-card-view-selection-change', {
        bubbles: true,
        composed: true,
        detail: { selected: [...this.selected] },
      })
    );
  }

  protected activate(index: number, action: 'open' | 'share'): void {
    const item = this.items[index];
    if (!item || item.disabled) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('swc-card-view-action', {
        bubbles: true,
        composed: true,
        detail: { id: item.id, action },
      })
    );
  }

  protected async focusItem(index: number): Promise<void> {
    if (index < 0 || index >= this.items.length || this.items[index].disabled) {
      return;
    }
    this.activeIndex = index;
    await this.updateComplete;
    const target = this.focusTargets[index];
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  protected handleFocus(event: FocusEvent): void {
    const target = (event.composedPath() as HTMLElement[]).find(
      (element) => element.dataset?.index !== undefined
    );
    if (target) {
      this.activeIndex = Number(target.dataset.index);
    }
  }

  protected async focusCardControl(index: number): Promise<void> {
    const target = this.focusTargets.find(
      (control) => Number(control.dataset.index) === index
    );
    if (!target || target.matches(':disabled')) {
      return;
    }
    this.activeIndex = index;
    await this.updateComplete;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  protected handleGroupedKeydown(
    event: KeyboardEvent,
    target: HTMLElement
  ): void {
    if (
      this.selectionMode === 'none'
        ? target.dataset.action !== 'open'
        : !target.matches('input[type="checkbox"]')
    ) {
      return;
    }
    const current = Number(target.dataset.index);
    let next: number;
    if (event.key === 'Home' || event.key === 'End') {
      next =
        event.key === 'Home'
          ? this.items.findIndex((item) => !item.disabled)
          : this.items.map((item) => !item.disabled).lastIndexOf(true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const rtl = getComputedStyle(this).direction === 'rtl';
      const direction = (event.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1);
      next = this.sequential(current, direction);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      next = this.spatial(current, event.key);
    } else {
      return;
    }
    event.preventDefault();
    void this.focusCardControl(next);
  }

  protected handleMenuKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (this.selectionMode === 'none') {
        this.activate(index, 'open');
      } else {
        this.select(
          index,
          this.selectionMode === 'single' ||
            !this.selected.includes(this.items[index].id)
        );
      }
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.dispatchEvent(
        new CustomEvent('swc-card-view-exit', {
          bubbles: true,
          composed: true,
          detail: { direction: 'before' },
        })
      );
      return;
    }
    let next = index;
    if (event.key === 'Home') {
      next = this.items.findIndex((item) => !item.disabled);
    } else if (event.key === 'End') {
      next = this.items.map((item) => !item.disabled).lastIndexOf(true);
    } else if (
      ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      next = this.spatial(index, event.key);
    } else if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      for (let offset = 1; offset <= this.items.length; offset++) {
        const candidate = (index + offset) % this.items.length;
        if (
          !this.items[candidate].disabled &&
          this.items[candidate].title
            .toLocaleLowerCase()
            .startsWith(event.key.toLocaleLowerCase())
        ) {
          next = candidate;
          break;
        }
      }
    } else {
      return;
    }
    event.preventDefault();
    void this.focusItem(next);
  }

  protected sequential(index: number, direction: number): number {
    for (
      let next = index + direction;
      next >= 0 && next < this.items.length;
      next += direction
    ) {
      if (!this.items[next].disabled) {
        return next;
      }
    }
    return index;
  }

  protected spatial(index: number, key: string): number {
    const current = this.positions[index];
    if (!current) {
      return index;
    }
    const horizontal = key === 'ArrowLeft' || key === 'ArrowRight';
    const forward = key === 'ArrowRight' || key === 'ArrowDown';
    const centerX = current.left + current.width / 2;
    const centerY = current.top + current.height / 2;
    let best = index;
    let bestScore = Infinity;
    this.positions.forEach((position, candidate) => {
      if (candidate === index || this.items[candidate]?.disabled) {
        return;
      }
      const deltaX = position.left + position.width / 2 - centerX;
      const deltaY = position.top + position.height / 2 - centerY;
      const primary = horizontal ? deltaX : position.top - current.top;
      if ((forward ? primary : -primary) < 1) {
        return;
      }
      const overlap = horizontal
        ? Math.min(
            current.top + current.height,
            position.top + position.height
          ) - Math.max(current.top, position.top)
        : Math.min(
            current.left + current.width,
            position.left + position.width
          ) - Math.max(current.left, position.left);
      if (overlap <= 0) {
        return;
      }
      const score =
        Math.abs(primary) * 1000 + Math.abs(horizontal ? deltaY : deltaX);
      if (score < bestScore) {
        best = candidate;
        bestScore = score;
      }
    });
    return best;
  }

  protected columnStep(index: number, direction: number): number {
    const order = this.positions
      .map((position, itemIndex) => ({ ...position, itemIndex }))
      .filter((position) => !this.items[position.itemIndex]?.disabled)
      .sort(
        (first, second) =>
          first.column - second.column ||
          first.top - second.top ||
          first.itemIndex - second.itemIndex
      )
      .map((position) => position.itemIndex);
    const position = order.indexOf(index);
    return order[position + direction] ?? index;
  }

  protected handleKeydown(event: KeyboardEvent): void {
    const target = event.composedPath()[0] as HTMLElement;
    const wrapper = (event.composedPath() as HTMLElement[]).find(
      (element) => element.dataset?.index !== undefined
    );
    if (!wrapper) {
      return;
    }
    const index = Number(wrapper.dataset.index);
    if (this.groupedControls) {
      this.handleGroupedKeydown(event, target);
      return;
    }
    if (this.model === 'menu') {
      if (!target.hasAttribute('data-focus')) {
        if (event.key === 'Escape') {
          event.preventDefault();
          void this.focusItem(index);
        }
        return;
      }
      this.handleMenuKeydown(event, index);
      return;
    }
    if (this.model === 'feed') {
      let next: number | undefined;
      if (event.key === 'PageDown') {
        next = this.sequential(index, 1);
      }
      if (event.key === 'PageUp') {
        next = this.sequential(index, -1);
      }
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === 'Home' || event.key === 'End')
      ) {
        event.preventDefault();
        this.dispatchEvent(
          new CustomEvent('swc-card-view-exit', {
            bubbles: true,
            composed: true,
            detail: { direction: event.key === 'Home' ? 'before' : 'after' },
          })
        );
        return;
      }
      if (next !== undefined) {
        event.preventDefault();
        void this.focusItem(next);
      }
      return;
    }
    if (
      (!this.composite && this.model !== 'list') ||
      !target.hasAttribute('data-focus')
    ) {
      return;
    }
    if (
      this.model === 'list' &&
      ![
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ].includes(event.key)
    ) {
      return;
    }
    if (event.key === ' ') {
      event.preventDefault();
      this.select(index, !this.selected.includes(this.items[index].id));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this.activate(index, 'open');
      return;
    }
    let next = index;
    if (event.key === 'Home') {
      next = this.items.findIndex((item) => !item.disabled);
    } else if (event.key === 'End') {
      next = this.items.map((item) => !item.disabled).lastIndexOf(true);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const rtl = getComputedStyle(this).direction === 'rtl';
      const direction = (event.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1);
      next =
        this.model === 'baseline' && this.layout === 'waterfall'
          ? this.spatial(index, event.key)
          : this.sequential(index, direction);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      next =
        this.model === 'wrapping'
          ? this.columnStep(index, event.key === 'ArrowDown' ? 1 : -1)
          : this.spatial(index, event.key);
    } else {
      return;
    }
    event.preventDefault();
    if (event.shiftKey && this.selectionMode === 'multiple') {
      const start = Math.min(this.anchorIndex, next);
      const end = Math.max(this.anchorIndex, next);
      this.selected = this.items
        .slice(start, end + 1)
        .filter((item) => !item.disabled)
        .map((item) => item.id);
      this.dispatchEvent(
        new CustomEvent('swc-card-view-selection-change', {
          bubbles: true,
          composed: true,
          detail: { selected: [...this.selected] },
        })
      );
    } else {
      this.anchorIndex = next;
    }
    void this.focusItem(next);
  }
}
