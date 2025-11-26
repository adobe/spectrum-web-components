/**
 * Copyright 2025 Adobe. All rights reserved.
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
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-arrow100.js';

import styles from './table-head-cell.css.js';
import arrowStyles from '@spectrum-web-components/icon/src/spectrum-icon-arrow.css.js';

export type SortedEventDetails = {
    sortDirection: 'asc' | 'desc';
    sortKey: string;
};

const ariaSortValue = (sortDirection?: 'asc' | 'desc'): string => {
    const values = {
        asc: 'ascending',
        desc: 'descending',
    };
    return values[sortDirection as 'asc' | 'desc'] || 'none';
};

/**
 * @element sp-table-head-cell
 *
 * @fires sorted - Announces that the table head has been sorted and handles the sorted event
 */
export class TableHeadCell extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles, arrowStyles];
    }

    @property({ type: Boolean, reflect: true })
    public active = false;

    @property({ reflect: true })
    public override role = 'columnheader';

    @property({ type: Boolean, reflect: true })
    public sortable = false;

    @property({ reflect: true, attribute: 'sort-direction' })
    public sortDirection: 'asc' | 'desc' | undefined;

    @property({ attribute: 'sort-key' })
    public sortKey = '';

    protected handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Space':
                event.preventDefault();
                this.addEventListener('keyup', this.handleKeyup);
                this.active = true;
                break;
            /* c8 ignore next 2 */
            default:
                break;
        }
    }

    private handleKeypress(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Enter':
            case 'NumpadEnter':
                this.click();
                break;
            /* c8 ignore next 2 */
            default:
                break;
        }
    }

    protected handleKeyup(event: KeyboardEvent): void {
        const { code } = event;
        switch (code) {
            case 'Space':
                this.active = false;
                this.removeEventListener('keyup', this.handleKeyup);
                this.click();
                break;
            /* c8 ignore next 2 */
            default:
                break;
        }
    }

    protected handleClick(): void {
        if (!this.sortable) return;
        if (this.sortDirection) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortDirection = 'asc';
        }
        this.dispatchEvent(
            new CustomEvent<SortedEventDetails>('sorted', {
                bubbles: true,
                detail: {
                    sortDirection: this.sortDirection,
                    sortKey: this.sortKey,
                },
            })
        );
    }

    protected override render(): TemplateResult {
        const visiblySorted = this.sortable && !!this.sortDirection;
        return html`
            ${visiblySorted
                ? html`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  `
                : nothing}
            <slot></slot>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('keypress', this.handleKeypress);
    }

    protected override update(changes: PropertyValues): void {
        if (changes.has('sortDirection')) {
            this.setAttribute('aria-sort', ariaSortValue(this.sortDirection));
        }
        if (changes.has('sortable')) {
            this.tabIndex = this.sortable ? 0 : -1;
        }
        super.update(changes);
    }
}
