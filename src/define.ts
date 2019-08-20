/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

export type IElementConstructor = new () => HTMLElement;
export type IRegisterableElement = IElementConstructor & { is: string };

/**
 * A helper function for registering custom elements and first checking conditionally if they are already registered.
 *
 * @param classCtor A HTMLElement constructor that has a static 'is' property defining the desired tag name.
 */
export function defineCustomElement(classCtor: IRegisterableElement): void {
    if (!customElements.get(classCtor.is)) {
        customElements.define(classCtor.is, classCtor);
    }
}

/**
 * Registers all given class constructors with the custom elements registry, avoiding duplicate registration errors.
 *
 * @param classCtors - Any number of arguments each defining a custom element with an 'is' static property.
 */
export function defineCustomElements(
    ...classCtors: IRegisterableElement[]
): void {
    for (const ctor of classCtors) {
        defineCustomElement(ctor);
    }
}
