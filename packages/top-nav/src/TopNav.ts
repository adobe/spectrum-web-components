/* eslint-disable lit-a11y/click-events-have-key-events */
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
    property,
    CSSResultArray,
    TemplateResult,
    PropertyValues,
    SpectrumElement,
    ifDefined,
} from '@spectrum-web-components/base';
import { TopNavItem } from './TopNavItem.js';

import tabStyles from '@spectrum-web-components/tabs/src/tabs.css.js';

declare global {
    interface Document {
        fonts?: {
            ready: Promise<void>;
        };
    }
}

const noSelectionStyle = 'transform: translateX(0px) scaleX(0) scaleY(0)';

/**
 * @element sp-top-nav
 * @slot - Child tab elements
 * @attr {Boolean} quiet - The tabs border is a lot smaller
 * @attr {Boolean} compact - The collection of tabs take up less space
 */

export class TopNav extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [tabStyles];
    }

    @property()
    public selectionIndicatorStyle = noSelectionStyle;

    @property({ attribute: false })
    public shouldAnimate = false;

    private onClick = (event: Event): void => {
        const target = event.target as TopNavItem;
        this.shouldAnimate = true;
        this.selectTarget(target);
    };

    @property({ reflect: true })
    public set selected(value: string | undefined) {
        const oldValue = this.selected;

        if (value === oldValue) {
            return;
        }
        this.updateCheckedState(value);

        this._selected = value;
        this.requestUpdate('selected', oldValue);
    }

    public get selected(): string | undefined {
        return this._selected;
    }

    private _selected!: string | undefined;

    protected items: TopNavItem[] = [];

    private manageItems(): void {
        this.items = [
            ...this.querySelectorAll('sp-top-nav-item'),
        ] as TopNavItem[];
        const selectedChild = this.items.find(
            (item) => item.value === window.location.href
        );
        if (selectedChild) {
            this.selectTarget(selectedChild);
        }
    }

    protected render(): TemplateResult {
        return html`
            <div @click=${this.onClick} id="list">
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selectionIndicator"
                    class=${ifDefined(
                        this.shouldAnimate ? undefined : 'first-position'
                    )}
                    style=${this.selectionIndicatorStyle}
                ></div>
            </div>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('direction', 'horizontal');
        this.manageItems();
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('dir')) {
            this.updateSelectionIndicator();
        }
        if (
            !this.shouldAnimate &&
            typeof changes.get('shouldAnimate') !== 'undefined'
        ) {
            this.shouldAnimate = true;
        }
    }

    private selectTarget(target: TopNavItem): void {
        const { value } = target;
        if (value) {
            this.selected = value;
        }
    }

    protected onSlotChange(): void {
        this.manageItems();
    }

    protected updateCheckedState(value: string | undefined): void {
        this.items.forEach((item) => {
            item.selected = false;
        });

        requestAnimationFrame(() => {
            if (value && value.length) {
                const currentItem = this.items.find(
                    (item) =>
                        item.value === value ||
                        item.value === window.location.href
                );

                if (currentItem) {
                    currentItem.selected = true;
                } else {
                    this.selected = '';
                }
            }

            this.updateSelectionIndicator();
        });
    }

    private updateSelectionIndicator = async (): Promise<void> => {
        const selectedItem = this.items.find(
            (item) =>
                item.value === this.selected ||
                item.value === window.location.href
        );
        if (!selectedItem) {
            this.selectionIndicatorStyle = noSelectionStyle;
            return;
        }
        await Promise.all([
            selectedItem.updateComplete,
            document.fonts ? document.fonts.ready : Promise.resolve(),
        ]);
        const itemBoundingClientRect = selectedItem.getBoundingClientRect();
        const parentBoundingClientRect = this.getBoundingClientRect();

        const width = itemBoundingClientRect.width;
        const offset =
            this.dir === 'ltr'
                ? itemBoundingClientRect.left - parentBoundingClientRect.left
                : itemBoundingClientRect.right - parentBoundingClientRect.right;

        this.selectionIndicatorStyle = `transform: translateX(${offset}px) scaleX(${
            this.dir === 'ltr' ? width : -1 * width
        });`;
    };

    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('resize', this.updateSelectionIndicator);
        if ('fonts' in document) {
            ((document as unknown) as {
                fonts: {
                    addEventListener: (
                        name: string,
                        callback: () => void
                    ) => void;
                };
            }).fonts.addEventListener(
                'loadingdone',
                this.updateSelectionIndicator
            );
        }
    }

    public disconnectedCallback(): void {
        window.removeEventListener('resize', this.updateSelectionIndicator);
        if ('fonts' in document) {
            ((document as unknown) as {
                fonts: {
                    removeEventListener: (
                        name: string,
                        callback: () => void
                    ) => void;
                };
            }).fonts.removeEventListener(
                'loadingdone',
                this.updateSelectionIndicator
            );
        }
        super.disconnectedCallback();
    }
}
