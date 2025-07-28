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
declare const StatusLight_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-status-light
 *
 * @slot - text label of the Status Light
 */
export declare class StatusLight extends StatusLight_base {
    static get styles(): CSSResultArray;
    /**
     * A status light in a disabled state shows that a status exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a status may become available later.
     */
    disabled: boolean;
    /**
     * The visual variant to apply to this status light.
     */
    variant: 'negative' | 'notice' | 'positive' | 'info' | 'neutral' | 'yellow' | 'fuchsia' | 'indigo' | 'seafoam' | 'chartreuse' | 'magenta' | 'celery' | 'purple';
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
