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

import { addons, makeDecorator, useEffect } from '@storybook/preview-api';

import type {} from '../storybook-env';

const DEFAULT_KIT_ID = 'obc6cux';

let languageListenerAttached = false;

/**
 * Applies the selected language (lang/dir) to the document and loads the corresponding
 * Adobe Fonts kit if needed. Safe to call from the decorator or from a toolbar listener
 * so that font loading works even when the decorator does not re-run (e.g. on some docs pages).
 */
function applyLanguageAndFontKit(lang: string | false, isRTL: boolean): void {
  const langAttr = lang ? String(lang) : 'en-US';
  const root = document.documentElement;

  // Set the language on the document root and track if it has changed
  let hasChanged = false;
  if (root.getAttribute('lang') !== langAttr) {
    root.setAttribute('lang', langAttr);
    hasChanged = true;
  }
  root.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  // If the fonts are actively loading, do not re-trigger the load
  if (window.FontsLoading === true) {
    return;
  }
  // If the language has not changed, do not re-trigger the load
  if (!hasChanged) {
    return;
  }

  // Resolve kitId from locale: Latin default (obc6cux), CJK kits loaded on-demand
  // (see preview-head __SWC_FONT_KIT_IDS__).
  const getKitId =
    typeof window.getKitIdForLang === 'function'
      ? window.getKitIdForLang
      : () => DEFAULT_KIT_ID;
  const kitId = getKitId(lang);
  // If the current kit is the same as the new kit, do not re-trigger the load
  if (window.currentKitId === kitId) {
    return;
  }

  const defaultKitId = getKitId(false) as string;

  // Remove any previously injected Typekit script and stylesheet (from this decorator).
  // The default kit's script and stylesheet are added in preview-head and are not marked,
  // so they stay.
  const dynamicElements = document.querySelectorAll(
    '[data-swc-typekit-dynamic="true"]'
  );
  dynamicElements.forEach((el) => el.remove());

  // If switching back to default, we're done; the default script is already in the page.
  if (kitId === defaultKitId) {
    window.currentKitId = kitId;
    document.dispatchEvent(
      new CustomEvent('typekit-loaded', { detail: { kitId } })
    );
    return;
  }

  // Loading a different kit requires injecting the kit's script first, then calling
  // Typekit.load() to register and activate the fonts.
  // Set currentKitId before loading so the decorator won't retry the same kit on re-render.
  window.currentKitId = kitId;
  try {
    window.FontsLoading = true;

    // Inject the kit's stylesheet so @font-face rules map font family names to font file URLs.
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://use.typekit.net/' + kitId + '.css';
    link.setAttribute('data-swc-typekit-dynamic', 'true');
    document.head.appendChild(link);

    // Inject the kit's script so Typekit.load() can activate fonts and toggle wf-* classes.
    const script = document.createElement('script');
    script.setAttribute('data-swc-typekit-dynamic', 'true');
    script.src = 'https://use.typekit.net/' + kitId + '.js';
    script.async = true;
    script.onload = function () {
      try {
        window.Typekit?.load({
          kitId: kitId,
          async: true,
          scriptTimeout: 3000,
          active: function () {
            window.FontsLoading = false;
            // eslint-disable-next-line no-console
            console.log(`Current font loaded [id: ${this.kitId}]`);
            document.dispatchEvent(
              new CustomEvent('typekit-loaded', {
                detail: { kitId },
              })
            );
          },
          inactive: function () {
            window.FontsLoading = false;
          },
        });
      } catch (e) {
        window.FontsLoading = false;
        console.warn('Typekit.load() failed for kit:', kitId, e);
      }
    };
    script.onerror = function () {
      window.FontsLoading = false;
    };
    document.head.appendChild(script);
  } catch (e) {
    window.FontsLoading = false;
    console.warn('Typekit failed to load kit:', kitId, e);
  }
}

/**
 * Attaches a one-time listener for Storybook toolbar language changes so that
 * font loading works even when the decorator does not re-run (e.g. on docs pages).
 */
function attachLanguageChangeListener(): void {
  if (languageListenerAttached || typeof document === 'undefined') {
    return;
  }
  languageListenerAttached = true;
  try {
    const channel = addons.getChannel();
    channel.on('globalsUpdated', (payload: { globals?: { lang?: string } }) => {
      const lang = payload?.globals?.lang ?? 'en-US';
      const isRTL = ['ar', 'fa', 'he'].includes(lang);
      applyLanguageAndFontKit(lang, isRTL);
    });
  } catch {
    // Storybook event bus not available (e.g. in test env); decorator-only path still works.
  }
}

/**
 * @type import('@storybook/csf').DecoratorFunction<import('@storybook/web-components').WebComponentsFramework>
 **/
export const withLanguageWrapper = makeDecorator({
  name: 'withLanguageWrapper',
  parameterName: 'lang',
  wrapper: (StoryFn, context) => {
    const { globals: { lang = false } = {}, id, viewMode } = context;

    // Add a textDirection property to the globals for use in the stories
    // fa/Farsi is currently not included in the storybook toolbar map
    const isRTL = ['ar', 'fa', 'he'].includes(lang);
    context.globals.textDirection = isRTL ? 'rtl' : 'ltr';

    attachLanguageChangeListener();

    useEffect(() => {
      applyLanguageAndFontKit(lang, isRTL);
    }, [lang, id, viewMode]);

    return StoryFn(context);
  },
});
