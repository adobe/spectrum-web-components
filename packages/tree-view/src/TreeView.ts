/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';
import { Focusable, getActiveElement } from '@spectrum-web-components/shared';

import { TreeViewHeading } from './TreeViewHeading';
import {
    TreeViewItem,
    TreeViewItemToggleSelectDetail,
} from './TreeViewItem.js';
import treeViewStyles from './tree-view.css.js';

/**
 * @element sp-tree-view
 * @slot - The `sp-tree-view-item` elements to manage as a tree.
 * @slot icon - The icon that appears on the left of the label
 * @attr {Boolean} quiet - A treeview with quiet selection.
 * @attr {Boolean} standalone - Meant to be used outside of a panel. Items in standalone have rounded corners.
 * @attr {String} selects - Determines how many items can be marked selected at a time. Can be "single" or "multiple".
 * @fires change - Announces a change in the `selected` item collection property of the tree view root element.
 */
export class TreeView extends Focusable {
    public static get styles(): CSSResultArray {
        return [treeViewStyles];
    }

    @property({ type: Boolean, reflect: true })
    public standalone = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: String })
    public selects: undefined | 'single' | 'multiple';

    @property({ type: Boolean, reflect: true, attribute: 'manage-tab-index' })
    public manageTabIndex = false;

    private lastSelectedIndex = -1;

    constructor() {
        super();
        this.addEventListener(
            'sp-tree-view-item:toggle-select',
            this.handleItemToggleSelect as EventListener
        );
    }

    public get isRoot(): boolean {
        return this.parentElement?.tagName !== 'SP-TREE-VIEW-ITEM';
    }

    public get selected(): NodeListOf<TreeViewItem> {
        return this.querySelectorAll('sp-tree-view-item[selected]');
    }

    public get focusElement(): TreeViewItem | TreeView {
        const selected = this.querySelector('[selected]') as TreeViewItem;
        if (selected && !selected.disabled) {
            return selected;
        }
        const items = [...this.querySelectorAll('sp-tree-view-item')];
        let index = 0;
        while (index < items.length && items[index] && items[index]) {
            index += 1;
        }
        if (items[index]) {
            return items[index] as TreeViewItem | TreeView;
        }
        return this;
    }

    private get items(): NodeListOf<TreeViewItem> {
        return this.querySelectorAll('sp-tree-view-item');
    }

    public startListeningToKeyboard(): void {
        const items = this.items;
        if (items && !items.length) {
            return;
        }
        this.addEventListener('keydown', this.handleKeydown);
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    public async toggleFlatChildren(
        parent: TreeViewItem,
        open: boolean
    ): Promise<void> {
        await parent.updateComplete;
        if (!parent.canOpen) return;

        const items = [...this.items];
        const parentLevel = (parent.indent || 0) + 1;
        const parentIndex = items.indexOf(parent);
        if (parentIndex < 0) return;

        const children = items.slice(parentIndex + 1);
        for (const child of children) {
            if (!child.indent) break;

            const childLevel = (child.indent || 0) + 1;
            if (childLevel <= parentLevel) break;

            if (open && child.parent?.open) {
                child.removeAttribute('hidden');
            } else {
                child.setAttribute('hidden', 'true');
            }
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot @slotchange=${this.onSlotChange}></slot>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', this.isRoot ? 'tree' : 'group');
        if (this.isRoot) {
            if (this.selects === 'multiple') {
                this.setAttribute('aria-multiselectable', 'true');
            }

            this.addEventListener('focusin', this.startListeningToKeyboard);
            this.addEventListener('focusout', this.stopListeningToKeyboard);
        }
    }

    protected onSlotChange(): void {
        this.manageTabIndexes();

        const flat = this.querySelector(':scope > sp-tree-view-item[indent]');
        if (flat) {
            const firstLevel = this.querySelectorAll(
                ':scope > sp-tree-view-item:not([indent])'
            );
            firstLevel.forEach((child) =>
                child.setAttribute('aria-level', '1')
            );
        }
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('manageTabIndex')) {
            const items = [
                ...this.querySelectorAll('sp-tree-view-item'),
            ] as TreeViewItem[];
            items.map((item) => (item.manageTabIndex = this.manageTabIndex));
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        if (code !== 'ArrowDown' && code !== 'ArrowUp') {
            return;
        }

        event.preventDefault();
        const direction = code === 'ArrowDown' ? 1 : -1;
        const item = this.getItemByOffset(direction);
        if (item) {
            item.focus();
            if (event.shiftKey) item.toggleSelected(event);
        }
    }

    private getItemByOffset(direction: number): TreeViewItem | undefined {
        const items = [...this.items];
        const focused = items.indexOf(getActiveElement(this) as TreeViewItem);
        let next = focused;
        let nextItem = items[next];
        while (
            nextItem &&
            (this.isDisabledChild(nextItem) || next === focused)
        ) {
            next = (items.length + next + direction) % items.length;
            nextItem = items[next];
        }
        if (!nextItem || this.isDisabledChild(nextItem) || next === focused) {
            return;
        } else {
            return nextItem;
        }
    }

    private isDisabledChild(child: TreeViewItem): boolean {
        if (child.disabled) {
            return true;
        }
        let parent = child.parentElement as
            | TreeViewItem
            | TreeView
            | TreeViewHeading;
        while (
            parent instanceof TreeViewHeading ||
            (parent instanceof TreeView && !parent.isRoot) ||
            (!(parent as TreeViewItem).disabled &&
                parent instanceof TreeViewItem &&
                parent.open)
        ) {
            parent = parent.parentElement as
                | TreeViewItem
                | TreeView
                | TreeViewHeading;
        }
        return parent !== this;
    }

    private handleItemToggleSelect(
        event: CustomEvent<TreeViewItemToggleSelectDetail> & {
            target: TreeViewItem;
        }
    ): void {
        if (!this.isRoot) return;

        event.stopPropagation();
        if (this.selects === undefined) {
            event.preventDefault();
            return;
        }

        const { target, detail } = event;
        if (!target) return;

        const targetIndex = [...this.items].indexOf(target);
        if (this.selects === 'single' || !detail.multiselect) {
            this.resetSelected(target);
        } else if (this.lastSelectedIndex >= 0 && detail.contiguous) {
            this.updateContiguousItems(targetIndex, target.selected);
        }
        if (target.selected) this.lastSelectedIndex = targetIndex;
        target.updateComplete.then(() => target.focus());
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                cancelable: false,
            })
        );
    }

    private resetSelected(target: TreeViewItem): void {
        this.selected.forEach((item) => {
            if (item !== target) item.selected = false;
        });
    }

    private updateContiguousItems(
        targetIndex: number,
        selected: boolean
    ): void {
        const start = Math.min(this.lastSelectedIndex, targetIndex);
        const end = Math.max(this.lastSelectedIndex, targetIndex);
        const items = [...this.items].slice(start, end + 1);
        items.forEach((item) => {
            if (!item.disabled) item.selected = selected;
        });
    }

    private async manageTabIndexes(): Promise<void> {
        if (this.manageTabIndex && this.selected.length === 0) {
            const managed = this.querySelector(
                'sp-tree-view-item:not([tabindex])'
            ) as TreeViewItem;
            if (managed) managed.tabIndex = -1;
            const first = this.querySelector(
                'sp-tree-view-item:not([disabled])'
            ) as TreeViewItem;
            if (first) {
                await first.updateComplete;
                first.tabIndex = 0;
            }
        }
    }
}
