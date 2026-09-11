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
/**
 * Symbol used to track language resolver updates in reactive element lifecycle.
 * When the language context changes, components use this symbol to trigger updates
 * to locale-dependent content (e.g., formatted dates, numbers, currency).
 */
export declare const languageResolverUpdatedSymbol: unique symbol;
/**
 * A reactive controller that manages language/locale resolution for components.
 */
export declare class LanguageResolutionController implements ReactiveController {
    private host;
    /**
     * The currently resolved language/locale code (e.g., 'en-US', 'fr-FR').
     * Defaults to document language, browser language, or 'en-US'.
     */
    language: string;
    /** Unsubscribe from the sp-language-context provider (if any). */
    private unsubscribe?;
    /** Unsubscribe from the shared <html lang> observer. */
    private removeLangListener?;
    constructor(host: ReactiveElement);
    /**
     * Reads language from document and validates. Used for initial value and
     * when syncing from `<html lang>` changes.
     */
    private getDocumentLanguage;
    hostConnected(): void;
    hostDisconnected(): void;
    /**
     * Called by the shared observer when `<html lang>` changes.
     * Skipped when a provider (e.g. sp-theme) is the source of truth.
     */
    private handleLangChange;
    /**
     * Resolves the language: syncs from document, then queries for a provider
     * (e.g. sp-theme) via 'sp-language-context'. If a provider calls the
     * callback, it becomes the source of truth until disconnected.
     */
    private resolveLanguage;
}
