/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { css } from 'lit-element';
const styles = css`
    :host,
    :root {
        --spectrum-global-animation-duration-0: 0ms;
        --spectrum-global-animation-duration-100: 130ms;
        --spectrum-global-animation-duration-200: 160ms;
        --spectrum-global-animation-duration-300: 190ms;
        --spectrum-global-animation-duration-400: 220ms;
        --spectrum-global-animation-duration-500: 250ms;
        --spectrum-global-animation-duration-600: 300ms;
        --spectrum-global-animation-duration-700: 350ms;
        --spectrum-global-animation-duration-800: 400ms;
        --spectrum-global-animation-duration-900: 450ms;
        --spectrum-global-animation-duration-1000: 500ms;
        --spectrum-global-animation-duration-2000: 1000ms;
        --spectrum-global-animation-duration-4000: 2000ms;
        --spectrum-global-animation-ease-in-out: cubic-bezier(0.45, 0, 0.4, 1);
        --spectrum-global-animation-ease-in: cubic-bezier(0.5, 0, 1, 1);
        --spectrum-global-animation-ease-out: cubic-bezier(0, 0, 0.4, 1);
        --spectrum-global-animation-linear: cubic-bezier(0, 0, 1, 1);
        --spectrum-global-color-static-black: #000;
        --spectrum-global-color-static-white: #fff;
        --spectrum-global-color-static-blue: #1473e6;
        --spectrum-global-color-static-gray-50: #fff;
        --spectrum-global-color-static-gray-75: #fff;
        --spectrum-global-color-static-gray-100: #fff;
        --spectrum-global-color-static-gray-200: #f4f4f4;
        --spectrum-global-color-static-gray-300: #eaeaea;
        --spectrum-global-color-static-gray-400: #d3d3d3;
        --spectrum-global-color-static-gray-500: #bcbcbc;
        --spectrum-global-color-static-gray-600: #959595;
        --spectrum-global-color-static-gray-700: #747474;
        --spectrum-global-color-static-gray-800: #505050;
        --spectrum-global-color-static-gray-900: #323232;
        --spectrum-global-color-static-blue-400: #378ef0;
        --spectrum-global-color-static-blue-500: #2680eb;
        --spectrum-global-color-static-blue-600: #1473e6;
        --spectrum-global-color-static-blue-700: #0d66d0;
        --spectrum-global-color-static-red-400: #ec5b62;
        --spectrum-global-color-static-red-500: #e34850;
        --spectrum-global-color-static-red-600: #d7373f;
        --spectrum-global-color-static-red-700: #c9252d;
        --spectrum-global-color-static-orange-400: #f29423;
        --spectrum-global-color-static-orange-500: #e68619;
        --spectrum-global-color-static-orange-600: #da7b11;
        --spectrum-global-color-static-orange-700: #cb6f10;
        --spectrum-global-color-static-green-400: #33ab84;
        --spectrum-global-color-static-green-500: #2d9d78;
        --spectrum-global-color-static-green-600: #268e6c;
        --spectrum-global-color-static-green-700: #12805c;
        --spectrum-global-color-static-celery-400: #4bc35f;
        --spectrum-global-color-static-celery-500: #44b556;
        --spectrum-global-color-static-celery-600: #3da74e;
        --spectrum-global-color-static-celery-700: #379947;
        --spectrum-global-color-static-chartreuse-400: #8ede49;
        --spectrum-global-color-static-chartreuse-500: #85d044;
        --spectrum-global-color-static-chartreuse-600: #7cc33f;
        --spectrum-global-color-static-chartreuse-700: #73b53a;
        --spectrum-global-color-static-yellow-400: #edcc00;
        --spectrum-global-color-static-yellow-500: #dfbf00;
        --spectrum-global-color-static-yellow-600: #d2b200;
        --spectrum-global-color-static-yellow-700: #c4a600;
        --spectrum-global-color-static-magenta-400: #e2499d;
        --spectrum-global-color-static-magenta-500: #d83790;
        --spectrum-global-color-static-magenta-600: #ca2982;
        --spectrum-global-color-static-magenta-700: #bc1c74;
        --spectrum-global-color-static-fuchsia-400: #cf3edc;
        --spectrum-global-color-static-fuchsia-500: #c038cc;
        --spectrum-global-color-static-fuchsia-600: #b130bd;
        --spectrum-global-color-static-fuchsia-700: #a228ad;
        --spectrum-global-color-static-purple-400: #9d64e1;
        --spectrum-global-color-static-purple-500: #9256d9;
        --spectrum-global-color-static-purple-600: #864ccc;
        --spectrum-global-color-static-purple-700: #7a42bf;
        --spectrum-global-color-static-indigo-400: #7575f1;
        --spectrum-global-color-static-indigo-500: #6767ec;
        --spectrum-global-color-static-indigo-600: #5c5ce0;
        --spectrum-global-color-static-indigo-700: #5151d3;
        --spectrum-global-color-static-seafoam-400: #20a3a8;
        --spectrum-global-color-static-seafoam-500: #1b959a;
        --spectrum-global-color-static-seafoam-600: #16878c;
        --spectrum-global-color-static-seafoam-700: #0f797d;
        --spectrum-global-color-opacity-100: 1;
        --spectrum-global-color-opacity-90: 0.9;
        --spectrum-global-color-opacity-80: 0.8;
        --spectrum-global-color-opacity-60: 0.6;
        --spectrum-global-color-opacity-50: 0.5;
        --spectrum-global-color-opacity-40: 0.4;
        --spectrum-global-color-opacity-30: 0.3;
        --spectrum-global-color-opacity-25: 0.25;
        --spectrum-global-color-opacity-20: 0.2;
        --spectrum-global-color-opacity-15: 0.15;
        --spectrum-global-color-opacity-10: 0.1;
        --spectrum-global-color-opacity-8: 0.08;
        --spectrum-global-color-opacity-7: 0.07;
        --spectrum-global-color-opacity-6: 0.06;
        --spectrum-global-color-opacity-5: 0.05;
        --spectrum-global-color-opacity-4: 0.04;
        --spectrum-semantic-negative-color-background: var(
            --spectrum-global-color-static-red-700
        );
        --spectrum-semantic-negative-color-default: var(
            --spectrum-global-color-red-500
        );
        --spectrum-semantic-negative-color-dark: var(
            --spectrum-global-color-red-600
        );
        --spectrum-semantic-negative-color-border: var(
            --spectrum-global-color-red-400
        );
        --spectrum-semantic-negative-color-icon: var(
            --spectrum-global-color-red-600
        );
        --spectrum-semantic-negative-color-status: var(
            --spectrum-global-color-red-400
        );
        --spectrum-semantic-negative-color-text-large: var(
            --spectrum-global-color-red-500
        );
        --spectrum-semantic-negative-color-text-small: var(
            --spectrum-global-color-red-600
        );
        --spectrum-semantic-negative-color-state-down: var(
            --spectrum-global-color-red-700
        );
        --spectrum-semantic-negative-color-state-focus: var(
            --spectrum-global-color-red-400
        );
        --spectrum-semantic-notice-color-background: var(
            --spectrum-global-color-static-orange-700
        );
        --spectrum-semantic-notice-color-default: var(
            --spectrum-global-color-orange-500
        );
        --spectrum-semantic-notice-color-dark: var(
            --spectrum-global-color-orange-600
        );
        --spectrum-semantic-notice-color-border: var(
            --spectrum-global-color-orange-400
        );
        --spectrum-semantic-notice-color-icon: var(
            --spectrum-global-color-orange-600
        );
        --spectrum-semantic-notice-color-status: var(
            --spectrum-global-color-orange-400
        );
        --spectrum-semantic-notice-color-text-large: var(
            --spectrum-global-color-orange-500
        );
        --spectrum-semantic-notice-color-text-small: var(
            --spectrum-global-color-orange-600
        );
        --spectrum-semantic-notice-color-state-down: var(
            --spectrum-global-color-orange-700
        );
        --spectrum-semantic-notice-color-state-focus: var(
            --spectrum-global-color-orange-400
        );
        --spectrum-semantic-positive-color-background: var(
            --spectrum-global-color-static-green-700
        );
        --spectrum-semantic-positive-color-default: var(
            --spectrum-global-color-green-500
        );
        --spectrum-semantic-positive-color-dark: var(
            --spectrum-global-color-green-600
        );
        --spectrum-semantic-positive-color-border: var(
            --spectrum-global-color-green-400
        );
        --spectrum-semantic-positive-color-icon: var(
            --spectrum-global-color-green-600
        );
        --spectrum-semantic-positive-color-status: var(
            --spectrum-global-color-green-400
        );
        --spectrum-semantic-positive-color-text-large: var(
            --spectrum-global-color-green-500
        );
        --spectrum-semantic-positive-color-text-small: var(
            --spectrum-global-color-green-600
        );
        --spectrum-semantic-positive-color-state-down: var(
            --spectrum-global-color-green-700
        );
        --spectrum-semantic-positive-color-state-focus: var(
            --spectrum-global-color-green-400
        );
        --spectrum-semantic-informative-color-background: var(
            --spectrum-global-color-static-blue-700
        );
        --spectrum-semantic-informative-color-default: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-semantic-informative-color-dark: var(
            --spectrum-global-color-blue-600
        );
        --spectrum-semantic-informative-color-border: var(
            --spectrum-global-color-blue-400
        );
        --spectrum-semantic-informative-color-icon: var(
            --spectrum-global-color-blue-600
        );
        --spectrum-semantic-informative-color-status: var(
            --spectrum-global-color-blue-400
        );
        --spectrum-semantic-informative-color-text-large: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-semantic-informative-color-text-small: var(
            --spectrum-global-color-blue-600
        );
        --spectrum-semantic-informative-color-state-down: var(
            --spectrum-global-color-blue-700
        );
        --spectrum-semantic-informative-color-state-focus: var(
            --spectrum-global-color-blue-400
        );
        --spectrum-semantic-cta-color-background-default: var(
            --spectrum-global-color-static-blue-600
        );
        --spectrum-semantic-cta-color-background-hover: var(
            --spectrum-global-color-static-blue-700
        );
        --spectrum-semantic-cta-color-background-down: var(
            --spectrum-global-color-static-blue-700
        );
        --spectrum-semantic-cta-color-background-key-focus: var(
            --spectrum-global-color-static-blue-600
        );
        --spectrum-semantic-background-color-key-focus: var(
            --spectrum-global-color-static-blue-600
        );
        --spectrum-semantic-neutral-color-background: var(
            --spectrum-global-color-static-gray-700
        );
        --spectrum-semantic-presence-color-1: var(
            --spectrum-global-color-static-red-500
        );
        --spectrum-semantic-presence-color-2: var(
            --spectrum-global-color-static-orange-400
        );
        --spectrum-semantic-presence-color-3: var(
            --spectrum-global-color-static-yellow-400
        );
        --spectrum-semantic-presence-color-4: #4bcca2;
        --spectrum-semantic-presence-color-5: #00c7ff;
        --spectrum-semantic-presence-color-6: #008cb8;
        --spectrum-semantic-presence-color-7: #7e4bf3;
        --spectrum-semantic-presence-color-8: var(
            --spectrum-global-color-static-fuchsia-600
        );
        --spectrum-global-dimension-static-size-0: 0px;
        --spectrum-global-dimension-static-size-10: 1px;
        --spectrum-global-dimension-static-size-25: 2px;
        --spectrum-global-dimension-static-size-50: 4px;
        --spectrum-global-dimension-static-size-40: 3px;
        --spectrum-global-dimension-static-size-65: 5px;
        --spectrum-global-dimension-static-size-100: 8px;
        --spectrum-global-dimension-static-size-115: 9px;
        --spectrum-global-dimension-static-size-125: 10px;
        --spectrum-global-dimension-static-size-150: 12px;
        --spectrum-global-dimension-static-size-175: 14px;
        --spectrum-global-dimension-static-size-200: 16px;
        --spectrum-global-dimension-static-size-225: 18px;
        --spectrum-global-dimension-static-size-250: 20px;
        --spectrum-global-dimension-static-size-300: 24px;
        --spectrum-global-dimension-static-size-400: 32px;
        --spectrum-global-dimension-static-size-450: 36px;
        --spectrum-global-dimension-static-size-500: 40px;
        --spectrum-global-dimension-static-size-550: 44px;
        --spectrum-global-dimension-static-size-600: 48px;
        --spectrum-global-dimension-static-size-700: 56px;
        --spectrum-global-dimension-static-size-800: 64px;
        --spectrum-global-dimension-static-size-900: 72px;
        --spectrum-global-dimension-static-size-1000: 80px;
        --spectrum-global-dimension-static-size-1200: 96px;
        --spectrum-global-dimension-static-size-1700: 136px;
        --spectrum-global-dimension-static-size-2400: 192px;
        --spectrum-global-dimension-static-size-2600: 208px;
        --spectrum-global-dimension-static-size-3400: 272px;
        --spectrum-global-dimension-static-size-3600: 288px;
        --spectrum-global-dimension-static-size-4600: 368px;
        --spectrum-global-dimension-static-size-5000: 400px;
        --spectrum-global-dimension-static-size-6000: 480px;
        --spectrum-global-dimension-static-font-size-50: 11px;
        --spectrum-global-dimension-static-font-size-75: 12px;
        --spectrum-global-dimension-static-font-size-100: 14px;
        --spectrum-global-dimension-static-font-size-150: 15px;
        --spectrum-global-dimension-static-font-size-200: 16px;
        --spectrum-global-dimension-static-font-size-300: 18px;
        --spectrum-global-dimension-static-font-size-400: 20px;
        --spectrum-global-dimension-static-font-size-500: 22px;
        --spectrum-global-dimension-static-font-size-600: 25px;
        --spectrum-global-dimension-static-font-size-700: 28px;
        --spectrum-global-dimension-static-font-size-800: 32px;
        --spectrum-global-dimension-static-font-size-900: 36px;
        --spectrum-global-dimension-static-font-size-1000: 40px;
        --spectrum-global-dimension-static-percent-50: 50%;
        --spectrum-global-dimension-static-percent-100: 100%;
        --spectrum-global-dimension-static-breakpoint-xsmall: 304px;
        --spectrum-global-dimension-static-breakpoint-small: 768px;
        --spectrum-global-dimension-static-breakpoint-medium: 1280px;
        --spectrum-global-dimension-static-breakpoint-large: 1768px;
        --spectrum-global-dimension-static-breakpoint-xlarge: 2160px;
        --spectrum-global-dimension-static-grid-columns: 12;
        --spectrum-global-dimension-static-grid-fluid-width: 100%;
        --spectrum-global-dimension-static-grid-fixed-max-width: 1280px;
        --spectrum-global-font-family-base: adobe-clean, 'Source Sans Pro',
            -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu,
            'Trebuchet MS', 'Lucida Grande', sans-serif;
        --spectrum-global-font-family-serif: adobe-clean-serif,
            'Source Serif Pro', Georgia, serif;
        --spectrum-global-font-family-code: 'Source Code Pro', Monaco, monospace;
        --spectrum-global-font-weight-thin: 100;
        --spectrum-global-font-weight-ultra-light: 200;
        --spectrum-global-font-weight-light: 300;
        --spectrum-global-font-weight-regular: 400;
        --spectrum-global-font-weight-medium: 500;
        --spectrum-global-font-weight-semi-bold: 600;
        --spectrum-global-font-weight-bold: 700;
        --spectrum-global-font-weight-extra-bold: 800;
        --spectrum-global-font-weight-black: 900;
        --spectrum-global-font-style-regular: normal;
        --spectrum-global-font-style-italic: italic;
        --spectrum-global-font-letter-spacing-none: 0;
        --spectrum-global-font-letter-spacing-small: 0.0125em;
        --spectrum-global-font-letter-spacing-han: 0.05em;
        --spectrum-global-font-letter-spacing-medium: 0.06em;
        --spectrum-global-font-line-height-large: 1.7;
        --spectrum-global-font-line-height-medium: 1.5;
        --spectrum-global-font-line-height-small: 1.3;
        --spectrum-global-font-multiplier-25: 0.25em;
        --spectrum-global-font-multiplier-75: 0.75em;
        --spectrum-alias-border-size-thin: var(
            --spectrum-global-dimension-static-size-10
        );
        --spectrum-alias-border-size-thick: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-alias-border-size-thicker: var(
            --spectrum-global-dimension-static-size-50
        );
        --spectrum-alias-border-size-thickest: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-alias-border-offset-thin: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-alias-border-offset-thick: var(
            --spectrum-global-dimension-static-size-50
        );
        --spectrum-alias-border-offset-thicker: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-alias-border-offset-thickest: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-alias-grid-baseline: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-alias-grid-gutter-xsmall: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-alias-grid-gutter-small: var(
            --spectrum-global-dimension-static-size-300
        );
        --spectrum-alias-grid-gutter-medium: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-alias-grid-gutter-large: var(
            --spectrum-global-dimension-static-size-500
        );
        --spectrum-alias-grid-gutter-xlarge: var(
            --spectrum-global-dimension-static-size-600
        );
        --spectrum-alias-grid-margin-xsmall: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-alias-grid-margin-small: var(
            --spectrum-global-dimension-static-size-300
        );
        --spectrum-alias-grid-margin-medium: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-alias-grid-margin-large: var(
            --spectrum-global-dimension-static-size-500
        );
        --spectrum-alias-grid-margin-xlarge: var(
            --spectrum-global-dimension-static-size-600
        );
        --spectrum-alias-grid-layout-region-margin-bottom-xsmall: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-alias-grid-layout-region-margin-bottom-small: var(
            --spectrum-global-dimension-static-size-300
        );
        --spectrum-alias-grid-layout-region-margin-bottom-medium: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-alias-grid-layout-region-margin-bottom-large: var(
            --spectrum-global-dimension-static-size-500
        );
        --spectrum-alias-grid-layout-region-margin-bottom-xlarge: var(
            --spectrum-global-dimension-static-size-600
        );
        --spectrum-alias-radial-reaction-size-default: var(
            --spectrum-global-dimension-static-size-550
        );
        --spectrum-alias-font-family-ar: myriad-arabic, adobe-clean,
            'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Ubuntu, 'Trebuchet MS', 'Lucida Grande', sans-serif;
        --spectrum-alias-font-family-he: myriad-hebrew, adobe-clean,
            'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Ubuntu, 'Trebuchet MS', 'Lucida Grande', sans-serif;
        --spectrum-alias-font-family-zh: adobe-clean-han-traditional,
            source-han-traditional, 'MingLiu', 'Heiti TC Light', 'sans-serif';
        --spectrum-alias-font-family-zhhans: adobe-clean-han-simplified-c,
            source-han-simplified-c, 'SimSun', 'Heiti SC Light', 'sans-serif';
        --spectrum-alias-font-family-ko: adobe-clean-han-korean,
            source-han-korean, 'Malgun Gothic', 'Apple Gothic', 'sans-serif';
        --spectrum-alias-font-family-ja: adobe-clean-han-japanese,
            source-han-japanese, 'Yu Gothic', '\\30E1 \\30A4 \\30EA \\30AA',
            '\\30D2 \\30E9 \\30AE \\30CE \\89D2 \\30B4  Pro W3',
            'Hiragino Kaku Gothic Pro W3', 'Osaka',
            '\\FF2D \\FF33 \\FF30 \\30B4 \\30B7 \\30C3 \\30AF', 'MS PGothic',
            'sans-serif';
        --spectrum-alias-font-family-condensed: adobe-clean-han-traditional,
            source-han-traditional, 'MingLiu', 'Heiti TC Light', adobe-clean,
            'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Ubuntu, 'Trebuchet MS', 'Lucida Grande', sans-serif;
        --spectrum-alias-line-height-body: var(
            --spectrum-global-font-line-height-medium
        );
        --spectrum-alias-line-height-title: var(
            --spectrum-global-font-line-height-small
        );
        --spectrum-alias-body-han-text-line-height: var(
            --spectrum-global-font-line-height-large
        );
        --spectrum-alias-body-text-font-family: var(
            --spectrum-global-font-family-base
        );
        --spectrum-alias-body-text-line-height: var(
            --spectrum-global-font-line-height-medium
        );
        --spectrum-alias-body-text-font-weight: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-body-text-font-weight-strong: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-button-text-line-height: var(
            --spectrum-global-font-line-height-small
        );
        --spectrum-alias-heading-han-text-line-height: var(
            --spectrum-global-font-line-height-medium
        );
        --spectrum-alias-heading-text-line-height: var(
            --spectrum-global-font-line-height-small
        );
        --spectrum-alias-heading-text-font-weight-regular: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-heading-text-font-weight-regular-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-heading-text-font-weight-quiet: var(
            --spectrum-global-font-weight-light
        );
        --spectrum-alias-heading-text-font-weight-quiet-strong: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-heading-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-heading-text-font-weight-strong-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-subheading-text-font-weight: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-subheading-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-detail-text-font-weight: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-detail-text-font-weight-strong: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-serif-text-font-family: var(
            --spectrum-global-font-family-serif
        );
        --spectrum-alias-article-text-font-family: var(
            --spectrum-global-font-family-serif
        );
        --spectrum-alias-article-body-text-font-weight: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-article-body-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-article-heading-text-font-weight: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-article-heading-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-article-heading-text-font-weight-quiet: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-article-heading-text-font-weight-quiet-strong: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-article-subheading-text-font-weight: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-article-subheading-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-article-detail-text-font-weight: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-article-detail-text-font-weight-strong: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-code-text-font-family: var(
            --spectrum-global-font-family-code
        );
        --spectrum-alias-han-heading-text-font-weight-regular: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-han-heading-text-font-weight-regular-emphasis: var(
            --spectrum-global-font-weight-extra-bold
        );
        --spectrum-alias-han-heading-text-font-weight-regular-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-heading-text-font-weight-quiet: var(
            --spectrum-global-font-weight-light
        );
        --spectrum-alias-han-heading-text-font-weight-quiet-emphasis: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-han-heading-text-font-weight-quiet-strong: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-han-heading-text-font-weight-light: var(
            --spectrum-global-font-weight-light
        );
        --spectrum-alias-han-heading-text-font-weight-light-emphasis: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-han-heading-text-font-weight-light-strong: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-han-heading-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-heading-text-font-weight-strong-emphasis: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-heading-text-font-weight-strong-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-heading-text-font-weight-heavy: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-heading-text-font-weight-heavy-emphasis: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-heading-text-font-weight-heavy-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-body-text-font-weight-regular: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-han-body-text-font-weight-emphasis: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-han-body-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-subheading-text-font-weight-regular: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-han-subheading-text-font-weight-emphasis: var(
            --spectrum-global-font-weight-extra-bold
        );
        --spectrum-alias-han-subheading-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-han-detail-text-font-weight: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-han-detail-text-font-weight-emphasis: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-han-detail-text-font-weight-strong: var(
            --spectrum-global-font-weight-black
        );
        --spectrum-alias-code-text-font-weight-regular: var(
            --spectrum-global-font-weight-regular
        );
        --spectrum-alias-code-text-font-weight-strong: var(
            --spectrum-global-font-weight-bold
        );
        --spectrum-alias-code-text-line-height: var(
            --spectrum-global-font-line-height-medium
        );
        --spectrum-alias-heading-margin-bottom: var(
            --spectrum-global-font-multiplier-25
        );
        --spectrum-alias-body-margin-bottom: var(
            --spectrum-global-font-multiplier-75
        );
        --spectrum-alias-dropshadow-blur: var(
            --spectrum-global-dimension-size-50
        );
        --spectrum-alias-dropshadow-offset-y: var(
            --spectrum-global-dimension-size-10
        );
        --spectrum-alias-font-size-default: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-alias-line-height-small: var(
            --spectrum-global-dimension-size-200
        );
        --spectrum-alias-line-height-medium: var(
            --spectrum-global-dimension-size-250
        );
        --spectrum-alias-line-height-large: var(
            --spectrum-global-dimension-size-300
        );
        --spectrum-alias-line-height-xlarge: var(
            --spectrum-global-dimension-size-400
        );
        --spectrum-alias-line-height-xxlarge: var(
            --spectrum-global-dimension-size-600
        );
        --spectrum-alias-layout-label-gap-size: var(
            --spectrum-global-dimension-size-100
        );
        --spectrum-alias-pill-button-text-size: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-alias-pill-button-text-baseline: var(
            --spectrum-global-dimension-static-size-150
        );
        --spectrum-alias-border-radius-xsmall: var(
            --spectrum-global-dimension-size-10
        );
        --spectrum-alias-border-radius-small: var(
            --spectrum-global-dimension-size-25
        );
        --spectrum-alias-border-radius-regular: var(
            --spectrum-global-dimension-size-50
        );
        --spectrum-alias-border-radius-medium: var(
            --spectrum-global-dimension-size-100
        );
        --spectrum-alias-border-radius-large: var(
            --spectrum-global-dimension-size-200
        );
        --spectrum-alias-single-line-height: var(
            --spectrum-global-dimension-size-400
        );
        --spectrum-alias-single-line-width: var(
            --spectrum-global-dimension-size-2400
        );
        --spectrum-alias-workflow-icon-size: var(
            --spectrum-global-dimension-size-225
        );
        --spectrum-alias-heading-han-display1-text-size: var(
            --spectrum-global-dimension-font-size-1000
        );
        --spectrum-alias-heading-han-xxxl-text-size: var(
            --spectrum-global-dimension-font-size-1000
        );
        --spectrum-alias-heading-han-display1-margin-top: var(
            --spectrum-global-dimension-font-size-900
        );
        --spectrum-alias-heading-han-xxxl-margin-top: var(
            --spectrum-global-dimension-font-size-900
        );
        --spectrum-alias-heading-han-display2-text-size: var(
            --spectrum-global-dimension-font-size-900
        );
        --spectrum-alias-heading-han-xxl-text-size: var(
            --spectrum-global-dimension-font-size-900
        );
        --spectrum-alias-heading-han-display2-margin-top: var(
            --spectrum-global-dimension-font-size-800
        );
        --spectrum-alias-heading-han-xxl-margin-top: var(
            --spectrum-global-dimension-font-size-800
        );
        --spectrum-alias-heading1-han-text-size: var(
            --spectrum-global-dimension-font-size-800
        );
        --spectrum-alias-heading-han-xl-text-size: var(
            --spectrum-global-dimension-font-size-800
        );
        --spectrum-alias-heading1-han-margin-top: var(
            --spectrum-global-dimension-font-size-700
        );
        --spectrum-alias-heading-han-xl-margin-top: var(
            --spectrum-global-dimension-font-size-700
        );
        --spectrum-alias-heading2-han-text-size: var(
            --spectrum-global-dimension-font-size-600
        );
        --spectrum-alias-heading-han-l-text-size: var(
            --spectrum-global-dimension-font-size-600
        );
        --spectrum-alias-heading2-han-margin-top: var(
            --spectrum-global-dimension-font-size-500
        );
        --spectrum-alias-heading-han-l-margin-top: var(
            --spectrum-global-dimension-font-size-500
        );
        --spectrum-alias-heading3-han-text-size: var(
            --spectrum-global-dimension-font-size-400
        );
        --spectrum-alias-heading-han-m-text-size: var(
            --spectrum-global-dimension-font-size-400
        );
        --spectrum-alias-heading3-han-margin-top: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-alias-heading-han-m-margin-top: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-alias-heading4-text-size: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-alias-heading-s-text-size: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-alias-heading4-margin-top: var(
            --spectrum-global-dimension-font-size-200
        );
        --spectrum-alias-heading-s-margin-top: var(
            --spectrum-global-dimension-font-size-200
        );
        --spectrum-alias-heading5-text-size: var(
            --spectrum-global-dimension-font-size-200
        );
        --spectrum-alias-heading-xs-text-size: var(
            --spectrum-global-dimension-font-size-200
        );
        --spectrum-alias-heading5-margin-top: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-alias-heading-xs-margin-top: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-alias-heading6-text-size: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-alias-heading-xxs-text-size: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-alias-heading6-margin-top: var(
            --spectrum-global-dimension-font-size-75
        );
        --spectrum-alias-heading-xxs-margin-top: var(
            --spectrum-global-dimension-font-size-75
        );
        --spectrum-alias-background-color-default: var(
            --spectrum-global-color-gray-100
        );
        --spectrum-alias-background-color-transparent: transparent;
        --spectrum-alias-background-color-label-gray: #707070;
        --spectrum-alias-background-color-quickactions-overlay: rgba(
            0,
            0,
            0,
            0.2
        );
        --spectrum-alias-placeholder-text-color: var(
            --spectrum-global-color-gray-600
        );
        --spectrum-alias-placeholder-text-color-hover: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-placeholder-text-color-down: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-placeholder-text-color-selected: var(
            --spectrum-global-color-gray-800
        );
        --spectrum-alias-label-text-color: var(
            --spectrum-global-color-gray-700
        );
        --spectrum-alias-text-color: var(--spectrum-global-color-gray-800);
        --spectrum-alias-text-color-hover: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-text-color-down: var(--spectrum-global-color-gray-900);
        --spectrum-alias-text-color-key-focus: var(
            --spectrum-global-color-blue-600
        );
        --spectrum-alias-text-color-mouse-focus: var(
            --spectrum-global-color-blue-600
        );
        --spectrum-alias-text-color-disabled: var(
            --spectrum-global-color-gray-500
        );
        --spectrum-alias-text-color-invalid: var(
            --spectrum-global-color-red-500
        );
        --spectrum-alias-text-color-selected: var(
            --spectrum-global-color-blue-600
        );
        --spectrum-alias-text-color-selected-neutral: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-title-text-color: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-heading-text-color: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-border-color: var(--spectrum-global-color-gray-300);
        --spectrum-alias-border-color-hover: var(
            --spectrum-global-color-gray-400
        );
        --spectrum-alias-border-color-focus: var(
            --spectrum-global-color-blue-400
        );
        --spectrum-alias-border-color-down: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-alias-border-color-extralight: var(
            --spectrum-global-color-gray-100
        );
        --spectrum-alias-border-color-light: var(
            --spectrum-global-color-gray-200
        );
        --spectrum-alias-border-color-mid: var(
            --spectrum-global-color-gray-300
        );
        --spectrum-alias-border-color-dark: var(
            --spectrum-global-color-gray-400
        );
        --spectrum-alias-border-color-transparent: transparent;
        --spectrum-alias-border-color-translucent-dark: rgba(0, 0, 0, 0.05);
        --spectrum-alias-border-color-translucent-darker: rgba(0, 0, 0, 0.1);
        --spectrum-alias-focus-color: var(--spectrum-global-color-blue-400);
        --spectrum-alias-track-color-default: var(
            --spectrum-global-color-gray-300
        );
        --spectrum-alias-track-color-disabled: var(
            --spectrum-global-color-gray-300
        );
        --spectrum-alias-track-color-over-background: hsla(0, 0%, 100%, 0.2);
        --spectrum-alias-icon-color: var(--spectrum-global-color-gray-700);
        --spectrum-alias-icon-color-over-background: var(
            --spectrum-global-color-static-white
        );
        --spectrum-alias-icon-color-hover: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-icon-color-down: var(--spectrum-global-color-gray-900);
        --spectrum-alias-icon-color-focus: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-icon-color-disabled: var(
            --spectrum-global-color-gray-400
        );
        --spectrum-alias-icon-color-selected-neutral: var(
            --spectrum-global-color-gray-900
        );
        --spectrum-alias-icon-color-selected: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-alias-icon-color-selected-hover: var(
            --spectrum-global-color-blue-600
        );
        --spectrum-alias-icon-color-selected-down: var(
            --spectrum-global-color-blue-700
        );
        --spectrum-alias-icon-color-selected-focus: var(
            --spectrum-global-color-blue-600
        );
        --spectrum-alias-icon-color-error: var(--spectrum-global-color-red-400);
        --spectrum-alias-toolbar-background-color: var(
            --spectrum-global-color-gray-100
        );
        --spectrum-font-fallbacks-sans: -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, sans-serif;
        --spectrum-font-family-base: 'adobe-clean-ux', 'adobe-clean',
            'Source Sans Pro', var(--spectrum-font-fallbacks-sans);
        --spectrum-font-family-han: 'adobe-clean-han-japanese',
            var(--spectrum-font-fallbacks-sans);
        --spectrum-font-family-ar: 'adobe-arabic', 'myriad-arabic',
            var(--spectrum-font-fallbacks-sans);
        --spectrum-font-family-he: 'adobe-hebrew',
            var(--spectrum-font-fallbacks-sans);
        --spectrum-font-family-zhhans: 'adobe-clean-han-simplified-c', 'SimSun',
            'Heiti SC Light', var(--spectrum-font-fallbacks-sans);
        --spectrum-font-family-zh: var(--spectrum-font-family-zhhans);
        --spectrum-font-family-zhhant: 'adobe-clean-han-traditional',
            'Microsoft JhengHei UI', 'Microsoft JhengHei', 'Heiti TC Light',
            var(--spectrum-font-fallbacks-sans);
        --spectrum-font-family-ko: 'adobe-clean-han-korean', 'Malgun Gothic',
            'Apple Gothic', var(--spectrum-font-fallbacks-sans);
        --spectrum-font-family-ja: 'adobe-clean-han-japanese', 'Yu Gothic',
            '\\30E1 \\30A4 \\30EA \\30AA',
            '\\30D2 \\30E9 \\30AE \\30CE \\89D2 \\30B4  Pro W3',
            'Hiragino Kaku Gothic Pro W3', 'Osaka',
            '\\FF2D \\FF33 \\FF30 \\30B4 \\30B7 \\30C3 \\30AF', 'MS PGothic',
            var(--spectrum-font-fallbacks-sans);
        --spectrum-text-size: var(--spectrum-alias-font-size-default);
        --spectrum-text-body-line-height: var(
            --spectrum-alias-line-height-medium
        );
        --spectrum-text-size-text-label: var(--spectrum-label-text-size);
        --spectrum-line-height-text-label: var(
            --spectrum-label-text-line-height
        );
        font-family: var(--spectrum-font-family-base);
        font-size: var(--spectrum-text-size);
    }
    :host:lang(ar),
    :root:lang(ar) {
        font-family: var(--spectrum-font-family-ar);
    }
    :host:lang(he),
    :root:lang(he) {
        font-family: var(--spectrum-font-family-he);
    }
    :host:lang(zh-Hans),
    :root:lang(zh-Hans) {
        font-family: var(--spectrum-font-family-zhhans);
    }
    :host:lang(zh-Hant),
    :root:lang(zh-Hant) {
        font-family: var(--spectrum-font-family-zhhant);
    }
    :host:lang(zh),
    :root:lang(zh) {
        font-family: var(--spectrum-font-family-zh);
    }
    :host:lang(ko),
    :root:lang(ko) {
        font-family: var(--spectrum-font-family-ko);
    }
    :host:lang(ja),
    :root:lang(ja) {
        font-family: var(--spectrum-font-family-ja);
    }
    :host,
    :root {
        --spectrum-global-color-celery-400: #44b556;
        --spectrum-global-color-celery-500: #3da74e;
        --spectrum-global-color-celery-600: #379947;
        --spectrum-global-color-celery-700: #318b40;
        --spectrum-global-color-chartreuse-400: #85d044;
        --spectrum-global-color-chartreuse-500: #7cc33f;
        --spectrum-global-color-chartreuse-600: #73b53a;
        --spectrum-global-color-chartreuse-700: #6aa834;
        --spectrum-global-color-yellow-400: #dfbf00;
        --spectrum-global-color-yellow-500: #d2b200;
        --spectrum-global-color-yellow-600: #c4a600;
        --spectrum-global-color-yellow-700: #b79900;
        --spectrum-global-color-magenta-400: #d83790;
        --spectrum-global-color-magenta-500: #ce2783;
        --spectrum-global-color-magenta-600: #bc1c74;
        --spectrum-global-color-magenta-700: #ae0e66;
        --spectrum-global-color-fuchsia-400: #c038cc;
        --spectrum-global-color-fuchsia-500: #b130bd;
        --spectrum-global-color-fuchsia-600: #a228ad;
        --spectrum-global-color-fuchsia-700: #93219e;
        --spectrum-global-color-purple-400: #9256d9;
        --spectrum-global-color-purple-500: #864ccc;
        --spectrum-global-color-purple-600: #7a42bf;
        --spectrum-global-color-purple-700: #6f38b1;
        --spectrum-global-color-indigo-400: #6767ec;
        --spectrum-global-color-indigo-500: #5c5ce0;
        --spectrum-global-color-indigo-600: #5151d3;
        --spectrum-global-color-indigo-700: #4646c6;
        --spectrum-global-color-seafoam-400: #1b959a;
        --spectrum-global-color-seafoam-500: #16878c;
        --spectrum-global-color-seafoam-600: #0f797d;
        --spectrum-global-color-seafoam-700: #096c6f;
        --spectrum-global-color-red-400: #e34850;
        --spectrum-global-color-red-500: #d7373f;
        --spectrum-global-color-red-600: #c9252d;
        --spectrum-global-color-red-700: #bb121a;
        --spectrum-global-color-orange-400: #e68619;
        --spectrum-global-color-orange-500: #da7b11;
        --spectrum-global-color-orange-600: #cb6f10;
        --spectrum-global-color-orange-700: #bd640d;
        --spectrum-global-color-green-400: #2d9d78;
        --spectrum-global-color-green-500: #268e6c;
        --spectrum-global-color-green-600: #12805c;
        --spectrum-global-color-green-700: #107154;
        --spectrum-global-color-blue-400: #2680eb;
        --spectrum-global-color-blue-500: #1473e6;
        --spectrum-global-color-blue-600: #0d66d0;
        --spectrum-global-color-blue-700: #095aba;
        --spectrum-global-color-gray-50: #fff;
        --spectrum-global-color-gray-75: #fafafa;
        --spectrum-global-color-gray-100: #f5f5f5;
        --spectrum-global-color-gray-200: #eaeaea;
        --spectrum-global-color-gray-300: #e1e1e1;
        --spectrum-global-color-gray-400: #cacaca;
        --spectrum-global-color-gray-500: #b3b3b3;
        --spectrum-global-color-gray-600: #8e8e8e;
        --spectrum-global-color-gray-700: #6e6e6e;
        --spectrum-global-color-gray-800: #4b4b4b;
        --spectrum-global-color-gray-900: #2c2c2c;
        --spectrum-alias-background-color-modal-overlay: rgba(0, 0, 0, 0.4);
        --spectrum-alias-dropshadow-color: rgba(0, 0, 0, 0.15);
        --spectrum-alias-background-color-hover-overlay: rgba(44, 44, 44, 0.04);
        --spectrum-alias-highlight-hover: rgba(44, 44, 44, 0.06);
        --spectrum-alias-highlight-active: rgba(44, 44, 44, 0.1);
        --spectrum-alias-highlight-selected: rgba(20, 115, 230, 0.1);
        --spectrum-alias-highlight-selected-hover: rgba(20, 115, 230, 0.2);
        --spectrum-alias-text-highlight-color: rgba(20, 115, 230, 0.2);
        --spectrum-alias-background-color-quickactions: hsla(0, 0%, 96.1%, 0.9);
        --spectrum-alias-radial-reaction-color-default: rgba(75, 75, 75, 0.6);
        --spectrum-alias-pasteboard-background-color: var(
            --spectrum-global-color-gray-300
        );
        --spectrum-alias-appframe-border-color: var(
            --spectrum-global-color-gray-300
        );
        --spectrum-alias-appframe-separator-color: var(
            --spectrum-global-color-gray-300
        );
        --spectrum-colorarea-border-color: rgba(44, 44, 44, 0.1);
        --spectrum-colorarea-border-color-hover: rgba(44, 44, 44, 0.1);
        --spectrum-colorarea-border-color-down: rgba(44, 44, 44, 0.1);
        --spectrum-colorarea-border-color-key-focus: rgba(44, 44, 44, 0.1);
        --spectrum-colorslider-border-color: rgba(44, 44, 44, 0.1);
        --spectrum-colorslider-border-color-hover: rgba(44, 44, 44, 0.1);
        --spectrum-colorslider-border-color-down: rgba(44, 44, 44, 0.1);
        --spectrum-colorslider-border-color-key-focus: rgba(44, 44, 44, 0.1);
        --spectrum-colorslider-vertical-border-color: rgba(44, 44, 44, 0.1);
        --spectrum-colorslider-vertical-border-color-hover: rgba(
            44,
            44,
            44,
            0.1
        );
        --spectrum-colorslider-vertical-border-color-down: rgba(
            44,
            44,
            44,
            0.1
        );
        --spectrum-colorslider-vertical-border-color-key-focus: rgba(
            44,
            44,
            44,
            0.1
        );
        --spectrum-colorwheel-border-color: rgba(44, 44, 44, 0.1);
        --spectrum-colorwheel-border-color-hover: rgba(44, 44, 44, 0.1);
        --spectrum-colorwheel-border-color-down: rgba(44, 44, 44, 0.1);
        --spectrum-colorwheel-border-color-key-focus: rgba(44, 44, 44, 0.1);
        --spectrum-miller-column-item-background-color-selected: rgba(
            20,
            115,
            230,
            0.1
        );
        --spectrum-miller-column-item-background-color-selected-hover: rgba(
            20,
            115,
            230,
            0.2
        );
        --spectrum-tabs-compact-selection-indicator-color: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-tabs-compact-vertical-rule-color: var(
            --spectrum-global-color-gray-200
        );
        --spectrum-tabs-compact-vertical-emphasized-selection-indicator-color: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-tabs-compact-vertical-emphasized-rule-color: var(
            --spectrum-global-color-gray-200
        );
        --spectrum-tabs-emphasized-selection-indicator-color: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-tabs-quiet-compact-emphasized-selection-indicator-color: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-tabs-quiet-compact-vertical-emphasized-selection-indicator-color: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-tabs-quiet-emphasized-selection-indicator-color: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-tabs-quiet-vertical-emphasized-selection-indicator-color: var(
            --spectrum-global-color-blue-500
        );
        --spectrum-well-background-color: rgba(75, 75, 75, 0.02);
        --spectrum-well-border-color: rgba(44, 44, 44, 0.05);
        --spectrum-global-dimension-scale-factor: 1;
        --spectrum-global-dimension-size-0: 0px;
        --spectrum-global-dimension-size-10: 1px;
        --spectrum-global-dimension-size-25: 2px;
        --spectrum-global-dimension-size-40: 3px;
        --spectrum-global-dimension-size-50: 4px;
        --spectrum-global-dimension-size-65: 5px;
        --spectrum-global-dimension-size-75: 6px;
        --spectrum-global-dimension-size-85: 7px;
        --spectrum-global-dimension-size-100: 8px;
        --spectrum-global-dimension-size-115: 9px;
        --spectrum-global-dimension-size-125: 10px;
        --spectrum-global-dimension-size-130: 11px;
        --spectrum-global-dimension-size-150: 12px;
        --spectrum-global-dimension-size-160: 13px;
        --spectrum-global-dimension-size-175: 14px;
        --spectrum-global-dimension-size-200: 16px;
        --spectrum-global-dimension-size-225: 18px;
        --spectrum-global-dimension-size-250: 20px;
        --spectrum-global-dimension-size-300: 24px;
        --spectrum-global-dimension-size-350: 28px;
        --spectrum-global-dimension-size-400: 32px;
        --spectrum-global-dimension-size-450: 36px;
        --spectrum-global-dimension-size-500: 40px;
        --spectrum-global-dimension-size-550: 44px;
        --spectrum-global-dimension-size-600: 48px;
        --spectrum-global-dimension-size-675: 54px;
        --spectrum-global-dimension-size-700: 56px;
        --spectrum-global-dimension-size-800: 64px;
        --spectrum-global-dimension-size-900: 72px;
        --spectrum-global-dimension-size-1000: 80px;
        --spectrum-global-dimension-size-1200: 96px;
        --spectrum-global-dimension-size-1250: 100px;
        --spectrum-global-dimension-size-1600: 128px;
        --spectrum-global-dimension-size-1700: 136px;
        --spectrum-global-dimension-size-2000: 160px;
        --spectrum-global-dimension-size-2400: 192px;
        --spectrum-global-dimension-size-3000: 240px;
        --spectrum-global-dimension-size-3400: 272px;
        --spectrum-global-dimension-size-3600: 288px;
        --spectrum-global-dimension-size-4600: 368px;
        --spectrum-global-dimension-size-5000: 400px;
        --spectrum-global-dimension-size-6000: 480px;
        --spectrum-global-dimension-font-size-25: 10px;
        --spectrum-global-dimension-font-size-50: 11px;
        --spectrum-global-dimension-font-size-75: 12px;
        --spectrum-global-dimension-font-size-100: 14px;
        --spectrum-global-dimension-font-size-150: 15px;
        --spectrum-global-dimension-font-size-200: 16px;
        --spectrum-global-dimension-font-size-300: 18px;
        --spectrum-global-dimension-font-size-400: 20px;
        --spectrum-global-dimension-font-size-500: 22px;
        --spectrum-global-dimension-font-size-600: 25px;
        --spectrum-global-dimension-font-size-700: 28px;
        --spectrum-global-dimension-font-size-800: 32px;
        --spectrum-global-dimension-font-size-900: 36px;
        --spectrum-global-dimension-font-size-1000: 40px;
        --spectrum-global-dimension-font-size-1100: 45px;
        --spectrum-alias-heading-display1-text-size: var(
            --spectrum-global-dimension-font-size-1100
        );
        --spectrum-alias-heading-xxxl-text-size: var(
            --spectrum-global-dimension-font-size-1100
        );
        --spectrum-alias-heading-display1-margin-top: var(
            --spectrum-global-dimension-font-size-1000
        );
        --spectrum-alias-heading-xxxl-margin-top: var(
            --spectrum-global-dimension-font-size-1000
        );
        --spectrum-alias-heading-display2-text-size: var(
            --spectrum-global-dimension-font-size-1000
        );
        --spectrum-alias-heading-xxl-text-size: var(
            --spectrum-global-dimension-font-size-1000
        );
        --spectrum-alias-heading-display2-margin-top: var(
            --spectrum-global-dimension-font-size-900
        );
        --spectrum-alias-heading-xxl-margin-top: var(
            --spectrum-global-dimension-font-size-900
        );
        --spectrum-alias-heading1-text-size: var(
            --spectrum-global-dimension-font-size-900
        );
        --spectrum-alias-heading-xl-text-size: var(
            --spectrum-global-dimension-font-size-900
        );
        --spectrum-alias-heading1-margin-top: var(
            --spectrum-global-dimension-font-size-800
        );
        --spectrum-alias-heading-xl-margin-top: var(
            --spectrum-global-dimension-font-size-800
        );
        --spectrum-alias-heading2-text-size: var(
            --spectrum-global-dimension-font-size-700
        );
        --spectrum-alias-heading-l-text-size: var(
            --spectrum-global-dimension-font-size-700
        );
        --spectrum-alias-heading2-margin-top: var(
            --spectrum-global-dimension-font-size-600
        );
        --spectrum-alias-heading-l-margin-top: var(
            --spectrum-global-dimension-font-size-600
        );
        --spectrum-alias-heading3-text-size: var(
            --spectrum-global-dimension-font-size-500
        );
        --spectrum-alias-heading-m-text-size: var(
            --spectrum-global-dimension-font-size-500
        );
        --spectrum-alias-heading3-margin-top: var(
            --spectrum-global-dimension-font-size-400
        );
        --spectrum-alias-heading-m-margin-top: var(
            --spectrum-global-dimension-font-size-400
        );
        --spectrum-actionbutton-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-actionbutton-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-actionbutton-emphasized-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-actionbutton-emphasized-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-actionbutton-quiet-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-actionbutton-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-actionbutton-quiet-emphasized-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-actionbutton-quiet-emphasized-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-barloader-large-border-radius: 3px;
        --spectrum-barloader-large-indeterminate-border-radius: 3px;
        --spectrum-barloader-large-over-background-border-radius: 3px;
        --spectrum-barloader-small-border-radius: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-barloader-small-indeterminate-border-radius: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-barloader-small-over-background-border-radius: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-breadcrumb-compact-item-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-breadcrumb-compact-button-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-breadcrumb-item-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-breadcrumb-button-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-breadcrumb-multiline-item-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-breadcrumb-multiline-button-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-cta-text-padding-bottom: [object Object];
        --spectrum-button-cta-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-cta-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-cta-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-over-background-text-padding-bottom: [object Object];
        --spectrum-button-over-background-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-over-background-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-over-background-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-primary-text-padding-bottom: [object Object];
        --spectrum-button-primary-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-primary-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-primary-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-quiet-over-background-text-padding-bottom: [object
            Object];
        --spectrum-button-quiet-over-background-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-quiet-over-background-touch-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-button-quiet-over-background-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-quiet-over-background-cursor-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-button-quiet-primary-text-padding-bottom: [object Object];
        --spectrum-button-quiet-primary-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-quiet-primary-touch-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-button-quiet-primary-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-quiet-primary-cursor-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-button-quiet-secondary-text-padding-bottom: [object Object];
        --spectrum-button-quiet-secondary-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-quiet-secondary-touch-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-button-quiet-secondary-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-quiet-secondary-cursor-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-button-quiet-warning-text-padding-bottom: [object Object];
        --spectrum-button-quiet-warning-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-quiet-warning-touch-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-button-quiet-warning-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-quiet-warning-cursor-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-button-secondary-text-padding-bottom: [object Object];
        --spectrum-button-secondary-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-secondary-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-secondary-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-warning-text-padding-bottom: [object Object];
        --spectrum-button-warning-min-width: var(
            --spectrum-global-dimension-size-900
        );
        --spectrum-button-warning-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-button-warning-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-checkbox-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-text-gap-indeterminate-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-text-gap-error-indeterminate-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-checkbox-emphasized-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-emphasized-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-emphasized-text-gap-indeterminate-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-emphasized-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-emphasized-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-emphasized-text-gap-error-indeterminate-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-emphasized-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-checkbox-quiet-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-quiet-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-quiet-text-gap-indeterminate-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-quiet-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-quiet-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-quiet-text-gap-error-indeterminate-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-checkbox-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-circleloader-medium-border-size: 3px;
        --spectrum-circleloader-medium-over-background-border-size: 3px;
        --spectrum-circleloader-small-border-size: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-circleloader-small-over-background-border-size: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-colorhandle-loupe-margin: var(
            --spectrum-global-dimension-static-size-125
        );
        --spectrum-colorslider-touch-hit-y: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-colorslider-vertical-touch-hit-x: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-colorwheel-min-size: var(
            --spectrum-global-dimension-size-2400
        );
        --spectrum-colorwheel-touch-hit-outer: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-colorwheel-touch-hit-inner: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-cyclebutton-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-cyclebutton-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-dialog-confirm-max-width: var(
            --spectrum-global-dimension-static-size-6000
        );
        --spectrum-dialog-confirm-title-text-size: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-dialog-confirm-description-text-size: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-dialog-confirm-padding: var(
            --spectrum-global-dimension-static-size-500
        );
        --spectrum-dialog-confirm-description-margin-bottom: var(
            --spectrum-global-dimension-static-size-600
        );
        --spectrum-dialog-max-width: var(
            --spectrum-global-dimension-static-size-6000
        );
        --spectrum-dialog-title-text-size: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-dialog-content-text-size: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-dialog-padding: var(
            --spectrum-global-dimension-static-size-500
        );
        --spectrum-dialog-content-margin-bottom: var(
            --spectrum-global-dimension-static-size-600
        );
        --spectrum-dialog-destructive-max-width: var(
            --spectrum-global-dimension-static-size-6000
        );
        --spectrum-dialog-destructive-title-text-size: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-dialog-destructive-description-text-size: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-dialog-destructive-padding: var(
            --spectrum-global-dimension-static-size-500
        );
        --spectrum-dialog-destructive-description-margin-bottom: var(
            --spectrum-global-dimension-static-size-600
        );
        --spectrum-dialog-error-max-width: var(
            --spectrum-global-dimension-static-size-6000
        );
        --spectrum-dialog-error-title-text-size: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-dialog-error-description-text-size: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-dialog-error-padding: var(
            --spectrum-global-dimension-static-size-500
        );
        --spectrum-dialog-error-description-margin-bottom: var(
            --spectrum-global-dimension-static-size-600
        );
        --spectrum-dialog-info-max-width: var(
            --spectrum-global-dimension-static-size-6000
        );
        --spectrum-dialog-info-title-text-size: var(
            --spectrum-global-dimension-font-size-300
        );
        --spectrum-dialog-info-description-text-size: var(
            --spectrum-global-dimension-font-size-100
        );
        --spectrum-dialog-info-padding: var(
            --spectrum-global-dimension-static-size-500
        );
        --spectrum-dialog-info-description-margin-bottom: var(
            --spectrum-global-dimension-static-size-600
        );
        --spectrum-dropdown-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-dropdown-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-dropdown-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-dropdown-thumbnail-small-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-dropdown-thumbnail-small-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-fieldbutton-quiet-min-width: var(
            --spectrum-global-dimension-size-225
        );
        --spectrum-icon-arrow-down-small-height: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-arrow-left-medium-height: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-checkmark-medium-width: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-icon-checkmark-medium-height: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-icon-checkmark-small-width: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-checkmark-small-height: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-chevron-down-medium-width: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-chevron-left-large-width: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-icon-chevron-left-medium-height: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-chevron-right-large-width: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-icon-chevron-right-medium-height: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-cross-large-width: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-icon-cross-large-height: var(
            --spectrum-global-dimension-size-150
        );
        --spectrum-icon-dash-small-width: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-dash-small-height: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-skip-left-width: 9px;
        --spectrum-icon-skip-left-height: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-skip-right-width: 9px;
        --spectrum-icon-skip-right-height: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-icon-triplegripper-width: var(
            --spectrum-global-dimension-size-125
        );
        --spectrum-loader-bar-large-border-radius: 3px;
        --spectrum-loader-bar-large-over-background-border-radius: 3px;
        --spectrum-loader-bar-small-border-radius: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-loader-bar-small-over-background-border-radius: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-loader-circle-medium-border-size: 3px;
        --spectrum-loader-circle-medium-over-background-border-size: 3px;
        --spectrum-loader-circle-small-border-size: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-loader-circle-small-over-background-border-size: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-meter-large-border-radius: 3px;
        --spectrum-meter-small-border-radius: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-pagination-page-button-line-height: 26px;
        --spectrum-radio-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-margin-bottom: 0px;
        --spectrum-radio-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-radio-emphasized-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-emphasized-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-emphasized-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-emphasized-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-emphasized-margin-bottom: 0px;
        --spectrum-radio-emphasized-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-radio-quiet-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-quiet-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-quiet-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-quiet-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-radio-quiet-margin-bottom: 0px;
        --spectrum-radio-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-rating-icon-width: 24px;
        --spectrum-rating-indicator-width: 16px;
        --spectrum-rating-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-rating-emphasized-icon-width: 24px;
        --spectrum-rating-emphasized-indicator-width: 16px;
        --spectrum-rating-emphasized-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-rating-quiet-icon-width: 24px;
        --spectrum-rating-quiet-indicator-width: 16px;
        --spectrum-rating-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-search-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-search-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-search-icon-frame: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-search-quiet-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-search-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-search-quiet-icon-frame: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-selectlist-option-icon-size: var(
            --spectrum-global-dimension-static-size-150
        );
        --spectrum-selectlist-option-icon-padding-y: var(
            --spectrum-global-dimension-static-size-125
        );
        --spectrum-selectlist-option-icon-margin-top: var(
            --spectrum-global-dimension-static-size-65
        );
        --spectrum-selectlist-option-height: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-selectlist-thumbnail-option-icon-padding-y: var(
            --spectrum-global-dimension-static-size-125
        );
        --spectrum-selectlist-thumbnail-small-option-icon-padding-y: var(
            --spectrum-global-dimension-static-size-125
        );
        --spectrum-sidenav-item-touch-hit-bottom: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-sidenav-multilevel-item-touch-hit-bottom: var(
            --spectrum-global-dimension-static-size-25
        );
        --spectrum-slider-track-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-slider-handle-touch-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-slider-handle-touch-hit-y: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-slider-editable-track-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-slider-editable-handle-touch-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-slider-editable-handle-touch-hit-y: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-slider-fill-track-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-slider-fill-handle-touch-hit-x: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-slider-fill-handle-touch-hit-y: var(
            --spectrum-global-dimension-static-size-200
        );
        --spectrum-switch-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-track-width: 26px;
        --spectrum-switch-handle-border-radius: 7px;
        --spectrum-switch-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-switch-emphasized-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-emphasized-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-emphasized-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-emphasized-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-emphasized-track-width: 26px;
        --spectrum-switch-emphasized-handle-border-radius: 7px;
        --spectrum-switch-emphasized-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-switch-quiet-text-gap-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-quiet-text-gap-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-quiet-text-gap-error-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-quiet-text-gap-error-selected-key-focus: var(
            --spectrum-global-dimension-static-size-115
        );
        --spectrum-switch-quiet-track-width: 26px;
        --spectrum-switch-quiet-handle-border-radius: 7px;
        --spectrum-switch-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-tabs-compact-focus-ring-border-radius: 5px;
        --spectrum-tabs-compact-margin-left: -8px;
        --spectrum-tabs-compact-margin-right: -8px;
        --spectrum-tabs-compact-vertical-focus-ring-border-radius: 5px;
        --spectrum-tabs-compact-vertical-emphasized-focus-ring-border-radius: 5px;
        --spectrum-tabs-baseline: var(--spectrum-global-dimension-size-225);
        --spectrum-tabs-focus-ring-border-radius: 5px;
        --spectrum-tabs-margin-left: -8px;
        --spectrum-tabs-margin-right: -8px;
        --spectrum-tabs-emphasized-baseline: var(
            --spectrum-global-dimension-size-225
        );
        --spectrum-tabs-emphasized-focus-ring-border-radius: 5px;
        --spectrum-tabs-emphasized-margin-left: -8px;
        --spectrum-tabs-emphasized-margin-right: -8px;
        --spectrum-tabs-quiet-baseline: var(
            --spectrum-global-dimension-size-225
        );
        --spectrum-tabs-quiet-focus-ring-border-radius: 5px;
        --spectrum-tabs-quiet-margin-left: -8px;
        --spectrum-tabs-quiet-margin-right: -8px;
        --spectrum-tabs-quiet-compact-focus-ring-border-radius: 5px;
        --spectrum-tabs-quiet-compact-margin-left: -8px;
        --spectrum-tabs-quiet-compact-margin-right: -8px;
        --spectrum-tabs-quiet-compact-emphasized-focus-ring-border-radius: 5px;
        --spectrum-tabs-quiet-compact-emphasized-margin-left: -8px;
        --spectrum-tabs-quiet-compact-emphasized-margin-right: -8px;
        --spectrum-tabs-quiet-compact-vertical-focus-ring-border-radius: 5px;
        --spectrum-tabs-quiet-compact-vertical-emphasized-focus-ring-border-radius: 5px;
        --spectrum-tabs-quiet-emphasized-baseline: var(
            --spectrum-global-dimension-size-225
        );
        --spectrum-tabs-quiet-emphasized-focus-ring-border-radius: 5px;
        --spectrum-tabs-quiet-emphasized-margin-left: -8px;
        --spectrum-tabs-quiet-emphasized-margin-right: -8px;
        --spectrum-tabs-quiet-vertical-baseline: var(
            --spectrum-global-dimension-size-225
        );
        --spectrum-tabs-quiet-vertical-focus-ring-border-radius: 5px;
        --spectrum-tabs-quiet-vertical-emphasized-baseline: var(
            --spectrum-global-dimension-size-225
        );
        --spectrum-tabs-quiet-vertical-emphasized-focus-ring-border-radius: 5px;
        --spectrum-tabs-vertical-baseline: var(
            --spectrum-global-dimension-size-225
        );
        --spectrum-tabs-vertical-focus-ring-border-radius: 5px;
        --spectrum-textarea-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-textarea-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-textarea-icon-frame: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-textarea-quiet-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-textarea-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-textarea-quiet-icon-frame: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-textfield-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-textfield-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-textfield-icon-frame: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-textfield-quiet-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-textfield-quiet-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-textfield-quiet-icon-frame: var(
            --spectrum-global-dimension-static-size-400
        );
        --spectrum-tool-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-tool-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-tool-high-emphasis-touch-hit-x: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-tool-high-emphasis-touch-hit-y: var(
            --spectrum-global-dimension-static-size-100
        );
        --spectrum-tooltip-padding-bottom: 5px;
        --spectrum-tooltip-content-max-width: 101px;
        --spectrum-tooltip-info-padding-bottom: 5px;
        --spectrum-tooltip-info-content-max-width: 101px;
        --spectrum-tooltip-negative-padding-bottom: 5px;
        --spectrum-tooltip-negative-content-max-width: 101px;
        --spectrum-tooltip-positive-padding-bottom: 5px;
        --spectrum-tooltip-positive-content-max-width: 101px;
    }
`;
export default styles;
