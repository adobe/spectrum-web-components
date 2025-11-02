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

function testUserAgent(re: RegExp): boolean {
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.userAgent)
        : false;
}

function testPlatform(re: RegExp): boolean {
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.platform)
        : false;
}

/* c8 ignore next 3 */
export function isMac(): boolean {
    return testPlatform(/^Mac/);
}

export function isIPhone(): boolean {
    return testPlatform(/^iPhone/);
}

export function isIPad(): boolean {
    return (
        testPlatform(/^iPad/) ||
        // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
        (isMac() && navigator.maxTouchPoints > 1)
    );
}

export function isIOS(): boolean {
    return isIPhone() || isIPad();
}

/* c8 ignore next 3 */
export function isAppleDevice(): boolean {
    return isMac() || isIOS();
}

/* c8 ignore next 3 */
export function isWebKit(): boolean {
    return testUserAgent(/AppleWebKit/) && !isChrome();
}

/* c8 ignore next 3 */
export function isChrome(): boolean {
    return testUserAgent(/Chrome/);
}

export function isFirefox(): boolean {
    return testUserAgent(/Firefox/) && !isSeamonkey();
}

export function isSeamonkey(): boolean {
    return testUserAgent(/Seamonkey/);
}

export function isAndroid(): boolean {
    return testUserAgent(/Android/);
}
