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
import { IconsetAddedDetail } from './';
import {
    SpectrumElement,
    css,
    html,
    TemplateResult,
    CSSResult,
    property,
    customElement,
} from '@spectrum-web-components/base';
import '@spectrum-web-components/icon/sp-icon.js';

@customElement('icons-demo')
export class IconsDemo extends SpectrumElement {
    @property()
    public name = 'ui';

    private iconset: string[] = [];
    public constructor() {
        super();
        this.iconset = [];
        this.handleIconSetAdded = this.handleIconSetAdded.bind(this);
    }
    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('sp-iconset-added', this.handleIconSetAdded);
    }
    public disconnectedCallback(): void {
        window.removeEventListener('sp-iconset-added', this.handleIconSetAdded);
        super.disconnectedCallback();
    }
    public handleIconSetAdded(event: CustomEvent<IconsetAddedDetail>): void {
        const { iconset } = event.detail;
        this.iconset = iconset.getIconList();
        this.requestUpdate();
    }
    public static get styles(): CSSResult[] {
        return [
            css`
                :host {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 20px;
                }
                .icon {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                sp-icon {
                    margin-bottom: 10px;
                }
            `,
        ];
    }
    protected render(): TemplateResult {
        return html`
            <slot></slot>
            ${this.iconset.map(
                (icon) => html`
                    <div class="icon">
                        <sp-icon
                            size="l"
                            name=${`${this.name}:${icon}`}
                        ></sp-icon>
                        ${icon}
                    </div>
                `
            )}
        `;
    }
}
