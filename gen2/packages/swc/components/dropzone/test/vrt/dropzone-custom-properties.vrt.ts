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

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/dropzone/swc-dropzone.js';
import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';
import { DROPZONE_SVG } from './shared.js';

// Metadata

const meta: Meta = {
  title: 'Drop Zone/Drop Zone VRT',
  component: 'swc-dropzone',
  tags: ['dev'],
};

export default meta;

// Helpers

type DropzonePropertyName =
  | `--swc-dropzone-${string}`
  | '--swc-illustrated-message-illustration-color';

// Every `--swc-dropzone-*` (and the cascaded `--swc-illustrated-message-*`)
// custom property documented on the Dropzone element is a public contract:
// consumers override these directly, so a CSS refactor that quietly dropped
// one would be a breaking change. One row per property: a reference drop
// zone beside the same drop zone with that one property overridden to an
// obviously different value, so a real visual difference confirms the
// override still works. verifyCustomPropertyCoverage() (play function)
// asserts this list stays a superset of the API-table properties in the CEM.
const DROPZONE_PROPERTY_CASES: readonly CustomPropertyCase<DropzonePropertyName>[] =
  [
    { property: '--swc-dropzone-background-color', value: 'magenta' },
    { property: '--swc-dropzone-border-color', value: 'magenta' },
    { property: '--swc-dropzone-padding', value: '48px' },
    {
      property: '--swc-illustrated-message-illustration-color',
      value: 'magenta',
    },
  ];

const modPropertyDropzone = (
  _case: CustomPropertyCase<DropzonePropertyName>,
  style?: string
) => html`
  <swc-dropzone
    aria-label="Upload files"
    style=${`min-inline-size: 220px; ${style ?? ''}`}
  >
    <swc-illustrated-message>
      ${unsafeHTML(DROPZONE_SVG)}
      <h2 slot="heading">Drag and drop your file</h2>
      <span slot="description">Or, select a file from your computer</span>
      <swc-button slot="actions" variant="accent">Browse files</swc-button>
    </swc-illustrated-message>
  </swc-dropzone>
`;

const modPropertiesContent = () =>
  customPropertyRows(DROPZONE_PROPERTY_CASES, modPropertyDropzone);

const coveredDropzoneCustomProperties = coveredCustomProperties(
  DROPZONE_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/dropzone/Dropzone.ts',
    declarationName: 'Dropzone',
    coveredProperties: coveredDropzoneCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
