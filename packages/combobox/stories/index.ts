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
import {
    ElementSize,
    html,
    TemplateResult,
} from '@spectrum-web-components/base';
import { Combobox, ComboboxOption } from '@spectrum-web-components/combobox';
import '@spectrum-web-components/combobox/sp-combobox.js';
import { spreadProps } from '../../../test/lit-helpers';

export type StoryArgs = {
    open?: boolean;
    pending?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    value?: string;
    disabledItems?: string[];
    autocomplete?: 'list' | 'none';
    size?: ElementSize;
    onChange?: (val: string) => void;
    onInput?: (val: string) => void;
};

const handleChange =
    ({ onChange }: StoryArgs) =>
    (event: Event): void => {
        const picker = event.target as Combobox;
        if (onChange) onChange(picker.value);
    };

const handleInput =
    ({ onInput }: StoryArgs) =>
    (event: Event): void => {
        const picker = event.target as Combobox;
        if (onInput) onInput(picker.value);
    };

export const ComboboxMarkup = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-combobox
            .options=${countries}
            .value=${args.value || ''}
            @change=${handleChange(args)}
            @input=${handleInput(args)}
            ${spreadProps(args)}
        >
            <span slot="field-label">Where do you live?</span>
        </sp-combobox>
    `;
};

export const countries: ComboboxOption[] = [
    { value: 'af', itemText: 'Afghanistan' },
    { value: 'ax', itemText: 'Aland Islands' },
    { value: 'al', itemText: 'Albania' },
    { value: 'dz', itemText: 'Algeria' },
    { value: 'as', itemText: 'American Samoa' },
    { value: 'ad', itemText: 'Andorra' },
    { value: 'ao', itemText: 'Angola' },
    { value: 'ai', itemText: 'Anguilla' },
    { value: 'aq', itemText: 'Antarctica' },
    { value: 'ag', itemText: 'Antigua and Barbuda' },
    { value: 'ar', itemText: 'Argentina' },
    { value: 'ar', itemText: 'Armenia' },
    { value: 'aw', itemText: 'Aruba' },
    { value: 'au', itemText: 'Australia' },
    { value: 'at', itemText: 'Austria' },
    { value: 'az', itemText: 'Azerbaijan' },
    { value: 'bs', itemText: 'Bahamas' },
    { value: 'bh', itemText: 'Bahrain' },
    { value: 'bd', itemText: 'Bangladesh' },
    { value: 'bb', itemText: 'Barbados' },
    { value: 'by', itemText: 'Belarus' },
    { value: 'be', itemText: 'Belgium' },
    { value: 'bz', itemText: 'Belize' },
    { value: 'bj', itemText: 'Benin' },
    { value: 'bm', itemText: 'Bermuda' },
    { value: 'bt', itemText: 'Bhutan' },
    { value: 'bo', itemText: 'Bolivia' },
    { value: 'ba', itemText: 'Bosnia and Herzegovina' },
    { value: 'bw', itemText: 'Botswana' },
    { value: 'bv', itemText: 'Bouvet Island' },
    { value: 'br', itemText: 'Brazil' },
    { value: 'io', itemText: 'British Indian Ocean Territory' },
    { value: 'bn', itemText: 'Brunei Darussalam' },
    { value: 'bg', itemText: 'Bulgaria' },
    { value: 'bf', itemText: 'Burkina Faso' },
    { value: 'bi', itemText: 'Burundi' },
    { value: 'kh', itemText: 'Cambodia' },
    { value: 'cm', itemText: 'Cameroon' },
    { value: 'ca', itemText: 'Canada' },
    { value: 'cv', itemText: 'Cape Verde' },
    { value: 'ky', itemText: 'Cayman Islands' },
    { value: 'cf', itemText: 'Central African Republic' },
    { value: 'td', itemText: 'Chad' },
    { value: 'cl', itemText: 'Chile' },
    { value: 'cn', itemText: 'China' },
    { value: 'cx', itemText: 'Christmas Island' },
    { value: 'cc', itemText: 'Cocos (Keeling) Islands' },
    { value: 'co', itemText: 'Colombia' },
    { value: 'km', itemText: 'Comoros' },
    { value: 'cg', itemText: 'Congo' },
    { value: 'cd', itemText: 'Congo, The Democratic Republic of the' },
    { value: 'ck', itemText: 'Cook Islands' },
    { value: 'cr', itemText: 'Costa Rica' },
    { value: 'ci', itemText: "Cote D'Ivoire" },
    { value: 'hr', itemText: 'Croatia' },
    { value: 'cu', itemText: 'Cuba' },
    { value: 'cy', itemText: 'Cyprus' },
    { value: 'cz', itemText: 'Czech Republic' },
    { value: 'dk', itemText: 'Denmark' },
    { value: 'dj', itemText: 'Djibouti' },
    { value: 'dm', itemText: 'Dominica' },
    { value: 'do', itemText: 'Dominican Republic' },
    { value: 'ec', itemText: 'Ecuador' },
    { value: 'eg', itemText: 'Egypt' },
    { value: 'sv', itemText: 'El Salvador' },
    { value: 'gq', itemText: 'Equatorial Guinea' },
    { value: 'er', itemText: 'Eritrea' },
    { value: 'ee', itemText: 'Estonia' },
    { value: 'et', itemText: 'Ethiopia' },
    { value: 'fk', itemText: 'Falkland Islands (Malvinas)' },
    { value: 'fo', itemText: 'Faroe Islands' },
    { value: 'fj', itemText: 'Fiji' },
    { value: 'fi', itemText: 'Finland' },
    { value: 'fr', itemText: 'France' },
    { value: 'gf', itemText: 'French Guiana' },
    { value: 'pf', itemText: 'French Polynesia' },
    { value: 'tf', itemText: 'French Southern Territories' },
    { value: 'ga', itemText: 'Gabon' },
    { value: 'gm', itemText: 'Gambia' },
    { value: 'ge', itemText: 'Georgia' },
    { value: 'de', itemText: 'Germany' },
    { value: 'gh', itemText: 'Ghana' },
    { value: 'gi', itemText: 'Gibraltar' },
    { value: 'gr', itemText: 'Greece' },
    { value: 'gl', itemText: 'Greenland' },
    { value: 'gd', itemText: 'Grenada' },
    { value: 'gp', itemText: 'Guadeloupe' },
    { value: 'gu', itemText: 'Guam' },
    { value: 'gt', itemText: 'Guatemala' },
    { value: 'gg', itemText: 'Guernsey' },
    { value: 'gn', itemText: 'Guinea' },
    { value: 'gw', itemText: 'Guinea-Bissau' },
    { value: 'gy', itemText: 'Guyana' },
    { value: 'ht', itemText: 'Haiti' },
    { value: 'hm', itemText: 'Heard Island and Mcdonald Islands' },
    { value: 'va', itemText: 'Holy See (Vatican City State)' },
    { value: 'hn', itemText: 'Honduras' },
    { value: 'hk', itemText: 'Hong Kong' },
    { value: 'hu', itemText: 'Hungary' },
    { value: 'is', itemText: 'Iceland' },
    { value: 'in', itemText: 'India' },
    { value: 'id', itemText: 'Indonesia' },
    { value: 'ir', itemText: 'Iran, Islamic Republic Of' },
    { value: 'iq', itemText: 'Iraq' },
    { value: 'ie', itemText: 'Ireland' },
    { value: 'im', itemText: 'Isle of Man' },
    { value: 'il', itemText: 'Israel' },
    { value: 'it', itemText: 'Italy' },
    { value: 'jm', itemText: 'Jamaica' },
    { value: 'jp', itemText: 'Japan' },
    { value: 'je', itemText: 'Jersey' },
    { value: 'jo', itemText: 'Jordan' },
    { value: 'kz', itemText: 'Kazakhstan' },
    { value: 'ke', itemText: 'Kenya' },
    { value: 'ki', itemText: 'Kiribati' },
    { value: 'kp', itemText: "Korea, Democratic People's Republic of" },
    { value: 'kr', itemText: 'Korea, Republic of' },
    { value: 'kw', itemText: 'Kuwait' },
    { value: 'kg', itemText: 'Kyrgyzstan' },
    { value: 'la', itemText: 'Laos' },
    { value: 'lv', itemText: 'Latvia' },
    { value: 'lb', itemText: 'Lebanon' },
    { value: 'ls', itemText: 'Lesotho' },
    { value: 'lr', itemText: 'Liberia' },
    { value: 'ly', itemText: 'Libyan Arab Jamahiriya' },
    { value: 'li', itemText: 'Liechtenstein' },
    { value: 'lt', itemText: 'Lithuania' },
    { value: 'lu', itemText: 'Luxembourg' },
    { value: 'mo', itemText: 'Macao' },
    { value: 'mk', itemText: 'Macedonia, The Former Yugoslav Republic of' },
    { value: 'mg', itemText: 'Madagascar' },
    { value: 'mw', itemText: 'Malawi' },
    { value: 'my', itemText: 'Malaysia' },
    { value: 'mv', itemText: 'Maldives' },
    { value: 'ml', itemText: 'Mali' },
    { value: 'mt', itemText: 'Malta' },
    { value: 'mh', itemText: 'Marshall Islands' },
    { value: 'mq', itemText: 'Martinique' },
    { value: 'mr', itemText: 'Mauritania' },
    { value: 'mu', itemText: 'Mauritius' },
    { value: 'yt', itemText: 'Mayotte' },
    { value: 'mx', itemText: 'Mexico' },
    { value: 'fm', itemText: 'Micronesia, Federated States of' },
    { value: 'md', itemText: 'Moldova, Republic of' },
    { value: 'mc', itemText: 'Monaco' },
    { value: 'mn', itemText: 'Mongolia' },
    { value: 'me', itemText: 'Montenegro' },
    { value: 'ms', itemText: 'Montserrat' },
    { value: 'ma', itemText: 'Morocco' },
    { value: 'mz', itemText: 'Mozambique' },
    { value: 'mm', itemText: 'Myanmar' },
    { value: 'na', itemText: 'Namibia' },
    { value: 'nr', itemText: 'Nauru' },
    { value: 'np', itemText: 'Nepal' },
    { value: 'nl', itemText: 'Netherlands' },
    { value: 'an', itemText: 'Netherlands Antilles' },
    { value: 'nc', itemText: 'New Caledonia' },
    { value: 'nz', itemText: 'New Zealand' },
    { value: 'ni', itemText: 'Nicaragua' },
    { value: 'ne', itemText: 'Niger' },
    { value: 'ng', itemText: 'Nigeria' },
    { value: 'nu', itemText: 'Niue' },
    { value: 'nf', itemText: 'Norfolk Island' },
    { value: 'mp', itemText: 'Northern Mariana Islands' },
    { value: 'no', itemText: 'Norway' },
    { value: 'om', itemText: 'Oman' },
    { value: 'pk', itemText: 'Pakistan' },
    { value: 'pw', itemText: 'Palau' },
    { value: 'ps', itemText: 'Palestinian Territory, Occupied' },
    { value: 'pa', itemText: 'Panama' },
    { value: 'pg', itemText: 'Papua New Guinea' },
    { value: 'py', itemText: 'Paraguay' },
    { value: 'pe', itemText: 'Peru' },
    { value: 'ph', itemText: 'Philippines' },
    { value: 'pn', itemText: 'Pitcairn' },
    { value: 'pl', itemText: 'Poland' },
    { value: 'pt', itemText: 'Portugal' },
    { value: 'pr', itemText: 'Puerto Rico' },
    { value: 'qa', itemText: 'Qatar' },
    { value: 're', itemText: 'Reunion' },
    { value: 'ro', itemText: 'Romania' },
    { value: 'ru', itemText: 'Russian Federation' },
    { value: 'rw', itemText: 'RWANDA' },
    { value: 'sh', itemText: 'Saint Helena' },
    { value: 'kn', itemText: 'Saint Kitts and Nevis' },
    { value: 'lc', itemText: 'Saint Lucia' },
    { value: 'pm', itemText: 'Saint Pierre and Miquelon' },
    { value: 'vc', itemText: 'Saint Vincent and the Grenadines' },
    { value: 'ws', itemText: 'Samoa' },
    { value: 'sm', itemText: 'San Marino' },
    { value: 'st', itemText: 'Sao Tome and Principe' },
    { value: 'sa', itemText: 'Saudi Arabia' },
    { value: 'sn', itemText: 'Senegal' },
    { value: 'rs', itemText: 'Serbia' },
    { value: 'sc', itemText: 'Seychelles' },
    { value: 'sl', itemText: 'Sierra Leone' },
    { value: 'sg', itemText: 'Singapore' },
    { value: 'sk', itemText: 'Slovakia' },
    { value: 'si', itemText: 'Slovenia' },
    { value: 'sb', itemText: 'Solomon Islands' },
    { value: 'so', itemText: 'Somalia' },
    { value: 'za', itemText: 'South Africa' },
    { value: 'gs', itemText: 'South Georgia and the South Sandwich Islands' },
    { value: 'es', itemText: 'Spain' },
    { value: 'lk', itemText: 'Sri Lanka' },
    { value: 'sd', itemText: 'Sudan' },
    { value: 'sr', itemText: 'Suriname' },
    { value: 'sj', itemText: 'Svalbard and Jan Mayen' },
    { value: 'sz', itemText: 'Swaziland' },
    { value: 'se', itemText: 'Sweden' },
    { value: 'ch', itemText: 'Switzerland' },
    { value: 'sy', itemText: 'Syrian Arab Republic' },
    { value: 'tw', itemText: 'Taiwan' },
    { value: 'tj', itemText: 'Tajikistan' },
    { value: 'tz', itemText: 'Tanzania, United Republic of' },
    { value: 'th', itemText: 'Thailand' },
    { value: 'tl', itemText: 'Timor-Leste' },
    { value: 'tg', itemText: 'Togo' },
    { value: 'tk', itemText: 'Tokelau' },
    { value: 'to', itemText: 'Tonga' },
    { value: 'tt', itemText: 'Trinidad and Tobago' },
    { value: 'tn', itemText: 'Tunisia' },
    { value: 'tr', itemText: 'Turkey' },
    { value: 'tm', itemText: 'Turkmenistan' },
    { value: 'tc', itemText: 'Turks and Caicos Islands' },
    { value: 'tv', itemText: 'Tuvalu' },
    { value: 'ug', itemText: 'Uganda' },
    { value: 'ua', itemText: 'Ukraine' },
    { value: 'ae', itemText: 'United Arab Emirates' },
    { value: 'gb', itemText: 'United Kingdom' },
    { value: 'us', itemText: 'United States' },
    { value: 'um', itemText: 'United States Minor Outlying Islands' },
    { value: 'uy', itemText: 'Uruguay' },
    { value: 'uz', itemText: 'Uzbekistan' },
    { value: 'vu', itemText: 'Vanuatu' },
    { value: 've', itemText: 'Venezuela' },
    { value: 'vn', itemText: 'Vietnam' },
    { value: 'vg', itemText: 'Virgin Islands, British' },
    { value: 'vi', itemText: 'Virgin Islands, U.S.' },
    { value: 'wf', itemText: 'Wallis and Futuna' },
    { value: 'eh', itemText: 'Western Sahara' },
    { value: 'ye', itemText: 'Yemen' },
    { value: 'zm', itemText: 'Zambia' },
    { value: 'zw', itemText: 'Zimbabwe' },
];

export const fruits: ComboboxOption[] = [
    { value: 'apple', itemText: 'Apple' },
    { value: 'banana', itemText: 'Banana' },
    { value: 'cherry', itemText: 'Cherry' },
    { value: 'coconut', itemText: 'Coconut' },
    { value: 'durian', itemText: 'Durian' },
    { value: 'lemon', itemText: 'Lemon' },
    { value: 'lychee', itemText: 'Lychee' },
    { value: 'mango', itemText: 'Mango' },
    { value: 'orange', itemText: 'Orange' },
    { value: 'peach', itemText: 'Peach' },
    { value: 'pear', itemText: 'Pear' },
    { value: 'persimmon', itemText: 'Persimmon' },
];
