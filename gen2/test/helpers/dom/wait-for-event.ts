/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Awaits a DOM event, rejecting after `timeout` ms so a missing event fails
 * with the event name rather than hanging.
 */
export function waitForEvent<T extends Event>(
  el: EventTarget,
  eventName: string,
  timeout = 1000
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      el.removeEventListener(eventName, handler);
      reject(
        new Error(`Timed out after ${timeout}ms waiting for "${eventName}"`)
      );
    }, timeout);
    const handler = (event: Event): void => {
      clearTimeout(timer);
      resolve(event as T);
    };
    el.addEventListener(eventName, handler, { once: true });
  });
}
