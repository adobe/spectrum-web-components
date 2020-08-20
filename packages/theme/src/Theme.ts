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
    CSSResult,
    supportsAdoptingStyleSheets,
} from '@spectrum-web-components/base';

import coreStyles from './theme.css.js';

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
type SettableFragmentTypes = 'color' | 'scale';
type FragmentMap = Map<string, { name: string; styles: CSSResult }>;
export type ThemeFragmentMap = Map<FragmentType, FragmentMap>;
export type Color = 'light' | 'lightest' | 'dark' | 'darkest';
export type Scale = 'medium' | 'large';
const ScaleValues = ['medium', 'large'];
const ColorValues = ['light', 'lightest', 'dark', 'darkest'];
type FragmentName = Color | Scale | 'core';

export interface ThemeData {
    color?: Color;
    scale?: Scale;
}

type ThemeKindProvider = {
    [P in SettableFragmentTypes]: Color | Scale | '';
};

export class Theme extends HTMLElement implements ThemeKindProvider {
    private hasAdoptedStyles = false;
    private static themeFragmentsByKind: ThemeFragmentMap = new Map();
    private static defaultFragments: Set<FragmentName> = new Set(['core']);
    private static templateElement?: HTMLTemplateElement;
    private static instances: Set<Theme> = new Set();

    static get observedAttributes(): string[] {
        return ['color', 'scale'];
    }

    protected attributeChangedCallback(
        attrName: SettableFragmentTypes,
        old: string | null,
        value: string | null
    ): void {
        if (old === value) {
            return;
        }
        if (attrName === 'color') {
            this.color = value as Color;
        } else if (attrName === 'scale') {
            this.scale = value as Scale;
        }
    }

    private requestUpdate(): void {
        this.hasAdoptedStyles = false;
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.styleElement(this);
        } else {
            this.shouldAdoptStyles();
        }
    }

    public shadowRoot!: ShadowRoot;

    get core(): 'core' {
        return 'core';
    }

    private _color: Color | '' = '';

    get color(): Color | '' {
        const themeFragments = Theme.themeFragmentsByKind.get('color');
        const { name } =
            (themeFragments && themeFragments.get('default')) || {};
        return this._color || (name as Color) || '';
    }

    set color(newValue: Color | '') {
        if (newValue === this._color) return;
        const color =
            !!newValue && ColorValues.includes(newValue)
                ? newValue
                : this.color;
        if (color !== this._color) {
            this._color = color;
            this.requestUpdate();
        }
        if (color) {
            this.setAttribute('color', color);
        } else {
            this.removeAttribute('color');
        }
    }

    private _scale: Scale | '' = '';

    get scale(): Scale | '' {
        const themeFragments = Theme.themeFragmentsByKind.get('scale');
        const { name } =
            (themeFragments && themeFragments.get('default')) || {};
        return this._scale || (name as Scale) || '';
    }

    set scale(newValue: Scale | '') {
        if (newValue === this._scale) return;
        const scale =
            !!newValue && ScaleValues.includes(newValue)
                ? newValue
                : this.scale;
        if (scale !== this._scale) {
            this._scale = scale;
            this.requestUpdate();
        }
        if (scale) {
            this.setAttribute('scale', scale);
        } else {
            this.removeAttribute('scale');
        }
    }

    private get styles(): CSSResult[] {
        const themeKinds: FragmentType[] = [
            ...Theme.themeFragmentsByKind.keys(),
        ];
        const styles = themeKinds.reduce((acc, kind) => {
            const kindFragments = Theme.themeFragmentsByKind.get(
                kind
            ) as FragmentMap;
            const { [kind]: name } = this;
            const currentStyles = kindFragments.get(name);
            if (currentStyles) {
                acc.push(currentStyles.styles);
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
        const node = document.importNode(Theme.template.content, true);
        this.shadowRoot.appendChild(node);
        this.shouldAdoptStyles();
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
        theme.color = this.color || undefined;
        theme.scale = this.scale || undefined;
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
        Theme.instances.add(this);
        const manageDir = (): void => {
            const { dir } = this;
            this.trackedChildren.forEach((el) => {
                el.setAttribute('dir', dir === 'rtl' ? dir : 'ltr');
            });
        };
        if (!this.observer) {
            this.observer = new MutationObserver(manageDir);
        }
        this.observer.observe(this, {
            attributes: true,
            attributeFilter: ['dir'],
        });
        if (!this.hasAttribute('dir')) {
            let dirParent = ((this as HTMLElement).assignedSlot ||
                this.parentNode) as HTMLElement | DocumentFragment | ShadowRoot;
            while (
                dirParent !== document.documentElement &&
                !(dirParent instanceof Theme)
            ) {
                dirParent = ((dirParent as HTMLElement).assignedSlot || // step into the shadow DOM of the parent of a slotted node
                dirParent.parentNode || // DOM Element detected
                    (dirParent as ShadowRoot).host) as
                    | HTMLElement
                    | DocumentFragment
                    | ShadowRoot;
            }
            this.dir = dirParent.dir === 'rtl' ? dirParent.dir : 'ltr';
        }
        requestAnimationFrame(() => manageDir());
    }

    protected disconnectedCallback(): void {
        // Remove `this` to the instances array.
        Theme.instances.delete(this);
        this.observer.disconnect();
    }

    private observer!: MutationObserver;

    public trackChild(el: HTMLElement): void {
        this.trackedChildren.add(el);
    }

    public untrackChild(el: HTMLElement): void {
        this.trackedChildren.delete(el);
    }

    private trackedChildren: Set<HTMLElement> = new Set();

    private shouldAdoptStyles(): void {
        /* istanbul ignore if */
        if (!this.hasAdoptedStyles) {
            this.adoptStyles();
        }
    }

    private get expectedFragments(): number {
        // color, scale and core
        return 3;
    }

    protected adoptStyles(): void {
        const styles = this.styles; // No test coverage on Edge
        if (styles.length < this.expectedFragments) return;

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
        } else if (supportsAdoptingStyleSheets) {
            const styleSheets: CSSStyleSheet[] = [];
            for (const style of styles) {
                styleSheets.push(style.styleSheet as CSSStyleSheet);
            }
            this.shadowRoot.adoptedStyleSheets = styleSheets;
        } else {
            const styleNodes = this.shadowRoot.querySelectorAll('style');
            styleNodes.forEach((element) => element.remove());
            styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.shadowRoot.appendChild(style);
            });
        }
        this.hasAdoptedStyles = true;
    }

    static registerThemeFragment(
        name: FragmentName,
        kind: FragmentType,
        styles: CSSResult
    ): void {
        const fragmentMap = Theme.themeFragmentsByKind.get(kind) || new Map();
        if (fragmentMap.size === 0) {
            Theme.themeFragmentsByKind.set(kind, fragmentMap);
            // we're adding our first fragment for this kind, set as default
            fragmentMap.set('default', { name, styles });
            Theme.defaultFragments.add(name);
        }
        fragmentMap.set(name, { name, styles });
        Theme.instances.forEach((instance) => instance.shouldAdoptStyles());
    }
}

Theme.registerThemeFragment('core', 'core', coreStyles);
