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
import { SpectrumElement } from '@spectrum-web-components/base';
declare const HelpTextManagedElement_base: typeof SpectrumElement & {
    new (...args: any[]): import("./manage-help-text.js").HelpTextElementInterface;
    prototype: import("./manage-help-text.js").HelpTextElementInterface;
};
/**
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 */
export declare class HelpTextManagedElement extends HelpTextManagedElement_base {
}
export {};
