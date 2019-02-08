/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, LitElement, property } from 'lit-element';

import { defineCustomElements, FieldButton, Popover, Menu } from '../index.js';

import dropdownSkinStyles from './dropdown-skin.css.js';
import dropdownStyles from './dropdown.css.js';

export class Dropdown extends LitElement {
    public static is = 'sp-dropdown';

    public static get styles() {
        return [dropdownStyles, dropdownSkinStyles];
    }

    constructor() {
        super();

        defineCustomElements(FieldButton, Popover, Menu);
    }

    @property({ reflect: true })
    public selected = '';

    @property({ reflect: true })
    public selectedLabel = '';

    @property({ reflect: true, attribute: 'id-attribute' })
    public idAttribute = 'data-id';

    @property({ type: Boolean, reflect: true })
    public active = false;

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property()
    public placeholder = 'Select an option';

    private selectedElement?: Element;

    public onClick(ev: Event) {
        this.active = !this.active;
    }

    public onMouseDown(ev: Event) {
        ev.preventDefault();
        ev.stopPropagation();
    }

    public onSelect(ev: CustomEvent) {
        this.selected = ev.detail.dataId;
        this.selectedLabel = ev.detail.label;
        this.active = false;

        const dropdownEvent = new CustomEvent('dropdown-select', {
            bubbles: true,
            composed: true,
            detail: ev.detail,
        });

        this.setMenuItemAttribute();

        this.dispatchEvent(dropdownEvent);
    }

    public onBlur(ev: Event) {
        this.active = false;
    }

    protected render() {
        return html`
            <sp-field-button
                ?select=${this.active}
                ?quiet=${this.quiet}
                @click=${this.onClick}
                @mousedown=${this.onMouseDown}
            >
                <div id="label" ?is-placeholder=${!this.selectedLabel.length}>
                    ${this.label}
                </div>
                <svg slot="icon" id="chevron">
                    <use xlink:href="dropdown-icon.svg#icon" />
                </svg>
            </sp-field-button>
            <sp-popover ?open=${this.active} @blur=${this.onBlur}>
                <sp-menu @click=${this.onSelect}><slot></slot></sp-menu>
            </sp-popover>
        `;
    }

    private setMenuItemAttribute() {
        if (this.selectedElement) {
            this.selectedElement.removeAttribute('select');
        }

        const newSelectedElement = document.querySelector(
            `sp-menu-item[${this.idAttribute} = "${this.selected}"]`
        );

        console.log(newSelectedElement);
        console.log(this.idAttribute);
        console.log(this.selected);

        if (newSelectedElement) {
            this.selectedElement = newSelectedElement;
            this.selectedElement.setAttribute('select', 'true');
        }
    }

    private get label(): string {
        if (!this.selectedLabel.length) {
            return this.placeholder;
        }
        return this.selectedLabel;
    }
}
