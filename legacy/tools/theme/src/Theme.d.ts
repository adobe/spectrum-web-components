import { CSSResultGroup } from '@spectrum-web-components/base';
import { Color, FragmentName, FragmentType, ProvideLang, Scale, SettableFragmentTypes, ShadowRootWithAdoptedStyleSheets, SystemVariant, ThemeFragmentMap, ThemeKindProvider } from './theme-interfaces.js';
export type { ProvideLang, ThemeFragmentMap, Color, Scale, SystemVariant };
/**
 * @element sp-theme
 * @attr {string} [lang=""] - The language of the content scoped to this `sp-theme` element, see: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang" target="_blank">MDN reference</a>.
 *
 * @slot - Content on which to apply the CSS Custom Properties defined by the current theme configuration
 */
export declare class Theme extends HTMLElement implements ThemeKindProvider {
    private static themeFragmentsByKind;
    private static defaultFragments;
    private static templateElement?;
    private static instances;
    static VERSION: string;
    static get observedAttributes(): string[];
    _dir: 'ltr' | 'rtl' | '';
    set dir(dir: 'ltr' | 'rtl' | '');
    /**
     * Reading direction of the content scoped to this `sp-theme` element.
     * @type {"ltr" | "rtl" | ""}
     * @attr
     */
    get dir(): 'ltr' | 'rtl' | '';
    protected attributeChangedCallback(attrName: SettableFragmentTypes | 'lang' | 'dir', old: string | null, value: string | null): void;
    private requestUpdate;
    shadowRoot: ShadowRootWithAdoptedStyleSheets;
    private _system;
    /**
     * The Spectrum system that is applied to the content scoped to this `sp-theme` element.
     *
     * A value is requried.
     * @type {"spectrum" | "express" }
     * @attr
     */
    get system(): SystemVariant | '';
    set system(newValue: SystemVariant | '');
    private _color;
    /**
     * The Spectrum color stops to apply to content scoped by this `sp-theme` element.
     *
     * A value is requried.
     * @type {"lightest" | "light" | "dark" | "darkest" | ""}
     * @attr
     */
    get color(): Color | '';
    set color(newValue: Color | '');
    private _scale;
    /**
     * The Spectrum platform scale to apply to content scoped by this `sp-theme` element.
     *
     * A value is requried.
     * @type {"medium" | "large" | ""}
     * @attr
     */
    get scale(): Scale | '';
    set scale(newValue: Scale | '');
    private get styles();
    private static get template();
    constructor();
    private _systemContextConsumers;
    private _handleSystemContext;
    updateComplete: Promise<boolean>;
    private __resolve;
    private __createDeferredPromise;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    startManagingContentDirection(el: HTMLElement): void;
    stopManagingContentDirection(el: HTMLElement): void;
    private trackedChildren;
    private _updateRequested;
    private shouldAdoptStyles;
    protected adoptStyles(): void;
    static registerThemeFragment(name: FragmentName, kind: FragmentType, styles: CSSResultGroup): void;
    private _contextConsumers;
    private _provideContext;
    private _provideSystemContext;
    private _handleContextPresence;
}
