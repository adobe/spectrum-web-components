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
    SpectrumElement,
    html,
    CSSResultArray,
    property,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import sideNavStyles from './side-nav.css';
import { SideNavSearch } from './side-nav-search.js';
import { Underlay } from '@spectrum-web-components/underlay';
import { ifDefined } from '@spectrum-web-components/base';

export class DocsSideNav extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [sideNavStyles];
    }

    public static elementDefinitions = {
        'sp-underlay': Underlay,
        'docs-search': SideNavSearch,
    };

    @property({ type: Boolean, reflect: true })
    public open = false;

    public toggle() {
        this.open = !this.open;
    }

    public focus() {
        const target = document.querySelector(
            '[slot="logo"]'
        ) as HTMLAnchorElement;
        if (!target) {
            (
                this.shadowRoot!.querySelector('#logo')! as HTMLAnchorElement
            ).focus();
            return;
        }
        target.focus();
    }

    render(): TemplateResult {
        return html`
            <sp-underlay
                class="scrim"
                @click=${this.toggle}
                ?open=${this.open}
            ></sp-underlay>
            <aside>
                <div id="nav-header">
                    <div id="logo-container">
                        <slot name="logo"></slot>
                    </div>
                    <docs-search
                        tabindex=${ifDefined(!this.open ? -1 : undefined)}
                    ></docs-search>
                </div>
                <div class="navigation">
                    <slot></slot>
                </div>
            </aside>
        `;
    }

    updated(changes: PropertyValues) {
        if (changes.has('open') && !this.open && changes.get('open')) {
            this.dispatchEvent(new Event('close'));
        }
    }
}
