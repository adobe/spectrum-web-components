import { L as LanguageResolutionController, l as languageResolverUpdatedSymbol } from './LanguageResolution-BeoILyI5.js';
import { s as streamingListener } from './streaming-listener-CmIYw2xv.js';
import { $ as $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5 } from './NumberFormatter-D3opD4iN.js';
import './sp-icon-chevron50-1BIfcIRv.js';
import './sp-icon-chevron75-3C3N8MIH.js';
import './sp-icon-chevron100-BExoFMYC.js';
import './sp-icon-chevron200-CILeLHoO.js';
import './sp-infield-button-DkHXBbsS.js';
import { b as isIPhone, i as isAndroid } from './platform-r3Lf9REX.js';
import { r } from './spectrum-icon-chevron.css-CeYia-Jd.js';
import { i } from './lit-element-BulMEkr1.js';
import { a as TextfieldBase } from './Textfield-CNzGwBlh.js';
import { x, T } from './lit-html-COgVUehj.js';
import { e as e$1 } from './query-DQF6X5qW.js';
import { n, d as defineElement } from './define-element-C_3bgzm7.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './Chevron50-B5C39iR5.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './Chevron75-hetG6rdn.js';
import './Chevron100-2ZEB0c-t.js';
import './Chevron200-DFmczfFD.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './sizedMixin-BzkTbMb8.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-NuoPlGW7.js';
import './sp-icon-alert-Cbypiip7.js';
import './custom-tag-Diwq7nXX.js';
import './state-DrummH0c.js';

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 
const $6c7bd7858deea686$var$CURRENCY_SIGN_REGEX = new RegExp('^.*\\(.*\\).*$');
const $6c7bd7858deea686$var$NUMBERING_SYSTEMS = [
    'latn',
    'arab',
    'hanidec'
];
class $6c7bd7858deea686$export$cd11ab140839f11d {
    /**
   * Parses the given string to a number. Returns NaN if a valid number could not be parsed.
   */ parse(value) {
        return $6c7bd7858deea686$var$getNumberParserImpl(this.locale, this.options, value).parse(value);
    }
    /**
   * Returns whether the given string could potentially be a valid number. This should be used to
   * validate user input as the user types. If a `minValue` or `maxValue` is provided, the validity
   * of the minus/plus sign characters can be checked.
   */ isValidPartialNumber(value, minValue, maxValue) {
        return $6c7bd7858deea686$var$getNumberParserImpl(this.locale, this.options, value).isValidPartialNumber(value, minValue, maxValue);
    }
    /**
   * Returns a numbering system for which the given string is valid in the current locale.
   * If no numbering system could be detected, the default numbering system for the current
   * locale is returned.
   */ getNumberingSystem(value) {
        return $6c7bd7858deea686$var$getNumberParserImpl(this.locale, this.options, value).options.numberingSystem;
    }
    constructor(locale, options = {}){
        this.locale = locale;
        this.options = options;
    }
}
const $6c7bd7858deea686$var$numberParserCache = new Map();
function $6c7bd7858deea686$var$getNumberParserImpl(locale, options, value) {
    // First try the default numbering system for the provided locale
    let defaultParser = $6c7bd7858deea686$var$getCachedNumberParser(locale, options);
    // If that doesn't match, and the locale doesn't include a hard coded numbering system,
    // try each of the other supported numbering systems until we find one that matches.
    if (!locale.includes('-nu-') && !defaultParser.isValidPartialNumber(value)) {
        for (let numberingSystem of $6c7bd7858deea686$var$NUMBERING_SYSTEMS)if (numberingSystem !== defaultParser.options.numberingSystem) {
            let parser = $6c7bd7858deea686$var$getCachedNumberParser(locale + (locale.includes('-u-') ? '-nu-' : '-u-nu-') + numberingSystem, options);
            if (parser.isValidPartialNumber(value)) return parser;
        }
    }
    return defaultParser;
}
function $6c7bd7858deea686$var$getCachedNumberParser(locale, options) {
    let cacheKey = locale + (options ? Object.entries(options).sort((a, b)=>a[0] < b[0] ? -1 : 1).join() : '');
    let parser = $6c7bd7858deea686$var$numberParserCache.get(cacheKey);
    if (!parser) {
        parser = new $6c7bd7858deea686$var$NumberParserImpl(locale, options);
        $6c7bd7858deea686$var$numberParserCache.set(cacheKey, parser);
    }
    return parser;
}
// The actual number parser implementation. Instances of this class are cached
// based on the locale, options, and detected numbering system.
class $6c7bd7858deea686$var$NumberParserImpl {
    parse(value) {
        // to parse the number, we need to remove anything that isn't actually part of the number, for example we want '-10.40' not '-10.40 USD'
        let fullySanitizedValue = this.sanitize(value);
        if (this.symbols.group) // Remove group characters, and replace decimal points and numerals with ASCII values.
        fullySanitizedValue = $6c7bd7858deea686$var$replaceAll(fullySanitizedValue, this.symbols.group, '');
        if (this.symbols.decimal) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.decimal, '.');
        if (this.symbols.minusSign) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.minusSign, '-');
        fullySanitizedValue = fullySanitizedValue.replace(this.symbols.numeral, this.symbols.index);
        if (this.options.style === 'percent') {
            // javascript is bad at dividing by 100 and maintaining the same significant figures, so perform it on the string before parsing
            let isNegative = fullySanitizedValue.indexOf('-');
            fullySanitizedValue = fullySanitizedValue.replace('-', '');
            let index = fullySanitizedValue.indexOf('.');
            if (index === -1) index = fullySanitizedValue.length;
            fullySanitizedValue = fullySanitizedValue.replace('.', '');
            if (index - 2 === 0) fullySanitizedValue = `0.${fullySanitizedValue}`;
            else if (index - 2 === -1) fullySanitizedValue = `0.0${fullySanitizedValue}`;
            else if (index - 2 === -2) fullySanitizedValue = '0.00';
            else fullySanitizedValue = `${fullySanitizedValue.slice(0, index - 2)}.${fullySanitizedValue.slice(index - 2)}`;
            if (isNegative > -1) fullySanitizedValue = `-${fullySanitizedValue}`;
        }
        let newValue = fullySanitizedValue ? +fullySanitizedValue : NaN;
        if (isNaN(newValue)) return NaN;
        if (this.options.style === 'percent') {
            var _this_options_minimumFractionDigits, _this_options_maximumFractionDigits;
            // extra step for rounding percents to what our formatter would output
            let options = {
                ...this.options,
                style: 'decimal',
                minimumFractionDigits: Math.min(((_this_options_minimumFractionDigits = this.options.minimumFractionDigits) !== null && _this_options_minimumFractionDigits !== void 0 ? _this_options_minimumFractionDigits : 0) + 2, 20),
                maximumFractionDigits: Math.min(((_this_options_maximumFractionDigits = this.options.maximumFractionDigits) !== null && _this_options_maximumFractionDigits !== void 0 ? _this_options_maximumFractionDigits : 0) + 2, 20)
            };
            return new $6c7bd7858deea686$export$cd11ab140839f11d(this.locale, options).parse(new ($488c6ddbf4ef74c2$export$cc77c4ff7e8673c5)(this.locale, options).format(newValue));
        }
        // accounting will always be stripped to a positive number, so if it's accounting and has a () around everything, then we need to make it negative again
        if (this.options.currencySign === 'accounting' && $6c7bd7858deea686$var$CURRENCY_SIGN_REGEX.test(value)) newValue = -1 * newValue;
        return newValue;
    }
    sanitize(value) {
        // Remove literals and whitespace, which are allowed anywhere in the string
        value = value.replace(this.symbols.literals, '');
        // Replace the ASCII minus sign with the minus sign used in the current locale
        // so that both are allowed in case the user's keyboard doesn't have the locale's minus sign.
        if (this.symbols.minusSign) value = value.replace('-', this.symbols.minusSign);
        // In arab numeral system, their decimal character is 1643, but most keyboards don't type that
        // instead they use the , (44) character or apparently the (1548) character.
        if (this.options.numberingSystem === 'arab') {
            if (this.symbols.decimal) {
                value = value.replace(',', this.symbols.decimal);
                value = value.replace(String.fromCharCode(1548), this.symbols.decimal);
            }
            if (this.symbols.group) value = $6c7bd7858deea686$var$replaceAll(value, '.', this.symbols.group);
        }
        // fr-FR group character is char code 8239, but that's not a key on the french keyboard,
        // so allow 'period' as a group char and replace it with a space
        if (this.options.locale === 'fr-FR') value = $6c7bd7858deea686$var$replaceAll(value, '.', String.fromCharCode(8239));
        return value;
    }
    isValidPartialNumber(value, minValue = -Infinity, maxValue = Infinity) {
        value = this.sanitize(value);
        // Remove minus or plus sign, which must be at the start of the string.
        if (this.symbols.minusSign && value.startsWith(this.symbols.minusSign) && minValue < 0) value = value.slice(this.symbols.minusSign.length);
        else if (this.symbols.plusSign && value.startsWith(this.symbols.plusSign) && maxValue > 0) value = value.slice(this.symbols.plusSign.length);
        // Numbers cannot start with a group separator
        if (this.symbols.group && value.startsWith(this.symbols.group)) return false;
        // Numbers that can't have any decimal values fail if a decimal character is typed
        if (this.symbols.decimal && value.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0) return false;
        // Remove numerals, groups, and decimals
        if (this.symbols.group) value = $6c7bd7858deea686$var$replaceAll(value, this.symbols.group, '');
        value = value.replace(this.symbols.numeral, '');
        if (this.symbols.decimal) value = value.replace(this.symbols.decimal, '');
        // The number is valid if there are no remaining characters
        return value.length === 0;
    }
    constructor(locale, options = {}){
        this.locale = locale;
        this.formatter = new Intl.NumberFormat(locale, options);
        this.options = this.formatter.resolvedOptions();
        this.symbols = $6c7bd7858deea686$var$getSymbols(locale, this.formatter, this.options, options);
        var _this_options_minimumFractionDigits, _this_options_maximumFractionDigits;
        if (this.options.style === 'percent' && (((_this_options_minimumFractionDigits = this.options.minimumFractionDigits) !== null && _this_options_minimumFractionDigits !== void 0 ? _this_options_minimumFractionDigits : 0) > 18 || ((_this_options_maximumFractionDigits = this.options.maximumFractionDigits) !== null && _this_options_maximumFractionDigits !== void 0 ? _this_options_maximumFractionDigits : 0) > 18)) console.warn('NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.');
    }
}
const $6c7bd7858deea686$var$nonLiteralParts = new Set([
    'decimal',
    'fraction',
    'integer',
    'minusSign',
    'plusSign',
    'group'
]);
// This list is derived from https://www.unicode.org/cldr/charts/43/supplemental/language_plural_rules.html#comparison and includes
// all unique numbers which we need to check in order to determine all the plural forms for a given locale.
// See: https://github.com/adobe/react-spectrum/pull/5134/files#r1337037855 for used script
const $6c7bd7858deea686$var$pluralNumbers = [
    0,
    4,
    2,
    1,
    11,
    20,
    3,
    7,
    100,
    21,
    0.1,
    1.1
];
function $6c7bd7858deea686$var$getSymbols(locale, formatter, intlOptions, originalOptions) {
    var _allParts_find, _posAllParts_find, _decimalParts_find, _allParts_find1;
    // formatter needs access to all decimal places in order to generate the correct literal strings for the plural set
    let symbolFormatter = new Intl.NumberFormat(locale, {
        ...intlOptions,
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 21
    });
    // Note: some locale's don't add a group symbol until there is a ten thousands place
    let allParts = symbolFormatter.formatToParts(-10000.111);
    let posAllParts = symbolFormatter.formatToParts(10000.111);
    let pluralParts = $6c7bd7858deea686$var$pluralNumbers.map((n)=>symbolFormatter.formatToParts(n));
    var _allParts_find_value;
    let minusSign = (_allParts_find_value = (_allParts_find = allParts.find((p)=>p.type === 'minusSign')) === null || _allParts_find === void 0 ? void 0 : _allParts_find.value) !== null && _allParts_find_value !== void 0 ? _allParts_find_value : '-';
    let plusSign = (_posAllParts_find = posAllParts.find((p)=>p.type === 'plusSign')) === null || _posAllParts_find === void 0 ? void 0 : _posAllParts_find.value;
    // Safari does not support the signDisplay option, but our number parser polyfills it.
    // If no plus sign was returned, but the original options contained signDisplay, default to the '+' character.
    // @ts-ignore
    if (!plusSign && ((originalOptions === null || originalOptions === void 0 ? void 0 : originalOptions.signDisplay) === 'exceptZero' || (originalOptions === null || originalOptions === void 0 ? void 0 : originalOptions.signDisplay) === 'always')) plusSign = '+';
    // If maximumSignificantDigits is 1 (the minimum) then we won't get decimal characters out of the above formatters
    // Percent also defaults to 0 fractionDigits, so we need to make a new one that isn't percent to get an accurate decimal
    let decimalParts = new Intl.NumberFormat(locale, {
        ...intlOptions,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).formatToParts(0.001);
    let decimal = (_decimalParts_find = decimalParts.find((p)=>p.type === 'decimal')) === null || _decimalParts_find === void 0 ? void 0 : _decimalParts_find.value;
    let group = (_allParts_find1 = allParts.find((p)=>p.type === 'group')) === null || _allParts_find1 === void 0 ? void 0 : _allParts_find1.value;
    // this set is also for a regex, it's all literals that might be in the string we want to eventually parse that
    // don't contribute to the numerical value
    let allPartsLiterals = allParts.filter((p)=>!$6c7bd7858deea686$var$nonLiteralParts.has(p.type)).map((p)=>$6c7bd7858deea686$var$escapeRegex(p.value));
    let pluralPartsLiterals = pluralParts.flatMap((p)=>p.filter((p)=>!$6c7bd7858deea686$var$nonLiteralParts.has(p.type)).map((p)=>$6c7bd7858deea686$var$escapeRegex(p.value)));
    let sortedLiterals = [
        ...new Set([
            ...allPartsLiterals,
            ...pluralPartsLiterals
        ])
    ].sort((a, b)=>b.length - a.length);
    let literals = sortedLiterals.length === 0 ? new RegExp('[\\p{White_Space}]', 'gu') : new RegExp(`${sortedLiterals.join('|')}|[\\p{White_Space}]`, 'gu');
    // These are for replacing non-latn characters with the latn equivalent
    let numerals = [
        ...new Intl.NumberFormat(intlOptions.locale, {
            useGrouping: false
        }).format(9876543210)
    ].reverse();
    let indexes = new Map(numerals.map((d, i)=>[
            d,
            i
        ]));
    let numeral = new RegExp(`[${numerals.join('')}]`, 'g');
    let index = (d)=>String(indexes.get(d));
    return {
        minusSign: minusSign,
        plusSign: plusSign,
        decimal: decimal,
        group: group,
        literals: literals,
        numeral: numeral,
        index: index
    };
}
function $6c7bd7858deea686$var$replaceAll(str, find, replace) {
    // @ts-ignore
    if (str.replaceAll) // @ts-ignore
    return str.replaceAll(find, replace);
    return str.split(find).join(replace);
}
function $6c7bd7858deea686$var$escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const e=i`
    :host{--spectrum-stepper-height:var(--spectrum-component-height-100);--spectrum-stepper-border-radius:var(--spectrum-corner-radius-100);--spectrum-stepper-button-width:var(--spectrum-in-field-button-width-stacked-medium);--spectrum-stepper-button-padding:var(--spectrum-in-field-button-edge-to-fill);--spectrum-stepper-width:calc(var(--mod-stepper-height,var(--spectrum-stepper-height))*var(--mod-stepper-min-width-multiplier,var(--spectrum-text-field-minimum-width-multiplier)) + var(--mod-stepper-button-width,var(--spectrum-stepper-button-width)) + var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))*2);--spectrum-stepper-focus-indicator-width:var(--spectrum-focus-indicator-thickness);--spectrum-stepper-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-stepper-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-stepper-button-offset:calc(var(--spectrum-stepper-button-width)/2);--spectrum-stepper-animation-duration:var(--spectrum-animation-duration-100);--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-buttons-border-color,var(--spectrum-stepper-buttons-border-color)));--mod-infield-button-border-width:var(--mod-stepper-button-border-width,var(--spectrum-stepper-button-border-width));--mod-textfield-border-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))}:host([size=s]) #textfield{--spectrum-stepper-button-width:var(--spectrum-in-field-button-width-stacked-small);--spectrum-stepper-height:var(--spectrum-component-height-75)}:host([size=l]) #textfield{--spectrum-stepper-button-width:var(--spectrum-in-field-button-width-stacked-large);--spectrum-stepper-height:var(--spectrum-component-height-200)}:host([size=xl]) #textfield{--spectrum-stepper-button-width:var(--spectrum-in-field-button-width-stacked-extra-large);--spectrum-stepper-height:var(--spectrum-component-height-300)}:host([quiet]) #textfield{--mod-infield-button-width-stacked:var(--mod-stepper-button-width-quiet,var(--spectrum-stepper-button-width));--mod-textfield-focus-indicator-color:transparent}:host([disabled]) #textfield{--mod-infield-button-border-color-quiet-disabled:var(--spectrum-disabled-border-color)}:host([invalid]) #textfield{--mod-stepper-border-color:var(--mod-stepper-border-color-invalid,var(--spectrum-negative-border-color-default));--mod-stepper-border-color-hover:var(--mod-stepper-border-color-hover-invalid,var(--spectrum-negative-border-color-hover));--mod-stepper-border-color-focus:var(--mod-stepper-border-color-focus-invalid,var(--spectrum-negative-border-color-focus));--mod-stepper-border-color-focus-hover:var(--mod-stepper-border-color-focus-hover-invalid,var(--spectrum-negative-border-color-focus-hover));--mod-stepper-border-color-keyboard-focus:var(--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-negative-border-color-key-focus));--mod-infield-button-border-color:var(--mod-stepper-border-color-invalid,var(--spectrum-stepper-border-color-invalid));--mod-textfield-icon-spacing-inline-start-invalid:0}:host([invalid][focused]) #textfield,:host([invalid]) #textfield:focus{--mod-infield-button-border-color:var(--mod-stepper-border-color-focus-invalid,var(--spectrum-stepper-border-color-focus-invalid))}:host([invalid][keyboard-focused]) #textfield,:host([invalid]) #textfield:focus-visible{--mod-infield-button-border-color:var(--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-stepper-border-color-keyboard-focus-invalid))}.x{border-radius:var(--spectrum-stepper-button-border-radius-reset)}#textfield{inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width));block-size:var(--mod-stepper-height,var(--spectrum-stepper-height));border-radius:var(--mod-stepper-border-radius,var(--spectrum-stepper-border-radius));flex-flow:row;display:inline-flex;position:relative}#textfield,#textfield .input{border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color)))}#textfield .input{border-inline-end-width:0;border-start-end-radius:0;border-end-end-radius:0}:host([focused]) #textfield,#textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-focus,var(--mod-stepper-buttons-border-color-focus,var(--spectrum-stepper-buttons-border-color-focus)))}:host([focused]) #textfield .input,#textfield:focus .input{outline:none}:host([focused]) #textfield .buttons,:host([focused]) #textfield .input,#textfield:focus .buttons,#textfield:focus .input{border-color:var(--highcontrast-stepper-border-color-focus,var(--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)))}:host([keyboard-focused]) #textfield,#textfield:focus-visible{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-keyboard-focus,var(--mod-stepper-buttons-border-color-keyboard-focus,var(--spectrum-stepper-buttons-border-color-keyboard-focus)));outline:var(--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width))solid;outline-color:var(--highcontrast-stepper-focus-indicator-color,var(--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)));outline-offset:var(--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap))}:host([keyboard-focused]) #textfield .input,#textfield:focus-visible .input{outline:none}:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input,#textfield:focus-visible .buttons,#textfield:focus-visible .input{border-color:var(--highcontrast-stepper-border-color-keyboard-focus,var(--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)))}:host([quiet]) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color)));border-start-start-radius:0;border-start-end-radius:0;border-end-end-radius:0;border-end-start-radius:0}:host([quiet]) #textfield.hide-stepper .input{border-inline-end-width:0;border-end-end-radius:0}:host([quiet]) #textfield:after{content:"";inline-size:100%;block-size:var(--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width));position:absolute;inset-block-end:calc(( var(--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap)) + var(--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)))*-1);inset-inline-start:0}:host([quiet]) #textfield .buttons{border:none}:host([quiet]) #textfield .button{--mod-infield-button-border-block-end-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width));--mod-infield-button-stacked-bottom-border-block-end-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width));--mod-infield-button-stacked-bottom-border-radius-end-end:0;--mod-infield-button-stacked-bottom-border-radius-end-start:0;--mod-infield-button-fill-justify-content:flex-end;padding:0}:host([quiet]) #textfield .buttons,:host([quiet]) #textfield .input{background-color:initial}:host([quiet][focused]) #textfield,:host([quiet]) #textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-focus,var(--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)))}:host([quiet][keyboard-focused]) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-keyboard-focus,var(--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)));outline:none}:host([quiet][keyboard-focused]) #textfield:after{background-color:var(--highcontrast-stepper-focus-indicator-color,var(--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)))}@media (hover:hover){:host([invalid]:hover) #textfield{--mod-infield-button-border-color:var(--mod-stepper-border-color-hover-invalid,var(--spectrum-negative-border-color-hover))}:host([invalid][focused]:hover) #textfield,:host([invalid]:hover) #textfield:focus{--mod-infield-button-border-color:var(--mod-stepper-border-color-focus-hover-invalid,var(--spectrum-stepper-border-color-focus-hover-invalid))}:host(:hover:not([disabled]):not([invalid])) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-hover,var(--mod-stepper-buttons-border-color-hover,var(--spectrum-stepper-buttons-border-color-hover)))}:host(:hover:not([disabled])) #textfield .buttons,:host(:hover:not([disabled])) #textfield .input{border-color:var(--highcontrast-stepper-border-color-hover,var(--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)))}:host([focused]:hover) #textfield,:host(:hover) #textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-focus-hover,var(--mod-stepper-buttons-border-color-focus-hover,var(--spectrum-stepper-buttons-border-color-focus-hover)))}:host([focused]:hover) #textfield .buttons,:host([focused]:hover) #textfield .input,:host(:hover) #textfield:focus .buttons,:host(:hover) #textfield:focus .input{border-color:var(--highcontrast-stepper-border-color-focus-hover,var(--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)))}:host([quiet]:hover:not([disabled])) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-hover,var(--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)))}:host([quiet]:hover:not([disabled])) #textfield .buttons{background-color:initial}:host([quiet][focused]:hover) #textfield,:host([quiet]:hover) #textfield:focus{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-focus-hover,var(--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)))}:host([quiet][keyboard-focused]:hover) #textfield{--mod-infield-button-border-color:var(--highcontrast-stepper-border-color-hover,var(--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)))}}#textfield:before{content:""}.buttons{box-sizing:border-box;block-size:var(--mod-stepper-height,var(--spectrum-stepper-height));inline-size:var(--mod-stepper-button-width,var(--spectrum-stepper-button-width));border-color:var(--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color)));border-style:var(--mod-stepper-buttons-border-style,var(--spectrum-stepper-buttons-border-style));border-width:var(--highcontrast-stepper-buttons-border-width,var(--mod-stepper-buttons-border-width,var(--spectrum-stepper-buttons-border-width)));background-color:var(--highcontrast-stepper-buttons-background-color,var(--mod-stepper-buttons-background-color,var(--spectrum-stepper-buttons-background-color)));transition:border-color var(--mod-stepper-animation-duration,var(--spectrum-stepper-animation-duration))ease-in-out;border-inline-start-width:0;flex-direction:column;justify-content:center;display:flex}.buttons,#textfield.hide-stepper .input{border-start-end-radius:var(--mod-stepper-border-radius,var(--spectrum-stepper-border-radius));border-end-end-radius:var(--mod-stepper-border-radius,var(--spectrum-stepper-border-radius))}#textfield.hide-stepper .input{border-inline-end-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))}@media (forced-colors:active){:host{--highcontrast-stepper-border-color:CanvasText;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:CanvasText;--highcontrast-stepper-button-background-color-default:Canvas;--highcontrast-stepper-button-background-color-hover:Canvas;--highcontrast-stepper-button-background-color-focus:Canvas;--highcontrast-stepper-button-background-color-keyboard-focus:Canvas;--highcontrast-stepper-focus-indicator-color:Highlight}:host([disabled]) #textfield{--highcontrast-stepper-border-color:GrayText;--highcontrast-stepper-buttons-border-width:var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))}:host([invalid]) #textfield{--highcontrast-stepper-border-color:Highlight;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:Highlight}}:host{--spectrum-stepper-border-width:var(--system-spectrum-stepper-border-width);--spectrum-stepper-buttons-border-style:var(--system-spectrum-stepper-buttons-border-style);--spectrum-stepper-buttons-border-width:var(--system-spectrum-stepper-buttons-border-width);--spectrum-stepper-buttons-border-color:var(--system-spectrum-stepper-buttons-border-color);--spectrum-stepper-buttons-background-color:var(--system-spectrum-stepper-buttons-background-color);--spectrum-stepper-buttons-border-color-hover:var(--system-spectrum-stepper-buttons-border-color-hover);--spectrum-stepper-buttons-border-color-focus:var(--system-spectrum-stepper-buttons-border-color-focus);--spectrum-stepper-buttons-border-color-keyboard-focus:var(--system-spectrum-stepper-buttons-border-color-keyboard-focus);--spectrum-stepper-button-border-radius-reset:var(--system-spectrum-stepper-button-border-radius-reset);--spectrum-stepper-button-border-width:var(--system-spectrum-stepper-button-border-width);--spectrum-stepper-border-color:var(--system-spectrum-stepper-border-color);--spectrum-stepper-border-color-hover:var(--system-spectrum-stepper-border-color-hover);--spectrum-stepper-border-color-focus:var(--system-spectrum-stepper-border-color-focus);--spectrum-stepper-border-color-focus-hover:var(--system-spectrum-stepper-border-color-focus-hover);--spectrum-stepper-border-color-keyboard-focus:var(--system-spectrum-stepper-border-color-keyboard-focus);--spectrum-stepper-border-color-invalid:var(--system-spectrum-stepper-border-color-invalid);--spectrum-stepper-border-color-focus-invalid:var(--system-spectrum-stepper-border-color-focus-invalid);--spectrum-stepper-border-color-focus-hover-invalid:var(--system-spectrum-stepper-border-color-focus-hover-invalid);--spectrum-stepper-border-color-keyboard-focus-invalid:var(--system-spectrum-stepper-border-color-keyboard-focus-invalid);--spectrum-stepper-button-background-color-focus:var(--system-spectrum-stepper-button-background-color-focus);--spectrum-stepper-button-background-color-keyboard-focus:var(--system-spectrum-stepper-button-background-color-keyboard-focus)}:host([disabled]) #textfield{--spectrum-stepper-buttons-background-color:var(--system-spectrum-stepper-disabled-buttons-background-color);--spectrum-stepper-buttons-border-width:var(--system-spectrum-stepper-disabled-buttons-border-width)}:host{inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width));--swc-number-field-width:calc(var(--mod-stepper-height,var(--spectrum-stepper-height))*var(--mod-stepper-min-width-multiplier,var(--spectrum-text-field-minimum-width-multiplier)) + var(--mod-stepper-button-width,var(--spectrum-stepper-button-width)) + var(--mod-stepper-border-width,var(--spectrum-stepper-border-width))*2);--mod-infield-button-border-width:var(--unset-value-resets-inheritance)}:host([size=s]){--spectrum-stepper-width:calc(var(--swc-number-field-width)/5*4)}:host([size=l]){--spectrum-stepper-width:calc(var(--swc-number-field-width)*1.25)}:host([size=xl]){--spectrum-stepper-width:calc(var(--swc-number-field-width)*1.25*1.25)}#textfield{inline-size:100%}.input{font-variant-numeric:tabular-nums}:host([readonly]) .buttons{pointer-events:none;visibility:hidden}:host([readonly]:not([disabled],[invalid],[focused],[keyboard-focused])) #textfield:hover .input{border-color:#0000}:host([hide-stepper]:not([quiet])) #textfield input{border:var(--mod-textfield-border-width,var(--spectrum-textfield-border-width))solid var(--mod-textfield-border-color,var(--spectrum-textfield-border-color));border-radius:var(--spectrum-textfield-corner-radius)}
`;

var y=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var a=(o,p,e,t)=>{for(var i=t>1?void 0:t?F(p,e):p,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(t?r(p,e,i):r(i))||i);return t&&i&&y(p,e,i),i};const FRAMES_PER_CHANGE=5,CHANGE_DEBOUNCE_MS=100,indeterminatePlaceholder="-",remapMultiByteCharacters={"\uFF11":"1","\uFF12":"2","\uFF13":"3","\uFF14":"4","\uFF15":"5","\uFF16":"6","\uFF17":"7","\uFF18":"8","\uFF19":"9","\uFF10":"0","\u3001":",","\uFF0C":",","\u3002":".","\uFF0E":".","\uFF05":"%","\uFF0B":"+",\u30FC:"-",\u4E00:"1",\u4E8C:"2",\u4E09:"3",\u56DB:"4",\u4E94:"5",\u516D:"6",\u4E03:"7",\u516B:"8",\u4E5D:"9",\u96F6:"0"};const g={s:o=>x`
        <sp-icon-chevron50
            class="stepper-icon spectrum-UIIcon-Chevron${o}50"
        ></sp-icon-chevron50>
    `,m:o=>x`
        <sp-icon-chevron75
            class="stepper-icon spectrum-UIIcon-Chevron${o}75"
        ></sp-icon-chevron75>
    `,l:o=>x`
        <sp-icon-chevron100
            class="stepper-icon spectrum-UIIcon-Chevron${o}100"
        ></sp-icon-chevron100>
    `,xl:o=>x`
        <sp-icon-chevron200
            class="stepper-icon spectrum-UIIcon-Chevron${o}200"
        ></sp-icon-chevron200>
    `};class NumberField extends TextfieldBase{constructor(){super(...arguments);this.focused=!1;this._forcedUnit="";this.formatOptions={};this.hideStepper=!1;this.indeterminate=!1;this.keyboardFocused=!1;this.managedInput=!1;this.stepModifier=10;this._value=NaN;this._trackingValue="";this.decimalsChars=new Set([".",","]);this.valueBeforeFocus="";this.isIntentDecimal=!1;this.changeCount=0;this.languageResolver=new LanguageResolutionController(this);this.wasIndeterminate=!1;this.hasRecentlyReceivedPointerDown=!1;this.applyFocusElementLabel=e=>{this.appliedLabel=e;};this.isComposing=!1;}static get styles(){return [...super.styles,e,r]}set value(e){const t=this.validateInput(e);if(t===this.value)return;this.lastCommitedValue=t;const i=this._value;this._value=t,this.requestUpdate("value",i);}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}setValue(e=this.value){const t=this.lastCommitedValue;this.value=e,!(typeof t=="undefined"||t===this.value)&&(this.lastCommitedValue=this.value,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})));}get valueAsString(){return this._value.toString()}set valueAsString(e){this.value=this.numberParser.parse(e);}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(e){let t=e.split("").map(r=>remapMultiByteCharacters[r]||r).join("");const i=this.valueBeforeFocus.split("").filter(r=>this.decimalsChars.has(r)),s=new Set(i);if(isIPhone()&&this.inputElement.inputMode==="decimal"&&t!==this.valueBeforeFocus){const d=this.numberFormatter.formatToParts(1000.1).find(n=>n.type==="decimal").value;for(const n of s)!(n===d)&&!this.isIntentDecimal&&(t=t.replace(new RegExp(n,"g"),""));let m=!1;const h=t.split("");for(let n=h.length-1;n>=0;n--){const f=h[n];this.decimalsChars.has(f)&&(m?h[n]="":(h[n]=d,m=!0));}t=h.join("");}return this.numberParser.parse(t)}get _step(){var e;return typeof this.step!="undefined"?this.step:((e=this.formatOptions)==null?void 0:e.style)==="percent"?.01:1}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this.managedInput=!0,this.buttons.setPointerCapture(e.pointerId);const t=this.buttons.children[0].getBoundingClientRect(),i=this.buttons.children[1].getBoundingClientRect();this.findChange=s=>{s.clientX>=t.x&&s.clientY>=t.y&&s.clientX<=t.x+t.width&&s.clientY<=t.y+t.height?this.change=r=>this.increment(r.shiftKey?this.stepModifier:1):s.clientX>=i.x&&s.clientY>=i.y&&s.clientX<=i.x+i.width&&s.clientY<=i.y+i.height&&(this.change=r=>this.decrement(r.shiftKey?this.stepModifier:1));},this.findChange(e),this.startChange(e);}startChange(e){this.changeCount=0,this.doChange(e),this.safty=setTimeout(()=>{this.doNextChange(e);},400);}doChange(e){this.change(e);}handlePointermove(e){this.findChange(e);}handlePointerup(e){this.buttons.releasePointerCapture(e.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.managedInput=!1,this.setValue();}doNextChange(e){return this.changeCount+=1,this.changeCount%FRAMES_PER_CHANGE===0&&this.doChange(e),requestAnimationFrame(()=>{this.nextChange=this.doNextChange(e);})}stepBy(e){if(this.disabled||this.readonly)return;const t=typeof this.min!="undefined"?this.min:0;let i=this.value;i+=e*this._step,isNaN(this.value)&&(i=t),i=this.valueWithLimits(i),this.requestUpdate(),this._value=this.validateInput(i),this.inputElement.value=this.numberFormatter.format(i),this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.indeterminate=!1,this.focus();}increment(e=1){this.stepBy(1*e);}decrement(e=1){this.stepBy(-1*e);}handleKeydown(e){if(!this.isComposing)switch(e.code){case"ArrowUp":e.preventDefault(),this.increment(e.shiftKey?this.stepModifier:1),this.setValue();break;case"ArrowDown":e.preventDefault(),this.decrement(e.shiftKey?this.stepModifier:1),this.setValue();break}}onScroll(e){e.preventDefault(),this.managedInput=!0;const t=e.shiftKey?e.deltaX/Math.abs(e.deltaX):e.deltaY/Math.abs(e.deltaY);t!==0&&!isNaN(t)&&(this.stepBy(t*(e.shiftKey?this.stepModifier:1)),clearTimeout(this.queuedChangeEvent),this.queuedChangeEvent=setTimeout(()=>{this.setValue();},CHANGE_DEBOUNCE_MS)),this.managedInput=!1;}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!this.readonly&&!0,this.addEventListener("wheel",this.onScroll,{passive:!1}),this.valueBeforeFocus=this.inputElement.value;}onBlur(e){super.onBlur(e),this.keyboardFocused=!this.readonly&&!1,this.removeEventListener("wheel",this.onScroll),this.isIntentDecimal=!1;}handleFocusin(){this.focused=!this.readonly&&!0,this.keyboardFocused=!this.readonly&&!0;}handleFocusout(){this.focused=!this.readonly&&!1,this.keyboardFocused=!this.readonly&&!1;}handleChange(){const e=this.convertValueToNumber(this.inputValue);if(this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(e))){this.indeterminate=!0;return}this.setValue(e),this.inputElement.value=this.formattedValue;}handleCompositionStart(){this.isComposing=!0;}handleCompositionEnd(){this.isComposing=!1,requestAnimationFrame(()=>{this.inputElement.dispatchEvent(new Event("input",{composed:!0,bubbles:!0}));});}handleInputElementPointerdown(){this.hasRecentlyReceivedPointerDown=!0,this.updateComplete.then(()=>{requestAnimationFrame(()=>{this.hasRecentlyReceivedPointerDown=!1;});});}handleInput(e){var h;if(this.isComposing){e.stopPropagation();return}this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace(indeterminatePlaceholder,"")),e.data&&this.decimalsChars.has(e.data)&&(this.isIntentDecimal=!0);const{value:t,selectionStart:i}=this.inputElement,s=t.split("").map(n=>remapMultiByteCharacters[n]||n).join("");if(this.numberParser.isValidPartialNumber(s)){this.lastCommitedValue=(h=this.lastCommitedValue)!=null?h:this.value;const n=this.convertValueToNumber(s);!s&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(n)),this._trackingValue=s,this.inputElement.value=s,this.inputElement.setSelectionRange(i,i);return}else this.inputElement.value=this.indeterminate?indeterminatePlaceholder:this._trackingValue;const r=s.length,d=this._trackingValue.length,m=(i||r)-(r-d);this.inputElement.setSelectionRange(m,m);}valueWithLimits(e){let t=e;return typeof this.min!="undefined"&&(t=Math.max(this.min,t)),typeof this.max!="undefined"&&(t=Math.min(this.max,t)),t}validateInput(e){e=this.valueWithLimits(e);const t=e<0?-1:1;if(e*=t,this.step){const i=typeof this.min!="undefined"?this.min:0,s=parseFloat(this.valueFormatter.format((e-i)%this.step));if(s===0||(Math.round(s/this.step)===1?e+=this.step-s:e-=s),typeof this.max!="undefined")for(;e>this.max;)e-=this.step;e=parseFloat(this.valueFormatter.format(e));}return e*=t,e}get displayValue(){const e=this.focused?"":indeterminatePlaceholder;return this.indeterminate?e:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0;}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const{style:e,unit:t,unitDisplay:i,...s}=this.formatOptions;e!=="unit"&&(s.style=e),this._numberFormatterFocused=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(this.languageResolver.language,s);try{this._numberFormatter=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1);}catch(r){e==="unit"&&(this._forcedUnit=t),this._numberFormatter=this._numberFormatterFocused;}}return this.focused?this._numberFormatterFocused:this._numberFormatter}clearValueFormatterCache(){this._valueFormatter=void 0;}get valueFormatter(){if(!this._valueFormatter){const e=this.step&&this.step!=Math.floor(this.step)?this.step.toString().split(".")[1].length:0;this._valueFormatter=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5("en",{useGrouping:!1,maximumFractionDigits:e});}return this._valueFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const{style:e,unit:t,unitDisplay:i,...s}=this.formatOptions;e!=="unit"&&(s.style=e),this._numberParserFocused=new $6c7bd7858deea686$export$cd11ab140839f11d(this.languageResolver.language,s);try{this._numberParser=new $6c7bd7858deea686$export$cd11ab140839f11d(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0");}catch(r){e==="unit"&&(this._forcedUnit=t),this._numberParser=this._numberParserFocused;}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",x`
            ${super.renderField()}
            ${this.hideStepper?T:x`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${streamingListener({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
                      >
                          <sp-infield-button
                              inline="end"
                              block="start"
                              class="button step-up"
                              aria-describedby=${this.helpTextId}
                              label=${"Increase "+this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||typeof this.max!="undefined"&&this.value===this.max}
                              ?quiet=${this.quiet}
                          >
                              ${g[this.size]("Up")}
                          </sp-infield-button>
                          <sp-infield-button
                              inline="end"
                              block="end"
                              class="button step-down"
                              aria-describedby=${this.helpTextId}
                              label=${"Decrease "+this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||typeof this.min!="undefined"&&this.value===this.min}
                              ?quiet=${this.quiet}
                          >
                              ${g[this.size]("Down")}
                          </sp-infield-button>
                      </span>
                  `}
        `}update(e){if((e.has("formatOptions")||e.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),e.has("value")||e.has("max")||e.has("min")){const t=this.numberParser.parse(this.formattedValue.replace(this._forcedUnit,""));this.value=t;}e.has("step")&&this.clearValueFormatterCache(),super.update(e);}willUpdate(e){this.multiline=!1,e.has(languageResolverUpdatedSymbol)&&this.clearNumberFormatterCache();}firstUpdated(e){super.firstUpdated(e),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("compositionstart",this.handleCompositionStart),this.addEventListener("compositionend",this.handleCompositionEnd);}updated(e){if(!(!this.inputElement||!this.isConnected)){if(e.has("min")||e.has("formatOptions")){let t="numeric";const i=typeof this.min!="undefined"&&this.min<0,{maximumFractionDigits:s}=this.numberFormatter.resolvedOptions(),r=s>0;isIPhone()?i?t="text":r&&(t="decimal"):isAndroid()&&(i?t="numeric":r&&(t="decimal")),this.inputElement.inputMode=t;}e.has("focused")&&this.focused&&!this.hasRecentlyReceivedPointerDown&&this.formatOptions.unit&&this.setSelectionRange(0,this.displayValue.length);}}}a([e$1(".buttons")],NumberField.prototype,"buttons",2),a([n({type:Boolean,reflect:!0})],NumberField.prototype,"focused",2),a([n({type:Object,attribute:"format-options"})],NumberField.prototype,"formatOptions",2),a([n({type:Boolean,reflect:!0,attribute:"hide-stepper"})],NumberField.prototype,"hideStepper",2),a([n({type:Boolean,reflect:!0})],NumberField.prototype,"indeterminate",2),a([n({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],NumberField.prototype,"keyboardFocused",2),a([n({type:Number})],NumberField.prototype,"max",2),a([n({type:Number})],NumberField.prototype,"min",2),a([n({type:Number})],NumberField.prototype,"step",2),a([n({type:Number,reflect:!0,attribute:"step-modifier"})],NumberField.prototype,"stepModifier",2),a([n({type:Number})],NumberField.prototype,"value",1);

defineElement("sp-number-field",NumberField);
