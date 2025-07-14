import { CSSResultGroup } from '@spectrum-web-components/base';
export type ShadowRootWithAdoptedStyleSheets = HTMLElement['shadowRoot'] & {
    adoptedStyleSheets?: CSSStyleSheet[];
};
export type FragmentType = 'color' | 'scale' | 'system' | 'core' | 'app';
export type SettableFragmentTypes = 'color' | 'scale' | 'system';
export type FragmentMap = Map<string, {
    name: string;
    styles: CSSResultGroup;
}>;
export type ThemeFragmentMap = Map<FragmentType, FragmentMap>;
export declare const SYSTEM_VARIANT_VALUES: readonly ["spectrum", "express", "spectrum-two"];
export declare const SCALE_VALUES: readonly ["medium", "large", "medium-express", "large-express", "medium-spectrum-two", "large-spectrum-two"];
export declare const COLOR_VALUES: readonly ["light", "lightest", "dark", "darkest", "light-express", "lightest-express", "dark-express", "darkest-express", "light-spectrum-two", "lightest-spectrum-two", "dark-spectrum-two", "darkest-spectrum-two"];
export type SystemVariant = (typeof SYSTEM_VARIANT_VALUES)[number];
export type Scale = (typeof SCALE_VALUES)[number];
export type Color = (typeof COLOR_VALUES)[number];
export type SystemContextCallback = (system: SystemVariant | '', unsubscribe: () => void) => void;
export type FragmentName = Color | Scale | SystemVariant | 'core' | 'app';
export interface ThemeData {
    color?: Color;
    scale?: Scale;
    lang?: string;
    theme?: SystemVariant;
    system?: SystemVariant;
}
export type ThemeKindProvider = {
    [P in SettableFragmentTypes]: SystemVariant | Color | Scale | '';
};
export interface ProvideLang {
    callback: (lang: string, unsubscribe: () => void) => void;
}
