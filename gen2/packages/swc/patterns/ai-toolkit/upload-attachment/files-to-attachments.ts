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

import { uniqueId } from '../../../utils/id.js';

/**
 * Plain data for one file, ready to render as an `swc-upload-attachment` tile
 * or an `swc-user-message` attachment.
 */
export interface UploadAttachmentData {
  /** Unique id; use it as a render key and to find the item on dismiss. */
  readonly id: string;
  /** The original file, for upload or validation. */
  readonly file: File;
  /** Display name: the file name. */
  readonly name: string;
  /** Human-readable, locale-formatted size, for example "12 kB" or "1.5 MB". */
  readonly sizeLabel: string;

  /**
   * Object URL for an image preview. Set only for image files. Release it
   * with `revokeAttachment()` when the attachment is dismissed, submitted,
   * or no longer rendered.
   */
  readonly thumbnailUrl?: string;

  /**
   * Upper-case file-type label for non-image files, for example "PDF".
   * Undefined for images and when the type can't be determined; supply your
   * own localized fallback (for example, "File") in that case.
   */
  readonly badgeLabel?: string;
}

export interface FilesToAttachmentsOptions {
  /** Locale(s) for the size label. Defaults to the runtime locale. */
  locale?: string | string[];
}

const IMAGE_EXTENSION = /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i;

const MIME_BADGE_LABELS: Record<string, string> = {
  'application/msword': 'DOC',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'PPTX',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'DOCX',
  'text/markdown': 'MD',
  'text/plain': 'TXT',
};

// Object URLs this module created and has not revoked yet. Keyed by URL, not by
// object, so copies of an attachment (for example, spread into new framework
// state) still revoke exactly once.
const liveObjectUrls = new Set<string>();

// Guarantees unique ids within this module; the random part keeps them unique
// across duplicate copies of the module.
let idCounter = 0;

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') || IMAGE_EXTENSION.test(file.name);
}

function getBadgeLabel(file: File): string | undefined {
  // Needs a character before the dot (so dotfiles have no extension) and a
  // leading letter (so numeric suffixes like `.20260415` don't count).
  const extension = file.name.match(/.\.([a-z][a-z0-9]{0,7})$/i)?.[1];
  if (extension) {
    return extension.toUpperCase();
  }

  const mimeType = file.type.split(';', 1)[0].trim().toLowerCase();
  if (MIME_BADGE_LABELS[mimeType]) {
    return MIME_BADGE_LABELS[mimeType];
  }

  // Short, simple subtypes are readable labels as-is: application/pdf → PDF.
  const subtype = mimeType.match(/^[a-z]+\/([a-z0-9]{1,4})$/)?.[1];
  return subtype ? subtype.toUpperCase() : undefined;
}

function formatFileSize(bytes: number, locale?: string | string[]): string {
  if (bytes < 1000) {
    return new Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'byte',
      unitDisplay: 'long',
    }).format(bytes);
  }

  const units = ['kilobyte', 'megabyte', 'gigabyte'] as const;
  let value = bytes / 1000;
  let unitIndex = 0;
  // Compare the rounded value so 999.5 kB shows as 1 MB, not 1,000 kB.
  while (Math.round(value) >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex += 1;
  }

  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: units[unitIndex],
    unitDisplay: 'short',
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);
}

/**
 * Turns files, for example `detail.files` from `swc-prompt-field-drop` or an
 * `<input type="file">` selection, into one plain data object per file.
 *
 * Image files get a `thumbnailUrl` created with `URL.createObjectURL()`.
 * Call `revokeAttachment()` for each attachment when it's dismissed,
 * submitted, or no longer rendered, so the browser can free the file data.
 *
 * @example
 * ```ts
 * field.addEventListener('swc-prompt-field-drop', (event) => {
 *   attachments = [...attachments, ...filesToAttachments(event.detail.files)];
 * });
 * ```
 */
export function filesToAttachments(
  files: Iterable<File> | ArrayLike<File>,
  options: FilesToAttachmentsOptions = {}
): UploadAttachmentData[] {
  // Compute everything that can throw (for example, an invalid locale) before
  // creating object URLs, so a failed call leaves nothing to revoke.
  const prepared = Array.from(files, (file) => {
    const isImage = isImageFile(file);
    return {
      file,
      isImage,
      sizeLabel: formatFileSize(file.size, options.locale),
      badgeLabel: isImage ? undefined : getBadgeLabel(file),
    };
  });

  return prepared.map(({ file, isImage, sizeLabel, badgeLabel }) => {
    let thumbnailUrl: string | undefined;
    if (isImage) {
      thumbnailUrl = URL.createObjectURL(file);
      liveObjectUrls.add(thumbnailUrl);
    }

    idCounter += 1;
    return {
      id: uniqueId(`swc-attachment-${idCounter}`),
      file,
      name: file.name,
      sizeLabel,
      thumbnailUrl,
      badgeLabel,
    };
  });
}

/**
 * Releases the attachment's `thumbnailUrl` object URL. Safe to call more than
 * once, and on attachments without a thumbnail. After this call, the
 * `thumbnailUrl` no longer loads, so remove the attachment from the rendered
 * output too.
 */
export function revokeAttachment(attachment: UploadAttachmentData): void {
  const url = attachment.thumbnailUrl;
  if (url && liveObjectUrls.delete(url)) {
    URL.revokeObjectURL(url);
  }
}

/** Calls `revokeAttachment()` for each attachment. */
export function revokeAttachments(
  attachments: Iterable<UploadAttachmentData>
): void {
  for (const attachment of attachments) {
    revokeAttachment(attachment);
  }
}
