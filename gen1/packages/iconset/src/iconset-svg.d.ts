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
import { PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Iconset } from './iconset.js';
export declare abstract class IconsetSVG extends Iconset {
    private iconMap;
    private slotContainer?;
    /**
     * First updated handler just ensures we've processed any slotted symbols
     */
    updated(changedProperties: PropertyValues): void;
    /**
     * Applies the requested icon from this iconset instance to the given element.
     *
     * @param el - the element to apply the icon to
     * @param icon - the name of the icon within this set to apply.
     */
    applyIconToElement(el: HTMLElement, icon: string, _size: string, label: string): Promise<void>;
    /**
     * Returns a list of all icons in this iconset.
     */
    getIconList(): string[];
    protected prepareSvgClone(sourceSvg: SVGSymbolElement): SVGSVGElement;
    protected getSVGIconName(icon: string): string;
    protected getSanitizedIconName(icon: string): string;
    protected renderDefaultContent(): TemplateResult;
    protected render(): TemplateResult;
    protected updateSVG(nodes: SVGElement[]): void;
    protected getSVGNodes(slotTarget: HTMLSlotElement): SVGElement[];
    private onSlotChange;
}
