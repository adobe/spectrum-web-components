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

import type { ReactiveController, ReactiveElement } from 'lit';

// ────────────────────────────────────────────
// Module-scoped reference-counted lock
// ────────────────────────────────────────────
//
// Stacked blocking surfaces (e.g. nested modal dialogs, a modal popover opened
// over another) must coordinate a single page-scroll lock. The document's
// original `overflow` is captured once on the 0 -> 1 transition and restored
// once on the 1 -> 0 transition. Saving per instance would let a later locker
// capture an already-locked value (`hidden`) and then restore it permanently
// when it releases, leaving the page unscrollable.

let lockCount = 0;
let savedOverflow = '';

function acquirePageScrollLock(): void {
  if (lockCount === 0) {
    const html = document.documentElement;
    savedOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
  }
  lockCount += 1;
}

function releasePageScrollLock(): void {
  if (lockCount === 0) {
    return;
  }
  lockCount -= 1;
  if (lockCount === 0) {
    document.documentElement.style.overflow = savedOverflow;
    savedOverflow = '';
  }
}

/**
 * Locks page scroll behind a blocking surface (a modal popover, dialog, or tray)
 * by setting `overflow: hidden` on the document element. A component's shadow
 * stylesheet cannot reach `<html>`, so this is done in JS.
 *
 * The lock is reference-counted at module scope so concurrent locks from stacked
 * surfaces do not clobber one another's saved state. Each host holds at most one
 * count (the per-instance `lock()` / `unlock()` are idempotent), and the
 * controller releases the host's count automatically on disconnect.
 */
export class PageScrollLockController implements ReactiveController {
  private _locked = false;

  constructor(host: ReactiveElement) {
    host.addController(this);
  }

  /** Lock page scroll on behalf of the host. Idempotent per host. */
  public lock(): void {
    if (this._locked) {
      return;
    }
    this._locked = true;
    acquirePageScrollLock();
  }

  /** Release the host's lock if it holds one. Idempotent per host. */
  public unlock(): void {
    if (!this._locked) {
      return;
    }
    this._locked = false;
    releasePageScrollLock();
  }

  public hostDisconnected(): void {
    this.unlock();
  }
}
