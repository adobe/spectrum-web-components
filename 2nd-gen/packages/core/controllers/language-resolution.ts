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

import type { ReactiveController, ReactiveElement } from 'lit';

// TODO: Update this when theme is migrated to 2nd-gen
type ProvideLang = {
  callback: (lang: string, unsubscribe: () => void) => void;
};

/**
 * Symbol used to track language resolver updates in reactive element lifecycle.
 * When the language context changes, components use this symbol to trigger updates
 * to locale-dependent content (e.g., formatted dates, numbers, currency).
 *
 * @example
 * ```typescript
 * protected override updated(changes: PropertyValues): void {
 *     if (changes.has(languageResolverUpdatedSymbol)) {
 *         // Re-render locale-dependent content
 *         this.setAttribute('aria-valuetext', this.formatProgress());
 *     }
 * }
 * ```
 */
export const languageResolverUpdatedSymbol = Symbol(
  'language resolver updated'
);

/**
 * A reactive controller that manages language/locale resolution for components.
 *
 * This controller:
 * - Automatically detects the document language or falls back to browser/default language
 * - Subscribes to language context changes from parent `<sp-theme>` elements
 * - Triggers host component updates when language changes
 * - Validates locale support using Intl API
 *
 * Components using this controller can access the current language via the `language`
 * property and will automatically re-render when the language context changes.
 *
 * @example
 * ```typescript
 * class MyComponent extends SpectrumElement {
 *     private languageResolver = new LanguageResolutionController(this);
 *
 *     protected override updated(changes: PropertyValues): void {
 *         if (changes.has(languageResolverUpdatedSymbol)) {
 *             // Update locale-dependent formatting
 *             this.formattedValue = new Intl.NumberFormat(
 *                 this.languageResolver.language
 *             ).format(this.value);
 *         }
 *     }
 * }
 * ```
 */
export class LanguageResolutionController implements ReactiveController {
  private host: ReactiveElement;

  /**
   * The currently resolved language/locale code (e.g., 'en-US', 'fr-FR').
   * Defaults to document language, browser language, or 'en-US'.
   */
  language = document.documentElement.lang || navigator.language || 'en-US';

  private unsubscribe?: () => void;

  constructor(host: ReactiveElement) {
    this.host = host;
    this.host.addController(this);
  }

  public hostConnected(): void {
    this.resolveLanguage();
  }

  public hostDisconnected(): void {
    this.unsubscribe?.();
  }

  /**
   * Resolves the language from the theme context and validates it against Intl API.
   * Falls back to 'en-US' if the language is not supported.
   *
   * @private
   */
  private resolveLanguage(): void {
    try {
      Intl.DateTimeFormat.supportedLocalesOf([this.language]);
    } catch {
      this.language = 'en-US';
    }
    const queryThemeEvent = new CustomEvent<ProvideLang>(
      'sp-language-context',
      {
        bubbles: true,
        composed: true,
        detail: {
          callback: (lang: string, unsubscribe: () => void) => {
            const previous = this.language;
            this.language = lang;
            this.unsubscribe = unsubscribe;
            this.host.requestUpdate(languageResolverUpdatedSymbol, previous);
          },
        },
        cancelable: true,
      }
    );
    this.host.dispatchEvent(queryThemeEvent);
  }
}
