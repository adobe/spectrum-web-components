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
import { Focusable } from '@spectrum-web-components/shared';
declare const TopNavItem_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared").LikeAnchorInterface;
};
/**
 * @element sp-top-nav-item
 *
 * @slot - text label of the Top Nav Item
 */
export declare class TopNavItem extends TopNavItem_base {
    static get styles(): CSSResultArray;
    private anchor;
    selected: boolean;
    value: string;
    get focusElement(): HTMLAnchorElement;
    click(): void;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
