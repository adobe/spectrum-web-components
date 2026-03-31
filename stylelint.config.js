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

import stylelintOrder from 'stylelint-order';
import stylelintDeclarationStrictValue from 'stylelint-declaration-strict-value';
import swcHeader from '@spectrum-web-components/stylelint-header-plugin';
import propertyGroups from './linters/stylelint-property-order.js';

const HEADER = `/**
 * Copyright ${new Date().getFullYear()} Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */`;

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: [swcHeader, stylelintOrder, stylelintDeclarationStrictValue],
  rules: {
    'custom-property-pattern': [
      '^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*(?:--(sizeM|sizeL|compact))?$',
      {
        message: (name) =>
          `"${name}" is invalid. Custom property names must be lowercase kebab-case (e.g. mod-token, spectrum-color). An optional leading underscore is allowed (e.g. _private). An optional suffix --sizeM, --sizeL, or --compact is allowed (e.g. swc-badge--sizeM).`,
      },
    ],
    'color-function-alias-notation': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-property-value-no-unknown': [
      true,
      { ignoreProperties: { '/.+/': ['/token((.*))/'] } },
    ],
    'length-zero-no-unit': [true, { ignore: 'custom-properties' }],
    'selector-class-pattern': null,
    'selector-pseudo-element-colon-notation': ['double'],
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'swc/header': HEADER,
    'order/properties-order': [
      propertyGroups,
      {
        unspecified: 'top',
        emptyLineBeforeUnspecified: 'always',
      },
    ],
  },
  overrides: [
    {
      files: ['2nd-gen/**/*.css'],
      rules: {
        'scale-unlimited/declaration-strict-value': [
          [
            'color',
            'background-color',
            'border-color',
            'fill',
            'stroke',
            'font-family',
            'font-size',
            'font-weight',
            'line-height',
          ],
          {
            disableFix: true,
            ignoreValues: [
              'currentcolor',
              'inherit',
              'initial',
              'none',
              'transparent',
              'unset',
            ],
            message:
              "Use a design token (CSS custom property or token() function) instead of hardcoded value for '${property}'",
            severity: 'warning',
          },
        ],
      },
    },
    {
      files: ['1st-gen/**/*.css'],
      rules: {
        'property-no-vendor-prefix': null,
        'no-descending-specificity': null,
        'no-duplicate-selectors': null,
      },
    },
  ],
};
