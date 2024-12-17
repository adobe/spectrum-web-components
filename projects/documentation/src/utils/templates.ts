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

import {
  css,
  type CSSResultGroup,
  html,
  type TemplateResult,
} from '@spectrum-web-components/base';

/**
 * Converts a string of code into an HTML template string.
 *
 * @param code - The code to be converted into an HTML template string.
 * @returns - The resulting HTML template string.
 */
export function toHtmlTemplateString(code: string): TemplateResult {
  const stringArray = [`${code}`] as string[] & { raw: string[] };

  stringArray.raw = [`${code}`];

  return html(stringArray as TemplateStringsArray);
}

/**
 * Converts a string of code into a CSS template string.
 *
 * @param code - The code to be converted into a CSS template string.
 * @returns - The resulting CSS template string.
 */
export function toCssTemplateString(code: string): CSSResultGroup {
  const stringArray = [`${code}`] as string[] & { raw: string[] };

  stringArray.raw = [`${code}`];

  return css(stringArray as TemplateStringsArray);
}
