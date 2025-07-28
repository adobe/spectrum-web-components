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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { PickerBase } from '@spectrum-web-components/picker';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';
declare const ActionMenu_base: typeof PickerBase & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
};
/**
 * @element sp-action-menu
 *
 * @slot - menu items to be listed in the Action Menu
 * @slot icon - The icon to use for the Action Menu
 * @slot label - The label to use for the Action Menu
 * @slot label-only - The label to use for the Action Menu (no icon space reserved)
 * @slot tooltip - Tooltip to be applied to the Action Button
 * @attr selects - By default `sp-action-menu` does not manage a selection. If
 *   you'd like for a selection to be held by the `sp-menu` that it presents in
 *   its overlay, use `selects="single" to activate this functionality.
 */
export declare class ActionMenu extends ActionMenu_base {
    static get styles(): CSSResultArray;
    selects: undefined | 'single';
    staticColor?: 'white' | 'black';
    protected listRole: 'listbox' | 'menu';
    protected itemRole: string;
    private get hasLabel();
    private get labelOnly();
    handleSlottableRequest: (event: SlottableRequestEvent) => void;
    protected get buttonContent(): TemplateResult[];
    protected render(): TemplateResult;
    protected update(changedProperties: PropertyValues<this>): void;
    protected hasAccessibleLabel(): boolean;
    protected warnNoLabel(): void;
}
export {};
