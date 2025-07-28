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

import { ProvideLang } from '@spectrum-web-components/theme';

export const createLanguageContext = (
    lang: string
): [(event: CustomEvent<ProvideLang>) => void, (lang: string) => void] => {
    let language = lang;
    const updateLanguage = (lang: string): void => {
        language = lang;
        resolveLanguage();
    };
    const langResolvers: [ProvideLang['callback'], () => void][] = [];
    const createLangResolver = (event: CustomEvent<ProvideLang>): void => {
        langResolvers.push([
            event.detail.callback,
            () => langResolvers.splice(langResolvers.length, 1),
        ]);
        resolveLanguage();
    };
    const resolveLanguage = (): void => {
        langResolvers.forEach(([resolver, unsubscribe]) =>
            resolver(language, unsubscribe)
        );
    };
    return [createLangResolver, updateLanguage];
};
