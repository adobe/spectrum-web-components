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

/**
 * Maps Storybook toolbar lang (e.g. en-US, zh-Hans) to a key in translations.json.
 * Use this so toolbar locale matches the translation bundles (en, zh, ar, he, ja, ko, etc.).
 */
export function getTranslationKey(lang: string | false | undefined): string {
    if (!lang || typeof lang !== 'string') return 'en';

    const langIsNormalized = lang.trim().toLowerCase();

    if (langIsNormalized === 'en-us' || langIsNormalized === 'en') return 'en';

    if (
        ['zh-hans', 'zh-hant', 'zh-hk', 'zh-cn', 'zh-tw'].includes(
            langIsNormalized
        )
    )
        return 'zh';

    // ar, he, ja, ko, fa, th, zh exist in translations.json; use as-is
    const knownKeys = ['ar', 'he', 'ja', 'ko', 'fa', 'th', 'zh'];
    if (knownKeys.includes(langIsNormalized)) return langIsNormalized;

    // Fallback: use base language if present (e.g. ja-JP -> ja)
    const base = langIsNormalized.split('-')[0];
    return base || 'en';
}
