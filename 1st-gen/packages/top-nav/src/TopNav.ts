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
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { TopNavItem } from './TopNavItem.js';

import tabsSizes from '@spectrum-web-components/tabs/src/tabs-sizes.css.js';
import tabStyles from '@spectrum-web-components/tabs/src/tabs.css.js';
import { ScaledIndicator } from '@spectrum-web-components/tabs/src/Tabs.js';

const noSelectionStyle = 'transform: translateX(0px) scaleX(0) scaleY(0)';

/**
 * @element sp-top-nav
 *
 * @slot - Nav Items to display as a group
 * @attr {Boolean} compact - The collection of tabs take up less space
 */

export class TopNav extends SizedMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [tabsSizes, tabStyles, ScaledIndicator.baseStyles()];
    }

    public override set dir(dir: CSSStyleDeclaration['direction']) {
        if (dir === this.dir) return;
        this.setAttribute('dir', dir);
    }

    @property({ type: String })
    public label = '';

    /**
     * A space separated list of part of the URL to ignore when matching
     * for the "selected" Top Nav Item. Currently supported values are
     * `hash` and `search`, which will remove the `#hash` and
     * `?search=value` respectively.
     */
    @property({ attribute: 'ignore-url-parts' })
    public ignoreURLParts = '';

    @property()
    public selectionIndicatorStyle = noSelectionStyle;

    @property({ attribute: false })
    public shouldAnimate = false;

    /**
     * The Top Nav is displayed without a border.
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

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

    @query('slot')
    private slotEl!: HTMLSlotElement;

    protected get items(): TopNavItem[] {
        return this._items;
    }

    protected set items(items: TopNavItem[]) {
        if (items === this.items) return;
        this._items.forEach((item) => {
            this.resizeController.unobserve(item);
        });
        items.forEach((item) => {
            this.resizeController.observe(item);
        });
        this._items = items;
    }

    private _items: TopNavItem[] = [];

    protected resizeController = new ResizeController(this, {
        callback: () => {
            this.updateSelectionIndicator();
        },
    });

    private manageItems(): void {
        this.items = this.slotEl
            .assignedElements({ flatten: true })
            .filter((el) => el.localName === 'sp-top-nav-item') as TopNavItem[];
        let { href } = window.location;
        const ignoredURLParts = this.ignoreURLParts.split(' ');
        if (ignoredURLParts.includes('hash')) {
            href = href.replace(window.location.hash, '');
        }
        if (ignoredURLParts.includes('search')) {
            href = href.replace(window.location.search, '');
        }
        const selectedChild = this.items.find((item) => item.value === href);
        if (selectedChild) {
            this.selectTarget(selectedChild);
        } else {
            this.selected = '';
        }
    }

    protected override render(): TemplateResult {
        return html`
            <div @click=${this.onClick} id="list">
                <slot @slotchange=${this.onSlotChange}></slot>
                <div
                    id="selection-indicator"
                    class=${ifDefined(
                        this.shouldAnimate ? undefined : 'first-position'
                    )}
                    style=${this.selectionIndicatorStyle}
                ></div>
            </div>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('direction', 'horizontal');
        this.setAttribute('role', 'navigation');
    }

    protected override updated(changes: PropertyValues): void {
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
        if (
            changes.has('label') &&
            (this.label || typeof changes.get('label') !== 'undefined')
        ) {
            if (this.label.length) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
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
        const { width } = selectedItem.getBoundingClientRect();
        this.selectionIndicatorStyle = ScaledIndicator.transformX(
            selectedItem.offsetLeft,
            width
        );
    };

    public override connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('resize', this.updateSelectionIndicator);
        if ('fonts' in document) {
            document.fonts.addEventListener(
                'loadingdone',
                this.updateSelectionIndicator
            );
        }
    }

    public override disconnectedCallback(): void {
        window.removeEventListener('resize', this.updateSelectionIndicator);
        if ('fonts' in document) {
            (
                document as unknown as {
                    fonts: {
                        removeEventListener: (
                            name: string,
                            callback: () => void
                        ) => void;
                    };
                }
            ).fonts.removeEventListener(
                'loadingdone',
                this.updateSelectionIndicator
            );
        }
        super.disconnectedCallback();
    }
}
