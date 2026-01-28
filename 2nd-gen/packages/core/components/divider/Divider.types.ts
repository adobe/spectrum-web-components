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

import type { ElementSize } from '@spectrum-web-components/core/shared/base/index.js';

export const DIVIDER_VALID_SIZES = [
    's',
    'm',
    'l',
] as const satisfies ElementSize[];
export const DIVIDER_STATIC_COLORS = ['white', 'black'] as const;

export type DividerStaticColor = (typeof DIVIDER_STATIC_COLORS)[number];

export type DividerSize = (typeof DIVIDER_VALID_SIZES)[number];
