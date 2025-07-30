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
    css,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import type {
    SortedEventDetails,
    TableItem,
} from '@spectrum-web-components/table';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/table/elements.js';

export interface Item extends TableItem {
    customVar: string;
    sets: {
        light: string;
        dark: string;
        darkest: string;
        wireframe: string;
    };
}

export class CssTable extends SpectrumElement {
    static override styles = css`
        .table-head {
            align-items: center;
        }
        sp-toast {
            position: fixed;
            z-index: 300;
            bottom: var(--spectrum-spacing-400);
            left: 50%;
            transform: translateX(-50%);
        }
        sp-table {
            height: calc(var(--spectrum-spacing-1000) * 5);
        }
        sp-swatch {
            pointer-events: none;
        }
    `;

    @state()
    copyTimeout?: number;

    @property({ type: String })
    copiedText = '';

    @property({ type: String, attribute: 'color-theme' })
    colorTheme: 'light' | 'dark' | 'darkest' | 'wireframe' = 'light';

    @property({ type: Array })
    public items: Item[] = [];

    private async copyText(text: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('unable to access clipboard');
        }
        this.copiedText = text;
        clearTimeout(this.copyTimeout);
        this.copyTimeout = setTimeout(() => {
            this.copyTimeout = undefined;
        }, 4000) as unknown as number;
    }

    private compareItems =
        (sortKey: 'customVar', sortDirection: 'asc' | 'desc') =>
        (
            a: {
                customVar: string;
                sets: object;
            },
            b: {
                customVar: string;
                sets: object;
            }
        ): number => {
            const doSortKey = sortKey;

            const first = a[doSortKey];
            const second = b[doSortKey];
            return sortDirection === 'asc'
                ? first.localeCompare(second, 'en-u-kn-true')
                : second.localeCompare(first, 'en-u-kn-true');
        };

    public renderItem = (item: Item): TemplateResult => {
        const splitVarName = item.customVar.substring(11);
        const splitColourName = splitVarName.split('-').join(' ');
        const colourName =
            splitColourName.charAt(0).toUpperCase() +
            splitColourName.substring(1);

        if (!this.colorTheme) {
            return html``;
        }
        return html`
            <sp-table-cell>
                <sp-swatch
                    color=${String(item.sets[this.colorTheme])}
                    size="s"
                ></sp-swatch>
            </sp-table-cell>
            <sp-table-cell>${colourName}</sp-table-cell>
            <sp-table-cell>
                <sp-link quiet @click=${() => this.copyText(item.customVar)}>
                    ${item.customVar}
                </sp-link>
            </sp-table-cell>
            <sp-table-cell>
                <sp-link
                    quiet
                    @click=${() => this.copyText(item.sets[this.colorTheme])}
                >
                    ${item.sets[this.colorTheme]}
                </sp-link>
            </sp-table-cell>
        `;
    };

    protected override render(): TemplateResult {
        return html`
            <sp-table
                size="m"
                scroller="true"
                .items=${this.items}
                .renderItem=${this.renderItem}
                @sorted=${(event: CustomEvent<SortedEventDetails>): void => {
                    const { sortKey, sortDirection } = event.detail;
                    const items = [...this.items];
                    items.sort(
                        this.compareItems(sortKey as 'customVar', sortDirection)
                    );
                    this.items = items;
                }}
            >
                <sp-table-head class="table-head">
                    <sp-table-head-cell>Preview</sp-table-head-cell>
                    <sp-table-head-cell
                        sortable
                        sort-key="customVar"
                        sort-direction="asc"
                    >
                        Colour name
                    </sp-table-head-cell>
                    <sp-table-head-cell>Token</sp-table-head-cell>
                    <sp-table-head-cell>RGB Value</sp-table-head-cell>
                </sp-table-head>
            </sp-table>
            <sp-toast ?open=${this.copyTimeout != null} variant="positive">
                ${this.copiedText} copied to clipboard
            </sp-toast>
        `;
    }

    protected override willUpdate(_changedProperties: PropertyValues): void {
        // THIS IS A HACK!! Virtualiser needs a kick in the pants to rerender the items
        if (_changedProperties.has('colorTheme')) {
            this.items = [...this.items];
        }
    }
}
