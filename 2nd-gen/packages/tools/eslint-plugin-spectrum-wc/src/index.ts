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

import type { ESLint, Linter } from 'eslint';

import { accessibleComponent } from './rules/accessible-component.js';
import { noDeprecated } from './rules/no-deprecated.js';
import { requiredAttributes } from './rules/required-attributes.js';
import { validAttributeValues } from './rules/valid-attribute-values.js';
import { validSlotChildren } from './rules/valid-slot-children.js';
import { validSlotNames } from './rules/valid-slot-names.js';

const PLUGIN_NAME = 'swc';

const rules = {
  'accessible-component': accessibleComponent,
  'no-deprecated': noDeprecated,
  'required-attributes': requiredAttributes,
  'valid-attribute-values': validAttributeValues,
  'valid-slot-names': validSlotNames,
  'valid-slot-children': validSlotChildren,
};

const recommendedRules: Linter.RulesRecord = {
  [`${PLUGIN_NAME}/accessible-component`]: 'warn',
  [`${PLUGIN_NAME}/no-deprecated`]: 'warn',
  [`${PLUGIN_NAME}/required-attributes`]: 'warn',
  [`${PLUGIN_NAME}/valid-attribute-values`]: 'warn',
  [`${PLUGIN_NAME}/valid-slot-names`]: 'warn',
  [`${PLUGIN_NAME}/valid-slot-children`]: 'warn',
};

const strictRules: Linter.RulesRecord = {
  [`${PLUGIN_NAME}/accessible-component`]: 'error',
  [`${PLUGIN_NAME}/no-deprecated`]: 'error',
  [`${PLUGIN_NAME}/required-attributes`]: 'error',
  [`${PLUGIN_NAME}/valid-attribute-values`]: 'error',
  [`${PLUGIN_NAME}/valid-slot-names`]: 'error',
  [`${PLUGIN_NAME}/valid-slot-children`]: 'error',
};

const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-plugin-spectrum-wc',
    version: '0.4.0',
  },
  rules,
  configs: {},
};

const configs: Record<string, Linter.Config> = {
  recommended: {
    plugins: { [PLUGIN_NAME]: plugin },
    rules: recommendedRules,
  },
  strict: {
    plugins: { [PLUGIN_NAME]: plugin },
    rules: strictRules,
  },
};

plugin.configs = configs;

export default plugin;
export { rules, configs };
export type {
  ComponentDescriptor,
  ComponentDescriptorMap,
  SlotDescriptor,
} from './core/types.js';
