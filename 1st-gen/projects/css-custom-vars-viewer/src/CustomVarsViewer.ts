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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/swatch/sp-swatch.js';
import '@spectrum-web-components/swatch/sp-swatch-group.js';
import { Picker } from '@spectrum-web-components/picker';
import { SwatchGroup } from '@spectrum-web-components/swatch';
import { TableItem } from '@spectrum-web-components/table';
import {
    blueValues,
    celeryValues,
    chartreuseValues,
    cyanValues,
    fuchsiaValues,
    grayValues,
    greenValues,
    indigoValues,
    magentaValues,
    orangeValues,
    purpleValues,
    redValues,
    seafoamValues,
    yellowValues,
} from './parsed-data.js';
import './sp-css-table.js';

export interface Item extends TableItem {
    customVar: string;
    sets: {
        light: string;
        dark: string;
        darkest: string;
        wireframe: string;
    };
}

export class CustomVarsViewer extends SpectrumElement {
    static override styles = css`
        :host {
            display: block;
            padding: var(--spectrum-spacing-200);
        }
        .picker-container {
            padding-bottom: var(--spectrum-component-edge-to-visual-only-75);
        }
        sp-swatch-group {
            padding: var(--spectrum-spacing-200);
        }
    `;

    @property({ type: String })
    public themeColor = 'light';

    @property({ type: Array })
    public colors: Item[] = [];

    constructor() {
        super();
        this.colors = this._colors;
    }

    private _colors: Item[] = [
        ...redValues,
        ...orangeValues,
        ...yellowValues,
        ...chartreuseValues,
        ...celeryValues,
        ...greenValues,
        ...seafoamValues,
        ...cyanValues,
        ...blueValues,
        ...indigoValues,
        ...purpleValues,
        ...fuchsiaValues,
        ...magentaValues,
        ...grayValues,
    ];

    protected handlePicker = (event: Event): void => {
        this.themeColor = (event.target as Picker).value as string;
    };

    protected handleSwatchSelect = (event: Event): void => {
        const swatchGroup = event.target as SwatchGroup;
        const colorSelection = swatchGroup.selected;
        const newSelections: Item[] = [];

        // I'd like to apologise for the following programming nightmare:
        if (colorSelection.length === 0) {
            this.colors = this._colors;
        } else {
            colorSelection.forEach((selection) => {
                const selectedColors = [
                    ...this._colors.filter(
                        (color) => color.customVar.search(selection) > -1
                    ),
                ];
                newSelections.unshift(...selectedColors);
            });
            this.colors = newSelections;
        }
    };

    protected override render(): TemplateResult {
        return html`
            <div class="picker-container">
                <sp-field-label
                    for="theme-picker"
                    size="m"
                    side-aligned="start"
                >
                    Theme color:
                </sp-field-label>
                <sp-picker
                    id="theme-picker"
                    label="Select a theme"
                    size="m"
                    value=${this.themeColor}
                    @change=${this.handlePicker}
                >
                    <sp-menu-item value="light">Light</sp-menu-item>
                    <sp-menu-item value="dark">Dark</sp-menu-item>
                    <sp-menu-item value="darkest">Darkest</sp-menu-item>
                    <sp-menu-item value="wireframe">Wireframe</sp-menu-item>
                </sp-picker>
            </div>
            <sp-swatch-group
                size="m"
                selects="multiple"
                @change=${this.handleSwatchSelect}
            >
                <sp-swatch
                    border="none"
                    value="gray"
                    color="var(--spectrum-gray-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="red"
                    color="var(--spectrum-red-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="orange"
                    color="var(--spectrum-orange-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="yellow"
                    color="var(--spectrum-yellow-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="chartreuse"
                    color="var(--spectrum-chartreuse-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="celery"
                    color="var(--spectrum-celery-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="green"
                    color="var(--spectrum-green-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="seafoam"
                    color="var(--spectrum-seafoam-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="blue"
                    color="var(--spectrum-blue-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="indigo"
                    color="var(--spectrum-indigo-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="purple"
                    color="var(--spectrum-purple-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="fuchsia"
                    color="var(--spectrum-fuchsia-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="magenta"
                    color="var(--spectrum-magenta-500)"
                ></sp-swatch>
            </sp-swatch-group>
            <sp-css-table
                .items=${this.colors}
                color-theme=${this.themeColor}
            ></sp-css-table>
        `;
    }
}
