/*
Copyright 2020 Adobe. All rights reserved.
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
    query,
    queryAssignedNodes,
    ifDefined,
} from '@spectrum-web-components/base';

import {
    Focusable,
    ObserveSlotPresence,
} from '@spectrum-web-components/shared';
import type { Thumbnail } from '@spectrum-web-components/thumbnail';
import { TreeView } from './TreeView';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import treeViewItemStyles from './tree-view-item.css.js';
import treeViewItemLabelStyles from './tree-view-label.css.js';

export interface TreeViewItemToggleSelectDetail {
    multiselect: boolean;
    contiguous: boolean;
}

/**
 * @element sp-tree-view-item
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
 * @attr {Boolean} disabled - Disable an item by preventing selection and focus.
 * @attr {Boolean} drop-target - Adds styling around an item to identify it as a dropzone.
 * @attr {Boolean} can-open - In a flat tree, this attribute can be used to identify hierarchical, parent tree-items.
 * @attr {Boolean} open - Open a parent item that contains children.
 * @attr {Number} indent - In a flat tree, this attribute can be used to create a hierarchical, nested structure of items.
 * @attr {Boolean} selected - Mark an item as selected.
 * @fires change - Announces a change in the `selected` property of the tree view item element.
 * @fires open - Announces that the tree view item element has been opened.
 * @fires close - Announces that the tree view item element has been closed.
 */

export class TreeViewItem extends ObserveSlotPresence(
    Focusable,
    '[slot="thumbnail"]'
) {
    public static get styles(): CSSResultArray {
        return [treeViewItemStyles, treeViewItemLabelStyles, chevronStyles];
    }

    @queryAssignedNodes('thumbnail', true)
    private assignedThumbnails!: NodeListOf<Thumbnail>;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true, attribute: 'drop-target' })
    public dropTarget = false;

    public get thumbnail(): Thumbnail | undefined {
        if (this.assignedThumbnails.length) {
            return this.assignedThumbnails[0];
        }

        return undefined;
    }

    @query('a')
    public anchorElement!: HTMLAnchorElement;

    public get focusElement(): HTMLAnchorElement {
        return this.anchorElement;
    }

    protected get hasThumbnail(): boolean {
        return this.slotContentIsPresent;
    }

    @property({ type: Boolean, reflect: true, attribute: 'can-open' })
    public canOpen = false;

    @property({ type: Number, reflect: true })
    public indent!: number;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property({ type: Boolean, attribute: false })
    public manageTabIndex = false;

    private get hasChildren(): boolean {
        return !!this.querySelector('[slot="children"]');
    }

    private _rootTreeView?: TreeView;

    constructor() {
        super();
        this.addEventListener('keydown', this.onKeyDown);
    }

    protected get rootTreeView(): TreeView | undefined {
        if (!this._rootTreeView) {
            let parent = this.parentElement;
            if (!parent) return;

            while (!(parent instanceof TreeView && parent.isRoot)) {
                parent = parent.parentElement;
                if (parent === null) break;
            }
            this._rootTreeView = parent || undefined;
        }
        return this._rootTreeView;
    }

    public get parent(): TreeViewItem | undefined {
        let parent: TreeViewItem | undefined;

        if (this.indent) {
            parent = this.getPreviousSibling(
                `sp-tree-view-item[aria-level="${this.indent}"]:not([disabled])`
            ) as TreeViewItem | undefined;
        } else {
            parent =
                this.parentElement?.closest(
                    'sp-tree-view-item:not([disabled])'
                ) || undefined;
        }

        return parent;
    }

    public toggleOpen(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.open = !this.open;
        const applyDefault = this.dispatchEvent(
            new Event(this.open ? 'open' : 'close', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.open = !this.open;
        } else {
            this.rootTreeView?.toggleFlatChildren(this, this.open);
        }
    }

    public toggleSelected(event: MouseEvent | KeyboardEvent): void {
        if (this.disabled) return;

        event.preventDefault();
        event.stopPropagation();
        const multiselect = event.shiftKey || event.metaKey;
        const contiguous = event.shiftKey;
        this.selected = !this.selected;
        const applyDefault = this.dispatchEvent(
            new CustomEvent<TreeViewItemToggleSelectDetail>(
                'sp-tree-view-item:toggle-select',
                {
                    bubbles: true,
                    composed: true,
                    cancelable: true,
                    detail: { multiselect, contiguous },
                }
            )
        );
        if (!applyDefault) this.selected = !this.selected;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.startManagingTabIndexes();
    }

    protected render(): TemplateResult {
        return html`
            <a
                href="#"
                @click=${this.toggleSelected}
                class=${this.hasThumbnail ? 'has-thumbnail link' : 'link'}
                aria-hidden=${ifDefined(this.disabled ? 'true' : undefined)}
            >
                ${this.hasChildren || this.canOpen
                    ? html`
                          <sp-icon-chevron100
                              id="indicator"
                              class="spectrum-UIIcon-ChevronRight100"
                              @click=${this.toggleOpen}
                          ></sp-icon-chevron100>
                      `
                    : html``}
                <slot name="icon"></slot>
                <slot name="thumbnail"></slot>
                <span id="label">
                    <slot></slot>
                </span>
            </a>
            ${this.open
                ? html`
                      <slot name="children"></slot>
                  `
                : html``}
        `;
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);
        this.setAttribute('role', 'treeitem');
        if (this.indent && this.indent > 0) {
            this.setAttribute('aria-level', (this.indent + 1).toString());
        }
    }

    protected updated(changed: PropertyValues): void {
        super.updated(changed);
        if (this.hasChildren || this.canOpen) {
            this.setAttribute('aria-expanded', this.open ? 'true' : 'false');
        }
        if (!this.disabled) {
            this.setAttribute(
                'aria-selected',
                this.selected ? 'true' : 'false'
            );
        }
        if (changed.has('selected')) {
            if (this.thumbnail) this.thumbnail.selected = this.selected;
            if ('undefined' !== typeof changed.get('selected')) {
                this.dispatchEvent(
                    new Event('change', {
                        cancelable: false,
                    })
                );
            }
        }

        if (changed.has('selected') || changed.has('manageTabIndex')) {
            const tabIndexForSelectedState = this.selected ? 0 : -1;
            this.tabIndex = this.manageTabIndex ? tabIndexForSelectedState : 0;
        }
    }

    private async startManagingTabIndexes(): Promise<void> {
        const rootTreeView = this.rootTreeView;
        if (rootTreeView) {
            await rootTreeView.updateComplete;
            this.manageTabIndex = rootTreeView.manageTabIndex;
        }
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (this.disabled) return;

        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.toggleSelected(event);
                break;
            case 'ArrowLeft':
                this.open ? this.toggleOpen(event) : this.focusParent(event);
                break;
            case 'ArrowRight':
                if (!this.hasChildren && !this.canOpen) return;

                this.open ? this.focusChild(event) : this.toggleOpen(event);
                break;
            default:
                return;
        }
    }

    private focusParent(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        if (!this.parent) return;

        this.parent.focus();
    }

    private focusChild(event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        let child: TreeViewItem | null;
        if (this.canOpen) {
            const parentLevel = Number(this.getAttribute('aria-level'));
            child = this.getNextSibling(
                `sp-tree-view-item[aria-level="${
                    parentLevel + 1
                }"]:not([disabled])`
            ) as TreeViewItem | null;
        } else {
            child = this.querySelector(
                ':scope > sp-tree-view > sp-tree-view-item:not([disabled])'
            ) as TreeViewItem | null;
        }
        if (!child) return;

        child.focus();
    }

    public getPreviousSibling(selector: string): Element | null {
        let sibling = this.previousElementSibling;
        if (!selector) return sibling;

        while (sibling) {
            if (sibling.matches(selector)) return sibling;

            sibling = sibling.previousElementSibling;
        }

        return null;
    }

    public getNextSibling(selector: string): Element | null {
        let sibling = this.nextElementSibling;
        if (!selector) return sibling;

        while (sibling) {
            if (sibling.matches(selector)) return sibling;

            sibling = sibling.nextElementSibling;
        }

        return null;
    }
}
