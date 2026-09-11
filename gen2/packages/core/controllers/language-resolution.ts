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

// ────────────────────────────────────────────
// Shared <html lang> observer (singleton)
// ────────────────────────────────────────────
//
// Instead of each controller instance creating its own MutationObserver on
// document.documentElement, a single module-scoped observer fans out to every
// registered callback. The observer is created lazily when the first controller
// connects and torn down automatically when the last one disconnects.

type LangChangeListener = () => void;

const listeners = new Set<LangChangeListener>();
let sharedObserver: MutationObserver | undefined;

function addLangListener(listener: LangChangeListener): () => void {
  listeners.add(listener);

  if (!sharedObserver) {
    sharedObserver = new MutationObserver(() => {
      for (const cb of listeners) {
        cb();
      }
    });
    sharedObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      sharedObserver?.disconnect();
      sharedObserver = undefined;
    }
  };
}

/**
 * A reactive controller that manages language/locale resolution for components.
 *
 * This controller:
 * - Gets initial language from `<html lang>`, then `navigator.language`, then `'en-US'`
 * - Optionally subscribes to a provider (e.g. 1st-gen `<sp-theme>`) via the
 *   `sp-language-context` event; if something up the tree handles it and calls the
 *   callback, that becomes the source of truth for live updates
 * - Observes `<html lang>` attribute changes via a shared singleton observer so that
 *   when the document language changes at runtime (e.g. app-level locale switching),
 *   the controller updates and the host re-renders (e.g. aria-valuetext reformats)
 * - Validates locale support using Intl API and falls back to `'en-US'` if unsupported
 *
 * In 2nd-gen there is no sp-theme language provider, so live updates come from
 * `<html lang>` changes. Apps that support locale switching should set
 * `document.documentElement.lang` when the locale changes; the controller will
 * pick it up and trigger updates.
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
  language = this.getDocumentLanguage();

  /** Unsubscribe from the sp-language-context provider (if any). */
  private unsubscribe?: () => void;

  /** Unsubscribe from the shared <html lang> observer. */
  private removeLangListener?: () => void;

  constructor(host: ReactiveElement) {
    this.host = host;
    this.host.addController(this);
  }

  /**
   * Reads language from document and validates. Used for initial value and
   * when syncing from `<html lang>` changes.
   */
  private getDocumentLanguage(): string {
    const raw = document.documentElement.lang || navigator.language || 'en-US';
    try {
      Intl.DateTimeFormat.supportedLocalesOf([raw]);
      return raw;
    } catch {
      return 'en-US';
    }
  }

  public hostConnected(): void {
    this.resolveLanguage();
    this.removeLangListener = addLangListener(this.handleLangChange.bind(this));
  }

  public hostDisconnected(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.removeLangListener?.();
    this.removeLangListener = undefined;
  }

  /**
   * Called by the shared observer when `<html lang>` changes.
   * Skipped when a provider (e.g. sp-theme) is the source of truth.
   */
  private handleLangChange(): void {
    if (this.unsubscribe) {
      return;
    }
    const next = this.getDocumentLanguage();
    if (next === this.language) {
      return;
    }
    const previous = this.language;
    this.language = next;
    this.host.requestUpdate(languageResolverUpdatedSymbol, previous);
  }

  /**
   * Resolves the language: syncs from document, then queries for a provider
   * (e.g. sp-theme) via 'sp-language-context'. If a provider calls the
   * callback, it becomes the source of truth until disconnected.
   *
   * @private
   */
  private resolveLanguage(): void {
    this.language = this.getDocumentLanguage();
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
