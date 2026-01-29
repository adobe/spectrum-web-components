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

export {
    firstFocusableIn,
    firstFocusableSlottedIn,
} from './first-focusable-in.js';
export { FocusVisiblePolyfillMixin } from './focus-visible.js';
export { Focusable } from './focusable.js';
export { userFocusableSelector, focusableSelector } from './focusable-selectors.js';
export { getActiveElement } from './get-active-element.js';
export { getDeepElementFromPoint } from './get-deep-element-from-point.js';
export { getLabelFromSlot } from './get-label-from-slot.js';
export { LikeAnchor } from './like-anchor.js';
export type { LikeAnchorInterface } from './like-anchor.js';
export { ObserveSlotPresence } from './observe-slot-presence.js';
export type { SlotPresenceObservingInterface } from './observe-slot-presence.js';
export { ObserveSlotText } from './observe-slot-text.js';
export type { SlotTextObservingInterface } from './observe-slot-text.js';
export {
    isMac,
    isIPhone,
    isIPad,
    isIOS,
    isAppleDevice,
    isWebKit,
    isChrome,
    isFirefox,
    isSeamonkey,
    isAndroid,
} from './platform.js';
export { reparentChildren } from './reparent-children.js';
export { randomID } from './random-id.js';
