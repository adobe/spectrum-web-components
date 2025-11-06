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
    ElementSize,
    html,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    queryAssignedElements,
} from '@spectrum-web-components/base/src/decorators.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';

import styles from './swatch-group.css.js';
import type {
    Swatch,
    SwatchBorder,
    SwatchRounding,
    SwatchShape,
} from './Swatch.js';

export type SwatchGroupSizes = Exclude<ElementSize, 'xxs' | 'xl' | 'xxl'>;
export type SwatchSelects = 'single' | 'multiple' | undefined;

/**
 * @element sp-swatch-group
 *
 * @slot - Swatch elements to manage as a group
 */
export class SwatchGroup extends SizedMixin(SpectrumElement, {
    validSizes: ['xs', 's', 'm', 'l'],
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ reflect: true })
    public border: SwatchBorder;

    @property({ reflect: true })
    public density: 'compact' | 'spacious' | undefined;

    @property({ reflect: true })
    public rounding: SwatchRounding;

    @property({ type: Array })
    public get selected(): string[] {
        return this._selected;
    }

    public set selected(selected: string[]) {
        if (selected === this.selected) return;

        const oldSelected = this.selected;
        this._selected = selected;
        this.requestUpdate('selected', oldSelected);
    }

    // Specifically surface `_selected` internally so that change can be made to this value internally
    // without triggering the update lifecycle directly.
    private _selected: string[] = [];

    @property()
    public selects: SwatchSelects;

    private selectedSet = new Set<string>();

    @property({ reflect: true })
    public shape: SwatchShape;

    @queryAssignedElements({ flatten: true })
    public swatches!: Swatch[];

    constructor() {
        super();

        new MutationController(this, {
            config: {
                attributes: true,
                childList: true,
                subtree: true,
            },
            callback: () => {
                this.manageChange();
            },
        });
    }

    rovingTabindexController = new RovingTabindexController<Swatch>(this, {
        focusInIndex: (elements: Swatch[]) => {
            let firstEnabledIndex = -1;
            const firstSelectedIndex = elements.findIndex((el, index) => {
                if (!elements[firstEnabledIndex] && !el.disabled) {
                    firstEnabledIndex = index;
                }
                return el.selected && !el.disabled;
            });
            return elements[firstSelectedIndex]
                ? firstSelectedIndex
                : firstEnabledIndex;
        },
        elements: () => this.swatches,
        isFocusableElement: (el: Swatch) => !el.disabled,
    });

    public override focus(options?: FocusOptions): void {
        this.rovingTabindexController.focus(options);
    }

    protected handleChange(event: Event & { target: Swatch }): void {
        event.stopPropagation();
        const oldSelected = this.selected;
        if (!this.selects) {
            event.preventDefault();
            return;
        }
        if (this.selects === 'single') {
            const { target } = event;
            target.tabIndex = 0;
            target.selected = true;
            if (this.selectedSet.has(target.value)) {
                return;
            }
            this.selectedSet.clear();
            this.selectedSet.add(target.value);
            this.rovingTabindexController.elements.forEach((child) => {
                if (child === target) return;
                child.selected = false;
            });
        } else if (this.selects === 'multiple') {
            const { target } = event;
            if (target.selected) {
                this.selectedSet.add(target.value);
            } else {
                this.selectedSet.delete(target.value);
            }
        }
        this._selected = [...this.selectedSet];
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
                bubbles: true,
            })
        );
        if (!applyDefault) {
            this._selected = oldSelected;
            event.preventDefault();
        }
    }

    private manageChange = async (): Promise<void> => {
        const presentSet = new Set();
        this.selectedSet = new Set(this.selected);
        await Promise.all(this.swatches.map((swatch) => swatch.updateComplete));
        this.swatches.forEach((swatch) => {
            presentSet.add(swatch.value);
            if (swatch.selected) {
                this.selectedSet.add(swatch.value);
            }
        });
        this.selectedSet.forEach((value) => {
            if (!presentSet.has(value)) {
                this.selectedSet.delete(value);
            }
        });
        this._selected = [...this.selectedSet];
        this.rovingTabindexController.clearElementCache();
    };

    private getPassthroughSwatchActions(
        changes: PropertyValues
    ): ((swatch: Swatch) => void)[] {
        const targetValues: {
            border?: SwatchBorder;
            rounding?: SwatchRounding;
            shape?: SwatchShape;
            size?: SwatchGroupSizes;
            selects?: SwatchSelects;
        } = {};
        if (
            changes.has('selects') &&
            (this.selects || typeof changes.get('selects') !== 'undefined')
        ) {
            targetValues.selects = this.selects;
        }
        if (
            changes.has('border') &&
            (this.border || typeof changes.get('border') !== 'undefined')
        ) {
            targetValues.border = this.border;
        }
        if (
            changes.has('rounding') &&
            (this.rounding || typeof changes.get('rounding') !== 'undefined')
        ) {
            targetValues.rounding = this.rounding;
        }
        if (
            changes.has('size') &&
            (this.size !== 'm' || typeof changes.get('size') !== 'undefined')
        ) {
            targetValues.size = this.size as SwatchGroupSizes;
        }
        if (
            changes.has('shape') &&
            (this.shape || typeof changes.get('shape') !== 'undefined')
        ) {
            targetValues.shape = this.shape;
        }
        const passThroughSwatchActions: ((swatch: Swatch) => void)[] = [];
        if (Object.keys(targetValues).length) {
            passThroughSwatchActions.push((swatch) => {
                if (window.__swc.DEBUG) {
                    if (
                        'selects' in targetValues &&
                        targetValues.selects !== 'multiple' &&
                        swatch.mixedValue
                    ) {
                        window.__swc.warn(
                            this,
                            `<sp-swatch> elements can only leverage the "mixed-value" attribute when their <sp-swatch-group> parent element is also leveraging "selects="multiple""`,
                            'https://opensource.adobe.com/spectrum-web-components/components/swatch-group/#multiple',
                            {
                                type: 'accessibility',
                            }
                        );
                    }
                }
                if ('border' in targetValues)
                    swatch.border = targetValues.border;
                if ('rounding' in targetValues)
                    swatch.rounding = targetValues.rounding;
                if ('shape' in targetValues) swatch.shape = targetValues.shape;
                if ('size' in targetValues)
                    swatch.size = targetValues.size as SwatchGroupSizes;
            });
        }
        return passThroughSwatchActions;
    }

    private getSelectionSwatchActions(
        changes: PropertyValues
    ): ((swatch: Swatch) => void)[] {
        const selectionSwatchActions: ((swatch: Swatch) => void)[] = [];
        if (!changes.has('selects')) return selectionSwatchActions;
        if (this.selects) {
            this.setAttribute(
                'role',
                this.selects === 'single' ? 'radiogroup' : 'group'
            );
        } else {
            this.removeAttribute('role');
        }
        const swatchRoles = {
            single: 'radio',
            multiple: 'checkbox',
        };
        const swatchRole = this.selects ? swatchRoles[this.selects] : 'button';
        selectionSwatchActions.push((swatch) => {
            swatch.setAttribute('role', swatchRole);
        });
        return selectionSwatchActions;
    }

    protected override render(): TemplateResult {
        return html`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.manageChange}
            ></slot>
        `;
    }

    protected override willUpdate(changes: PropertyValues<this>): void {
        const swatchActions = [
            ...this.getPassthroughSwatchActions(changes),
            ...this.getSelectionSwatchActions(changes),
        ];

        // Create Swatch actions that build state to be applied later.
        let nextSelected = new Set(this.selected);
        const currentValues = new Set();
        if (changes.has('selected')) {
            swatchActions.push((swatch) => {
                currentValues.add(swatch.value);
                if (
                    nextSelected.has(swatch.value) ||
                    (!this.hasUpdated && swatch.selected)
                ) {
                    swatch.selected = true;
                } else {
                    swatch.selected = false;
                }
            });
        }

        const doActions = (): void => {
            nextSelected = new Set(this.selected);

            // Do Swatch actions to each Swatch in the collection.
            this.swatches.forEach((swatch) => {
                swatchActions.forEach((action) => {
                    action(swatch);
                });
            });

            // Apply state built in actions back to the Swatch Group
            if (changes.has('selected')) {
                this._selected = [...nextSelected.values()].filter(
                    (selectedValue) => currentValues.has(selectedValue)
                );
            }
        };

        if (this.hasUpdated) {
            // Do actions immediately when the element has already updated.
            doActions();
        } else {
            // On first update wait for a `slotchange` event, which is not currently managed
            // by the element lifecycle before allowing Swatch actions to be commited.
            this.shadowRoot.addEventListener(
                'slotchange',
                () => {
                    requestAnimationFrame(doActions);
                },
                { once: true }
            );
        }
    }
}
