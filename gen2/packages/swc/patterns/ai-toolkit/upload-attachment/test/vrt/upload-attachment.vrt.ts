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
import '@adobe/spectrum-wc/components/badge/swc-badge.js';

import {
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Upload attachment/Upload attachment VRT',
  component: 'swc-upload-attachment',
  tags: ['dev'],
  // Snapshot-only; drop the panel so auto-generated controls don't clutter Chromatic.
  parameters: { controls: { disable: true } },
};

export default meta;

// Helpers

// UploadAttachment styles focus on `:host(:focus-visible)` directly (no
// `:hover`/`:active` treatment of its own; the dismiss button's own hover
// state is already covered by swc-action-button's VRT).
type ForcedState = 'focus-visible';

const landscapeAsset = (alt: string) => html`
  <swc-asset slot="thumbnail" aspect-ratio="1:1">
    <img src="images/landscape-asset.jpg" alt=${alt} />
  </swc-asset>
`;

const portraitAsset = (alt: string) => html`
  <swc-asset slot="thumbnail" aspect-ratio="1:1">
    <img src="images/portrait-asset.jpg" alt=${alt} />
  </swc-asset>
`;

const cardPreviewAsset = (alt: string) => html`
  <swc-asset slot="thumbnail" aspect-ratio="1:1">
    <img src="images/card-preview.jpg" alt=${alt} />
  </swc-asset>
`;

type CardCase = {
  title: string;
  subtitle?: string;
  dismissible?: boolean;
  lang?: string;
  forceState?: ForcedState;
};

const renderCardAttachment = ({
  title,
  subtitle,
  dismissible = true,
  lang,
  forceState,
}: CardCase) => html`
  <swc-upload-attachment
    type="card"
    ?dismissible=${dismissible}
    data-force-state=${forceState ?? nothing}
    style="max-inline-size: 280px;"
  >
    ${landscapeAsset('File preview')}
    <span slot="title" lang=${lang ?? nothing}>${title}</span>
    ${subtitle
      ? html`
          <span slot="subtitle" lang=${lang ?? nothing}>${subtitle}</span>
        `
      : nothing}
  </swc-upload-attachment>
`;

type MediaCase = {
  asset: ReturnType<typeof landscapeAsset>;
  alt: string;
  size?: 'm' | 'l';
  dismissible?: boolean;
  progress?: number;
  badge?: string;
  forceState?: ForcedState;
};

const renderMediaAttachment = ({
  asset,
  size = 'm',
  dismissible = true,
  progress,
  badge,
  forceState,
}: MediaCase) => html`
  <swc-upload-attachment
    type="media"
    size=${size}
    ?dismissible=${dismissible}
    progress=${progress ?? nothing}
    data-force-state=${forceState ?? nothing}
  >
    ${asset}
    ${badge
      ? html`
          <swc-badge slot="badge">${badge}</swc-badge>
        `
      : nothing}
  </swc-upload-attachment>
`;

const forceUploadAttachmentStates = forcePseudoStates(
  'swc-upload-attachment[data-force-state]'
);

// Card tiles (title/subtitle metadata, dismissible and non-dismissible),
// media tiles at both sizes with and without the upload-progress overlay and
// the badge overlay (badge shown only at size="l", per its documented
// guidance since it crowds the default 64px size="m" tile), non-dismissible
// media, middle title truncation and subtitle ellipsis on `type="card"`,
// forced `:focus-visible` on both types, and CJK title/subtitle text.
const permutationContent = () => html`
  ${row(
    [
      renderCardAttachment({
        title: 'Hilton commercial assets',
        subtitle: '2026',
      }),
      renderCardAttachment({
        title: 'Brand guidelines',
        subtitle: 'PDF',
        dismissible: false,
      }),
    ],
    'Card'
  )}
  ${row(
    [
      renderMediaAttachment({
        asset: landscapeAsset('Campaign still'),
        alt: 'Campaign still',
        size: 'm',
      }),
      renderMediaAttachment({
        asset: cardPreviewAsset('Document preview'),
        alt: 'Document preview',
        size: 'l',
      }),
      renderMediaAttachment({
        asset: portraitAsset('Storyboard frame'),
        alt: 'Storyboard frame',
        size: 'l',
        dismissible: false,
      }),
    ],
    'Media sizes'
  )}
  ${row(
    [
      renderMediaAttachment({
        asset: cardPreviewAsset('Document preview'),
        alt: 'Document preview',
        size: 'l',
        badge: 'PDF',
      }),
    ],
    'Media with badge (size="l")'
  )}
  ${row(
    [
      renderMediaAttachment({
        asset: landscapeAsset('Upload just started'),
        alt: 'Upload just started',
        progress: 0,
      }),
      renderMediaAttachment({
        asset: cardPreviewAsset('Upload in progress'),
        alt: 'Upload in progress',
        progress: 42,
      }),
      renderMediaAttachment({
        asset: portraitAsset('Upload complete'),
        alt: 'Upload complete',
        progress: 100,
      }),
    ],
    'Upload progress'
  )}
  ${row(
    [
      renderCardAttachment({
        title:
          'Hotel commercial assets for marketing campaign Q1–Q2 regional rollout.pdf',
      }),
      renderCardAttachment({
        title: 'Executive summary',
        subtitle:
          '2026 fiscal year planning deck and executive summary presentation',
      }),
    ],
    'Title truncation & subtitle overflow'
  )}
  ${row(
    [
      renderCardAttachment({
        title: 'Card',
        forceState: 'focus-visible',
      }),
      renderMediaAttachment({
        asset: landscapeAsset('Media'),
        alt: 'Media',
        forceState: 'focus-visible',
      }),
    ],
    'Forced focus-visible'
  )}
  ${row(
    [
      renderCardAttachment({
        title: '承認ワークフローを開始するファイル名.pdf',
        subtitle: '欧州とアジアのクルーズ旅行パッケージ',
        lang: 'ja',
      }),
      renderCardAttachment({
        title: '유럽과 아시아의 크루즈 여행 패키지를 검색',
        subtitle: '2026 회계연도 계획 문서',
        lang: 'ko',
      }),
      renderCardAttachment({
        title: '正在搜索欧洲和亚洲的邮轮旅行套餐文件',
        subtitle: '2026财年计划文件',
        lang: 'zh',
      }),
    ],
    'CJK language'
  )}
`;

// VRT stories

// Rendered once in light/ltr and once in dark/rtl (that combination covers
// both axes) in a single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceUploadAttachmentStates,
};

// `forced-colors` replaces the whole page palette, so it can't be scoped to a
// subtree the way theme()'s light/dark split is, and needs its own snapshot
// rather than folding into Permutations.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceUploadAttachmentStates,
};
