/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import coreStyles from './theme.css';
import { CSSResult, supportsAdoptingStyleSheets } from 'lit-element';

export const DefaultColor = 'light';
export const DefaultScale = 'medium';

declare global {
    interface Window {
        ShadyCSS: {
            nativeShadow: boolean;
            prepareTemplate(
                template: HTMLTemplateElement,
                elementName: string,
                typeExtension?: string
            ): void;
            styleElement(host: HTMLElement): void;
            ScopingShim: {
                prepareAdoptedCssText(
                    cssTextArray: string[],
                    elementName: string
                ): void;
            };
        };
    }
    interface ShadowRoot {
        adoptedStyleSheets?: CSSStyleSheet[];
    }
}

type FragmentType = 'color' | 'scale' | 'core';
type FragmentMap = Map<string, { kind: FragmentType; styles: CSSResult }>;
export type Color = 'light' | 'lightest' | 'dark' | 'darkest';
export type Scale = 'medium' | 'large';
type FragmentName = Color | Scale | 'core';

export interface ThemeData {
    color?: Color;
    scale?: Scale;
}

export class Theme extends HTMLElement {
    private static themeFragments: FragmentMap = new Map();
    private static defaultFragments: Set<FragmentName> = new Set([
        'core',
        'light',
        'medium',
    ]);

    private static templateElement?: HTMLTemplateElement;

    static get observedAttributes(): string[] {
        return ['color', 'scale'];
    }

    get color(): Color {
        const color = this.getAttribute('color');
        if (!color) return DefaultColor;

        const colorFragment = Theme.themeFragments.get(color);
        if (colorFragment && colorFragment.kind === 'color') {
            return color as Color;
        }
        return DefaultColor;
    }

    set color(newValue: Color) {
        this.setAttribute('color', newValue);
    }

    get scale(): Scale {
        const scale = this.getAttribute('scale');
        if (!scale) return DefaultScale;

        const scaleFragment = Theme.themeFragments.get(scale);
        if (scaleFragment && scaleFragment.kind === 'scale') {
            return scale as Scale;
        }
        return DefaultScale;
    }

    set scale(newValue: Scale) {
        this.setAttribute('scale', newValue);
    }

    private get styles(): CSSResult[] {
        return [
            coreStyles,
            Theme.themeFragment(this.color).styles,
            Theme.themeFragment(this.scale).styles,
        ];
    }

    private static get template(): HTMLTemplateElement {
        if (!this.templateElement) {
            this.templateElement = document.createElement('template');
            this.templateElement.innerHTML = '<slot></slot>';
        }
        return this.templateElement;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            const node = document.importNode(Theme.template.content, true);
            this.shadowRoot.appendChild(node);
        }
        this.adoptStyles();
        this.addEventListener('query-theme', this
            .onQueryTheme as EventListener);
    }

    private onQueryTheme(event: CustomEvent<ThemeData>): void {
        if (event.defaultPrevented) {
            return;
        }
        event.preventDefault();
        const { detail: theme } = event;
        theme.color = this.color;
        theme.scale = this.scale;
    }

    protected connectedCallback(): void {
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }

    protected adoptStyles(): void {
        const styles = this.styles; // No test coverage on Edge

        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        /* istanbul ignore if */ if (
            window.ShadyCSS !== undefined &&
            !window.ShadyCSS.nativeShadow &&
            window.ShadyCSS.ScopingShim
        ) {
            // For browsers using the shim, there seems to be one set of
            // processed styles per template, so it is hard to nest styles. So,
            // for those, we load in all style fragments and then switch using a
            // host selector (e.g. :host([color='dark']))
            const fragmentCSS: string[] = [];
            for (const [name, { kind, styles }] of Theme.themeFragments) {
                let cssText = styles.cssText;
                if (!Theme.defaultFragments.has(name as FragmentName)) {
                    cssText = cssText.replace(
                        ':host',
                        `:host([${kind}='${name}'])`
                    );
                }
                fragmentCSS.push(cssText);
            }
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
                fragmentCSS,
                this.localName
            );
            window.ShadyCSS.prepareTemplate(Theme.template, this.localName);
        } else if (supportsAdoptingStyleSheets && this.shadowRoot) {
            const styleSheets = [];
            for (const style of styles) {
                if (style.styleSheet) {
                    styleSheets.push(style.styleSheet);
                }
            }
            this.shadowRoot.adoptedStyleSheets = styleSheets;
        } else {
            if (this.shadowRoot) {
                const styleNodes = this.shadowRoot.querySelectorAll('style');
                if (styleNodes) {
                    styleNodes.forEach((element) => element.remove());
                }
                styles.forEach((s) => {
                    const style = document.createElement('style');
                    style.textContent = s.cssText;
                    if (this.shadowRoot) {
                        this.shadowRoot.appendChild(style);
                    }
                });
            }
        }
    }

    protected attributeChangedCallback(): void {
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.styleElement(this);
        } else {
            this.adoptStyles();
        }
    }

    static registerThemeFragment(
        name: FragmentName,
        kind: FragmentType,
        styles: CSSResult
    ): void {
        this.themeFragments.set(name, { kind, styles });
    }

    static themeFragment(
        name: FragmentName
    ): { kind: FragmentType; styles: CSSResult } {
        const fragment = this.themeFragments.get(name);
        if (!fragment) {
            throw new Error(`Unknown theme fragment '${name}'`);
        }
        return fragment;
    }
}

Theme.registerThemeFragment('core', 'core', coreStyles);
