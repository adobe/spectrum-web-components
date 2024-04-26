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
    nothing,
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    queryAsync,
} from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/theme/sp-theme.js';
import type {
    Color,
    Scale,
    SystemVariant,
    Theme,
} from '@spectrum-web-components/theme';
import type { Picker } from '@spectrum-web-components/picker';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/toast/sp-toast.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';

import type { SideNav } from './side-nav.js';
import './adobe-logo.js';
import type { CodeExample } from './code-example.js';
import './code-example.js';
import { copyText } from './copy-to-clipboard.js';

import layoutStyles from './layout.css';
import {
    DARK_MODE,
    IS_MOBILE,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import type { ActionButton } from '@spectrum-web-components/bundle';

const SWC_THEME_COLOR_KEY = 'swc-docs:theme:color';
const SWC_THEME_SCALE_KEY = 'swc-docs:theme:scale';
const SWC_THEME_THEME_KEY = 'swc-docs:theme:theme';
const SWC_THEME_SYSTEM_KEY = 'swc-docs:theme:system';
const SWC_THEME_DIR_KEY = 'swc-docs:theme:dir';
const COLOR_FALLBACK = matchMedia(DARK_MODE).matches ? 'dark' : 'light';
const SCALE_FALLBACK = matchMedia(IS_MOBILE).matches ? 'large' : 'medium';
const SYSTEM_FALLBACK = 'spectrum';
const DIR_FALLBACK = 'ltr';
const DEFAULT_COLOR = (
    window.localStorage
        ? localStorage.getItem(SWC_THEME_COLOR_KEY) || COLOR_FALLBACK
        : COLOR_FALLBACK
) as Color;
const DEFAULT_SCALE = (
    window.localStorage
        ? localStorage.getItem(SWC_THEME_SCALE_KEY) || SCALE_FALLBACK
        : SCALE_FALLBACK
) as Scale;
const DEFAULT_SYSTEM = (
    window.localStorage
        ? localStorage.getItem(SWC_THEME_THEME_KEY) ||
          localStorage.getItem(SWC_THEME_SYSTEM_KEY) ||
          SYSTEM_FALLBACK
        : SYSTEM_FALLBACK
) as SystemVariant;
const DEFAULT_DIR = (
    window.localStorage
        ? localStorage.getItem(SWC_THEME_DIR_KEY) || DIR_FALLBACK
        : DIR_FALLBACK
) as 'ltr' | 'rtl';

const isNarrowMediaQuery = matchMedia('screen and (max-width: 960px)');

const lazyStyleFragment = (
    name: Color | Scale,
    system: SystemVariant
): void => {
    var fragmentName = `${name}-${system}`;
    switch (fragmentName) {
        case 'dark-spectrum' || 'darkest-spectrum':
            import('@spectrum-web-components/theme/theme-dark.js');
            break;
        case 'light-spectrum' || 'lightest-spectrum':
            import('@spectrum-web-components/theme/theme-light.js');
            break;
        case 'medium-spectrum':
            import('@spectrum-web-components/theme/scale-medium.js');
            break;
        case 'large-spectrum':
            import('@spectrum-web-components/theme/scale-large.js');
            break;
        case 'dark-express' || 'darkest-express':
            import('@spectrum-web-components/theme/express/theme-dark.js');
            break;
        case 'light-express' || 'lightest-express':
            import('@spectrum-web-components/theme/express/theme-light.js');
            break;
        case 'medium-express':
            import('@spectrum-web-components/theme/express/scale-medium.js');
            break;
        case 'large-express':
            import('@spectrum-web-components/theme/express/scale-large.js');
            break;
        case 'light-spectrum-two':
            import(
                '@spectrum-web-components/theme/spectrum-two/theme-light-core-tokens.js'
            );
            break;
        case 'dark-spectrum-two':
            import(
                '@spectrum-web-components/theme/spectrum-two/theme-dark-core-tokens.js'
            );
            break;
        case 'medium-spectrum-two':
            import(
                '@spectrum-web-components/theme/spectrum-two/scale-medium-core-tokens.js'
            );
            break;
        case 'large-spectrum-two':
            import(
                '@spectrum-web-components/theme/spectrum-two/scale-large-core-tokens.js'
            );
            break;
    }
};

const loadDefaults = () => {
    if (
        DEFAULT_COLOR !== COLOR_FALLBACK ||
        DEFAULT_SCALE !== SCALE_FALLBACK ||
        DEFAULT_SYSTEM !== SYSTEM_FALLBACK
    ) {
        lazyStyleFragment(DEFAULT_COLOR, DEFAULT_SYSTEM);
        lazyStyleFragment(DEFAULT_SCALE, DEFAULT_SYSTEM);
    }
};

export interface TrackTheme {
    callback: (color: Color) => void;
}

// @customElement('docs-page')
export class LayoutElement extends LitElement {
    public static override get styles(): CSSResultArray {
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
    public override dir: 'ltr' | 'rtl' = DEFAULT_DIR;

    @property({ type: Boolean })
    public open = false;

    @property({ type: Boolean })
    public settings = false;

    @property({ type: Boolean, attribute: false })
    private isNarrow = isNarrowMediaQuery.matches;

    @property({ attribute: false })
    public theme: SystemVariant = DEFAULT_SYSTEM;

    @property({ attribute: false })
    public scale: Scale = DEFAULT_SCALE;

    @property({ attribute: false })
    public system: SystemVariant = DEFAULT_SYSTEM;

    @queryAsync('sp-theme')
    private themeRoot!: Theme;

    public async startManagingContentDirection(el: HTMLElement): Promise<void> {
        (await this.themeRoot).startManagingContentDirection(el);
    }

    public async stopManagingContentDirection(el: HTMLElement): Promise<void> {
        (await this.themeRoot).stopManagingContentDirection(el);
    }

    private _themeTrackers = new Map<HTMLElement, TrackTheme['callback']>();

    handleMatchMediaChange = (event: MediaQueryListEvent) => {
        this.isNarrow = event.matches;
    };

    handleEscapeKey = (event: KeyboardEvent) => {
        if (
            event.key === 'Escape' &&
            (event.target! as Element).closest(
                '[role="listbox"],[role="menu"]'
            ) === null
        ) {
            if (this.settings) {
                this.toggleSettings();
            } else if (this.open) {
                this.toggleNav();
            }
        }
    };

    toggleNav() {
        this.open = !this.open;
    }

    get systemValue() {
        return this.system;
    }

    toggleSettings() {
        this.settings = !this.settings;
    }

    private updateColor(event: Event) {
        this.color = (event.target as Picker).value as Color;
        this._themeTrackers.forEach((tracker) => tracker(this.color));
    }

    private updateScale(event: Event) {
        this.scale = (event.target as Picker).value as Scale;
    }

    private updateTheme(event: Event) {
        this.system = (event.target as Picker).value as SystemVariant;
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

    public override focus() {
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
                @close=${this.open ? this.toggleNav : undefined}
            >
                ${this._sidenavRendered ? navContent : nothing}
            </docs-side-nav>
        `;
    }

    private get settingsContent(): TemplateResult {
        if (this.settings || !this.isNarrow) {
            import('./settings.js');
        }
        return (
            this.isNarrow
                ? html`
                      <sp-underlay
                          class="scrim"
                          ?open=${this.settings}
                          @close=${this.toggleSettings}
                          ?hidden=${!this.isNarrow}
                      ></sp-underlay>
                      <aside
                          aria-label="Settings"
                          ?inert=${!this.settings}
                          class=${this.settings ? 'show' : ''}
                      >
                          <header>
                              <sp-action-button
                                  quiet
                                  label="Close Settings"
                                  @click=${this.toggleSettings}
                                  id="close-settings-id"
                              >
                                  <sp-icon-close slot="icon"></sp-icon-close>
                              </sp-action-button>
                          </header>
                          ${this.manageTheme}
                      </aside>
                  `
                : nothing
        ) as TemplateResult;
    }

    private get manageTheme(): TemplateResult {
        return html`
            <div class="manage-theme" role="form" aria-label="Settings">
                <div class="theme-control">
                    <sp-field-label for="theme-system">System</sp-field-label>
                    <sp-picker
                        id="theme-system"
                        quiet
                        value=${this.system}
                        @change=${this.updateTheme}
                    >
                        <sp-menu-item value="spectrum">Spectrum</sp-menu-item>
                        <sp-menu-item value="express">
                            Spectrum Express
                        </sp-menu-item>
                        <sp-menu-item value="spectrum-two">
                            Spectrum 2
                        </sp-menu-item>
                    </sp-picker>
                </div>
                <div class="theme-control">
                    <sp-field-label for="theme-color">Color</sp-field-label>
                    <sp-picker
                        id="theme-color"
                        quiet
                        value=${this.color}
                        @change=${this.updateColor}
                    >
                        <sp-menu-item value="light">Light</sp-menu-item>
                        <sp-menu-item value="dark">Dark</sp-menu-item>
                    </sp-picker>
                </div>
                <div class="theme-control">
                    <sp-field-label for="theme-scale">Scale</sp-field-label>
                    <sp-picker
                        id="theme-scale"
                        label="Scale"
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

    override render() {
        return html`
            <sp-theme
                .color=${this.color}
                .scale=${this.scale}
                .system=${this.system}
                dir=${this.dir}
                id="app"
                @sp-track-theme=${this.handleTrackTheme}
            >
                ${this.isNarrow
                    ? html`
                          <header>
                              <sp-action-button
                                  quiet
                                  label=${this.open
                                      ? 'Close Navigation'
                                      : 'Open Navigation'}
                                  tabindex=${this.isNarrow && this.open
                                      ? '-1'
                                      : '0'}
                                  ?inert=${this.isNarrow && this.settings}
                                  @click=${this.toggleNav}
                                  id="toggle-nav-id"
                              >
                                  <sp-icon-show-menu
                                      slot="icon"
                                  ></sp-icon-show-menu>
                              </sp-action-button>

                              <sp-action-button
                                  quiet
                                  label=${this.settings
                                      ? 'Close Settings'
                                      : 'Open Settings'}
                                  tabindex=${this.isNarrow && this.settings
                                      ? '-1'
                                      : '0'}
                                  ?inert=${this.isNarrow && this.open}
                                  @click=${this.toggleSettings}
                                  id="toggle-settings-id"
                              >
                                  <sp-icon-settings
                                      slot="icon"
                                  ></sp-icon-settings>
                              </sp-action-button>
                          </header>
                      `
                    : html``}
                <div id="body">
                    ${this.sideNav} ${this.settingsContent}
                    <div
                        id="page"
                        ?inert=${this.isNarrow && (this.open || this.settings)}
                        @alert=${this.addAlert}
                        @copy-text=${this.copyText}
                    >
                        ${!this.isNarrow ? this.manageTheme : ''}
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

    protected override firstUpdated(): void {
        loadDefaults();
        isNarrowMediaQuery.addEventListener(
            'change',
            this.handleMatchMediaChange
        );
    }

    override updated(changes: PropertyValues) {
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
                example.codeTheme = this.color;
            });
            (
                document.querySelector('html') as HTMLHtmlElement
            ).style.colorScheme = this.color;
        }
        if (changes.has('scale')) {
            if (window.localStorage) {
                localStorage.setItem(SWC_THEME_SCALE_KEY, this.scale);
            }
            if (changes.get('scale')) {
                loadStyleFragments = true;
            }
        }
        if (changes.has('system')) {
            if (window.localStorage) {
                localStorage.setItem(SWC_THEME_SYSTEM_KEY, this.system);
            }
            if (changes.get('system')) {
                loadStyleFragments = true;
            }
        }
        if (changes.has('dir') && window.localStorage) {
            localStorage.setItem(SWC_THEME_DIR_KEY, this.dir);
        }
        if (changes.has('open')) {
            this.open
                ? this.focus()
                : (
                      this.shadowRoot!.querySelector(
                          '#toggle-nav-id'
                      ) as ActionButton
                  )?.focus();
        }

        if (changes.has('settings')) {
            if (typeof changes.get('settings') !== 'undefined') {
                (
                    this.shadowRoot!.querySelector(
                        this.settings
                            ? '#close-settings-id'
                            : '#toggle-settings-id'
                    ) as ActionButton
                )?.focus();
            }
            if (this.settings && this.isNarrow) {
                this.ownerDocument!.addEventListener(
                    'keydown',
                    this.handleEscapeKey,
                    true
                );
            } else {
                this.ownerDocument!.removeEventListener(
                    'keydown',
                    this.handleEscapeKey,
                    true
                );
            }
        }

        if (changes.has('isNarrow')) {
            if (!this.isNarrow) {
                this.open = false;
                this.settings = false;
            }
        }

        if (loadStyleFragments) {
            lazyStyleFragment(this.color, this.systemValue);
            lazyStyleFragment(this.scale, this.systemValue);
        }
    }
}

customElements.define('docs-page', LayoutElement);
