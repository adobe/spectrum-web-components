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
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
export interface BreadcrumbSelectDetail {
    value: string;
}
declare const BreadcrumbItem_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
};
export declare class BreadcrumbItem extends BreadcrumbItem_base {
    static get styles(): CSSResultArray;
    value: string | undefined;
    /**
     * @private
     * Marks this breadcrumb item as the current route.
     */
    isLastOfType: boolean;
    get focusElement(): HTMLElement;
    connectedCallback(): void;
    private announceSelected;
    protected handleClick(event?: Event): void;
    protected handleKeyDown(event: KeyboardEvent): void;
    protected renderLink(): TemplateResult;
    private renderSeparator;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
