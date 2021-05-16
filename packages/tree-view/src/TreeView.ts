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
    CSSResultArray,
    html,
    property,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import { TreeViewItem } from './TreeViewItem.js';
import treeViewStyles from './tree-view.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
 */

export class TreeView extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [treeViewStyles];
    }

    @property({ attribute: false })
    public selected!: Set<TreeViewItem>;

    @property({ type: Boolean, reflect: true })
    public standalone = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: String })
    public selects: undefined | 'single' | 'multiple';

    private isRoot: boolean = false;

    private descendants!: TreeViewItem[];

    private lastSelectedIndex: number = -1;

    constructor() {
        super();
        this.addEventListener('toggled', this.toggleSelected);
    }

    private toggleSelected(event: Event): void {
        if (!this.isRoot) return;

        event.stopPropagation();
        if (this.selects === undefined) {
            event.preventDefault();
            return;
        }

        const { target, detail } = event as CustomEvent;
        if (!target) return;

        const targetItem = target as TreeViewItem;
        if (!detail.multiselect || this.selects !== 'multiple') {
            this.selected = new Set(
                [...this.selected].filter((item) => {
                    if (item !== targetItem) item.selected = false;
                    return item.selected;
                })
            );
        } else if (detail.contiguous && this.lastSelectedIndex >= 0) {
            this.selectContiguous(targetItem);
        }
        this.manageSelected(targetItem);
        if (targetItem.selected) {
            this.lastSelectedIndex = this.descendants.indexOf(targetItem);
        }
        this.dispatchEvent(
            new CustomEvent('changed', {
                bubbles: true,
                composed: true,
                cancelable: false,
            })
        );
    }

    protected manageSelected(targetItem: TreeViewItem): void {
        if (targetItem.selected) {
            this.selected.add(targetItem);
        } else {
            this.selected.delete(targetItem);
        }
    }

    protected selectContiguous(target: TreeViewItem) {
        const targetIndex = this.descendants.indexOf(target);
        const start = Math.min(this.lastSelectedIndex, targetIndex);
        const end = Math.max(this.lastSelectedIndex, targetIndex);
        this.descendants.slice(start, end + 1).forEach((item) => {
            if (!item.disabled) {
                item.selected = target.selected;
                this.manageSelected(item);
            }
        });
    }

    protected render(): TemplateResult {
        return html`
            <slot @slotchange=${this.onSlotChange}></slot>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.isRoot = this.parentElement?.tagName !== 'SP-TREE-VIEW-ITEM';
        this.setAttribute('role', this.isRoot ? 'tree' : 'group');
        if (this.isRoot && this.selects === 'multiple') {
            this.setAttribute('aria-multiselectable', 'true');
        }
    }

    protected manageChildren(): void {
        const children = this.querySelectorAll(':scope > sp-tree-view-item');
        children.forEach((child, index) => {
            if (this.isRoot) {
                child.setAttribute('aria-level', '1');
            } else {
                child.setAttribute(
                    'aria-level',
                    (
                        Number(this.parentElement!.getAttribute('aria-level')) +
                        1
                    ).toString()
                );
            }
            child.setAttribute('aria-posinset', (index + 1).toString());
            child.setAttribute('aria-setsize', children.length.toString());
        });

        if (this.isRoot) {
            this.descendants = [
                ...this.querySelectorAll('sp-tree-view-item'),
            ] as TreeViewItem[];
            this.selected = new Set(
                this.descendants.filter((d) => d.hasAttribute('selected'))
            );
        }
    }

    protected onSlotChange(): void {
        this.manageChildren();
    }
}
