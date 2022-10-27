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
    adoptStyles,
    CSSResultArray,
    html,
    PropertyValues,
    ReactiveElement,
    render,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { LitVirtualizer } from '@lit-labs/virtualizer/LitVirtualizer.js';
import { grid } from '@lit-labs/virtualizer/layouts/grid.js';
import styles from './grid.css.js';
import { GridController } from './GridController.js';

/**
 * @element sp-grid
 *
 * @fires change - Announces that the value of `selected` has changed
 */
export class Grid extends LitVirtualizer {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: String })
    public focusableSelector!: string;

    @property({ type: String })
    public gap: `${'0' | `${number}px`}` = '0';

    @property({ type: String })
    public padding: `${'0' | `${number}px`}` | undefined;

    @property({ type: Array })
    public override items: Record<string, unknown>[] = [];

    @property({ type: Object })
    public itemSize: {
        width: number;
        height: number;
    } = {
        width: 200,
        height: 200,
    };

    /* c8 ignore next 3 */
    override get renderItem(): (
        item: unknown,
        index: number
    ) => TemplateResult {
        return super.renderItem;
    }

    override set renderItem(
        fn: (item: unknown, index: number, selected: boolean) => TemplateResult
    ) {
        super.renderItem = (item, index: number): TemplateResult => {
            const selected = this.selected.includes(
                item as Record<string, unknown>
            );
            return fn(item, index, selected);
        };
    }

    @property({ type: Array })
    public selected: Record<string, unknown>[] = [];

    gridController = new GridController<HTMLElement>(this, {
        elements: () => [],
        itemSize: () => this.itemSize,
        /* c8 ignore next 2 */
        gap: () => this.gap,
        padding: () => this.padding || this.gap,
    });

    protected handleChange(event: Event): void {
        const target = event.target as HTMLElement;
        const value = this.items[
            parseFloat(target.getAttribute('key') || '')
        ] as Record<string, unknown>;
        const selected: Record<string, unknown>[] = [...this.selected];
        if (!selected.includes(value)) {
            selected.push(value);
        } else {
            const index = selected.indexOf(value);
            if (index > -1) {
                selected.splice(index, 1);
            }
        }
        this.selected = selected;
    }

    public override createRenderRoot(): this {
        const renderRoot =
            this.shadowRoot ??
            this.attachShadow(
                (this.constructor as typeof ReactiveElement).shadowRootOptions
            );
        adoptStyles(
            renderRoot,
            (this.constructor as typeof ReactiveElement).elementStyles
        );
        return renderRoot as unknown as this;
    }

    public override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected override update(changes: PropertyValues<this>): void {
        if (
            changes.has('itemSize') ||
            changes.has('gap') ||
            changes.has('padding') ||
            changes.has('focusableSelector')
        ) {
            this.updateComplete.then(() => {
                this.gridController.update({
                    elements: () => [
                        ...this.querySelectorAll<HTMLElement>(
                            this.focusableSelector
                        ),
                    ],
                    itemSize: () => this.itemSize,
                    gap: () => this.gap,
                    padding: () => this.padding || this.gap,
                });
            });

            this.layout = grid({
                itemSize: {
                    width: `${this.itemSize.width}px`,
                    height: `${this.itemSize.height}px`,
                },
                gap: this.gap,
                padding: this.padding || this.gap,
            });
        }

        if (this.isConnected) {
            render(super.render(), this);
        }
        super.update(changes);
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('change', this.handleChange, { capture: true });
    }

    override disconnectedCallback(): void {
        this.removeEventListener('change', this.handleChange, {
            capture: true,
        });
        super.disconnectedCallback();
    }
}
