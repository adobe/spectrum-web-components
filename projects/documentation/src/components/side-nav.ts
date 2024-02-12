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
    CSSResultArray,
    html,
    LitElement,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    customElement,
    property,
} from '@spectrum-web-components/base/src/decorators.js';
import './side-nav-search.js';
import sideNavStyles from './side-nav.css';
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/underlay/sp-underlay.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

@customElement('docs-side-nav')
export class SideNav extends LitElement {
    public static override get styles(): CSSResultArray {
        return [sideNavStyles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    public toggle(event: MouseEvent | KeyboardEvent) {
        if (
            event.type === 'keydown' &&
            (event as KeyboardEvent).code !== 'Enter' &&
            (event as KeyboardEvent).code !== 'Space'
        ) {
            return;
        }
        this.open = !this.open;
    }

    handleKeydown = (event: KeyboardEvent) => {
        if (
            event.code === 'Escape' &&
            (event.target! as Element).closest(
                '[role="listbox"],[role="menu"]'
            ) === null
        ) {
            this.open = false;
        }
    };

    public override focus() {
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

    override render(): TemplateResult {
        return html`
            <sp-underlay
                class="scrim"
                @close=${this.toggle}
                ?open=${this.open}
            ></sp-underlay>
            <aside>
                <div id="nav-header">
                    <div id="logo-container">
                        <slot name="logo"></slot>
                    </div>
                    <docs-search
                        tabindex=${ifDefined(
                            !this.open &&
                                matchMedia('(max-width: 960px)').matches
                                ? -1
                                : undefined
                        )}
                    ></docs-search>
                </div>
                <div class="navigation">
                    <slot></slot>
                </div>
            </aside>
        `;
    }

    override updated(changes: PropertyValues) {
        if (changes.has('open')) {
            if (!this.open && changes.get('open')) {
                this.dispatchEvent(new Event('close'));
                this.ownerDocument.removeEventListener(
                    'keydown',
                    this.handleKeydown,
                    true
                );
            } else if (this.open && !changes.get('open')) {
                this.ownerDocument.addEventListener(
                    'keydown',
                    this.handleKeydown,
                    true
                );
            }
        }
    }
}
