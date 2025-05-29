/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { CSSResultGroup } from '@spectrum-web-components/base';

export type ShadowRootWithAdoptedStyleSheets = HTMLElement['shadowRoot'] & {
    adoptedStyleSheets?: CSSStyleSheet[];
};

export type FragmentType = 'color' | 'scale' | 'system' | 'core' | 'app';
export type SettableFragmentTypes = 'color' | 'scale' | 'system';
export type FragmentMap = Map<string, { name: string; styles: CSSResultGroup }>;
export type ThemeFragmentMap = Map<FragmentType, FragmentMap>;

export const SYSTEM_VARIANT_VALUES = [
    'spectrum',
    'express',
    'spectrum-two',
] as const;

export const SCALE_VALUES = [
    'medium',
    'large',
    'medium-express',
    'large-express',
    'medium-spectrum-two',
    'large-spectrum-two',
] as const;

export const COLOR_VALUES = [
    'light',
    'lightest',
    'dark',
    'darkest',
    'light-express',
    'lightest-express',
    'dark-express',
    'darkest-express',
    'light-spectrum-two',
    'lightest-spectrum-two',
    'dark-spectrum-two',
    'darkest-spectrum-two',
] as const;

export type SystemVariant = (typeof SYSTEM_VARIANT_VALUES)[number];
export type Scale = (typeof SCALE_VALUES)[number];
export type Color = (typeof COLOR_VALUES)[number];

export type SystemContextCallback = (
    system: SystemVariant | '',
    unsubscribe: () => void
) => void;

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
