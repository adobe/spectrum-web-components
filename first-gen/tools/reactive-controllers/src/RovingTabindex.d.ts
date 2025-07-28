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
import { FocusGroupConfig, FocusGroupController } from './FocusGroup.js';
export type RovingTabindexConfig<T> = FocusGroupConfig<T>;
interface UpdateTabIndexes {
    tabIndex: number;
    removeTabIndex?: boolean;
}
export declare class RovingTabindexController<T extends HTMLElement> extends FocusGroupController<T> {
    protected set focused(focused: boolean);
    protected get focused(): boolean;
    private managed;
    private manageIndexesAnimationFrame;
    clearElementCache(offset?: number): void;
    manageTabindexes(): void;
    updateTabindexes(getTabIndex: (el: HTMLElement) => UpdateTabIndexes): void;
    manage(): void;
    unmanage(): void;
    hostUpdated(): void;
}
export {};
