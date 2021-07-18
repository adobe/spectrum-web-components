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
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/theme/sp-theme.js';
import type { Color, Scale } from '@spectrum-web-components/theme';
import '@spectrum-web-components/picker/sp-picker.js';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/toast/sp-toast.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js';

import type { SideNav } from './side-nav.js';
import './adobe-logo.js';
import type { CodeExample } from './code-example.js';
import './code-example.js';
import { copyText } from './copy-to-clipboard.js';

import layoutStyles from './layout.css';
import { nothing } from 'lit-html';

const SWC_THEME_COLOR_KEY = 'swc-docs:theme:color';
const SWC_THEME_SCALE_KEY = 'swc-docs:theme:scale';
const SWC_THEME_DIR_KEY = 'swc-docs:theme:dir';
const COLOR_FALLBACK = matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
const SCALE_MEDIUM = 'medium';
const DIR_FALLBACK = 'ltr';
const DEFAULT_COLOR = (
    window.localStorage
        ? localStorage.getItem(SWC_THEME_COLOR_KEY) || COLOR_FALLBACK
        : COLOR_FALLBACK
) as Color;
const DEFAULT_SCALE = (
    window.localStorage
        ? localStorage.getItem(SWC_THEME_SCALE_KEY) || SCALE_MEDIUM
        : SCALE_MEDIUM
) as Scale;
const DEFAULT_DIR = (
    window.localStorage
        ? localStorage.getItem(SWC_THEME_DIR_KEY) || DIR_FALLBACK
        : DIR_FALLBACK
) as 'ltr' | 'rtl';

const isNarrowMediaQuery = matchMedia('screen and (max-width: 960px)');

const lazyStyleFragment = (name: Color | Scale): void => {
    switch (name) {
        case 'darkest':
            import('@spectrum-web-components/theme/theme-darkest.js');
            break;
        case 'dark':
            import('@spectrum-web-components/theme/theme-dark.js');
            break;
        case 'light':
            import('@spectrum-web-components/theme/theme-light.js');
            break;
        case 'lightest':
            import('@spectrum-web-components/theme/theme-lightest.js');
            break;
        case 'medium':
            import('@spectrum-web-components/theme/scale-medium.js');
            break;
        case 'large':
            import('@spectrum-web-components/theme/scale-large.js');
            break;
    }
};

const loadDefaults = () => {
    if (DEFAULT_COLOR !== COLOR_FALLBACK || DEFAULT_SCALE !== SCALE_MEDIUM) {
        lazyStyleFragment(DEFAULT_COLOR);
        lazyStyleFragment(DEFAULT_SCALE);
    }
};

export interface TrackTheme {
    callback: (color: Color) => void;
}

// @customElement('docs-page')
export class LayoutElement extends LitElement {
    public static get styles(): CSSResultArray {
        return [layoutStyles];
    }

    @property({ attribute: false })
    private alerts: Map<
        HTMLElement,
        {
            count: number;
            message: string;
            element: (count: number, message: string) => TemplateResult;
        }
    > = new Map();

    @property({ attribute: false })
    public color: Color = DEFAULT_COLOR;

    @property({ reflect: true })
    public dir: 'ltr' | 'rtl' = DEFAULT_DIR;

    @property({ type: Boolean })
    public open = false;

    @property({ type: Boolean, attribute: false })
    private isNarrow = isNarrowMediaQuery.matches;

    @property({ attribute: false })
    public scale: Scale = DEFAULT_SCALE;

    private _themeTrackers = new Map<HTMLElement, TrackTheme['callback']>();

    handleMatchMediaChange = (event: MediaQueryListEvent) => {
        this.isNarrow = event.matches;
    };

    toggleNav() {
        this.open = !this.open;
    }

    private updateColor(event: Event) {
        this.color = (event.target as Picker).value as Color;
        this._themeTrackers.forEach((tracker) => tracker(this.color));
    }

    private updateScale(event: Event) {
        this.scale = (event.target as Picker).value as Scale;
    }

    private updateDirection(event: Event) {
        const dir = (event.target as Picker).value;
        this.dir = dir === 'rtl' ? dir : 'ltr';
        document.documentElement.dir = this.dir;
    }

    private handleTrackTheme(event: CustomEvent<TrackTheme>): void {
        const target = event.composedPath()[0] as HTMLElement;
        if (this._themeTrackers.has(target)) {
            this._themeTrackers.delete(target);
        } else {
            this._themeTrackers.set(target, event.detail.callback);
            const callback = this._themeTrackers.get(target);
            if (callback) {
                callback(this.color);
            }
        }
    }

    private copyText(
        event: CustomEvent<{ text: string; message: string }>
    ): void {
        copyText(event.detail.text);
        this.addAlert(event);
    }

    private addAlert(event: CustomEvent<{ message: string }>): void {
        const target = event.composedPath()[0] as HTMLElement;
        if (!this.alerts.has(target)) {
            const close = () => {
                this.alerts.delete(target);
                target.focus();
                this.requestUpdate();
            };
            this.alerts.set(target, {
                count: 0,
                message: '',
                /**
                 * <sp-toast> does not allow a `timeout` of less that 6000
                 * use this as a cheat to reset the timeout to 6000 for
                 * every additional alert.
                 */

                element: (count: number, message: string) => html`
                    <sp-toast
                        .timeout=${count}
                        variant="info"
                        @close=${close}
                        open
                    >
                        ${message} ${count > 1 ? `(${count} alerts)` : ''}
                    </sp-toast>
                `,
            });
        }
        const alert = this.alerts.get(target);
        this.alerts.set(target, {
            element: alert!.element,
            count: alert!.count + 1,
            message: event.detail.message,
        });
        this.requestUpdate();
    }

    public focus() {
        (this.shadowRoot!.querySelector('docs-side-nav')! as SideNav).focus();
    }

    private _sidenavRendered = false;

    private get sideNav(): TemplateResult {
        const displaysNavContent = !this.isNarrow || this.open;
        const navContent = html`
            <slot name="logo" slot="logo">
                <a id="logo" href="index.html">
                    <docs-spectrum-logo></docs-spectrum-logo>
                    <h1 class="title">
                        Spectrum
                        <br />
                        <span>Web Components</span>
                    </h1>
                </a>
            </slot>
            <slot name="side-nav"></slot>
        `;
        this._sidenavRendered = this._sidenavRendered || displaysNavContent;
        if (this._sidenavRendered) {
            import('./side-nav.js');
        }
        return html`
            <docs-side-nav
                id="side-nav"
                ?inert=${this.isNarrow && !this.open}
                ?open=${this.open}
                @close=${this.toggleNav}
            >
                ${this._sidenavRendered ? navContent : nothing}
            </docs-side-nav>
        `;
    }

    private get manageTheme(): TemplateResult {
        return html`
            <div class="manage-theme">
                <div class="theme-control">
                    <sp-field-label for="theme-color">Theme</sp-field-label>
                    <sp-picker
                        id="theme-color"
                        placement="bottom"
                        quiet
                        value=${this.color}
                        @change=${this.updateColor}
                    >
                        <sp-menu-item value="lightest" selected>
                            Lightest
                        </sp-menu-item>
                        <sp-menu-item value="light">Light</sp-menu-item>
                        <sp-menu-item value="dark">Dark</sp-menu-item>
                        <sp-menu-item value="darkest">Darkest</sp-menu-item>
                    </sp-picker>
                </div>
                <div class="theme-control">
                    <sp-field-label for="theme-scale">Scale</sp-field-label>
                    <sp-picker
                        id="theme-scale"
                        label="Scale"
                        placement="bottom"
                        quiet
                        value=${this.scale}
                        @change=${this.updateScale}
                    >
                        <sp-menu-item value="medium">Medium</sp-menu-item>
                        <sp-menu-item value="large">Large</sp-menu-item>
                    </sp-picker>
                </div>
                <div class="theme-control">
                    <sp-field-label for="theme-direction">
                        Direction
                    </sp-field-label>
                    <sp-picker
                        id="theme-direction"
                        label="Direction"
                        placement="bottom"
                        quiet
                        value=${this.dir}
                        @change=${this.updateDirection}
                    >
                        <sp-menu-item value="ltr">LTR</sp-menu-item>
                        <sp-menu-item value="rtl">RTL</sp-menu-item>
                    </sp-picker>
                </div>
            </div>
        `;
    }

    render() {
        return html`
            <sp-theme
                .color=${this.color}
                .scale=${this.scale}
                dir=${this.dir}
                id="app"
                @sp-track-theme=${this.handleTrackTheme}
            >
                ${this.isNarrow
                    ? html`
                          <header>
                              <sp-action-button
                                  quiet
                                  label="Open Navigation"
                                  @click=${this.toggleNav}
                              >
                                  <sp-icon-show-menu
                                      slot="icon"
                                  ></sp-icon-show-menu>
                              </sp-action-button>
                          </header>
                      `
                    : html``}
                <div id="body">
                    ${this.sideNav}
                    <div
                        id="page"
                        ?inert=${this.isNarrow && this.open}
                        @alert=${this.addAlert}
                        @copy-text=${this.copyText}
                    >
                        ${this.manageTheme}
                        <slot></slot>
                    </div>
                </div>
                ${this.alerts.size
                    ? html`
                          <div class="alerts" role="region">
                              ${[...this.alerts.values()].map((alert) =>
                                  alert.element(alert.count, alert.message)
                              )}
                          </div>
                      `
                    : html``}
            </sp-theme>
        `;
    }

    protected firstUpdated(): void {
        loadDefaults();
        isNarrowMediaQuery.addEventListener(
            'change',
            this.handleMatchMediaChange
        );
    }

    updated(changes: PropertyValues) {
        let loadStyleFragments = false;
        if (changes.has('color')) {
            if (window.localStorage) {
                localStorage.setItem(SWC_THEME_COLOR_KEY, this.color);
            }
            if (changes.get('color')) {
                loadStyleFragments = true;
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
                loadStyleFragments = true;
            }
        }
        if (changes.has('dir') && window.localStorage) {
            localStorage.setItem(SWC_THEME_DIR_KEY, this.dir);
        }
        if (changes.has('open') && this.open) {
            this.focus();
        }
        if (loadStyleFragments) {
            lazyStyleFragment(this.color);
            lazyStyleFragment(this.scale);
        }
    }
}

customElements.define('docs-page', LayoutElement);
