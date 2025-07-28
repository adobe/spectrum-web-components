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
export declare const LONGPRESS_INSTRUCTIONS: {
    touch: string;
    keyboard: string;
    mouse: string;
};
export declare class LongpressController extends InteractionController {
    type: InteractionTypes;
    get activelyOpening(): boolean;
    protected longpressState: null | 'potential' | 'opening' | 'pressed';
    releaseDescription: () => void;
    private timeout;
    handleLongpress(): void;
    handlePointerdown(event: PointerEvent): void;
    private handlePointerup;
    private handleKeydown;
    private handleKeyup;
    prepareDescription(trigger: HTMLElement): void;
    shouldCompleteOpen(): void;
    init(): void;
}
