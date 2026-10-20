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
import type { ToastVariant } from '../toast/Toast.types.js';

export const TOAST_CONTAINER_PLACEMENTS = [
  'top',
  'top-end',
  'bottom',
  'bottom-end',
] as const;

export type ToastContainerPlacement =
  (typeof TOAST_CONTAINER_PLACEMENTS)[number];

export interface ToastQueueOptions {
  variant?: ToastVariant;
  iconLabel?: string;
  timeout?: number | null;
  actionLabel?: string;
  onAction?: () => void;
  shouldCloseOnAction?: boolean;
  onClose?: () => void;
}

export interface ToastQueueEntry extends ToastQueueOptions {
  readonly key: string;
  readonly message: string;
}
