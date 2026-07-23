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

import { RuleTester } from '@typescript-eslint/rule-tester';
import { afterAll, describe, it } from 'vitest';

import { validAttributeValues } from '../../../src/rules/valid-attribute-values.js';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
});

ruleTester.run('valid-attribute-values (JSX)', validAttributeValues as never, {
  valid: [
    {
      code: '<SpTheme color="light" scale="medium" system="spectrum"></SpTheme>;',
    },
    {
      code: '<sp-theme color="light" scale="medium" system="spectrum"></sp-theme>;',
    },
    {
      code: '<SpTheme color="dark" scale="large" system="express"></SpTheme>;',
    },
    {
      code: '<SpButton variant="accent">Click</SpButton>;',
    },
    {
      code: '<SpTheme color={c}></SpTheme>;',
    },
    {
      code: '<div color="red"></div>;',
    },
  ],
  invalid: [
    {
      code: '<SpTheme color="lightest"></SpTheme>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    {
      code: '<sp-theme color="lightest"></sp-theme>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    {
      code: '<SpTheme scale="small"></SpTheme>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    {
      code: '<SpButton variant="danger">Click</SpButton>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    {
      code: '<SpTabs direction="diagonal"></SpTabs>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    {
      code: '<sp-tabs direction="diagonal"></sp-tabs>;',
      errors: [{ messageId: 'invalidValue' }],
    },
  ],
});
