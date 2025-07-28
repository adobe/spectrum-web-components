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

@customElement('docs-side-nav')
export class SideNav extends LitElement {
    public static override get styles(): CSSResultArray {
        return [sideNavStyles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    public toggle() {
        this.open = !this.open;
    }

    @property({ type: Boolean })
    public isNarrow = false;

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

    handleTransitionEvent(event: TransitionEvent): void {
        this.dispatchEvent(new TransitionEvent(event.type));
    }

    override render(): TemplateResult {
        return html`
            ${this.isNarrow
                ? html`
                      <sp-underlay
                          class="scrim"
                          @close=${this.toggle}
                          ?open=${this.open}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleTransitionEvent}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  `
                : html``}
            <aside
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleTransitionEvent}
                @transitioncancel=${this.handleTransitionEvent}
            >
                <div id="nav-header">
                    <div id="logo-container">
                        <slot name="logo"></slot>
                    </div>
                    <docs-search></docs-search>
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
                this.dispatchEvent(new Event('close', { bubbles: true }));
            }
        }
    }
}
