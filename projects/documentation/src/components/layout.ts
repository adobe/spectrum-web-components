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
    html,
    CSSResultArray,
    property,
    LitElement,
    PropertyValues,
} from 'lit-element';
import { SideNav } from './side-nav.js';
import layoutStyles from './layout.css';
import fontStyles from './fonts.css';
import { Color, Scale } from '@spectrum-web-components/theme';
import { Dropdown } from '@spectrum-web-components/dropdown';
import { CodeExample } from './code-example.js';
import { Theme } from '@spectrum-web-components/theme/lib/theme.js';
import './code-example.js';
import '@spectrum-web-components/button/lib/sp-button.js';
import '@spectrum-web-components/button/lib/sp-action-button.js';
import '@spectrum-web-components/dropdown';
import '@spectrum-web-components/menu';
import '@spectrum-web-components/menu-item';
import '@spectrum-web-components/link';
import '@spectrum-web-components/rule';

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
    timeout: number;
};
type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: () => number;
};

declare global {
    interface Window {
        requestIdleCallback: (
            callback: (deadline: RequestIdleCallbackDeadline) => void,
            opts?: RequestIdleCallbackOptions
        ) => RequestIdleCallbackHandle;
        cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
    }
}

function loadTypekit(): void {
    const { connection } = window.navigator;
    if (
        connection &&
        (connection.saveData ||
            connection.effectiveType === '2g' ||
            connection.effectiveType === 'slow-2g')
    ) {
        return;
    }
    const fonts = document.createElement('style');
    fonts.textContent = fontStyles.cssText;
    document.head.append(fonts);
}

const SWC_THEME_COLOR_KEY = 'swc-docs:theme:color';
const SWC_THEME_SCALE_KEY = 'swc-docs:theme:scale';
const COLOR_FALLBACK = matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
const SCALE_MEDIUM = 'medium';
const DEFAULT_COLOR = (window.localStorage
    ? localStorage.getItem(SWC_THEME_COLOR_KEY) || COLOR_FALLBACK
    : COLOR_FALLBACK) as Color;
const DEFAULT_SCALE = (window.localStorage
    ? localStorage.getItem(SWC_THEME_SCALE_KEY) || SCALE_MEDIUM
    : SCALE_MEDIUM) as Scale;

const isNarrowMediaQuery = matchMedia('screen and (max-width: 960px)');

const lazyStyleFragment = (name: Color | Scale): void => {
    switch (name) {
        case 'darkest':
            import('@spectrum-web-components/theme/lib/theme-darkest.js');
            break;
        case 'dark':
            import('@spectrum-web-components/theme/lib/theme-dark.js');
            break;
        case 'light':
            import('@spectrum-web-components/theme/lib/theme-light.js');
            break;
        case 'lightest':
            import('@spectrum-web-components/theme/lib/theme-lightest.js');
            break;
        case 'medium':
            import('@spectrum-web-components/theme/lib/scale-medium.js');
            break;
        case 'large':
            import('@spectrum-web-components/theme/lib/scale-large.js');
            break;
    }
};

const loadDefaults = () => {
    lazyStyleFragment(DEFAULT_COLOR);
    lazyStyleFragment(DEFAULT_SCALE);
};

export class LayoutElement extends LitElement {
    public static get styles(): CSSResultArray {
        return [layoutStyles];
    }

    @property({ attribute: false })
    public color: Color = DEFAULT_COLOR;

    @property({ type: Boolean })
    public open = false;

    @property({ type: Boolean, attribute: false })
    private isNarrow = isNarrowMediaQuery.matches;

    @property({ attribute: false })
    public scale: Scale = DEFAULT_SCALE;

    handleMatchMediaChange = (event: MediaQueryListEvent) => {
        this.isNarrow = event.matches;
    };

    toggleNav() {
        this.open = !this.open;
    }

    private updateColor(event: Event) {
        this.color = (event.target as Dropdown).value as Color;
    }

    private updateScale(event: Event) {
        this.scale = (event.target as Dropdown).value as Scale;
    }

    // TODO: remove this manual link relationship when
    // https://github.com/adobe/spectrum-web-components/issues/475
    // has been completed and links are natively part of the library
    private onClickLabel(event: { target: HTMLElement }) {
        const { target } = event;
        if (!target) return;
        const next = target.nextElementSibling as Dropdown;
        if (!next || next.open) return;
        next.click();
    }

    public focus() {
        (this.shadowRoot!.querySelector('docs-side-nav')! as SideNav).focus();
    }

    render() {
        return html`
            <sp-theme .color=${this.color} .scale=${this.scale} id="app">
                ${this.isNarrow
                    ? html`
                          <header>
                              <sp-action-button
                                  quiet
                                  label="Open Navigation"
                                  @click=${this.toggleNav}
                              >
                                  <svg
                                      slot="icon"
                                      viewBox="0 0 36 36"
                                      focusable="false"
                                      aria-hidden="true"
                                      role="img"
                                      width="22"
                                      height="22"
                                      fill="currentColor"
                                  >
                                      <rect
                                          height="4"
                                          rx="1"
                                          ry="1"
                                          width="28"
                                          x="4"
                                          y="16"
                                      ></rect>
                                      <rect
                                          height="4"
                                          rx="1"
                                          ry="1"
                                          width="28"
                                          x="4"
                                          y="6"
                                      ></rect>
                                      <rect
                                          height="4"
                                          rx="1"
                                          ry="1"
                                          width="28"
                                          x="4"
                                          y="26"
                                      ></rect>
                                  </svg>
                              </sp-action-button>
                          </header>
                      `
                    : html``}
                <div id="body">
                    <docs-side-nav
                        id="side-nav"
                        ?inert=${this.isNarrow && !this.open}
                        ?open=${this.open}
                        @close=${this.toggleNav}
                    >
                        <slot name="side-nav"></slot>
                    </docs-side-nav>
                    <main
                        id="layout-content"
                        ?inert=${this.isNarrow && this.open}
                        role="main"
                    >
                        <div id="page">
                            <div class="manage-theme">
                                <label @click=${this.onClickLabel}>Theme</label>
                                <sp-dropdown
                                    placement="bottom"
                                    quiet
                                    value=${this.color}
                                    @change=${this.updateColor}
                                >
                                    <sp-menu>
                                        <sp-menu-item value="lightest">
                                            Lightest
                                        </sp-menu-item>
                                        <sp-menu-item value="light">
                                            Light
                                        </sp-menu-item>
                                        <sp-menu-item value="dark">
                                            Dark
                                        </sp-menu-item>
                                        <sp-menu-item value="darkest">
                                            Darkest
                                        </sp-menu-item>
                                    </sp-menu>
                                </sp-dropdown>
                                <label @click=${this.onClickLabel}>Scale</label>
                                <sp-dropdown
                                    label="Scale"
                                    placement="bottom"
                                    quiet
                                    value=${this.scale}
                                    @change=${this.updateScale}
                                >
                                    <sp-menu>
                                        <sp-menu-item value="medium">
                                            Medium
                                        </sp-menu-item>
                                        <sp-menu-item value="large">
                                            Large
                                        </sp-menu-item>
                                    </sp-menu>
                                </sp-dropdown>
                            </div>
                            <slot></slot>
                        </div>
                    </main>
                </div>
            </sp-theme>
        `;
    }

    protected firstUpdated(): void {
        setTimeout(() => {
            loadTypekit();
            customElements.define('docs-side-nav', SideNav);
            /* istanbul ignore else */
            if (!customElements.get('sp-theme')) {
                customElements.define('sp-theme', Theme);
            }
        }, 0);
    }

    updated(changes: PropertyValues) {
        if (changes.has('color')) {
            if (window.localStorage) {
                localStorage.setItem(SWC_THEME_COLOR_KEY, this.color);
            }
            if (changes.get('color')) {
                lazyStyleFragment(this.color);
            }
            const examples = [
                ...this.querySelectorAll('code-example'),
            ] as CodeExample[];
            examples.forEach((example) => {
                example.codeTheme =
                    this.color === 'dark' || this.color === 'darkest'
                        ? 'dark'
                        : 'light';
            });
        }
        if (changes.has('scale')) {
            if (window.localStorage) {
                localStorage.setItem(SWC_THEME_SCALE_KEY, this.scale);
            }
            if (changes.get('scale')) {
                lazyStyleFragment(this.scale);
            }
        }
        if (changes.has('open') && this.open) {
            this.focus();
        }
    }

    connectedCallback() {
        super.connectedCallback();
        isNarrowMediaQuery.addEventListener(
            'change',
            this.handleMatchMediaChange
        );
    }

    disconnectedCallback() {
        isNarrowMediaQuery.removeEventListener(
            'change',
            this.handleMatchMediaChange
        );
    }
}

setTimeout(() => customElements.define('docs-page', LayoutElement), 0);
setTimeout(loadDefaults, 0);
