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
    interface ShadowRoot {
        adoptedStyleSheets?: CSSStyleSheet[];
    }
}

type FragmentType = 'color' | 'scale' | 'core';
type FragmentMap = Map<string, { name: string; styles: CSSResult }>;
export type Color = 'light' | 'lightest' | 'dark' | 'darkest';
export type Scale = 'medium' | 'large';
type FragmentName = Color | Scale | 'core';

export interface ThemeData {
    color?: Color;
    scale?: Scale;
}

type ThemeKindProvider = {
    [P in FragmentType]: string;
};

export class Theme extends HTMLElement implements ThemeKindProvider {
    private hasAdoptedStyles = false;
    private static themeFragmentsByKind: Map<
        FragmentType,
        FragmentMap
    > = new Map();
    private static defaultFragments: Set<FragmentName> = new Set(['core']);

    private static templateElement?: HTMLTemplateElement;

    private static instances: Set<Theme> = new Set();

    static get observedAttributes(): string[] {
        return ['color', 'scale'];
    }

    get core(): 'core' {
        return 'core';
    }

    get color(): Color {
        return this.getFragmentNameByKind('color') as Color;
    }

    set color(newValue: Color) {
        this.setAttribute('color', newValue);
    }

    get scale(): Scale {
        return this.getFragmentNameByKind('scale') as Scale;
    }

    set scale(newValue: Scale) {
        this.setAttribute('scale', newValue);
    }

    private getFragmentNameByKind(kind: FragmentType): string {
        const kindFragments = Theme.themeFragmentsByKind.get(
            kind
        ) as FragmentMap;
        /* istanbul ignore if */
        if (!kindFragments) {
            throw new Error(`Unknown theme fragment kind '${kind}'`);
            /* istanbul ignore if */
        } else if (kindFragments.size === 0) {
            throw new Error(`No theme fragments of kind '${kind}'`);
        }
        const name = this.getAttribute(kind);
        if (name) {
            const fragment = kindFragments.get(name);
            if (fragment) {
                return name;
            }
        }
        const defaultFragment = kindFragments.get('default');
        /* istanbul ignore else */
        if (defaultFragment) {
            return defaultFragment.name;
        }
        throw new Error(
            `Incorrectly configured theme fragments of kind '${kind}'`
        );
    }

    private get styles(): CSSResult[] {
        const themeKinds: FragmentType[] = [
            ...Theme.themeFragmentsByKind.keys(),
        ];
        const styles = themeKinds.reduce((acc, kind) => {
            const kindFragments = Theme.themeFragmentsByKind.get(
                kind
            ) as FragmentMap;
            const defaultStyles = kindFragments.get('default');
            const { [kind]: name } = this;
            const currentStyles = kindFragments.get(name);
            if (currentStyles) {
                acc.push(currentStyles.styles);
            } else if (defaultStyles) {
                acc.push(defaultStyles.styles);
            }
            return acc;
        }, [] as CSSResult[]);
        return [...styles];
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
        /* istanbul ignore else */
        if (this.shadowRoot) {
            const node = document.importNode(Theme.template.content, true);
            this.shadowRoot.appendChild(node);
        }
        this.adoptStyles();
        this.addEventListener(
            'sp-query-theme',
            this.onQueryTheme as EventListener
        );
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
        this.shouldAdoptStyles();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        /* istanbul ignore if */
        if (window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
        // Add `this` to the instances array.
        if (!Theme.instances.has(this)) {
            Theme.instances.add(this);
        }
    }

    protected disconnectedCallback(): void {
        // Remove `this` to the instances array.
        Theme.instances.delete(this);
    }

    private shouldAdoptStyles(): void {
        /* istanbul ignore if */
        if (!this.hasAdoptedStyles) {
            this.adoptStyles();
        }
    }

    protected adoptStyles(): void {
        const styles = this.styles; // No test coverage on Edge
        if (styles.length < 3) return;

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
            for (const [kind, fragments] of Theme.themeFragmentsByKind) {
                for (const [name, { styles }] of fragments) {
                    if (name === 'default') continue;
                    let cssText = styles.cssText;
                    if (!Theme.defaultFragments.has(name as FragmentName)) {
                        cssText = cssText.replace(
                            ':host',
                            `:host([${kind}='${name}'])`
                        );
                    }
                    fragmentCSS.push(cssText);
                }
            }
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
                fragmentCSS,
                this.localName
            );
            window.ShadyCSS.prepareTemplate(Theme.template, this.localName);
        } else if (supportsAdoptingStyleSheets && this.shadowRoot) {
            const styleSheets = [];
            for (const style of styles) {
                styleSheets.push(style.styleSheet as CSSStyleSheet);
            }
            this.shadowRoot.adoptedStyleSheets = styleSheets;
        } else if (this.shadowRoot) {
            const styleNodes = this.shadowRoot.querySelectorAll('style');
            if (styleNodes) {
                styleNodes.forEach((element) => element.remove());
            }
            styles.forEach((s) => {
                /* istanbul ignore if */
                if (!this.shadowRoot) {
                    return;
                }
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.shadowRoot.appendChild(style);
            });
        }
        this.hasAdoptedStyles = true;
    }

    protected attributeChangedCallback(): void {
        this.hasAdoptedStyles = false;
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
        const fragmentMap = this.themeFragmentsByKind.get(kind) || new Map();
        if (fragmentMap.size === 0) {
            this.themeFragmentsByKind.set(kind, fragmentMap);
            // we're adding our first fragment for this kind, set as default
            fragmentMap.set('default', { name, styles });
            Theme.defaultFragments.add(name);
        }
        fragmentMap.set(name, { name, styles });
        Theme.instances.forEach((instance) => instance.shouldAdoptStyles());
    }
}

Theme.registerThemeFragment('core', 'core', coreStyles);

/* istanbul ignore else */
if (!customElements.get('sp-theme')) {
    customElements.define('sp-theme', Theme);
}

declare global {
    interface HTMLElementTagNameMap {
        'sp-theme': Theme;
    }
}
