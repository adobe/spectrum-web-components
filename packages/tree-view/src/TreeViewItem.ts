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
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import treeViewItemStyles from './tree-view-item.css.js';
import treeViewItemLabelStyles from './tree-view-label.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
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

    private get hasChildren(): boolean {
        return !!this.querySelector('[slot="children"]');
    }

    public toggleOpen(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.open = !this.open;
    }

    public toggleSelected(event: Event): void {
        event.preventDefault();
        this.selected = !this.selected;
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
    }

    protected updated(changed: PropertyValues): void {
        super.updated(changed);
        this.setAttribute('aria-expanded', this.open ? 'true' : 'false');
        if (changed.has('selected')) {
            if (this.thumbnail) {
                this.thumbnail.selected = this.selected;
            }
            if ('undefined' !== typeof changed.get('selected')) {
                if (this.selected) {
                    this.dispatchEvent(
                        new Event('selected', {
                            bubbles: true,
                            composed: true,
                            cancelable: true,
                        })
                    );
                } else {
                    this.dispatchEvent(
                        new Event('deselected', {
                            bubbles: true,
                            composed: true,
                            cancelable: true,
                        })
                    );
                }
            }
        }
    }
}
