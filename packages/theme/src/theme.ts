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

export class Theme extends HTMLElement {
    private hasAdoptedStyles = false;
    private static themeFragmentsByKind: Map<string, FragmentMap> = new Map();
    private static defaultFragments: Set<FragmentName> = new Set(['core']);

    private static templateElement?: HTMLTemplateElement;

    static get observedAttributes(): string[] {
        return ['color', 'scale'];
    }

    get color(): Color {
        return this.getFragementNameByKind('color') as Color;
    }

    set color(newValue: Color) {
        this.setAttribute('color', newValue);
    }

    get scale(): Scale {
        return this.getFragementNameByKind('scale') as Scale;
    }

    set scale(newValue: Scale) {
        this.setAttribute('scale', newValue);
    }

    private getFragementNameByKind(kind: string): string {
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
        const themeKinds = [...Theme.themeFragmentsByKind.keys()];
        const styles = themeKinds.reduce(
            (acc, kind) => {
                const kindFragments = Theme.themeFragmentsByKind.get(
                    kind
                ) as FragmentMap;
                const defaultStyles = kindFragments.get('default');
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                const { [kind]: name } = this;
                const currentStyles = kindFragments.get(name);
                if (currentStyles) {
                    acc.push(currentStyles.styles);
                } else if (defaultStyles) {
                    acc.push(defaultStyles.styles);
                }
                return acc;
            },
            [] as CSSResult[]
        );
        return [coreStyles, ...styles];
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
        this.addEventListener('sp-query-theme', this
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
        /* istanbul ignore if */
        if (!this.hasAdoptedStyles) {
            this.adoptStyles();
        }
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        /* istanbul ignore if */
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
        if (!this.themeFragmentsByKind.has(kind)) {
            this.themeFragmentsByKind.set(kind, new Map());
            (this.themeFragmentsByKind.get(kind) as FragmentMap).set(
                'default',
                { name, styles }
            );
            Theme.defaultFragments.add(name);
        }
        (this.themeFragmentsByKind.get(kind) as FragmentMap).set(name, {
            name,
            styles,
        });
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
