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

import type { TemplateResult } from 'lit';

import type { TextField } from '@adobe/spectrum-wc/text-field';

import { fixture, getComponent } from '../../../utils/test-utils.js';

export async function getTextFieldParts(
  root: HTMLElement,
  selector = 'swc-text-field'
): Promise<{ field: TextField; input: HTMLInputElement }> {
  if (!root.querySelector(selector)) {
    throw new Error(`Text field not found: ${selector}`);
  }
  const field = await getComponent<TextField>(root, selector);
  const input = field.roleElement;
  if (!input) {
    throw new Error(`Text field input not found: ${selector}`);
  }
  return { field, input };
}

export async function getFormFieldParts(root: HTMLElement): Promise<{
  field: TextField;
  input: HTMLInputElement;
  form: HTMLFormElement;
}> {
  const { field, input } = await getTextFieldParts(root);
  const form = field.form;
  if (!form) {
    throw new Error('Text field is not associated with a form');
  }
  return { field, input, form };
}

export async function withTextFieldFixture(
  template: TemplateResult,
  callback: (field: TextField) => void | Promise<void>
): Promise<void> {
  const field = await fixture<TextField>(template);
  const wrapper = field.parentElement;
  if (!wrapper) {
    throw new Error('Text field fixture wrapper not found');
  }
  try {
    await callback(field);
  } finally {
    wrapper.remove();
  }
}
