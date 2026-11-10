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

/**
 * Public exports for Lit reactive controllers shared across gen2 packages.
 */

export {
  ColorController,
  type Color,
  type ColorTypes,
} from './controllers/color-controller.js';
export {
  FieldAssociationController,
  type FieldAssociationControllerOptions,
  type FieldFormValue,
} from './controllers/field-association-controller.js';
export {
  DragAndDropController,
  type DragAndDropControllerOptions,
  type DragLeaveSnapshot,
} from './controllers/drag-and-drop-controller.js';
export {
  focusgroupNavigationActiveChange,
  FocusgroupNavigationController,
  type FocusgroupActiveChangeSource,
  type FocusgroupDirection,
  type FocusgroupNavigationActiveChangeDetail,
  type FocusgroupNavigationOptions,
} from './controllers/focusgroup-navigation-controller.js';
export {
  LiveSelectionController,
  type LiveSelectionMode,
  type LiveSelectionOptions,
} from './controllers/live-selection-controller.js';
export {
  HoverController,
  type HoverControllerHost,
  type HoverControllerOptions,
} from './controllers/hover-controller.js';
export {
  LanguageResolutionController,
  languageResolverUpdatedSymbol,
} from './controllers/language-resolution.js';
export { PageScrollLockController } from './controllers/page-scroll-lock-controller.js';
export {
  PendingController,
  type PendingControllerHost,
  type PendingControllerOptions,
} from './controllers/pending-controller.js';
export {
  ALL_PLACEMENTS,
  fromFloatingPlacement,
  PlacementController,
  toFloatingPlacement,
  type Placement,
  type PlacementOptions,
  type VirtualTrigger,
} from './controllers/placement-controller.js';
export {
  SlotAttributePropagationController,
  type SlotAttributePropagationControllerOptions,
} from './controllers/slot-attribute-propagation-controller.js';
export { SlotPresenceController } from './controllers/slot-presence-controller.js';
export {
  SlotTextController,
  type SlotTextConfig,
} from './controllers/slot-text-controller.js';
export {
  TriggerPressController,
  type TriggerPressControllerOptions,
} from './controllers/trigger-press-controller.js';
