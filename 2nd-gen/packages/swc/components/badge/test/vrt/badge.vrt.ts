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
  BADGE_VALID_SIZES,
  BADGE_VARIANTS,
  BADGE_VARIANTS_SEMANTIC,
  type BadgeSize,
  FIXED_VALUES,
} from '@adobe/spectrum-wc-core/components/badge';

import '@adobe/spectrum-wc/components/badge/swc-badge.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  groupPermutationsBy,
  iconForSize,
  renderStorybookPermutation,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import * as Icons from '../../../icon/elements/index.js';

// Metadata

const meta: Meta = {
  title: 'Badge/Badge VRT',
  component: 'swc-badge',
  tags: ['dev'],
};

export default meta;

// Helpers

// Main badge permutations: every variant x size (base coverage across all 6
// semantic and 19 non-semantic variants), outline (semantic variants only,
// since badge.css only defines outline overrides for
// `:host([outline][variant="..."])` on the six semantic variants), and
// subtle (every variant, since subtle has its own background override for
// both semantic and non-semantic variants). Outline and subtle are each
// rendered at a single representative size rather than crossed with the
// full size range: badge.css has no `[outline]`/`[subtle]` + `[size]`
// interaction, so a per-size sweep of either would just repeat the same
// relative treatment already established by the base size sweep above.
const BADGE_PERMUTATIONS = createPermutations([
  { variant: BADGE_VARIANTS, size: BADGE_VALID_SIZES },
  { variant: BADGE_VARIANTS_SEMANTIC, outline: [true] },
  { variant: BADGE_VARIANTS, subtle: [true] },
]);

const isOutlinePermutation = (permutation: Record<string, unknown>) =>
  'outline' in permutation;
const isSubtlePermutation = (permutation: Record<string, unknown>) =>
  'subtle' in permutation;

// Badge is non-interactive (no :hover/:focus/:active rules in badge.css,
// and not focusable per badge.mdx), so unlike button there's no forced
// pseudo-state row to add here. The row heading (variant) already
// identifies each item, so the badge keeps a plain label rather than
// repeating its own variant name.
const renderBadgePermutation = renderStorybookPermutation('swc-badge', {
  'default-slot': 'Badge',
});

const FIXED_LABELS = {
  'block-start': 'Block start',
  'block-end': 'Block end',
  'inline-start': 'Inline start',
  'inline-end': 'Inline end',
} as const satisfies Record<(typeof FIXED_VALUES)[number], string>;

// Icon anatomy can't go through renderBadgePermutation's icon-slot arg:
// template()'s named-slot rendering runs icon markup through an extra
// DOM-parsing step that leaves a Lit child-position marker comment inside
// <swc-badge>, which SlotTextController misreads as label text, so the
// no-label icon-only styling never activates. badge.stories.ts's own
// Anatomy story hits the same bug and sidesteps it the same way: writing
// the icon markup directly instead of going through the icon-slot arg.
type IconAnatomyCase = {
  size: BadgeSize;
  content: 'label-only' | 'icon-and-label' | 'icon-only';
};

const ICON_ANATOMY_PERMUTATIONS: readonly IconAnatomyCase[] =
  BADGE_VALID_SIZES.flatMap((size) =>
    (['label-only', 'icon-and-label', 'icon-only'] as const).map((content) => ({
      size,
      content,
    }))
  );

const SIZE_LABELS = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<BadgeSize, string>;

const CONTENT_LABELS = {
  'label-only': 'Label only',
  'icon-and-label': 'Icon + label',
  'icon-only': 'Icon only',
} as const satisfies Record<IconAnatomyCase['content'], string>;

// icon-only items have no visible text of their own (label is aria-only via
// aria-label), so every item gets a visible caption underneath - otherwise a
// reviewer can't tell which size/content combination a given item is from
// the snapshot alone (same reasoning as progress-circle.vrt.ts's
// renderSizedCircle caption).
const renderIconAnatomy = ({ size, content }: IconAnatomyCase) => {
  const caption = `${SIZE_LABELS[size]} · ${CONTENT_LABELS[content]}`;
  const badge = (() => {
    if (content === 'label-only') {
      return html`
        <swc-badge variant="neutral" size=${size}>Archived</swc-badge>
      `;
    }
    if (content === 'icon-only') {
      return html`
        <swc-badge
          variant="neutral"
          size=${size}
          role="img"
          aria-label="Archived"
        >
          <swc-icon size=${size} slot="icon">
            ${iconForSize(Icons, 'Checkmark', size)}
          </swc-icon>
        </swc-badge>
      `;
    }
    return html`
      <swc-badge variant="neutral" size=${size}>
        <swc-icon size=${size} slot="icon" aria-hidden="true">
          ${iconForSize(Icons, 'Checkmark', size)}
        </swc-icon>
        Archived
      </swc-badge>
    `;
  })();
  return html`
    <div
      style="display: flex; flex-direction: column; align-items: center; gap: var(--swc-spacing-100);"
    >
      ${badge}
      <span class="swc-Detail swc-Detail--sizeM">${caption}</span>
    </div>
  `;
};

const permutationContent = () => html`
  ${groupPermutationsBy(
    BADGE_PERMUTATIONS.filter(
      (permutation) =>
        !isOutlinePermutation(permutation) && !isSubtlePermutation(permutation)
    ),
    'variant'
  ).map(([variant, perms]) => row(perms.map(renderBadgePermutation), variant))}
  ${groupPermutationsBy(
    BADGE_PERMUTATIONS.filter(isOutlinePermutation),
    'variant'
  ).map(([variant, perms]) =>
    row(perms.map(renderBadgePermutation), `${variant} · outline`)
  )}
  ${groupPermutationsBy(
    BADGE_PERMUTATIONS.filter(isSubtlePermutation),
    'variant'
  ).map(([variant, perms]) =>
    row(perms.map(renderBadgePermutation), `${variant} · subtle`)
  )}
  ${row(
    FIXED_VALUES.map(
      (fixed) => html`
        <swc-badge variant="neutral" fixed=${fixed}>
          ${FIXED_LABELS[fixed]}
        </swc-badge>
      `
    ),
    'Fixed'
  )}
  ${row(ICON_ANATOMY_PERMUTATIONS.map(renderIconAnatomy), 'Icon anatomy')}
  ${row(
    [
      html`
        <swc-badge variant="notice" style="max-inline-size: 100px;">
          Document review pending approval from manager
        </swc-badge>
      `,
    ],
    'Wrapping'
  )}
  ${row(
    [
      html`
        <swc-badge variant="informative" lang="ja">
          承認待ちワークフロー
        </swc-badge>
      `,
      html`
        <swc-badge variant="informative" lang="ko">
          승인 대기 워크플로
        </swc-badge>
      `,
      html`
        <swc-badge variant="informative" lang="zh">待审批工作流程</swc-badge>
      `,
    ],
    'CJK language'
  )}
`;

// VRT stories

// Every variant (6 semantic + 19 non-semantic) x size, outline (semantic
// only) and subtle (all variants) at a representative size, fixed
// positioning, icon anatomy (label-only, icon+label, icon-only) across
// sizes, text wrapping, and CJK line-height. Rendered once in light/ltr and
// once in dark/rtl below (that combination covers both axes), all in a
// single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// Badge conveys most of its meaning through color, so forced-colors gets
// the full permutation set rather than a narrowed representative subset
// (unlike avatar/divider, where the forced-colors-affected properties
// don't vary meaningfully across the component's other axes).
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
