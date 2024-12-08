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

import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';

import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/button/sp-button.js';
import { SpectrumMixin } from '@spectrum-web-components/base';

enum BlendModeValue {
    normal = 2,
    multiply = 3,
    screen = 7,
}

interface BlendModeOption {
    value: BlendModeValue;
    title: string;
    subtitle: string;
    thumbnail: string;
}

const XElement = SpectrumMixin(LitElement);

class MyContainer extends XElement {
    @state()
    private _counter = 0;

    private _handleClick(): void {
        this._counter += 1;
    }

    protected override render(): TemplateResult {
        return html`
            <div>
                ${when(
                    this._counter % 2 === 0,
                    () => html`
                        <my-view1></my-view1>
                    `,
                    () => html`
                        <my-view2></my-view2>
                    `
                )}
                <sp-button
                    variant="primary"
                    size="m"
                    @click=${this._handleClick}
                >
                    Switch views
                </sp-button>
            </div>
        `;
    }
}

customElements.define('my-container', MyContainer);

class MyView1 extends XElement {
    protected override render(): TemplateResult {
        const blendModeOptions = [
            {
                value: BlendModeValue.normal,
                title: 'Normal 1',
                subtitle: 'No effect applied',
            },
            {
                value: BlendModeValue.multiply,
                title: 'Multiply',
                subtitle: 'Darken shadows with contrast and details',
            },
            {
                value: BlendModeValue.screen,
                title: 'Screen',
                subtitle: 'Brighten highlights with contrast and details',
            },
        ];
        return html`
            View 1
            <my-picker
                .blendMode=${BlendModeValue.normal}
                .blendModeOptions=${blendModeOptions}
                dir="ltr"
            ></my-picker>
        `;
    }
}

customElements.define('my-view1', MyView1);

class MyView2 extends XElement {
    protected override render(): TemplateResult {
        const blendModeOptions = [
            {
                value: BlendModeValue.normal,
                title: 'Normal 2',
                subtitle: 'No effect applied',
            },
            {
                value: BlendModeValue.multiply,
                title: 'Multiply',
                subtitle: 'Darken shadows with contrast and details',
            },
            {
                value: BlendModeValue.screen,
                title: 'Screen',
                subtitle: 'Brighten highlights with contrast and details',
            },
        ];
        return html`
            View 2
            <my-picker
                .blendMode=${BlendModeValue.normal}
                .blendModeOptions=${blendModeOptions}
            ></my-picker>
        `;
    }
}

customElements.define('my-view2', MyView2);

class MyPicker extends XElement {
    @property({ type: Array })
    public blendModeOptions: BlendModeOption[] = [];

    @property()
    public blendMode: number = BlendModeValue.normal;

    private _renderBlendOptions(): TemplateResult {
        return html`
            ${repeat(
                this.blendModeOptions,
                // This is intentional so that repeat directive will add instead of
                // update existing DOM which will then trigger error in
                // MenuItem.childrenItem
                // Using .value for the key will workaround the issue
                (blendModeOption) => blendModeOption,
                (blendModeOption: BlendModeOption) => html`
                    <sp-menu-item value=${blendModeOption.value}>
                        ${blendModeOption.title}
                        <span slot="value">${blendModeOption.subtitle}</span>
                    </sp-menu-item>
                `
            )}
        `;
    }
    protected override render(): TemplateResult {
        return html`
            <sp-picker
                id="blendMode"
                size="l"
                label="Blend"
                value=${this.blendMode}
            >
                ${this._renderBlendOptions()}
            </sp-picker>
        `;
    }
}

customElements.define('my-picker', MyPicker);

export default {
    component: 'sp-menu-item',
    title: 'Menu Item/Disconnected',
};

export const disconnectedChildItems = (): TemplateResult => html`
    <my-container></my-container>
`;

disconnectedChildItems.swc_vrt = {
    skip: true,
};

disconnectedChildItems.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};
