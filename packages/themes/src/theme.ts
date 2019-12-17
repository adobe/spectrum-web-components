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

enum Color {
    light = 'light',
    lightest = 'lightest',
    dark = 'dark',
    darkest = 'darkest',
}

enum Size {
    medium = 'medium',
    large = 'large',
}

export class Theme extends HTMLElement {
    private static themeFragments: Map<string, CSSResult> = new Map<
        string,
        CSSResult
    >();
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

    public get colorStyles(): CSSResult {
        return Theme.themeFragment(this.color);
    }

    public get sizeStyles(): CSSResult {
        return Theme.themeFragment(this.size);
    }

    private get styles(): CSSResult[] {
        return [
            coreStyles,
            Theme.themeFragment(this.color),
            Theme.themeFragment(this.size),
        ];
    }

    private static get template() {
        if (!this.templateElement) {
            this.templateElement = document.createElement('template');
            this.templateElement.innerHTML = '<slot></slot>';
            // this.templateElement.appendChild(document.createElement('slot'));
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

    connectedCallback() {
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }

    protected adoptStyles() {
        const styles = this.styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim!.prepareAdoptedCssText(
                styles.map((s) => s.cssText),
                this.localName
            );
            window.ShadyCSS.prepareTemplate(Theme.template, this.localName);
        } else if (supportsAdoptingStyleSheets && this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = styles.map(
                (s) => s.styleSheet!
            );
        } else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                if (this.shadowRoot) {
                    this.shadowRoot.appendChild(style);
                }
            });
        }
    }

    static registerThemeFragment(name: string, styles: CSSResult) {
        this.themeFragments.set(name, styles);
    }

    static themeFragment(name: string): CSSResult {
        const fragment = this.themeFragments.get(name);
        if (!fragment) {
            throw new Error(`Unknown theme fragment '${name}'`);
        }
        return fragment;
    }
}
