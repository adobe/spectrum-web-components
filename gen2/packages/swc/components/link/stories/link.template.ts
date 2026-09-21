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

import { html, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export const VARIANTS = [
  'default',
  'secondary',
  'staticWhite',
  'staticBlack',
] as const;

/** Static color variants for stories using `parameters.staticColorsDemo`. */
export const LINK_STATIC_VARIANTS = ['staticWhite', 'staticBlack'] as const;

/** Color variants for side-by-side option stories (static colors are separate). */
export const LINK_COLOR_VARIANTS = ['default', 'secondary'] as const;

export const CONTEXTS = ['explicit', 'prose', 'links'] as const;

export const LANGS = ['en', 'zh', 'ja', 'ko'] as const;

export type LinkVariant = (typeof VARIANTS)[number];
export type LinkContext = (typeof CONTEXTS)[number];
export type LinkLang = (typeof LANGS)[number] | undefined;

export type LinkTemplateProps = {
  prefix?: string;
  variant?: LinkVariant;
  context?: LinkContext;
  /** Adds `.swc-Link--standalone` (quiet requires this). */
  standalone?: boolean;
  quiet?: boolean;
  lang?: LinkLang;
  href?: string;
  sampleText?: string;
};

export const LINK_LIST_ITEMS = [
  { label: 'Privacy policy', href: '#' },
  { label: 'Terms of use', href: '#' },
  { label: 'Contact support', href: '#' },
] as const;

function variantModifier(
  prefix: string,
  variant: LinkVariant
): string | undefined {
  if (variant === 'default') {
    return undefined;
  }
  return `${prefix}-Link--${variant}`;
}

function buildLinkClassMap({
  prefix,
  variant,
  context,
  standalone,
  quiet,
}: {
  prefix: string;
  variant: LinkVariant;
  context: LinkContext;
  standalone: boolean;
  quiet: boolean;
}): Record<string, boolean> {
  const modifier = variantModifier(prefix, variant);
  const isExplicit = context === 'explicit';
  const useModifier = isExplicit && modifier !== undefined;

  return {
    [`${prefix}-Link`]: isExplicit || standalone || useModifier,
    [`${prefix}-Link--standalone`]: standalone,
    ...(useModifier ? { [modifier]: true } : {}),
    [`${prefix}-Link--quiet`]: quiet && standalone,
  };
}

function linkClassName(
  classMapRecord: Record<string, boolean>
): string | undefined {
  const name = Object.entries(classMapRecord)
    .filter(([, active]) => active)
    .map(([className]) => className)
    .join(' ');
  return name || undefined;
}

function defaultSample(context: LinkContext): string {
  switch (context) {
    case 'links':
      return LINK_LIST_ITEMS[0].label;
    case 'prose':
      return 'inline link';
    case 'explicit':
    default:
      return 'Account settings';
  }
}

function renderAnchor({
  prefix,
  variant,
  context,
  standalone,
  quiet,
  lang,
  href,
  text,
}: {
  prefix: string;
  variant: LinkVariant;
  context: LinkContext;
  standalone: boolean;
  quiet: boolean;
  lang: LinkLang;
  href: string;
  text: string;
}): TemplateResult {
  const linkClassMap = buildLinkClassMap({
    prefix,
    variant,
    context,
    standalone,
    quiet,
  });
  const anchor = html`
    <a
      class=${ifDefined(linkClassName(linkClassMap))}
      href=${href}
      lang=${ifDefined(lang && lang !== 'en' ? lang : undefined)}
    >
      ${text}
    </a>
  `;

  if (context === 'prose') {
    return html`
      <p>Sample sentence with an ${anchor} in running text.</p>
    `;
  }

  if (context === 'links') {
    const items = LINK_LIST_ITEMS.map((item, index) => ({
      href: item.href,
      label:
        index === 0 && text !== LINK_LIST_ITEMS[0].label ? text : item.label,
    }));

    return html`
      <ul
        class="swc-Typography--links"
        style="list-style: none; padding: 0; margin: 0;"
      >
        ${items.map(
          (item) => html`
            <li>
              <a
                class=${ifDefined(linkClassName(linkClassMap))}
                href=${item.href}
                lang=${ifDefined(lang && lang !== 'en' ? lang : undefined)}
              >
                ${item.label}
              </a>
            </li>
          `
        )}
      </ul>
    `;
  }

  return anchor;
}

export function template(args: LinkTemplateProps = {}): TemplateResult {
  const {
    prefix = 'swc',
    variant = 'default',
    context = 'explicit',
    standalone: standaloneArg = false,
    quiet = false,
    lang = undefined,
    href = '#',
    sampleText,
  } = args;

  const standalone = quiet ? true : standaloneArg;

  const text =
    sampleText != null && sampleText !== ''
      ? sampleText
      : defaultSample(context);

  const row = renderAnchor({
    prefix,
    variant,
    context,
    standalone,
    quiet,
    lang,
    href,
    text,
  });

  if (context === 'prose') {
    return html`
      <div class=${classMap({ [`${prefix}-Typography--prose`]: true })}>
        ${row}
      </div>
    `;
  }

  return row;
}
