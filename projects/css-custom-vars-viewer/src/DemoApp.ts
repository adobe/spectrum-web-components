/* eslint-disable @typescript-eslint/no-unused-vars */
/*
Copyright 2023 Adobe. All rights reserved.
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
    css,
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

export class DemoApp extends SpectrumElement {
    static styles = css`
        :host {
            display: block;
            padding: 25px;
        }
        .picker-container {
            display: flex;
            align-items: center;
            padding-bottom: 4px;
        }
        sp-swatch-group {
            padding: 4px;
        }
        sp-css-table sp-table-body {
            height: 530px; // this isn't applied, sadly...
        }
    `;

    @property({ type: String })
    public theme = 'light';

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
        const picker = event.target as Picker;
        this.theme = picker.value;
    };

    protected handleSwatchSelect = (event: Event): void => {
        const swatchGroup = event.target as SwatchGroup;
        const colorSelection = swatchGroup.selected;
        const newSelections: Item[] = [];

        // I'd like to apologise for the following programming nightmare:
        if (colorSelection.length === 0) {
            this.colors = this._colors;
        } else {
            colorSelection.forEach(selection => {
                const selectedColors = [
                    ...this._colors.filter(
                        color => color.customVar.search(selection) > -1
                    ),
                ];
                newSelections.unshift(...selectedColors);
            });
            this.colors = newSelections;
        }
    };

    protected render(): TemplateResult {
        return html`
            <div class="picker-container">
                <sp-field-label
                    for="theme-picker"
                    size="m"
                    side-aligned="start"
                >
                    Theme:
                </sp-field-label>
                <sp-picker
                    id="theme-picker"
                    label="Select a theme"
                    size="m"
                    value="light"
                    quiet
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
                    color="var(--spectrum-global-color-gray-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="red"
                    color="var(--spectrum-global-color-red-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="orange"
                    color="var(--spectrum-global-color-orange-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="yellow"
                    color="var(--spectrum-global-color-yellow-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="chartreuse"
                    color="var(--spectrum-global-color-chartreuse-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="celery"
                    color="var(--spectrum-global-color-celery-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="green"
                    color="var(--spectrum-global-color-green-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="seafoam"
                    color="var(--spectrum-global-color-seafoam-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="blue"
                    color="var(--spectrum-global-color-blue-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="indigo"
                    color="var(--spectrum-global-color-indigo-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="purple"
                    color="var(--spectrum-global-color-purple-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="fuchsia"
                    color="var(--spectrum-global-color-fuchsia-500)"
                ></sp-swatch>
                <sp-swatch
                    border="none"
                    value="magenta"
                    color="var(--spectrum-global-color-magenta-500)"
                ></sp-swatch>
            </sp-swatch-group>
            <sp-css-table
                .items=${this.colors}
                color-theme=${this.theme}
            ></sp-css-table>
        `;
    }
}
