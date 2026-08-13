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

import { LitElement } from 'lit';

import { coreVersion, version } from './version.js';

export class SpectrumElement extends LitElement {
  /**
   * @internal
   */
  static VERSION = version;

  /**
   * @internal
   */
  static CORE_VERSION = coreVersion;
}

/**
 * Builds the deduplication key for a dev-mode warning. The `message` is part of
 * the key so two distinct problems that share a `type`/`level` (the common
 * case) do not suppress each other; only a verbatim repeat of the same warning
 * is deduplicated. Exported so the dedup key can be unit tested without relying
 * on the `NODE_ENV`-gated `window.__swc` setup below.
 */
export function warningId(
  localName: string,
  type: WarningType,
  level: WarningLevel,
  message: string
): BrandedSWCWarningID {
  return `${localName}:${type}:${level}:${message}` as BrandedSWCWarningID;
}

/**
 * A group of dev-mode warnings that share a `warningId`, collected within a
 * single microtask so they can be emitted as one console line with a count.
 */
type BatchedWarning = {
  message: string;
  url: string;
  localName: string;
  type: WarningType;
  level: WarningLevel;
  listedIssues: string;
  elements: HTMLElement[];
  count: number;

  /**
   * Elements already counted in this batch, keyed by identity. A repeated
   * `warn()` for an element already here does not bump `count` again.
   */
  countedElements?: Set<HTMLElement>;

  /**
   * Whether the dev-mode warning (the only warning with no element) has been
   * counted, so repeats of it collapse to one.
   */
  countedDevModeWarning?: boolean;
};

/**
 * Builds the `console.warn` arguments for a grouped dev warning: the message
 * and a count line, then the element ref(s) to inspect. By default one
 * representative element is shown; `verbose` shows every collected element
 * (already capped at collection time). Exported so the grouped output can be
 * unit tested without the `NODE_ENV`-gated `window.__swc` setup below.
 *
 * @internal
 */
export function buildGroupedWarningArgs(
  batch: BatchedWarning,
  verbose: boolean
): unknown[] {
  const {
    message,
    url,
    localName,
    type,
    level,
    listedIssues,
    elements,
    count,
  } = batch;
  const intro = level === 'deprecation' ? 'DEPRECATION NOTICE: ' : '';
  const shown = verbose ? elements : elements.slice(0, 1);
  let countLine = '';
  if (count === 1) {
    countLine = shown.length ? '\nAffected element:' : '';
  } else {
    countLine = `\n${count} <${localName}> elements affected:`;
  }
  const args: unknown[] = [intro + message + '\n' + listedIssues + countLine];
  for (const el of shown) {
    args.push(el);
  }
  args.push((shown.length ? '\n\n' : '\n') + url + '\n', {
    data: { localName, type, level, count },
  });
  return args;
}

/**
 * Records one warning occurrence into its batch, counting by element identity:
 * `count` becomes the number of distinct elements with this warning, not the
 * number of `warn()` calls. A host that warns once per child (same message,
 * same element) still counts as one affected element. `count` is uncapped;
 * `maxDisplayed` only limits how many element refs are kept for display.
 *
 * @param batch - Grouped-warning batch to record into.
 * @param element - Element the warning is about, or `undefined` for the
 *   dev-mode warning, which is not about a specific element.
 * @param maxDisplayed - Cap on element refs kept for display; does not affect
 *   `count`.
 * @internal
 */
export function recordAffectedElement(
  batch: BatchedWarning,
  element: HTMLElement | undefined,
  maxDisplayed: number
): void {
  if (!element) {
    // The dev-mode warning is the only warning with no element; count it once
    // however often it fires.
    if (batch.countedDevModeWarning) {
      return;
    }
    batch.countedDevModeWarning = true;
    batch.count += 1;
    return;
  }
  const countedElements = (batch.countedElements ??= new Set<HTMLElement>());
  if (countedElements.has(element)) {
    return; // this element is already counted for the batch
  }
  countedElements.add(element);
  batch.count += 1;
  if (batch.elements.length < maxDisplayed) {
    batch.elements.push(element);
  }
}

// Enabled in every environment except production (the ecosystem convention);
// a production build strips this block via dead-code elimination.
if (process.env.NODE_ENV !== 'production') {
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

  // Grouped warnings: collect same-`warningId` warnings fired within one
  // microtask and emit a single console line with the total count. By default
  // one representative element is shown for inspection; `verbose` lists all
  // collected elements (capped at WARNING_ELEMENT_CAP).
  const WARNING_ELEMENT_CAP = 10;
  const batchedWarnings = new Map<BrandedSWCWarningID, BatchedWarning>();
  let flushScheduled = false;

  const flushWarnings = (): void => {
    flushScheduled = false;
    batchedWarnings.forEach((batch, id) => {
      console.warn(
        ...buildGroupedWarningArgs(batch, Boolean(window.__swc.verbose))
      );
      window.__swc.issuedWarnings.add(id);
    });
    batchedWarnings.clear();
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
      const id = warningId(localName, type, level, message);
      // Ignore filters short-circuit before any batching.
      if (window.__swc.ignoreWarningLocalNames[localName]) {
        return;
      }
      if (window.__swc.ignoreWarningTypes[type]) {
        return;
      }
      if (window.__swc.ignoreWarningLevels[level]) {
        return;
      }
      // Session dedup: each id emits one grouped line per session. `verbose`
      // bypasses it so every microtask flush re-emits.
      if (!window.__swc.verbose && window.__swc.issuedWarnings.has(id)) {
        return;
      }
      // Collect into the per-id batch; `flushWarnings` builds the grouped
      // message on the next microtask.
      let batch = batchedWarnings.get(id);
      if (!batch) {
        let listedIssues = '';
        if (issues && issues.length) {
          issues.unshift('');
          listedIssues = issues.join('\n    - ') + '\n';
        }
        batch = {
          message,
          url,
          localName,
          type,
          level,
          listedIssues,
          elements: [],
          count: 0,
        };
        batchedWarnings.set(id, batch);
      }
      recordAffectedElement(batch, element, WARNING_ELEMENT_CAP);
      if (!flushScheduled) {
        flushScheduled = true;
        queueMicrotask(flushWarnings);
      }
    },
  };

  window.__swc.warn(
    undefined,
    'Spectrum Web Components is in dev mode. Not recommended for production!',
    'https://opensource.adobe.com/spectrum-web-components/dev-mode/',
    { type: 'default' }
  );
}
