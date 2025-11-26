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

export enum Locales {
    'bn-IN' = 'Bengali (India)',
    'cy-GB' = 'Welsh (United Kingdom)',
    'da-DK' = 'Danish (Denmark)',
    'de-DE' = 'German (Germany)',
    'el-GR' = 'Greek (Greece)',
    'en-US' = 'English (United States)',
    'es-ES' = 'Spanish (Spain)',
    'fi-FI' = 'Finnish (Finland)',
    'fil-PH' = 'Filipino (Philippines)',
    'fr-FR' = 'French (France)',
    'hi-IN' = 'Hindi (India)',
    'id-ID' = 'Indonesian (Indonesia)',
    'it-IT' = 'Italian (Italy)',
    'ja-JP' = 'Japanese (Japan)',
    'ko-KR' = 'Korean (South Korea)',
    'ms-MY' = 'Malay (Malaysia)',
    'nb-NO' = 'Norwegian (Bokmål, Norway)',
    'nl-NL' = 'Dutch (Netherlands)',
    'pl-PL' = 'Polish (Poland)',
    'pt-BR' = 'Portuguese (Brazil)',
    'ro-RO' = 'Romanian (Romania)',
    'sv-SE' = 'Swedish (Sweden)',
    'ta-IN' = 'Tamil (India)',
    'th-TH' = 'Thai (Thailand)',
    'tr-TR' = 'Turkish (Turkey)',
    'zh-Hans-CN' = 'Chinese (Simplified, China)',
    'zh-Hant-TW' = 'Chinese (Traditional, Taiwan)',
}

export type Locale = keyof typeof Locales;
