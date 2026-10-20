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
import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class ToastCountdown implements ReactiveController {
  private _timer?: ReturnType<typeof setTimeout>;
  private _remaining = 0;
  private _startedAt = 0;
  private _onTimeout?: () => void;
  private readonly _paused = new Set<'pointer' | 'focus'>();

  constructor(host: ReactiveControllerHost) {
    host.addController(this);
  }

  public start(timeout: number | null, onTimeout: () => void): void {
    this.stop();
    if (timeout === null || timeout <= 0) {
      return;
    }
    this._remaining = timeout;
    this._onTimeout = onTimeout;
    this.resume();
  }

  public stop(): void {
    clearTimeout(this._timer);
    this._timer = undefined;
    this._onTimeout = undefined;
    this._remaining = 0;
  }

  public setPaused(source: 'pointer' | 'focus', paused: boolean): void {
    if (paused) {
      this._paused.add(source);
      if (this._timer !== undefined) {
        clearTimeout(this._timer);
        this._timer = undefined;
        this._remaining = Math.max(
          0,
          this._remaining - (Date.now() - this._startedAt)
        );
      }
    } else {
      this._paused.delete(source);
      this.resume();
    }
  }

  public hostDisconnected(): void {
    this.stop();
    this._paused.clear();
  }

  private resume(): void {
    if (
      !this._onTimeout ||
      this._paused.size > 0 ||
      this._timer !== undefined
    ) {
      return;
    }
    this._startedAt = Date.now();
    this._timer = setTimeout(() => {
      const onTimeout = this._onTimeout;
      this.stop();
      onTimeout?.();
    }, this._remaining);
  }
}
