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

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { Chevron100Icon } from '@adobe/spectrum-wc/icon';
import { SpectrumElement } from '@spectrum-web-components/core/element';

import '@adobe/spectrum-wc/icon';

import styles from './tree-view-item.css';

/**
 * A single item within a tree view. Can contain nested items.
 *
 * @element swc-tree-view-item
 *
 * @slot - Nested `swc-tree-view-item` elements (children)
 * @slot icon - An optional icon or thumbnail to display before the label
 *
 * @example
 * <swc-tree-view-item label="Documents" expanded>
 *   <swc-tree-view-item label="README.md"></swc-tree-view-item>
 * </swc-tree-view-item>
 */
export class TreeViewItem extends SpectrumElement {
  /**
   * The text label displayed for this item.
   */
  @property({ type: String, reflect: true })
  public label: string = '';

  /**
   * Whether this item's children are visible.
   */
  @property({ type: Boolean, reflect: true })
  public expanded: boolean = false;

  /**
   * Whether this item is selected.
   */
  @property({ type: Boolean, reflect: true })
  public selected: boolean = false;

  /**
   * Whether this item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  /**
   * The nesting depth of this item (0 = root level).
   * Automatically calculated from DOM nesting.
   */
  @state()
  private _level: number = 0;

  /**
   * Whether this item has child items in the default slot.
   */
  @state()
  private _hasChildren: boolean = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._calculateLevel();
  }

  private _calculateLevel(): void {
    let level = 0;
    let parent = this.parentElement;
    while (parent) {
      if (parent.tagName === 'SWC-TREE-VIEW-ITEM') {
        level++;
      }
      parent = parent.parentElement;
    }
    this._level = level;
  }

  private _handleSlotChange(event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements({ flatten: true });
    this._hasChildren = assignedElements.some(
      (el) => el.tagName === 'SWC-TREE-VIEW-ITEM'
    );
  }

  private _handleRowClick(): void {
    if (this.disabled) {
      return;
    }
    if (this._hasChildren) {
      this.expanded = !this.expanded;
    }
  }

  private _handleRowKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleRowClick();
    }
  }

  protected override render(): TemplateResult {
    const indentWidth = this._level * 16;

    const chevronClasses = {
      'swc-TreeViewItem-chevron': true,
      'swc-TreeViewItem-chevron--expanded': this.expanded,
      'swc-TreeViewItem-chevron--hidden': !this._hasChildren,
    };

    const childrenClasses = {
      'swc-TreeViewItem-children': true,
      'swc-TreeViewItem-children--collapsed': !this.expanded,
    };

    return html`
      <div
        class="swc-TreeViewItem-row"
        role="treeitem"
        tabindex="0"
        aria-expanded=${this._hasChildren ? String(this.expanded) : nothing}
        aria-selected=${String(this.selected)}
        aria-disabled=${String(this.disabled)}
        aria-level=${this._level + 1}
        @click=${this._handleRowClick}
        @keydown=${this._handleRowKeydown}
      >
        <span
          class="swc-TreeViewItem-indent"
          style="inline-size: ${indentWidth}px"
        ></span>
        <span class=${classMap(chevronClasses)}>
          <swc-icon>${Chevron100Icon()}</swc-icon>
        </span>
        <span class="swc-TreeViewItem-icon">
          <slot name="icon"></slot>
        </span>
        <span class="swc-TreeViewItem-label">${this.label}</span>
      </div>
      <div class=${classMap(childrenClasses)} role="group">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
