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
import { storiesOf } from '@storybook/polymer';
import { html, TemplateResult } from 'lit-html';

import '../lib';
import '@spectrum-web-components/icon';
import { IconsetAddedDetail } from '@spectrum-web-components/iconset';
import { LitElement, css, CSSResult } from 'lit-element';
import { color } from '@storybook/addon-knobs';

class IconsDemo extends LitElement {
    private iconset: string[] = [];
    public constructor() {
        super();
        this.iconset = [];
        this.handleIconSetAdded = this.handleIconSetAdded.bind(this);
    }
    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('sp-iconset:added', this.handleIconSetAdded);
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
                        <sp-icon size="l" name=${`ui:${icon}`}></sp-icon>
                        ${icon}
                    </div>
                `
            )}
        `;
    }
}

customElements.define('icons-demo', IconsDemo);

storiesOf('Icons', module)
    .add(
        'List - Medium',
        () => html`
            <icons-demo style="color: ${color('Color', '#000', 'Element')}">
                <sp-icons-medium></sp-icons-medium>
            </icons-demo>
        `
    )
    .add(
        'List - Large',
        () => html`
            <icons-demo style="color: ${color('Color', '#000', 'Element')}">
                <sp-icons-large></sp-icons-large>
            </icons-demo>
        `
    );
