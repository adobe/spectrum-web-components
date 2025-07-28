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
import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js';
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
/**
 * Spectrum Contextual help provides additional information about
 * the state of either an adjacent component or an entire view.
 * @element sp-contextual-help
 *
 * @slot heading - content to display as the heading of the popover
 * @slot Text content to display in the popover
 * @slot link - link to additional informations
 */
export declare class ContextualHelp extends SpectrumElement {
    isMobile: MatchMediaController;
    static get styles(): CSSResultArray;
    /**
     * Provides an accessible name for the action button trigger.
     * @param {String} label
     */
    label?: string;
    /**
     * The `variant` property applies specific styling on the action button trigger.
     * @param {String} variant
     */
    variant: 'info' | 'help';
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    placement?: Placement;
    /**
     * The `offset` property accepts either a single number, to
     * define the offset of the Popover along the main axis from
     * the action button, or 2-tuple, to define the offset along the
     * main axis and the cross axis.
     */
    offset: number | [number, number];
    open: boolean;
    get buttonAriaLabel(): string;
    private renderOverlayContent;
    private handleSlottableRequest;
    protected render(): TemplateResult;
}
