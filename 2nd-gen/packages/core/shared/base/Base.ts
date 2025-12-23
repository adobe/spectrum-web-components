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

import { LitElement, ReactiveElement } from 'lit';

import { version } from './version.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface SpectrumInterface {
    shadowRoot: ShadowRoot;
    isLTR: boolean;
    hasVisibleFocusInTree(): boolean;
}

export function SpectrumMixin<T extends Constructor<ReactiveElement>>(
    constructor: T
): T & Constructor<SpectrumInterface> {
    class SpectrumMixinElement extends constructor {
        /**
         * @private
         */
        public override shadowRoot!: ShadowRoot;

        /**
         * @private
         */
        public get isLTR(): boolean {
            return this.dir === 'ltr';
        }

        public hasVisibleFocusInTree(): boolean {
            const getAncestors = (root: Document = document): HTMLElement[] => {
                // eslint-disable-next-line @spectrum-web-components/document-active-element
                let currentNode = root.activeElement as HTMLElement;
                while (
                    currentNode?.shadowRoot &&
                    currentNode.shadowRoot.activeElement
                ) {
                    currentNode = currentNode.shadowRoot
                        .activeElement as HTMLElement;
                }
                const ancestors: HTMLElement[] = currentNode
                    ? [currentNode]
                    : [];
                while (currentNode) {
                    const ancestor =
                        currentNode.assignedSlot ||
                        currentNode.parentElement ||
                        (currentNode.getRootNode() as ShadowRoot)?.host;
                    if (ancestor) {
                        ancestors.push(ancestor as HTMLElement);
                    }
                    currentNode = ancestor as HTMLElement;
                }
                return ancestors;
            };
            const activeElement = getAncestors(
                this.getRootNode() as Document
            )[0];
            if (!activeElement) {
                return false;
            }
            // Browsers without support for the `:focus-visible`
            // selector will throw on the following test (Safari, older things).
            // Some won't throw, but will be focusing item rather than the menu and
            // will rely on the polyfill to know whether focus is "visible" or not.
            try {
                return (
                    activeElement.matches(':focus-visible') ||
                    activeElement.matches('.focus-visible')
                );
                /* c8 ignore next 3 */
            } catch (error) {
                return activeElement.matches('.focus-visible');
            }
        }
    }
    return SpectrumMixinElement;
}

export class SpectrumElement extends SpectrumMixin(LitElement) {
    static VERSION = version;

    public override get dir(): CSSStyleDeclaration['direction'] {
        return getComputedStyle(this).direction ?? 'ltr';
    }
}

if (process.env.NODE_ENV === 'development') {
    const ignoreWarningTypes = {
        default: false,
        accessibility: false,
        api: false,
    };
    const ignoreWarningLevels = {
        default: false,
        low: false,
        medium: false,
        high: false,
        deprecation: false,
    };
    window.__swc = {
        ...window.__swc,
        DEBUG: true,
        ignoreWarningLocalNames: {
            ...(window.__swc?.ignoreWarningLocalNames || {}),
        },
        ignoreWarningTypes: {
            ...ignoreWarningTypes,
            ...(window.__swc?.ignoreWarningTypes || {}),
        },
        ignoreWarningLevels: {
            ...ignoreWarningLevels,
            ...(window.__swc?.ignoreWarningLevels || {}),
        },
        issuedWarnings: new Set(),
        warn: (
            element,
            message,
            url,
            { type = 'api', level = 'default', issues } = {}
        ): void => {
            const { localName = 'base' } = element || {};
            const id = `${localName}:${type}:${level}` as BrandedSWCWarningID;
            if (!window.__swc.verbose && window.__swc.issuedWarnings.has(id)) {
                return;
            }
            if (window.__swc.ignoreWarningLocalNames[localName]) {
                return;
            }
            if (window.__swc.ignoreWarningTypes[type]) {
                return;
            }
            if (window.__swc.ignoreWarningLevels[level]) {
                return;
            }
            window.__swc.issuedWarnings.add(id);
            let listedIssues = '';
            if (issues && issues.length) {
                issues.unshift('');
                listedIssues = issues.join('\n    - ') + '\n';
            }
            const intro = level === 'deprecation' ? 'DEPRECATION NOTICE: ' : '';
            const inspectElement = element
                ? '\nInspect this issue in the follow element:'
                : '';
            const displayURL = (element ? '\n\n' : '\n') + url + '\n';
            const messages: unknown[] = [];
            messages.push(
                intro + message + '\n' + listedIssues + inspectElement
            );
            if (element) {
                messages.push(element);
            }
            messages.push(displayURL, {
                data: {
                    localName,
                    type,
                    level,
                },
            });
            console.warn(...messages);
        },
    };

    window.__swc.warn(
        undefined,
        'Spectrum Web Components is in dev mode. Not recommended for production!',
        'https://opensource.adobe.com/spectrum-web-components/dev-mode/',
        { type: 'default' }
    );
}
