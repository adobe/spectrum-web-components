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

import { CSSResult, CSSResultGroup } from '@spectrum-web-components/base';
import { version } from '@spectrum-web-components/base/src/version.js';
import {
    Color,
    COLOR_VALUES,
    FragmentMap,
    FragmentName,
    FragmentType,
    ProvideLang,
    Scale,
    SCALE_VALUES,
    SettableFragmentTypes,
    ShadowRootWithAdoptedStyleSheets,
    SYSTEM_VARIANT_VALUES,
    SystemContextCallback,
    SystemVariant,
    ThemeFragmentMap,
    ThemeKindProvider,
} from './theme-interfaces.js';
export type { ProvideLang, ThemeFragmentMap, Color, Scale, SystemVariant };
/**
 * @element sp-theme
 * @attr {string} [lang=""] - The language of the content scoped to this `sp-theme` element, see: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang" target="_blank">MDN reference</a>.
 *
 * @slot - Content on which to apply the CSS Custom Properties defined by the current theme configuration
 */
export class Theme extends HTMLElement implements ThemeKindProvider {
    private static themeFragmentsByKind: ThemeFragmentMap = new Map();
    private static defaultFragments: Set<FragmentName> = new Set(['spectrum']);
    private static templateElement?: HTMLTemplateElement;
    private static instances: Set<Theme> = new Set();
    static VERSION = version;

    static get observedAttributes(): string[] {
        return [
            'color',
            'scale',
            'lang',
            'dir',
            'system',
            /* deprecated attributes, but still observing */
            'theme',
        ];
    }

    _dir: 'ltr' | 'rtl' | '' = '';

    override set dir(dir: 'ltr' | 'rtl' | '') {
        if (dir === this.dir) return;
        this.setAttribute('dir', dir);
        this._dir = dir;
        const targetDir = dir === 'rtl' ? dir : 'ltr';
        /* c8 ignore next 3 */
        this.trackedChildren.forEach((el) => {
            el.setAttribute('dir', targetDir);
        });
    }

    /**
     * Reading direction of the content scoped to this `sp-theme` element.
     * @type {"ltr" | "rtl" | ""}
     * @attr
     */
    override get dir(): 'ltr' | 'rtl' | '' {
        return this._dir;
    }

    protected attributeChangedCallback(
        attrName: SettableFragmentTypes | 'lang' | 'dir',
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
            /* c8 ignore next 3 */
        } else if (attrName === 'lang' && !!value) {
            this.lang = value;
            this._provideContext();
        } else if (attrName === 'theme') {
            this.theme = value as SystemVariant;
            this._provideSystemContext();
            warnBetaSystem(this, value as SystemVariant);
        } else if (attrName === 'system') {
            this.system = value as SystemVariant;
            this._provideSystemContext();
            warnBetaSystem(this, value as SystemVariant);
        } else if (attrName === 'dir') {
            this.dir = value as 'ltr' | 'rtl' | '';
        }
    }
    private requestUpdate(): void {
        this.shouldAdoptStyles();
    }

    public override shadowRoot!: ShadowRootWithAdoptedStyleSheets;

    private _system: SystemVariant | '' = 'spectrum';
    /**
     * The Spectrum system that is applied to the content scoped to this `sp-theme` element.
     *
     * A value is requried.
     * @type {"spectrum" | "express" }
     * @attr
     */
    get system(): SystemVariant | '' {
        const systemFragments = Theme.themeFragmentsByKind.get('system');
        const { name } =
            (systemFragments && systemFragments.get('default')) || {};
        return this._system || (name as SystemVariant) || '';
    }

    set system(newValue: SystemVariant | '') {
        if (newValue === this._system) return;
        const system =
            !!newValue && SYSTEM_VARIANT_VALUES.includes(newValue)
                ? newValue
                : this.system;
        if (system !== this._system) {
            this._system = system;
            this.requestUpdate();
        }
        if (system) {
            this.setAttribute('system', system);
            /* c8 ignore next 3 */
        } else {
            this.removeAttribute('system');
        }
    }

    /*
     * @deprecated The `theme` attribute has been deprecated in favor of the `system` attribute.
     */
    get theme(): SystemVariant | '' {
        /* c8 ignore next 3 */
        if (!this.system) {
            this.removeAttribute('system');
        }
        return this.system;
    }

    /*
     * @deprecated The `theme` attribute has been deprecated in favor of the `system` attribute.
     */
    set theme(newValue: SystemVariant | '') {
        this.system = newValue;
        this.requestUpdate();
    }

    private _color: Color | '' = '';

    /**
     * The Spectrum color stops to apply to content scoped by this `sp-theme` element.
     *
     * A value is requried.
     * @type {"lightest" | "light" | "dark" | "darkest" | ""}
     * @attr
     */
    get color(): Color | '' {
        const themeFragments = Theme.themeFragmentsByKind.get('color');
        const { name } =
            (themeFragments && themeFragments.get('default')) || {};
        return this._color || (name as Color) || '';
    }

    set color(newValue: Color | '') {
        if (newValue === this._color) return;
        const color =
            !!newValue && COLOR_VALUES.includes(newValue)
                ? newValue
                : this.color;
        if (color !== this._color) {
            this._color = color;
            this.requestUpdate();
        }
        if (color) {
            this.setAttribute('color', color);
            /* c8 ignore next 3 */
        } else {
            this.removeAttribute('color');
        }
    }

    private _scale: Scale | '' = '';

    /**
     * The Spectrum platform scale to apply to content scoped by this `sp-theme` element.
     *
     * A value is requried.
     * @type {"medium" | "large" | ""}
     * @attr
     */
    get scale(): Scale | '' {
        const themeFragments = Theme.themeFragmentsByKind.get('scale');
        const { name } =
            (themeFragments && themeFragments.get('default')) || {};
        return this._scale || (name as Scale) || '';
    }

    set scale(newValue: Scale | '') {
        if (newValue === this._scale) return;
        const scale =
            !!newValue && SCALE_VALUES.includes(newValue)
                ? newValue
                : this.scale;
        if (scale !== this._scale) {
            this._scale = scale;
            this.requestUpdate();
        }
        if (scale) {
            this.setAttribute('scale', scale);
            /* c8 ignore next 3 */
        } else {
            this.removeAttribute('scale');
        }
    }

    private get styles(): CSSResultGroup[] {
        const themeKinds: FragmentType[] = [
            ...Theme.themeFragmentsByKind.keys(),
        ];
        const getStyle = (
            fragments: FragmentMap,
            name: FragmentName,
            kind?: FragmentType
        ): CSSResultGroup | undefined => {
            const currentStyles =
                kind &&
                kind !== 'theme' &&
                kind !== 'system' &&
                this.theme !== 'spectrum' &&
                this.system !== 'spectrum'
                    ? fragments.get(`${name}-${this.system}`)
                    : fragments.get(name);
            // theme="spectrum" is available by default and doesn't need to be applied.
            const isAppliedFragment =
                name === 'spectrum' || !kind || this.hasAttribute(kind);
            if (currentStyles && isAppliedFragment) {
                return currentStyles.styles;
            }
            return;
        };
        const styles = themeKinds.reduce((acc, kind) => {
            const kindFragments = Theme.themeFragmentsByKind.get(
                kind
            ) as FragmentMap;
            let style: CSSResultGroup | undefined;
            if (kind === 'app' || kind === 'core') {
                style = getStyle(kindFragments, kind);
            } else {
                const { [kind]: name } = this;
                style = getStyle(kindFragments, <FragmentName>name, kind);
            }
            if (style) {
                acc.push(style);
            }
            return acc;
        }, [] as CSSResultGroup[]);
        const themeFragmentsByKind = Theme.themeFragmentsByKind;

        checkForIssues(
            this,
            this.system,
            this.color,
            this.scale,
            this.hasAttribute('theme'),
            themeFragmentsByKind
        );

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
            'sp-language-context',
            this._handleContextPresence as EventListener
        );
        this.addEventListener(
            'sp-system-context',
            this._handleSystemContext as EventListener
        );

        this.updateComplete = this.__createDeferredPromise();
    }

    /**
     * Stores system context consumers and their associated callbacks.
     *
     * This Map associates each consumer component (HTMLElement) with a tuple containing:
     * - The `SystemContextCallback` function to be invoked with the system context.
     * - An `unsubscribe` function to remove the consumer from the Map when it's no longer needed.
     */
    private _systemContextConsumers = new Map<
        HTMLElement,
        [SystemContextCallback, () => void]
    >();

    /**
     * Handles the 'sp-system-context' event dispatched by descendant components requesting the system context.
     *
     * This method registers the requesting component's callback and provides the current system context to it.
     * It also manages the unsubscribe mechanism to clean up when the component is disconnected.
     *
     * @param event - The custom event containing the callback function to provide the system context.
     */
    private _handleSystemContext(
        event: CustomEvent<{ callback: SystemContextCallback }>
    ): void {
        event.stopPropagation();

        const target = event.composedPath()[0] as HTMLElement;

        /* c8 ignore next 4 */
        // Avoid duplicate registrations
        if (this._systemContextConsumers.has(target)) {
            return;
        }

        // Create an unsubscribe function
        const unsubscribe: () => void = () =>
            this._systemContextConsumers.delete(target);

        // Store the callback and unsubscribe function
        this._systemContextConsumers.set(target, [
            event.detail.callback,
            unsubscribe,
        ]);

        // Provide the context data
        const [callback] = this._systemContextConsumers.get(target) || [];
        if (callback) {
            callback(this.system, unsubscribe);
        }
    }

    public updateComplete!: Promise<boolean>;
    private __resolve!: (compelted: boolean) => void;

    private __createDeferredPromise(): Promise<boolean> {
        return new Promise((resolve) => {
            this.__resolve = resolve;
        });
    }

    protected connectedCallback(): void {
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        this.shouldAdoptStyles();

        // Add `this` to the instances array.
        Theme.instances.add(this);
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
    }

    protected disconnectedCallback(): void {
        // Remove `this` to the instances array.
        Theme.instances.delete(this);
    }

    public startManagingContentDirection(el: HTMLElement): void {
        this.trackedChildren.add(el);
    }

    public stopManagingContentDirection(el: HTMLElement): void {
        this.trackedChildren.delete(el);
    }

    private trackedChildren: Set<HTMLElement> = new Set();

    private _updateRequested = false;

    private async shouldAdoptStyles(): Promise<void> {
        if (!this._updateRequested) {
            this.updateComplete = this.__createDeferredPromise();
            this._updateRequested = true;
            this._updateRequested = await false;
            this.adoptStyles();
            this.__resolve(true);
        }
    }

    protected adoptStyles(): void {
        const styles = this.styles;
        const styleSheets: CSSStyleSheet[] = [];
        for (const style of styles) {
            styleSheets.push((style as CSSResult).styleSheet!);
        }
        this.shadowRoot.adoptedStyleSheets = styleSheets;
    }

    static registerThemeFragment(
        name: FragmentName,
        kind: FragmentType,
        styles: CSSResultGroup
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

    private _contextConsumers = new Map<
        HTMLElement,
        [ProvideLang['callback'], () => void]
    >();

    /* c8 ignore next 5 */
    private _provideContext(): void {
        this._contextConsumers.forEach(([callback, unsubscribe]) =>
            callback(this.lang, unsubscribe)
        );
    }

    /**
     * Provides the current system context to all registered consumers.
     *
     * This method iterates over all registered system context consumers and invokes their callbacks,
     * passing the current system variant and the unsubscribe function. This ensures that any component
     * consuming the system context receives the updated system variant when the `system` (or `theme`) attribute changes.
     */
    /* c8 ignore next 5 */
    private _provideSystemContext(): void {
        this._systemContextConsumers.forEach(([callback, unsubscribe]) =>
            callback(this.system, unsubscribe)
        );
    }

    private _handleContextPresence(event: CustomEvent<ProvideLang>): void {
        event.stopPropagation();
        const target = event.composedPath()[0] as HTMLElement;
        /* c8 ignore next 3 */
        if (this._contextConsumers.has(target)) {
            return;
        }
        this._contextConsumers.set(target, [
            event.detail.callback,
            () => this._contextConsumers.delete(target),
        ]);
        const [callback, unsubscribe] =
            this._contextConsumers.get(target) || [];
        if (callback && unsubscribe) {
            callback(
                this.lang ||
                    document.documentElement.lang ||
                    navigator.language,
                unsubscribe
            );
        }
    }
}

function warnBetaSystem(instance: Theme, value: SystemVariant): void {
    if (window.__swc.DEBUG && value === 'spectrum-two') {
        window.__swc.warn(
            instance,
            'You are currently using the beta version of the Spectrum Two system. Consumption of this system may be subject to unexpected changes before the 1.0 release of SWC.',
            'https://s2.spectrum.adobe.com/',
            { level: 'high' }
        );
    }
}

function checkForIssues(
    instance: Theme,
    system: SystemVariant | '',
    color: Color | '',
    scale: Scale | '',
    hasThemeAttribute: boolean,
    themeFragmentsByKind: ThemeFragmentMap
): void {
    if (window.__swc.DEBUG) {
        const issues: string[] = [];
        const checkForAttribute = (
            name: 'system' | 'color' | 'scale',
            resolvedValue: string,
            actualValue: string | null
        ): void => {
            const systemModifier =
                system && system !== 'spectrum' ? `-${system}` : '';
            if (!resolvedValue) {
                issues.push(
                    `You have not explicitly set the "${name}" attribute and there is no default value on which to fallback.`
                );
            } else if (!actualValue) {
                issues.push(
                    `You have not explicitly set the "${name}" attribute, the default value ("${resolvedValue}") is being used as a fallback.`
                );
            } else if (
                !themeFragmentsByKind
                    .get(name)
                    ?.get(
                        resolvedValue +
                            (name === 'system' ? '' : systemModifier)
                    )
            ) {
                issues.push(
                    `You have set "${name}='${resolvedValue}'" but the associated system fragment has not been loaded.`
                );
            }
        };

        if (hasThemeAttribute) {
            issues.push(
                `DEPRECATION NOTICE: the "theme" attribute has been deprecated in favor of "system". For more information, see: https://opensource.adobe.com/spectrum-web-components/tools/theme/`
            );
        }
        if (['lightest', 'darkest'].includes(color || '')) {
            issues.push(
                `DEPRECATION NOTICE: Color "lightest" and "darkest" are deprecated. For more information, see: https://opensource.adobe.com/spectrum-web-components/tools/theme/`
            );
        }
        checkForAttribute('system', system, instance.getAttribute('system'));
        checkForAttribute('color', color, instance.getAttribute('color'));
        checkForAttribute('scale', scale, instance.getAttribute('scale'));

        if (issues.length) {
            window.__swc.warn(
                instance,
                'You are leveraging an <sp-theme> element and the following issues may disrupt your theme delivery:',
                'https://opensource.adobe.com/spectrum-web-components/components/theme/#example',
                { issues }
            );
        }
    }
}
