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
import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { Menu } from './Menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
/**
 * @element sp-menu-group
 *
 * @slot header - headline of the menu group
 * @slot - menu items to be listed in the group
 */
export declare class MenuGroup extends Menu {
    static get styles(): CSSResultArray;
    private headerId;
    private headerElements;
    private headerElement?;
    /**
     * a menu group must have the role `group`
     * and should never function as a menu
     */
    protected get ownRole(): string;
    /**
     * only a menu controls roving tabindex;
     * groups should defer navigation to parent menu
     */
    protected get controlsRovingTabindex(): boolean;
    protected updateLabel(): void;
    render(): TemplateResult;
}
