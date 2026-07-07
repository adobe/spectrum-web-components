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
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  DROPZONE_VALID_SIZES,
  type DropzoneSize,
} from '@spectrum-web-components/core/components/dropzone';

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
    // design: { type: 'figma', url: 'https://www.figma.com/...' },
    // stackblitz: { url: 'https://stackblitz.com/...' },
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

// HTML string version used by the Playground so template(args) can spread all args.
const DROPZONE_SLOT_HTML = `
  <swc-illustrated-message>
    ${DROPZONE_SVG}
    <h2 slot="heading">Drag and drop your file</h2>
    <span slot="description">${DEFAULT_DROPZONE_DESCRIPTION}</span>
    <swc-button slot="actions" variant="accent">Browse files</swc-button>
  </swc-illustrated-message>
`;

// ────────────────────────
//    PLAYGROUND STORY
// ────────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    size: 'm',
    dragged: false,
    filled: false,
    'aria-label': 'Upload files',
    'default-slot': DROPZONE_SLOT_HTML,
  },
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
      <p slot="filled-content">report-q4.pdf uploaded</p>
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

// TODO: Phase 7 — add event log story demonstrating drag events

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

// TODO: will complete in separate documentation pass of phase 7
