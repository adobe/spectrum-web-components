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

import type { ElementSize } from '@adobe/spectrum-wc-core/mixins/index.js';

export const SOURCE_LIST_VALID_SIZES = [
  's',
  'm',
] as const satisfies readonly ElementSize[];

export const SOURCE_LIST_VERBOSITIES = [
  'verbose',
  'regular',
  'concise',
] as const;

export const SOURCE_LIST_TYPES = ['ordered', 'unordered'] as const;

export const SOURCE_LIST_ITEM_HEADING_LEVELS = [2, 3, 4, 5, 6] as const;

export const SOURCE_LIST_DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/patterns-ai-toolkit-source-list--docs';

export type SourceListSize = (typeof SOURCE_LIST_VALID_SIZES)[number];
export type SourceListVerbosity = (typeof SOURCE_LIST_VERBOSITIES)[number];
export type SourceListType = (typeof SOURCE_LIST_TYPES)[number];
export type SourceListItemHeadingLevel =
  (typeof SOURCE_LIST_ITEM_HEADING_LEVELS)[number];
