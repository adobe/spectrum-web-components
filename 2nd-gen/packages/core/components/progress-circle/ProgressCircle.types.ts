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

import type { ElementSize } from '@spectrum-web-components/core/shared/base/index.js';

export const PROGRESS_CIRCLE_VALID_SIZES: ElementSize[] = [
    's',
    'm',
    'l',
] as const;
export const PROGRESS_CIRCLE_STATIC_COLORS_S1 = ['white'] as const;
export const PROGRESS_CIRCLE_STATIC_COLORS_S2 = [
    ...PROGRESS_CIRCLE_STATIC_COLORS_S1,
    'black',
] as const;

export type ProgressCircleStaticColorS1 =
    (typeof PROGRESS_CIRCLE_STATIC_COLORS_S1)[number];
export type ProgressCircleStaticColorS2 =
    (typeof PROGRESS_CIRCLE_STATIC_COLORS_S2)[number];
export type ProgressCircleStaticColor =
    | ProgressCircleStaticColorS1
    | ProgressCircleStaticColorS2;
