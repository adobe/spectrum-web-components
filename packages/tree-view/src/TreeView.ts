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
    SpectrumElement,
    property,
    internalProperty,
    PropertyValues,
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
    public selectedChildren: TreeViewItem[] = [];

    @property({ type: Boolean, reflect: true })
    public standalone = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
    public allowMultiple = false;

    @internalProperty()
    public isRoot = false;

    constructor() {
        super();
        this.addEventListener('toggled', this.manageSelected);
    }

    private manageSelected(event: Event): void {
        if (!this.isRoot) return;

        event.stopPropagation();
        const { target, detail } = event as CustomEvent;
        if (!target) return;

        const targetItem = target as TreeViewItem;
        if (!this.allowMultiple || !detail.multiselect) {
            this.selectedChildren = this.selectedChildren.filter((item) => {
                if (item !== targetItem) item.selected = false;
                return item.selected;
            });
        }
        if (targetItem.selected) this.selectedChildren.push(targetItem);
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
    }

    protected onSlotChange(): void {
        if (this.isRoot) {
            const selectedChildren = Array.prototype.slice.call(
                document.querySelectorAll('[selected]')
            );
            this.selectedChildren = selectedChildren as TreeViewItem[];
        }
    }
}
