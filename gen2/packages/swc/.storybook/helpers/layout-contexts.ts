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

import { html, nothing, type TemplateResult } from 'lit';

import { row } from './vrt.js';

export type LayoutContextId =
  | 'flex-row-center'
  | 'flex-column-center'
  | 'grid-place-items'
  | 'grid-place-content'
  | 'flex-row-stretch'
  | 'grid-stretch'
  | 'flex-shrink'
  | 'grid-narrow-track'
  | 'flex-grow'
  | 'inline-flow';

type LayoutContext = {
  id: LayoutContextId;
  label: string;
  /** What the context sets up and what the ideal outcome is. */
  description: string;
  /** Inline style for the container the component is placed in. */
  containerStyle: string;
  /** A taller sibling to place beside the component. */
  sibling?: string;
};

const SIBLING_TALL = 'block-size: 80px; inline-size: 40px;';
const SIBLING_WIDE = 'block-size: 16px; inline-size: 200px; flex: none;';
const SIBLING_TALL_FIXED = `${SIBLING_TALL} flex: none;`;

// Each context is a distinct sizing mechanism; see the layout-context audit in
// SWC-2723 for why overlapping cases (fixed-height parent vs. taller sibling,
// align-self: stretch vs. the default) are not listed separately.
export const LAYOUT_CONTEXTS: readonly LayoutContext[] = [
  {
    id: 'flex-row-center',
    label: 'Flex row, centered',
    description: 'Centered on both axes. Keeps its natural size.',
    containerStyle:
      'display: flex; align-items: center; justify-content: center; inline-size: 200px; block-size: 96px;',
  },
  {
    id: 'flex-column-center',
    label: 'Flex column, centered',
    description: 'Centered on both axes. Keeps its natural size.',
    containerStyle:
      'display: flex; flex-direction: column; align-items: center; justify-content: center; inline-size: 200px; block-size: 96px;',
  },
  {
    id: 'grid-place-items',
    label: 'Grid, place-items center',
    description: 'Centered in a larger cell. Keeps its natural size.',
    containerStyle:
      'display: grid; place-items: center; inline-size: 200px; block-size: 96px;',
  },
  {
    id: 'grid-place-content',
    label: 'Grid, place-content center',
    description: 'Track sizes to content. Keeps its natural size.',
    containerStyle:
      'display: grid; place-content: center; inline-size: 200px; block-size: 96px;',
  },
  {
    id: 'flex-row-stretch',
    label: 'Flex row, taller sibling',
    description: 'Gray sibling is taller. Host stays its natural size.',
    containerStyle: 'display: flex; inline-size: 200px;',
    sibling: SIBLING_TALL_FIXED,
  },
  {
    id: 'grid-stretch',
    label: 'Grid, taller sibling',
    description: 'Gray sibling is taller. Host stays its natural size.',
    containerStyle:
      'display: grid; grid-template-columns: auto 40px; inline-size: 200px;',
    sibling: SIBLING_TALL,
  },
  {
    id: 'flex-shrink',
    label: 'Flex row, shrink pressure',
    description: 'Gray sibling is wider than the container. Does not collapse.',
    containerStyle: 'display: flex; inline-size: 80px; overflow: hidden;',
    sibling: SIBLING_WIDE,
  },
  {
    id: 'grid-narrow-track',
    label: 'Grid, narrow track',
    description: 'Track is 40px wide. Fits the track or keeps its minimum.',
    containerStyle:
      'display: grid; grid-template-columns: 40px; inline-size: 200px;',
  },
  {
    id: 'flex-grow',
    label: 'Flex row, flex: 1',
    description: 'flex: 1 on the host. Ideal outcome is under review.',
    containerStyle: 'display: flex; inline-size: 200px; block-size: 96px;',
  },
  {
    id: 'inline-flow',
    label: 'Inline with text',
    description: 'Placed between lines of text. Has a natural size.',
    containerStyle: 'inline-size: 200px;',
  },
];

// The outline sits outside the host box so thin components such as a divider
// stay visible inside it, and a host that is bigger than the component's
// rendered box shows as a gap. The container border marks the available space.
const layoutContextStyles = html`
  <style>
    .swc-vrt-layout {
      box-sizing: border-box;
      padding: 2px;
      border: 1px dashed var(--swc-gray-500, #909090);
    }
    .swc-vrt-layout > :first-child {
      outline: 1px solid magenta;
    }
    .swc-vrt-layout--flex-grow > :first-child {
      flex: 1;
    }
    .swc-vrt-layout-sibling {
      background: var(--swc-gray-400, #b0b0b0);
    }
    .swc-vrt-layout-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--swc-spacing-100);
      inline-size: 216px;
    }
    .swc-vrt-layout-description {
      text-align: center;
    }
  </style>
`;

/**
 * A one-line key for the outlines and shapes in `layoutContexts()`. Render it
 * once above the rows.
 */
export const layoutContextsLegend = html`
  ${layoutContextStyles}
  <span class="swc-Detail swc-Detail--sizeM">
    Magenta outline: the host box. Dashed border: the available space. Gray
    block: a sibling. Ideal: the magenta outline hugs the rendered component.
  </span>
`;

export type LayoutContextOptions = {
  /** Label for the row of contexts. */
  label?: string;
  /** Contexts to render. Defaults to all of them. */
  include?: readonly LayoutContextId[];
  /** Contexts to skip, applied after `include`. */
  exclude?: readonly LayoutContextId[];
  /** Replaces a context's description, for outcomes specific to a component. */
  descriptions?: Partial<Record<LayoutContextId, string>>;
};

/**
 * Renders `content` as the direct child of each layout context (flex and grid
 * centering, stretch next to a taller sibling, shrink pressure, `flex: 1`, and
 * inline with text), so a component's host box can be checked against its
 * rendered box in the contexts an app is likely to place it in.
 *
 * The first element in `content` is the component under test.
 */
export const layoutContexts = (
  content: TemplateResult,
  {
    label: rowLabel,
    include,
    exclude = [],
    descriptions = {},
  }: LayoutContextOptions = {}
) => {
  const contexts = LAYOUT_CONTEXTS.filter(
    ({ id }) => (!include || include.includes(id)) && !exclude.includes(id)
  );

  return html`
    ${layoutContextStyles}
    ${row(
      contexts.map(
        ({ id, label, description, containerStyle, sibling }) => html`
          <div class="swc-vrt-layout-cell">
            <div
              class="swc-vrt-layout swc-vrt-layout--${id}"
              style=${containerStyle}
            >
              ${id === 'inline-flow'
                ? html`
                    Text ${content} text
                  `
                : html`
                    ${content}${sibling
                      ? html`
                          <div
                            class="swc-vrt-layout-sibling"
                            style=${sibling}
                          ></div>
                        `
                      : nothing}
                  `}
            </div>
            <span class="swc-Detail swc-Detail--sizeM">${label}</span>
            <span
              class="swc-Detail swc-Detail--sizeS swc-vrt-layout-description"
            >
              ${descriptions[id] ?? description}
            </span>
          </div>
        `
      ),
      rowLabel
    )}
  `;
};
