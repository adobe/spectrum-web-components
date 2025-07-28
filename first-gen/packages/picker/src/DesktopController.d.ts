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
export declare class DesktopController extends InteractionController {
    type: InteractionTypes;
    handlePointerdown(event: PointerEvent): void;
    handleActivate(event?: Event): void;
    init(): void;
}
