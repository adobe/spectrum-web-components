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
/**
 * @element sp-split-view
 *
 * @slot Two sibling elements to be sized by the element attritubes
 * @fires change - Announces the new position of the splitter
 */
export declare class SplitView extends SpectrumElement {
    static get styles(): CSSResultArray;
    controlledEl?: HTMLElement;
    vertical: boolean;
    resizable: boolean;
    collapsible: boolean;
    /** The minimum size of the primary pane */
    primaryMin: number;
    /** The maximum size of the primary pane */
    primaryMax: number;
    /**
     * The start size of the primary pane, can be a real pixel number|string, percentage or "auto"
     * For example: "100", "120px", "75%" or "auto" are valid values
     * @type {number | number + "px" | number + "%" | "auto"}
     * @attr
     */
    primarySize?: string;
    /** The minimum size of the secondary pane */
    secondaryMin: number;
    /** The maximum size of the secondary pane */
    secondaryMax: number;
    /** The current splitter position of split-view */
    splitterPos?: number;
    /** The current size of first pane of split-view */
    private firstPaneSize;
    label?: string;
    private enoughChildren;
    private viewSize;
    private paneSlot;
    private splitter;
    private offset;
    private minPos;
    private maxPos;
    private observer?;
    private rect?;
    private _splitterSize?;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @private
     **/
    get splitterSize(): number;
    protected render(): TemplateResult;
    private controlledElIDApplied;
    private onContentSlotChange;
    private onPointerdown;
    private onPointermove;
    private onPointerup;
    private getOffset;
    private getPosition;
    private movePosition;
    private onKeydown;
    private checkResize;
    private updateMinMax;
    private updatePosition;
    private getLimitedPosition;
    private calcStartPos;
    private dispatchChangeEvent;
    protected willUpdate(changed: PropertyValues): void;
}
