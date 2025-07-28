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
import { type ElementPart, type TemplateResult } from '@spectrum-web-components/base';
import type { OverlayOptions, TriggerInteraction } from './overlay-types.js';
import { type SlottableRequestEvent } from './slottable-request-event.js';
import { SlottableRequestDirective } from './slottable-request-directive.js';
export type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement);
    where: InsertPosition;
};
export type OverlayTriggerOptions = {
    open?: boolean;
    triggerInteraction: TriggerInteraction;
    overlayOptions: OverlayOptions;
    insertionOptions?: InsertionOptions;
};
export declare class OverlayTriggerDirective extends SlottableRequestDirective {
    private host?;
    private overlay;
    private strategy;
    protected defaultOptions: OverlayTriggerOptions;
    protected options: OverlayOptions;
    protected insertionOptions?: InsertionOptions;
    render(_template: () => TemplateResult, _options?: Partial<OverlayTriggerOptions>): unknown;
    update(part: ElementPart, [template, options]: Parameters<this['render']>): void;
    handleSlottableRequest(event: SlottableRequestEvent): void;
}
export declare const trigger: (_template: () => TemplateResult, _options?: Partial<OverlayTriggerOptions> | undefined) => import("lit-html/directive.js").DirectiveResult<typeof OverlayTriggerDirective>;
