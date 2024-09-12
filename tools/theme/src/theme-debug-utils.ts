/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { Theme } from './Theme';
import {
    Color,
    Scale,
    SystemVariant,
    ThemeFragmentMap,
} from './theme-interfaces';
export function warnDeprecatedSystem(
    instance: Theme,
    value: SystemVariant
): void {
    if (window.__swc.DEBUG) {
        window.__swc.warn(
            instance,
            'property theme in <sp-theme> has been deprecated. Please use system instead like this <sp-theme system="spectrum"/>',
            'https://opensource.adobe.com/spectrum-web-components/tools/themes/#deprecation',
            { level: 'deprecation' }
        );
        if (value === 'spectrum-two') {
            window.__swc.warn(
                instance,
                'You are currently using the beta version of Spectrum Two theme. Consumption of this system may be subject to unexpected changes before the 1.0 release of SWC.',
                'https://s2.spectrum.adobe.com/',
                { level: 'high' }
            );
        }
    }
}

export function checkForIssues(
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
            resolvedValue?: string,
            actualValue?: string
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

        checkForAttribute('system', system, system);
        checkForAttribute('color', color, color);
        checkForAttribute('scale', scale, scale);

        if (hasThemeAttribute) {
            issues.push(
                `The "theme" attribute has been deprecated in favor of "system".`
            );
        }

        if (issues.length) {
            window.__swc.warn(
                instance,
                'You are leveraging an <sp-theme> element and the following issues may disrupt your theme delivery:',
                'https://opensource.adobe.com/spectrum-web-components/components/theme/#example',
                { issues }
            );
        }

        if (['lightest', 'darkest'].includes(color || '')) {
            window.__swc.warn(
                instance,
                `Color lightest and darkest are deprecated and will be removed in a future release`,
                'https://opensource.adobe.com/spectrum-web-components/tools/themes/#deprecation',
                { level: 'deprecation' }
            );
        }
    }
}
