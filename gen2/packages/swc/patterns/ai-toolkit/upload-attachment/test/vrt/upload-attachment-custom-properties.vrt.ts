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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../swc-upload-attachment.js';
import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import type { CustomPropertyCase } from '../../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoState,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Upload attachment/Upload attachment VRT',
  component: 'swc-upload-attachment',
  tags: ['dev'],
  parameters: { controls: { disable: true } },
};

export default meta;

// Helpers

const thumbnail = (alt: string) => html`
  <swc-asset slot="thumbnail" aspect-ratio="1:1">
    <img src="images/landscape-asset.jpg" alt=${alt} />
  </swc-asset>
`;

// Each case renders in the context where its property is actually live: the
// focus ring needs a forced `:focus-visible` host, the card-* properties
// need `type="card"` (with a short title so `card-min-block-size` isn't
// already exceeded by content), and the dismiss-* properties need
// `dismissible`.
type UploadAttachmentPropertyCase = CustomPropertyCase<
  | '--swc-upload-attachment-focus-indicator-color'
  | '--swc-upload-attachment-card-min-block-size'
  | '--swc-upload-attachment-card-thumbnail-size'
  | '--swc-upload-attachment-dismiss-visual-size'
  | '--swc-upload-attachment-dismiss-icon-size'
> & {
  context: 'focus' | 'card' | 'dismiss';
};

const UPLOAD_ATTACHMENT_PROPERTY_CASES: readonly UploadAttachmentPropertyCase[] =
  [
    {
      property: '--swc-upload-attachment-focus-indicator-color',
      value: 'magenta',
      context: 'focus',
    },
    {
      property: '--swc-upload-attachment-card-min-block-size',
      value: '160px',
      context: 'card',
    },
    {
      property: '--swc-upload-attachment-card-thumbnail-size',
      value: '96px',
      context: 'card',
    },
    {
      property: '--swc-upload-attachment-dismiss-visual-size',
      value: '40px',
      context: 'dismiss',
    },
    {
      property: '--swc-upload-attachment-dismiss-icon-size',
      value: '16px',
      context: 'dismiss',
    },
  ];

const renderPropertyCase = (
  { context }: UploadAttachmentPropertyCase,
  style?: string
) => {
  if (context === 'card') {
    return html`
      <swc-upload-attachment
        type="card"
        dismissible
        style="max-inline-size: 240px; ${style ?? ''}"
      >
        ${thumbnail('File preview')}
        <span slot="title">Card title</span>
      </swc-upload-attachment>
    `;
  }
  if (context === 'dismiss') {
    return html`
      <swc-upload-attachment type="media" dismissible style=${style ?? nothing}>
        ${thumbnail('Media preview')}
      </swc-upload-attachment>
    `;
  }
  // 'focus': the ring only paints under a forced `:focus-visible` host.
  return html`
    <swc-upload-attachment
      type="media"
      data-force-state="focus-visible"
      style=${style ?? nothing}
    >
      ${thumbnail('Media preview')}
    </swc-upload-attachment>
  `;
};

const modPropertiesContent = () =>
  customPropertyRows(UPLOAD_ATTACHMENT_PROPERTY_CASES, renderPropertyCase);

const coveredUploadAttachmentProperties = coveredCustomProperties(
  UPLOAD_ATTACHMENT_PROPERTY_CASES
);

const forceFocusRows = ({ canvasElement }: { canvasElement: HTMLElement }) => {
  canvasElement
    .querySelectorAll<HTMLElement>(
      'swc-upload-attachment[data-force-state="focus-visible"]'
    )
    .forEach((host) => forcePseudoState(host, 'focus-visible'));
};

const verifyCoverage = async (context: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  forceFocusRows(context);
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'patterns/ai-toolkit/upload-attachment/UploadAttachment.ts',
    declarationName: 'UploadAttachment',
    coveredProperties: coveredUploadAttachmentProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
