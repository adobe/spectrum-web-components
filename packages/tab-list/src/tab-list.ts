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
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import tabStyles from './tab-list.css.js';

/**
 * @slot - Child tab elements
 * @attr {Boolean} quiet - The tab-list border is a lot smaller
 * @attr {Boolean} compact - The collection of tabs take up less space
 */

export class TabList extends LitElement {
    public static get styles(): CSSResultArray {
        return [tabStyles];
    }
    @property({ reflect: true })
    public direction: 'vertical' | 'horizontal' = 'horizontal';

    @property()
    public selectionIndicatorStyle = '';

    @property({ type: String, reflect: true })
    public value = '';

    @property({ reflect: true })
    public get selected(): string {
        return this._selected;
    }

    public set selected(value: string) {
        const oldValue = this.selected;

        if (value === oldValue) {
            return;
        }
        this.updateCheckedState(value);

        this._selected = value;
        this.requestUpdate('selected', oldValue);
    }

    private _selected = '';

    protected render(): TemplateResult {
        return html`
            <slot
                @click=${this.onClick}
                @slotchange=${this.onSlotChange}
            ></slot>
            <div
                id="selectionIndicator"
                style=${this.selectionIndicatorStyle}
            ></div>
        `;
    }

    private onClick(ev: Event): void {
        const target = ev.target as HTMLElement;
        this.selectTarget(target);
    }

    private selectTarget(target: HTMLElement): void {
        const value = target.getAttribute('value');
        if (value) {
            const selected = this.selected;
            this.selected = value;
            const applyDefault = this.dispatchEvent(
                new Event('change', {
                    cancelable: true,
                })
            );
            if (!applyDefault) {
                this.selected = selected;
            }
        }
    }

    private onSlotChange(): void {
        this.updateCheckedState(this.selected);
    }

    private updateCheckedState(value: string): void {
        const previousChecked = this.querySelectorAll('[selected]');

        previousChecked.forEach((element) => {
            element.removeAttribute('selected');
        });

        if (value.length) {
            const currentChecked = this.querySelector(`[value="${value}"]`);

            if (currentChecked) {
                currentChecked.setAttribute('selected', '');
            }
        }

        this.updateSelectionIndicator();
    }

    private updateSelectionIndicator(): void {
        const selectedElement = this.querySelector('[selected]');
        if (!selectedElement) {
            return;
        }
        const bounds = selectedElement.getBoundingClientRect();

        if (this.direction === 'horizontal') {
            const width = bounds.width;
            const parentOffset = this.getBoundingClientRect().left;
            const offset = bounds.left - parentOffset;

            this.selectionIndicatorStyle = `width: ${width}px; transform: translateX(${offset}px)`;
        } else {
            const height = bounds.height;
            const parentOffset = this.getBoundingClientRect().top;
            const offset = bounds.top - parentOffset;

            this.selectionIndicatorStyle = `height: ${height}px; transform: translateY(${offset}px)`;
        }
    }
}
