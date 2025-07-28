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
import { InteractionController, InteractionTypes } from './InteractionController.js';
export declare class HoverController extends InteractionController {
    type: InteractionTypes;
    private elementIds;
    focusedin: boolean;
    private hoverTimeout?;
    pointerentered: boolean;
    handleKeyup(event: KeyboardEvent): void;
    handleTargetFocusin(): void;
    handleTargetFocusout(): void;
    handleTargetPointerenter(): void;
    handleTargetPointerleave(): void;
    handleHostPointerenter(): void;
    handleHostPointerleave(): void;
    prepareDescription(): void;
    private prepareOverlayRelativeDescription;
    private prepareContentRelativeDescription;
    protected doPointerleave(): void;
    init(): void;
    initOverlay(): void;
}
