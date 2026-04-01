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

import { LitElement, ReactiveElement } from 'lit';

import type { Constructor } from '../types.js';
import { coreVersion, version } from './version.js';

export interface SpectrumInterface {
  shadowRoot: ShadowRoot;
  hasVisibleFocusInTree(): boolean;
}

/**
 * Mixin that adds Spectrum-specific focus-visibility detection to a
 * `ReactiveElement` subclass.
 *
 * @param constructor - The base class to extend with focus-visibility support
 * @returns A class that implements {@link SpectrumInterface}
 */
export function SpectrumMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<SpectrumInterface> {
  class SpectrumMixinElement extends constructor {
    /**
     * @internal
     */
    public override shadowRoot!: ShadowRoot;

    /**
     * Checks whether the currently focused element within this component's
     * root has visible (keyboard-driven) focus, walking through shadow roots
     * and slotted ancestors as needed.
     *
     * @returns `true` when the deepest active element matches `:focus-visible`
     */
    public hasVisibleFocusInTree(): boolean {
      const root = this.getRootNode() as Document;
      let activeElement = root.activeElement as HTMLElement | null;
      while (activeElement?.shadowRoot?.activeElement) {
        activeElement = activeElement.shadowRoot.activeElement as HTMLElement;
      }
      if (!activeElement) {
        return false;
      }
      return activeElement.matches(':focus-visible');
    }
  }
  return SpectrumMixinElement;
}

export class SpectrumElement extends SpectrumMixin(LitElement) {
  static VERSION = version;

  static CORE_VERSION = coreVersion;
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
      messages.push(intro + message + '\n' + listedIssues + inspectElement);
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
