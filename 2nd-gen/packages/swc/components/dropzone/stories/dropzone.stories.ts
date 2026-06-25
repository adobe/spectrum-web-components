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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 103" slot="" aria-hidden="true">
    <path d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v91c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v34c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z"/>
    <path d="M31.4,44.5c0,0.8,0.7,1.5,1.5,1.5h50c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5h-50C32.1,43,31.4,43.7,31.4,44.5z"/>
  </svg>
`;

// TODO: move swc-button inside swc-illustrated-message once it has a button-group slot.
const makeDropzoneSlot = (
  headingText: string,
  size: DropzoneSize = 'm'
) => html`
  <swc-illustrated-message>
    ${unsafeHTML(DROPZONE_SVG)}
    <h2 slot="heading">${headingText}</h2>
  </swc-illustrated-message>
  <swc-button variant="accent" size=${size}>Browse files</swc-button>
`;

// HTML string version used by the Playground so template(args) can spread all args.
const DROPZONE_SLOT_HTML = `
  <swc-illustrated-message>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 103" slot="" aria-hidden="true">
      <path d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v91c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v34c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z"/>
      <path d="M31.4,44.5c0,0.8,0.7,1.5,1.5,1.5h50c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5h-50C32.1,43,31.4,43.7,31.4,44.5z"/>
    </svg>
    <h2 slot="heading">Drag and drop your file</h2>
  </swc-illustrated-message>
  <swc-button variant="accent">Browse files</swc-button>
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
          ${makeDropzoneSlot(sizeLabels[size], size)}
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
      <p style="margin: 0; text-align: center;">report-q4.pdf uploaded</p>
    </swc-dropzone>

    <swc-dropzone
      filled
      dragged
      aria-label="Filled and dragged drop zone"
      style="min-inline-size: 260px;"
    >
      <p style="margin: 0; text-align: center;">Drop file to replace</p>
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
