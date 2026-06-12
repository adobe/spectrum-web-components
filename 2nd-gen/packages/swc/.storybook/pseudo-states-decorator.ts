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

import type { DecoratorFunction } from '@storybook/types';

import { scheduleTestingGridPseudoStates } from './pseudo-states-helpers.js';

/**
 * Injects class-based pseudo-state rules into open shadow roots after each story
 * renders, then patches testing-grid cells (`data-vrt-state`, icon-only). Runs on
 * every render so toggling **Testing preview** re-applies classes after the grid mounts.
 */
export const pseudoStatesDecorator: DecoratorFunction = (storyFn, context) => {
  scheduleTestingGridPseudoStates();
  const result = storyFn(context);
  scheduleTestingGridPseudoStates();
  return result;
};
