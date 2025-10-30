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

import type { ReactiveElement } from 'lit';

import { LitElement } from 'lit';

import { version } from './version';

type ElementLocalName = string;
type WarningType = 'default' | 'accessibility' | 'api';
type WarningLevel = 'default' | 'low' | 'medium' | 'high' | 'deprecation';
type BrandedSWCWarningID = `${ElementLocalName}:${WarningType}:${WarningLevel}`;

type ThemeRoot = HTMLElement & {
    startManagingContentDirection: (el: HTMLElement) => void;
    stopManagingContentDirection: (el: HTMLElement) => void;
};

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface SpectrumInterface {
    shadowRoot: ShadowRoot;
    isLTR: boolean;
    hasVisibleFocusInTree(): boolean;
    dir: 'ltr' | 'rtl';
}

const observedForElements: Set<HTMLElement> = new Set();

const updateRTL = (): void => {
    const dir =
        document.documentElement.dir === 'rtl'
            ? document.documentElement.dir
            : 'ltr';
    observedForElements.forEach((el) => {
        el.setAttribute('dir', dir);
    });
};

const rtlObserver = new MutationObserver(updateRTL);

rtlObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir'],
});

type ContentDirectionManager = HTMLElement & {
    startManagingContentDirection?(): void;
};

const canManageContentDirection = (el: ContentDirectionManager): boolean =>
    typeof el.startManagingContentDirection !== 'undefined' ||
    el.tagName === 'SP-THEME';

function findDirectionParent(element: HTMLElement): HTMLElement {
    let dirParent = ((element as HTMLElement).assignedSlot ??
        element.parentNode) as HTMLElement;
    while (
        dirParent !== document.documentElement &&
        !canManageContentDirection(dirParent as ContentDirectionManager)
    ) {
        dirParent = ((dirParent as HTMLElement).assignedSlot ?? // step into the shadow DOM of the parent of a slotted node
            dirParent.parentNode ?? // DOM Element detected
            (dirParent as unknown as ShadowRoot).host) as HTMLElement;
    }
    return dirParent;
}

function setupDirectionManagement(
    element: HTMLElement,
    dirParent: HTMLElement
): void {
    if (dirParent === document.documentElement) {
        observedForElements.add(element);
    } else {
        const { localName } = dirParent;
        if (localName.search('-') > -1 && !customElements.get(localName)) {
            /* c8 ignore next 5 */
            void customElements.whenDefined(localName).then(() => {
                (dirParent as ThemeRoot).startManagingContentDirection(element);
            });
        } else {
            (dirParent as ThemeRoot).startManagingContentDirection(element);
        }
    }
}

function getAncestors(root: Document = document): HTMLElement[] {
    // eslint-disable-next-line @spectrum-web-components/document-active-element
    let currentNode = root.activeElement as HTMLElement;
    while (currentNode?.shadowRoot?.activeElement) {
        currentNode = currentNode.shadowRoot.activeElement as HTMLElement;
    }
    const ancestors: HTMLElement[] = currentNode ? [currentNode] : [];
    while (currentNode) {
        const ancestor =
            currentNode.assignedSlot ??
            currentNode.parentElement ??
            (currentNode.getRootNode() as ShadowRoot)?.host;
        if (ancestor) {
            ancestors.push(ancestor as HTMLElement);
        }
        currentNode = ancestor as HTMLElement;
    }
    return ancestors;
}

function cleanupDirectionManagement(
    element: HTMLElement,
    dirParent: HTMLElement
): void {
    if (dirParent === document.documentElement) {
        observedForElements.delete(element);
    } else {
        (dirParent as ThemeRoot).stopManagingContentDirection(element);
    }
    element.removeAttribute('dir');
}

export function SpectrumMixin<T extends Constructor<ReactiveElement>>(
    constructor: T
): T & Constructor<SpectrumInterface> {
    class SpectrumMixinElement extends constructor {
        /**
         * @private
         */
        public override shadowRoot!: ShadowRoot;
        private _dirParent?: HTMLElement;

        /**
         * @private
         */
        public override dir!: 'ltr' | 'rtl';

        /**
         * @private
         */
        public get isLTR(): boolean {
            return this.dir === 'ltr';
        }

        public hasVisibleFocusInTree(): boolean {
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

        public override connectedCallback(): void {
            if (!this.hasAttribute('dir')) {
                const dirParent = findDirectionParent(this as HTMLElement);
                this.dir =
                    dirParent.dir === 'rtl' ? dirParent.dir : this.dir || 'ltr';
                setupDirectionManagement(this as HTMLElement, dirParent);
                this._dirParent = dirParent;
            }
            super.connectedCallback();
        }

        public override disconnectedCallback(): void {
            super.disconnectedCallback();
            if (this._dirParent) {
                cleanupDirectionManagement(
                    this as HTMLElement,
                    this._dirParent
                );
            }
        }
    }
    return SpectrumMixinElement;
}

export class SpectrumElement extends SpectrumMixin(LitElement) {
    static VERSION = version;
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

    const shouldSuppressWarning = (
        localName: ElementLocalName,
        type: WarningType,
        level: WarningLevel,
        id: BrandedSWCWarningID
    ): boolean => {
        if (!window.__swc.verbose && window.__swc.issuedWarnings.has(id)) {
            return true;
        }
        if (window.__swc.ignoreWarningLocalNames[localName]) {
            return true;
        }
        if (window.__swc.ignoreWarningTypes[type]) {
            return true;
        }
        if (window.__swc.ignoreWarningLevels[level]) {
            return true;
        }
        return false;
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
            const { localName = 'base' } = element ?? {};
            const id = `${localName}:${type}:${level}` as BrandedSWCWarningID;
            if (shouldSuppressWarning(localName, type, level, id)) {
                return;
            }
            window.__swc.issuedWarnings.add(id);
            let listedIssues = '';
            if (issues?.length) {
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
