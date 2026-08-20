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

// ─────────────────────────
//     TYPES
// ─────────────────────────

/**
 * Snapshot of the fields read from a native `DragEvent` before it's recycled
 * by the browser, safe to read after the debounce in {@link DragAndDropControllerOptions.onDragLeave}.
 */
export interface DragLeaveSnapshot {
  clientX: number;
  clientY: number;
  relatedTarget: EventTarget | null;
}

/** Configuration options for {@link DragAndDropController}. */
export interface DragAndDropControllerOptions {
  /**
   * The host's own current "is a drag over me" flag. The controller never
   * keeps a copy of this state; it re-reads it on every native event so a
   * host that also exposes this flag as a public, externally-settable
   * property (as `swc-dropzone` does) can never drift out of sync with it.
   */
  isDragged: () => boolean;

  /**
   * Return `false` to reject the current drag payload; sets the OS cursor to
   * "not-allowed". Called on every native `dragover` tick. Defaults to
   * always-accept.
   */
  shouldAccept?: (event: DragEvent) => boolean;

  /** Called once when an accepted drag enters — not on every `dragover` tick. Set `isDragged`'s backing flag to `true` here. */
  onDragEnter?: (event: DragEvent) => void;

  /** Called once the drag actually leaves, after a short debounce so passing over a child element doesn't flicker. Set `isDragged`'s backing flag to `false` here. */
  onDragLeave?: (snapshot: DragLeaveSnapshot) => void;

  /** Called on drop, only when `isDragged()` is currently `true`. */
  onDrop?: (event: DragEvent) => void;

  /** OS cursor feedback while an accepted drag hovers. Defaults to `'copy'`. */
  dropEffect?: () => DataTransfer['dropEffect'];
}

// Long enough that passing over a child element's own dragleave/dragover pair
// doesn't flicker the state; short enough that leaving the host still reads
// as immediate.
const DRAG_LEAVE_DEBOUNCE_MS = 100;

// ─────────────────────────
//     CONTROLLER
// ─────────────────────────

/**
 * A Lit {@link ReactiveController} that manages native drag-and-drop event
 * wiring (`dragover` / `dragleave` / `drop`) for a host element: debounces
 * `dragleave` so passing over a child element doesn't flicker the state,
 * de-duplicates entry so `onDragEnter` fires once per hover session rather
 * than on every `dragover` tick, and lets the host veto payloads it doesn't
 * want via `shouldAccept`.
 *
 * The host owns its own "dragged" state (via `isDragged`/`onDragEnter`/
 * `onDragLeave`); this controller only drives the timing.
 *
 * @example
 * ```ts
 * const dragAndDrop = new DragAndDropController(this, {
 *   isDragged: () => this._dragged,
 *   onDragEnter: () => { this._dragged = true; },
 *   onDragLeave: () => { this._dragged = false; },
 *   onDrop: (event) => this._handleFilesDropped(event.dataTransfer?.files),
 * });
 * ```
 */
export class DragAndDropController implements ReactiveController {
  private readonly _host: ReactiveElement;
  private readonly _options: DragAndDropControllerOptions;
  private _dragLeaveTimer: ReturnType<typeof setTimeout> | null = null;
  private _abortController: AbortController | null = null;

  constructor(host: ReactiveElement, options: DragAndDropControllerOptions) {
    this._host = host;
    this._options = options;
    host.addController(this);
  }

  public hostConnected(): void {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    this._host.addEventListener('dragover', this._onDragOver as EventListener, {
      signal,
    });
    this._host.addEventListener(
      'dragleave',
      this._onDragLeave as EventListener,
      { signal }
    );
    this._host.addEventListener('drop', this._onDrop as EventListener, {
      signal,
    });
  }

  public hostDisconnected(): void {
    this._abortController?.abort();
    this._abortController = null;
    this._clearDragLeaveTimer();
  }

  private readonly _onDragOver = (event: DragEvent): void => {
    event.preventDefault();
    if (!event.dataTransfer) {
      return;
    }

    if (this._options.shouldAccept?.(event) === false) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }

    this._clearDragLeaveTimer();
    event.dataTransfer.dropEffect = this._options.dropEffect?.() ?? 'copy';

    if (!this._options.isDragged()) {
      this._options.onDragEnter?.(event);
    }
  };

  private readonly _onDragLeave = (event: DragEvent): void => {
    if (
      event.relatedTarget &&
      this._host.contains(event.relatedTarget as Node)
    ) {
      return;
    }

    this._clearDragLeaveTimer();
    // Capture synchronously; browsers recycle DragEvent objects after the
    // synchronous handler returns, so reading them inside setTimeout is unsafe.
    const { clientX, clientY, relatedTarget } = event;
    this._dragLeaveTimer = setTimeout(() => {
      this._dragLeaveTimer = null;
      this._options.onDragLeave?.({ clientX, clientY, relatedTarget });
    }, DRAG_LEAVE_DEBOUNCE_MS);
  };

  private readonly _onDrop = (event: DragEvent): void => {
    event.preventDefault();
    if (!this._options.isDragged()) {
      return;
    }

    this._clearDragLeaveTimer();
    this._options.onDrop?.(event);
  };

  private _clearDragLeaveTimer(): void {
    if (this._dragLeaveTimer !== null) {
      clearTimeout(this._dragLeaveTimer);
      this._dragLeaveTimer = null;
    }
  }
}
