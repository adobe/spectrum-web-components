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
import '@spectrum-web-components/asset/sp-asset.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/divider/sp-divider.js';
declare const Card_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
};
/**
 * @element sp-card
 *
 * @fires change - Announces a change in the `selected` property of a card
 * @slot preview - This is the preview image for Gallery Cards
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot heading - HTML content to be listed as the heading
 * @slot subheading - HTML content to be listed as the subheading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represened object
 * @slot footer - Footer text
 */
export declare class Card extends Card_base {
    static get styles(): CSSResultArray;
    asset?: 'file' | 'folder';
    variant: 'standard' | 'gallery' | 'quiet';
    get selected(): boolean;
    set selected(selected: boolean);
    private _selected;
    heading: string;
    horizontal: boolean;
    private likeAnchor?;
    focused: boolean;
    /**
     * Indicates whether the card can be toggled between selected and unselected states.
     */
    toggles: boolean;
    value: string;
    subheading: string;
    protected get hasCoverPhoto(): boolean;
    protected get hasPreview(): boolean;
    click(): void;
    private handleFocusin;
    private handleFocusout;
    private handleKeydown;
    private handleSelectedChange;
    toggleSelected(): void;
    private announceChange;
    private stopPropagationOnHref;
    /**
     * Handles pointer down events on the card element.
     * Implements a click detection system that distinguishes between clicks and drags
     * based on duration and movement distance.
     */
    private handlePointerdown;
    protected get renderHeading(): TemplateResult;
    protected get renderPreviewImage(): TemplateResult;
    protected get renderCoverImage(): TemplateResult;
    protected get images(): TemplateResult[];
    private renderImage;
    private get renderSubtitleAndDescription();
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected update(changes: PropertyValues): void;
}
export {};
