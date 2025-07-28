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
import type { Placement } from '@floating-ui/dom';
import type { Overlay } from './Overlay.js';
import type { OverlayTriggerInteractions } from './overlay-types';
import '@spectrum-web-components/overlay/sp-overlay.js';
export type OverlayContentTypes = 'click' | 'hover' | 'longpress';
type Combinations<T extends string, U extends string = T> = T extends string ? T | `${T} ${Combinations<Exclude<U, T>>}` : never;
export type TriggeredByType = Combinations<OverlayContentTypes>;
/**
 * @element overlay-trigger
 *
 * A component that manages overlay content triggered by different interactions.
 * Supports click, hover, and longpress triggered overlays with configurable
 * placement and behavior.
 *
 * @slot trigger - The content that will trigger the various overlays
 * @slot hover-content - The content that will be displayed on hover
 * @slot click-content - The content that will be displayed on click
 * @slot longpress-content - The content that will be displayed on longpress
 * @slot longpress-describedby-descriptor - Description for longpress content
 *
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 *
 * @attr {string} placement - The placement of the overlay relative to the trigger
 * @attr {number} offset - The distance between the overlay and the trigger
 * @attr {boolean} disabled - Whether the overlay trigger is disabled
 * @attr {string} receives-focus - How focus should be handled ('true'|'false'|'auto')
 * @attr {string} triggered-by - The type of interaction that will trigger the overlay ('click'|'hover'|'longpress')
 */
export declare class OverlayTrigger extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Optional property to optimize performance and prevent race conditions.
     *
     * By explicitly declaring which content types are used (e.g. "click", "longpress hover"),
     * we can avoid:
     * 1. Extra renders from unnecessary slot reparenting
     * 2. Potential infinite render loops during content detection
     * 3. Race conditions during slot assignment
     *
     * By only returning overlay wrappers for explicitly declared content types,
     * we minimize unecessary DOM nodes, operations and ensure a more stable rendering behavior.
     */
    triggeredBy?: TriggeredByType;
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    placement?: Placement;
    type?: OverlayTriggerInteractions;
    offset: number;
    open?: OverlayContentTypes;
    disabled: boolean;
    receivesFocus: 'true' | 'false' | 'auto';
    private clickContent;
    private clickPlacement?;
    private longpressContent;
    private longpressPlacement?;
    private hoverContent;
    private hoverPlacement?;
    private targetContent;
    clickOverlayElement: Overlay;
    longpressOverlayElement: Overlay;
    hoverOverlayElement: Overlay;
    private getAssignedElementsFromSlot;
    private handleTriggerContent;
    private handleSlotContent;
    private handleBeforetoggle;
    protected update(changes: PropertyValues): void;
    protected renderSlot(name: string): TemplateResult;
    protected renderClickOverlay(): TemplateResult;
    protected renderHoverOverlay(): TemplateResult;
    protected renderLongpressOverlay(): TemplateResult;
    protected render(): TemplateResult;
    protected updated(changedProperties: PropertyValues): void;
    protected getUpdateComplete(): Promise<boolean>;
}
export {};
