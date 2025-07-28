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
 * @element sp-sidenav-heading
 *
 * @slot - the Sidenav Items to display in association with the heading
 */
export declare class SideNavHeading extends SpectrumElement {
    label: string;
    static get styles(): CSSResultArray;
    protected update(changes: PropertyValues): void;
    protected render(): TemplateResult;
    protected firstUpdated(changed: PropertyValues<this>): void;
}
