/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Global type definitions for Spectrum Web Components shared package
 */

// Common size type used across components
export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

// Common theme types
export type Theme = 'lightest' | 'light' | 'dark' | 'darkest';
export type Color =
    | 'default'
    | 'accent'
    | 'negative'
    | 'notice'
    | 'positive'
    | 'info'
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'chartreuse'
    | 'celery'
    | 'green'
    | 'seafoam'
    | 'cyan'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'fuchsia'
    | 'magenta';
export type Scale = 'medium' | 'large';

// Event types
export interface SpectrumElementEventMap {
    'sp-opened': CustomEvent<boolean>;
    'sp-closed': CustomEvent<boolean>;
    change: Event;
    input: Event;
}

// Focusable element interface
export interface Focusable {
    focus(options?: FocusOptions): void;
    blur(): void;
    disabled?: boolean;
    autofocus?: boolean;
    tabIndex?: number;
}

type ElementLocalName = string;

type WarningType = 'default' | 'accessibility' | 'api';

type WarningLevel = 'default' | 'low' | 'medium' | 'high' | 'deprecation';

type SWCWarningOptions = {
    type?: WarningType;
    level?: WarningLevel;
    issues?: string[];
};

type BrandedSWCWarningID = `${ElementLocalName}:${WarningType}:${WarningLevel}`;

interface Window {
    __swc: {
        DEBUG: boolean;
        /**
         * Dispatch a Dev Mode warning into the console.
         *
         * @param id {string:string:string} - the id of the warning, a `:` joined string of the component directory, the warning type, and the warning level
         * @param warning {string} - the primary message to delivery to the developer
         * @param url {string} - a URL at which more infromation, or the standard documentation, can be found
         * @param issues {string[]} - an optional array of issues to format into the message
         */
        warn(
            element: HTMLElement | undefined,
            message: string,
            url: string,
            options?: SWCWarningOptions
        ): void;
        issuedWarnings: Set<BrandedSWCWarningID>;
        ignoreWarningTypes: Record<WarningType, boolean>;
        ignoreWarningLevels: Record<WarningLevel, boolean>;
        ignoreWarningLocalNames: Record<ElementLocalName, boolean>;
        verbose?: boolean;
    };
}
