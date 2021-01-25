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
    SpectrumElement,
    css,
    property,
    TemplateResult,
} from '@spectrum-web-components/base';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/switch/sp-switch.js';
import { Picker } from '@spectrum-web-components/picker';
import { Switch } from '@spectrum-web-components/switch';
import { Scale, Color } from '@spectrum-web-components/theme';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export let dir: 'ltr' | 'rtl' =
    (urlParams.get('sp_dir') as 'ltr' | 'rtl') || 'ltr';
export let color: Color = (urlParams.get('sp_color') as Color) || 'light';
export let scale: Scale = (urlParams.get('sp_scale') as Scale) || 'medium';
export let reduceMotion = urlParams.get('sp_reduceMotion') === 'true';

declare global {
    interface Window {
        __swc_hack_knobs__: {
            defaultColor: Color;
            defaultScale: Scale;
            defaultDirection: 'ltr' | 'rtl';
            defaultReduceMotion: boolean;
        };
    }
}

window.__swc_hack_knobs__ = window.__swc_hack_knobs__ || {};

export class StoryDecorator extends SpectrumElement {
    static styles = [
        css`
            sp-theme {
                overflow-x: hidden;
                display: block;
                box-sizing: border-box;
                width: 100%;
                min-height: 100vh;
                padding: var(--spectrum-global-dimension-size-100);
                box-sizing: border-box;
                background-color: var(--spectrum-global-color-gray-100);
                color: var(
                    --spectrum-body-text-color,
                    var(--spectrum-alias-text-color)
                );
            }
            :host([reduce-motion]) sp-theme {
                --spectrum-global-animation-duration-0: 0ms;
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
            }
            .manage-theme {
                position: fixed;
                bottom: 0;
                left: var(--spectrum-global-dimension-size-200);
                right: var(--spectrum-global-dimension-size-200);
                display: flex;
                justify-content: flex-end;
                box-sizing: border-box;
                background-color: var(--spectrum-global-color-gray-100);
            }
            label {
                /* .spectrum-FieldLabel,
                * .spectrum-Form-itemLabel */
                display: block;

                box-sizing: border-box;

                padding-top: var(
                    --spectrum-fieldlabel-padding-top,
                    var(--spectrum-global-dimension-size-50)
                );

                padding-bottom: var(
                    --spectrum-fieldlabel-padding-bottom,
                    var(--spectrum-global-dimension-size-65)
                );
                padding-left: 0;
                padding-right: 0;

                font-size: var(
                    --spectrum-fieldlabel-text-size,
                    var(--spectrum-global-dimension-font-size-75)
                );
                font-weight: var(
                    --spectrum-fieldlabel-text-font-weight,
                    var(--spectrum-global-font-weight-regular)
                );
                line-height: var(
                    --spectrum-fieldlabel-text-line-height,
                    var(--spectrum-global-font-line-height-small)
                );

                -webkit-font-smoothing: subpixel-antialiased;
                -moz-osx-font-smoothing: auto;
                font-smoothing: subpixel-antialiased;

                display: inline-block;
                padding-top: var(
                    --spectrum-fieldlabel-side-padding-top,
                    var(--spectrum-global-dimension-size-100)
                );
                padding-bottom: 0;
            }
            [dir='ltr'] label {
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
            [dir='rtl'] label {
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

    @property({ type: String })
    public color: Color = color;

    @property({ type: String })
    public scale: Scale = scale;

    @property({ type: String })
    public direction: 'ltr' | 'rtl' = dir;

    @property({ type: Boolean, attribute: 'reduce-motion', reflect: true })
    public reduceMotion = reduceMotion;

    private handleClickLabel(event: { target: HTMLElement }): void {
        const { target } = event;
        const next = target.nextElementSibling as Picker;
        if (!next || next.open) return;
        next.click();
    }

    private updateTheme({ target }: Event & { target: Picker | Switch }): void {
        const { id } = target;
        const { value } = target as Picker;
        const { checked } = target as Switch;
        switch (id) {
            case 'color':
                this.color = color = window.__swc_hack_knobs__.defaultColor = value as Color;
                break;
            case 'scale':
                this.scale = scale = window.__swc_hack_knobs__.defaultScale = value as Scale;
                break;
            case 'dir':
                this.direction = dir = window.__swc_hack_knobs__.defaultDirection = value as
                    | 'ltr'
                    | 'rtl';
                break;
            case 'reduceMotion':
                this.reduceMotion = reduceMotion = window.__swc_hack_knobs__.defaultReduceMotion = checked as boolean;
                break;
        }
    }

    protected render(): TemplateResult {
        return html`
            <sp-theme
                color=${this.color}
                scale=${this.scale}
                dir=${this.direction}
                part="container"
            >
                <slot></slot>
                ${this.reduceMotion
                    ? html`
                          <style>
                              sp-theme {
                              }
                          </style>
                      `
                    : html``}
                <div class="manage-theme">
                    ${this.colorControl} ${this.scaleControl} ${this.dirControl}
                    ${this.reduceMotionControl}
                </div>
            </sp-theme>
        `;
    }

    private get colorControl(): TemplateResult {
        return html`
            <label @click=${this.handleClickLabel}>Theme</label>
            <sp-picker
                id="color"
                placement="top"
                quiet
                .value=${this.color}
                @change=${this.updateTheme}
            >
                <sp-menu>
                    <sp-menu-item value="lightest">Lightest</sp-menu-item>
                    <sp-menu-item value="light">Light</sp-menu-item>
                    <sp-menu-item value="dark">Dark</sp-menu-item>
                    <sp-menu-item value="darkest">Darkest</sp-menu-item>
                </sp-menu>
            </sp-picker>
        `;
    }

    private get scaleControl(): TemplateResult {
        return html`
            <label @click=${this.handleClickLabel}>Scale</label>
            <sp-picker
                id="scale"
                label="Scale"
                placement="top"
                quiet
                .value=${this.scale}
                @change=${this.updateTheme}
            >
                <sp-menu>
                    <sp-menu-item value="medium">Medium</sp-menu-item>
                    <sp-menu-item value="large">Large</sp-menu-item>
                </sp-menu>
            </sp-picker>
        `;
    }

    private get dirControl(): TemplateResult {
        return html`
            <label @click=${this.handleClickLabel}>Direction</label>
            <sp-picker
                id="dir"
                label="Direction"
                placement="top"
                quiet
                .value=${this.direction}
                @change=${this.updateTheme}
            >
                <sp-menu>
                    <sp-menu-item value="ltr">LTR</sp-menu-item>
                    <sp-menu-item value="rtl">RTL</sp-menu-item>
                </sp-menu>
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
}
