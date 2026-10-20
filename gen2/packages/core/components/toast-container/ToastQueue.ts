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
import type {
  ToastQueueEntry,
  ToastQueueOptions,
} from './ToastContainer.types.js';

class ToastQueueState {
  private _entries: ToastQueueEntry[] = [];
  private _nextKey = 0;
  private readonly _subscribers = new Set<() => void>();
  private readonly _rendered = new Map<string, () => boolean>();
  private readonly _closing = new Set<string>();
  private readonly _clearing = new Set<string>();

  public get entries(): readonly ToastQueueEntry[] {
    return this._entries;
  }

  /**
   * Adds a notification at the front of the queue.
   *
   * @returns A key to pass to `close()`.
   */
  public add(message: string, options: ToastQueueOptions = {}): string {
    const key = `toast-${++this._nextKey}`;
    this._entries = [{ ...options, key, message }, ...this._entries];
    this.notify();
    return key;
  }

  /** Requests closure; a rendered toast is removed after its close transition. */
  public close(key: string): void {
    const requestClose = this._rendered.get(key);
    if (requestClose) {
      if (requestClose()) {
        this._closing.add(key);
      }
      return;
    }
    this.remove(key);
  }

  /** @internal Completes removal after a rendered toast's close transition. */
  public remove(key: string): void {
    const entry = this._entries.find((entry) => entry.key === key);
    if (!entry) {
      return;
    }
    const notifyClose = !this._clearing.delete(key);
    this._closing.delete(key);
    this._entries = this._entries.filter((entry) => entry.key !== key);
    this.notify();
    if (notifyClose) {
      entry.onClose?.();
    }
  }

  /** Removes every notification without calling any `onClose` callback. */
  public clear(): void {
    this._entries = this._entries.filter((entry) =>
      this._rendered.has(entry.key)
    );
    for (const entry of this._entries) {
      this._clearing.add(entry.key);
    }
    this.notify();
    for (const entry of this._entries) {
      if (this._rendered.get(entry.key)?.()) {
        this._closing.add(entry.key);
      } else {
        this._clearing.delete(entry.key);
      }
    }
  }

  /** @internal Connects the rendered entry to its cancelable close lifecycle. */
  public setRendered(key: string, requestClose: () => boolean): () => void {
    this._rendered.set(key, requestClose);
    return () => {
      if (this._rendered.get(key) === requestClose) {
        this._rendered.delete(key);
        if (this._closing.has(key)) {
          this.remove(key);
        }
      }
    };
  }

  /** Calls `callback` after every queue change; returns an unsubscribe function. */
  public subscribe(callback: () => void): () => void {
    this._subscribers.add(callback);
    return () => this._subscribers.delete(callback);
  }

  private notify(): void {
    for (const callback of this._subscribers) {
      callback();
    }
  }
}

export const ToastQueue = new ToastQueueState();
