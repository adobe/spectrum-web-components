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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/underlay/sp-underlay.js';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
/**
 * @element sp-tray
 *
 * @slot - content to display within the Tray
 *
 * @fires close - Announces that the Tray has been closed.
 */
export declare class Tray extends SpectrumElement {
    static get styles(): CSSResultArray;
    open: boolean;
    protected prefersMotion: MatchMediaController;
    private transitionPromise;
    private resolveTransitionPromise;
    private tray;
    focus(): void;
    private animating;
    overlayWillCloseCallback(): boolean;
    close(): void;
    private dispatchClosed;
    protected handleUnderlayTransitionend(): void;
    protected handleTrayTransitionend(): void;
    protected update(changes: PropertyValues<this>): void;
    protected render(): TemplateResult;
    /**
     * Bind the open/close transition into the update complete lifecycle so
     * that the overlay system can wait for it to be "visibly ready" before
     * attempting to throw focus into the content contained herein. Not
     * waiting for this can cause small amounts of page scroll to happen
     * while opening the Tray when focusable content is included: e.g. Menu
     * elements whose selected Menu Item is not the first Menu Item.
     */
    protected getUpdateComplete(): Promise<boolean>;
}
