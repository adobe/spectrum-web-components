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

import type {
    OverlayOptions,
    OverlayOptionsV1,
    TriggerInteractionsV1,
} from './overlay-types.js';
import { Overlay } from './Overlay.js';

// Re-export Overlay.open and openOverlay to persist functionality from before 0.37.0.
// Wrap it in a method (which needs duplicate argument typings) instead of exporting
// the static member directly to ensure `this` is bound correctly therein.
export async function openOverlay(
    trigger: HTMLElement,
    interaction: TriggerInteractionsV1,
    content: HTMLElement,
    optionsV1: OverlayOptionsV1
): Promise<() => void>;
export async function openOverlay(
    content: HTMLElement,
    options?: OverlayOptions
): Promise<Overlay>;
export async function openOverlay(
    triggerOrContent: HTMLElement,
    interactionOrOptions: TriggerInteractionsV1 | OverlayOptions | undefined,
    content?: HTMLElement,
    optionsV1?: OverlayOptionsV1
): Promise<Overlay | (() => void)> {
    return Overlay.open(
        triggerOrContent,
        interactionOrOptions as TriggerInteractionsV1,
        content as HTMLElement,
        optionsV1 as OverlayOptionsV1
    );
}
