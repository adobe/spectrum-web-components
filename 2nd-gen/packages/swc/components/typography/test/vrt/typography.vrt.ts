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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  forcedColorsVrtParameters,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

// Typography is a "component replacement" stylesheet: a pure CSS class
// vocabulary with no custom-element counterpart (see CONTRIBUTOR-DOCS's
// Non-component stylesheets guide). No `component:` field on meta, matching
// link.vrt.ts's pattern for the same unit category.
const meta: Meta = {
  title: 'Typography/Typography VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

// Every heading/title/body/detail/code size, keyed by variant since each
// variant supports a different size range (Body runs XXS-XXXL, Detail and
// Code only run XS-XL). Sample text spells out the variant and size so each
// item is self-identifying without a separate caption.
const HEADING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'];
const TITLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const BODY_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const DETAIL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const CODE_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const sizeClass = (base: string, size: string) => `${base}--size${size}`;

// Single tag-to-markup switch shared by every sample below (sizes and
// modifiers alike), so there's one place that knows how to render each of
// the four element types this stylesheet targets.
const sample = (
  tag: 'h2' | 'h3' | 'p' | 'code',
  className: string,
  text: string
) => {
  switch (tag) {
    case 'h2':
      return html`
        <h2 class=${className}>${text}</h2>
      `;
    case 'h3':
      return html`
        <h3 class=${className}>${text}</h3>
      `;
    case 'code':
      return html`
        <code class=${className}>${text}</code>
      `;
    default:
      return html`
        <p class=${className}>${text}</p>
      `;
  }
};

// The base class is named once per call site (as `base`), not duplicated as
// both a literal class token and a `sizeClass()` argument, so a typo in one
// can't silently decouple the size modifier from its base class.
const sizedSample = (
  tag: 'h2' | 'h3' | 'p' | 'code',
  base: string,
  label: string,
  size: string
) => sample(tag, `${base} ${sizeClass(base, size)}`, `${label} ${size}`);

const heading = (size: string) =>
  sizedSample('h2', 'swc-Heading', 'Heading', size);
const title = (size: string) => sizedSample('h3', 'swc-Title', 'Title', size);
const body = (size: string) => sizedSample('p', 'swc-Body', 'Body', size);
const detail = (size: string) => sizedSample('p', 'swc-Detail', 'Detail', size);
const code = (size: string) => sizedSample('code', 'swc-Code', 'Code', size);

// Serif/emphasized/heavy modifiers each add one class alongside the base
// variant class; one representative size (M) is enough per modifier since
// its effect (font-family, italic, weight) is independent of size.
const modifiedSample = (
  tag: 'h2' | 'h3' | 'p',
  base: string,
  modifierClasses: string,
  text: string
) => sample(tag, `${base} ${modifierClasses}`.trim(), text);

const permutationContent = () => html`
  ${row(HEADING_SIZES.map(heading), 'Heading')}
  ${row(TITLE_SIZES.map(title), 'Title')} ${row(BODY_SIZES.map(body), 'Body')}
  ${row(DETAIL_SIZES.map(detail), 'Detail')}
  ${row(CODE_SIZES.map(code), 'Code')}
  ${row(
    [
      modifiedSample(
        'h2',
        'swc-Heading',
        'swc-Heading--serif',
        'Heading serif'
      ),
      modifiedSample('h3', 'swc-Title', 'swc-Title--serif', 'Title serif'),
      modifiedSample('p', 'swc-Body', 'swc-Body--serif', 'Body serif'),
      modifiedSample('p', 'swc-Detail', 'swc-Detail--serif', 'Detail serif'),
    ],
    'Serif modifier'
  )}
  ${row(
    [
      modifiedSample(
        'h2',
        'swc-Heading',
        'swc-Typography--emphasized',
        'Heading emphasized'
      ),
      modifiedSample(
        'h3',
        'swc-Title',
        'swc-Typography--emphasized',
        'Title emphasized'
      ),
      modifiedSample(
        'p',
        'swc-Body',
        'swc-Typography--emphasized',
        'Body emphasized'
      ),
      modifiedSample(
        'p',
        'swc-Detail',
        'swc-Typography--emphasized',
        'Detail emphasized'
      ),
    ],
    'Emphasized modifier'
  )}
  ${row(
    [
      modifiedSample(
        'h2',
        'swc-Heading',
        'swc-Heading--heavy',
        'Heading heavy'
      ),
    ],
    'Heading heavy modifier'
  )}
  ${row(
    [
      html`
        <div>
          <p class="swc-Body swc-Body--margins">
            First paragraph with the margins modifier.
          </p>
          <p class="swc-Body swc-Body--margins">
            Second paragraph, showing the block-start/end gap between them.
          </p>
        </div>
      `,
    ],
    'Margins modifier'
  )}
  ${row(
    [
      html`
        <div class="swc-Typography--prose" style="max-inline-size: 320px;">
          <h1>Semantic h1</h1>
          <h2>Semantic h2</h2>
          <p>
            Semantic paragraph with an
            <a href="#" onclick="return false;">inline link</a>
            that inherits body typography.
          </p>
          <h3>Semantic h3</h3>
          <h4>Semantic h4</h4>
          <ul>
            <li>Semantic list item</li>
          </ul>
        </div>
      `,
    ],
    'Prose container'
  )}
  ${row(
    [
      html`
        <ul
          class="swc-Typography--links"
          style="list-style: none; padding: 0; margin: 0;"
        >
          <li><a href="#" onclick="return false;">Privacy policy</a></li>
          <li><a href="#" onclick="return false;">Terms of use</a></li>
        </ul>
      `,
    ],
    'Link list'
  )}
  ${row(
    [
      html`
        <h2 class="swc-Heading" lang="ar" dir="rtl">مرحبا بالعالم</h2>
      `,
      html`
        <h2 class="swc-Heading" lang="he" dir="rtl">שלום עולם</h2>
      `,
    ],
    'Arabic/Hebrew font-family'
  )}
  ${cjkContent()}
`;

// CJK content exercises typography.css's `:lang(zh|ja|ko)` overrides, so
// unlike most VRT files this isn't a supplementary check - it's a core,
// load-bearing feature. Grouped by language (each row holding
// heading/title/body) rather than by variant: heading/title/body override
// font-size, line-height, and letter-spacing under `:lang()`, a superset of
// what detail/code override (line-height + letter-spacing, or line-height
// only), so this set is enough to prove the mechanism without also
// translating detail/code samples. Included in both the light/ltr and
// dark/rtl passes below since these overrides are theme-independent and
// worth confirming under both color schemes, same as every other row here.
const cjkContent = () => html`
  ${row(
    [
      html`
        <h2 class="swc-Heading" lang="ja">承認ワークフローを開始</h2>
      `,
      html`
        <h3 class="swc-Title" lang="ja">仕様</h3>
      `,
      html`
        <p class="swc-Body" lang="ja">
          アップロードまたはインポートしてください。
        </p>
      `,
    ],
    'CJK · Japanese'
  )}
  ${row(
    [
      html`
        <h2 class="swc-Heading" lang="ko">승인 워크플로 시작</h2>
      `,
      html`
        <h3 class="swc-Title" lang="ko">사양</h3>
      `,
      html`
        <p class="swc-Body" lang="ko">업로드하거나 가져와서 시작하세요.</p>
      `,
    ],
    'CJK · Korean'
  )}
  ${row(
    [
      html`
        <h2 class="swc-Heading" lang="zh">启动审批工作流</h2>
      `,
      html`
        <h3 class="swc-Title" lang="zh">规格</h3>
      `,
      html`
        <p class="swc-Body" lang="zh">上传或导入以开始使用。</p>
      `,
    ],
    'CJK · Chinese'
  )}
`;

// VRT stories

// Every size/modifier/structural-context combination, plus Arabic/Hebrew/CJK
// font overrides. Rendered once in light/ltr and once in dark/rtl (covering
// both axes) in a single story, so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` is a real browser media feature Chromatic can emulate
// directly. Forced-colors mode replaces the whole page's palette, so it
// needs its own story/snapshot rather than folding into Permutations.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
