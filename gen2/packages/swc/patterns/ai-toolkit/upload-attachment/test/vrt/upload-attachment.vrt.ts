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

import {
  forcedColorsVrtParameters,
  forcePseudoState,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Upload attachment/Upload attachment VRT',
  component: 'swc-upload-attachment',
  tags: ['dev'],
};

export default meta;

// Helpers

const MIME_TYPES = [
  'application/pdf',
  'image/png',
  'audio/mpeg',
  'video/mp4',
  'text/plain',
] as const;

// Static gradients stand in for real thumbnails so VRT snapshots don't depend
// on a network image request (same approach as prompt-field.vrt.ts).
const THUMBNAIL_GRADIENT = 'linear-gradient(135deg, #a78bfa, #f472b6)';

const cardAttachment = ({
  dismissible = false,
  forceState,
}: {
  dismissible?: boolean;
  forceState?: 'host-focus' | 'dismiss-hover' | 'dismiss-focus';
} = {}) => html`
  <swc-upload-attachment
    type="card"
    ?dismissible=${dismissible}
    data-force-state=${forceState ?? ''}
  >
    <div slot="thumbnail" role="img" aria-label="PDF"></div>
    <span slot="title">Brand guidelines</span>
    <span slot="subtitle">PDF</span>
  </swc-upload-attachment>
`;

const mediaAttachment = ({
  dismissible = false,
  badge,
  size,
  forceState,
}: {
  dismissible?: boolean;
  badge?: string;
  size?: 's' | 'm' | 'l';
  forceState?: 'host-focus' | 'dismiss-hover' | 'dismiss-focus';
} = {}) => html`
  <swc-upload-attachment
    type="media"
    size=${size ?? nothing}
    ?dismissible=${dismissible}
    data-force-state=${forceState ?? ''}
  >
    <div
      slot="thumbnail"
      role="img"
      aria-label="Campaign still"
      style="inline-size: 100%; block-size: 100%; background: ${THUMBNAIL_GRADIENT};"
    ></div>
    ${badge
      ? html`
          <span slot="badge">${badge}</span>
        `
      : ''}
  </swc-upload-attachment>
`;

const cardFallback = (mimeType: string) => html`
  <swc-upload-attachment type="card" mime-type=${mimeType}>
    <span slot="title">File</span>
    <span slot="subtitle">${mimeType}</span>
  </swc-upload-attachment>
`;

const mediaFallback = (mimeType: string) => html`
  <swc-upload-attachment
    type="media"
    mime-type=${mimeType}
  ></swc-upload-attachment>
`;

// Long enough to trigger card's middle-truncation title and the subtitle's
// trailing ellipsis at the narrow width below.
const overflowContent = () => html`
  <div style="max-inline-size: 280px;">
    <swc-upload-attachment type="card" dismissible>
      <div slot="thumbnail" role="img" aria-label="File thumbnail"></div>
      <span slot="title">
        Hotel commercial assets for marketing campaign Q1-Q2 regional rollout
      </span>
      <span slot="subtitle">2026 fiscal year planning deck</span>
    </swc-upload-attachment>
  </div>
`;

// Card and media, with and without a dismiss button, plus every mime-type
// fallback icon branch (audio/video/image/text/default) on both types since
// each renders the icon in a differently shaped thumbnail area.
const permutationContent = () => html`
  ${row([cardAttachment(), cardAttachment({ dismissible: true })], 'Card')}
  ${row([mediaAttachment(), mediaAttachment({ dismissible: true })], 'Media')}
  ${row(
    [mediaAttachment({ dismissible: true, badge: 'PDF' })],
    'Media with badge'
  )}
  ${row(
    [
      mediaAttachment({ size: 's', badge: 'PDF' }),
      mediaAttachment({ size: 'm', badge: 'PDF' }),
      mediaAttachment({ size: 'l', badge: 'PDF' }),
    ],
    'Media sizes (badge hidden at s)'
  )}
  ${row([overflowContent()], 'Text overflow')}
  ${row(MIME_TYPES.map(cardFallback), 'Card fallback icons')}
  ${row(MIME_TYPES.map(mediaFallback), 'Media fallback icons')}
`;

// Interactive-state content, forced in `play` below: the host's own
// `:focus-visible` ring, and the dismiss button's `:hover`/`:focus-visible`
// treatment on both types.
const interactiveContent = () => html`
  ${row(
    [
      cardAttachment({ forceState: 'host-focus' }),
      mediaAttachment({ forceState: 'host-focus' }),
    ],
    'Focus ring'
  )}
  ${row(
    [
      cardAttachment({ dismissible: true, forceState: 'dismiss-hover' }),
      mediaAttachment({ dismissible: true, forceState: 'dismiss-hover' }),
    ],
    'Dismiss hover'
  )}
  ${row(
    [
      cardAttachment({ dismissible: true, forceState: 'dismiss-focus' }),
      mediaAttachment({ dismissible: true, forceState: 'dismiss-focus' }),
    ],
    'Dismiss focus'
  )}
`;

// Applies the `forceState` each attachment was tagged with via
// `data-force-state`: the host's own focus ring directly, the dismiss
// button's hover/focus on its internal `.swc-ActionButton` part.
const forceInteractiveStates = ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  canvasElement
    .querySelectorAll<HTMLElement>('[data-force-state]')
    .forEach((host) => {
      const state = host.dataset.forceState;
      const dismissButton = host.shadowRoot?.querySelector<HTMLElement>(
        '.swc-UploadAttachment-dismiss'
      );
      switch (state) {
        case 'host-focus':
          forcePseudoState(host, 'focus-visible');
          break;
        case 'dismiss-hover':
          if (dismissButton) {
            forcePseudoState(dismissButton, 'hover', '.swc-ActionButton');
          }
          break;
        case 'dismiss-focus':
          if (dismissButton) {
            forcePseudoState(
              dismissButton,
              'focus-visible',
              '.swc-ActionButton'
            );
          }
          break;
        default:
          break;
      }
    });
};

// VRT stories

// Rendered once in light/ltr and once in dark/rtl (that pair covers both
// axes) in a single story so the matrix costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// Forced hover/focus states, kept as a separate story since they need a
// `play` function to apply after render.
export const InteractiveStates: Story = {
  render: () => html`
    ${theme(interactiveContent(), 'light', 'ltr')}
    ${theme(interactiveContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceInteractiveStates,
};
InteractiveStates.storyName = 'Interactive states';

// Forced-colors replaces the whole palette, so it gets its own story: checks
// the opaque card boundary and the dismiss button's forced-colors outline.
export const ForcedColors: Story = {
  render: () =>
    theme(
      html`
        ${row(
          [
            cardAttachment({ dismissible: true }),
            mediaAttachment({ dismissible: true, badge: 'PDF' }),
          ],
          'Default'
        )}
        ${row(
          [
            cardAttachment({ dismissible: true, forceState: 'dismiss-focus' }),
            mediaAttachment({ dismissible: true, forceState: 'dismiss-focus' }),
          ],
          'Dismiss focus'
        )}
      `,
      'light',
      'ltr'
    ),
  parameters: forcedColorsVrtParameters,
  play: forceInteractiveStates,
};
