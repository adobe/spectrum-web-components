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
    css,
    html,
    nothing,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    queryAsync,
} from '@spectrum-web-components/base/src/decorators.js';
import { DARK_MODE } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/theme/src/express/themes.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/switch/sp-switch.js';
import { Picker } from '@spectrum-web-components/picker';
import { Switch } from '@spectrum-web-components/switch';
import {
    Color,
    Scale,
    Theme,
    ThemeVariant,
} from '@spectrum-web-components/theme';
import './types.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export let dir: 'ltr' | 'rtl' =
    (urlParams.get('sp_dir') as 'ltr' | 'rtl') || 'ltr';
export let theme: ThemeVariant =
    (urlParams.get('sp_theme') as ThemeVariant) || 'spectrum';
export let color: Color =
    (urlParams.get('sp_color') as Color) ||
    (matchMedia(DARK_MODE).matches ? 'dark' : 'light');
export let scale: Scale = (urlParams.get('sp_scale') as Scale) || 'medium';
export let reduceMotion = urlParams.get('sp_reduceMotion') === 'true';

window.__swc_hack_knobs__ = window.__swc_hack_knobs__ || {
    defaultThemeVariant: theme,
    defaultColor: color,
    defaultScale: scale,
    defaultDirection: dir,
    defaultReduceMotion: reduceMotion,
};

const reduceMotionProperties = css`
    --spectrum-global-animation-duration-100: 0ms;
    --spectrum-global-animation-duration-200: 0ms;
    --spectrum-global-animation-duration-300: 0ms;
    --spectrum-global-animation-duration-400: 0ms;
    --spectrum-global-animation-duration-500: 0ms;
    --spectrum-global-animation-duration-600: 0ms;
    --spectrum-global-animation-duration-700: 0ms;
    --spectrum-global-animation-duration-800: 0ms;
    --spectrum-global-animation-duration-900: 0ms;
    --spectrum-global-animation-duration-1000: 0ms;
    --spectrum-global-animation-duration-2000: 0ms;
    --spectrum-global-animation-duration-4000: 0ms;
    --spectrum-animation-duration-0: 0ms;
    --spectrum-animation-duration-100: 0ms;
    --spectrum-animation-duration-200: 0ms;
    --spectrum-animation-duration-300: 0ms;
    --spectrum-animation-duration-400: 0ms;
    --spectrum-animation-duration-500: 0ms;
    --spectrum-animation-duration-600: 0ms;
    --spectrum-animation-duration-700: 0ms;
    --spectrum-animation-duration-800: 0ms;
    --spectrum-animation-duration-900: 0ms;
    --spectrum-animation-duration-1000: 0ms;
    --spectrum-animation-duration-2000: 0ms;
    --spectrum-animation-duration-4000: 0ms;
    --spectrum-coachmark-animation-indicator-ring-duration: 0ms;
    --swc-test-duration: 1ms;
`;

export const locales = [
    'cs-CZ',
    'cy-GB',
    'da-DK',
    'de-DE',
    'en-GB',
    'en-US',
    'es-ES',
    'fi-FI',
    'fr-FR',
    'hu-HU',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'nb-NO',
    'nl-NL',
    'pl-PL',
    'pt-BR',
    'ru-RU',
    'sv-SE',
    'tr-TR',
    'uk-UA',
    'zh-Hans-CN',
    'zh-Hant-TW',
] as const;

export const defaultLocale = 'en-US';

export class StoryDecorator extends SpectrumElement {
    static override get styles() {
        return [
            css`
                :host(:focus) {
                    outline: none;
                }
                sp-theme {
                    overflow-x: hidden;
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                    min-height: 100vh;
                    padding: var(--spectrum-global-dimension-size-100)
                        var(--spectrum-global-dimension-size-100)
                        calc(
                            2 * var(--spectrum-alias-focus-ring-size) +
                                var(--spectrum-alias-item-height-m)
                        );
                    box-sizing: border-box;
                    background-color: var(--spectrum-global-color-gray-100);
                    color: var(
                        --spectrum-body-text-color,
                        var(--spectrum-alias-text-color)
                    );
                }
                :host([screenshot]) sp-theme {
                    padding: var(--spectrum-global-dimension-size-100);
                }
                :host([reduce-motion]) sp-theme {
                    ${reduceMotionProperties}
                }
                .manage-theme {
                    position: fixed;
                    bottom: 0;
                    left: var(--spectrum-global-dimension-size-200);
                    right: var(--spectrum-global-dimension-size-200);
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    box-sizing: border-box;
                    background-color: var(--spectrum-global-color-gray-100);
                    padding-bottom: calc(
                        2 * var(--spectrum-alias-focus-ring-size)
                    );
                }
                [dir='ltr'] sp-field-label {
                    padding-left: 0;
                    padding-right: var(
                        --spectrum-fieldlabel-side-padding-x,
                        var(--spectrum-global-dimension-size-100)
                    );
                    margin-left: var(--spectrum-global-dimension-size-400);
                }
                [dir='ltr'] sp-switch {
                    margin-left: var(--spectrum-global-dimension-size-400);
                    margin-right: 0;
                    padding: 0;
                }
                [dir='rtl'] sp-field-label {
                    padding-right: 0;
                    padding-left: var(
                        --spectrum-fieldlabel-side-padding-x,
                        var(--spectrum-global-dimension-size-100)
                    );
                    margin-right: var(--spectrum-global-dimension-size-400);
                }
                [dir='rtl'] sp-switch {
                    margin-right: var(--spectrum-global-dimension-size-400);
                    margin-left: 0;
                    padding: 0;
                }
            `,
        ];
    }

    @property({ type: String })
    public theme: ThemeVariant = window.__swc_hack_knobs__.defaultThemeVariant;

    @property({ type: String })
    public color: Color = window.__swc_hack_knobs__.defaultColor;

    @property({ type: String })
    public scale: Scale = window.__swc_hack_knobs__.defaultScale;

    @property({ type: String, reflect: true, attribute: 'dir' })
    public direction: 'ltr' | 'rtl' =
        window.__swc_hack_knobs__.defaultDirection;

    @property({ type: Boolean, attribute: 'reduce-motion', reflect: true })
    public reduceMotion = window.__swc_hack_knobs__.defaultReduceMotion;

    @property({ type: Boolean, reflect: true })
    public screenshot = false;

    @property()
    public locale: typeof locales[number] = defaultLocale;

    @queryAsync('sp-theme')
    private themeRoot!: Theme;

    public ready = false;

    public async startManagingContentDirection(el: HTMLElement): Promise<void> {
        (await this.themeRoot).startManagingContentDirection(el);
    }

    public async stopManagingContentDirection(el: HTMLElement): Promise<void> {
        (await this.themeRoot).stopManagingContentDirection(el);
    }

    private updateTheme({ target }: Event & { target: Picker | Switch }): void {
        const { id } = target;
        const { value } = target as Picker;
        const { checked } = target as Switch;
        switch (id) {
            case 'theme':
                this.theme =
                    theme =
                    window.__swc_hack_knobs__.defaultThemeVariant =
                        value as ThemeVariant;
                break;
            case 'color':
                this.color =
                    color =
                    window.__swc_hack_knobs__.defaultColor =
                        value as Color;
                break;
            case 'scale':
                this.scale =
                    scale =
                    window.__swc_hack_knobs__.defaultScale =
                        value as Scale;
                break;
            case 'dir':
                this.direction =
                    dir =
                    window.__swc_hack_knobs__.defaultDirection =
                        value as 'ltr' | 'rtl';
                document.documentElement.dir = dir;
                break;
            case 'reduceMotion':
                this.reduceMotion =
                    reduceMotion =
                    window.__swc_hack_knobs__.defaultReduceMotion =
                        checked as boolean;
                break;
        }
    }

    private updateLocale({ target }: Event & { target: Picker }): void {
        this.locale = target.value as typeof locales[number];
    }

    protected handleKeydown(event: KeyboardEvent): void {
        const path = event.composedPath();
        const hasInput = path.some(
            (node) =>
                node instanceof HTMLInputElement ||
                node instanceof HTMLTextAreaElement ||
                !!(node as HTMLElement).isContentEditable
        );
        if (hasInput) {
            event.stopPropagation();
        }
    }

    protected override render(): TemplateResult {
        return html`
            <sp-theme
                theme=${this.theme}
                color=${this.color}
                scale=${this.scale}
                dir=${this.direction}
                lang=${this.locale}
                part="container"
                @keydown=${this.handleKeydown}
            >
                <slot @slotchange=${this.checkReady}></slot>
                ${this.screenshot ? nothing : this.manageTheme}
            </sp-theme>
        `;
    }

    protected async checkReady({
        target,
    }: Event & { target: HTMLSlotElement }): Promise<void> {
        this.ready = false;
        const assignedElements = target.assignedElements({
            flatten: true,
        }) as SpectrumElement[];
        const descendents = assignedElements;
        assignedElements.forEach((descendent) => {
            const gathered = [
                ...(descendent.querySelectorAll('*') || []),
            ] as SpectrumElement[];
            descendents.push(...gathered);
        });
        const litElementDescendents = descendents.filter(
            (el) =>
                el.tagName.search('-') !== -1 &&
                typeof el.updateComplete !== 'undefined'
        );
        const updates = litElementDescendents.map((el) => el.updateComplete);
        await Promise.all(updates);
        new Promise((res) => {
            setTimeout(res);
        }).then(async () => {
            await (document.fonts ? document.fonts.ready : Promise.resolve());
            setTimeout(() => {
                this.ready = true;
            });
        });
    }

    private get manageTheme(): TemplateResult {
        return html`
            <div class="manage-theme" part="controls">
                ${this.themeControl} ${this.colorControl} ${this.scaleControl}
                ${this.dirControl} ${this.localeControl}
                ${this.reduceMotionControl}
            </div>
        `;
    }

    private get themeControl(): TemplateResult {
        return html`
            <sp-field-label for="theme">Spectrum</sp-field-label>
            <sp-picker
                id="theme"
                placement="top"
                quiet
                .value=${this.theme}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="spectrum">Classic</sp-menu-item>
                <sp-menu-item value="express">Express</sp-menu-item>
            </sp-picker>
        `;
    }

    private get colorControl(): TemplateResult {
        return html`
            <sp-field-label for="color">Theme</sp-field-label>
            <sp-picker
                id="color"
                placement="top"
                quiet
                .value=${this.color}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="lightest">Lightest</sp-menu-item>
                <sp-menu-item value="light">Light</sp-menu-item>
                <sp-menu-item value="dark">Dark</sp-menu-item>
                <sp-menu-item value="darkest">Darkest</sp-menu-item>
            </sp-picker>
        `;
    }

    private get scaleControl(): TemplateResult {
        return html`
            <sp-field-label for="scale">Scale</sp-field-label>
            <sp-picker
                id="scale"
                label="Scale"
                placement="top"
                quiet
                .value=${this.scale}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="medium">Medium</sp-menu-item>
                <sp-menu-item value="large">Large</sp-menu-item>
            </sp-picker>
        `;
    }

    private get dirControl(): TemplateResult {
        return html`
            <sp-field-label for="dir">Direction</sp-field-label>
            <sp-picker
                id="dir"
                label="Direction"
                placement="top"
                quiet
                .value=${this.direction}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="ltr">LTR</sp-menu-item>
                <sp-menu-item value="rtl">RTL</sp-menu-item>
            </sp-picker>
        `;
    }

    private get localeControl(): TemplateResult {
        return html`
            <sp-field-label for="locale">Locale</sp-field-label>
            <sp-picker
                id="locale"
                label="Locale"
                placement="top"
                quiet
                .value=${this.locale}
                @change=${this.updateLocale}
            >
                ${locales.map(
                    (locale) => html`
                        <sp-menu-item value=${locale}>${locale}</sp-menu-item>
                    `
                )}
            </sp-picker>
        `;
    }

    private get reduceMotionControl(): TemplateResult {
        return html`
            <sp-switch
                id="reduceMotion"
                ?checked=${this.reduceMotion}
                @change=${this.updateTheme}
            >
                Reduce Motion
            </sp-switch>
        `;
    }

    protected override willUpdate(changes: PropertyValues<this>): void {
        if (changes.has('screenshot') && this.screenshot) {
            Theme.registerThemeFragment(
                'app',
                'app',
                css`
                    :host {
                        --swc-test-caret-color: transparent;
                        --swc-test-forced-color-adjust: none;
                    }
                `
            );
        }
    }
}
