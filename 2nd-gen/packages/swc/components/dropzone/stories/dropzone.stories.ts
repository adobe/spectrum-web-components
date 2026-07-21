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

import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { action } from 'storybook/actions';

import type { Dropzone } from '@adobe/spectrum-wc/dropzone';
import {
  DROPZONE_VALID_SIZES,
  type DropzoneSize,
} from '@adobe/spectrum-wc-core/components/dropzone';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/dropzone/swc-dropzone.js';
import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-dropzone');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: DROPZONE_VALID_SIZES,
};

// Playground renders real illustrated-message/browse/file-input markup so drag-and-drop and
// browse-to-upload actually swap the zone into its filled state; the generic slot controls
// have no effect on that markup, so hide them rather than leave dead controls in the sidebar.
argTypes['default-slot'] = {
  ...argTypes['default-slot'],
  table: { disable: true },
  control: false,
};
argTypes['filled-content-slot'] = {
  ...argTypes['filled-content-slot'],
  table: { disable: true },
  control: false,
};

/**
 * A drop zone is a target area that accepts dragged-and-dropped content, typically files,
 * from the operating system or from within the same page. It pairs a visual drop area with
 * a required browse button or link that opens the OS file picker for keyboard users.
 */
const meta: Meta = {
  title: 'Drop Zone',
  component: 'swc-dropzone',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `Target area for drag-and-drop file uploads with a required browse control.`,
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-q5adfsfk?file=package.json',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
} as const satisfies Record<DropzoneSize, string>;

const DROPZONE_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 96 96">
    <path d="M12 68.74a2 2 0 0 1 2 2v3.5a1.5 1.5 0 0 0 1.5 1.5H19a2 2 0 1 1 0 4h-3.5a5.5 5.5 0 0 1-5.5-5.5v-3.5a2 2 0 0 1 2-2m22.5 7a2 2 0 1 1 0 4H27a2 2 0 1 1 0-4zm17 0a2 2 0 1 1 0 4H44a2 2 0 1 1 0-4zm17 0a2 2 0 1 1 0 4H61a2 2 0 1 1 0-4zm15.5-7a2 2 0 0 1 2 2v3.5a5.5 5.5 0 0 1-5.5 5.5H77a2 2 0 1 1 0-4h3.5a1.5 1.5 0 0 0 1.5-1.5v-3.5a2 2 0 0 1 2-2m-36.441-53c1.973 0 3.868.78 5.267 2.17l14.987 14.9A7.4 7.4 0 0 1 70 38.063v21.254c0 4.11-3.348 7.423-7.454 7.423H33.454c-4.106 0-7.454-3.313-7.454-7.423V23.163c0-4.11 3.348-7.423 7.454-7.423zM84 55.24a2 2 0 0 1 2 2v7.5a2 2 0 1 1-4 0v-7.5a2 2 0 0 1 2-2m-72-.5a2 2 0 0 1 2 2v7.5a2 2 0 1 1-4 0v-7.5a2 2 0 0 1 2-2m21.454-35c-1.918 0-3.454 1.544-3.454 3.423v36.154c0 1.88 1.536 3.423 3.454 3.423h29.092c1.918 0 3.454-1.544 3.454-3.423V38.063c0-.904-.361-1.773-1.008-2.416l-14.986-14.9a3.47 3.47 0 0 0-2.447-1.007zm13.594 12a2 2 0 0 1 1.996 2.004l-.035 15.781 5.214-4.324a2 2 0 0 1 2.554 3.078l-8.438 7a2 2 0 0 1-1.31.459l-.033.002a2 2 0 0 1-1.54-.729l-8.222-6.722a2 2 0 0 1 2.532-3.098l5.243 4.286.035-15.74a2 2 0 0 1 2.004-1.997M19 40.74a2 2 0 1 1 0 4h-3.5a1.5 1.5 0 0 0-1.5 1.5v3.5a2 2 0 1 1-4 0v-3.5a5.5 5.5 0 0 1 5.5-5.5zm61.5 0a5.5 5.5 0 0 1 5.5 5.5v3.5a2 2 0 1 1-4 0v-3.5a1.5 1.5 0 0 0-1.5-1.5H77a2 2 0 1 1 0-4z"/>
  </svg>
`;

const DEFAULT_DROPZONE_DESCRIPTION = 'Or, select a file from your computer';

const makeDropzoneSlot = (
  headingText: string,
  descriptionText: string = DEFAULT_DROPZONE_DESCRIPTION
) => html`
  <swc-illustrated-message>
    ${unsafeHTML(DROPZONE_SVG)}
    <h2 slot="heading">${headingText}</h2>
    <span slot="description">${descriptionText}</span>
    <swc-button slot="actions" variant="accent">Browse files</swc-button>
  </swc-illustrated-message>
`;

// Shared wiring for the browse-button + drop event pattern recommended by the
// accessibility analysis: both paths call the same handler so `filled` and the
// status region update identically regardless of how the file was provided.
// Each getter resolves the element captured by that story's own `ref()`, so
// the lookup always targets the specific dropzone that fired the event rather
// than the first match in a shared container.
//
// Moving focus to the replace control here, not inside `swc-dropzone` itself:
// `filled-content` is consumer-authored, so only the consumer reliably knows
// which of its own elements is the right one to focus. `filled-content` isn't
// assigned into the shadow DOM until the `filled` update completes, so the
// `focus()` call waits on `updateComplete` first.
const bindFilledStateHandlers = (
  getDropzone: () => Dropzone | null,
  getFilledContent: () => HTMLElement | null,
  getFileInput: () => HTMLInputElement | null,
  getReplaceButton: () => HTMLElement | null
): {
  handleDrop: (event: Event) => void;
  handleChange: () => void;
  browseFiles: () => void;
} => {
  const acceptFile = (name: string): void => {
    const filledContent = getFilledContent();
    if (filledContent) {
      filledContent.textContent = `${name} uploaded`;
    }
    const dropzone = getDropzone();
    dropzone?.setAttribute('filled', '');
    dropzone?.updateComplete.then(() => {
      getReplaceButton()?.focus();
    });
  };

  return {
    handleDrop: (event: Event): void => {
      const detail = (event as CustomEvent<DragEvent>).detail;
      acceptFile(detail.dataTransfer?.files?.[0]?.name ?? 'File');
    },
    handleChange: (): void => {
      acceptFile(getFileInput()?.files?.[0]?.name ?? 'File');
    },
    browseFiles: (): void => {
      getFileInput()?.click();
    },
  };
};

// Shared by Playground, BrowseAndDrop, and Accessibility: all three demonstrate the same
// browse-button + drop wiring so dragging a real file over the zone (or using the browse
// button) actually swaps it into the filled state, rather than only responding to the
// `filled` control. Playground drives `size`/`aria-label`/`dragged`/`filled` from Storybook
// args; the other two callers pass a fixed accessible name and accept the defaults.
const renderFilledStateExample = (
  ariaLabel: string,
  options: { size?: DropzoneSize; dragged?: boolean; filled?: boolean } = {}
) => {
  const { size = 'm', dragged = false, filled = false } = options;
  let dropzone: Dropzone | null = null;
  let fileInput: HTMLInputElement | null = null;
  let filledContent: HTMLElement | null = null;
  let replaceButton: HTMLElement | null = null;
  const { handleDrop, handleChange, browseFiles } = bindFilledStateHandlers(
    () => dropzone,
    () => filledContent,
    () => fileInput,
    () => replaceButton
  );
  // `template(args)` (the wc-toolkit helper) wires every CEM-declared event to
  // the Actions panel automatically, but these stories use a custom render for
  // real drag-and-drop and browse behavior, which bypasses that wiring
  // entirely. Reproduce it by hand for each event so the Actions panel still
  // reflects what's happening; `swc-dropzone-drop` combines the action log
  // with this story's own accept-file handler.
  const logAction = (name: string) => (event: Event) => action(name)(event);
  const handleDropAndLog = (event: Event): void => {
    handleDrop(event);
    action('swc-dropzone-drop')(event);
  };
  return html`
    <swc-dropzone
      ${ref((element?: Element) => (dropzone = (element as Dropzone) ?? null))}
      size=${size}
      aria-label=${ariaLabel}
      ?dragged=${dragged}
      ?filled=${filled}
      style="min-inline-size: 260px;"
      @swc-dropzone-should-accept=${logAction('swc-dropzone-should-accept')}
      @swc-dropzone-dragover=${logAction('swc-dropzone-dragover')}
      @swc-dropzone-dragleave=${logAction('swc-dropzone-dragleave')}
      @swc-dropzone-drop=${handleDropAndLog}
    >
      <swc-illustrated-message>
        ${unsafeHTML(DROPZONE_SVG)}
        <h2 slot="heading">Drag and drop your file</h2>
        <span slot="description">${DEFAULT_DROPZONE_DESCRIPTION}</span>
        <swc-button slot="actions" variant="accent" @click=${browseFiles}>
          Browse files
        </swc-button>
      </swc-illustrated-message>
      <input
        ${ref(
          (element?: Element) =>
            (fileInput = (element as HTMLInputElement) ?? null)
        )}
        type="file"
        aria-label="Choose a file"
        style="display: none;"
        @change=${handleChange}
      />
      <div
        slot="filled-content"
        style="display: flex; align-items: center; gap: 8px;"
      >
        <span
          ${ref(
            (element?: Element) =>
              (filledContent = (element as HTMLElement) ?? null)
          )}
        ></span>
        <swc-button
          ${ref(
            (element?: Element) =>
              (replaceButton = (element as HTMLElement) ?? null)
          )}
          size="s"
          variant="secondary"
          @click=${browseFiles}
        >
          Replace file
        </swc-button>
      </div>
    </swc-dropzone>
  `;
};

// ────────────────────────
//    PLAYGROUND STORY
// ────────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    size: 'm',
    dragged: false,
    filled: false,
    'aria-label': 'Upload files',
  },
  render: (args) =>
    renderFilledStateExample(args['aria-label'] as string, {
      size: args.size as DropzoneSize,
      dragged: args.dragged as boolean,
      filled: args.filled as boolean,
    }),
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      ${makeDropzoneSlot('Drag and drop your file')}
    </swc-dropzone>
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      ${makeDropzoneSlot('Drag and drop your file')}
    </swc-dropzone>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: () => html`
    ${DROPZONE_VALID_SIZES.map(
      (size) => html`
        <swc-dropzone
          size=${size}
          aria-label="${sizeLabels[size]} drop zone"
          style="min-inline-size: 260px;"
        >
          ${makeDropzoneSlot(sizeLabels[size])}
        </swc-dropzone>
      `
    )}
  `,
  parameters: { flexLayout: 'column-center' },
  tags: ['options'],
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: () => html`
    <swc-dropzone
      aria-label="Default drop zone"
      style="min-inline-size: 260px;"
    >
      ${makeDropzoneSlot('Drag and drop your file')}
    </swc-dropzone>

    <swc-dropzone
      dragged
      aria-label="Dragged drop zone"
      style="min-inline-size: 260px;"
    >
      ${makeDropzoneSlot('Drop file to upload')}
    </swc-dropzone>

    <swc-dropzone
      filled
      aria-label="Filled drop zone"
      style="min-inline-size: 260px;"
    >
      ${makeDropzoneSlot('Drag and drop your file')}
      <div
        slot="filled-content"
        style="display: flex; align-items: center; gap: 8px;"
      >
        <span>report-q4.pdf uploaded</span>
        <swc-button size="s" variant="secondary">Replace file</swc-button>
      </div>
    </swc-dropzone>

    <swc-dropzone
      filled
      dragged
      aria-label="Filled and dragged drop zone"
      style="min-inline-size: 260px;"
    >
      ${makeDropzoneSlot('Drag and drop your file')}
      <p slot="filled-content">Drop file to replace</p>
    </swc-dropzone>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const Events: Story = {
  render: () => renderFilledStateExample('Upload files'),
  tags: ['behaviors'],
};

export const BrowseAndDrop: Story = {
  render: () => renderFilledStateExample('Upload files'),
  tags: ['behaviors'],
};
BrowseAndDrop.storyName = 'Browse and drop';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => renderFilledStateExample('Upload a profile photo'),
  tags: ['a11y'],
};
