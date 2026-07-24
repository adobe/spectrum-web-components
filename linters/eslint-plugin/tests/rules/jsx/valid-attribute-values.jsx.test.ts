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
    // PascalCase theme with valid values
    {
      code: '<SpTheme color="light" scale="medium" system="spectrum"></SpTheme>;',
    },
    // kebab-case theme with valid values
    {
      code: '<sp-theme color="light" scale="medium" system="spectrum"></sp-theme>;',
    },
    // PascalCase theme with dark/large/express
    {
      code: '<SpTheme color="dark" scale="large" system="express"></SpTheme>;',
    },
    // PascalCase button with valid variant
    {
      code: '<SpButton variant="accent">Click</SpButton>;',
    },
    // Dynamic value (can't verify statically)
    {
      code: '<SpTheme color={this.color} scale="medium" system="spectrum"></SpTheme>;',
    },
    // Non-SWC element
    {
      code: '<div color="purple"></div>;',
    },
  ],
  invalid: [
    // PascalCase theme with invalid color
    {
      code: '<SpTheme color="lightest" scale="medium" system="spectrum"></SpTheme>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    // kebab-case theme with invalid color
    {
      code: '<sp-theme color="lightest" scale="medium" system="spectrum"></sp-theme>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    // Invalid scale
    {
      code: '<SpTheme color="light" scale="tiny" system="spectrum"></SpTheme>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    // Invalid button variant
    {
      code: '<SpButton variant="danger">Click</SpButton>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    // Invalid tabs direction
    {
      code: '<SpTabs direction="diagonal" aria-label="Nav"></SpTabs>;',
      errors: [{ messageId: 'invalidValue' }],
    },
    // kebab-case invalid tabs direction
    {
      code: '<sp-tabs direction="diagonal" accessible-label="Nav"></sp-tabs>;',
      errors: [{ messageId: 'invalidValue' }],
    },
  ],
});
