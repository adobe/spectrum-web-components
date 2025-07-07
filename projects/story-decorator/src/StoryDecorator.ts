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
import '@spectrum-web-components/theme/src/spectrum-two/themes.js';
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
    SystemVariant,
    Theme,
} from '@spectrum-web-components/theme';
import './types.js';
import { type Locale, Locales } from './locales.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export let dir: CSSStyleDeclaration['direction'] =
    (urlParams.get('sp_dir') as CSSStyleDeclaration['direction']) || 'ltr';
export const theme: SystemVariant =
    (urlParams.get('sp_theme') as SystemVariant) || 'spectrum';
export let system: SystemVariant =
    (urlParams.get('sp_system') as SystemVariant) || 'spectrum';
export let color: Color =
    (urlParams.get('sp_color') as Color) ||
    (matchMedia(DARK_MODE).matches ? 'dark' : 'light');
export let scale: Scale = (urlParams.get('sp_scale') as Scale) || 'medium';
export let reduceMotion = urlParams.get('sp_reduceMotion') === 'true';
export const screenshot = urlParams.get('sp_screenshot') === 'true';
export const locale = urlParams.get('sp_locale') || 'en-US';
export const direction = urlParams.get('sp_direction') || 'ltr';

window.__swc_hack_knobs__ = window.__swc_hack_knobs__ || {
    defaultSystemVariant: system,
    defaultColor: color,
    defaultScale: scale,
    defaultDirection: dir,
    defaultReduceMotion: reduceMotion,
    defaultLocale: locale,
};

const reduceMotionProperties = css`
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
    --spectrum-animation-duration-6000: 0ms;
    --pending-delay: 0s;
    --spectrum-coachmark-animation-indicator-ring-duration: 0ms;
    --swc-test-duration: 1ms;
`;

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
                    padding: var(--decorator-padding-100)
                        var(--decorator-padding-100)
                        calc(
                            2 * var(--spectrum-focus-indicator-thickness) +
                                var(--spectrum-component-height-100)
                        );
                    box-sizing: border-box;
                    background-color: var(--spectrum-background-base-color);
                    color: var(--spectrum-body-color);

                    --decorator-padding-100: calc(
                        var(--swc-scale-factor, 1) * var(--spectrum-spacing-100)
                    );
                    --decorator-padding-200: calc(
                        var(--swc-scale-factor, 1) * var(--spectrum-spacing-200)
                    );
                    --decorator-padding-400: calc(
                        var(--swc-scale-factor, 1) * var(--spectrum-spacing-400)
                    );
                }
                :host([screenshot]) sp-theme {
                    padding: var(--decorator-padding-100);
                }
                :host([reduce-motion]) sp-theme {
                    ${reduceMotionProperties}
                }
                .manage-theme {
                    position: fixed;
                    bottom: 0;
                    left: var(--decorator-padding-200);
                    right: var(--decorator-padding-200);
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-end;
                    box-sizing: border-box;
                    padding-bottom: calc(
                        2 * var(--spectrum-alias-focus-ring-size)
                    );
                }
                sp-field-label {
                    padding-inline-end: var(
                        --spectrum-fieldlabel-side-padding-x,
                        var(--decorator-padding-100)
                    );
                    margin-inline-start: var(--decorator-padding-400);
                }
                sp-switch {
                    margin-inline-start: var(--decorator-padding-400);
                }
            `,
        ];
    }

    @property({ type: String })
    public system: SystemVariant =
        window.__swc_hack_knobs__.defaultSystemVariant;

    @property({ type: String })
    public color: Color = window.__swc_hack_knobs__.defaultColor;

    @property({ type: String })
    public scale: Scale = window.__swc_hack_knobs__.defaultScale;

    @property({ type: String, reflect: true, attribute: 'dir' })
    public direction: CSSStyleDeclaration['direction'] =
        window.__swc_hack_knobs__.defaultDirection;

    @property({ type: Boolean, attribute: 'reduce-motion', reflect: true })
    public reduceMotion = window.__swc_hack_knobs__.defaultReduceMotion;

    @property({ type: String })
    public override lang: Locale = window.__swc_hack_knobs__.defaultLocale;

    @property({ type: Boolean, reflect: true })
    public screenshot = screenshot;

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
            case 'system':
                this.system =
                    system =
                    window.__swc_hack_knobs__.defaultSystemVariant =
                        value as SystemVariant;
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
                        value as CSSStyleDeclaration['direction'];
                if (document.documentElement.dir !== dir) {
                    document.documentElement.dir = dir;
                }
                break;
            case 'reduceMotion':
                this.reduceMotion =
                    reduceMotion =
                    window.__swc_hack_knobs__.defaultReduceMotion =
                        checked as boolean;
                break;
            case 'locale':
                this.lang = window.__swc_hack_knobs__.defaultLocale =
                    value as Locale;
                break;
        }
    }

    public get backgroundStyle() {
        if (this.system === 'spectrum-two') {
            return `background-color: var(--spectrum-gray-50)`;
        }
        return `background-color: var(--spectrum-gray-100);`;
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
                system=${this.system}
                color=${this.color}
                scale=${this.scale}
                dir=${this.direction}
                style=${this.backgroundStyle}
                part="container"
                lang=${this.lang}
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
                ${this.systemControl} ${this.colorControl} ${this.scaleControl}
                ${this.localeControl} ${this.dirControl}
                ${this.reduceMotionControl}
            </div>
        `;
    }

    private get systemControl(): TemplateResult {
        return html`
            <sp-field-label side-aligned="start" for="system">
                System
            </sp-field-label>
            <sp-picker
                id="system"
                placement="top"
                quiet
                .value=${this.system}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="spectrum">Spectrum</sp-menu-item>
                <sp-menu-item value="express">Express</sp-menu-item>
                <sp-menu-item value="spectrum-two">Spectrum 2</sp-menu-item>
            </sp-picker>
        `;
    }

    private get colorControl(): TemplateResult {
        return html`
            <sp-field-label side-aligned="start" for="color">
                Theme
            </sp-field-label>
            <sp-picker
                id="color"
                placement="top"
                quiet
                .value=${this.color}
                @change=${this.updateTheme}
            >
                <sp-menu-item value="light">Light</sp-menu-item>
                <sp-menu-item value="dark">Dark</sp-menu-item>
            </sp-picker>
        `;
    }

    private get scaleControl(): TemplateResult {
        return html`
            <sp-field-label side-aligned="start" for="scale">
                Scale
            </sp-field-label>
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

    private get localeControl(): TemplateResult {
        const renderLocaleOption = (locale: Locale): TemplateResult => html`
            <sp-menu-item value=${locale}>${Locales[locale]}</sp-menu-item>
        `;

        return html`
            <sp-field-label side-aligned="start" for="locale">
                Locale
            </sp-field-label>
            <sp-picker
                id="locale"
                label="Locale"
                placement="top"
                quiet
                .value=${this.lang}
                @change=${this.updateTheme}
            >
                ${(Object.keys(Locales) as Locale[]).map(renderLocaleOption)}
            </sp-picker>
        `;
    }

    private get dirControl(): TemplateResult {
        return html`
            <sp-field-label side-aligned="start" for="dir">
                Direction
            </sp-field-label>
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

    private get reduceMotionControl(): TemplateResult {
        return html`
            <sp-switch
                id="reduceMotion"
                ?checked=${this.reduceMotion}
                @change=${this.updateTheme}
            >
                Reduce motion
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
