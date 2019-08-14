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
import { html } from 'lit-html';

import '../src/icon';
import { defineCustomElements } from '../src/define';
import * as MediumIcons from '../src/icons/icons-medium';
import * as LargeIcons from '../src/icons/icons-large';
import { LitElement, property, css } from 'lit-element';
import { Iconset } from '../src/iconset/iconset';

defineCustomElements(
    ...Object.values(MediumIcons),
    ...Object.values(LargeIcons)
);

class IconsDemo extends LitElement {
    constructor() {
        super();
        this.iconset = [];
        this.handleIconSetAdded = this.handleIconSetAdded.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('sp-iconset:added', this.handleIconSetAdded);
    }
    handleIconSetAdded({ detail: { iconset } }) {
        this.iconset = [...iconset.iconMap.keys()];
        this.requestUpdate();
    }
    static get styles() {
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
    render() {
        return html`
            <sp-icons-large></sp-icons-large>
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
    .add('Medium', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-icon size="xxs" name="ui:Magnifier"></sp-icon>
            <sp-icon size="xs" name="ui:Magnifier"></sp-icon>
            <sp-icon size="s" name="ui:Magnifier"></sp-icon>
            <sp-icon size="m" name="ui:Magnifier"></sp-icon>
            <sp-icon size="l" name="ui:Magnifier"></sp-icon>
            <sp-icon size="xl" name="ui:Magnifier"></sp-icon>
            <sp-icon size="xxl" name="ui:Magnifier"></sp-icon>
        `;
    })
    .add('Large', () => {
        return html`
            <sp-icons-large></sp-icons-large>
            <sp-icon size="xxs" name="ui:Magnifier"></sp-icon>
            <sp-icon size="xs" name="ui:Magnifier"></sp-icon>
            <sp-icon size="s" name="ui:Magnifier"></sp-icon>
            <sp-icon size="m" name="ui:Magnifier"></sp-icon>
            <sp-icon size="l" name="ui:Magnifier"></sp-icon>
            <sp-icon size="xl" name="ui:Magnifier"></sp-icon>
            <sp-icon size="xxl" name="ui:Magnifier"></sp-icon>
        `;
    })
    .add('All Medium', () => {
        return html`
            <icons-demo></icons-demo>
        `;
    });
