/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { makeDecorator, useEffect } from '@storybook/preview-api';
import { fetchContainers } from './helpers';

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 **/
export const withLanguageWrapper = makeDecorator({
    name: 'withLanguageWrapper',
    parameterName: 'lang',
    wrapper: (StoryFn, context) => {
        const { globals: { lang = false } = {}, id, viewMode } = context;

        const currentKitId = (window as Window & { currentKitId?: string })
            .currentKitId;

        // Add a textDirection property to the globals for use in the stories
        const isRTL = ['ar', 'fa', 'he'].includes(lang); // fa/Farsi is currently not included in the storybook toolbar map
        context.globals.textDirection = isRTL ? 'rtl' : 'ltr';

        useEffect(() => {
            // Set the language on all containers and track if it has changed
            let hasChanged = false;
            const langAttr = lang ? String(lang) : 'en-US';
            for (const container of fetchContainers(id, viewMode === 'docs')) {
                if (container.getAttribute('lang') !== langAttr) {
                    container.setAttribute('lang', langAttr);
                    hasChanged = true;
                }
                container.setAttribute('dir', `${!isRTL ? 'ltr' : 'rtl'}`);
            }

            // If the fonts are actively loading, do not re-trigger the load
            if (
                (window as Window & { FontsLoading?: boolean }).FontsLoading ===
                true
            )
                return;
            // If the language has not changed, do not re-trigger the load
            if (!hasChanged) return;

            // Resolve kitId from locale: Latin default (obc6cux), CJK kits loaded on-demand (see preview-head __SWC_FONT_KIT_IDS__).
            const win = window as Window & {
                getKitIdForLang?: (l: string | false) => string;
                Typekit?: { load: (c: Record<string, unknown>) => void };
                FontsLoading?: boolean;
                currentKitId?: string;
            };

            console.log(win.currentKitId);
            // If it is US-language or unset, use the obc6cux Adobe font web project id
            // (smaller size),
            // otherwise use the CJK kits with all the language settings (multiple kits; larger size)
            const kitId =
                typeof win.getKitIdForLang === 'function'
                    ? win.getKitIdForLang(lang)
                    : 'obc6cux';

            // If the current kit is the same as the new kit, do not re-trigger the load
            if (currentKitId === kitId) return;

            const defaultKitId = (
                typeof win.getKitIdForLang === 'function'
                    ? win.getKitIdForLang(false)
                    : 'obc6cux'
            ) as string;

            // Remove any previously injected Typekit script (from this decorator). The default kit
            // script is added in preview-head and is not marked, so it stays.
            const dynamicScripts = document.querySelectorAll(
                'script[data-swc-typekit-dynamic="true"]'
            );
            dynamicScripts.forEach((el) => el.remove());

            // If switching back to default, we're done; the default script is already in the page.
            if (kitId === defaultKitId) {
                win.currentKitId = kitId;
                document.dispatchEvent(
                    new CustomEvent('typekit-loaded', { detail: { kitId } })
                );
                return;
            }

            // Loading a different kit requires injecting that kit's script; Typekit.load() alone
            // does not fetch another kit's JS when the page initially loaded a different kit.
            try {
                win.FontsLoading = true;
                const script = document.createElement('script');
                script.setAttribute('data-swc-typekit-dynamic', 'true');
                script.src = 'https://use.typekit.net/' + kitId + '.js';
                script.async = true;
                script.onload = function () {
                    win.FontsLoading = false;
                    win.currentKitId = kitId;
                    console.log('Font loaded [id: ' + kitId + ']');
                    document.dispatchEvent(
                        new CustomEvent('typekit-loaded', { detail: { kitId } })
                    );
                };
                script.onerror = function () {
                    win.FontsLoading = false;
                    console.warn('Typekit failed to load kit:', kitId);
                };
                document.head.appendChild(script);
            } catch (e) {
                win.FontsLoading = false;
                console.warn('Typekit failed to load kit:', kitId, e);
            }
        }, [lang, id, viewMode, currentKitId]);

        return StoryFn(context);
    },
});
