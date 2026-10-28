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

export { physicalSide } from './utils/actual-placement.js';
export { capitalize } from './utils/capitalize.js';
export { componentDocsHref } from './utils/docs-href.js';
export { deepContains } from './utils/deep-contains.js';
export {
  isDebug,
  validateAllowedChildren,
  validateEnum,
  validateRequiredSlot,
  warnIf,
} from './utils/dev-validation.js';
export {
  isTopDismissible,
  registerDismissible,
  unregisterDismissible,
} from './utils/dismissible-stack.js';
export { getActiveElement } from './utils/get-active-element.js';
export {
  focusableSelector,
  tabbableSelector,
} from './utils/focusable-selectors.js';
export { getLabelFromSlot } from './utils/get-label-from-slot.js';
export { isFocusVisibleInTree } from './utils/is-focus-visible-in-tree.js';
export {
  resolveTrigger,
  type ResolvedTrigger,
  type ResolveTriggerOptions,
} from './utils/resolve-trigger.js';
export {
  hasActiveTransition,
  maxTransitionDurationMs,
  runAfterTransition,
} from './utils/transition.js';
