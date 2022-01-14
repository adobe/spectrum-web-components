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

declare module '*.css' {
    const content: CSSResultArray;
    export default content;
}

declare module '@open-wc/polyfills-loader' {
    function loadPolyfills(): Promise<void>;
    export default loadPolyfills;
}

declare module 'element-closest' {
    function polyfill(window: Window): void;
    export default polyfill;
}

// W3C Spec Draft http://wicg.github.io/netinfo/
// Edition: Draft Community Group Report 20 February 2019

// http://wicg.github.io/netinfo/#navigatornetworkinformation-interface
declare interface Navigator extends NavigatorNetworkInformation {}
declare interface WorkerNavigator extends NavigatorNetworkInformation {}

// http://wicg.github.io/netinfo/#navigatornetworkinformation-interface
declare interface NavigatorNetworkInformation {
    readonly connection?: NetworkInformation;
}

// http://wicg.github.io/netinfo/#connection-types
type ConnectionType =
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'mixed'
    | 'none'
    | 'other'
    | 'unknown'
    | 'wifi'
    | 'wimax';

// http://wicg.github.io/netinfo/#effectiveconnectiontype-enum
type EffectiveConnectionType = '2g' | '3g' | '4g' | 'slow-2g';

// http://wicg.github.io/netinfo/#dom-megabit
type Megabit = number;
// http://wicg.github.io/netinfo/#dom-millisecond
type Millisecond = number;

// http://wicg.github.io/netinfo/#networkinformation-interface
interface NetworkInformation extends EventTarget {
    // http://wicg.github.io/netinfo/#type-attribute
    readonly type?: ConnectionType;
    // http://wicg.github.io/netinfo/#effectivetype-attribute
    readonly effectiveType?: EffectiveConnectionType;
    // http://wicg.github.io/netinfo/#downlinkmax-attribute
    readonly downlinkMax?: Megabit;
    // http://wicg.github.io/netinfo/#downlink-attribute
    readonly downlink?: Megabit;
    // http://wicg.github.io/netinfo/#rtt-attribute
    readonly rtt?: Millisecond;
    // http://wicg.github.io/netinfo/#savedata-attribute
    readonly saveData?: boolean;
    // http://wicg.github.io/netinfo/#handling-changes-to-the-underlying-connection
    onchange?: EventListener;
}
