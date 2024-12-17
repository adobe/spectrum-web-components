/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Test the user agent string against a regular expression.
 *
 * @param re - The regular expression to test against the user agent string.
 * @returns - True if the user agent matches the regular expression, false otherwise.
 */
function testUserAgent(re: RegExp): boolean {
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.userAgent)
        : false;
}

/**
 * Test the platform string against a regular expression.
 *
 * @param re - The regular expression to test against the platform string.
 * @returns - True if the platform matches the regular expression, false otherwise.
 */
function testPlatform(re: RegExp): boolean {
    return typeof window !== 'undefined' && window.navigator != null
        ? re.test(window.navigator.platform)
        : false;
}

/**
 * Check if the platform is Mac.
 *
 * @returns - True if the platform is Mac, false otherwise.
 */
export function isMac(): boolean {
    return testPlatform(/^Mac/);
}

/**
 * Check if the platform is iPhone.
 *
 * @returns - True if the platform is iPhone, false otherwise.
 */
export function isIPhone(): boolean {
    return testPlatform(/^iPhone/);
}

/**
 * Check if the platform is iPad.
 *
 * @returns - True if the platform is iPad, false otherwise.
 */
export function isIPad(): boolean {
    return (
        testPlatform(/^iPad/) ||
        // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
        (isMac() && navigator.maxTouchPoints > 1)
    );
}

/**
 * Check if the platform is iOS.
 *
 * @returns - True if the platform is iOS, false otherwise.
 */
export function isIOS(): boolean {
    return isIPhone() || isIPad();
}

/**
 * Check if the device is an Apple device.
 *
 * @returns - True if the device is an Apple device, false otherwise.
 */
export function isAppleDevice(): boolean {
    return isMac() || isIOS();
}

/**
 * Check if the browser is WebKit.
 *
 * @returns - True if the browser is WebKit, false otherwise.
 */
export function isWebKit(): boolean {
    return testUserAgent(/AppleWebKit/) && !isChrome();
}

/**
 * Check if the browser is Chrome.
 *
 * @returns - True if the browser is Chrome, false otherwise.
 */
export function isChrome(): boolean {
    return testUserAgent(/Chrome/);
}

/**
 * Check if the browser is Firefox.
 *
 * @returns - True if the browser is Firefox, false otherwise.
 */
export function isFirefox(): boolean {
    return testUserAgent(/Firefox/) && !isSeamonkey();
}

/**
 * Check if the browser is Seamonkey.
 *
 * @returns - True if the browser is Seamonkey, false otherwise.
 */
export function isSeamonkey(): boolean {
    return testUserAgent(/Seamonkey/);
}

/**
 * Check if the platform is Android.
 *
 * @returns - True if the platform is Android, false otherwise.
 */
export function isAndroid(): boolean {
    return testUserAgent(/Android/);
}
