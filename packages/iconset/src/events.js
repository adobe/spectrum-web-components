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
/**
 * Creates a strictly typed CustomEvent<T> using the DocumentEventMap.
 *
 * To make use of this helper ensure that your events are added to the DocumentEventMap. The
 * easiest way to do this is to include them in the GlobalEventMap
 *
 * @param name The name of the CustomEvent to create
 * @param payload The arguments for the CustomEvent constructor
 */
export function strictCustomEvent(name, payload) {
    return new CustomEvent(name, payload);
}
//# sourceMappingURL=events.js.map
