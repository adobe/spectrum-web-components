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
declare const validSizes: string[];
export type ThumbnailSize = (typeof validSizes)[number];
/**
 * @element sp-thumbnail
 *
 * @slot image - image element to present in the Thumbnail
 */
export declare class Thumbnail extends SpectrumElement {
    static get styles(): CSSResultArray;
    background?: string;
    cover: boolean;
    layer: boolean;
    get size(): ThumbnailSize;
    set size(value: ThumbnailSize);
    private _size;
    protected update(changes: PropertyValues): void;
    protected render(): TemplateResult;
}
export {};
