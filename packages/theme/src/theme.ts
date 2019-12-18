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
    interface CSSStyleSheet {
        replaceSync(css: string): void;
    }
    interface ShadowRoot {
        adoptedStyleSheets?: CSSStyleSheet[];
    }
}

type FragmentType = 'color' | 'size' | 'core';
type FragmentMap = Map<
    Color | Size | 'core',
    { kind: FragmentType; styles: CSSResult }
>;
type Color = 'light' | 'lightest' | 'dark' | 'darkest';
type Size = 'medium' | 'large';
type FragmentName = Color | Size | 'core';

export class Theme extends HTMLElement {
    private static themeFragments: FragmentMap = new Map();
    private static defaultFragments: Set<FragmentName> = new Set([
        'core',
        'light',
        'medium',
    ]);

    private static templateElement?: HTMLTemplateElement;

    static get observedAttributes(): string[] {
        return ['color', 'size'];
    }

    get color(): Color {
        return (this.getAttribute('color') as Color) || 'light';
    }

    set color(newValue: Color) {
        this.setAttribute('color', newValue);
    }

    get size(): Size {
        return (this.getAttribute('size') as Size) || 'medium';
    }

    set size(newValue: Size) {
        this.setAttribute('size', newValue);
    }

    private get styles(): CSSResult[] {
        return [
            coreStyles,
            Theme.themeFragment(this.color).styles,
            Theme.themeFragment(this.size).styles,
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
    }

    protected connectedCallback(): void {
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }

    protected adoptStyles(): void {
        const styles = this.styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (
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
                if (!Theme.defaultFragments.has(name)) {
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
            this.shadowRoot.adoptedStyleSheets = [];
            for (const style of styles) {
                if (style.styleSheet) {
                    this.shadowRoot.adoptedStyleSheets.push(style.styleSheet);
                }
            }
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
        if (window.ShadyCSS !== undefined) {
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
